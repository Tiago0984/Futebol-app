import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variaveis.preto,
  },
  scrollContent: {
    flexGrow: 1,
  },

  hero: {
    width: "100%",
    height: 330,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,10,10,0.55)",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 14,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
    color: variaveis.branco,
  },
  kickerBold: {
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
    width: 22,
    height: 1,
    backgroundColor: variaveis.vermelho,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "700",
    color: variaveis.vermelho,
    letterSpacing: 1,
    marginHorizontal: 8,
  },
  welcomeTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: variaveis.branco,
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: variaveis.cinza,
    marginTop: 4,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 28,
  },
  chooseProfile: {
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
    textAlign: "center",
    marginBottom: 16,
  },

  card: {
    backgroundColor: variaveis.branco,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginRight: 14,
    marginTop: 2,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: variaveis.preto,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: variaveis.cinza,
  },
  cardButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 30,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: variaveis.branco,
    letterSpacing: 0.3,
  },
  cardButtonArrow: {
    fontSize: 16,
    fontWeight: "700",
    color: variaveis.branco,
    marginLeft: 8,
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
    fontSize: 13,
    fontWeight: "600",
    color: variaveis.vermelho,
  },
  footerDot: {
    fontSize: 13,
    color: variaveis.branco,
    marginHorizontal: 30,
  },
});

export default loginStyle;
