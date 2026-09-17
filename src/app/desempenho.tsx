import TabBar from "@/components/tabBar";
import desempenhoStyle from "@/styles/desempenhoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Desempenho() {
  const insets = useSafeAreaInsets();
  const [filtroAtivo, setFiltroAtivo] = useState("7 dias");

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={desempenhoStyle.scrollView}
        contentContainerStyle={[
          desempenhoStyle.scrollContent,
          {
            paddingBottom:
              TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={desempenhoStyle.header}>
          <View style={desempenhoStyle.headerTitleCol}>
            <Text style={desempenhoStyle.screenTitle}>
              Desempenho
            </Text>

            <View style={desempenhoStyle.headerSubtitleRow}>
              <Text style={desempenhoStyle.seasonText}>
                Temporada 2026
              </Text>

              <Text style={desempenhoStyle.separatorText}>
                -
              </Text>

              <Text style={desempenhoStyle.categoryText}>
                Categoria Sub-17
              </Text>
            </View>
          </View>

          <View style={desempenhoStyle.headerIconsRow}>
            <View style={desempenhoStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/shoppingbranco.png")}
                style={desempenhoStyle.headerIcon}
                resizeMode="contain"
              />
            </View>

            <View style={desempenhoStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/sinoBranco.png")}
                style={desempenhoStyle.headerIcon}
                resizeMode="contain"
              />

              <View style={desempenhoStyle.notificationBadge}>
                <Text style={desempenhoStyle.notificationBadgeText}>
                  2
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* FILTROS */}
        <View style={desempenhoStyle.filterRow}>
          <Pressable
            style={[
              desempenhoStyle.filterPill,
              filtroAtivo === "7 dias" &&
                desempenhoStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("7 dias")}
          >
            <Text
              style={[
                desempenhoStyle.filterPillText,
                filtroAtivo === "7 dias" &&
                  desempenhoStyle.filterPillTextActive,
              ]}
            >
              7 dias
            </Text>
          </Pressable>

          <Pressable
            style={[
              desempenhoStyle.filterPill,
              filtroAtivo === "30 dias" &&
                desempenhoStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("30 dias")}
          >
            <Text
              style={[
                desempenhoStyle.filterPillText,
                filtroAtivo === "30 dias" &&
                  desempenhoStyle.filterPillTextActive,
              ]}
            >
              30 dias
            </Text>
          </Pressable>

          <Pressable
            style={[
              desempenhoStyle.filterPill,
              filtroAtivo === "Temporada" &&
                desempenhoStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Temporada")}
          >
            <Text
              style={[
                desempenhoStyle.filterPillText,
                filtroAtivo === "Temporada" &&
                  desempenhoStyle.filterPillTextActive,
              ]}
            >
              Temporada
            </Text>
          </Pressable>

          <Pressable
            style={[
              desempenhoStyle.filterPill,
              filtroAtivo === "Ano" &&
                desempenhoStyle.filterPillActive,
            ]}
            onPress={() => setFiltroAtivo("Ano")}
          >
            <Text
              style={[
                desempenhoStyle.filterPillText,
                filtroAtivo === "Ano" &&
                  desempenhoStyle.filterPillTextActive,
              ]}
            >
              Ano
            </Text>
          </Pressable>
        </View>

        {/* ÍNDICE GERAL */}
        <View style={desempenhoStyle.generalCard}>
          <Text style={desempenhoStyle.generalTitle}>
            Índice Geral
          </Text>

          <Text style={desempenhoStyle.generalScore}>
            91
          </Text>

          <Text style={desempenhoStyle.generalEvolution}>
            Excelente Evolução
          </Text>

          <View style={desempenhoStyle.evolutionPill}>
            <Text style={desempenhoStyle.evolutionArrow}>
              ↑
            </Text>

            <Text style={desempenhoStyle.evolutionText}>
              +8%
            </Text>
          </View>

          <Text style={desempenhoStyle.evolutionPeriod}>
            mês atual / julho
          </Text>

          <View style={desempenhoStyle.generalDivider} />

          <View style={desempenhoStyle.generalIndicators}>
            <View style={desempenhoStyle.generalIndicator}>
              <Image
                source={require("@/assets/images/img/userPreto.png")}
                style={desempenhoStyle.generalIndicatorIcon}
                tintColor={cores.verde}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.generalIndicatorLabel}>
                Presença
              </Text>

              <Text style={desempenhoStyle.generalIndicatorValue}>
                94%
              </Text>
            </View>

            <View style={desempenhoStyle.generalIndicatorDivider} />

            <View style={desempenhoStyle.generalIndicator}>
              <Image
                source={require("@/assets/images/img/raiovermelho.png")}
                style={desempenhoStyle.generalIndicatorIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.generalIndicatorLabel}>
                Treinos
              </Text>

              <Text style={desempenhoStyle.generalIndicatorValue}>
                18
              </Text>
            </View>

            <View style={desempenhoStyle.generalIndicatorDivider} />

            <View style={desempenhoStyle.generalIndicator}>
              <Image
                source={require("@/assets/images/img/bolaVermelha.png")}
                style={desempenhoStyle.generalIndicatorIcon}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.generalIndicatorLabel}>
                Jogos
              </Text>

              <Text style={desempenhoStyle.generalIndicatorValue}>
                14
              </Text>
            </View>

            <View style={desempenhoStyle.generalIndicatorDivider} />

            <View style={desempenhoStyle.generalIndicator}>
              <Image
                source={require("@/assets/images/img/checkvermelho.png")}
                style={desempenhoStyle.generalIndicatorIcon}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.generalIndicatorLabel}>
                Avaliações
              </Text>

              <Text style={desempenhoStyle.generalIndicatorValue}>
                7
              </Text>
            </View>
          </View>

          <View style={desempenhoStyle.generalBottomDivider} />

          <Pressable>
            <Text style={desempenhoStyle.generalLink}>
              Ver evolução {">"}
            </Text>
          </Pressable>
        </View>

        {/* INDICADORES */}
        <View style={desempenhoStyle.section}>
          <Text style={desempenhoStyle.sectionTitle}>
            Indicadores
          </Text>

          <View style={desempenhoStyle.indicatorsGrid}>
            <View style={desempenhoStyle.indicatorItem}>
              <View style={desempenhoStyle.indicatorIconCircle}>
                <Image
                  source={require("@/assets/images/img/userPreto.png")}
                  style={desempenhoStyle.indicatorIcon}
                  tintColor={cores.verde}
                  resizeMode="contain"
                />
              </View>

              <View style={desempenhoStyle.indicatorTextCol}>
                <Text style={desempenhoStyle.indicatorValue}>
                  94%
                </Text>

                <Text style={desempenhoStyle.indicatorLabel}>
                  Presença
                </Text>
              </View>

              <Text style={desempenhoStyle.indicatorArrow}>
                {">"}
              </Text>
            </View>

            <View style={desempenhoStyle.indicatorItem}>
              <View style={desempenhoStyle.indicatorIconCircle}>
                <Image
                  source={require("@/assets/images/img/clockvermelho.png")}
                  style={desempenhoStyle.indicatorIcon}
                  tintColor={cores.verde}
                  resizeMode="contain"
                />
              </View>

              <View style={desempenhoStyle.indicatorTextCol}>
                <Text style={desempenhoStyle.indicatorValue}>
                  98%
                </Text>

                <Text style={desempenhoStyle.indicatorLabel}>
                  Pontualidade
                </Text>
              </View>

              <Text style={desempenhoStyle.indicatorArrow}>
                {">"}
              </Text>
            </View>

            <View style={desempenhoStyle.indicatorItem}>
              <View style={desempenhoStyle.indicatorIconCircle}>
                <Image
                  source={require("@/assets/images/img/alvovermelho.png")}
                  style={desempenhoStyle.indicatorIcon}
                  tintColor={cores.verde}
                  resizeMode="contain"
                />
              </View>

              <View style={desempenhoStyle.indicatorTextCol}>
                <Text style={desempenhoStyle.indicatorValue}>
                  91%
                </Text>

                <Text style={desempenhoStyle.indicatorLabel}>
                  Participação
                </Text>
              </View>

              <Text style={desempenhoStyle.indicatorArrow}>
                {">"}
              </Text>
            </View>

            <View style={desempenhoStyle.indicatorItem}>
              <View style={desempenhoStyle.indicatorIconCircle}>
                <Image
                  source={require("@/assets/images/img/checkvermelho.png")}
                  style={desempenhoStyle.indicatorIcon}
                  tintColor={cores.verde}
                  resizeMode="contain"
                />
              </View>

              <View style={desempenhoStyle.indicatorTextCol}>
                <Text style={desempenhoStyle.indicatorValue}>
                  95%
                </Text>

                <Text style={desempenhoStyle.indicatorLabel}>
                  Disciplina
                </Text>
              </View>

              <Text style={desempenhoStyle.indicatorArrow}>
                {">"}
              </Text>
            </View>
          </View>
        </View>

        {/* METAS DA TEMPORADA */}
        <View style={desempenhoStyle.whiteCard}>
          <Text style={desempenhoStyle.whiteCardTitle}>
            Metas da temporada
          </Text>

          <View style={desempenhoStyle.goalsContent}>
            <View style={desempenhoStyle.goalProgress}>
              <View style={desempenhoStyle.goalCircle}>
                <Text style={desempenhoStyle.goalPercent}>
                  60%
                </Text>
              </View>

              <View style={desempenhoStyle.goalTextCol}>
                <Text style={desempenhoStyle.goalSmallLabel}>
                  Treinos concluídos
                </Text>

                <Text style={desempenhoStyle.goalValue}>
                  18 de 30
                </Text>
              </View>
            </View>

            <View style={desempenhoStyle.goalDivider} />

            <View style={desempenhoStyle.nextGoal}>
              <Image
                source={require("@/assets/images/img/alvovermelho.png")}
                style={desempenhoStyle.nextGoalIcon}
                tintColor={cores.verde}
                resizeMode="contain"
              />

              <View style={desempenhoStyle.nextGoalTextCol}>
                <Text style={desempenhoStyle.goalSmallLabel}>
                  Próxima meta
                </Text>

                <Text style={desempenhoStyle.goalValue}>
                  20 treinos
                </Text>
              </View>
            </View>

            <Pressable style={desempenhoStyle.goalLinkButton}>
              <Text style={desempenhoStyle.goalLink}>
                Ver metas {">"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ÚLTIMA AVALIAÇÃO */}
        <View style={desempenhoStyle.whiteCard}>
          <Text style={desempenhoStyle.whiteCardTitle}>
            Última avaliação
          </Text>

          <View style={desempenhoStyle.evaluationContent}>
            <Image
              source={require("@/assets/images/img/checkvermelho.png")}
              style={desempenhoStyle.evaluationIcon}
              resizeMode="contain"
            />

            <View style={desempenhoStyle.evaluationMain}>
              <Text style={desempenhoStyle.evaluationType}>
                Avaliação Física
              </Text>

              <Text style={desempenhoStyle.evaluationScore}>
                92 pontos
              </Text>
            </View>

            <View style={desempenhoStyle.evaluationDate}>
              <Text style={desempenhoStyle.evaluationDateText}>
                ▦
              </Text>

              <Text style={desempenhoStyle.evaluationDateValue}>
                12 de maio
              </Text>
            </View>

            <Pressable style={desempenhoStyle.evaluationLinkButton}>
              <Text style={desempenhoStyle.evaluationLink}>
                Ver detalhes {">"}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* CONQUISTAS */}
        <View style={desempenhoStyle.sectionSmall}>
          <Text style={desempenhoStyle.sectionTitle}>
            Conquistas
          </Text>

          <View style={desempenhoStyle.achievementsRow}>
            <View style={desempenhoStyle.achievementPill}>
              <Image
                source={require("@/assets/images/img/medalha.png")}
                style={desempenhoStyle.achievementIcon}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.achievementText}>
                100% Presença
              </Text>
            </View>

            <View style={desempenhoStyle.achievementPill}>
              <Image
                source={require("@/assets/images/img/trofeu.png")}
                style={desempenhoStyle.achievementIcon}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.achievementText}>
                10 Jogos
              </Text>
            </View>

            <View style={desempenhoStyle.achievementPill}>
              <Image
                source={require("@/assets/images/img/medalha.png")}
                style={desempenhoStyle.achievementIcon}
                resizeMode="contain"
              />

              <Text style={desempenhoStyle.achievementText}>
                Primeira Convocação
              </Text>
            </View>
          </View>
        </View>

        {/* OBSERVAÇÃO DA COMISSÃO */}
        <View style={desempenhoStyle.observationCard}>
          <View style={desempenhoStyle.observationHeader}>
            <Text style={desempenhoStyle.observationTitle}>
              Observação da Comissão
            </Text>

            <Pressable>
              <Text style={desempenhoStyle.observationLink}>
                Ver histórico {">"}
              </Text>
            </Pressable>
          </View>

          <Text style={desempenhoStyle.observationText}>
            Continue mantendo sua dedicação.
          </Text>

          <Text style={desempenhoStyle.observationText}>
            Sua evolução física foi excelente nas últimas semanas.
          </Text>

          <Text style={desempenhoStyle.observationAuthor}>
            Professor João Silva
          </Text>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="desempenho" />
    </View>
  );
}