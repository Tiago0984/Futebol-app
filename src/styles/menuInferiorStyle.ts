import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const menuInferiorStyle = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: variaveis.preto,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingBottom: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabIndicator: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginBottom: 8,
  },
  tabIndicatorActive: {
    backgroundColor: variaveis.vermelho,
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: variaveis.branco,
    marginTop: 4,
  },
  tabLabelActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: variaveis.vermelho,
    marginTop: 4,
  },
});

export default menuInferiorStyle;
