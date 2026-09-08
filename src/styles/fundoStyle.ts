import { StyleSheet } from "react-native";

import { cores } from "./variaveis";

const fundoStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.preto,
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    width: "100%",
    height: "100%",
    maxWidth: "100%",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default fundoStyle;
