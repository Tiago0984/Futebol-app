import { StyleSheet } from "react-native";

const loginResponsavelStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
  },
  scrollContent: {
    flexGrow: 1,
  },

  hero: {
    width: "100%",
    height: 270,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(10,10,10,0.6)",
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
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#B0B0B0",
    marginTop: 4,
    marginBottom: 12,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D71920",
    borderRadius: 30,
    paddingHorizontal: 16,
    height: 34,
  },
  badgeIcon: {
    width: 15,
    height: 15,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    height: 50,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: "#111111",
    height: "100%",
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },

  forgotPasswordText: {
    alignSelf: "flex-end",
    fontSize: 12.5,
    fontWeight: "600",
    color: "#D71920",
    marginBottom: 16,
  },

  enterButton: {
    backgroundColor: "#D71920",
    borderRadius: 30,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  enterButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.3,
  },

  inviteCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 14,
    padding: 14,
  },
  inviteChevron: {
    fontSize: 22,
    fontWeight: "600",
    color: "#555555",
    marginRight: 10,
  },
  inviteIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
  },
  inviteTextCol: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  inviteDescription: {
    fontSize: 12,
    lineHeight: 17,
    color: "#8D8D8D",
  },
});

export default loginResponsavelStyle;
