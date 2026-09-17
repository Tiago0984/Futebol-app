import metasStyle from "@/styles/metasStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const metas = [
  {
    nome: "Treinos",
    icone: require("@/assets/images/img/pesovermelho.png"),
    status: "Em andamento",
    progresso: 60,
  },
  {
    nome: "Presença",
    icone: require("@/assets/images/img/userVerdeClaro.png"),
    status: "Quase lá",
    valorGrande: "94%",
  },
  {
    nome: "Jogos oficiais",
    icone: require("@/assets/images/img/bolaVermelha.png"),
    status: "Em andamento",
    progresso: 70,
    contagem: "14/80",
  },
  {
    nome: "Avaliações",
    icone: require("@/assets/images/img/pranchetaVermelha.png"),
    status: "Em andamento",
    progresso: 70,
    contagem: "14/80",
  },
];

export default function Metas() {
  const indicadorAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [proximaMetaLargura, setProximaMetaLargura] = useState(0);
  const proximaMetaAltura =
    proximaMetaLargura > 0 ? proximaMetaLargura * (90 / 380) : undefined;

  useEffect(() => {
    Animated.timing(indicadorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [indicadorAnim]);

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={metasStyle.scrollContent}
      >
        <View style={metasStyle.header}>
          <View style={metasStyle.headerTopRow}>
            <Pressable
              style={metasStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={metasStyle.backChevron}>‹</Text>
              <Text style={metasStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={metasStyle.headerTitleCol}>
              <Text style={metasStyle.headerTitle} numberOfLines={1}>
                Metas
              </Text>
              <Text style={metasStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={metasStyle.headerIconsRow}>
              <View style={metasStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={metasStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={metasStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={metasStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={metasStyle.notificationBadge}>
                  <Text style={metasStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={metasStyle.resumoSection}>
          <View style={metasStyle.resumoRow}>
            <Image
              source={require("@/assets/images/img/alvovermelho.png")}
              style={metasStyle.resumoIcone}
              resizeMode="contain"
            />
            <View style={metasStyle.resumoTextCol}>
              <Text style={metasStyle.resumoTitulo}>4 metas</Text>
              <Text style={metasStyle.resumoSubtitulo}>
                2 concluídas  •  2 em andamento
              </Text>
            </View>
          </View>
        </View>

        <View style={metasStyle.listSection}>
          <View style={metasStyle.listDivider} />

          {metas.map((item) => (
            <View key={item.nome}>
              <View style={metasStyle.metaItem}>
                <View style={metasStyle.metaHeaderRow}>
                  <Image
                    source={item.icone}
                    style={metasStyle.metaIcone}
                    resizeMode="contain"
                  />
                  <Text style={metasStyle.metaTitulo}>{item.nome}</Text>
                  <View style={metasStyle.metaPill}>
                    <Text style={metasStyle.metaPillText}>{item.status}</Text>
                  </View>
                </View>

                {item.valorGrande ? (
                  <Text style={metasStyle.metaValorGrande}>
                    {item.valorGrande}
                  </Text>
                ) : (
                  <View style={metasStyle.metaBarraRow}>
                    {item.contagem && (
                      <Text style={metasStyle.metaContagem}>
                        {item.contagem}
                      </Text>
                    )}
                    <View style={metasStyle.metaBarraTrack}>
                      <View
                        style={[
                          metasStyle.metaBarraPreenchimento,
                          { width: `${item.progresso ?? 0}%` },
                        ]}
                      />
                    </View>
                    <Text style={metasStyle.metaPercentual}>
                      {item.progresso ?? 0}%
                    </Text>
                  </View>
                )}
              </View>

              <View style={metasStyle.listDivider} />
            </View>
          ))}
        </View>

        <View
          style={[
            metasStyle.proximaMetaCard,
            { minHeight: proximaMetaAltura },
          ]}
          onLayout={(e) => setProximaMetaLargura(e.nativeEvent.layout.width)}
        >
          <Image
            source={require("@/assets/images/img/metaVerdeClaro.png")}
            style={metasStyle.proximaMetaIcone}
            resizeMode="contain"
          />
          <View style={metasStyle.proximaMetaTextCol}>
            <Text style={metasStyle.proximaMetaLabel}>Próxima meta:</Text>
            <Text style={metasStyle.proximaMetaValor}>20 Treinos</Text>
            <Text style={metasStyle.proximaMetaDetalhe}>
              • Faltam apenas 2 treinos
            </Text>
          </View>
        </View>
      </ScrollView>

      <View
        style={[
          menuInferiorStyle.tabBar,
          { paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom },
        ]}
      >
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/home")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/homeBranca.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/agenda")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/agendaBranca.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Agenda
          </Text>
        </Pressable>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/campeonatos")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Campeonatos
          </Text>
        </Pressable>
        <View style={menuInferiorStyle.tabItem}>
          <Animated.View
            style={[
              menuInferiorStyle.tabIndicator,
              menuInferiorStyle.tabIndicatorActive,
              {
                opacity: indicadorAnim,
                transform: [{ scaleX: indicadorAnim }],
              },
            ]}
          />
          <Image
            source={require("@/assets/images/img/desempenhoVermelho.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive} numberOfLines={1}>
            Desempenho
          </Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/perfilbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Usuário
          </Text>
        </View>
      </View>
    </View>
  );
}
