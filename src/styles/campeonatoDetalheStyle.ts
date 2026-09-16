import { Dimensions, StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 428;
const WIDTH_RATIO = Math.min(1, SCREEN_WIDTH / BASE_WIDTH);
const scale = (size: number, min = 0.72) =>
  Math.round(size * Math.max(min, WIDTH_RATIO) * 10) / 10;

const campeonatoDetalheStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "700",
    color: cores.branco,
    marginRight: 4,
  },
  backText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 15,
    fontWeight: "600",
    color: cores.branco,
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 14,
  },
  headerTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 18,
    fontWeight: "800",
    color: cores.branco,
  },
  headerSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco70,
    marginTop: 2,
  },
  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconButton: {
    marginLeft: 16,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 10,
    fontWeight: "700",
    color: cores.branco,
  },

  infoCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  infoCardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  infoCardLeftGroup: {
    flex: 1,
    flexDirection: "row",
  },
  crestImage: {
    width: 70,
    height: 70,
    marginRight: 14,
  },
  detailsCol: {
    flex: 1,
    minWidth: 0,
  },
  detailRow: {
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    color: cores.preto,
  },
  detailValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    // fontWeight: "600",
    color: cores.cinza,
    marginTop: 2,
  },
  statusPill: {
    flexShrink: 0,
    marginLeft: 8,
    backgroundColor: cores.verdeclaro,
    borderRadius: 14,
    paddingHorizontal: 10,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  statusPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.verde,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
  },

  progressSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 8,
  },
  progressLabelMuted: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.branco70,
  },
  progressLabelValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
  },
  progressPercentText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  progressFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: cores.vermelho,
  },
  nextPhaseText: {
    marginTop: 10,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12.5,
    color: cores.branco70,
  },
  nextPhaseValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  statsSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    columnGap: 10,
    rowGap: 10,
  },
  statTile: {
    width: "23%",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 12,
    paddingVertical: scale(14, 0.6),
    alignItems: "center",
  },
  statValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(18, 0.6),
    fontWeight: "800",
    color: cores.branco,
  },
  statLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(10.5, 0.6),
    color: cores.branco70,
    marginTop: 4,
    textAlign: "center",
  },

  matchCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 26,
    padding: 18,
  },
  matchCardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.preto,
    marginBottom: 18,
  },
  matchTeamsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  matchTeamCol: {
    flex: 1,
    alignItems: "center",
  },
  matchTeamCrest: {
    width: scale(60, 0.75),
    height: scale(60, 0.75),
  },
  matchTeamName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(13, 0.75),
    fontWeight: "700",
    color: cores.preto,
    marginTop: 8,
  },
  matchCenterCol: {
    alignItems: "center",
    paddingHorizontal: 6,
  },
  matchDay: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(13, 0.75),
    fontWeight: "700",
    color: cores.preto,
  },
  matchTime: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(22, 0.7),
    fontWeight: "800",
    color: cores.preto,
    marginTop: 2,
  },
  matchLocal: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(11, 0.75),
    color: cores.cinza,
    marginTop: 2,
  },
  matchBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  matchBottomSide: {
    flex: 1,
  },
  matchBottomSideRight: {
    flex: 1,
    alignItems: "flex-end",
  },
  matchConfirmedPill: {
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 28,
    justifyContent: "center",
  },
  matchConfirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12.5,
    fontWeight: "700",
    color: cores.verde,
  },
  matchVerDetalhesText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.vermelho,
  },

  twoColSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 26,
  },
  colClassificacao: {
    flex: 1,
    paddingRight: 12,
  },
  colDivider: {
    width: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  colResultados: {
    flex: 1,
    paddingLeft: 12,
  },
  colHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  colTitle: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(14, 0.65),
    fontWeight: "700",
    color: cores.branco,
  },
  colLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(11, 0.65),
    fontWeight: "700",
    color: cores.vermelho,
    marginLeft: 8,
  },

  standingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  standingPosition: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(13, 0.65),
    fontWeight: "700",
    color: cores.branco,
    width: 14,
  },
  standingBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 8,
  },
  standingName: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(12.5, 0.65),
    fontWeight: "700",
    color: cores.branco,
  },
  standingPoints: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(13, 0.65),
    fontWeight: "700",
    color: cores.branco,
  },

  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  resultScoreText: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(11, 0.6),
    fontWeight: "700",
    color: cores.branco,
    marginRight: 6,
  },
  resultPill: {
    flexShrink: 0,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 8,
    height: 24,
    justifyContent: "center",
  },
  resultPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(10, 0.6),
    fontWeight: "700",
  },
  resultPillVitoria: {
    borderColor: cores.verde,
  },
  resultPillEmpate: {
    borderColor: "rgba(255,255,255,0.4)",
  },
  resultPillDerrota: {
    borderColor: cores.laranja,
  },

  sectionDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginHorizontal: 20,
    marginTop: 6,
  },

  proximasSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  proximasHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  proximasHeaderDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginBottom: 14,
  },
  proximasTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
  },
  proximasLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.vermelho,
  },
  proximaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  proximaData: {
    flexShrink: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(12.5, 0.7),
    fontWeight: "700",
    color: cores.branco,
  },
  proximaDataDia: {
    fontFamily: fontes.OpenSans_Regular,
    color: cores.branco70,
  },
  proximaTeams: {
    flex: 1,
    minWidth: 0,
    marginHorizontal: 10,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(12.5, 0.7),
    fontWeight: "700",
    color: cores.branco,
  },
  proximaTeamsVs: {
    fontFamily: fontes.OpenSans_Regular,
    color: cores.branco70,
  },
  proximaHora: {
    flexShrink: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(12.5, 0.7),
    fontWeight: "700",
    color: cores.branco,
  },
});

export default campeonatoDetalheStyle;
