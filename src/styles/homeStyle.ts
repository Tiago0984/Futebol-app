import { StyleSheet } from "react-native";

import { fontes, variaveis } from "./variaveis";

const homeStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greeting: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 20,
    color: variaveis.cinza,
  },
  greetingName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 30,
    fontWeight: "800",
    color: variaveis.branco,
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
    backgroundColor: variaveis.vermelho,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 10,
    fontWeight: "700",
    color: variaveis.branco,
  },

  headerBottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerInfoCol: {
    flex: 1,
  },
  categoriaRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoriaIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  categoriaText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.branco,
  },
  centroTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    color: variaveis.branco,
    marginTop: 10,
  },
  centroDestaqueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  centroLine: {
    width: 30,
    height: 1,
    backgroundColor: variaveis.vermelho,
  },
  centroDestaqueText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    color: variaveis.branco,
    marginHorizontal: 6,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: variaveis.branco,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarIcon: {
    width: 50,
    height: 50,
  },

  card: {
    backgroundColor: variaveis.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 30,
    padding: 18,
  },
  cardLabel: {
    fontFamily: fontes.OpenSans_Bold, 
    fontSize: 12,
    color: variaveis.cinza,
    marginBottom: 12,
  },
  cardMainRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginRight: 14,
  },
  cardTextCol: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "800",
    color: variaveis.preto,
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
    marginRight: 5,
  },
  cardInfoText: {
    fontFamily: fontes.OpenSans_Regular, 
    fontSize: 12,
    color: variaveis.cinza,
  },
  cardInfoDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: variaveis.vermelho,
    marginHorizontal: 8,
  },
  cardDivider: {
    height: 1,
    backgroundColor: variaveis.cinza,
    opacity: 0.5,
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
    backgroundColor: variaveis.verdeclaro,
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
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    fontWeight: "700",
    color: variaveis.verde,
  },
  detailsLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.vermelho,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
  },
  sectionLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.vermelho,
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
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: variaveis.cinza,
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
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12.5,
    fontWeight: "700",
    color: variaveis.vermelho,
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
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.branco,
  },
  activitySubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12.5,
    color: variaveis.cinza,
    marginTop: 2,
  },
  activityTime: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: variaveis.cinza,
  },
  activityDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginTop: 16,
  },
});

export default homeStyle;
