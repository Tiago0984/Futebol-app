import { StyleSheet } from "react-native";
import { cores, fontes, fontSizes } from "./variaveis";

const sobreAACJStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 105,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 82,
    paddingHorizontal: 24,
    paddingTop: 18,
  },

  backButton: {
    width: 90,
    paddingVertical: 5,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.branco,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "700",
    color: cores.branco,
  },

  headerSpacer: {
    width: 90,
  },

  aboutContent: {
    alignItems: "center",
    paddingHorizontal: 34,
  },

  logo: {
    width: 150,
    height: 150,
    marginTop: 17,
  },

  acronym: {
    marginTop: 15,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 40,
    fontWeight: "800",
    color: cores.branco,
  },

  institutionName: {
    marginTop: 4,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.branco,
    textAlign: "center",
  },

  description: {
    marginTop: 21,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    lineHeight: 20,
    color: cores.branco,
    textAlign: "center",
  },

  infoList: {
    width: "100%",
    marginTop: 35,
  },

  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 42,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },

  infoItem: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },

  infoQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 50,
  },

  infoQuestion: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.branco,
  },

  versionText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.cinza,
  },

  infoArrow: {
    width: 20,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "700",
    color: cores.branco70,
  },

  infoArrowOpen: {
    color: cores.vermelho,
  },

  infoAnswerContainer: {
    overflow: "hidden",
  },

  infoAnswer: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.apoio,
    lineHeight: 15,
    color: cores.branco70,
    paddingBottom: 13,
    paddingRight: 20,
  },

  copyright: {
    marginTop: 103,
    marginBottom: 5,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.cinza,
    textAlign: "center",
  },
});

export default sobreAACJStyle;