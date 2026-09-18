import { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import TabBar from "@/components/tabBar";
import fundoStyle from "@/styles/fundoStyle";
import sobreAACJStyle from "@/styles/sobreAACJStyle";
import { cores } from "@/styles/variaveis";

type Secao = "privacidade" | "termos" | "contato";

const informacoes: Record<
  Secao,
  {
    titulo: string;
    texto: string;
  }
> = {
  privacidade: {
    titulo: "Política de Privacidade",
    texto:
      "A AACJ valoriza a privacidade de atletas, responsáveis e demais usuários. As informações utilizadas pelo aplicativo têm como objetivo facilitar o acesso aos serviços da associação, acompanhar atividades esportivas e melhorar a comunicação entre a AACJ e sua comunidade.",
  },
  termos: {
    titulo: "Termos de Uso",
    texto:
      "O aplicativo AACJ é destinado ao acompanhamento das atividades, competições, desempenho e informações relacionadas à formação de atletas. Ao utilizar o aplicativo, o usuário se compromete a fornecer informações corretas e utilizar os recursos de forma responsável.",
  },
  contato: {
    titulo: "Contato",
    texto:
      "Para dúvidas, sugestões ou informações sobre a AACJ, entre em contato com nossa equipe de atendimento. Estamos disponíveis para auxiliar atletas e responsáveis em assuntos relacionados ao aplicativo e às atividades do Centro de Formação de Atletas.",
  },
};

export default function SobreAACJ() {
  const [secaoAberta, setSecaoAberta] = useState<Secao | null>(null);

  const animacoes = useRef<Record<Secao, Animated.Value>>({
    privacidade: new Animated.Value(0),
    termos: new Animated.Value(0),
    contato: new Animated.Value(0),
  }).current;

  const alternarSecao = (secao: Secao) => {
    const estaAberta = secaoAberta === secao;

    if (secaoAberta && secaoAberta !== secao) {
      Animated.timing(animacoes[secaoAberta], {
        toValue: 0,
        duration: 180,
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(animacoes[secao], {
      toValue: estaAberta ? 0 : 1,
      duration: 220,
      useNativeDriver: false,
    }).start();

    setSecaoAberta(estaAberta ? null : secao);
  };

  const renderSecao = (secao: Secao) => {
    const item = informacoes[secao];
    const aberta = secaoAberta === secao;

    return (
      <View key={secao} style={sobreAACJStyle.infoItem}>
        <Pressable
          style={sobreAACJStyle.infoQuestionRow}
          onPress={() => alternarSecao(secao)}
        >
          <Text style={sobreAACJStyle.infoQuestion}>
            {item.titulo}
          </Text>

          <Text
            style={[
              sobreAACJStyle.infoArrow,
              aberta && sobreAACJStyle.infoArrowOpen,
            ]}
          >
            {aberta ? "⌃" : ">"}
          </Text>
        </Pressable>

        <Animated.View
          style={[
            sobreAACJStyle.infoAnswerContainer,
            {
              maxHeight: animacoes[secao].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 110],
              }),
              opacity: animacoes[secao],
            },
          ]}
        >
          <Text style={sobreAACJStyle.infoAnswer}>
            {item.texto}
          </Text>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        contentFit="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={sobreAACJStyle.scrollView}
        contentContainerStyle={sobreAACJStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={sobreAACJStyle.header}>
          <Pressable
            style={sobreAACJStyle.backButton}
            onPress={() => router.back()}
          >
            <Text style={sobreAACJStyle.backText}>
              {"< Voltar"}
            </Text>
          </Pressable>

          <Text style={sobreAACJStyle.headerTitle}>
            Sobre a AACJ
          </Text>

          <View style={sobreAACJStyle.headerSpacer} />
        </View>

        <View style={sobreAACJStyle.aboutContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={sobreAACJStyle.logo}
            contentFit="contain"
          />

          <Text style={sobreAACJStyle.acronym}>
            AACJ
          </Text>

          <Text style={sobreAACJStyle.institutionName}>
            Centro de Formação de Atletas
          </Text>

          <Text style={sobreAACJStyle.description}>
            Formação esportiva, desenvolvimento{"\n"}
            humano e alto rendimento
          </Text>

          <View style={sobreAACJStyle.infoList}>
            <View style={sobreAACJStyle.versionRow}>
              <Text style={sobreAACJStyle.infoQuestion}>
                Versão do aplicativo
              </Text>

              <Text style={sobreAACJStyle.versionText}>
                1.0.0
              </Text>
            </View>

            {renderSecao("privacidade")}
            {renderSecao("termos")}
            {renderSecao("contato")}
          </View>
        </View>

        <Text style={sobreAACJStyle.copyright}>
          © 2026 AACJ
        </Text>
      </ScrollView>

      <TabBar abaAtiva="perfil" />
    </View>
  );
}