import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const esqueciSenhaStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.preto,
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
    paddingHorizontal: 32,
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
    textAlign: "center",
    letterSpacing: 2.5,
  },
  subtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.cinza,
    textAlign: "center",
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
    marginRight: 8,
  },
  badgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.branco,
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
    backgroundColor: cores.branco,
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
    height: "100%",
    ...({ outlineStyle: "none" } as any)
  },
  sendButton: {
    backgroundColor: cores.vermelho,
    borderRadius: 10,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 25,
  },
  sendButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
    letterSpacing: 0.3,
  },

  backToLoginText: {
    fontFamily: fontes.OpenSans_Bold,
    alignSelf: "center",
    fontSize: 13.5,
    fontWeight: "700",
    color: cores.vermelho,
    marginBottom: 18,
  },

  noticeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: cores.cinza,
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
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    lineHeight: 17,
    color: cores.cinza,
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
    backgroundColor: cores.branco,
    borderRadius: 16,
    padding: 22,
  },
  modalTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.preto,
    marginBottom: 12,
  },
  modalText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13.5,
    lineHeight: 19,
    color: cores.cinza,
    marginBottom: 14,
  },
  modalValidity: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 13,
    fontWeight: "600",
    color: cores.preto,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: cores.vermelho,
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
    letterSpacing: 0.3,
  },
});

export default esqueciSenhaStyle;
