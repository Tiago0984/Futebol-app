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
    width: "100%",
    height: "100%",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default fundoStyle;
