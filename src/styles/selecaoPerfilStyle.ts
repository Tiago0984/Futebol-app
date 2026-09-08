import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const selecaoPerfilStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variaveis.preto,
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
  },

  backgroundImage: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFill,
  },
  heroContent: {
    alignItems: "center",
    paddingTop: 64,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 14,
  },
  kicker: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
    color: variaveis.branco,
  },
  kickerBold: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: variaveis.branco,
    letterSpacing: 1,
    marginTop: 2,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  dividerLine: {
    width: 50,
    height: 1,
    backgroundColor: variaveis.vermelho,
  },
  dividerText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "bold",
    color: variaveis.vermelho,
    letterSpacing: 1,
    marginHorizontal: 8,
  },
  welcomeTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 25,
    fontWeight: "bold",
    color: variaveis.branco,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    color: variaveis.cinza,
    fontWeight: "bold",
    letterSpacing: 0.5
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  chooseProfile: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "bold",
    color: variaveis.branco,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: variaveis.branco,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardIcon: {
    width: 70,
    height: 70,
    marginRight: 14,
    marginTop: 2,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 16,
    fontWeight: "bold",
    color: variaveis.preto,
    marginBottom: 5,
  },
  cardDescription: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    lineHeight: 18,
    color: variaveis.cinza,
  },
  cardButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 14,
    height: 46,
    justifyContent: "center",
    position: "relative",
  },
  cardButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 10,
    fontWeight: "bold",
    color: variaveis.branco,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  cardButtonArrow: {
    fontFamily: fontes.OpenSans_Bold,
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: variaveis.branco,
    lineHeight: 46,
  },

  firstAccessRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  firstAccessLine: {
    flex: 1,
    height: 1,
    backgroundColor: variaveis.cinza,
  },
  firstAccessText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: variaveis.cinza,
    marginHorizontal: 10,
  },

  footerLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 13,
    fontWeight: "600",
    color: variaveis.vermelho,
  },
  footerDot: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: variaveis.branco,
    marginHorizontal: 30,
  },
});

export default selecaoPerfilStyle;
