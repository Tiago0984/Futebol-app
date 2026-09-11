import { Dimensions, StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 428;
const WIDTH_RATIO = Math.min(1, SCREEN_WIDTH / BASE_WIDTH);
const scale = (size: number, min = 0.72) =>
  Math.round(size * Math.max(min, WIDTH_RATIO) * 10) / 10;

const proximaPartidaStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
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
    position: "absolute",
    left: 60,
    right: 60,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "700",
    color: cores.branco,
  },
  headerSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
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

  matchCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 22,
    padding: 18,
  },
  teamsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  teamCol: {
    flex: 1,
    alignItems: "center",
  },
  teamCrest: {
    width: 60,
    height: 60,
  },
  teamName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(13, 0.8),
    fontWeight: "700",
    color: cores.preto,
    marginTop: 8,
    textAlign: "center",
  },
  vsText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "800",
    color: cores.preto,
    marginHorizontal: 8,
  },
  matchDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 16,
  },
  matchInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  matchInfoCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  matchInfoDivider: {
    width: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  matchInfoIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  matchInfoTextCol: {},
  matchInfoLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(11, 0.75),
    color: cores.cinza,
  },
  matchInfoValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(12, 0.75),
    fontWeight: "700",
    color: cores.preto,
    marginTop: 2,
  },
  confirmedPill: {
    alignSelf: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 26,
    justifyContent: "center",
    marginTop: 16,
  },
  confirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.verde,
  },

  participacaoSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  participacaoTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
  },
  detailsCard: {
    marginTop: 6,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  detailsRowDivider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  detailsLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.branco70,
  },
  detailsValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
  },
  statusPill: {
    backgroundColor: cores.verdeclaro,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 24,
    justifyContent: "center",
  },
  statusPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.verde,
  },

  quickActionsSection: {
    backgroundColor: cores.branco,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 26,
    padding: scale(20, 0.8),
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitleIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: cores.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  sectionTitleIcon: {
    width: 30,
    height: 30,
  },
  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "700",
    color: cores.preto,
  },
  quickActionsGrid: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    borderRadius: 8,
    overflow: "hidden",
  },
  quickActionRow: {
    flexDirection: "row",
  },
  quickActionRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  quickActionCell: {
    flex: 1,
    minWidth: 0,
    paddingVertical: scale(12, 0.8),
    paddingHorizontal: scale(10, 0.5),
  },
  quickActionCellDivider: {
    borderRightWidth: 1,
    borderRightColor: "rgba(0,0,0,0.08)",
  },
  quickActionTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  quickActionIcon: {
    width: scale(25, 0.65),
    height: scale(25, 0.65),
    marginRight: scale(7, 0.5),
  },
  quickActionTextCol: {
    flex: 1,
    minWidth: 0,
  },
  quickActionChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    color: cores.cinza,
    marginLeft: 4,
  },
  quickActionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(9.3, 0.55),
    fontWeight: "700",
    color: cores.preto,
  },
  quickActionSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(10, 0.8),
    color: cores.cinza,
    marginTop: 3,
  },
});

export default proximaPartidaStyle;
