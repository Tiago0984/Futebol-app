import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const loginResponsavelStyle = StyleSheet.create({
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
    paddingBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 25,
    fontWeight: "bold",
    color: variaveis.branco,
    letterSpacing: 2.5,
  },
  subtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: variaveis.cinza,
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.vermelho,
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 30,
    marginTop: 20,
  },
  badgeIcon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
  badgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "bold",
    color: variaveis.branco,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.branco,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: variaveis.preto,
    height: "100%",
    ...({ outlineStyle: "none" } as any)
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },

  forgotPasswordText: {
    fontFamily: fontes.OpenSans_SemiBold,
    alignSelf: "flex-end",
    fontSize: 12.5,
    fontWeight: "600",
    color: variaveis.vermelho,
    marginBottom: 16,
    textDecorationLine: 'underline',
  },

  enterButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  enterButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
    letterSpacing: 1.5,
  },

  inviteCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: variaveis.cinza,
    borderRadius: 14,
    padding: 14,
  },
  inviteChevron: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 22,
    fontWeight: "600",
    color: variaveis.cinza,
    marginRight: 10,
  },
  inviteIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
  },
  inviteTextCol: {
    flex: 1,
  },
  inviteTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: variaveis.branco,
    marginBottom: 4,
  },
  inviteDescription: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    lineHeight: 17,
    color: variaveis.cinza,
  },
});

export default loginResponsavelStyle;
