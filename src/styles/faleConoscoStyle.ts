import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes } from "./variaveis";

const faleConoscoStyle = StyleSheet.create({
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
    minHeight: 76,
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

  /* FORMULÁRIO */

  inputIcon: {
    width: 20,
    height: 20,
  },

  formCard: {
    marginHorizontal: 24,
    marginTop: 0,
    paddingHorizontal: 10,
    paddingTop: 19,
    paddingBottom: 20,
    borderRadius: 15,
    backgroundColor: cores.branco,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 52,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    borderRadius: 11,
    paddingHorizontal: 18,
  },

  assuntoInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    marginLeft: 15,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.preto,
    ...({ outlineStyle: "none" } as any),
  },

  /* MENSAGEM */

  messageWrapper: {
    height: 200,
    alignItems: "flex-start",
    marginTop: 10,
    paddingTop: 12,
  },

  messageInput: {
    flex: 1,
    height: "100%",
    paddingTop: 0,
    paddingRight: 4,
    marginLeft: 15,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.preto,
    ...({ outlineStyle: "none" } as any),
  },

  /* BOTÃO */

  sendButton: {
    height: 30,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  sendButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.branco,
  },

  /* ATENDIMENTO */

  attendanceSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginHorizontal: 34,
    marginTop: 40,
  },

  attendanceContent: {
    flex: 1,
  },

  attendanceTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
  },

  attendanceBlock: {
    marginTop: 19,
  },

  attendanceLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.cinza,
  },

  attendanceValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.cinza,
    marginTop: 1,
  },

  aacjLogo: {
    width: 100,
    height: 100,
    marginTop: 51,
    marginLeft: 10,
  },
});

export default faleConoscoStyle;
