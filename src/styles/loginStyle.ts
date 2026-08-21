import { StyleSheet } from "react-native";

const loginStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContent: {
    flexGrow: 1,
  },

  hero: {
    width: "100%",
    height: 330,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,10,10,0.55)",
  },
  heroContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 14,
  },
  kicker: {
    fontSize: 12,
    letterSpacing: 2,
    fontWeight: "600",
    color: "#DDDDDD",
  },
  kickerBold: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginTop: 2,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  dividerLine: {
    width: 22,
    height: 1,
    backgroundColor: "#D71920",
  },
  dividerText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D71920",
    letterSpacing: 1,
    marginHorizontal: 8,
  },
  welcomeTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  welcomeSubtitle: {
    fontSize: 12,
    color: "#B0B0B0",
    marginTop: 4,
  },

  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 22,
    paddingBottom: 28,
  },
  chooseProfile: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginRight: 14,
    marginTop: 2,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 12.5,
    lineHeight: 18,
    color: "#888888",
  },
  cardButton: {
    backgroundColor: "#D71920",
    borderRadius: 30,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cardButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },
  cardButtonArrow: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
    marginLeft: 8,
  },

  firstAccessRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
  },
  firstAccessLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#333333",
  },
  firstAccessText: {
    fontSize: 12,
    color: "#8D8D8D",
    marginHorizontal: 10,
  },

  footerLinksRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  footerLink: {
    fontSize: 13,
    fontWeight: "600",
    color: "#D71920",
  },
  footerDot: {
    fontSize: 13,
    color: "#ffffff",
    marginHorizontal: 30,
  },
});

export default loginStyle;
