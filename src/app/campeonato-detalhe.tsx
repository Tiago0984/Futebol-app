import TabBar from "@/components/tabBar";
import campeonatoDetalheStyle from "@/styles/campeonatoDetalheStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CampeonatoDetalhe() {
  const insets = useSafeAreaInsets();

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={campeonatoDetalheStyle.scrollView}
        contentContainerStyle={[
          campeonatoDetalheStyle.scrollContent,
          {
            paddingBottom:
              TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={campeonatoDetalheStyle.header}>
          <Pressable
            style={campeonatoDetalheStyle.backButton}
            onPress={() => router.back()}
          >
            <Text style={campeonatoDetalheStyle.backText}>
              {"<"} Voltar
            </Text>
          </Pressable>

          <View style={campeonatoDetalheStyle.headerTitleCol}>
            <Text style={campeonatoDetalheStyle.screenTitle}>
              Campeonato Paulista
            </Text>

            <Text style={campeonatoDetalheStyle.screenSubtitle}>
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

        {/* INFORMAÇÕES DO CAMPEONATO */}
        <View style={campeonatoDetalheStyle.infoCard}>
          <Image
            source={require("@/assets/images/img/logo/logoCopaEscolaSemFundo.png")}
            style={campeonatoDetalheStyle.campeonatoLogo}
            resizeMode="contain"
          />

          <View style={campeonatoDetalheStyle.infoContent}>
            <View style={campeonatoDetalheStyle.infoHeaderRow}>
              <View />

              <View style={campeonatoDetalheStyle.statusPill}>
                <Text style={campeonatoDetalheStyle.statusPillText}>
                  Em andamento
                </Text>
              </View>
            </View>

            <View style={campeonatoDetalheStyle.infoRows}>
              <View style={campeonatoDetalheStyle.infoRow}>
                <Text style={campeonatoDetalheStyle.infoLabel}>
                  Temporada
                </Text>

                <Text style={campeonatoDetalheStyle.infoValue}>
                  2026
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.infoRow}>
                <Text style={campeonatoDetalheStyle.infoLabel}>
                  Organizador
                </Text>

                <Text style={campeonatoDetalheStyle.infoValue}>
                  Federação Paulista de Futebol
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.infoRow}>
                <Text style={campeonatoDetalheStyle.infoLabel}>
                  Equipes
                </Text>

                <Text style={campeonatoDetalheStyle.infoValue}>
                  16
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.infoRow}>
                <Text style={campeonatoDetalheStyle.infoLabel}>
                  Formato
                </Text>

                <Text style={campeonatoDetalheStyle.infoValue}>
                  Pontos corridos
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.infoRow}>
                <Text style={campeonatoDetalheStyle.infoLabel}>
                  Período
                </Text>

                <Text style={campeonatoDetalheStyle.infoValue}>
                  15/03/2026 a 30/08/2026
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* PROGRESSO DA TEMPORADA */}
        <View style={campeonatoDetalheStyle.section}>
          <Text style={campeonatoDetalheStyle.sectionTitle}>
            Progresso da temporada
          </Text>

          <View style={campeonatoDetalheStyle.progressHeader}>
            <View style={campeonatoDetalheStyle.progressRoundCol}>
              <Text style={campeonatoDetalheStyle.progressLabel}>
                Rodada
              </Text>

              <Text style={campeonatoDetalheStyle.progressValue}>
                9 de 14
              </Text>
            </View>

            <Text style={campeonatoDetalheStyle.progressPercent}>
              75%
            </Text>
          </View>

          <View style={campeonatoDetalheStyle.progressTrack}>
            <View
              style={[
                campeonatoDetalheStyle.progressFill,
                { width: "75%" },
              ]}
            />
          </View>

          <Text style={campeonatoDetalheStyle.nextPhaseText}>
            Próxima fase:{" "}
            <Text style={campeonatoDetalheStyle.nextPhaseValue}>
              Semifinais
            </Text>
          </Text>
        </View>

        {/* ESTATÍSTICAS */}
        <View style={campeonatoDetalheStyle.section}>
          <Text style={campeonatoDetalheStyle.sectionTitle}>
            Estatísticas da campanha
          </Text>

          <View style={campeonatoDetalheStyle.statsGrid}>
            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>5</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Vitórias
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>2</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Empates
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>1</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Derrotas
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>18</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Pontos
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>+11</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Saldo
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>18</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Gols Pró
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>7</Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Gols Contra
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.statCard}>
              <Text style={campeonatoDetalheStyle.statValue}>
                75%
              </Text>
              <Text style={campeonatoDetalheStyle.statLabel}>
                Aproveitamento
              </Text>
            </View>
          </View>
        </View>

        {/* PRÓXIMA PARTIDA */}
        <View style={campeonatoDetalheStyle.matchCard}>
          <Text style={campeonatoDetalheStyle.matchCardTitle}>
            Próxima partida
          </Text>

          <View style={campeonatoDetalheStyle.matchContent}>
            <View style={campeonatoDetalheStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/logo-aacj.png")}
                style={campeonatoDetalheStyle.teamLogo}
                resizeMode="contain"
              />

              <Text style={campeonatoDetalheStyle.teamName}>
                AACJ
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.matchCenter}>
              <Text style={campeonatoDetalheStyle.matchDay}>
                Domingo
              </Text>

              <Text style={campeonatoDetalheStyle.matchTime}>
                15:30
              </Text>

              <Text style={campeonatoDetalheStyle.matchLocation}>
                Estádio Municipal
              </Text>

              <View style={campeonatoDetalheStyle.confirmedPill}>
                <Text style={campeonatoDetalheStyle.confirmedText}>
                  Confirmado
                </Text>
              </View>
            </View>

            <View style={campeonatoDetalheStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/time-preto.jpg")}
                style={campeonatoDetalheStyle.teamLogo}
                resizeMode="contain"
              />

              <Text style={campeonatoDetalheStyle.teamName}>
                Time preto
              </Text>
            </View>
          </View>

          <Pressable
            style={campeonatoDetalheStyle.matchDetailsButton}
            onPress={() => router.navigate("/detalhe-proxima-partida")}
          >
            <Text style={campeonatoDetalheStyle.matchDetailsText}>
              Ver detalhes {">"}
            </Text>
          </Pressable>
        </View>

        {/* CLASSIFICAÇÃO + RESULTADOS */}
        <View style={campeonatoDetalheStyle.tablesRow}>
          {/* CLASSIFICAÇÃO */}
          <View style={campeonatoDetalheStyle.tableColumn}>
            <View style={campeonatoDetalheStyle.tableHeaderRow}>
              <Text style={campeonatoDetalheStyle.tableTitle}>
                Classificação
              </Text>

              <Pressable onPress={() => router.navigate("/classificacao")}>
                <Text style={campeonatoDetalheStyle.tableLink}>
                  Ver completo {">"}
                </Text>
              </Pressable>
            </View>

            <View style={campeonatoDetalheStyle.tableRows}>
              <View style={campeonatoDetalheStyle.classificationRow}>
                <Text style={campeonatoDetalheStyle.position}>
                  1
                </Text>

                <View style={campeonatoDetalheStyle.teamDot} />

                <Text
                  style={campeonatoDetalheStyle.classificationTeam}
                >
                  Verdão
                </Text>

                <Text style={campeonatoDetalheStyle.points}>
                  25
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.classificationRow}>
                <Text style={campeonatoDetalheStyle.position}>
                  2
                </Text>

                <View style={campeonatoDetalheStyle.teamDot} />

                <Text
                  style={campeonatoDetalheStyle.classificationTeam}
                >
                  AACJ
                </Text>

                <Text style={campeonatoDetalheStyle.points}>
                  22
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.classificationRow}>
                <Text style={campeonatoDetalheStyle.position}>
                  3
                </Text>

                <View style={campeonatoDetalheStyle.teamDot} />

                <Text
                  style={campeonatoDetalheStyle.classificationTeam}
                >
                  Santos
                </Text>

                <Text style={campeonatoDetalheStyle.points}>
                  18
                </Text>
              </View>
            </View>
          </View>

          {/* DIVISOR + RESULTADOS */}
          <View
            style={[
              campeonatoDetalheStyle.tableColumn,
              campeonatoDetalheStyle.tableColumnRight,
            ]}
          >
            <View style={campeonatoDetalheStyle.tableHeaderRow}>
              <Text style={campeonatoDetalheStyle.tableTitle}>
                Últimos Resultados
              </Text>

              <Pressable onPress={() => router.navigate("/ultimos-resultados")}>
                <Text style={campeonatoDetalheStyle.tableLink}>
                  Ver completo {">"}
                </Text>
              </Pressable>
            </View>

            <View style={campeonatoDetalheStyle.tableRows}>
              <View style={campeonatoDetalheStyle.resultRow}>
                <Text style={campeonatoDetalheStyle.resultTeams}>
                  AACJ
                </Text>

                <Text style={campeonatoDetalheStyle.resultScore}>
                  2 X 0
                </Text>

                <Text style={campeonatoDetalheStyle.resultTeams}>
                  Santos
                </Text>

                <View style={campeonatoDetalheStyle.resultWin}>
                  <Text style={campeonatoDetalheStyle.resultWinText}>
                    Vitória
                  </Text>
                </View>
              </View>

              <View style={campeonatoDetalheStyle.resultRow}>
                <Text style={campeonatoDetalheStyle.resultTeams}>
                  AACJ
                </Text>

                <Text style={campeonatoDetalheStyle.resultScore}>
                  0 X 2
                </Text>

                <Text style={campeonatoDetalheStyle.resultTeams}>
                  Verdão
                </Text>

                <View style={campeonatoDetalheStyle.resultDraw}>
                  <Text style={campeonatoDetalheStyle.resultDrawText}>
                    Empate
                  </Text>
                </View>
              </View>

              <View style={campeonatoDetalheStyle.resultRow}>
                <Text style={campeonatoDetalheStyle.resultTeams}>
                  São Paulo
                </Text>

                <Text style={campeonatoDetalheStyle.resultScore}>
                  2 X 0
                </Text>

                <Text style={campeonatoDetalheStyle.resultTeams}>
                  Santos
                </Text>

                <View style={campeonatoDetalheStyle.resultLoss}>
                  <Text style={campeonatoDetalheStyle.resultLossText}>
                    Derrota
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* PRÓXIMAS PARTIDAS */}
        <View style={campeonatoDetalheStyle.upcomingSection}>
          <View style={campeonatoDetalheStyle.tableHeaderRow}>
            <Text style={campeonatoDetalheStyle.tableTitle}>
              Próximas partidas
            </Text>

            <Pressable onPress={() => router.navigate("/proxima-partida")}>
              <Text style={campeonatoDetalheStyle.tableLink}>
                Ver completo {">"}
              </Text>
            </Pressable>
          </View>

          <View style={campeonatoDetalheStyle.upcomingRow}>
            <Text style={campeonatoDetalheStyle.upcomingDate}>
              Dom
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingDate}>
              11/05
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingGame}>
              AACJ   vs   Verdão
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingTime}>
              15:30
            </Text>
          </View>

          <View style={campeonatoDetalheStyle.upcomingRow}>
            <Text style={campeonatoDetalheStyle.upcomingDate}>
              Dom
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingDate}>
              11/05
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingGame}>
              AACJ   vs   Ferroviária
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingTime}>
              18:00
            </Text>
          </View>

          <View style={campeonatoDetalheStyle.upcomingRow}>
            <Text style={campeonatoDetalheStyle.upcomingDate}>
              Dom
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingDate}>
              11/05
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingGame}>
              AACJ   vs   Guarani
            </Text>

            <Text style={campeonatoDetalheStyle.upcomingTime}>
              09:00
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}