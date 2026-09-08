import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const redefinirSenhaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.preto,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
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
    color: cores.branco,
    letterSpacing: 2.5,
  },
  subtitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    color: cores.cinza,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.vermelho,
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
    fontSize: 12,
    fontWeight: "bold",
    color: cores.branco,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 50,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
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
    color: cores.preto,
    height: "100%",
    ...({ outlineStyle: "none" } as any)
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },
  
  requirementsCard: {
    borderWidth: 1,
    borderColor: cores.cinza,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13.5,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 10,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  requirementIcon: {
    width: 14,
    height: 14,
    marginRight: 10,
  },
  requirementText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12.5,
    color: cores.cinza,
  },

  saveButton: {
    backgroundColor: cores.vermelho,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  saveButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "bold",
    color: cores.branco,
    letterSpacing: 1.5,
  },

  backToLoginText: {
    fontFamily: fontes.OpenSans_Bold,
    alignSelf: "center",
    fontSize: 13.5,
    fontWeight: "700",
    color: cores.vermelho,
  },
});

export default redefinirSenhaStyle;
