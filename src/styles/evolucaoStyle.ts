import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const evolucaoStyle = StyleSheet.create({
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
    fontSize: fontSizes.subtitulo,
    fontWeight: "600",
    color: cores.branco,
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 14,
  },
  headerTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.branco,
  },
  headerSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
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
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  indiceCard: {
    backgroundColor: cores.branco,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 19,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 8,
  },
  indiceTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.preto,
    textAlign: "center",
  },
  indiceNumero: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.numeroGrande,
    fontWeight: "800",
    lineHeight: 35,
    color: cores.preto,
    textAlign: "center",
    marginTop: 3,
  },
  indiceStatus: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.verde,
    textAlign: "center",
    marginTop: 1,
  },
  indicePill: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 12,
    paddingHorizontal: 9,
    height: 21,
    marginTop: 4,
  },
  indicePillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.verde,
  },
  indiceCaption: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.cinza,
    textAlign: "center",
    marginTop: 2,
  },

  indiceDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.10)",
    marginTop: 7,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 76,
  },
  statCol: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  statDivider: {
    width: 1,
    height: 45,
    backgroundColor: "rgba(0,0,0,0.14)",
  },
  statIcon: {
    width: iconSizes.estatistica,
    height: iconSizes.estatistica,
    marginBottom: 3,
  },
  statLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.preto,
  },
  statValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 1,
  },

  chartSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  chartHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  chartTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },
  chartCaption: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
    marginLeft: 8,
  },
  chartBody: {
    flexDirection: "row",
    marginTop: 16,
  },
  yAxisCol: {
    height: 140,
    marginRight: 10,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  yAxisLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
  },
  chartArea: {
    flex: 1,
    height: 140,
  },
  chartBaseline: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  chartLineSegment: {
    position: "absolute",
    height: 3,
    borderRadius: 2,
    backgroundColor: cores.verde,
  },
  chartDot: {
    position: "absolute",
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: cores.verde,
    borderWidth: 2,
    borderColor: cores.branco,
  },
  monthsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginLeft: 50,
  },
  monthLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
  },
  chartFooterText: {
    alignSelf: "flex-end",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.verde,
    marginTop: 14,
  },

  fundamentosSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  fundamentosTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 16,
  },
  fundamentosRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fundamentoCol: {
    flex: 1,
    alignItems: "center",
  },
  fundamentoLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.branco,
  },
  fundamentoValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.branco,
    marginTop: 6,
  },
  fundamentoIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
});

export default evolucaoStyle;
