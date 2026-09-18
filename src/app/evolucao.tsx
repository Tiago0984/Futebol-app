import TabBar from "@/components/tabBar";
import evolucaoStyle from "@/styles/evolucaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const ALTURA_GRAFICO = 140;
const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"];
const VALORES = [30, 45, 55, 65, 80, 95];

const fundamentos = [
  {
    nome: "Velocidade",
    valor: 94,
    icone: require("@/assets/images/img/atletaVerde.png"),
  },
  {
    nome: "Resistência",
    valor: 89,
    icone: require("@/assets/images/img/coracaoVerde.png"),
  },
  {
    nome: "Força",
    valor: 91,
    icone: require("@/assets/images/img/musculoverde.png"),
  },
  {
    nome: "Agilidade",
    valor: 95,
    icone: require("@/assets/images/img/agilidadeverde.png"),
  },
  {
    nome: "Flexibilidade",
    valor: 87,
    icone: require("@/assets/images/img/flexibilidadeverde.png"),
  },
];

export default function Evolucao() {
  const [larguraGrafico, setLarguraGrafico] = useState(0);

  const pontos = VALORES.map((valor, index) => ({
    x: (index / (VALORES.length - 1)) * larguraGrafico,
    y: ALTURA_GRAFICO - (valor / 100) * ALTURA_GRAFICO,
  }));

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
        contentContainerStyle={evolucaoStyle.scrollContent}
      >
        <View style={evolucaoStyle.header}>
          <View style={evolucaoStyle.headerTopRow}>
            <Pressable
              style={evolucaoStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={evolucaoStyle.backChevron}>‹</Text>
              <Text style={evolucaoStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={evolucaoStyle.headerTitleCol}>
              <Text style={evolucaoStyle.headerTitle} numberOfLines={1}>
                Evolução Geral
              </Text>
              <Text style={evolucaoStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={evolucaoStyle.headerIconsRow}>
              <View style={evolucaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={evolucaoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={evolucaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={evolucaoStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={evolucaoStyle.notificationBadge}>
                  <Text style={evolucaoStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={evolucaoStyle.indiceCard}>
          <Text style={evolucaoStyle.indiceTitle}>Índice Geral</Text>
          <Text style={evolucaoStyle.indiceNumero}>91</Text>
          <Text style={evolucaoStyle.indiceStatus}>Excelente Evolução</Text>

          <View style={evolucaoStyle.indicePill}>
            <Text style={evolucaoStyle.indicePillText}>↑ +8%</Text>
          </View>

          <Text style={evolucaoStyle.indiceCaption}>
            mês atual / julho
          </Text>

          <View style={evolucaoStyle.indiceDivider} />

          <View style={evolucaoStyle.statsRow}>
            <View style={evolucaoStyle.statCol}>
              <Image
                source={require("@/assets/images/img/userVerdeClaro.png")}
                style={evolucaoStyle.statIcon}
                resizeMode="contain"
              />
              <Text style={evolucaoStyle.statLabel}>Presença</Text>
              <Text style={evolucaoStyle.statValue}>94%</Text>
            </View>
            <View style={evolucaoStyle.statDivider} />
            <View style={evolucaoStyle.statCol}>
              <Image
                source={require("@/assets/images/img/pesovermelho.png")}
                style={evolucaoStyle.statIcon}
                resizeMode="contain"
              />
              <Text style={evolucaoStyle.statLabel}>Treinos</Text>
              <Text style={evolucaoStyle.statValue}>18</Text>
            </View>
            <View style={evolucaoStyle.statDivider} />
            <View style={evolucaoStyle.statCol}>
              <Image
                source={require("@/assets/images/img/bolaVermelha.png")}
                style={evolucaoStyle.statIcon}
                resizeMode="contain"
              />
              <Text style={evolucaoStyle.statLabel}>Jogos</Text>
              <Text style={evolucaoStyle.statValue}>14</Text>
            </View>
            <View style={evolucaoStyle.statDivider} />
            <View style={evolucaoStyle.statCol}>
              <Image
                source={require("@/assets/images/img/pranchetaVermelha.png")}
                style={evolucaoStyle.statIcon}
                resizeMode="contain"
              />
              <Text style={evolucaoStyle.statLabel}>Avaliações</Text>
              <Text style={evolucaoStyle.statValue}>7</Text>
            </View>
          </View>
        </View>

        <View style={evolucaoStyle.chartSection}>
          <View style={evolucaoStyle.chartHeaderRow}>
            <Text style={evolucaoStyle.chartTitle}>Evolução</Text>
            <Text style={evolucaoStyle.chartCaption} numberOfLines={1}>
              (clique no mês para visualizar as estatísticas referentes à
              ele)
            </Text>
          </View>

          <View style={evolucaoStyle.chartBody}>
            <View style={evolucaoStyle.yAxisCol}>
              <Text style={evolucaoStyle.yAxisLabel}>100</Text>
              <Text style={evolucaoStyle.yAxisLabel}>75</Text>
              <Text style={evolucaoStyle.yAxisLabel}>50</Text>
              <Text style={evolucaoStyle.yAxisLabel}>25</Text>
              <Text style={evolucaoStyle.yAxisLabel}>0</Text>
            </View>

            <View
              style={evolucaoStyle.chartArea}
              onLayout={(e) => setLarguraGrafico(e.nativeEvent.layout.width)}
            >
              <View style={evolucaoStyle.chartBaseline} />

              {larguraGrafico > 0 &&
                pontos.slice(0, -1).map((ponto, index) => {
                  const proximoPonto = pontos[index + 1];
                  const deltaX = proximoPonto.x - ponto.x;
                  const deltaY = proximoPonto.y - ponto.y;
                  const comprimento = Math.sqrt(
                    deltaX * deltaX + deltaY * deltaY,
                  );
                  const angulo = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;
                  const meioX = (ponto.x + proximoPonto.x) / 2;
                  const meioY = (ponto.y + proximoPonto.y) / 2;

                  return (
                    <View
                      key={index}
                      style={[
                        evolucaoStyle.chartLineSegment,
                        {
                          width: comprimento,
                          left: meioX - comprimento / 2,
                          top: meioY - 1.5,
                          transform: [{ rotate: `${angulo}deg` }],
                        },
                      ]}
                    />
                  );
                })}

              {larguraGrafico > 0 &&
                pontos.map((ponto, index) => (
                  <View
                    key={index}
                    style={[
                      evolucaoStyle.chartDot,
                      { left: ponto.x - 7, top: ponto.y - 7 },
                    ]}
                  />
                ))}
            </View>
          </View>

          <View style={evolucaoStyle.monthsRow}>
            {MESES.map((mes) => (
              <Text key={mes} style={evolucaoStyle.monthLabel}>
                {mes}
              </Text>
            ))}
          </View>

          <Text style={evolucaoStyle.chartFooterText}>
            ↑ Evolução constante
          </Text>
        </View>

        <View style={evolucaoStyle.fundamentosSection}>
          <Text style={evolucaoStyle.fundamentosTitle}>
            Resumo dos fundamentos
          </Text>

          <View style={evolucaoStyle.fundamentosRow}>
            {fundamentos.map((item) => (
              <View key={item.nome} style={evolucaoStyle.fundamentoCol}>
                <Text
                  style={evolucaoStyle.fundamentoLabel}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                >
                  {item.nome}
                </Text>
                <Text style={evolucaoStyle.fundamentoValor}>
                  {item.valor}
                </Text>
                <Image
                  source={item.icone}
                  style={evolucaoStyle.fundamentoIcon}
                  resizeMode="contain"
                />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <TabBar abaAtiva="desempenho" />
    </View>
  );
}
