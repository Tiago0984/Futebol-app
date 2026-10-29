import { API } from "@/config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

// Tudo o que a sessão guarda no aparelho (o device_id fica: é da instalação)
export const CHAVES_SESSAO = [
  "token",
  "perfil",
  "atleta_selecionado",
  "nome_responsavel",
];

// Id único por instalação, enviado como device_name no login
export async function nomeDoDispositivo() {
  let id = await AsyncStorage.getItem("device_id");
  if (!id) {
    id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await AsyncStorage.setItem("device_id", id);
  }
  return id;
}

// Endereço de uma rota do atleta. O responsável vê as mesmas respostas pelas
// rotas do filho escolhido: /atleta vira /responsavel/atletas/{id},
// /atleta/estatisticas vira .../estatisticas e /agenda vira .../agenda
export async function urlDoAtleta(caminho: string) {
  const [perfil, idAtleta] = await Promise.all([
    AsyncStorage.getItem("perfil"),
    AsyncStorage.getItem("atleta_selecionado"),
  ]);
  if (perfil !== "responsavel" || !idAtleta) return `${API}${caminho}`;

  const base = `${API}/responsavel/atletas/${idAtleta}`;
  if (caminho === "/atleta") return base;
  return base + caminho.replace(/^\/atleta(?=\/)/, "");
}

export async function ehResponsavel() {
  return (await AsyncStorage.getItem("perfil")) === "responsavel";
}

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
  await AsyncStorage.multiRemove(CHAVES_SESSAO);

  // Limpa o histórico para o usuário não voltar ao app logado
  if (router.canDismiss()) {
    router.dismissAll();
  }
  router.replace("/selecao-perfil");
}
