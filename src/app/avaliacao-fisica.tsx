import TabBar from "@/components/tabBar";
import avaliacaoFisicaStyle from "@/styles/avaliacaoFisicaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const INDICE_PONTOS = 92;

const COMPARACAO_ALTURA = 70;
const COMPARACAO_ALTURA_PREENCHIMENTO = 200;
const COMPARACAO_VALORES = [20, 35, 40, 52, 60, 72, 95];

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

const percentualDireita = Math.min(100, INDICE_PONTOS * 2);
const percentualEsquerda = Math.max(0, Math.min(100, (INDICE_PONTOS - 50) * 2));
const rotacaoDireita = -135 + (percentualDireita / 100) * 180;
const rotacaoEsquerda = -135 + (percentualEsquerda / 100) * 180;

export default function AvaliacaoFisica() {
  const [comparacaoLargura, setComparacaoLargura] = useState(0);
  const [gradeLargura, setGradeLargura] = useState(0);
  const larguraCard = gradeLargura > 0 ? (gradeLargura - 10) / 2 : undefined;
  const alturaCard = larguraCard ? larguraCard * (80 / 185) : undefined;

  const comparacaoMin = Math.min(...COMPARACAO_VALORES);
  const comparacaoMax = Math.max(...COMPARACAO_VALORES);

  const pontosComparacao = COMPARACAO_VALORES.map((valor, index) => ({
    x: (index / (COMPARACAO_VALORES.length - 1)) * comparacaoLargura,
    y:
      COMPARACAO_ALTURA -
      ((valor - comparacaoMin) / (comparacaoMax - comparacaoMin)) *
        COMPARACAO_ALTURA,
  }));

  const segmentosComparacao = pontosComparacao.slice(0, -1).map((ponto, index) => {
    const proximoPonto = pontosComparacao[index + 1];
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
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={avaliacaoFisicaStyle.scrollContent}
      >
        <View style={avaliacaoFisicaStyle.header}>
          <View style={avaliacaoFisicaStyle.headerTopRow}>
            <Pressable
              style={avaliacaoFisicaStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={avaliacaoFisicaStyle.backChevron}>‹</Text>
              <Text style={avaliacaoFisicaStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={avaliacaoFisicaStyle.headerTitleCol}>
              <Text style={avaliacaoFisicaStyle.headerTitle} numberOfLines={1}>
                Avaliação Física
              </Text>
              <Text style={avaliacaoFisicaStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={avaliacaoFisicaStyle.headerIconsRow}>
              <View style={avaliacaoFisicaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={avaliacaoFisicaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={avaliacaoFisicaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={avaliacaoFisicaStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={avaliacaoFisicaStyle.notificationBadge}>
                  <Text style={avaliacaoFisicaStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={avaliacaoFisicaStyle.indiceCard}>
          <View style={avaliacaoFisicaStyle.anelContainer}>
            <View style={avaliacaoFisicaStyle.anelTrilha} />

            <View
              style={[
                avaliacaoFisicaStyle.anelMetade,
                avaliacaoFisicaStyle.anelMetadeDireita,
              ]}
            >
              <View
                style={[
                  avaliacaoFisicaStyle.anelPreenchimento,
                  avaliacaoFisicaStyle.anelPreenchimentoDireita,
                  { transform: [{ rotate: `${rotacaoDireita}deg` }] },
                ]}
              />
            </View>

            <View
              style={[
                avaliacaoFisicaStyle.anelMetade,
                avaliacaoFisicaStyle.anelMetadeEsquerda,
              ]}
            >
              <View
                style={[
                  avaliacaoFisicaStyle.anelPreenchimento,
                  avaliacaoFisicaStyle.anelPreenchimentoEsquerda,
                  { transform: [{ rotate: `${rotacaoEsquerda}deg` }] },
                ]}
              />
            </View>

            <View style={avaliacaoFisicaStyle.anelCentro}>
              <Text style={avaliacaoFisicaStyle.indiceNumero}>
                {INDICE_PONTOS}
              </Text>
              <Text style={avaliacaoFisicaStyle.indiceNumeroLabel}>
                Pontos
              </Text>
            </View>
          </View>

          <View style={avaliacaoFisicaStyle.indiceStatusCol}>
            <Text style={avaliacaoFisicaStyle.indiceStatusText}>
              Excelente
            </Text>
          </View>

          <View style={avaliacaoFisicaStyle.indiceSeloCirculo}>
            <Image
              source={require("@/assets/images/img/estrela.png")}
              style={avaliacaoFisicaStyle.indiceSeloIcone}
              tintColor="#FFFFFF"
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={avaliacaoFisicaStyle.fundamentosSection}>
          <Text style={avaliacaoFisicaStyle.fundamentosLabel}>
            Temporada 2026 -
          </Text>

          <View
            style={avaliacaoFisicaStyle.fundamentosGrid}
            onLayout={(e) => setGradeLargura(e.nativeEvent.layout.width)}
          >
            {fundamentos.map((item) => (
              <View
                key={item.nome}
                style={[
                  avaliacaoFisicaStyle.fundamentoCard,
                  { width: larguraCard, height: alturaCard },
                ]}
              >
                <Text style={avaliacaoFisicaStyle.fundamentoCardTitle}>
                  {item.nome}
                </Text>
                <View style={avaliacaoFisicaStyle.fundamentoCardRow}>
                  <Image
                    source={item.icone}
                    style={avaliacaoFisicaStyle.fundamentoCardIcone}
                    resizeMode="contain"
                  />
                  <Text style={avaliacaoFisicaStyle.fundamentoCardValor}>
                    {item.valor}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={avaliacaoFisicaStyle.comparacaoCard}>
          <View style={avaliacaoFisicaStyle.comparacaoLeftCol}>
            <Text style={avaliacaoFisicaStyle.comparacaoTitulo}>
              Comparação com última avaliação
            </Text>

            <View
              style={avaliacaoFisicaStyle.comparacaoGraficoArea}
              onLayout={(e) =>
                setComparacaoLargura(e.nativeEvent.layout.width)
              }
            >
              {comparacaoLargura > 0 &&
                segmentosComparacao.map((seg, index) => (
                  <View
                    key={`preenchimento-${index}`}
                    style={[
                      avaliacaoFisicaStyle.comparacaoPreenchimentoRecorte,
                      { left: seg.inicioX, width: seg.larguraRecorte },
                    ]}
                  >
                    <LinearGradient
                      colors={["rgba(22,157,93,0.35)", "rgba(22,157,93,0)"]}
                      style={[
                        avaliacaoFisicaStyle.comparacaoPreenchimentoFaixa,
                        {
                          width: seg.comprimento,
                          height: COMPARACAO_ALTURA_PREENCHIMENTO,
                          left: seg.meioX - seg.comprimento / 2 - seg.inicioX,
                          top: seg.meioY - COMPARACAO_ALTURA_PREENCHIMENTO / 2,
                          transform: [
                            { rotate: `${seg.angulo}deg` },
                            { translateY: COMPARACAO_ALTURA_PREENCHIMENTO / 2 },
                          ],
                        },
                      ]}
                    />
                  </View>
                ))}

              {comparacaoLargura > 0 &&
                segmentosComparacao.map((seg, index) => (
                  <View
                    key={`linha-${index}`}
                    style={[
                      avaliacaoFisicaStyle.comparacaoLinhaSegmento,
                      {
                        width: seg.comprimento,
                        left: seg.meioX - seg.comprimento / 2,
                        top: seg.meioY - 1,
                        transform: [{ rotate: `${seg.angulo}deg` }],
                      },
                    ]}
                  />
                ))}

              {comparacaoLargura > 0 &&
                pontosComparacao.map((ponto, index) => (
                  <View
                    key={`ponto-${index}`}
                    style={[
                      avaliacaoFisicaStyle.comparacaoPonto,
                      { left: ponto.x - 4, top: ponto.y - 4 },
                    ]}
                  />
                ))}
            </View>
          </View>

          <View style={avaliacaoFisicaStyle.comparacaoDivider} />

          <View style={avaliacaoFisicaStyle.comparacaoRightCol}>
            <View style={avaliacaoFisicaStyle.comparacaoIndicadorRow}>
              <Text style={avaliacaoFisicaStyle.comparacaoSeta}>↑</Text>
              <Text style={avaliacaoFisicaStyle.comparacaoValor}>+5</Text>
            </View>
            <Text style={avaliacaoFisicaStyle.comparacaoPontosLabel}>
              Pontos
            </Text>
          </View>
        </View>

        <View style={avaliacaoFisicaStyle.resumoSection}>
          <Text style={avaliacaoFisicaStyle.resumoTemporada}>
            Temporada 2026
          </Text>
          <Text style={avaliacaoFisicaStyle.resumoMensagem}>
            Continue evoluindo na resistência.{"\n"}Excelente desempenho
            físico nas últimas semanas.
          </Text>

          <Pressable style={avaliacaoFisicaStyle.resumoCard}>
            <Image
              source={require("@/assets/images/img/agendaVermelha.png")}
              style={avaliacaoFisicaStyle.resumoCardIcone}
              resizeMode="contain"
            />
            <View style={avaliacaoFisicaStyle.resumoCardTextCol}>
              <Text style={avaliacaoFisicaStyle.resumoCardLabel}>
                Próxima avaliação
              </Text>
              <Text style={avaliacaoFisicaStyle.resumoCardValor}>
                18 de Junho{" "}
                <Text style={avaliacaoFisicaStyle.resumoCardValorPonto}>
                  •
                </Text>{" "}
                09:00
              </Text>
            </View>
            <Text style={avaliacaoFisicaStyle.resumoCardChevron}>›</Text>
          </Pressable>
        </View>
      </ScrollView>

      <TabBar abaAtiva="desempenho" animateActiveIndicator />
    </View>
  );
}
