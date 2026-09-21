import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import botaoNotificacoesStyle from "@/styles/botaoNotificacoesStyle";
import type { TabName } from "@/components/tabBar";

interface BotaoNotificacoesProps {
  abaAtiva: TabName;
  quantidadeNaoLidas?: number;
}

export default function BotaoNotificacoes({
  abaAtiva,
  quantidadeNaoLidas = 2,
}: BotaoNotificacoesProps) {
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

      {quantidadeNaoLidas > 0 && (
        <View style={botaoNotificacoesStyle.badge}>
          <Text style={botaoNotificacoesStyle.badgeText}>
            {quantidadeNaoLidas}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
