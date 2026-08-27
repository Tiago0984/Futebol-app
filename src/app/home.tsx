import fundoStyle from "@/styles/fundoStyle";
import homeStyle from "@/styles/homeStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Home() {
  const indicadorAnim = useRef(new Animated.Value(0)).current;

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
        resizeMode="contain"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={homeStyle.scrollContent}
      >
        <View style={homeStyle.header}>
          <View style={homeStyle.headerTopRow}>
            <View>
              <Text style={homeStyle.greeting}>Bom dia</Text>
              <Text style={homeStyle.greetingName}>Atleta</Text>
            </View>
            <View style={homeStyle.headerIconsRow}>
              <View style={homeStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={homeStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={homeStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={homeStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={homeStyle.notificationBadge}>
                  <Text style={homeStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={homeStyle.headerBottomRow}>
            <View style={homeStyle.headerInfoCol}>
              <View style={homeStyle.categoriaRow}>
                <Image
                  source={require("@/assets/images/img/escudovermelho.png")}
                  style={homeStyle.categoriaIcon}
                  resizeMode="contain"
                />
                <Text style={homeStyle.categoriaText}>Categoria sub - 17</Text>
              </View>
              <Text style={homeStyle.centroTexto}>Centro de formação</Text>
              <View style={homeStyle.centroDestaqueRow}>
                <View style={homeStyle.centroLine} />
                <Text style={homeStyle.centroDestaqueText}>de atletas</Text>
                <View style={homeStyle.centroLine} />
              </View>
            </View>
            <View style={homeStyle.avatarCircle}>
              <Image
                source={require("@/assets/images/img/perfilPreto.png")}
                style={homeStyle.avatarIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={homeStyle.card}>
          <Text style={homeStyle.cardLabel}>Próximo compromisso</Text>
          <View style={homeStyle.cardMainRow}>
            <Image
              source={require("@/assets/images/img/tenisvermelho.png")}
              style={homeStyle.cardIcon}
              resizeMode="contain"
            />
            <View style={homeStyle.cardTextCol}>
              <Text style={homeStyle.cardTitle}>Treino Técnico</Text>
              <View style={homeStyle.cardInfoRow}>
                <Image
                  source={require("@/assets/images/img/agendaPreta.png")}
                  style={homeStyle.cardInfoIcon}
                  resizeMode="contain"
                />
                <Text style={homeStyle.cardInfoText}>Hoje</Text>
                <View style={homeStyle.cardInfoDot} />
                <Text style={homeStyle.cardInfoText}>17:30</Text>
              </View>
              <View style={homeStyle.cardInfoRow}>
                <Image
                  source={require("@/assets/images/img/localizaçãopreto.png")}
                  style={homeStyle.cardInfoIcon}
                  resizeMode="contain"
                />
                <Text style={homeStyle.cardInfoText}>Campo principal</Text>
              </View>
            </View>
          </View>
          <View style={homeStyle.cardDivider} />
          <View style={homeStyle.cardFooterRow}>
            <View style={homeStyle.confirmedPill}>
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={homeStyle.confirmedIcon}
                resizeMode="contain"
              />
              <Text style={homeStyle.confirmedText}>Confirmado</Text>
            </View>
            <Text style={homeStyle.detailsLink}>Ver detalhes {">"}</Text>
          </View>
        </View>

        <View style={homeStyle.quickAccessSection}>
          <Text style={homeStyle.sectionTitle}>Acesso rápido</Text>
          <View style={homeStyle.quickAccessRow}>
            <Pressable
              style={homeStyle.quickAccessItem}
              onPress={() => router.navigate("/agenda")}
            >
              <View style={homeStyle.quickAccessIconCircle}>
                <Image
                  source={require("@/assets/images/img/agendaCinza.png")}
                  style={homeStyle.quickAccessIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={homeStyle.quickAccessLabel}>Agenda</Text>
            </Pressable>
            <View style={homeStyle.quickAccessItem}>
              <View style={homeStyle.quickAccessIconCircle}>
                <Image
                  source={require("@/assets/images/img/campeonatosCinza.png")}
                  style={homeStyle.quickAccessIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={homeStyle.quickAccessLabel}>Campeonatos</Text>
            </View>
            <View style={homeStyle.quickAccessItem}>
              <View style={homeStyle.quickAccessIconCircle}>
                <Image
                  source={require("@/assets/images/img/desempenhoCinza.png")}
                  style={homeStyle.quickAccessIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={homeStyle.quickAccessLabel}>Desempenho</Text>
            </View>
            <View style={homeStyle.quickAccessItem}>
              <View style={homeStyle.quickAccessIconCircle}>
                <Image
                  source={require("@/assets/images/img/perfilCinza.png")}
                  style={homeStyle.quickAccessIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={homeStyle.quickAccessLabel}>Perfil</Text>
            </View>
          </View>
        </View>

        <View style={homeStyle.activitiesSection}>
          <View style={homeStyle.activitiesHeaderRow}>
            <Text style={homeStyle.sectionTitle}>Próximas Atividades</Text>
            <Text style={homeStyle.sectionLink}>Ver todas {">"}</Text>
          </View>

          <View style={homeStyle.activityItem}>
            <Text style={homeStyle.activityDate}>Hoje 30/07/2026</Text>
            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>Treino Técnico</Text>
                <Text style={homeStyle.activitySubtitle}>Campo Principal</Text>
              </View>
              <Text style={homeStyle.activityTime}>17:30</Text>
            </View>
            <View style={homeStyle.activityDivider} />
          </View>

          <View style={homeStyle.activityItem}>
            <Text style={homeStyle.activityDate}>
              Segunda-Feira 03/08/2026
            </Text>
            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>Avaliação Física</Text>
                <Text style={homeStyle.activitySubtitle}>
                  Centro de Performance
                </Text>
              </View>
              <Text style={homeStyle.activityTime}>09:00</Text>
            </View>
            <View style={homeStyle.activityDivider} />
          </View>

          <View style={homeStyle.activityItem}>
            <Text style={homeStyle.activityDate}>Sábado 08/08/2026</Text>
            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>
                  Campeonato Regional
                </Text>
                <Text style={homeStyle.activitySubtitle}>AACJ</Text>
              </View>
              <Text style={homeStyle.activityTime}>17:00</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={menuInferiorStyle.tabBar}>
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
            source={require("@/assets/images/img/homeVermelha.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive}>Home</Text>
        </View>
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
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Campeonatos</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/desempenhoBranco.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Desempenho</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/perfilbranco.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Usuário</Text>
        </View>
      </View>
    </View>
  );
}
