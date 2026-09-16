import campeonatoDetalheStyle from "@/styles/campeonatoDetalheStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CampeonatoDetalhe() {
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
        contentContainerStyle={campeonatoDetalheStyle.scrollContent}
      >
        <View style={campeonatoDetalheStyle.header}>
          <View style={campeonatoDetalheStyle.headerTopRow}>
            <Pressable
              style={campeonatoDetalheStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={campeonatoDetalheStyle.backChevron}>‹</Text>
              <Text style={campeonatoDetalheStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={campeonatoDetalheStyle.headerTitleCol}>
              <Text
                style={campeonatoDetalheStyle.headerTitle}
                numberOfLines={1}
              >
                Campeonato Paulista
              </Text>
              <Text
                style={campeonatoDetalheStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={campeonatoDetalheStyle.headerIconsRow}>
              <View style={campeonatoDetalheStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={campeonatoDetalheStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={campeonatoDetalheStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={campeonatoDetalheStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={campeonatoDetalheStyle.notificationBadge}>
                  <Text style={campeonatoDetalheStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={campeonatoDetalheStyle.infoCard}>
          <View style={campeonatoDetalheStyle.infoCardTopRow}>
            <View style={campeonatoDetalheStyle.infoCardLeftGroup}>
              <Image
                source={require("@/assets/images/img/logo/logoCopaEscola.png")}
                style={campeonatoDetalheStyle.crestImage}
                resizeMode="contain"
              />
              <View style={campeonatoDetalheStyle.detailsCol}>
                <View style={campeonatoDetalheStyle.detailRow}>
                  <Text style={campeonatoDetalheStyle.detailLabel}>
                    Temporada
                  </Text>
                  <Text style={campeonatoDetalheStyle.detailValue}>2026</Text>
                </View>
                <View style={campeonatoDetalheStyle.detailRow}>
                  <Text style={campeonatoDetalheStyle.detailLabel}>
                    Organizador
                  </Text>
                  <Text style={campeonatoDetalheStyle.detailValue}>
                    Federação Paulista de Futebol
                  </Text>
                </View>
              </View>
            </View>
            <View style={campeonatoDetalheStyle.statusPill}>
              <Text style={campeonatoDetalheStyle.statusPillText}>
                Em andamento
              </Text>
            </View>
          </View>
        </View>

        <View style={campeonatoDetalheStyle.progressSection}>
          <Text style={campeonatoDetalheStyle.sectionTitle}>
            Progresso da temporada
          </Text>

          <View style={campeonatoDetalheStyle.progressLabelRow}>
            <Text>
              <Text style={campeonatoDetalheStyle.progressLabelMuted}>
                Rodada{"  "}
              </Text>
              <Text style={campeonatoDetalheStyle.progressLabelValue}>
                9 de 14
              </Text>
            </Text>
            <Text style={campeonatoDetalheStyle.progressPercentText}>
              75%
            </Text>
          </View>
          <View style={campeonatoDetalheStyle.progressTrack}>
            <View
              style={[campeonatoDetalheStyle.progressFill, { width: "75%" }]}
            />
          </View>

          <Text style={campeonatoDetalheStyle.nextPhaseText}>
            Próxima fase:{" "}
            <Text style={campeonatoDetalheStyle.nextPhaseValue}>
              Semifinais
            </Text>
          </Text>
        </View>

        <View style={campeonatoDetalheStyle.statsSection}>
          <Text style={campeonatoDetalheStyle.sectionTitle}>
            Estatísticas da campanha
          </Text>

          <View style={campeonatoDetalheStyle.statsGrid}>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>5</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Vitórias</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>2</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Empates</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>1</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Derrotas</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>18</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Pontos</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>+11</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Saldo</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>18</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>Gols Pró</Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>7</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Gols Contra
              </Text>
            </View>
            <View style={campeonatoDetalheStyle.statTile}>
              <Text style={campeonatoDetalheStyle.statValue}>75%</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Aproveitamento
              </Text>
            </View>
          </View>
        </View>

        <View style={campeonatoDetalheStyle.matchCard}>
          <Text style={campeonatoDetalheStyle.matchCardTitle}>
            Próxima partida
          </Text>

          <View style={campeonatoDetalheStyle.matchTeamsRow}>
            <View style={campeonatoDetalheStyle.matchTeamCol}>
              <Image
                source={require("@/assets/images/img/logo/logo-aacj.png")}
                style={campeonatoDetalheStyle.matchTeamCrest}
                resizeMode="contain"
              />
              <Text style={campeonatoDetalheStyle.matchTeamName}>AACJ</Text>
            </View>

            <View style={campeonatoDetalheStyle.matchCenterCol}>
              <Text style={campeonatoDetalheStyle.matchDay}>Domingo</Text>
              <Text style={campeonatoDetalheStyle.matchTime}>15:30</Text>
              <Text style={campeonatoDetalheStyle.matchLocal}>
                Estádio Municipal
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.matchTeamCol}>
              <Image
                source={require("@/assets/images/img/logo/time-preto.jpg")}
                style={campeonatoDetalheStyle.matchTeamCrest}
                resizeMode="contain"
              />
              <Text style={campeonatoDetalheStyle.matchTeamName}>
                Time preto
              </Text>
            </View>
          </View>

          <View style={campeonatoDetalheStyle.matchBottomRow}>
            <View style={campeonatoDetalheStyle.matchBottomSide} />
            <View style={campeonatoDetalheStyle.matchConfirmedPill}>
              <Text style={campeonatoDetalheStyle.matchConfirmedText}>
                Confirmado
              </Text>
            </View>
            <View style={campeonatoDetalheStyle.matchBottomSideRight}>
              <Text style={campeonatoDetalheStyle.matchVerDetalhesText}>
                Ver detalhes {">"}
              </Text>
            </View>
          </View>
        </View>

        <View style={campeonatoDetalheStyle.twoColSection}>
          <View style={campeonatoDetalheStyle.colClassificacao}>
            <View style={campeonatoDetalheStyle.colHeaderRow}>
              <Text style={campeonatoDetalheStyle.colTitle} numberOfLines={1}>
                Classificação
              </Text>
              <Pressable onPress={() => router.navigate("/classificacao")}>
                <Text style={campeonatoDetalheStyle.colLink} numberOfLines={1}>
                  Ver completo {">"}
                </Text>
              </Pressable>
            </View>

            <View style={campeonatoDetalheStyle.standingRow}>
              <Text style={campeonatoDetalheStyle.standingPosition}>1</Text>
              <View style={campeonatoDetalheStyle.standingBadge} />
              <Text
                style={campeonatoDetalheStyle.standingName}
                numberOfLines={1}
              >
                Verdão
              </Text>
              <Text style={campeonatoDetalheStyle.standingPoints}>25</Text>
            </View>

            <View style={campeonatoDetalheStyle.standingRow}>
              <Text style={campeonatoDetalheStyle.standingPosition}>2</Text>
              <View style={campeonatoDetalheStyle.standingBadge} />
              <Text
                style={campeonatoDetalheStyle.standingName}
                numberOfLines={1}
              >
                AACJ
              </Text>
              <Text style={campeonatoDetalheStyle.standingPoints}>22</Text>
            </View>

            <View style={campeonatoDetalheStyle.standingRow}>
              <Text style={campeonatoDetalheStyle.standingPosition}>3</Text>
              <View style={campeonatoDetalheStyle.standingBadge} />
              <Text
                style={campeonatoDetalheStyle.standingName}
                numberOfLines={1}
              >
                Santos
              </Text>
              <Text style={campeonatoDetalheStyle.standingPoints}>18</Text>
            </View>
          </View>

          <View style={campeonatoDetalheStyle.colDivider} />

          <View style={campeonatoDetalheStyle.colResultados}>
            <View style={campeonatoDetalheStyle.colHeaderRow}>
              <Text style={campeonatoDetalheStyle.colTitle} numberOfLines={1}>
                Últimos Resultados
              </Text>
              <Pressable
                onPress={() => router.navigate("/ultimos-resultados")}
              >
                <Text style={campeonatoDetalheStyle.colLink} numberOfLines={1}>
                  Ver completo {">"}
                </Text>
              </Pressable>
            </View>

            <View style={campeonatoDetalheStyle.resultRow}>
              <Text
                style={campeonatoDetalheStyle.resultScoreText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                AACJ  2 X 0  Santos
              </Text>
              <View
                style={[
                  campeonatoDetalheStyle.resultPill,
                  campeonatoDetalheStyle.resultPillVitoria,
                ]}
              >
                <Text
                  style={[
                    campeonatoDetalheStyle.resultPillText,
                    { color: cores.verde },
                  ]}
                >
                  Vitória
                </Text>
              </View>
            </View>

            <View style={campeonatoDetalheStyle.resultRow}>
              <Text
                style={campeonatoDetalheStyle.resultScoreText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                AACJ  0 X 2  Verdão
              </Text>
              <View
                style={[
                  campeonatoDetalheStyle.resultPill,
                  campeonatoDetalheStyle.resultPillEmpate,
                ]}
              >
                <Text
                  style={[
                    campeonatoDetalheStyle.resultPillText,
                    { color: cores.branco70 },
                  ]}
                >
                  Empate
                </Text>
              </View>
            </View>

            <View style={campeonatoDetalheStyle.resultRow}>
              <Text
                style={campeonatoDetalheStyle.resultScoreText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                São Paulo  2 X 0  Santos
              </Text>
              <View
                style={[
                  campeonatoDetalheStyle.resultPill,
                  campeonatoDetalheStyle.resultPillDerrota,
                ]}
              >
                <Text
                  style={[
                    campeonatoDetalheStyle.resultPillText,
                    { color: cores.laranja },
                  ]}
                >
                  Derrota
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={campeonatoDetalheStyle.sectionDivider} />

        <View style={campeonatoDetalheStyle.proximasSection}>
          <View style={campeonatoDetalheStyle.proximasHeaderRow}>
            <Text style={campeonatoDetalheStyle.proximasTitle}>
              Próximas partidas
            </Text>
            <Pressable onPress={() => router.navigate("/proxima-partida")}>
              <Text style={campeonatoDetalheStyle.proximasLink}>
                Ver completo {">"}
              </Text>
            </Pressable>
          </View>

          <View style={campeonatoDetalheStyle.proximasHeaderDivider} />

          <View style={campeonatoDetalheStyle.proximaRow}>
            <Text style={campeonatoDetalheStyle.proximaData} numberOfLines={1}>
              <Text style={campeonatoDetalheStyle.proximaDataDia}>Dom </Text>
              11/05
            </Text>
            <Text
              style={campeonatoDetalheStyle.proximaTeams}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              AACJ
              <Text style={campeonatoDetalheStyle.proximaTeamsVs}> vs </Text>
              Verdão
            </Text>
            <Text style={campeonatoDetalheStyle.proximaHora}>15:30</Text>
          </View>

          <View style={campeonatoDetalheStyle.proximaRow}>
            <Text style={campeonatoDetalheStyle.proximaData} numberOfLines={1}>
              <Text style={campeonatoDetalheStyle.proximaDataDia}>Dom </Text>
              11/05
            </Text>
            <Text
              style={campeonatoDetalheStyle.proximaTeams}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              AACJ
              <Text style={campeonatoDetalheStyle.proximaTeamsVs}> vs </Text>
              Ferrroviaria
            </Text>
            <Text style={campeonatoDetalheStyle.proximaHora}>18:00</Text>
          </View>

          <View style={campeonatoDetalheStyle.proximaRow}>
            <Text style={campeonatoDetalheStyle.proximaData} numberOfLines={1}>
              <Text style={campeonatoDetalheStyle.proximaDataDia}>Dom </Text>
              11/05
            </Text>
            <Text
              style={campeonatoDetalheStyle.proximaTeams}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              AACJ
              <Text style={campeonatoDetalheStyle.proximaTeamsVs}> vs </Text>
              Guarani
            </Text>
            <Text style={campeonatoDetalheStyle.proximaHora}>09:00</Text>
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
