import TabBar from "@/components/tabBar";
import fundoStyle from "@/styles/fundoStyle";
import detalheProximaPartidaStyle from "@/styles/detalheProximaPartidaStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function DetalheProximaPartida() {
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
        contentContainerStyle={detalheProximaPartidaStyle.scrollContent}
      >
        <View style={detalheProximaPartidaStyle.header}>
          <View style={detalheProximaPartidaStyle.headerTopRow}>
            <Pressable
              style={detalheProximaPartidaStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={detalheProximaPartidaStyle.backChevron}>‹</Text>
              <Text style={detalheProximaPartidaStyle.backText}>Voltar</Text>
            </Pressable>
            <View
              style={detalheProximaPartidaStyle.headerTitleCol}
              pointerEvents="none"
            >
              <Text style={detalheProximaPartidaStyle.headerTitle} numberOfLines={1}>
                Próxima partida
              </Text>
              <Text
                style={detalheProximaPartidaStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={detalheProximaPartidaStyle.headerIconsRow}>
              <View style={detalheProximaPartidaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={detalheProximaPartidaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={detalheProximaPartidaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={detalheProximaPartidaStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={detalheProximaPartidaStyle.notificationBadge}>
                  <Text style={detalheProximaPartidaStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={detalheProximaPartidaStyle.matchCard}>
          <View style={detalheProximaPartidaStyle.teamsRow}>
            <View style={detalheProximaPartidaStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/logo-aacj.png")}
                style={detalheProximaPartidaStyle.teamCrest}
                resizeMode="contain"
              />
              <Text style={detalheProximaPartidaStyle.teamName} numberOfLines={1}>
                AACJ
              </Text>
            </View>
            <Text style={detalheProximaPartidaStyle.vsText}>Vs</Text>
            <View style={detalheProximaPartidaStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/time-preto.jpg")}
                style={detalheProximaPartidaStyle.teamCrest}
                resizeMode="contain"
              />
              <Text style={detalheProximaPartidaStyle.teamName} numberOfLines={1}>
                Time preto
              </Text>
            </View>
          </View>

          <View style={detalheProximaPartidaStyle.matchDivider} />

          <View style={detalheProximaPartidaStyle.matchInfoRow}>
            <View style={detalheProximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/agendaPreta.png")}
                style={detalheProximaPartidaStyle.matchInfoIcon}
                resizeMode="contain"
              />
              <View style={detalheProximaPartidaStyle.matchInfoTextCol}>
                <Text style={detalheProximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={detalheProximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
            <View style={detalheProximaPartidaStyle.matchInfoDivider} />
            <View style={detalheProximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/clockvermelho.png")}
                style={detalheProximaPartidaStyle.matchInfoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />
              <View style={detalheProximaPartidaStyle.matchInfoTextCol}>
                <Text style={detalheProximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={detalheProximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
            <View style={detalheProximaPartidaStyle.matchInfoDivider} />
            <View style={detalheProximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/localizaçãopreto.png")}
                style={detalheProximaPartidaStyle.matchInfoIcon}
                resizeMode="contain"
              />
              <View style={detalheProximaPartidaStyle.matchInfoTextCol}>
                <Text style={detalheProximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={detalheProximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
          </View>

          <View style={detalheProximaPartidaStyle.confirmedPill}>
            <Text style={detalheProximaPartidaStyle.confirmedText}>Confirmado</Text>
          </View>
        </View>

        <View style={detalheProximaPartidaStyle.participacaoSection}>
          <Text style={detalheProximaPartidaStyle.participacaoTitle}>
            Sua participação
          </Text>

          <View style={detalheProximaPartidaStyle.detailsCard}>
            <View style={detalheProximaPartidaStyle.detailsRow}>
              <Text style={detalheProximaPartidaStyle.detailsLabel}>Status</Text>
              <View style={detalheProximaPartidaStyle.statusPill}>
                <Text style={detalheProximaPartidaStyle.statusPillText}>
                  Convocado
                </Text>
              </View>
            </View>

            <View
              style={[
                detalheProximaPartidaStyle.detailsRow,
                detalheProximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={detalheProximaPartidaStyle.detailsLabel}>
                Número da camisa
              </Text>
              <Text style={detalheProximaPartidaStyle.detailsValue}>10</Text>
            </View>

            <View
              style={[
                detalheProximaPartidaStyle.detailsRow,
                detalheProximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={detalheProximaPartidaStyle.detailsLabel}>Posição</Text>
              <Text style={detalheProximaPartidaStyle.detailsValue}>Meia</Text>
            </View>

            <View
              style={[
                detalheProximaPartidaStyle.detailsRow,
                detalheProximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={detalheProximaPartidaStyle.detailsLabel}>
                Comissão técnica
              </Text>
              <Text style={detalheProximaPartidaStyle.detailsValue}>
                Claudinei Oliveira
              </Text>
            </View>
          </View>
        </View>

        <View style={detalheProximaPartidaStyle.quickActionsSection}>
          <View style={detalheProximaPartidaStyle.sectionTitleRow}>
            <View style={detalheProximaPartidaStyle.sectionTitleIconBox}>
              <Image
                source={require("@/assets/images/img/raiovermelho.png")}
                style={detalheProximaPartidaStyle.sectionTitleIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={detalheProximaPartidaStyle.sectionTitle} numberOfLines={1}>
              Ações rápidas
            </Text>
          </View>

          <View style={detalheProximaPartidaStyle.quickActionsGrid}>
            <View
              style={[
                detalheProximaPartidaStyle.quickActionRow,
                detalheProximaPartidaStyle.quickActionRowDivider,
              ]}
            >
              <Pressable
                style={[
                  detalheProximaPartidaStyle.quickActionCell,
                  detalheProximaPartidaStyle.quickActionCellDivider,
                ]}
              >
                <View style={detalheProximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/mapavermelho.png")}
                    style={detalheProximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={detalheProximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Abrir mapa
                    </Text>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Visualizar o local do treino
                    </Text>
                  </View>
                  <Text style={detalheProximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>

              <Pressable style={detalheProximaPartidaStyle.quickActionCell}>
                <View style={detalheProximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/agendaVermelha.png")}
                    style={detalheProximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={detalheProximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Adicionar ao calendário
                    </Text>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Adicionar o compromisso ao calendário
                    </Text>
                  </View>
                  <Text style={detalheProximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={detalheProximaPartidaStyle.quickActionRow}>
              <Pressable
                style={[
                  detalheProximaPartidaStyle.quickActionCell,
                  detalheProximaPartidaStyle.quickActionCellDivider,
                ]}
              >
                <View style={detalheProximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/compartilharVermelho.png")}
                    style={detalheProximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={detalheProximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Compartilhar
                    </Text>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Compartilhar data, horário e local com outra pessoa
                    </Text>
                  </View>
                  <Text style={detalheProximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>

              <Pressable style={detalheProximaPartidaStyle.quickActionCell}>
                <View style={detalheProximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/chatvermelho.png")}
                    style={detalheProximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={detalheProximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Entrar em contato
                    </Text>
                    <Text
                      style={detalheProximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Conversar com o responsável
                    </Text>
                  </View>
                  <Text style={detalheProximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
