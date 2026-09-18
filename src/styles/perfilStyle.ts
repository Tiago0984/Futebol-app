import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

const perfilStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 22,
  },

  headerTitleCol: {
    flex: 1,
    minWidth: 0,
  },

  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 21,
    fontWeight: "800",
    color: cores.branco,
  },

  screenSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco,
    marginTop: 2,
  },

  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },

  headerIconButton: {
    position: "relative",
    marginLeft: 17,
  },

  headerIcon: {
    width: 25,
    height: 25,
  },

  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    minWidth: 15,
    height: 15,
    paddingHorizontal: 3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9,
    fontWeight: "700",
    color: cores.branco,
  },

  /* PERFIL */

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 22,
  },

  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: cores.cinza,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarIcon: {
    width: 60,
    height: 60,
  },

  profileInfoCol: {
    flex: 1,
    marginLeft: 16,
  },

  profileName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.branco,
  },

  profileDetail: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco70,
    marginTop: 4,
  },

  editProfileButton: {
    alignSelf: "flex-start",
    marginTop: 8,
  },

  editProfileText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.vermelho,
  },

  /* DADOS PESSOAIS */

  section: {
    marginHorizontal: 24,
    marginTop: 20,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    fontWeight: "700",
    color: cores.branco,
    marginBottom: 10,
  },

  infoCard: {
    borderRadius: 14,
    backgroundColor: cores.branco,
    paddingHorizontal: 14,
    overflow: "hidden",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.08)",
  },

  infoRowLast: {
    borderBottomWidth: 0,
  },

  infoIcon: {
    width: 30,
    height: 30,
    marginRight: 14,
  },

  infoLabel: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
  },

  infoValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.cinza,
  },

  /* CONFIGURAÇÕES */

  sectionCompact: {
    marginHorizontal: 24,
    marginTop: 10,
  },

  menuArrow: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 18,
    color: cores.cinza,
  },

  logoutLabel: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.vermelho,
  },
});

export default perfilStyle;
