import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const classificacaoStyle = StyleSheet.create({
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

  tableCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 12,
    paddingTop: 6,
  },

  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },
  tableHeaderText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.cinza,
  },

  linhaRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  colPos: {
    width: 24,
  },
  colPosText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.preto,
  },
  colEquipe: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  equipeBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
  equipeNome: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.preto,
  },
  colNumero: {
    width: 22,
    alignItems: "center",
  },
  colNumeroTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.preto,
  },
  colDestaque: {
    width: 28,
    alignItems: "center",
  },
  colDestaqueTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.preto,
  },

  legenda: {
    paddingVertical: 14,
  },
  legendaLinha: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 4,
  },
  legendaItem: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.cinza,
    marginRight: 16,
  },
  legendaSigla: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.preto,
  },
});

export default classificacaoStyle;
