import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import { API } from "@/config/api";
import botaoNotificacoesStyle from "@/styles/botaoNotificacoesStyle";
import type { TabName } from "@/components/tabBar";

interface BotaoNotificacoesProps {
  abaAtiva: TabName;
}

export default function BotaoNotificacoes({ abaAtiva }: BotaoNotificacoesProps) {
  const [naoLidas, setNaoLidas] = useState(0);

  // Busca o número toda vez que a tela aparece (ex.: ao voltar das notificações).
  // Erro ou sessão vencida deixam o sino sem número; quem trata o login é a tela
  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      (async () => {
        const [token, perfil] = await Promise.all([
          AsyncStorage.getItem("token"),
          AsyncStorage.getItem("perfil"),
        ]);
        // A área do responsável usa outras rotas e ainda não está integrada
        if (!token || perfil !== "atleta") return;
        try {
          const resposta = await fetch(`${API}/notificacoes/nao-lidas`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await resposta.json();
          if (ativo && json.success) setNaoLidas(json.data.nao_lidas);
        } catch (erro) {
          console.log("Erro ao buscar os avisos não lidos:", erro);
        }
      })();
      return () => {
        ativo = false;
      };
    }, []),
  );

  return (
    <Pressable
      style={botaoNotificacoesStyle.button}
      onPress={() =>
        router.navigate({
          pathname: "/notificacoes",
          params: { aba: abaAtiva },
        })
      }
    >
      <Image
        source={require("@/assets/images/img/sinoBranco.png")}
        style={botaoNotificacoesStyle.icon}
        resizeMode="contain"
      />

      {naoLidas > 0 && (
        <View style={botaoNotificacoesStyle.badge}>
          <Text style={botaoNotificacoesStyle.badgeText}>
            {naoLidas > 9 ? "9+" : naoLidas}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
