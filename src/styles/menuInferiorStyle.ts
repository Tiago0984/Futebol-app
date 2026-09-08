import { Dimensions, StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BASE_WIDTH = 428;
const WIDTH_RATIO = Math.min(1, SCREEN_WIDTH / BASE_WIDTH);
const scale = (size: number, min = 0.72) =>
  Math.round(size * Math.max(min, WIDTH_RATIO) * 10) / 10;

export const TAB_BAR_BASE_PADDING_BOTTOM = 10;

const menuInferiorStyle = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: cores.preto,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM,
  },
  tabItem: {
    flex: 1,
    minWidth: 0,
    alignItems: "center",
    paddingHorizontal: scale(4, 0.5),
  },
  tabIndicator: {
    width: scale(30, 0.6),
    height: 3,
    borderRadius: 2,
    backgroundColor: "transparent",
    marginBottom: 8,
  },
  tabIndicatorActive: {
    backgroundColor: cores.vermelho,
  },
  tabIcon: {
    width: scale(22, 0.7),
    height: scale(22, 0.7),
  },
  tabLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: scale(11, 0.68),
    color: cores.branco,
    marginTop: 4,
  },
  tabLabelActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: scale(11, 0.68),
    fontWeight: "700",
    color: cores.vermelho,
    marginTop: 4,
  },
});

export default menuInferiorStyle;
