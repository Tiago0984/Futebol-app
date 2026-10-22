import { API } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Revoga o token no servidor (ele valeria 30 dias). Dando certo ou não
// (sem internet, 401), a sessão local é apagada do mesmo jeito
export async function sairDaConta() {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    // Sem resposta em 5 s, desiste para não prender o usuário na tela
    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), 5000);
    try {
      await fetch(`${API}/auth/logout`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        signal: controle.signal,
      });
    } catch (erro) {
      console.log("Erro ao encerrar a sessão no servidor:", erro);
    } finally {
      clearTimeout(limite);
    }
  }
  await AsyncStorage.multiRemove(["token", "perfil"]);

  // Limpa o histórico para o usuário não voltar ao app logado
  if (router.canDismiss()) {
    router.dismissAll();
  }
  router.replace("/selecao-perfil");
}
