// Notificações no celular (push pela Expo). Só no app instalado (build do EAS): na web,
// no simulador e no Expo Go não há push, e tudo aqui vira "não faz nada".
// O servidor guarda o aparelho em POST /api/v1/dispositivos e envia os avisos por ele
import { API } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const pushDisponivel = Platform.OS !== "web" && Device.isDevice;

// Com o app aberto, o aviso também aparece no topo
if (pushDisponivel) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
}

// Preferência do botão das Configurações (padrão: ligado)
export async function notificacoesLigadas() {
  return (await AsyncStorage.getItem("notificacoes_ativas")) !== "0";
}

// Pede a permissão (só quando ligado) e devolve o token do aparelho; null sem permissão
async function tokenDoAparelho(pedirPermissao: boolean) {
  // No Android 13 o pedido de permissão só aparece depois de existir um canal
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Avisos da AACJ",
      importance: Notifications.AndroidImportance.HIGH,
    });
  }
  let { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted" && pedirPermissao) {
    ({ status } = await Notifications.requestPermissionsAsync());
  }
  if (status !== "granted") return null;

  const projectId = Constants.expoConfig?.extra?.eas?.projectId;
  const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
  return data;
}

/**
 * Registra (ou atualiza) este aparelho para a pessoa logada, com a preferência das
 * Configurações. Devolve false quando, ligado, o celular não deu permissão
 */
export async function registrarAparelho(ativas?: boolean) {
  if (!pushDisponivel) return true;
  const sessao = await AsyncStorage.getItem("token");
  if (!sessao) return true;
  const ligadas = ativas ?? (await notificacoesLigadas());

  try {
    const token = await tokenDoAparelho(ligadas);
    if (!token) return !ligadas;
    await AsyncStorage.setItem("push_token", token);

    // Servidor ainda sem a rota (404) ou fora do ar: tenta de novo na próxima abertura
    await fetch(`${API}/dispositivos`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessao}`,
      },
      body: JSON.stringify({
        token,
        plataforma: Platform.OS,
        notificacoes_ativas: ligadas,
      }),
    });
  } catch (erro) {
    console.log("Erro ao registrar o aparelho para notificações:", erro);
  }
  return true;
}

// Ao sair da conta: este aparelho para de receber os avisos dessa pessoa
export async function removerAparelho() {
  if (!pushDisponivel) return;
  const [sessao, token] = await Promise.all([
    AsyncStorage.getItem("token"),
    AsyncStorage.getItem("push_token"),
  ]);
  if (!sessao || !token) return;
  try {
    await fetch(`${API}/dispositivos`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessao}`,
      },
      body: JSON.stringify({ token }),
    });
  } catch (erro) {
    console.log("Erro ao remover o aparelho das notificações:", erro);
  }
}
