import indicadoresStyle from "@/styles/indicadoresStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GRAFICO_ALTURA = 40;
const GRAFICO_ALTURA_PREENCHIMENTO = 120;

const indicadores = [
  {
    nome: "Velocidade",
    icone: require("@/assets/images/img/atletaVerde.png"),
    valores: [20, 35, 30, 45, 42, 55, 50, 70, 95],
    percentual: 8,
  },
  {
    nome: "Força",
    icone: require("@/assets/images/img/musculoverde.png"),
    valores: [30, 38, 34, 46, 44, 52, 48, 60, 78],
    percentual: 4,
  },
  {
    nome: "Resistência",
    icone: require("@/assets/images/img/coracaoVerde.png"),
    valores: [25, 32, 40, 38, 50, 46, 58, 66, 90],
    percentual: 6,
  },
  {
    nome: "Agilidade",
    icone: require("@/assets/images/img/agilidadeverde.png"),
    valores: [22, 28, 34, 30, 40, 44, 50, 56, 72],
    percentual: 3,
  },
  {
    nome: "Flexibilidade",
    icone: require("@/assets/images/img/flexibilidadeverde.png"),
    valores: [18, 24, 22, 30, 28, 36, 34, 44, 60],
    percentual: 2,
  },
];

function MiniGrafico({ valores }: { valores: number[] }) {
  const [largura, setLargura] = useState(0);

  const minValor = Math.min(...valores);
  const maxValor = Math.max(...valores);

  const pontos = valores.map((valor, index) => ({
    x: (index / (valores.length - 1)) * largura,
    y:
      GRAFICO_ALTURA -
      ((valor - minValor) / (maxValor - minValor)) * GRAFICO_ALTURA,
  }));

  const segmentos = pontos.slice(0, -1).map((ponto, index) => {
    const proximoPonto = pontos[index + 1];
    const deltaX = proximoPonto.x - ponto.x;
    const deltaY = proximoPonto.y - ponto.y;
    const comprimento = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angulo = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

    return {
      comprimento,
      angulo,
      meioX: (ponto.x + proximoPonto.x) / 2,
      meioY: (ponto.y + proximoPonto.y) / 2,
      inicioX: Math.min(ponto.x, proximoPonto.x),
      larguraRecorte: Math.abs(deltaX),
    };
  });

  return (
    <View
      style={indicadoresStyle.graficoArea}
      onLayout={(e) => setLargura(e.nativeEvent.layout.width)}
    >
      {largura > 0 &&
        segmentos.map((seg, index) => (
          <View
            key={`preenchimento-${index}`}
            style={[
              indicadoresStyle.graficoPreenchimentoRecorte,
              { left: seg.inicioX, width: seg.larguraRecorte },
            ]}
          >
            <LinearGradient
              colors={["rgba(22,157,93,0.35)", "rgba(22,157,93,0)"]}
              style={[
                indicadoresStyle.graficoPreenchimentoFaixa,
                {
                  width: seg.comprimento,
                  height: GRAFICO_ALTURA_PREENCHIMENTO,
                  left: seg.meioX - seg.comprimento / 2 - seg.inicioX,
                  top: seg.meioY - GRAFICO_ALTURA_PREENCHIMENTO / 2,
                  transform: [
                    { rotate: `${seg.angulo}deg` },
                    { translateY: GRAFICO_ALTURA_PREENCHIMENTO / 2 },
                  ],
                },
              ]}
            />
          </View>
        ))}

      {largura > 0 &&
        segmentos.map((seg, index) => (
          <View
            key={`linha-${index}`}
            style={[
              indicadoresStyle.graficoLinhaSegmento,
              {
                width: seg.comprimento,
                left: seg.meioX - seg.comprimento / 2,
                top: seg.meioY - 1,
                transform: [{ rotate: `${seg.angulo}deg` }],
              },
            ]}
          />
        ))}

      {largura > 0 &&
        pontos.map((ponto, index) => (
          <View
            key={`ponto-${index}`}
            style={[
              indicadoresStyle.graficoPonto,
              { left: ponto.x - 3, top: ponto.y - 3 },
            ]}
          />
        ))}
    </View>
  );
}

export default function Indicadores() {
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
        contentContainerStyle={indicadoresStyle.scrollContent}
      >
        <View style={indicadoresStyle.header}>
          <View style={indicadoresStyle.headerTopRow}>
            <Pressable
              style={indicadoresStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={indicadoresStyle.backChevron}>‹</Text>
              <Text style={indicadoresStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={indicadoresStyle.headerTitleCol}>
              <Text style={indicadoresStyle.headerTitle} numberOfLines={1}>
                Indicadores
              </Text>
              <Text style={indicadoresStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={indicadoresStyle.headerIconsRow}>
              <View style={indicadoresStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={indicadoresStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={indicadoresStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={indicadoresStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={indicadoresStyle.notificationBadge}>
                  <Text style={indicadoresStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={indicadoresStyle.listSection}>
          {indicadores.map((item) => (
            <View key={item.nome} style={indicadoresStyle.card}>
              <Image
                source={item.icone}
                style={indicadoresStyle.cardIcone}
                resizeMode="contain"
              />
              <Text style={indicadoresStyle.cardTitulo}>{item.nome}</Text>

              <MiniGrafico valores={item.valores} />

              <View style={indicadoresStyle.percentualCol}>
                <Text style={indicadoresStyle.percentualSeta}>↑</Text>
                <Text style={indicadoresStyle.percentualTexto}>
                  +{item.percentual}%
                </Text>
              </View>
            </View>
          ))}
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
