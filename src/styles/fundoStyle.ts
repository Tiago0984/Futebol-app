import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

const fundoStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variaveis.preto,
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    // No React Native Web, position absolute + inset (top/left/right/bottom)
    // não força a Image a ocupar 100% do espaço como acontece nativamente —
    // sem isso, ela renderiza no tamanho intrínseco do arquivo (624x990).
    width: "100%",
    height: "100%",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default fundoStyle;
