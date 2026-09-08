import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const preloaderStyle = StyleSheet.create({
  container: {
    flex: 1,

    width: "100%",
    maxWidth: 440,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#111111",
  },

  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 135,
    height: 135,
  },

  titulo: {
    marginTop: 20,

    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "bold",

    color: variaveis.branco,

    textAlign: "center",

    letterSpacing: 3,
  },

  subtitulo: {
    marginTop: 4,

    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "bold",

    color: variaveis.branco,

    textAlign: "center",

    letterSpacing: 3,
  },

  progressContainer: {
    width: 150,
    height: 2,

    marginTop: 32,

    overflow: "hidden",

    backgroundColor: "#3A3A3A",
  },

  progressBar: {
    height: "100%",

    backgroundColor: variaveis.vermelho,
  },

  footer: {
    position: "absolute",

    bottom: 45,

    alignItems: "center",
  },

  footerText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,

    fontWeight: "bold",

    color: variaveis.cinza,

    letterSpacing: 3,
  },
});

export default preloaderStyle;