import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const conquistasStyle = StyleSheet.create({
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

  conquistasSection: {
    paddingHorizontal: 20,
    marginTop: 22,
  },
  conquistasTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 14,
  },
  conquistasRow: {
    flexDirection: "row",
    gap: 10,
  },
  conquistaCard: {
    backgroundColor: cores.branco,
    borderRadius: 16,
    paddingHorizontal: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  conquistaIcone: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  conquistaValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "800",
    color: cores.preto,
    textAlign: "center",
  },
  conquistaLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.preto,
    textAlign: "center",
    marginTop: 2,
  },

  proximasSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  proximasTitulo: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 14,
  },
  proximasRow: {
    flexDirection: "row",
    gap: 10,
  },
  proximaCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    padding: 16,
  },
  proximaHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  proximaIcone: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  proximaTextCol: {
    flex: 1,
  },
  proximaValor: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.preto,
  },
  proximaLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.preto,
  },
  proximaPercentual: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "800",
    color: cores.preto,
  },
  proximaBarraTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
    marginTop: 12,
  },
  proximaBarraPreenchimento: {
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.vermelho,
  },
});

export default conquistasStyle;
