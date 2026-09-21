import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const ultimosResultadosStyle = StyleSheet.create({
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

  listSection: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 22,
  },
  resultRow: {
    flexDirection: "row",
  },
  listCard: {
    flex: 1,
    backgroundColor: cores.branco,
    borderRadius: 18,
    paddingHorizontal: 12,
  },
  dateCol: {
    width: 40,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
  },
  dateDay: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
    fontWeight: "700",
    color: cores.branco,
  },
  dateWeekday: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.branco70,
  },
  lineCol: {
    width: 20,
    height: 74,
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

  resultItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 74,
  },
  resultItemDivider: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  resultCrest: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  resultTextCol: {
    flex: 1,
    minWidth: 0,
  },
  resultScore: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.preto,
  },
  resultCompeticao: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.cinza,
    marginTop: 2,
  },
  resultLocal: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.cinza,
  },
  resultPill: {
    justifyContent: "center",
    alignItems: "center",
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 14,
    marginLeft: 8,
  },
  resultPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
  },
  resultPillVitoria: {
    backgroundColor: cores.verdeclaro,
  },
  resultPillEmpate: {
    backgroundColor: "#EAEAEA",
  },
  resultPillDerrota: {
    backgroundColor: cores.vermelho20,
  },
});

export default ultimosResultadosStyle;
