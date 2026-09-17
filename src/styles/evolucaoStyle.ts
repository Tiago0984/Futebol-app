import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

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

  indiceCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
  },
  indiceTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.preto,
    textAlign: "center",
  },
  indiceNumero: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 48,
    fontWeight: "800",
    color: cores.preto,
    textAlign: "center",
    marginTop: 8,
  },
  indiceStatus: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "700",
    color: cores.verde,
    textAlign: "center",
    marginTop: 6,
  },
  indicePill: {
    alignSelf: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 14,
    height: 30,
    justifyContent: "center",
    marginTop: 10,
  },
  indicePillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.verde,
  },
  indiceCaption: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11.5,
    color: cores.cinza,
    textAlign: "center",
    marginTop: 8,
  },

  indiceDivider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.08)",
    marginVertical: 18,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCol: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  statIcon: {
    width: 30,
    height: 30,
    marginBottom: 8,
  },
  statLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.cinza,
  },
  statValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 2,
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
    fontSize: 16,
    fontWeight: "700",
    color: cores.branco,
  },
  chartCaption: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
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
    fontSize: 13,
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
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
  },
  chartFooterText: {
    alignSelf: "flex-end",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
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
    fontSize: 16,
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
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
  },
  fundamentoValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 24,
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
