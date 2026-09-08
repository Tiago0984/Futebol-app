import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const campeonatosStyle = StyleSheet.create({
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
    alignItems: "flex-start",
  },
  headerTitleCol: {
    flex: 1,
    flexShrink: 1,
  },
  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 29,
    fontWeight: "800",
    color: cores.branco,
  },
  screenSubtitle: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 13,
    fontWeight: "600",
    color: cores.branco,
    marginTop: 4,
  },
  headerIconsRow: {
    flexShrink: 0,
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

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 18,
    rowGap: 10,
    columnGap: 10,
  },
  filterPill: {
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  filterPillActive: {
    backgroundColor: cores.vermelho,
  },
  filterPillText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 13,
    fontWeight: "600",
    color: cores.branco70,
  },
  filterPillTextActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  card: {
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: cores.preto,
  },
  cardBanner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  cardBannerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardContent: {
    padding: 18,
  },
  cardTopRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    rowGap: 8,
  },
  cardTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    minWidth: 150,
  },
  cardTitleTextCol: {
    flexShrink: 1,
  },
  cardIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardIcon: {
    width: 30,
    height: 30,
  },
  cardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.branco,
  },
  cardSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco70,
    marginTop: 2,
  },
  statusPill: {
    flexShrink: 0,
    marginLeft: "auto",
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

  progressSection: {
    marginTop: 18,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabelText: {
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

  cardBottomRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 18,
    rowGap: 6,
  },
  nextPhaseTextCol: {
    flexShrink: 1,
  },
  nextPhaseLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco70,
  },
  nextPhaseValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14.5,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },
  verCampeonatoText: {
    flexShrink: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.vermelho,
  },
});

export default campeonatosStyle;
