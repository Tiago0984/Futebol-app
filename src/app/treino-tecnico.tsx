import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import treinoTecnicoStyle from "@/styles/treinoTecnicoStyle";
import { variaveis } from "@/styles/variaveis";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
            <Text style={treinoTecnicoStyle.confirmedText} numberOfLines={1}>
              Confirmado
            </Text>
          </View>
          <View style={treinoTecnicoStyle.countdownPill}>
            <Text style={treinoTecnicoStyle.countdownText} numberOfLines={1}>
              Faltam 2h 15min
            </Text>
          </View>
        </View>

        <View style={treinoTecnicoStyle.heroSection}>
          <View>
            <Image
              source={require("@/assets/images/img/atletaVermelho.png")}
              style={treinoTecnicoStyle.heroIcon}
              resizeMode="contain"
            />
          </View>
          <View style={treinoTecnicoStyle.heroTextCol}>
            <Text
              style={treinoTecnicoStyle.heroTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.8}
            >
              Treino Técnico
            </Text>
            <View style={treinoTecnicoStyle.heroMetaRow}>
              <Image
                source={require("@/assets/images/img/agendaVermelha.png")}
                style={treinoTecnicoStyle.heroMetaIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.heroMetaText} numberOfLines={1}>
                Hoje
              </Text>
              <View style={treinoTecnicoStyle.heroMetaDot} />
              <Text
                style={treinoTecnicoStyle.heroMetaTextMuted}
                numberOfLines={1}
              >
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
            <View style={treinoTecnicoStyle.infoTextCol}>
              <Text
                style={treinoTecnicoStyle.infoLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                17:30 as 19:00
              </Text>
              <Text style={treinoTecnicoStyle.infoSubLabel} numberOfLines={2}>
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
            <View style={treinoTecnicoStyle.infoTextCol}>
              <Text
                style={treinoTecnicoStyle.infoLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                Campo principal
              </Text>
              <Text style={treinoTecnicoStyle.infoSubLabel} numberOfLines={2}>
                Centro de formação AACJ
              </Text>
            </View>
          </View>
        </View>

        <View style={treinoTecnicoStyle.detailsCard}>
          <View style={treinoTecnicoStyle.detailsRow}>
            <Image
              source={require("@/assets/images/img/bandeiravermelha.png")}
              style={treinoTecnicoStyle.detailsIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                Categoria
              </Text>
              <Text
                style={treinoTecnicoStyle.detailsValue}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                Sub-17
              </Text>
            </View>
            <Text style={treinoTecnicoStyle.detailsChevron}>›</Text>
          </View>

          <Pressable
            style={[
              treinoTecnicoStyle.detailsRow,
              treinoTecnicoStyle.detailsRowDivider,
            ]}
            onPress={() => router.navigate("/comissao-tecnica")}
          >
            <Image
              source={require("@/assets/images/img/perfilVermelho.png")}
              style={treinoTecnicoStyle.detailsIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                Responsável
              </Text>
              <Text
                style={treinoTecnicoStyle.detailsValue}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                Professor João Silva
              </Text>
              <Text
                style={treinoTecnicoStyle.detailsSubValue}
                numberOfLines={1}
              >
                Treinador Técnico
              </Text>
            </View>
            <Text style={treinoTecnicoStyle.detailsChevron}>›</Text>
          </Pressable>

          <View
            style={[
              treinoTecnicoStyle.detailsRow,
              treinoTecnicoStyle.detailsRowDivider,
            ]}
          >
            <Image
              source={require("@/assets/images/img/atletaVermelho.png")}
              style={treinoTecnicoStyle.detailsIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                Tipo de atividade
              </Text>
              <Text
                style={treinoTecnicoStyle.detailsValue}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
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
              <Text
                style={treinoTecnicoStyle.checklistHeaderText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
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
                <Text
                  style={treinoTecnicoStyle.checklistItemText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                >
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
              <Text
                style={treinoTecnicoStyle.checklistHeaderText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.6}
              >
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
                <Text
                  style={treinoTecnicoStyle.checklistItemText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.6}
                >
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={treinoTecnicoStyle.observacoesCard}>
          <View>
            <Image
              source={require("@/assets/images/img/informacaovermelho.png")}
              style={treinoTecnicoStyle.observacoesIcon}
              resizeMode="contain"
            />
          </View>
          <View style={treinoTecnicoStyle.observacoesTextCol}>
            <Text style={treinoTecnicoStyle.observacoesTitle} numberOfLines={1}>
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
            <View style={treinoTecnicoStyle.sectionTitleIconBox}>
              <Image
                source={require("@/assets/images/img/raiovermelho.png")}
                style={treinoTecnicoStyle.sectionTitleIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={treinoTecnicoStyle.sectionTitle} numberOfLines={1}>
              Ações rápidas
            </Text>
          </View>

          <View style={treinoTecnicoStyle.quickActionsGrid}>
            <View
              style={[
                treinoTecnicoStyle.quickActionRow,
                treinoTecnicoStyle.quickActionRowDivider,
              ]}
            >
              <Pressable
                style={[
                  treinoTecnicoStyle.quickActionCell,
                  treinoTecnicoStyle.quickActionCellDivider,
                ]}
              >
                <View style={treinoTecnicoStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/mapavermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={treinoTecnicoStyle.quickActionTextCol}>
                    <Text
                      style={treinoTecnicoStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Abrir mapa
                    </Text>
                    <Text
                      style={treinoTecnicoStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Visualizar o local do treino
                    </Text>
                  </View>
                  <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
                </View>
              </Pressable>

              <Pressable style={treinoTecnicoStyle.quickActionCell}>
                <View style={treinoTecnicoStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/agendaVermelha.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={treinoTecnicoStyle.quickActionTextCol}>
                    <Text
                      style={treinoTecnicoStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Adicionar ao calendário
                    </Text>
                    <Text
                      style={treinoTecnicoStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Adicionar o compromisso ao calendário
                    </Text>
                  </View>
                  <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
                </View>
              </Pressable>
            </View>

            <View style={treinoTecnicoStyle.quickActionRow}>
              <Pressable
                style={[
                  treinoTecnicoStyle.quickActionCell,
                  treinoTecnicoStyle.quickActionCellDivider,
                ]}
              >
                <View style={treinoTecnicoStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/compartilharvermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={treinoTecnicoStyle.quickActionTextCol}>
                    <Text
                      style={treinoTecnicoStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Compartilhar
                    </Text>
                    <Text
                      style={treinoTecnicoStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Compartilhar data, horário e local com outra pessoa
                    </Text>
                  </View>
                  <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
                </View>
              </Pressable>

              <Pressable style={treinoTecnicoStyle.quickActionCell}>
                <View style={treinoTecnicoStyle.quickActionTopRow}>
                  <Image
                    source={require("@/assets/images/img/chatvermelho.png")}
                    style={treinoTecnicoStyle.quickActionIcon}
                    resizeMode="contain"
                  />
                  <View style={treinoTecnicoStyle.quickActionTextCol}>
                    <Text
                      style={treinoTecnicoStyle.quickActionTitle}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.6}
                    >
                      Entrar em contato
                    </Text>
                    <Text
                      style={treinoTecnicoStyle.quickActionSubtitle}
                      numberOfLines={3}
                    >
                      Conversar com o responsável
                    </Text>
                  </View>
                  <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
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
          <Text style={menuInferiorStyle.tabLabelActive} numberOfLines={1}>
            Agenda
          </Text>
        </View>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/campeonatos")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Campeonatos
          </Text>
        </Pressable>
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
