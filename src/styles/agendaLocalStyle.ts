import { StyleSheet } from "react-native";
import { fontes, cores } from "./variaveis";

const AgendaLocalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  // HEADER
  header: {
    height: 78,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 90,
    flexDirection: "row",
    alignItems: "center",
  },

  backIcon: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 32,
    lineHeight: 32,
    color: cores.branco,
    marginRight: 4,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.branco,
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 18,
    fontWeight: "700",
    color: cores.branco,
  },

  headerIcons: {
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  headerIconButton: {
    width: 28,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  headerIcon: {
    width: 22,
    height: 22,
  },

  notificationBadge: {
    position: "absolute",
    top: -3,
    right: -5,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    paddingHorizontal: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  notificationText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,
    fontWeight: "700",
    color: cores.branco,
  },

  // MAPA
  mapContainer: {
    height: 260,
    marginHorizontal: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: cores.branco,
  },

  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

  // LOCAL
  locationCard: {
    marginHorizontal: 24,
    marginTop: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: cores.branco,
  },

  locationTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "700",
    color: cores.preto,
  },

  locationSubtitle: {
    marginTop: 3,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.cinza,
  },

  addressRow: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  locationIcon: {
    width: 18,
    height: 18,
    marginTop: 1,
    marginRight: 8,
  },

  addressText: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    lineHeight: 18,
    color: cores.cinza,
  },

  // AÇÕES
  actionsSection: {
    marginHorizontal: 24,
    marginTop: 24,
  },

  sectionTitle: {
    marginLeft: 10,
    marginBottom: 10,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
  },

  actionsCard: {
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: cores.branco,
  },

  actionRow: {
    minHeight: 72,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  actionIconContainer: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  actionIcon: {
    width: 21,
    height: 21,
  },

  copyIcon: {
    height: 25,
    width: 25,
  },

  shareIcon: {
    height: 25,
    width: 25,
  },

  actionContent: {
    flex: 1,
  },

  actionTitle: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 14,
    fontWeight: "600",
    color: cores.preto,
  },

  actionDescription: {
    marginTop: 3,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    lineHeight: 16,
    color: cores.cinza,
  },

  actionArrow: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 27,
    lineHeight: 27,
    color: cores.cinza,
    marginLeft: 8,
  },

  actionDivider: {
    height: 1,
    marginLeft: 64,
    backgroundColor: cores.branco30,
  },
});

export default AgendaLocalStyle;