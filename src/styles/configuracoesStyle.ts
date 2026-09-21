import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const configuracoesStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
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

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "800",
    color: cores.branco,
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



  /* SEÇÕES */

  section: {
    paddingHorizontal: 20,
    marginTop: 22,
  },

  sectionCompact: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "800",
    color: cores.branco,
    marginBottom: 10,
  },

  card: {
    borderRadius: 14,
    backgroundColor: cores.branco,
    paddingHorizontal: 14,
    overflow: "hidden",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },

  rowLast: {
    borderBottomWidth: 0,
  },

  rowIcon: {
    width: 30,
    height: 30,
    marginRight: 14,
  },

  rowLabel: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
  },

  rowValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.cinza,
    marginRight: 6,
  },

  rowArrow: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 18,
    color: cores.cinza,
  },

  /* SAIR DA CONTA */

  logoutSection: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },

  logoutButton: {
    width: 200,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
    backgroundColor: cores.branco,
  },

  logoutIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },

  logoutText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.vermelho,
  },
});

export default configuracoesStyle;
