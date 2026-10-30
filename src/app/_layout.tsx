import { Stack, router } from "expo-router";

import { useFonts } from "expo-font";
import { OpenSans_700Bold, OpenSans_400Regular, OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Oswald_700Bold, Oswald_400Regular } from "@expo-google-fonts/oswald";

import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import * as SplashScreen from "expo-splash-screen";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { abrirDetalhe } from "@/utils/eventos";
import { pushDisponivel } from "@/utils/notificacoes";

SplashScreen.preventAutoHideAsync();

export const fontesCarregar = {
  OpenSans_700Bold, 
  OpenSans_400Regular, 
  OpenSans_600SemiBold,
  Oswald_400Regular,
  Oswald_700Bold,
};

// Toque numa notificação do celular: o aviso de um compromisso abre o detalhe dele;
// os outros abrem a lista de avisos. Sem sessão, o login cuida do resto
async function abrirNotificacao(resposta: Notifications.NotificationResponse) {
  if (!(await AsyncStorage.getItem("token"))) return;
  const dados = resposta.notification.request.content.data ?? {};
  // Responsável com mais de um filho: o aviso é do filho que veio na notificação
  if (
    dados.id_atleta &&
    (await AsyncStorage.getItem("perfil")) === "responsavel"
  ) {
    await AsyncStorage.setItem("atleta_selecionado", String(dados.id_atleta));
  }
  const idEvento = Number(dados.id_evento);
  if (idEvento) {
    abrirDetalhe(idEvento);
  } else {
    router.navigate("/notificacoes");
  }
}

export default function RootLayout() {
  const [fontesLoaded] = useFonts(fontesCarregar);

  useEffect(() => {
    if (!pushDisponivel || !fontesLoaded) return;
    // App aberto pela notificação (estava fechado)
    Notifications.getLastNotificationResponseAsync().then((resposta) => {
      if (resposta) {
        abrirNotificacao(resposta);
        Notifications.clearLastNotificationResponseAsync();
      }
    });
    // App aberto ou em segundo plano
    const assinatura =
      Notifications.addNotificationResponseReceivedListener(abrirNotificacao);
    return () => assinatura.remove();
  }, [fontesLoaded]);

  useEffect(() => {
    if (fontesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontesLoaded]);

  if (!fontesLoaded) {
    return null;
  }
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SafeAreaProvider>
  );
}
