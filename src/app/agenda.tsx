import agendaStyle from "@/styles/agendaStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import { variaveis } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

const diasDaSemana = [
  { label: "SEG", numero: 21 },
  { label: "TER", numero: 22 },
  { label: "QUA", numero: 23 },
  { label: "QUI", numero: 24 },
  { label: "SEX", numero: 25 },
  { label: "SAB", numero: 26 },
  { label: "DOM", numero: 27 },
];

const filtros = ["Todos", "Treinos", "Campeonatos", "Avaliações", "Reuniões"];

export default function Agenda() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
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
        resizeMode="stretch"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={agendaStyle.scrollContent}
      >
        <View style={agendaStyle.header}>
          <View style={agendaStyle.headerTopRow}>
            <View>
              <Text style={agendaStyle.screenTitle}>Agenda</Text>
              <Text style={agendaStyle.screenSubtitle}>
                Sua programação esportiva
              </Text>
            </View>
            <View style={agendaStyle.headerIconsRow}>
              <View style={agendaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={agendaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={agendaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={agendaStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={agendaStyle.notificationBadge}>
                  <Text style={agendaStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={agendaStyle.monthNavRow}>
            <View style={agendaStyle.monthNavLeft}>
              <Text style={agendaStyle.monthChevron}>‹</Text>
              <Text style={agendaStyle.monthText}>Agosto 2026</Text>
              <Text style={agendaStyle.monthChevron}>›</Text>
            </View>
            <View style={agendaStyle.monthNavRight}>
              <Image
                source={require("@/assets/images/img/setaVermelha.png")}
                style={agendaStyle.dropdownChevron}
                resizeMode="contain"
              />
              <View style={agendaStyle.calendarButton}>
                <Image
                  source={require("@/assets/images/img/agendaBranca.png")}
                  style={agendaStyle.calendarButtonIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={agendaStyle.weekStrip}>
          {diasDaSemana.map((dia) => {
            const ativo = dia.label === "QUI";
            return (
              <View key={dia.label} style={agendaStyle.weekDayCol}>
                <Text style={agendaStyle.weekDayLabel}>{dia.label}</Text>
                <View
                  style={[
                    agendaStyle.weekDayCircle,
                    ativo && agendaStyle.weekDayCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      agendaStyle.weekDayNumber,
                      ativo && agendaStyle.weekDayNumberActive,
                    ]}
                  >
                    {dia.numero}
                  </Text>
                </View>
                <View style={agendaStyle.weekDayDot} />
              </View>
            );
          })}
        </View>

        <View style={agendaStyle.todayCard}>
          <View style={agendaStyle.todayCardTopRow}>
            <View style={agendaStyle.todayCardLeft}>
              <View style={agendaStyle.todayIconCircle}>
                <Image
                  source={require("@/assets/images/img/agendaVermelha.png")}
                  style={agendaStyle.todayIcon}
                  resizeMode="contain"
                />
              </View>
              <View>
                <Text style={agendaStyle.todayLabel}>Hoje</Text>
                <Text style={agendaStyle.todaySubLabel}>24 de Maio</Text>
              </View>
            </View>
            <View style={agendaStyle.todayCardRight}>
              <Text style={agendaStyle.todayCountText}>3 compromissos</Text>
              <Text style={agendaStyle.todayNextText}>Próximo às 17:30</Text>
            </View>
          </View>

          <View style={agendaStyle.todayPillsRow}>
            <View style={agendaStyle.todayPill}>
              <Image
                source={require("@/assets/images/img/tenisvermelho.png")}
                style={agendaStyle.todayPillIcon}
                resizeMode="contain"
              />
              <Text style={agendaStyle.todayPillText}>Treino x1</Text>
            </View>
            <View style={agendaStyle.todayPill}>
              <Image
                source={require("@/assets/images/img/coracaoVermelho.png")}
                style={agendaStyle.todayPillIcon}
                resizeMode="contain"
              />
              <Text style={agendaStyle.todayPillText}>Avaliação x1</Text>
            </View>
            <View style={agendaStyle.todayPill}>
              <Image
                source={require("@/assets/images/img/grupoPessoasVermelho.png")}
                style={agendaStyle.todayPillIcon}
                resizeMode="contain"
              />
              <Text style={agendaStyle.todayPillText}>Reunião x1</Text>
            </View>
          </View>
        </View>

        <View style={agendaStyle.filterRow}>
          {filtros.map((filtro) => {
            const ativo = filtro === filtroAtivo;
            return (
              <Pressable
                key={filtro}
                style={[
                  agendaStyle.filterPill,
                  ativo && agendaStyle.filterPillActive,
                ]}
                onPress={() => setFiltroAtivo(filtro)}
              >
                <Text
                  style={[
                    agendaStyle.filterPillText,
                    ativo && agendaStyle.filterPillTextActive,
                  ]}
                >
                  {filtro}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={agendaStyle.nextCard}>
          <Text style={agendaStyle.nextCardLabel}>Próximo compromisso</Text>
          <View style={agendaStyle.nextCardTopRow}>
            <View style={agendaStyle.nextCardMainRow}>
              <View style={agendaStyle.nextCardIconSquare}>
                <Image
                  source={require("@/assets/images/img/tenisvermelho.png")}
                  style={agendaStyle.nextCardIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={agendaStyle.nextCardTextCol}>
                <Text style={agendaStyle.nextCardTime}>17:30</Text>
                <Text style={agendaStyle.nextCardTitle}>Treino Técnico</Text>
                <View style={agendaStyle.nextCardInfoRow}>
                  <Image
                    source={require("@/assets/images/img/localizaçãopreto.png")}
                    style={agendaStyle.nextCardInfoIcon}
                    resizeMode="contain"
                  />
                  <Text style={agendaStyle.nextCardInfoText}>
                    Campo Principal
                  </Text>
                </View>
                <View style={agendaStyle.nextCardInfoRow}>
                  <Image
                    source={require("@/assets/images/img/perfilPreto.png")}
                    style={agendaStyle.nextCardInfoIcon}
                    resizeMode="contain"
                  />
                  <Text style={agendaStyle.nextCardInfoText}>
                    Professor João
                  </Text>
                </View>
              </View>
            </View>
            <View style={agendaStyle.nextCardSide}>
              <View style={agendaStyle.nextConfirmedPill}>
                <Image
                  source={require("@/assets/images/img/checkVerde.png")}
                  style={agendaStyle.nextConfirmedIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.nextConfirmedText}>Confirmado</Text>
              </View>
              <Text style={agendaStyle.nextDetailsLink}>Ver detalhes {">"}</Text>
            </View>
          </View>
        </View>

        <View style={agendaStyle.timelineSection}>
          <View style={agendaStyle.timelineItem}>
            <View style={agendaStyle.timelineTimeCol}>
              <Text style={agendaStyle.timelineTime}>19:15</Text>
            </View>
            <View style={agendaStyle.timelineLineCol}>
              <View
                style={[
                  agendaStyle.timelineDot,
                  { backgroundColor: variaveis.laranja },
                ]}
              />
              <View style={agendaStyle.timelineLine} />
            </View>
            <View
              style={[
                agendaStyle.timelineIconSquare,
                { backgroundColor: variaveis.vermelho20 },
              ]}
            >
              <Image
                source={require("@/assets/images/img/coracaoVermelho.png")}
                style={agendaStyle.timelineIcon}
                resizeMode="contain"
              />
            </View>
            <View style={agendaStyle.timelineTextCol}>
              <Text style={agendaStyle.timelineTitle}>Preparação Física</Text>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/localizaçãocinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>Academia</Text>
              </View>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/perfilCinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>
                  Professor Lucas
                </Text>
              </View>
            </View>
            <View style={agendaStyle.timelineStatusCol}>
              <View
                style={[
                  agendaStyle.statusPill,
                  { borderColor: variaveis.laranja },
                ]}
              >
                <View
                  style={[
                    agendaStyle.statusIconCircle,
                    { backgroundColor: variaveis.laranja },
                  ]}
                >
                  <Image
                    source={require("@/assets/images/img/atencaoBranco.png")}
                    style={agendaStyle.statusIconGlyph}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[agendaStyle.statusText, { color: variaveis.laranja }]}>
                  Alterado
                </Text>
              </View>
            </View>
          </View>

          <View style={agendaStyle.timelineItem}>
            <View style={agendaStyle.timelineTimeCol}>
              <Text style={agendaStyle.timelineTime}>20:00</Text>
            </View>
            <View style={agendaStyle.timelineLineCol}>
              <View
                style={[
                  agendaStyle.timelineDot,
                  { backgroundColor: variaveis.verde },
                ]}
              />
              <View style={agendaStyle.timelineLine} />
            </View>
            <View
              style={[
                agendaStyle.timelineIconSquare,
                { backgroundColor: variaveis.rosa },
              ]}
            >
              <Image
                source={require("@/assets/images/img/grupoPessoasVermelho.png")}
                style={agendaStyle.timelineIcon}
                resizeMode="contain"
              />
            </View>
            <View style={agendaStyle.timelineTextCol}>
              <Text style={agendaStyle.timelineTitle}>Reunião Técnica</Text>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/localizaçãocinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>Sala de Vídeo</Text>
              </View>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/perfilCinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>
                  Comissão Técnica
                </Text>
              </View>
            </View>
            <View style={agendaStyle.timelineStatusCol}>
              <View
                style={[
                  agendaStyle.statusPill,
                  { borderColor: variaveis.verde },
                ]}
              >
                <View
                  style={[
                    agendaStyle.statusIconCircle,
                    { backgroundColor: variaveis.verde },
                  ]}
                >
                  <Image
                    source={require("@/assets/images/img/checkBranco.png")}
                    style={agendaStyle.statusIconGlyph}
                    resizeMode="contain"
                  />
                </View>
                <Text style={[agendaStyle.statusText, { color: variaveis.verde }]}>
                  Confirmado
                </Text>
              </View>
            </View>
          </View>

          <View style={agendaStyle.timelineItem}>
            <View style={agendaStyle.timelineTimeCol}>
              <Text style={agendaStyle.timelineTime}>21:30</Text>
            </View>
            <View style={agendaStyle.timelineLineCol}>
              <View
                style={[
                  agendaStyle.timelineDot,
                  { backgroundColor: variaveis.vermelho },
                ]}
              />
            </View>
            <View
              style={[
                agendaStyle.timelineIconSquare,
                { backgroundColor: variaveis.azulclaro },
              ]}
            >
              <Image
                source={require("@/assets/images/img/onibusVermelho.png")}
                style={agendaStyle.timelineIcon}
                resizeMode="contain"
              />
            </View>
            <View style={agendaStyle.timelineTextCol}>
              <Text style={agendaStyle.timelineTitle}>Viagem</Text>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/localizaçãocinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>
                  Deslocamento para jogo
                </Text>
              </View>
              <View style={agendaStyle.timelineInfoRow}>
                <Image
                  source={require("@/assets/images/img/perfilCinza.png")}
                  style={agendaStyle.timelineInfoIcon}
                  resizeMode="contain"
                />
                <Text style={agendaStyle.timelineInfoText}>
                  Motorista Carlos
                </Text>
              </View>
            </View>
            <View style={agendaStyle.timelineStatusCol}>
              <View
                style={[
                  agendaStyle.statusPill,
                  { borderColor: variaveis.vermelho },
                ]}
              >
                <View
                  style={[
                    agendaStyle.statusIconCircle,
                    { backgroundColor: variaveis.vermelho },
                  ]}
                >
                  <Image
                    source={require("@/assets/images/img/xBranco.png")}
                    style={agendaStyle.statusIconGlyph}
                    resizeMode="contain"
                  />
                </View>
                <Text
                  style={[agendaStyle.statusText, { color: variaveis.vermelho }]}
                >
                  Cancelado
                </Text>
              </View>
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
            source={require("@/assets/images/img/agendaVermelha.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive}>Agenda</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Campeonatos</Text>
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
