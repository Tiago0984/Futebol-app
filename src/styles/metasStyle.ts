import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const metasStyle = StyleSheet.create({
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

  resumoSection: {
    paddingHorizontal: 20,
    marginTop: 22,
  },
  resumoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resumoIcone: {
    width: 30,
    height: 30,
    marginRight: 14,
  },
  resumoTextCol: {
    flex: 1,
  },
  resumoTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.branco,
  },
  resumoSubtitulo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.branco70,
    marginTop: 4,
  },

  listSection: {
    paddingHorizontal: 20,
    marginTop: 18,
  },
  listDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  metaItem: {
    paddingVertical: 16,
  },
  metaHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaIcone: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  metaTitulo: {
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "700",
    color: cores.branco,
  },
  metaPill: {
    paddingHorizontal: 10,
    height: 22,
    borderRadius: 11,
    backgroundColor: cores.verdeclaro,
    justifyContent: "center",
    alignItems: "center",
  },
  metaPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.verde,
  },

  metaBarraRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 38,
  },
  metaContagem: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
    marginRight: 10,
  },
  metaBarraTrack: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },
  metaBarraPreenchimento: {
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.vermelho,
  },
  metaPercentual: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "800",
    color: cores.branco,
    marginLeft: 10,
  },

  metaValorGrande: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 26,
    fontWeight: "800",
    color: cores.branco,
    marginTop: 6,
    marginLeft: 38,
  },

  proximaMetaCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  proximaMetaIcone: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  proximaMetaTextCol: {
    flex: 1,
  },
  proximaMetaLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.preto,
  },
  proximaMetaValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.preto,
    marginTop: 2,
  },
  proximaMetaDetalhe: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 4,
  },
});

export default metasStyle;
