import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const campeonatosStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 22,
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
    fontSize: fontSizes.numeroGrande,
    fontWeight: "800",
    color: cores.branco,
  },
  screenSubtitle: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.destaqueLeve,
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
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
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
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "600",
    color: cores.branco70,
  },
  filterPillTextActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  emptyStateSection: {
    alignItems: "center",
    paddingHorizontal: 32,
    marginTop: 90,
  },
  emptyStateIconCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyStateIcon: {
    width: 100,
    height: 100,
  },
  emptyStateTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "800",
    color: cores.branco,
    textAlign: "center",
    marginBottom: 10,
  },
  emptyStateDescription: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.branco70,
    textAlign: "center",
    lineHeight: 19,
    marginBottom: 28,
  },
  emptyStateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: cores.branco,
    borderRadius: 14,
    height: 52,
  },
  emptyStateButtonIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  emptyStateButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.preto,
  },

  card: {
    position: "relative",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: cores.preto,
  },
  cardBanner: {
    position: "absolute",
    top: -1,
    left: -1,
  },
  cardBannerOverlay: {
    position: "absolute",
    top: -1,
    left: -1,
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
    fontSize: fontSizes.corpoMedio,
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
    fontSize: fontSizes.corpo,
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
    fontSize: fontSizes.destaqueLeve,
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
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
  },
  nextPhaseValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },
  verCampeonatoText: {
    flexShrink: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.vermelho,
  },
});

export default campeonatosStyle;
