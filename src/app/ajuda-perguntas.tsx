import TabBar from "@/components/tabBar";
import ajudaPerguntasStyle from "@/styles/ajudaPerguntasStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Pergunta = {
  pergunta: string;
  resposta: string;
};

const perguntasPorCategoria = {
  conta: [
    {
      pergunta: "Como alterar meus dados pessoais?",
      resposta:
        "Acesse seu perfil para consultar e atualizar os dados disponíveis para alteração.",
    },
    {
      pergunta: "Como atualizar minha senha?",
      resposta:
        "Nas opções de segurança da conta, você poderá atualizar sua senha seguindo as orientações apresentadas pelo aplicativo.",
    },
    {
      pergunta: "Esqueci minha senha. O que faço?",
      resposta:
        "Na tela de login, utilize a opção de recuperação de senha para iniciar o processo de redefinição.",
    },
    {
      pergunta: "Como alterar minha foto de perfil?",
      resposta:
        "Acesse seu perfil e selecione a opção disponível para alteração da imagem.",
    },
    {
      pergunta: "Como sair da minha conta?",
      resposta:
        "A opção para sair da conta está disponível nas configurações do seu perfil.",
    },
  ],

  campeonatos: [
    {
      pergunta: "Onde vejo meus campeonatos?",
      resposta:
        "Acesse a área Campeonatos pelo menu inferior para visualizar as competições disponíveis para você.",
    },
    {
      pergunta: "Como vejo a classificação?",
      resposta:
        "Dentro de um campeonato, você pode consultar a classificação atual da competição.",
    },
    {
      pergunta: "Onde vejo os próximos jogos?",
      resposta:
        "Os próximos jogos ficam disponíveis dentro dos detalhes do campeonato.",
    },
    {
      pergunta: "Onde vejo os resultados das partidas?",
      resposta:
        "Os resultados ficam disponíveis na página de detalhes de cada campeonato.",
    },
    {
      pergunta: "Como acompanho o andamento do campeonato?",
      resposta:
        "A página de detalhes apresenta o progresso da temporada, resultados, classificação e próximas partidas.",
    },
  ],

  desempenho: [
    {
      pergunta: "Como funciona o índice geral de evolução?",
      resposta:
        "O índice geral de evolução reúne os principais indicadores registrados nas suas avaliações e permite acompanhar seu desenvolvimento ao longo do tempo.",
    },
    {
      pergunta: "Como são calculadas minhas avaliações?",
      resposta:
        "As avaliações são registradas pela comissão técnica com base nos critérios utilizados nos treinamentos e atividades da AACJ.",
    },
    {
      pergunta: "Onde vejo meu histórico de avaliações?",
      resposta:
        "Seu histórico de avaliações pode ser consultado na área Desempenho, permitindo acompanhar os registros realizados ao longo das temporadas.",
    },
    {
      pergunta: "Como funcionam minhas metas?",
      resposta:
        "As metas representam objetivos definidos para acompanhar sua evolução. Conforme os resultados são registrados, o progresso pode ser acompanhado nesta área.",
    },
    {
      pergunta: "Como funciona a frequência?",
      resposta:
        "A frequência apresenta sua participação nos treinos, jogos e demais atividades registradas pela AACJ.",
    },
    {
      pergunta: "Onde vejo minhas conquistas?",
      resposta:
        "As conquistas ficam disponíveis na área Desempenho e representam marcos alcançados durante sua trajetória na AACJ.",
    },
  ],

  agenda: [
    {
      pergunta: "Onde vejo meus próximos treinos?",
      resposta:
        "Os próximos treinos podem ser consultados diretamente na área Agenda.",
    },
    {
      pergunta: "Como vejo os detalhes de um compromisso?",
      resposta:
        "Selecione o compromisso na Agenda para consultar suas informações e detalhes.",
    },
    {
      pergunta: "Onde vejo os locais dos treinos?",
      resposta:
        "Quando disponível, o compromisso apresenta o local da atividade e as informações relacionadas ao endereço.",
    },
    {
      pergunta: "Como saber o horário de uma atividade?",
      resposta:
        "O horário de cada atividade fica indicado diretamente no compromisso dentro da Agenda.",
    },
    {
      pergunta: "Posso consultar compromissos anteriores?",
      resposta:
        "A Agenda permite consultar os compromissos registrados, incluindo atividades anteriores quando disponíveis.",
    },
  ],
} satisfies Record<string, Pergunta[]>;

type Categoria = keyof typeof perguntasPorCategoria;

const nomesCategorias: Record<Categoria, string> = {
  conta: "Conta e perfil",
  campeonatos: "Campeonatos",
  desempenho: "Desempenho",
  agenda: "Agenda",
};

const iconesCategorias: Record<Categoria, number> = {
  conta: require("@/assets/images/img/userPreto.png"),
  campeonatos: require("@/assets/images/img/trofeu.png"),
  desempenho: require("@/assets/images/img/desempenhoBranco.png"),
  agenda: require("@/assets/images/img/agendaBranca.png"),
};

export default function AjudaPerguntas() {
  const insets = useSafeAreaInsets();

  const { categoria } = useLocalSearchParams<{
    categoria?: string;
  }>();

  const categoriaParam = Array.isArray(categoria)
    ? categoria[0]
    : categoria;

  const categoriaValida: Categoria =
    categoriaParam && categoriaParam in perguntasPorCategoria
      ? (categoriaParam as Categoria)
      : "desempenho";

  const nomeCategoria = nomesCategorias[categoriaValida];
  const perguntas = perguntasPorCategoria[categoriaValida];

  const outrasCategorias = (
    Object.keys(nomesCategorias) as Categoria[]
  ).filter((item) => item !== categoriaValida);

  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(
    null,
  );

  const animacoes = useMemo(
    () => perguntas.map(() => new Animated.Value(0)),
    [perguntas],
  );

  const trocarCategoria = (novaCategoria: Categoria) => {
    setPerguntaAberta(null);

    router.navigate({
      pathname: "/ajuda-perguntas",
      params: {
        categoria: novaCategoria,
      },
    });
  };

  const alternarPergunta = (index: number) => {
    const novaPerguntaAberta =
      perguntaAberta === index ? null : index;

    if (perguntaAberta !== null) {
      Animated.timing(animacoes[perguntaAberta], {
        toValue: 0,
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }

    setPerguntaAberta(novaPerguntaAberta);

    if (novaPerguntaAberta !== null) {
      Animated.timing(animacoes[novaPerguntaAberta], {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={ajudaPerguntasStyle.scrollView}
        contentContainerStyle={[
          ajudaPerguntasStyle.scrollContent,
          {
            paddingBottom:
              TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={ajudaPerguntasStyle.header}>
          <Pressable
            style={ajudaPerguntasStyle.backButton}
            onPress={() => router.back()}
          >
            <Text style={ajudaPerguntasStyle.backText}>
              {"<"} Voltar
            </Text>
          </Pressable>

          <Text style={ajudaPerguntasStyle.headerTitle}>
            Perguntas frequentes
          </Text>

          <View style={ajudaPerguntasStyle.headerIcons}>
            <View style={ajudaPerguntasStyle.headerIconButton}>
              <Image
                source={require(
                  "@/assets/images/img/shoppingbranco.png",
                )}
                style={ajudaPerguntasStyle.headerIcon}
                resizeMode="contain"
              />
            </View>

            <View style={ajudaPerguntasStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/sinoBranco.png")}
                style={ajudaPerguntasStyle.headerIcon}
                resizeMode="contain"
              />

              <View
                style={ajudaPerguntasStyle.notificationBadge}
              >
                <Text
                  style={
                    ajudaPerguntasStyle.notificationBadgeText
                  }
                >
                  2
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* TÍTULO */}
        <View style={ajudaPerguntasStyle.titleSection}>
          <Text style={ajudaPerguntasStyle.screenTitle}>
            Perguntas frequentes sobre "{nomeCategoria}"
          </Text>
        </View>

        {/* PERGUNTAS FREQUENTES */}
        <View style={ajudaPerguntasStyle.faqList}>
          {perguntas.map((item, index) => {
            const aberta = perguntaAberta === index;

            const alturaResposta =
              animacoes[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 60],
              });

            const opacidadeResposta =
              animacoes[index].interpolate({
                inputRange: [0, 0.35, 1],
                outputRange: [0, 0, 1],
              });

            const deslocamentoResposta =
              animacoes[index].interpolate({
                inputRange: [0, 1],
                outputRange: [-5, 0],
              });

            return (
              <Pressable
                key={item.pergunta}
                style={ajudaPerguntasStyle.faqItem}
                onPress={() => alternarPergunta(index)}
              >
                <View
                  style={ajudaPerguntasStyle.questionRow}
                >
                  <Text
                    style={ajudaPerguntasStyle.question}
                  >
                    {item.pergunta}
                  </Text>

                  <Text
                    style={[
                      ajudaPerguntasStyle.questionArrow,
                      aberta &&
                        ajudaPerguntasStyle.questionArrowOpen,
                    ]}
                  >
                    {aberta ? "^" : ">"}
                  </Text>
                </View>

                <Animated.View
                  style={[
                    ajudaPerguntasStyle.answerContainer,
                    {
                      height: alturaResposta,
                      opacity: opacidadeResposta,
                    },
                  ]}
                >
                  <Animated.Text
                    style={[
                      ajudaPerguntasStyle.answer,
                      {
                        transform: [
                          {
                            translateY:
                              deslocamentoResposta,
                          },
                        ],
                      },
                    ]}
                  >
                    {item.resposta}
                  </Animated.Text>
                </Animated.View>
              </Pressable>
            );
          })}
        </View>

        {/* OUTRAS CATEGORIAS */}
        <View style={ajudaPerguntasStyle.otherCategories}>
          <Text
            style={ajudaPerguntasStyle.otherCategoriesTitle}
          >
            Outras categorias
          </Text>

          <View style={ajudaPerguntasStyle.categoryList}>
            {outrasCategorias.map((item) => (
              <Pressable
                key={item}
                style={ajudaPerguntasStyle.categoryRow}
                onPress={() => trocarCategoria(item)}
              >
                <View
                  style={
                    ajudaPerguntasStyle.categoryIconBox
                  }
                >
                  <Image
                    source={iconesCategorias[item]}
                    style={ajudaPerguntasStyle.categoryIcon}
                    tintColor={cores.vermelho}
                    resizeMode="contain"
                  />
                </View>

                <Text
                  style={ajudaPerguntasStyle.categoryText}
                >
                  {nomesCategorias[item]}
                </Text>

                <Text
                  style={ajudaPerguntasStyle.categoryArrow}
                >
                  {">"}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}