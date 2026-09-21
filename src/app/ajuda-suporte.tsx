import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import ajudaSuporteStyle from "@/styles/ajudaSuporteStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Pergunta = {
  pergunta: string;
  resposta: string;
};

const perguntas: Pergunta[] = [
  {
    pergunta: "Como alterar meus dados?",
    resposta:
      "Para alterar seus dados, acesse a área Usuário e entre em Perfil. Lá você poderá consultar e atualizar as informações disponíveis no seu cadastro. Alguns dados podem depender da atualização feita pela equipe da AACJ.",
  },
  {
    pergunta: "Como atualizar minha senha?",
    resposta:
      "Na área Usuário, acesse as opções de segurança da sua conta. Informe sua senha atual e cadastre uma nova senha seguindo as orientações apresentadas pelo aplicativo. Caso não consiga acessar sua conta, utilize a opção de recuperação de senha.",
  },
  {
    pergunta: "Onde vejo minhas avaliações?",
    resposta:
      "Suas avaliações ficam disponíveis na área Desempenho. Nessa seção você pode acompanhar seu índice geral, evolução, presença, treinos, jogos, avaliações e outros indicadores registrados pela comissão.",
  },
  {
    pergunta: "Como acompanhar meus campeonatos?",
    resposta:
      "Acesse a área Campeonatos pelo menu inferior. Você poderá consultar os campeonatos em que está inscrito, acompanhar o andamento da competição, classificação, resultados, próximas partidas e outras informações da temporada.",
  },
  {
    pergunta: "Onde vejo meus próximos compromissos?",
    resposta:
      "Os próximos compromissos ficam disponíveis na área Agenda. Nela você pode consultar treinos, campeonatos, avaliações, reuniões e outros eventos programados pela AACJ.",
  },
];

export default function AjudaSuporte() {
  const insets = useSafeAreaInsets();

  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(null);

  const animacoes = useRef(perguntas.map(() => new Animated.Value(0))).current;

  const alternarPergunta = (index: number) => {
    const novaPerguntaAberta = perguntaAberta === index ? null : index;

    if (perguntaAberta !== null) {
      Animated.parallel([
        Animated.timing(animacoes[perguntaAberta], {
          toValue: 0,
          duration: 220,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
    }

    setPerguntaAberta(novaPerguntaAberta);

    if (novaPerguntaAberta !== null) {
      Animated.parallel([
        Animated.timing(animacoes[novaPerguntaAberta], {
          toValue: 1,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: false,
        }),
      ]).start();
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
        style={ajudaSuporteStyle.scrollView}
        contentContainerStyle={[
          ajudaSuporteStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={ajudaSuporteStyle.header}>
          <Pressable
            style={ajudaSuporteStyle.backButton}
            onPress={() => router.back()}
          >
            <Text style={ajudaSuporteStyle.backText}>{"<"} Voltar</Text>
          </Pressable>

          <View style={ajudaSuporteStyle.headerRight}>
            <BotaoNotificacoes abaAtiva="perfil" />
          </View>
        </View>

        {/* TÍTULO */}
        <View style={ajudaSuporteStyle.titleSection}>
          <Text style={ajudaSuporteStyle.screenTitle}>Ajuda &amp; Suporte</Text>

          <Text style={ajudaSuporteStyle.screenSubtitle}>
            Estamos aqui para ajudar
          </Text>
        </View>

        {/* BUSCA */}
        <View style={ajudaSuporteStyle.searchBox}>
          <View style={ajudaSuporteStyle.searchIcon}>
            <View style={ajudaSuporteStyle.searchIconCircle} />
            <View style={ajudaSuporteStyle.searchIconHandle} />
          </View>

          <TextInput
            style={ajudaSuporteStyle.searchInput}
            placeholder="Buscar uma dúvida"
            placeholderTextColor={cores.cinza}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* CATEGORIAS */}
        <View style={ajudaSuporteStyle.categoriesSection}>
          <Text style={ajudaSuporteStyle.sectionTitle}>
            Como podemos ajudar?
          </Text>

          <Pressable
            style={ajudaSuporteStyle.categoryRow}
            onPress={() =>
              router.navigate({
                pathname: "/ajuda-perguntas",
                params: {
                  categoria: "conta",
                },
              })
            }
          >
            <View style={ajudaSuporteStyle.categoryIconBox}>
              <Image
                source={require("@/assets/images/img/userPreto.png")}
                style={ajudaSuporteStyle.categoryIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />
            </View>

            <View style={ajudaSuporteStyle.categoryTextCol}>
              <Text style={ajudaSuporteStyle.categoryTitle}>
                Conta e Perfil
              </Text>

              <Text style={ajudaSuporteStyle.categoryDescription}>
                Dados pessoais, acesso e segurança
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={ajudaSuporteStyle.categoryRow}
            onPress={() =>
              router.navigate({
                pathname: "/ajuda-perguntas",
                params: {
                  categoria: "campeonatos",
                },
              })
            }
          >
            <View style={ajudaSuporteStyle.categoryIconBox}>
              <Image
                source={require("@/assets/images/img/trofeu.png")}
                style={ajudaSuporteStyle.categoryIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />
            </View>

            <View style={ajudaSuporteStyle.categoryTextCol}>
              <Text style={ajudaSuporteStyle.categoryTitle}>Campeonatos</Text>

              <Text style={ajudaSuporteStyle.categoryDescription}>
                Competições, jogos e classificação
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={ajudaSuporteStyle.categoryRow}
            onPress={() =>
              router.navigate({
                pathname: "/ajuda-perguntas",
                params: {
                  categoria: "desempenho",
                },
              })
            }
          >
            <View style={ajudaSuporteStyle.categoryIconBox}>
              <Image
                source={require("@/assets/images/img/desempenhoBranco.png")}
                style={ajudaSuporteStyle.categoryIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />
            </View>

            <View style={ajudaSuporteStyle.categoryTextCol}>
              <Text style={ajudaSuporteStyle.categoryTitle}>Desempenho</Text>

              <Text style={ajudaSuporteStyle.categoryDescription}>
                Avaliações, metas e evolução
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={ajudaSuporteStyle.categoryRow}
            onPress={() =>
              router.navigate({
                pathname: "/ajuda-perguntas",
                params: {
                  categoria: "agenda",
                },
              })
            }
          >
            <View style={ajudaSuporteStyle.categoryIconBox}>
              <Image
                source={require("@/assets/images/img/agendaBranca.png")}
                style={ajudaSuporteStyle.categoryIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />
            </View>

            <View style={ajudaSuporteStyle.categoryTextCol}>
              <Text style={ajudaSuporteStyle.categoryTitle}>Agenda</Text>

              <Text style={ajudaSuporteStyle.categoryDescription}>
                Treinos, compromissos e eventos
              </Text>
            </View>
          </Pressable>
        </View>

        {/* PERGUNTAS FREQUENTES */}
        <View style={ajudaSuporteStyle.faqSection}>
          <Text style={ajudaSuporteStyle.sectionTitle}>
            Perguntas frequentes
          </Text>

          <View style={ajudaSuporteStyle.faqList}>
            {perguntas.map((item, index) => {
              const aberta = perguntaAberta === index;

              const alturaResposta = animacoes[index].interpolate({
                inputRange: [0, 1],
                outputRange: [0, 70],
              });

              const opacidadeResposta = animacoes[index].interpolate({
                inputRange: [0, 0.35, 1],
                outputRange: [0, 0, 1],
              });

              const deslocamentoResposta = animacoes[index].interpolate({
                inputRange: [0, 1],
                outputRange: [-5, 0],
              });

              return (
                <Pressable
                  key={item.pergunta}
                  style={ajudaSuporteStyle.faqItem}
                  onPress={() => alternarPergunta(index)}
                >
                  <View style={ajudaSuporteStyle.faqQuestionRow}>
                    <Text style={ajudaSuporteStyle.faqQuestion}>
                      {item.pergunta}
                    </Text>

                    <Text
                      style={[
                        ajudaSuporteStyle.faqArrow,
                        aberta && ajudaSuporteStyle.faqArrowOpen,
                      ]}
                    >
                      {aberta ? "^" : ">"}
                    </Text>
                  </View>

                  <Animated.View
                    style={[
                      ajudaSuporteStyle.faqAnswerContainer,
                      {
                        height: alturaResposta,
                        opacity: opacidadeResposta,
                      },
                    ]}
                  >
                    <Animated.Text
                      style={[
                        ajudaSuporteStyle.faqAnswer,
                        {
                          transform: [
                            {
                              translateY: deslocamentoResposta,
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
        </View>

        {/* AINDA PRECISA DE AJUDA */}
        <View style={ajudaSuporteStyle.contactSection}>
          <Image
            source={require("@/assets/images/img//logo/logo-aacj.png")}
            style={ajudaSuporteStyle.contactLogo}
            resizeMode="contain"
          />

          <View style={ajudaSuporteStyle.contactContent}>
            <Text style={ajudaSuporteStyle.contactTitle}>
              Ainda precisa de ajuda?
            </Text>

            <Text style={ajudaSuporteStyle.contactDescription}>
              Entre em contato com a equipe da AACJ.
            </Text>

            <Pressable onPress={() => router.navigate("/fale-conosco")}>
              <Text style={ajudaSuporteStyle.contactLink}>
                Entrar em contato {">"}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
