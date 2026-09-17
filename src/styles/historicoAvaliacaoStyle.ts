import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const historicoAvaliacaoStyle = StyleSheet.create({
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

  listSection: {
    paddingHorizontal: 20,
    marginTop: 22,
  },
  avaliacaoRow: {
    flexDirection: "row",
  },
  dateCol: {
    width: 40,
    height: 84,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.branco,
  },
  dateWeekday: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.branco70,
  },
  lineCol: {
    width: 20,
    height: 84,
    alignItems: "center",
  },
  lineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.verde,
    marginTop: 33,
  },
  lineConnector: {
    position: "absolute",
    top: 41,
    bottom: -33,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  avaliacaoCard: {
    flex: 1,
    height: 74,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  avaliacaoTextCol: {
    flex: 1,
    minWidth: 0,
  },
  avaliacaoData: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.branco70,
  },
  avaliacaoTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },
  avaliacaoPontos: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.branco70,
    marginTop: 2,
  },
  avaliacaoPill: {
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 26,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  avaliacaoPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11.5,
    fontWeight: "700",
  },
  avaliacaoPillExcelente: {
    backgroundColor: cores.verdeclaro,
  },
  avaliacaoPillRegular: {
    backgroundColor: "rgba(202,178,79,0.25)",
  },
  avaliacaoChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    color: cores.branco70,
    marginLeft: 10,
  },
});

export default historicoAvaliacaoStyle;
