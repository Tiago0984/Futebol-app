import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const botaoNotificacoesStyle = StyleSheet.create({
  button: {
    position: "relative",
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -6,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  badgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },
});

export default botaoNotificacoesStyle;
