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

  hero: {
    width: "100%",
    height: 270,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,10,10,0.6)",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: variaveis.branco,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: variaveis.cinza,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.vermelho,
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 34,
  },
  badgeIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
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
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: variaveis.preto,
    height: "100%",
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
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
    letterSpacing: 0.3,
  },

  backToLoginText: {
    alignSelf: "center",
    fontSize: 13.5,
    fontWeight: "700",
    color: variaveis.vermelho,
  },
});

export default redefinirSenhaStyle;
