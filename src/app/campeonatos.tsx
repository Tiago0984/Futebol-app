import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function Campeonatos() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const { width: larguraTela } = useWindowDimensions();
  const larguraCard = Math.min(larguraTela - 40, 560);

  const [alturaCard1, setAlturaCard1] = useState(0);
  const [alturaCard2, setAlturaCard2] = useState(0);
  const [alturaCard3, setAlturaCard3] = useState(0);

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app1.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={campeonatosStyle.scrollContent}
      >
        <View style={campeonatosStyle.header}>
          <View style={campeonatosStyle.headerTopRow}>
            <View style={campeonatosStyle.headerTitleCol}>
              <Text style={campeonatosStyle.screenTitle}>Campeonatos</Text>
              <Text style={campeonatosStyle.screenSubtitle}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={campeonatosStyle.headerIconsRow}>
              <View style={campeonatosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={campeonatosStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={campeonatosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={campeonatosStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={campeonatosStyle.notificationBadge}>
                  <Text style={campeonatosStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={campeonatosStyle.filterRow}>
          <Pressable
            style={[
              campeonatosStyle.filterPill,
              filtroAtivo === "Todos" && campeonatosStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Todos")}
          >
            <Text
              style={[
                campeonatosStyle.filterPillText,
                filtroAtivo === "Todos" &&
                  campeonatosStyle.filterPillTextActive,
              ]}
            >
              Todos
            </Text>
          </Pressable>

          <Pressable
            style={[
              campeonatosStyle.filterPill,
              filtroAtivo === "Paulista" && campeonatosStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Paulista")}
          >
            <Text
              style={[
                campeonatosStyle.filterPillText,
                filtroAtivo === "Paulista" &&
                  campeonatosStyle.filterPillTextActive,
              ]}
            >
              Paulista
            </Text>
          </Pressable>

          <Pressable
            style={[
              campeonatosStyle.filterPill,
              filtroAtivo === "Municipal" && campeonatosStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Municipal")}
          >
            <Text
              style={[
                campeonatosStyle.filterPillText,
                filtroAtivo === "Municipal" &&
                  campeonatosStyle.filterPillTextActive,
              ]}
            >
              Municipal
            </Text>
          </Pressable>

          <Pressable
            style={[
              campeonatosStyle.filterPill,
              filtroAtivo === "Copa AACJ" && campeonatosStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Copa AACJ")}
          >
            <Text
              style={[
                campeonatosStyle.filterPillText,
                filtroAtivo === "Copa AACJ" &&
                  campeonatosStyle.filterPillTextActive,
              ]}
            >
              Copa AACJ
            </Text>
          </Pressable>

          <Pressable
            style={[
              campeonatosStyle.filterPill,
              filtroAtivo === "Amistosos" && campeonatosStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Amistosos")}
          >
            <Text
              style={[
                campeonatosStyle.filterPillText,
                filtroAtivo === "Amistosos" &&
                  campeonatosStyle.filterPillTextActive,
              ]}
            >
              Amistosos
            </Text>
          </Pressable>
        </View>

        <View style={[campeonatosStyle.card, { width: larguraCard }]}>
          <Image
            source={require("@/assets/images/img/fundoCardCampeonatos2.png")}
            style={[campeonatosStyle.cardBanner, { height: alturaCard1 }]}
            resizeMode="stretch"
          />
          <View
            style={[
              campeonatosStyle.cardBannerOverlay,
              { height: alturaCard1 },
            ]}
          />

          <View
            style={campeonatosStyle.cardContent}
            onLayout={(e) => setAlturaCard1(e.nativeEvent.layout.height)}
          >
            <View style={campeonatosStyle.cardTopRow}>
              <View style={campeonatosStyle.cardTitleRow}>
                <View style={campeonatosStyle.cardIconCircle}>
                  <Image
                    source={require("@/assets/images/img/campeonatosVermelho.png")}
                    style={campeonatosStyle.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={campeonatosStyle.cardTitleTextCol}>
                  <Text style={campeonatosStyle.cardTitle}>Copa Escola</Text>
                  <Text style={campeonatosStyle.cardSubtitle}>
                    Sub-17   Temporada 2026
                  </Text>
                </View>
              </View>
              <View style={campeonatosStyle.statusPill}>
                <Text style={campeonatosStyle.statusPillText}>
                  Em andamento
                </Text>
              </View>
            </View>

            <View style={campeonatosStyle.progressSection}>
              <View style={campeonatosStyle.progressLabelRow}>
                <Text style={campeonatosStyle.progressLabelText}>
                  Rodada 7 de 14
                </Text>
                <Text style={campeonatosStyle.progressLabelText}>50%</Text>
              </View>
              <View style={campeonatosStyle.progressTrack}>
                <View
                  style={[campeonatosStyle.progressFill, { width: "50%" }]}
                />
              </View>
            </View>

            <View style={campeonatosStyle.cardBottomRow}>
              <View style={campeonatosStyle.nextPhaseTextCol}>
                <Text style={campeonatosStyle.nextPhaseLabel}>
                  Próxima fase
                </Text>
                <Text style={campeonatosStyle.nextPhaseValue}>
                  Quartas de final
                </Text>
              </View>
              <Text style={campeonatosStyle.verCampeonatoText}>
                Ver campeonato {">"}
              </Text>
            </View>
          </View>
        </View>

        <View style={[campeonatosStyle.card, { width: larguraCard }]}>
          <Image
            source={require("@/assets/images/img/fundoCardCampeonatos2.png")}
            style={[campeonatosStyle.cardBanner, { height: alturaCard2 }]}
            resizeMode="stretch"
          />
          <View
            style={[
              campeonatosStyle.cardBannerOverlay,
              { height: alturaCard2 },
            ]}
          />

          <View
            style={campeonatosStyle.cardContent}
            onLayout={(e) => setAlturaCard2(e.nativeEvent.layout.height)}
          >
            <View style={campeonatosStyle.cardTopRow}>
              <View style={campeonatosStyle.cardTitleRow}>
                <View style={campeonatosStyle.cardIconCircle}>
                  <Image
                    source={require("@/assets/images/img/campeonatosVermelho.png")}
                    style={campeonatosStyle.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={campeonatosStyle.cardTitleTextCol}>
                  <Text style={campeonatosStyle.cardTitle}>
                    Campeonato Paulista
                  </Text>
                  <Text style={campeonatosStyle.cardSubtitle}>
                    Sub-17   Temporada 2026
                  </Text>
                </View>
              </View>
              <View style={campeonatosStyle.statusPill}>
                <Text style={campeonatosStyle.statusPillText}>
                  Em andamento
                </Text>
              </View>
            </View>

            <View style={campeonatosStyle.progressSection}>
              <View style={campeonatosStyle.progressLabelRow}>
                <Text style={campeonatosStyle.progressLabelText}>
                  Rodada 9 de 14
                </Text>
                <Text style={campeonatosStyle.progressLabelText}>75%</Text>
              </View>
              <View style={campeonatosStyle.progressTrack}>
                <View
                  style={[campeonatosStyle.progressFill, { width: "75%" }]}
                />
              </View>
            </View>

            <View style={campeonatosStyle.cardBottomRow}>
              <View style={campeonatosStyle.nextPhaseTextCol}>
                <Text style={campeonatosStyle.nextPhaseLabel}>
                  Próxima fase
                </Text>
                <Text style={campeonatosStyle.nextPhaseValue}>
                  Semifinais
                </Text>
              </View>
              <Text style={campeonatosStyle.verCampeonatoText}>
                Ver campeonato {">"}
              </Text>
            </View>
          </View>
        </View>

        <View style={[campeonatosStyle.card, { width: larguraCard }]}>
          <Image
            source={require("@/assets/images/img/fundoCardCampeonatos2.png")}
            style={[campeonatosStyle.cardBanner, { height: alturaCard3 }]}
            resizeMode="stretch"
          />
          <View
            style={[
              campeonatosStyle.cardBannerOverlay,
              { height: alturaCard3 },
            ]}
          />

          <View
            style={campeonatosStyle.cardContent}
            onLayout={(e) => setAlturaCard3(e.nativeEvent.layout.height)}
          >
            <View style={campeonatosStyle.cardTopRow}>
              <View style={campeonatosStyle.cardTitleRow}>
                <View style={campeonatosStyle.cardIconCircle}>
                  <Image
                    source={require("@/assets/images/img/campeonatosVermelho.png")}
                    style={campeonatosStyle.cardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={campeonatosStyle.cardTitleTextCol}>
                  <Text style={campeonatosStyle.cardTitle}>
                    Copa entre as favelas
                  </Text>
                  <Text style={campeonatosStyle.cardSubtitle}>
                    Sub-17   Temporada 2026
                  </Text>
                </View>
              </View>
              <View style={campeonatosStyle.statusPill}>
                <Text style={campeonatosStyle.statusPillText}>
                  Em andamento
                </Text>
              </View>
            </View>

            <View style={campeonatosStyle.progressSection}>
              <View style={campeonatosStyle.progressLabelRow}>
                <Text style={campeonatosStyle.progressLabelText}>
                  Rodada 5 de 14
                </Text>
                <Text style={campeonatosStyle.progressLabelText}>36%</Text>
              </View>
              <View style={campeonatosStyle.progressTrack}>
                <View
                  style={[campeonatosStyle.progressFill, { width: "36%" }]}
                />
              </View>
            </View>

            <View style={campeonatosStyle.cardBottomRow}>
              <View style={campeonatosStyle.nextPhaseTextCol}>
                <Text style={campeonatosStyle.nextPhaseLabel}>
                  Próxima fase
                </Text>
                <Text style={campeonatosStyle.nextPhaseValue}>
                  Oitavas de final
                </Text>
              </View>
              <Text style={campeonatosStyle.verCampeonatoText}>
                Ver campeonato {">"}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={menuInferiorStyle.tabBar}>
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
          <Text style={menuInferiorStyle.tabLabel}>Home</Text>
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
          <Text style={menuInferiorStyle.tabLabel}>Agenda</Text>
        </Pressable>
        <View style={menuInferiorStyle.tabItem}>
          <View
            style={[
              menuInferiorStyle.tabIndicator,
              menuInferiorStyle.tabIndicatorActive,
            ]}
          />
          <Image
            source={require("@/assets/images/img/campeonatosVermelho.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive}>Campeonatos</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/desempenhoBranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Desempenho</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/perfilbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Usuário</Text>
        </View>
      </View>
    </View>
  );
}
