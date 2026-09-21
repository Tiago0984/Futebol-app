import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const campeonatoDetalheStyle = StyleSheet.create({
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
    minHeight: 78,
  },

  backButton: {
    marginTop: 7,
    marginRight: 20,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.branco,
  },

  headerTitleCol: {
    flex: 1,
    minWidth: 0,
  },

  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "800",
    color: cores.branco,
  },

  screenSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco,
    marginTop: 1,
  },

  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  headerIconButton: {
    position: "relative",
    marginLeft: 16,
  },

  headerIcon: {
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },

  notificationBadge: {
    position: "absolute",
    top: -6,
    right: -7,
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
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  /* CARD DE INFORMAÇÕES */

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    width: "88%",
    minHeight: 130,
    marginTop: 3,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: cores.branco,
  },

  campeonatoLogo: {
    width: 62,
    height: 82,
    marginRight: 12,
  },

  infoContent: {
    flex: 1,
    minWidth: 0,
  },

  infoHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusPill: {
    alignSelf: "flex-end",
    paddingHorizontal: 9,
    height: 20,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.verdeclaro,
  },

  statusPillText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.verde,
  },

  infoRows: {
    marginTop: 1,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  infoLabel: {
    width: 76,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.cinza,
  },

  infoValue: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.preto,
  },

  /* SEÇÕES */

  section: {
    marginHorizontal: 34,
    marginTop: 25,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 9,
  },

  /* PROGRESSO */

  progressHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  progressRoundCol: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.branco,
  },

  progressValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
    marginLeft: 28,
  },

  progressPercent: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
  },

  progressTrack: {
    width: "100%",
    height: 9,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: cores.branco,
  },

  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: cores.vermelho,
  },

  nextPhaseText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
    marginTop: 9,
  },

  nextPhaseValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  /* ESTATÍSTICAS */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 5,
  },

  statCard: {
    width: "23.5%",
    minHeight: 39,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },

  statValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "800",
    color: cores.branco,
    lineHeight: 15,
  },

  statLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.branco70,
    marginTop: 1,
  },

  /* PRÓXIMA PARTIDA */

  matchCard: {
    marginHorizontal: 24,
    marginTop: 19,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 11,
    borderRadius: 16,
    backgroundColor: cores.branco,
  },

  matchCardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.preto,
    marginBottom: 12,
  },

  matchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  teamCol: {
    width: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  teamLogo: {
    width: 48,
    height: 48,
  },

  teamName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 4,
  },

  matchCenter: {
    flex: 1,
    alignItems: "center",
  },

  matchDay: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.preto,
  },

  matchTime: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 1,
  },

  matchLocation: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.cinza,
    marginTop: 1,
  },

  confirmedPill: {
    height: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.verdeclaro,
    marginTop: 5,
  },

  confirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.verde,
  },

  matchDetailsButton: {
    alignSelf: "flex-end",
    marginTop: -2,
  },

  matchDetailsText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* CLASSIFICAÇÃO + RESULTADOS */

  tablesRow: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 20,
  },

  tableColumn: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },

  tableColumnRight: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.20)",
    paddingLeft: 10,
  },

  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.22)",
    paddingBottom: 5,
  },

  tableTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  tableLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    color: cores.vermelho,
  },

  tableRows: {
    paddingTop: 4,
  },

  classificationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
  },

  position: {
    width: 11,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  teamDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D9D9D9",
    marginRight: 5,
  },

  classificationTeam: {
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  points: {
    width: 20,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  resultRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 25,
    width: "100%",
  },

  resultTeams: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  resultScore: {
    flexShrink: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
    marginHorizontal: 4,
  },

  resultWin: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.verde,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultWinText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.verde,
  },

  resultDraw: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultDrawText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.branco70,
  },

  resultLoss: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultLossText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.laranja,
  },

  /* PRÓXIMAS PARTIDAS */

  upcomingSection: {
    marginHorizontal: 24,
    marginTop: 18,
  },

  upcomingHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.18)",
  },

  upcomingHeaderText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.branco70,
  },

  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },

  upcomingDate: {
    width: 31,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  upcomingGame: {
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
    marginLeft: 5,
  },

  upcomingTime: {
    width: 38,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },
});

export default campeonatoDetalheStyle;
