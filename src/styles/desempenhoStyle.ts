import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

const desempenhoStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 22,
  },

  headerTitleCol: {
    flex: 1,
    minWidth: 0,
  },

  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 21,
    fontWeight: "800",
    color: cores.branco,
  },

  headerSubtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  seasonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.branco,
  },

  separatorText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 10,
    color: cores.branco70,
    marginHorizontal: 7,
  },

  categoryText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 9,
    color: cores.branco,
  },

  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  headerIconButton: {
    position: "relative",
    marginLeft: 17,
  },

  headerIcon: {
    width: 25,
    height: 25,
  },

  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,
    fontWeight: "700",
    color: cores.branco,
  },

  /* FILTROS */

  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    marginTop: 19,
  },

  filterPill: {
    width: "23%",
    height: 27,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.28)",
  },

  filterPillActive: {
    backgroundColor: cores.vermelho,
  },

  filterPillText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 10,
    color: cores.preto,
  },

  filterPillTextActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.preto,
  },

  /* ÍNDICE GERAL */

  generalCard: {
    marginHorizontal: 24,
    marginTop: 19,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
    borderRadius: 12,
    backgroundColor: cores.branco,
  },

  generalTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    color: cores.preto,
  },

  generalScore: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 31,
    fontWeight: "800",
    lineHeight: 35,
    textAlign: "center",
    color: cores.preto,
    marginTop: 3,
  },

  generalEvolution: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    color: cores.verde,
    marginTop: 1,
  },

  evolutionPill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 21,
    paddingHorizontal: 9,
    borderRadius: 12,
    backgroundColor: cores.verdeclaro,
    marginTop: 4,
  },

  evolutionArrow: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.verde,
    marginRight: 5,
  },

  evolutionText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.verde,
  },

  evolutionPeriod: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8,
    textAlign: "center",
    color: cores.cinza,
    marginTop: 2,
  },

  generalDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
    marginHorizontal: 0,
    marginTop: 7,
  },

  generalIndicators: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 76,
  },

  generalIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  generalIndicatorIcon: {
    width: 25,
    height: 25,
    marginBottom: 3,
  },

  generalIndicatorLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8,
    color: cores.preto,
  },

  generalIndicatorValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 1,
  },

  generalIndicatorDivider: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.14)",
  },

  generalBottomDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
  },

  generalLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,
    fontWeight: "700",
    textAlign: "center",
    color: cores.vermelho,
    marginTop: 7,
  },

  /* SEÇÃO */

  section: {
    marginHorizontal: 24,
    marginTop: 11,
  },

  sectionSmall: {
    marginHorizontal: 24,
    marginTop: 10,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.branco,
    marginBottom: 7,
  },

  /* INDICADORES */

  indicatorsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 0,
  },

  indicatorItem: {
    width: "48%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.18)",
  },

  indicatorIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(22,157,93,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },

  indicatorIcon: {
    width: 18,
    height: 18,
  },

  indicatorTextCol: {
    flex: 1,
    marginLeft: 7,
  },

  indicatorValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "800",
    color: cores.branco,
  },

  indicatorLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8,
    color: cores.branco70,
    marginTop: -1,
  },

  indicatorArrow: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 17,
    color: cores.branco,
    marginRight: 7,
  },

  /* CARDS BRANCOS */

  whiteCard: {
    marginHorizontal: 24,
    marginTop: 10,
    borderRadius: 11,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 9,
    backgroundColor: cores.branco,
  },

  whiteCardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 10,
    fontWeight: "700",
    color: cores.preto,
    marginBottom: 6,
  },

  /* METAS */

  goalsContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 51,
  },

  goalProgress: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  goalCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: cores.vermelho,
    borderTopColor: cores.cinza,
    alignItems: "center",
    justifyContent: "center",
  },

  goalPercent: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "800",
    color: cores.preto,
  },

  goalTextCol: {
    marginLeft: 9,
  },

  goalSmallLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 7,
    color: cores.cinza,
  },

  goalValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 3,
  },

  goalDivider: {
    width: 1,
    height: 47,
    backgroundColor: "rgba(0,0,0,0.16)",
    marginHorizontal: 9,
  },

  nextGoal: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.95,
  },

  nextGoalIcon: {
    width: 31,
    height: 31,
  },

  nextGoalTextCol: {
    marginLeft: 6,
  },

  goalLinkButton: {
    alignSelf: "flex-start",
    marginLeft: 4,
    marginTop: 2,
  },

  goalLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 8.5,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* ÚLTIMA AVALIAÇÃO */

  evaluationContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 43,
  },

  evaluationIcon: {
    width: 34,
    height: 34,
  },

  evaluationMain: {
    marginLeft: 8,
  },

  evaluationType: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 7,
    color: cores.cinza,
  },

  evaluationScore: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 1,
  },

  evaluationDate: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },

  evaluationDateText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.cinza,
  },

  evaluationDateValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 7,
    color: cores.cinza,
    marginLeft: 4,
  },

  evaluationLinkButton: {
    marginLeft: "auto",
  },

  evaluationLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 8.5,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* CONQUISTAS */

  achievementsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  achievementPill: {
    width: "31.5%",
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
    borderRadius: 13,
    backgroundColor: cores.branco,
  },

  achievementIcon: {
    width: 15,
    height: 15,
    marginRight: 3,
  },

  achievementText: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 6.5,
    color: cores.preto,
  },

  /* OBSERVAÇÃO */

  observationCard: {
    marginHorizontal: 24,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 9,
    borderRadius: 10,
    backgroundColor: cores.branco,
  },

  observationHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  observationTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,
    fontWeight: "700",
    color: cores.preto,
  },

  observationLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 8,
    fontWeight: "700",
    color: cores.vermelho,
  },

  observationText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 6.5,
    color: cores.preto,
    marginTop: 4,
  },

  observationAuthor: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 6.5,
    color: cores.cinza,
    marginTop: 5,
  },
});

export default desempenhoStyle;