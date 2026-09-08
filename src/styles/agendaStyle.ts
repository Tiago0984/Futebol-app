import { StyleSheet } from "react-native";

import { fontes, cores } from "./variaveis";

const agendaStyle = StyleSheet.create({
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
  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 30,
    fontWeight: "800",
    color: cores.branco,
  },
  screenSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.cinza,
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
    backgroundColor: cores.vermelho,
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
    color: cores.branco,
  },

  monthNavRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
  },
  monthNavLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  monthChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "700",
    color: cores.cinza,
    paddingHorizontal: 6,
  },
  monthText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.branco,
    marginHorizontal: 6,
  },
  monthNavRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownChevron: {
    width: 12,
    height: 12,
    marginRight: 14,
    transform: [{ rotate: "90deg" }],
  },
  calendarButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  calendarButtonIcon: {
    width: 16,
    height: 16,
  },

  weekStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 18,
  },
  weekDayCol: {
    alignItems: "center",
  },
  weekDayLabel: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 11,
    fontWeight: "600",
    color: cores.branco,
    marginBottom: 8,
  },
  weekDayCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: cores.branco30,
    alignItems: "center",
    justifyContent: "center",
  },
  weekDayCircleActive: {
    backgroundColor: cores.vermelho,
  },
  weekDayNumber: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.preto,
  },
  weekDayNumberActive: {
    color: cores.branco,
  },
  weekDayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: cores.vermelho,
    marginTop: 6,
  },

  todayCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
  },
  todayCardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  todayCardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  todayIcon: {
    width: 30,
    height: 30,
    marginRight: 12,
  },
  todayLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "800",
    color: cores.vermelho,
  },
  todaySubLabel: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.preto,
    marginTop: 2,
  },
  todayCardRight: {
    alignItems: "flex-end",
  },
  todayCountText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "800",
    color: cores.preto,
  },
  todayNextText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.cinza,
    marginTop: 2,
  },
  todayPillsScroll: {
    marginTop: 14,
  },
  todayPillsRow: {
    flexDirection: "row",
    paddingRight: 4,
  },
  todayPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 26,
    marginRight: 8,
  },
  todayPillIcon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  todayPillText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 11.5,
    fontWeight: "600",
    color: cores.cinza,
  },

  filterScroll: {
    marginTop: 20,
  },
  filterRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    columnGap: 10,
  },
  filterPill: {
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: cores.branco70,
  },
  filterPillActive: {
    backgroundColor: cores.vermelho,
    borderColor: cores.vermelho,
  },
  filterPillText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
  },

  nextCard: {
    backgroundColor: cores.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 14,
  },
  nextCardLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.cinza,
    marginBottom: 12,
  },
  nextCardTopRow: {
    flexDirection: "row",
  },
  nextCardMainRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  nextCardIconSquare: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: cores.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  nextCardIcon: {
    width: 40,
    height: 40,
  },
  nextCardTextCol: {
    flex: 1,
    minWidth: 0,
  },
  nextCardTime: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "800",
    color: cores.vermelho,
    marginBottom: 4,
  },
  nextCardTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "800",
    color: cores.preto,
    marginBottom: 6,
  },
  nextCardInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  nextCardInfoIcon: {
    width: 13,
    height: 13,
    marginRight: 6,
  },
  nextCardInfoText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.cinza,
  },
  nextCardSide: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  nextConfirmedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 24,
  },
  nextConfirmedIcon: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
  nextConfirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
    color: cores.verde,
  },
  nextDetailsLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12.5,
    fontWeight: "700",
    color: cores.vermelho,
    marginTop: 10,
  },

  timelineConnector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 24,
  },
  timelineConnectorSpacer: {
    width: 36,
  },
  timelineConnectorRail: {
    width: 18,
    alignItems: "center",
    position: "relative",
  },
  timelineConnectorLine: {
    position: "absolute",
    top: 0,
    bottom: -18,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  timelineSection: {
    paddingHorizontal: 20,
  },
  timelineItem: {
    flexDirection: "row",
  },
  timelineTimeCol: {
    width: 36,
    marginTop: 14,
  },
  timelineTime: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    color: cores.branco,
  },
  timelineLineCol: {
    width: 18,
    alignItems: "center",
    position: "relative",
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 18,
  },
  timelineLine: {
    position: "absolute",
    top: 18,
    bottom: -18,
    width: 2,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  timelineIconSquare: {
    width: 40,
    height: 40,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    marginRight: 4,
  },
  timelineIcon: {
    width: 20,
    height: 20,
  },
  timelineTextCol: {
    flex: 1,
    minWidth: 0,
    paddingBottom: 22,
  },
  timelineTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 4,
  },
  timelineInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  timelineInfoIcon: {
    width: 11,
    height: 11,
    marginRight: 6,
  },
  timelineInfoText: {
    flexShrink: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 9.5,
    color: cores.cinza,
  },
  timelineStatusCol: {
    marginLeft: 4,
    marginTop: 10,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    paddingHorizontal: 5,
    height: 24,
    borderWidth: 1,
  },
  statusIconCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 3,
  },
  statusIconGlyph: {
    width: 8,
    height: 8,
  },
  statusText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 11,
    fontWeight: "700",
  },
});

export default agendaStyle;
