import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import treinoTecnicoStyle from "@/styles/treinoTecnicoStyle";
import { variaveis } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";

const objetivosDoTreino = [
  "Posse de bola",
  "Finalização",
  "Transição ofensiva",
  "Tomada de decisão",
];

const equipamentosNecessarios = [
  "Uniforme oficial",
  "Chuteira",
  "Caneleira",
  "Garrafa de água",
  "Documento de identificação",
];

const observacoes = [
  "Chegue com pelo menos 15 minutos de antecedência",
  "Em caso de atraso, comunique previamente a comissão técnica",
];

export default function TreinoTecnico() {
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
        source={require("@/assets/images/img/background-aacj-app1.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={treinoTecnicoStyle.scrollContent}
      >
        <View style={treinoTecnicoStyle.header}>
          <View style={treinoTecnicoStyle.headerTopRow}>
            <Pressable
              style={treinoTecnicoStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={treinoTecnicoStyle.backChevron}>‹</Text>
              <Text style={treinoTecnicoStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={treinoTecnicoStyle.headerIconsRow}>
              <View style={treinoTecnicoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={treinoTecnicoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={treinoTecnicoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={treinoTecnicoStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={treinoTecnicoStyle.notificationBadge}>
                  <Text style={treinoTecnicoStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={treinoTecnicoStyle.statusRow}>
          <View style={treinoTecnicoStyle.confirmedPill}>
            <Image
              source={require("@/assets/images/img/checkVerde.png")}
              style={treinoTecnicoStyle.confirmedIcon}
              resizeMode="contain"
            />
            <Text style={treinoTecnicoStyle.confirmedText}>Confirmado</Text>
          </View>
          <View style={treinoTecnicoStyle.countdownPill}>
            <Text style={treinoTecnicoStyle.countdownText}>
              Faltam 2h 15min
            </Text>
          </View>
        </View>

        <View style={treinoTecnicoStyle.heroSection}>
          <View style={treinoTecnicoStyle.heroIconCircle}>
            <Image
              source={require("@/assets/images/img/atletaVermelho.png")}
              style={treinoTecnicoStyle.heroIcon}
              resizeMode="contain"
            />
          </View>
          <View style={treinoTecnicoStyle.heroTextCol}>
            <Text style={treinoTecnicoStyle.heroTitle}>Treino Técnico</Text>
            <View style={treinoTecnicoStyle.heroMetaRow}>
              <Image
                source={require("@/assets/images/img/agendaVermelha.png")}
                style={treinoTecnicoStyle.heroMetaIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.heroMetaText}>Hoje</Text>
              <View style={treinoTecnicoStyle.heroMetaDot} />
              <Text style={treinoTecnicoStyle.heroMetaTextMuted}>
                Campo Principal
              </Text>
            </View>
          </View>
        </View>

        <View style={treinoTecnicoStyle.infoRow}>
          <View style={treinoTecnicoStyle.infoCol}>
            <Image
              source={require("@/assets/images/img/clockvermelho.png")}
              style={treinoTecnicoStyle.infoIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={treinoTecnicoStyle.infoLabel}>17:30 as 19:00</Text>
              <Text style={treinoTecnicoStyle.infoSubLabel}>
                Duração: 1h 30min
              </Text>
            </View>
          </View>
          <View style={treinoTecnicoStyle.infoCol}>
            <Image
              source={require("@/assets/images/img/localizaçãovermelho.png")}
              style={treinoTecnicoStyle.infoIcon}
              resizeMode="contain"
            />
            <View>
              <Text style={treinoTecnicoStyle.infoLabel}>Campo principal</Text>
              <Text style={treinoTecnicoStyle.infoSubLabel}>
                Centro de formação AACJ
              </Text>
            </View>
          </View>
        </View>

        <View style={treinoTecnicoStyle.detailsCard}>
          <View style={treinoTecnicoStyle.detailsRow}>
            <View style={treinoTecnicoStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/bandeiravermelha.png")}
                style={treinoTecnicoStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel}>Categoria</Text>
              <Text style={treinoTecnicoStyle.detailsValue}>Sub-17</Text>
            </View>
            <Text style={treinoTecnicoStyle.detailsChevron}>›</Text>
          </View>

          <View
            style={[
              treinoTecnicoStyle.detailsRow,
              treinoTecnicoStyle.detailsRowDivider,
            ]}
          >
            <View style={treinoTecnicoStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/perfilVermelho.png")}
                style={treinoTecnicoStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel}>Responsável</Text>
              <Text style={treinoTecnicoStyle.detailsValue}>
                Professor João Silva
              </Text>
              <Text style={treinoTecnicoStyle.detailsSubValue}>
                Treinador Técnico
              </Text>
            </View>
            <Text style={treinoTecnicoStyle.detailsChevron}>›</Text>
          </View>

          <View
            style={[
              treinoTecnicoStyle.detailsRow,
              treinoTecnicoStyle.detailsRowDivider,
            ]}
          >
            <View style={treinoTecnicoStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/atletaVermelho.png")}
                style={treinoTecnicoStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel}>
                Tipo de atividade
              </Text>
              <Text style={treinoTecnicoStyle.detailsValue}>
                Treino Técnico
              </Text>
            </View>
            <Text style={treinoTecnicoStyle.detailsChevron}>›</Text>
          </View>
        </View>

        <View style={treinoTecnicoStyle.checklistRow}>
          <View style={treinoTecnicoStyle.checklistCard}>
            <View style={treinoTecnicoStyle.checklistHeaderRow}>
              <Image
                source={require("@/assets/images/img/alvovermelho.png")}
                style={treinoTecnicoStyle.checklistHeaderIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.checklistHeaderText}>
                Objetivos do treino
              </Text>
            </View>
            {objetivosDoTreino.map((item) => (
              <View key={item} style={treinoTecnicoStyle.checklistItemRow}>
                <Image
                  source={require("@/assets/images/img/checkvermelho.png")}
                  style={treinoTecnicoStyle.checklistItemIcon}
                  resizeMode="contain"
                />
                <Text style={treinoTecnicoStyle.checklistItemText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>

          <View style={treinoTecnicoStyle.checklistCard}>
            <View style={treinoTecnicoStyle.checklistHeaderRow}>
              <Image
                source={require("@/assets/images/img/sacolavermelha.png")}
                style={treinoTecnicoStyle.checklistHeaderIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.checklistHeaderText}>
                Equipamentos necessários
              </Text>
            </View>
            {equipamentosNecessarios.map((item) => (
              <View key={item} style={treinoTecnicoStyle.checklistItemRow}>
                <Image
                  source={require("@/assets/images/img/checkvermelho.png")}
                  style={treinoTecnicoStyle.checklistItemIcon}
                  resizeMode="contain"
                />
                <Text style={treinoTecnicoStyle.checklistItemText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={treinoTecnicoStyle.observacoesCard}>
          <View style={treinoTecnicoStyle.observacoesIconCircle}>
            <Image
              source={require("@/assets/images/img/informacaovermelho.png")}
              style={treinoTecnicoStyle.observacoesIcon}
              resizeMode="contain"
            />
          </View>
          <View style={treinoTecnicoStyle.observacoesTextCol}>
            <Text style={treinoTecnicoStyle.observacoesTitle}>
              Observações
            </Text>
            {observacoes.map((item) => (
              <View key={item} style={treinoTecnicoStyle.observacoesItemRow}>
                <Text style={treinoTecnicoStyle.observacoesBullet}>•</Text>
                <Text style={treinoTecnicoStyle.observacoesItemText}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={treinoTecnicoStyle.quickActionsSection}>
          <View style={treinoTecnicoStyle.sectionTitleRow}>
            <Image
              source={require("@/assets/images/img/raiovermelho.png")}
              style={treinoTecnicoStyle.sectionTitleIcon}
              resizeMode="contain"
            />
            <Text style={treinoTecnicoStyle.sectionTitle}>Ações rápidas</Text>
          </View>

          <View style={treinoTecnicoStyle.quickActionsGrid}>
            <Pressable style={treinoTecnicoStyle.quickActionCard}>
              <View style={treinoTecnicoStyle.quickActionTopRow}>
                <View style={treinoTecnicoStyle.quickActionIconCircle}>
                  <Image
                    source={require("@/assets/images/img/mapavermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
              </View>
              <Text style={treinoTecnicoStyle.quickActionTitle}>
                Abrir mapa
              </Text>
              <Text style={treinoTecnicoStyle.quickActionSubtitle}>
                Visualizar o local do treino
              </Text>
            </Pressable>

            <Pressable style={treinoTecnicoStyle.quickActionCard}>
              <View style={treinoTecnicoStyle.quickActionTopRow}>
                <View style={treinoTecnicoStyle.quickActionIconCircle}>
                  <Image
                    source={require("@/assets/images/img/agendaVermelha.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
              </View>
              <Text style={treinoTecnicoStyle.quickActionTitle}>
                Adicionar ao calendário
              </Text>
              <Text style={treinoTecnicoStyle.quickActionSubtitle}>
                Adicionar o compromisso ao calendário
              </Text>
            </Pressable>

            <Pressable style={treinoTecnicoStyle.quickActionCard}>
              <View style={treinoTecnicoStyle.quickActionTopRow}>
                <View style={treinoTecnicoStyle.quickActionIconCircle}>
                  <Image
                    source={require("@/assets/images/img/compartilharvermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
              </View>
              <Text style={treinoTecnicoStyle.quickActionTitle}>
                Compartilhar
              </Text>
              <Text style={treinoTecnicoStyle.quickActionSubtitle}>
                Compartilhar data, horário e local com outra pessoa
              </Text>
            </Pressable>

            <Pressable style={treinoTecnicoStyle.quickActionCard}>
              <View style={treinoTecnicoStyle.quickActionTopRow}>
                <View style={treinoTecnicoStyle.quickActionIconCircle}>
                  <Image
                    source={require("@/assets/images/img/chatvermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                </View>
                <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
              </View>
              <Text style={treinoTecnicoStyle.quickActionTitle}>
                Entrar em contato
              </Text>
              <Text style={treinoTecnicoStyle.quickActionSubtitle}>
                Conversar com o responsável
              </Text>
            </Pressable>
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
