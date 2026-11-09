import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const campeonatoDetalheStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 22,
    minHeight: 78,
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
    minWidth: 0,
  },

  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.branco,
  },

  screenSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco,
    marginTop: 1,
  },

  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  headerIconButton: {
    position: "relative",
    marginLeft: 16,
  },

  headerIcon: {
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },



  /* CARD DE INFORMAÇÕES */

  infoCard: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: cores.branco,
  },

  // Banner (o do campeonato ou o padrão) escurecido, com o status no canto
  infoBanner: {
    height: 92,
    backgroundColor: cores.preto,
  },

  infoBannerImagem: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  infoBannerOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  statusPillNoBanner: {
    position: "absolute",
    top: 12,
    right: 12,
    maxWidth: "70%",
  },

  // Logo num círculo branco, metade sobre o banner; formato e organizador ao lado
  infoIdentidade: {
    flexDirection: "row",
    alignItems: "flex-end",
    columnGap: 12,
    paddingHorizontal: 16,
    marginTop: -32,
  },

  // Quadrado de cantos arredondados (não círculo): o logo pode ser quadrado ou retangular
  // e aparece inteiro (contain), com uma margem branca em volta
  infoLogoCaixa: {
    width: 68,
    height: 68,
    borderRadius: 14,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.branco,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },

  campeonatoLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  campeonatoLogoPadrao: {
    width: 32,
    height: 32,
  },

  infoIdentidadeTexto: {
    flex: 1,
    minWidth: 0,
    paddingBottom: 2,
    rowGap: 4,
  },

  formatoPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    backgroundColor: cores.vermelho,
  },

  formatoPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.branco,
  },

  organizadorTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.cinza,
  },

  organizadorNome: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.preto,
  },

  statusPill: {
    flexShrink: 1,
    paddingHorizontal: 10,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.verdeclaro,
  },

  statusPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.verde,
  },

  // Informações com ícone vermelho numa caixinha rosada, rótulo pequeno em cima do valor
  infoRows: {
    marginTop: 14,
    marginHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    rowGap: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.08)",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  infoIconeCaixa: {
    width: 32,
    height: 32,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(215,25,32,0.08)",
  },

  infoIcone: {
    width: 16,
    height: 16,
  },

  infoTextoCol: {
    flex: 1,
    minWidth: 0,
  },

  infoLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.cinza,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  infoValue: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.preto,
    marginTop: 1,
  },

  /* AACJ ELIMINADA */

  eliminadaCard: {
    marginTop: 12,
    marginHorizontal: 20,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.vermelho,
    backgroundColor: cores.vermelho20,
  },

  eliminadaTopo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 12,
  },

  eliminadaEscudo: {
    width: 40,
    height: 40,
    opacity: 0.6,
  },

  eliminadaPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: cores.vermelho,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  eliminadaTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "800",
    color: cores.branco,
    marginTop: 3,
  },

  eliminadaMotivoBloco: {
    marginTop: 10,
  },

  eliminadaMotivo: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco,
  },

  eliminadaNome: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
  },

  eliminadaDetalhe: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
    marginTop: 2,
  },

  eliminadaRodape: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco80,
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.14)",
  },

  /* SEÇÕES */

  section: {
    marginHorizontal: 34,
    marginTop: 25,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 9,
  },

  /* PROGRESSO */

  progressHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 7,
  },

  progressRoundCol: {
    flexDirection: "row",
    alignItems: "center",
  },

  progressLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.branco,
  },

  progressValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
    marginLeft: 28,
  },

  progressPercent: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
  },

  progressTrack: {
    width: "100%",
    height: 9,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: cores.branco,
  },

  progressFill: {
    height: "100%",
    borderRadius: 5,
    backgroundColor: cores.vermelho,
  },

  nextPhaseText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
    marginTop: 9,
  },

  nextPhaseValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  /* CAMPEÃO */

  podio: {
    gap: 8,
  },

  podioLinha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  podioLinhaCampeao: {
    borderColor: "#E8B923",
    backgroundColor: "rgba(232,185,35,0.12)",
  },

  podioEscudo: {
    width: 36,
    height: 36,
  },

  podioRotulo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.branco70,
  },

  podioNome: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
  },

  /* ESTATÍSTICAS */

  statsLegenda: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.branco70,
    marginTop: -5,
    marginBottom: 8,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 5,
  },

  statCard: {
    width: "23.5%",
    minHeight: 39,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 3,
  },

  statValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "800",
    color: cores.branco,
    lineHeight: 15,
  },

  statLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.branco70,
    marginTop: 1,
  },

  /* PRÓXIMA PARTIDA */

  matchCard: {
    marginHorizontal: 24,
    marginTop: 19,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 11,
    borderRadius: 16,
    backgroundColor: cores.branco,
  },

  matchCardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.preto,
    marginBottom: 12,
  },

  matchContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  teamCol: {
    width: 78,
    alignItems: "center",
    justifyContent: "center",
  },

  teamLogo: {
    width: 48,
    height: 48,
  },

  teamName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 4,
  },

  matchCenter: {
    flex: 1,
    alignItems: "center",
  },

  matchDay: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    color: cores.preto,
  },

  matchTime: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 1,
  },

  matchLocation: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.cinza,
    marginTop: 1,
  },

  confirmedPill: {
    height: 20,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.verdeclaro,
    marginTop: 5,
  },

  confirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.verde,
  },

  matchDetailsButton: {
    alignSelf: "flex-end",
    marginTop: -2,
  },

  matchDetailsText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.apoio,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* CLASSIFICAÇÃO + RESULTADOS */

  tablesRow: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 20,
  },

  tableColumn: {
    flex: 1,
    minWidth: 0,
    paddingRight: 10,
  },

  tableColumnRight: {
    borderLeftWidth: 1,
    borderLeftColor: "rgba(255,255,255,0.20)",
    paddingLeft: 10,
  },

  tableHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.22)",
    paddingBottom: 5,
  },

  tableTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  tableLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    color: cores.vermelho,
  },

  tableRows: {
    paddingTop: 4,
  },

  classificationRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 25,
  },

  position: {
    width: 11,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  teamDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#D9D9D9",
    marginRight: 5,
  },

  statusPillEmBreve: {
    backgroundColor: cores.azulclaro,
  },

  statusPillTextEmBreve: {
    color: "#1F5FAD",
  },

  // Selo "Encerrado" no card branco de informações
  statusPillEncerrado: {
    backgroundColor: "#EEEEEE",
  },

  statusPillTextEncerrado: {
    color: cores.cinza,
  },

  // Linha da AACJ na tabela (da_aacj)
  teamDotAacj: {
    backgroundColor: cores.vermelho,
  },

  textoAacj: {
    color: cores.vermelho,
  },

  grupoNome: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.pequeno,
    fontWeight: "600",
    color: cores.branco70,
    marginBottom: 4,
    textTransform: "capitalize",
  },

  descricao: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
    marginHorizontal: 24,
    marginTop: 12,
    lineHeight: 18,
  },

  classificationTeam: {
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  points: {
    width: 20,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  // Mini placar de cada resultado: um time por linha, com os gols à direita
  resultBloco: {
    paddingVertical: 5,
    rowGap: 2,
  },

  resultBlocoDivisor: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.10)",
  },

  resultLinhaTime: {
    flexDirection: "row",
    alignItems: "flex-start",
    columnGap: 6,
  },

  // Sem numberOfLines: nome comprido quebra a linha em vez de virar "..."
  resultTeams: {
    flex: 1,
    minWidth: 0,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  resultScore: {
    flexShrink: 0,
    minWidth: 12,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  // Quem perdeu fica mais apagado
  resultPerdedor: {
    color: cores.branco70,
    fontFamily: fontes.OpenSans_Regular,
    fontWeight: "400",
  },

  resultRodape: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: 6,
    rowGap: 3,
    marginTop: 2,
  },

  resultExtras: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.branco70,
  },

  resultWin: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.verde,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultWinText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.verde,
  },

  resultDraw: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultDrawText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.branco70,
  },

  resultLoss: {
    marginLeft: "auto",
    flexShrink: 0,
    borderWidth: 1,
    borderColor: cores.laranja,
    borderRadius: 10,
    paddingHorizontal: 6,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
  },

  resultLossText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.minusculo,
    color: cores.laranja,
  },

  /* PRÓXIMAS PARTIDAS */

  upcomingSection: {
    marginHorizontal: 24,
    marginTop: 18,
  },

  upcomingVazio: {
    marginTop: 6,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.branco70,
  },

  upcomingHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.18)",
  },

  upcomingHeaderText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.legenda,
    color: cores.branco70,
  },

  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 24,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.12)",
  },

  upcomingDate: {
    width: 31,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },

  upcomingGame: {
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
    marginLeft: 5,
  },

  upcomingTime: {
    width: 38,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.legenda,
    fontWeight: "700",
    color: cores.branco,
  },
});

export default campeonatoDetalheStyle;
