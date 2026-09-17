import conquistasStyle from "@/styles/conquistasStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const conquistas = [
  {
    valor: "100%",
    label: "Presença",
    icone: require("@/assets/images/img/medalhadourada.png"),
  },
  {
    valor: "10",
    label: "Jogos",
    icone: require("@/assets/images/img/estreladourada.png"),
  },
  {
    valor: "Primeira",
    label: "Jogos",
    icone: require("@/assets/images/img/escudodourado.png"),
  },
  {
    valor: "10",
    label: "Jogos",
    icone: require("@/assets/images/img/pesodourado.png"),
  },
];

const proximasConquistas = [
  { valor: "20", label: "Jogos", percentual: 75 },
  { valor: "50", label: "Treinos", percentual: 36 },
];

export default function Conquistas() {
  const indicadorAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [linhaLargura, setLinhaLargura] = useState(0);
  const larguraCard = linhaLargura > 0 ? (linhaLargura - 3 * 10) / 4 : undefined;
  const alturaCard = larguraCard ? larguraCard * (120 / 90) : undefined;

  const [proximasLargura, setProximasLargura] = useState(0);
  const larguraProximaCard =
    proximasLargura > 0 ? (proximasLargura - 10) / 2 : undefined;
  const alturaProximaCard = larguraProximaCard
    ? larguraProximaCard * (100 / 185)
    : undefined;

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
        contentContainerStyle={conquistasStyle.scrollContent}
      >
        <View style={conquistasStyle.header}>
          <View style={conquistasStyle.headerTopRow}>
            <Pressable
              style={conquistasStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={conquistasStyle.backChevron}>‹</Text>
              <Text style={conquistasStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={conquistasStyle.headerTitleCol}>
              <Text style={conquistasStyle.headerTitle} numberOfLines={1}>
                Conquistas
              </Text>
              <Text style={conquistasStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={conquistasStyle.headerIconsRow}>
              <View style={conquistasStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={conquistasStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={conquistasStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={conquistasStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={conquistasStyle.notificationBadge}>
                  <Text style={conquistasStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={conquistasStyle.conquistasSection}>
          <Text style={conquistasStyle.conquistasTitulo}>Conquistas</Text>

          <View
            style={conquistasStyle.conquistasRow}
            onLayout={(e) => setLinhaLargura(e.nativeEvent.layout.width)}
          >
            {conquistas.map((item, index) => (
              <View
                key={index}
                style={[
                  conquistasStyle.conquistaCard,
                  { width: larguraCard, height: alturaCard },
                ]}
              >
                <Image
                  source={item.icone}
                  style={conquistasStyle.conquistaIcone}
                  resizeMode="contain"
                />
                <Text style={conquistasStyle.conquistaValor}>
                  {item.valor}
                </Text>
                <Text style={conquistasStyle.conquistaLabel}>
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={conquistasStyle.proximasSection}>
          <Text style={conquistasStyle.proximasTitulo}>
            Próximas conquistas
          </Text>

          <View
            style={conquistasStyle.proximasRow}
            onLayout={(e) => setProximasLargura(e.nativeEvent.layout.width)}
          >
            {proximasConquistas.map((item, index) => (
              <View
                key={index}
                style={[
                  conquistasStyle.proximaCard,
                  { width: larguraProximaCard, height: alturaProximaCard },
                ]}
              >
                <View style={conquistasStyle.proximaHeaderRow}>
                  <Image
                    source={require("@/assets/images/img/cadeadoPretoFundoTransparente.png")}
                    style={conquistasStyle.proximaIcone}
                    resizeMode="contain"
                  />
                  <View style={conquistasStyle.proximaTextCol}>
                    <Text style={conquistasStyle.proximaValor}>
                      {item.valor}
                    </Text>
                    <Text style={conquistasStyle.proximaLabel}>
                      {item.label}
                    </Text>
                  </View>
                  <Text style={conquistasStyle.proximaPercentual}>
                    {item.percentual}%
                  </Text>
                </View>

                <View style={conquistasStyle.proximaBarraTrack}>
                  <View
                    style={[
                      conquistasStyle.proximaBarraPreenchimento,
                      { width: `${item.percentual}%` },
                    ]}
                  />
                </View>
              </View>
            ))}
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
