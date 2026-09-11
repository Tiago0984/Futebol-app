import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import proximaPartidaStyle from "@/styles/proximaPartidaStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
                Próxima partida
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

        <View style={proximaPartidaStyle.matchCard}>
          <View style={proximaPartidaStyle.teamsRow}>
            <View style={proximaPartidaStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/logo-aacj.png")}
                style={proximaPartidaStyle.teamCrest}
                resizeMode="contain"
              />
              <Text style={proximaPartidaStyle.teamName} numberOfLines={1}>
                AACJ
              </Text>
            </View>
            <Text style={proximaPartidaStyle.vsText}>Vs</Text>
            <View style={proximaPartidaStyle.teamCol}>
              <Image
                source={require("@/assets/images/img/logo/time-preto.jpg")}
                style={proximaPartidaStyle.teamCrest}
                resizeMode="contain"
              />
              <Text style={proximaPartidaStyle.teamName} numberOfLines={1}>
                Time preto
              </Text>
            </View>
          </View>

          <View style={proximaPartidaStyle.matchDivider} />

          <View style={proximaPartidaStyle.matchInfoRow}>
            <View style={proximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/agendaPreta.png")}
                style={proximaPartidaStyle.matchInfoIcon}
                resizeMode="contain"
              />
              <View style={proximaPartidaStyle.matchInfoTextCol}>
                <Text style={proximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={proximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
            <View style={proximaPartidaStyle.matchInfoDivider} />
            <View style={proximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/clockvermelho.png")}
                style={proximaPartidaStyle.matchInfoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />
              <View style={proximaPartidaStyle.matchInfoTextCol}>
                <Text style={proximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={proximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
            <View style={proximaPartidaStyle.matchInfoDivider} />
            <View style={proximaPartidaStyle.matchInfoCol}>
              <Image
                source={require("@/assets/images/img/localizaçãopreto.png")}
                style={proximaPartidaStyle.matchInfoIcon}
                resizeMode="contain"
              />
              <View style={proximaPartidaStyle.matchInfoTextCol}>
                <Text style={proximaPartidaStyle.matchInfoLabel}>
                  Domingo
                </Text>
                <Text style={proximaPartidaStyle.matchInfoValue}>
                  11/05/2026
                </Text>
              </View>
            </View>
          </View>

          <View style={proximaPartidaStyle.confirmedPill}>
            <Text style={proximaPartidaStyle.confirmedText}>Confirmado</Text>
          </View>
        </View>

        <View style={proximaPartidaStyle.participacaoSection}>
          <Text style={proximaPartidaStyle.participacaoTitle}>
            Sua participação
          </Text>

          <View style={proximaPartidaStyle.detailsCard}>
            <View style={proximaPartidaStyle.detailsRow}>
              <Text style={proximaPartidaStyle.detailsLabel}>Status</Text>
              <View style={proximaPartidaStyle.statusPill}>
                <Text style={proximaPartidaStyle.statusPillText}>
                  Convocado
                </Text>
              </View>
            </View>

            <View
              style={[
                proximaPartidaStyle.detailsRow,
                proximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={proximaPartidaStyle.detailsLabel}>
                Número da camisa
              </Text>
              <Text style={proximaPartidaStyle.detailsValue}>10</Text>
            </View>

            <View
              style={[
                proximaPartidaStyle.detailsRow,
                proximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={proximaPartidaStyle.detailsLabel}>Posição</Text>
              <Text style={proximaPartidaStyle.detailsValue}>Meia</Text>
            </View>

            <View
              style={[
                proximaPartidaStyle.detailsRow,
                proximaPartidaStyle.detailsRowDivider,
              ]}
            >
              <Text style={proximaPartidaStyle.detailsLabel}>
                Comissão técnica
              </Text>
              <Text style={proximaPartidaStyle.detailsValue}>
                Claudinei Oliveira
              </Text>
            </View>
          </View>
        </View>

        <View style={proximaPartidaStyle.quickActionsSection}>
          <View style={proximaPartidaStyle.sectionTitleRow}>
            <View style={proximaPartidaStyle.sectionTitleIconBox}>
              <Image
                source={require("@/assets/images/img/raiovermelho.png")}
                style={proximaPartidaStyle.sectionTitleIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={proximaPartidaStyle.sectionTitle} numberOfLines={1}>
              Ações rápidas
            </Text>
          </View>

          <View style={proximaPartidaStyle.quickActionsGrid}>
            <View
              style={[
                proximaPartidaStyle.quickActionRow,
                proximaPartidaStyle.quickActionRowDivider,
              ]}
            >
              <Pressable
                style={[
                  proximaPartidaStyle.quickActionCell,
                  proximaPartidaStyle.quickActionCellDivider,
                ]}
              >
                <View style={proximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/mapavermelho.png")}
                    style={proximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={proximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Abrir mapa
                    </Text>
                    <Text
                      style={proximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Visualizar o local do treino
                    </Text>
                  </View>
                  <Text style={proximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>

              <Pressable style={proximaPartidaStyle.quickActionCell}>
                <View style={proximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/agendaVermelha.png")}
                    style={proximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={proximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Adicionar ao calendário
                    </Text>
                    <Text
                      style={proximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Adicionar o compromisso ao calendário
                    </Text>
                  </View>
                  <Text style={proximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={proximaPartidaStyle.quickActionRow}>
              <Pressable
                style={[
                  proximaPartidaStyle.quickActionCell,
                  proximaPartidaStyle.quickActionCellDivider,
                ]}
              >
                <View style={proximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/compartilharvermelho.png")}
                    style={proximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={proximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Compartilhar
                    </Text>
                    <Text
                      style={proximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Compartilhar data, horário e local com outra pessoa
                    </Text>
                  </View>
                  <Text style={proximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>

              <Pressable style={proximaPartidaStyle.quickActionCell}>
                <View style={proximaPartidaStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/chatvermelho.png")}
                    style={proximaPartidaStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.quickActionTextCol}>
                    <Text
                      style={proximaPartidaStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Entrar em contato
                    </Text>
                    <Text
                      style={proximaPartidaStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Conversar com o responsável
                    </Text>
                  </View>
                  <Text style={proximaPartidaStyle.quickActionChevron}>
                    ›
                  </Text>
                </View>
              </Pressable>
            </View>
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
