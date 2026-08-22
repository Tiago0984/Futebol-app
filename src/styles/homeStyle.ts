import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

const homeStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontSize: 14,
    color: "#B0B0B0",
  },
  greetingName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 2,
  },
  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconButton: {
    marginLeft: 16,
  },
  headerIcon: {
    width: 22,
    height: 22,
  },
  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    backgroundColor: "#D71920",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },
  headerInfoCol: {
    flex: 1,
  },
  categoriaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoriaIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  categoriaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  centroTexto: {
    fontSize: 14,
    color: "#B0B0B0",
    marginTop: 10,
  },
  centroDestaqueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  centroLine: {
    width: 18,
    height: 2,
    backgroundColor: "#D71920",
  },
  centroDestaqueText: {
    fontSize: 14,
    color: "#B0B0B0",
    marginHorizontal: 8,
  },
  avatarCircle: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    width: 30,
    height: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 22,
    padding: 18,
  },
  cardLabel: {
    fontSize: 12,
    color: "#8D8D8D",
    marginBottom: 12,
  },
  cardMainRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 34,
    height: 34,
    marginRight: 14,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 6,
  },
  cardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  cardInfoIcon: {
    width: 13,
    height: 13,
    marginRight: 6,
  },
  cardInfoText: {
    fontSize: 12.5,
    color: "#777777",
  },
  cardInfoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D71920",
    marginHorizontal: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#EAEAEA",
    marginVertical: 14,
  },
  cardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  confirmedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDFFEE",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
  },
  confirmedIcon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  confirmedText: {
    fontSize: 12,
    fontWeight: "700",
    color: variaveis.verde,
  },
  detailsLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D71920",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#D71920",
  },

  quickAccessSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  quickAccessRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  quickAccessItem: {
    alignItems: "center",
    width: 74,
  },
  quickAccessIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  quickAccessIcon: {
    width: 26,
    height: 26,
  },
  quickAccessLabel: {
    fontSize: 12,
    color: "#B0B0B0",
    marginTop: 8,
    textAlign: "center",
  },

  activitiesSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  activitiesHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityItem: {
    marginTop: 18,
  },
  activityDate: {
    fontSize: 12.5,
    fontWeight: "700",
    color: "#D71920",
    marginBottom: 6,
  },
  activityRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  activityTextCol: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  activitySubtitle: {
    fontSize: 12.5,
    color: "#8D8D8D",
    marginTop: 2,
  },
  activityTime: {
    fontSize: 13,
    color: "#B0B0B0",
  },
  activityDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: 16,
  },

  tabBar: {
    flexDirection: "row",
    backgroundColor: "#0A0A0A",
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingBottom: 22,
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
    backgroundColor: "#D71920",
  },
  tabIcon: {
    width: 22,
    height: 22,
  },
  tabLabel: {
    fontSize: 11,
    color: "#ffffff",
    marginTop: 4,
  },
  tabLabelActive: {
    fontSize: 11,
    fontWeight: "700",
    color: "#D71920",
    marginTop: 4,
  },
});

export default homeStyle;
