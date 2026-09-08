import { Dimensions, StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 428;
const WIDTH_RATIO = Math.min(1, SCREEN_WIDTH / BASE_WIDTH);
const scale = (size: number, min = 0.72) =>
  Math.round(size * Math.max(min, WIDTH_RATIO) * 10) / 10;

const treinoTecnicoStyle = StyleSheet.create({
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
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "700",
    color: variaveis.branco,
    marginRight: 4,
  },
  backText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 15,
    fontWeight: "600",
    color: variaveis.branco,
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
    backgroundColor: variaveis.vermelho,
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
    color: variaveis.branco,
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 22,
  },
  confirmedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
  },
  confirmedIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  confirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: variaveis.verde,
  },
  countdownPill: {
    backgroundColor: variaveis.vermelho20,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
    justifyContent: "center",
  },
  countdownText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: variaveis.vermelho,
  },

  heroSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 16,
  },
  heroIcon: {
    width: 50,
    height: 50,
    marginRight: 30,
  },
  heroTextCol: {
    flex: 1,
    minWidth: 0,
  },
  heroTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: variaveis.branco,
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  heroMetaIcon: {
    width: 13,
    height: 13,
    marginRight: 6,
  },
  heroMetaText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: variaveis.vermelho,
  },
  heroMetaTextMuted: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 12.5,
    fontWeight: "600",
    color: variaveis.cinza,
  },
  heroMetaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: variaveis.branco30,
    marginHorizontal: 8,
  },

  infoRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  infoCol: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
  },
  infoTextCol: {
    flex: 1,
    minWidth: 0,
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    marginTop: 2,
  },
  infoLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(14, 0.85),
    fontWeight: "700",
    color: variaveis.branco,
  },
  infoSubLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(12, 0.85),
    color: variaveis.branco70,
    marginTop: 2,
  },

  detailsCard: {
    // backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 24,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  detailsRowDivider: {
    borderTopWidth: 1,
    borderTopColor: variaveis.cinza,
  },
  detailsIcon: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  detailsTextCol: {
    flex: 1,
    minWidth: 0,
  },
  detailsLabel: {
    fontFamily: fontes.OpenSans_Regular ,
    fontSize: 12,
    color: variaveis.branco70,
  },
  detailsValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14.5,
    fontWeight: "700",
    color: variaveis.branco,
    marginTop: 2,
  },
  detailsSubValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: variaveis.branco70,
    marginTop: 1,
  },
  detailsChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 18,
    color: variaveis.branco30,
  },

  checklistRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 24,
    columnGap: scale(10, 0.65),
  },
  checklistCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: 18,
    paddingVertical: scale(14, 0.65),
  },
  checklistHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checklistHeaderIcon: {
    width: scale(18, 0.7),
    height: scale(18, 0.7),
    marginRight: scale(8, 0.6),
  },
  checklistHeaderText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(10, 0.64),
    fontWeight: "700",
    color: variaveis.branco,
    flexShrink: 1,
  },
  checklistItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checklistItemIcon: {
    width: scale(15, 0.78),
    height: scale(15, 0.78),
    marginRight: scale(8, 0.7),
  },
  checklistItemText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(10.5, 0.64),
    color: variaveis.branco,
    flexShrink: 1,
  },

  observacoesCard: {
    flexDirection: "row",
    backgroundColor: variaveis.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  observacoesIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  observacoesTextCol: {
    flex: 1,
  },
  observacoesTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: variaveis.preto,
    marginBottom: 8,
  },
  observacoesItemRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  observacoesBullet: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    color: variaveis.vermelho,
    marginRight: 8,
  },
  observacoesItemText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: variaveis.cinza,
    flex: 1,
  },

  quickActionsSection: {
    backgroundColor: variaveis.branco,
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
    backgroundColor: variaveis.vermelho20,
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
    color: variaveis.preto,
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
    color: variaveis.cinza,
    marginLeft: 4,
  },
  quickActionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(9.3, 0.55),
    fontWeight: "700",
    color: variaveis.preto,
  },
  quickActionSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(10, 0.8),
    color: variaveis.cinza,
    marginTop: 3,
  },
});

export default treinoTecnicoStyle;
