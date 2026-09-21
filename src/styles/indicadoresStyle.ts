import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const indicadoresStyle = StyleSheet.create({
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

  listSection: {
    paddingHorizontal: 20,
    marginTop: 22,
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 20,
    padding: 16,
  },
  cardIcone: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  cardTitulo: {
    width: 96,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.preto,
  },

  graficoArea: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  graficoPreenchimentoRecorte: {
    position: "absolute",
    top: 0,
    height: 40,
    overflow: "hidden",
  },
  graficoPreenchimentoFaixa: {
    position: "absolute",
  },
  graficoLinhaSegmento: {
    position: "absolute",
    height: 2,
    borderRadius: 1,
    backgroundColor: cores.verde,
  },
  graficoPonto: {
    position: "absolute",
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: cores.verde,
  },

  percentualCol: {
    flexDirection: "row",
    alignItems: "center",
  },
  percentualSeta: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "800",
    color: cores.verde,
    marginRight: 4,
  },
  percentualTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "800",
    color: cores.verde,
  },
});

export default indicadoresStyle;
