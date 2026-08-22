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
    transform: [{ translateX: -70 }, { translateY: -75 }, { scale: 0.7 }],
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default fundoStyle;
