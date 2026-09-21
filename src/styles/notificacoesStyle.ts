import { StyleSheet } from "react-native";
import { cores, fontes, fontSizes } from "./variaveis";

const notificacoesStyle = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingTop: 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 83,
    paddingHorizontal: 24,
    paddingTop: 15,
  },

  backButton: {
    width: 90,
    paddingVertical: 5,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.branco,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "700",
    color: cores.branco,
  },

  headerSpacer: {
    width: 90,
  },

  filtersWrapper: {
    position: "relative",
    zIndex: 100,
    elevation: 100,
  },

  filtersRow: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    height: 42,
    marginHorizontal: 24,
    zIndex: 100,
    elevation: 100,
  },

  readFilters: {
    flexDirection: "row",
    alignItems: "center",
  },

  readFilter: {
    height: 21,
    minWidth: 70,
    paddingHorizontal: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  readFilterActive: {
    borderColor: cores.vermelho,
    backgroundColor: cores.vermelho,
  },

  readFilterText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
  },

  readFilterTextActive: {
    color: cores.branco,
  },

  categoryArea: {
    position: "absolute",
    right: 76,
    top: 10,
    zIndex: 200,
    elevation: 200,
  },

  categoryAreaRight: {
    right: 0,
  },

  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 69,
    height: 21,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
    borderRadius: 12,
    backgroundColor: "rgba(17,17,17,0.55)",
  },

  categoryButtonText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco,
  },

  categoryArrow: {
    marginLeft: 4,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 9,
    lineHeight: 9,
    color: cores.branco,
    textAlign: "center",
    textAlignVertical: "center",
  },

  categoryArrowOpen: {
    color: cores.vermelho,
  },

  categoryDropdown: {
    position: "absolute",
    top: 27,
    right: 0,
    width: 115,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: 8,
    backgroundColor: cores.preto,
    zIndex: 300,
    elevation: 300,
  },

  categoryOption: {
    minHeight: 27,
    paddingHorizontal: 10,
    justifyContent: "center",
  },

  categoryOptionText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
  },

  categoryOptionTextActive: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontWeight: "600",
    color: cores.branco,
  },

  markAllButton: {
    position: "absolute",
    right: 0,
    top: 6,
    width: 58,
    minHeight: 30,
    justifyContent: "center",
  },

  markAllText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    lineHeight: 10,
    color: cores.vermelho,
    textAlign: "left",
  },

  section: {
    marginHorizontal: 24,
    marginTop: 16,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 7,
  },

  notificationList: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.28)",
  },

  notificationItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 82,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.22)",
  },

  notificationIndicator: {
    width: 16,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 5,
  },

  unreadIndicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: cores.vermelho,
  },

  readIndicator: {
    width: 9,
    height: 9,
    borderWidth: 1,
    borderColor: cores.branco70,
    borderRadius: 5,
  },

  notificationContent: {
    flex: 1,
    paddingRight: 10,
  },

  notificationTitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpo,
    color: cores.branco,
  },

  notificationTitleUnread: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
  },

  notificationMessage: {
    marginTop: 3,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    lineHeight: 11,
    color: cores.branco70,
  },

  notificationDestination: {
    marginTop: 5,
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.pequeno,
    fontWeight: "600",
    color: cores.branco,
  },

  notificationDate: {
    marginTop: 2,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.cinza,
  },

  notificationArrow: {
    width: 15,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.branco,
  },

  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 35,
    paddingTop: 100,
  },

  emptyTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpo,
    fontWeight: "700",
    color: cores.branco,
    textAlign: "center",
  },

  emptyDescription: {
    marginTop: 7,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.pequeno,
    color: cores.branco70,
    textAlign: "center",
  },
});

export default notificacoesStyle;
