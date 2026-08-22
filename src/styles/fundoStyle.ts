import { StyleSheet } from "react-native";

const fundoStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
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
