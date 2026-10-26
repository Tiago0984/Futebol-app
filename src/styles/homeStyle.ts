import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const homeStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  greeting: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.tituloHeader,
    color: cores.cinza,
  },

  greetingName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.numeroGrande,
    fontWeight: "800",
    color: cores.branco,
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

  headerBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  headerInfoCol: {
    flex: 1,
  },

  categoriaRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  categoriaIcon: {
    width: iconSizes.padrao,
    height: iconSizes.padrao,
    marginRight: 5,
  },

  categoriaText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
  },

  centroTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 10,
  },

  centroDestaqueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  centroLine: {
    width: 30,
    height: 1,
    backgroundColor: cores.vermelho,
  },

  centroDestaqueText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
    marginHorizontal: 6,
  },

  avatarCircle: {
    width: iconSizes.avatarGrande,
    height: iconSizes.avatarGrande,
    borderRadius: 50,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarIcon: {
    width: iconSizes.avatar,
    height: iconSizes.avatar,
  },

  // Foto do atleta vinda da API, ocupando o círculo inteiro
  avatarFoto: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },

  /* =========================
     BANNER
  ========================= */

  // O carrossel tem a moldura (cantos arredondados); cada slide ocupa a largura dele
  carrossel: {
    height: 165,
    marginHorizontal: 20,
    marginTop: 26,
    borderRadius: 18,
    overflow: "hidden",
  },

  bannerSlide: {
    height: 165,
    overflow: "hidden",
    position: "relative",
  },

  carrosselPontos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 6,
    marginTop: 10,
  },

  carrosselPonto: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  carrosselPontoAtivo: {
    width: 18,
    backgroundColor: cores.vermelho,
  },

  // Campeonato do atleta: tipo e situação, escudo com nome e convocação, datas
  campeonatoTopo: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },

  campeonatoSituacao: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.pequeno,
    fontWeight: "600",
    color: cores.branco70,
    flexShrink: 1,
  },

  campeonatoMeio: {
    flexDirection: "row",
    alignItems: "center",
  },

  campeonatoLogoBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  campeonatoLogo: {
    width: 42,
    height: 42,
  },

  campeonatoTextoCol: {
    flex: 1,
  },

  campeonatoNome: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "800",
    color: cores.branco,
  },

  campeonatoConvocacao: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 3,
  },

  campeonatoCategorias: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.pequeno,
    fontWeight: "600",
    color: cores.branco70,
    marginTop: 3,
  },

  // Banner do painel: foto com título e subtítulo embaixo
  bannerGeralOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  bannerGeralConteudo: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  bannerGeralSubtitulo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco,
    marginTop: 4,
  },

  bannerImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },

  bannerOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.38)",
  },

  bannerContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "space-between",
  },

  bannerTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    backgroundColor: cores.vermelho,
  },

  bannerTagText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  bannerTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.branco,
    marginTop: 4,
  },

  bannerSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
    marginTop: 1,
  },

  bannerMatchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  bannerTeam: {
    flexDirection: "row",
    alignItems: "center",
    // Nomes longos de time encolhem em vez de estourar o banner
    flexShrink: 1,
  },

  bannerTeamIcon: {
    width: iconSizes.minusculo,
    height: iconSizes.minusculo,
    marginRight: 5,
  },

  bannerTeamText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
    flexShrink: 1,
  },

  bannerVersus: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco70,
    marginHorizontal: 9,
  },

  bannerOpponent: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
    flexShrink: 1,
  },

  bannerFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 5,
  },

  bannerDate: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.pequeno,
    fontWeight: "600",
    color: cores.branco,
  },

  bannerLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* =========================
     ESTATÍSTICAS — HOME
  ========================= */

  statsSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },

  statsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },

  sectionLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.vermelho,
  },

  statsSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  statSummaryItem: {
    flex: 1,
    minHeight: 92,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    borderRadius: 18,
    backgroundColor: "rgba(17,17,17,0.48)",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },

  statSummaryIcon: {
    width: iconSizes.estatistica,
    height: iconSizes.estatistica,
    marginBottom: 5,
  },

  statSummaryValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },

  statSummaryLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.cinza,
    marginTop: 2,
  },

  /* =========================
     PRÓXIMAS ATIVIDADES
  ========================= */

  activitiesSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },

  activitiesHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activityItem: {
    marginTop: 18,
  },

  activityDate: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.vermelho,
    marginBottom: 6,
  },

  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activityTextCol: {
    flex: 1,
  },

  activityTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.branco,
  },

  activitySubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.cinza,
    marginTop: 2,
  },

  activityTime: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.cinza,
  },

  activityDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: 16,
  },

  /* =========================
     MODAL / BOTTOM SHEET
  ========================= */

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.62)",
  },

  bottomSheet: {
    maxHeight: "82%",
    paddingHorizontal: 20,
    paddingTop: 9,
    paddingBottom: 28,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: cores.preto,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },

  sheetHandle: {
    alignSelf: "center",
    width: 38,
    height: 4,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
    marginBottom: 14,
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sheetTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "700",
    color: cores.branco,
  },

  sheetCloseButton: {
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
    alignItems: "center",
    justifyContent: "center",
  },

  sheetCloseText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.tituloSecao,
    color: cores.branco70,
  },

  filterRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 18,
  },

  filterButton: {
    flex: 1,
    height: 34,
    borderRadius: 18,
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  filterButtonActive: {
    backgroundColor: cores.vermelho,
    borderColor: cores.vermelho,
  },

  filterButtonText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.branco70,
  },

  filterButtonTextActive: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontWeight: "600",
    color: cores.branco,
  },

  statsModalTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 20,
    marginBottom: 10,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48.5%",
    minHeight: 62,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  // Card único (Total: só os gols) ocupa a linha inteira
  statCardFull: {
    width: "100%",
  },

  statCardIcon: {
    width: iconSizes.estatistica,
    height: iconSizes.estatistica,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  statIconImage: {
    width: iconSizes.estatistica,
    height: iconSizes.estatistica,
  },

  statCardText: {
    flex: 1,
  },

  statCardLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
  },

  statCardValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },

  cardColorIcon: {
    width: 13,
    height: 18,
    borderRadius: 2,
  },

  yellowCardIcon: {
    backgroundColor: "#F4C400",
  },

  redCardIcon: {
    backgroundColor: cores.vermelho,
  },

  goalkeeperIcon: {
    fontSize: fontSizes.titulo,
  },
});

export default homeStyle;
