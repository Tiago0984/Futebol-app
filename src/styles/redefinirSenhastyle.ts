import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

const redefinirSenhaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variaveis.preto,
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
    fontSize: 25,
    fontWeight: "bold",
    color: variaveis.branco,
    letterSpacing: 2.5,
  },
  subtitle: {
    fontSize: 12,
    color: variaveis.cinza,
    fontWeight: "bold",
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
    fontSize: 12,
    fontWeight: "bold",
    color: variaveis.branco,
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
  
  requirementsCard: {
    borderWidth: 1,
    borderColor: variaveis.cinza,
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  requirementsTitle: {
    fontSize: 13.5,
    fontWeight: "700",
    color: variaveis.branco,
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
    fontSize: 12.5,
    color: variaveis.cinza,
  },

  saveButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 10,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: variaveis.branco,
    letterSpacing: 1.5,
  },

  backToLoginText: {
    alignSelf: "center",
    fontSize: 13.5,
    fontWeight: "700",
    color: variaveis.vermelho,
  },
});

export default redefinirSenhaStyle;
