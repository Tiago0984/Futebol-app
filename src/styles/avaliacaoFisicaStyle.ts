import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const ANEL_TAMANHO = 130;
const ANEL_ESPESSURA = 12;
const ANEL_RAIO = ANEL_TAMANHO / 2;

const avaliacaoFisicaStyle = StyleSheet.create({
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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },

  anelContainer: {
    width: ANEL_TAMANHO,
    height: ANEL_TAMANHO,
  },
  anelTrilha: {
    position: "absolute",
    width: ANEL_TAMANHO,
    height: ANEL_TAMANHO,
    borderRadius: ANEL_RAIO,
    borderWidth: ANEL_ESPESSURA,
    borderColor: "rgba(0,0,0,0.08)",
  },
  anelMetade: {
    position: "absolute",
    width: ANEL_RAIO,
    height: ANEL_TAMANHO,
    overflow: "hidden",
  },
  anelMetadeDireita: {
    left: ANEL_RAIO,
  },
  anelMetadeEsquerda: {
    left: 0,
  },
  anelPreenchimento: {
    position: "absolute",
    width: ANEL_TAMANHO,
    height: ANEL_TAMANHO,
    borderRadius: ANEL_RAIO,
    borderWidth: ANEL_ESPESSURA,
  },
  anelPreenchimentoDireita: {
    left: -ANEL_RAIO,
    borderTopColor: cores.verde,
    borderRightColor: cores.verde,
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
  anelPreenchimentoEsquerda: {
    left: 0,
    borderBottomColor: cores.verde,
    borderLeftColor: cores.verde,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
  },
  anelCentro: {
    position: "absolute",
    width: ANEL_TAMANHO,
    height: ANEL_TAMANHO,
    alignItems: "center",
    justifyContent: "center",
  },
  indiceNumero: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 30,
    fontWeight: "800",
    color: cores.preto,
  },
  indiceNumeroLabel: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 20,
    color: cores.preto,
    marginTop: -2,
  },

  indiceStatusCol: {
    flex: 1,
    marginLeft: 16,
  },
  indiceStatusText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "800",
    color: cores.preto,
  },

  indiceSeloCirculo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: cores.verde,
    alignItems: "center",
    justifyContent: "center",
  },
  indiceSeloIcone: {
    width: 40,
    height: 40,
  },

  fundamentosSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  fundamentosLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 14,
  },
  fundamentosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  fundamentoCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 16,
  },
  fundamentoCardTitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
    textAlign: "center",
  },
  fundamentoCardRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fundamentoCardIcone: {
    width: 30,
    height: 30,
  },
  fundamentoCardValor: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 30,
    fontWeight: "800",
    color: cores.preto,
  },

  comparacaoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 10,
    padding: 16,
  },
  comparacaoLeftCol: {
    flex: 1,
  },
  comparacaoTitulo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.preto,
    marginBottom: 10,
  },
  comparacaoGraficoArea: {
    height: 70,
  },
  comparacaoPreenchimentoRecorte: {
    position: "absolute",
    top: 0,
    height: 70,
    overflow: "hidden",
  },
  comparacaoPreenchimentoFaixa: {
    position: "absolute",
  },
  comparacaoLinhaSegmento: {
    position: "absolute",
    height: 2,
    borderRadius: 1,
    backgroundColor: cores.verde,
  },
  comparacaoPonto: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.verde,
  },
  comparacaoDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: "rgba(0,0,0,0.12)",
    marginHorizontal: 16,
  },
  comparacaoRightCol: {
    alignItems: "flex-start",
  },
  comparacaoIndicadorRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  comparacaoSeta: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.verde,
    marginRight: 6,
  },
  comparacaoValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 24,
    fontWeight: "800",
    color: cores.verde,
  },
  comparacaoPontosLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 18,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 4,
  },

  resumoSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  resumoTemporada: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "800",
    color: cores.branco,
  },
  resumoMensagem: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
    lineHeight: 28,
    marginTop: 10,
  },
  resumoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 20,
    marginTop: 10,
    padding: 16,
  },
  resumoCardIcone: {
    width: 44,
    height: 44,
  },
  resumoCardTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  resumoCardLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
  },
  resumoCardValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 18,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 4,
  },
  resumoCardValorPonto: {
    color: cores.vermelho,
  },
  resumoCardChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.vermelho,
  },
});

export default avaliacaoFisicaStyle;
