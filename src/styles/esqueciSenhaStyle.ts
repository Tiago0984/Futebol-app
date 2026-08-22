import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

const esqueciSenhaStyle = StyleSheet.create({
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

  sendButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  sendButtonText: {
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
    marginBottom: 18,
  },

  noticeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: variaveis.cinza,
    borderRadius: 14,
    padding: 14,
  },
  noticeIcon: {
    width: 35,
    height: 35,
    marginRight: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 17,
    color: variaveis.cinza,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  modalCard: {
    width: "100%",
    backgroundColor: variaveis.branco,
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: variaveis.preto,
    marginBottom: 12,
  },
  modalText: {
    fontSize: 13.5,
    lineHeight: 19,
    color: variaveis.cinza,
    marginBottom: 14,
  },
  modalValidity: {
    fontSize: 13,
    fontWeight: "600",
    color: variaveis.preto,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: variaveis.vermelho,
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
    letterSpacing: 0.3,
  },
});

export default esqueciSenhaStyle;
