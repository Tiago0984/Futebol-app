import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

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
  resultRow: {
    flexDirection: "row",
  },
  dateCol: {
    width: 40,
    alignItems: "center",
    paddingTop: 16,
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
    alignItems: "center",
  },
  lineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.verde,
    marginTop: 20,
  },
  lineConnector: {
    position: "absolute",
    top: 28,
    bottom: -16,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  resultCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
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
    fontSize: 12.5,
    fontWeight: "700",
    color: cores.preto,
  },
  resultCompeticao: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 10.5,
    color: cores.cinza,
    marginTop: 2,
  },
  resultLocal: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 10.5,
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
    fontSize: 11,
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
