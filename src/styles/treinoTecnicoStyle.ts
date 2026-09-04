import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

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
  heroIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  heroIcon: {
    width: 50,
    height: 50,
  },
  heroTextCol: {
    flex: 1,
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
    flexDirection: "row",
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: 10,
    marginTop: 2,
  },
  infoLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: variaveis.branco,
  },
  infoSubLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: variaveis.branco70,
    marginTop: 2,
  },

  detailsCard: {
    backgroundColor: "rgba(255,255,255,0.06)",
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
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  detailsIconSquare: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  detailsIcon: {
    width: 30,
    height: 30,
  },
  detailsTextCol: {
    flex: 1,
  },
  detailsLabel: {
    fontFamily: fontes.OpenSans_Regular,
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
    columnGap: 14,
  },
  checklistCard: {
    flex: 1,
    backgroundColor: variaveis.branco,
    borderRadius: 18,
    padding: 16,
  },
  checklistHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checklistHeaderIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  checklistHeaderText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.preto,
    flexShrink: 1,
  },
  checklistItemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  checklistItemIcon: {
    width: 14,
    height: 14,
    marginRight: 8,
  },
  checklistItemText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12.5,
    color: variaveis.preto,
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
  observacoesIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  observacoesIcon: {
    width: 16,
    height: 16,
  },
  observacoesTextCol: {
    flex: 1,
  },
  observacoesTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
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
    fontSize: 12.5,
    color: variaveis.cinza,
    flex: 1,
  },

  quickActionsSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  sectionTitleIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 14,
    columnGap: 12,
    rowGap: 12,
  },
  quickActionCard: {
    width: "48%",
    backgroundColor: variaveis.branco,
    borderRadius: 16,
    padding: 14,
  },
  quickActionTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  quickActionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionIcon: {
    width: 17,
    height: 17,
  },
  quickActionChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    color: variaveis.cinza,
    marginTop: 4,
  },
  quickActionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.preto,
    marginTop: 10,
  },
  quickActionSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: variaveis.cinza,
    marginTop: 3,
  },
});

export default treinoTecnicoStyle;
