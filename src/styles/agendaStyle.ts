import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

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
    fontSize: 30,
    fontWeight: "800",
    color: variaveis.branco,
  },
  screenSubtitle: {
    fontSize: 14,
    color: variaveis.cinza,
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
    fontSize: 10,
    fontWeight: "700",
    color: variaveis.branco,
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
    fontSize: 20,
    fontWeight: "700",
    color: variaveis.cinza,
    paddingHorizontal: 6,
  },
  monthText: {
    fontSize: 17,
    fontWeight: "800",
    color: variaveis.branco,
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
    fontSize: 11,
    fontWeight: "600",
    color: variaveis.branco,
    marginBottom: 8,
  },
  weekDayCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: variaveis.branco30,
    alignItems: "center",
    justifyContent: "center",
  },
  weekDayCircleActive: {
    backgroundColor: variaveis.vermelho,
  },
  weekDayNumber: {
    fontSize: 15,
    fontWeight: "700",
    color: variaveis.preto,
  },
  weekDayNumberActive: {
    color: variaveis.branco,
  },
  weekDayDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: variaveis.vermelho,
    marginTop: 6,
  },

  todayCard: {
    backgroundColor: variaveis.branco,
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
  todayIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  todayIcon: {
    width: 22,
    height: 22,
  },
  todayLabel: {
    fontSize: 14,
    fontWeight: "800",
    color: variaveis.vermelho,
  },
  todaySubLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.preto,
    marginTop: 2,
  },
  todayCardRight: {
    alignItems: "flex-end",
  },
  todayCountText: {
    fontSize: 14,
    fontWeight: "800",
    color: variaveis.preto,
  },
  todayNextText: {
    fontSize: 11,
    color: variaveis.cinza,
    marginTop: 2,
  },
  todayPillsRow: {
    flexDirection: "row",
    marginTop: 14,
  },
  todayPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.branco,
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
    fontSize: 11.5,
    fontWeight: "600",
    color: variaveis.cinza,
  },

  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginTop: 20,
    rowGap: 10,
    columnGap: 10,
  },
  filterPill: {
    paddingHorizontal: 16,
    height: 34,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: variaveis.branco70,
  },
  filterPillActive: {
    backgroundColor: variaveis.vermelho,
    borderColor: variaveis.vermelho,
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: "700",
    color: variaveis.branco,
  },
  filterPillTextActive: {
    color: variaveis.branco,
  },

  nextCard: {
    backgroundColor: variaveis.branco,
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 18,
  },
  nextCardLabel: {
    fontSize: 12,
    color: variaveis.cinza,
    marginBottom: 12,
  },
  nextCardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: variaveis.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  nextCardIcon: {
    width: 28,
    height: 28,
  },
  nextCardTextCol: {
    flex: 1,
  },
  nextCardTime: {
    fontSize: 13,
    fontWeight: "800",
    color: variaveis.vermelho,
    marginBottom: 4,
  },
  nextCardTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: variaveis.preto,
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
    fontSize: 12.5,
    color: variaveis.cinza,
  },
  nextCardSide: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  nextConfirmedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: variaveis.verdeclaro,
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
    fontSize: 11,
    fontWeight: "700",
    color: variaveis.verde,
  },
  nextDetailsLink: {
    fontSize: 12.5,
    fontWeight: "700",
    color: variaveis.vermelho,
    marginTop: 10,
  },

  timelineSection: {
    paddingHorizontal: 20,
    marginTop: 26,
  },
  timelineItem: {
    flexDirection: "row",
  },
  timelineTimeCol: {
    width: 42,
    marginTop: 14,
  },
  timelineTime: {
    fontSize: 12.5,
    fontWeight: "700",
    color: variaveis.branco,
  },
  timelineLineCol: {
    width: 18,
    alignItems: "center",
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.15)",
    marginTop: 4,
  },
  timelineIconSquare: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  timelineIcon: {
    width: 20,
    height: 20,
  },
  timelineTextCol: {
    flex: 1,
    paddingBottom: 22,
  },
  timelineTitle: {
    fontSize: 14.5,
    fontWeight: "700",
    color: variaveis.branco,
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
    fontSize: 12,
    color: variaveis.cinza,
  },
  timelineStatusCol: {
    marginLeft: 8,
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingHorizontal: 8,
    width: 108,
    height: 24,
    borderWidth: 1,
  },
  statusIconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  statusIconGlyph: {
    width: 8,
    height: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
});

export default agendaStyle;
