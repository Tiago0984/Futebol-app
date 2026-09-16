import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import proximaPartidaStyle from "@/styles/proximaPartidaStyle";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const crestAacj = require("@/assets/images/img/logo/logo-aacj.png");
const crestTimePreto = require("@/assets/images/img/logo/time-preto.jpg");

const partidas = [
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
];

export default function ProximaPartida() {
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
        contentContainerStyle={proximaPartidaStyle.scrollContent}
      >
        <View style={proximaPartidaStyle.header}>
          <View style={proximaPartidaStyle.headerTopRow}>
            <Pressable
              style={proximaPartidaStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={proximaPartidaStyle.backChevron}>‹</Text>
              <Text style={proximaPartidaStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={proximaPartidaStyle.headerTitleCol}>
              <Text style={proximaPartidaStyle.headerTitle} numberOfLines={1}>
                Próximas partidas
              </Text>
              <Text
                style={proximaPartidaStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={proximaPartidaStyle.headerIconsRow}>
              <View style={proximaPartidaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={proximaPartidaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={proximaPartidaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={proximaPartidaStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={proximaPartidaStyle.notificationBadge}>
                  <Text style={proximaPartidaStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={proximaPartidaStyle.listSection}>
          <View>
            {partidas.map((item, index) => {
              const ehUltimo = index === partidas.length - 1;

              return (
                <View key={index} style={proximaPartidaStyle.partidaRow}>
                  <View style={proximaPartidaStyle.dateCol}>
                    <Text style={proximaPartidaStyle.dateDay}>
                      {item.dia}
                    </Text>
                    <Text style={proximaPartidaStyle.dateWeekday}>
                      {item.semana}
                    </Text>
                  </View>

                  <View style={proximaPartidaStyle.lineCol}>
                    <View style={proximaPartidaStyle.lineDot} />
                    {!ehUltimo && (
                      <View style={proximaPartidaStyle.lineConnector} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={proximaPartidaStyle.listCard}>
            {partidas.map((item, index) => {
              const ehUltimo = index === partidas.length - 1;

              return (
                <View
                  key={index}
                  style={[
                    proximaPartidaStyle.partidaItem,
                    !ehUltimo && proximaPartidaStyle.partidaItemDivider,
                  ]}
                >
                  <Image
                    source={item.crest}
                    style={proximaPartidaStyle.partidaCrest}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.partidaTextCol}>
                    <Text
                      style={proximaPartidaStyle.partidaTeams}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      AACJ
                      <Text style={proximaPartidaStyle.partidaVs}> VS </Text>
                      {item.adversario}
                    </Text>
                    <Text
                      style={proximaPartidaStyle.partidaCompeticao}
                      numberOfLines={1}
                    >
                      {item.competicao}
                    </Text>
                    <Text
                      style={proximaPartidaStyle.partidaLocal}
                      numberOfLines={1}
                    >
                      {item.local}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => router.navigate("/detalhe-proxima-partida")}
                  >
                    <Text style={proximaPartidaStyle.verDetalhesText}>
                      Ver detalhes {">"}
                    </Text>
                  </Pressable>
                </View>
              );
            })}
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
