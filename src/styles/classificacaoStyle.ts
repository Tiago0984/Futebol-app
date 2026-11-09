import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const classificacaoStyle = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 32,
    height: 32,
    marginLeft: -8,
    marginRight: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "700",
    color: cores.branco,
  },
  headerTitleCol: {
    flex: 1,
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

  tableCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 10,
    paddingTop: 6,
    // O fundo da linha da AACJ não passa dos cantos arredondados
    overflow: "hidden",
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
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.cinza,
  },

  // Vai de borda a borda do card (anula o paddingHorizontal dele), para o fundo da
  // linha da AACJ cobrir a largura toda; o conteúdo continua no mesmo lugar
  linhaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: -10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.06)",
  },
  // Larguras para as 8 colunas de números caberem na tela do celular
  colPos: {
    width: 20,
  },
  colPosText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
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
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D9D9D9",
    marginRight: 6,
  },
  equipeEscudo: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  equipeNome: {
    flex: 1,
    minWidth: 0,
    marginRight: 4,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.preto,
  },
  // Linha e nome da AACJ (da_aacj); posição de quem já se classificou
  linhaAacj: {
    backgroundColor: "rgba(215,25,32,0.06)",
  },
  equipeNomeAacj: {
    color: cores.vermelho,
  },
  posClassificado: {
    color: cores.verde,
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
  },
  grupoTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 8,
    textTransform: "capitalize",
  },
  legendaCard: {
    paddingTop: 0,
  },
  colNumero: {
    width: 22,
    alignItems: "center",
  },
  colNumeroTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.preto,
  },
  // PTS, em negrito e um pouco mais larga
  colDestaque: {
    width: 26,
    alignItems: "center",
  },
  colDestaqueTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
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
    fontSize: fontSizes.corpo,
    color: cores.cinza,
    marginRight: 14,
    marginBottom: 4,
  },
  legendaSigla: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.preto,
  },
});

export default classificacaoStyle;
