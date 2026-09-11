import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import ultimosResultadosStyle from "@/styles/ultimosResultadosStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const crestAacj = require("@/assets/images/img/logo/logo-aacj.png");
const crestTimePreto = require("@/assets/images/img/logo/time-preto.jpg");

const resultados = [
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  2 X 0  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Vitória",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    placar: "AACJ  1 X 1  Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
    resultado: "Empate",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  0 X 1  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Derrota",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  2 X 0  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Vitória",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    placar: "AACJ  1 X 1  Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
    resultado: "Empate",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  0 X 1  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Derrota",
  },
];

export default function UltimosResultados() {
  const indicadorAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

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
        contentContainerStyle={ultimosResultadosStyle.scrollContent}
      >
        <View style={ultimosResultadosStyle.header}>
          <View style={ultimosResultadosStyle.headerTopRow}>
            <Pressable
              style={ultimosResultadosStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={ultimosResultadosStyle.backChevron}>‹</Text>
              <Text style={ultimosResultadosStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={ultimosResultadosStyle.headerTitleCol}>
              <Text style={ultimosResultadosStyle.headerTitle} numberOfLines={1}>
                Últimos resultados
              </Text>
              <Text
                style={ultimosResultadosStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={ultimosResultadosStyle.headerIconsRow}>
              <View style={ultimosResultadosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={ultimosResultadosStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={ultimosResultadosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={ultimosResultadosStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={ultimosResultadosStyle.notificationBadge}>
                  <Text style={ultimosResultadosStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={ultimosResultadosStyle.listSection}>
          {resultados.map((item, index) => {
            const ehUltimo = index === resultados.length - 1;

            const estiloPill =
              item.resultado === "Vitória"
                ? ultimosResultadosStyle.resultPillVitoria
                : item.resultado === "Derrota"
                  ? ultimosResultadosStyle.resultPillDerrota
                  : ultimosResultadosStyle.resultPillEmpate;

            const corTexto =
              item.resultado === "Vitória"
                ? cores.verde
                : item.resultado === "Derrota"
                  ? cores.vermelho
                  : cores.cinza;

            return (
              <View key={index} style={ultimosResultadosStyle.resultRow}>
                <View style={ultimosResultadosStyle.dateCol}>
                  <Text style={ultimosResultadosStyle.dateDay}>
                    {item.dia}
                  </Text>
                  <Text style={ultimosResultadosStyle.dateWeekday}>
                    {item.semana}
                  </Text>
                </View>

                <View style={ultimosResultadosStyle.lineCol}>
                  <View style={ultimosResultadosStyle.lineDot} />
                  {!ehUltimo && (
                    <View style={ultimosResultadosStyle.lineConnector} />
                  )}
                </View>

                <View style={ultimosResultadosStyle.resultCard}>
                  <Image
                    source={item.crest}
                    style={ultimosResultadosStyle.resultCrest}
                    resizeMode="contain"
                  />
                  <View style={ultimosResultadosStyle.resultTextCol}>
                    <Text
                      style={ultimosResultadosStyle.resultScore}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {item.placar}
                    </Text>
                    <Text
                      style={ultimosResultadosStyle.resultCompeticao}
                      numberOfLines={1}
                    >
                      {item.competicao}
                    </Text>
                    <Text
                      style={ultimosResultadosStyle.resultLocal}
                      numberOfLines={1}
                    >
                      {item.local}
                    </Text>
                  </View>
                  <View
                    style={[ultimosResultadosStyle.resultPill, estiloPill]}
                  >
                    <Text
                      style={[
                        ultimosResultadosStyle.resultPillText,
                        { color: corTexto },
                      ]}
                    >
                      {item.resultado}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
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
            source={require("@/assets/images/img/campeonatosVermelho.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive} numberOfLines={1}>
            Campeonatos
          </Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/desempenhoBranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
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
