import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

const ajudaSuporteStyle = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 22,
  },

  backButton: {
    paddingVertical: 5,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 15,
    color: cores.branco,
  },

  headerRight: {
    alignItems: "center",
    justifyContent: "center",
  },

  notificationButton: {
    position: "relative",
    width: 28,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationIcon: {
    width: 25,
    height: 25,
  },

  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -5,
    minWidth: 14,
    height: 14,
    paddingHorizontal: 3,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: cores.vermelho,
  },

  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 8,
    fontWeight: "700",
    color: cores.branco,
  },

  /* TÍTULO */

  titleSection: {
    marginHorizontal: 24,
    marginTop: 10,
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

  /* BUSCA */

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginHorizontal: 24,
    marginTop: 19,
    paddingHorizontal: 17,
    borderRadius: 10,
    backgroundColor: cores.branco,
  },

  searchIcon: {
    position: "relative",
    width: 17,
    height: 17,
    marginRight: 13,
  },

  searchIconCircle: {
    position: "absolute",
    top: 1,
    left: 1,
    width: 11,
    height: 11,
    borderWidth: 1,
    borderColor: cores.preto,
    borderRadius: 6,
  },

  searchIconHandle: {
    position: "absolute",
    width: 6,
    height: 1,
    backgroundColor: cores.preto,
    left: 10,
    top: 12,
    transform: [{ rotate: "45deg" }],
  },

  searchInput: {
    flex: 1,
    height: "100%",
    paddingVertical: 0,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 11,
    color: cores.preto,
    ...({ outlineStyle: "none" } as any),
  },

  /* CATEGORIAS */

  categoriesSection: {
    marginHorizontal: 24,
    marginTop: 20,
  },

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.branco,
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 43,
    marginTop: 8,
  },

  categoryIconBox: {
    width: 47,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIcon: {
    width: 22,
    height: 22,
  },

  categoryTextCol: {
    flex: 1,
    marginLeft: 12,
  },

  categoryTitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 12,
    color: cores.branco,
  },

  categoryDescription: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8,
    color: cores.branco,
    marginTop: 3,
  },

  /* FAQ */

  faqSection: {
    marginHorizontal: 24,
    marginTop: 15,
  },

  faqList: {
    marginTop: 7,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.22)",
  },

  faqItem: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.22)",
    paddingVertical: 7,
  },

  faqQuestionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 16,
  },

  faqQuestion: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 9.5,
    color: cores.branco,
  },

  faqArrow: {
    width: 18,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 13,
    color: cores.branco70,
  },

  faqArrowOpen: {
    color: cores.vermelho,
  },

  faqAnswerContainer: {
    overflow: "hidden",
  },

  faqAnswer: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8.5,
    lineHeight: 13,
    color: cores.branco70,
    paddingTop: 7,
    paddingRight: 20,
  },

  /* CONTATO */

  contactSection: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 38,
    marginTop: 38,
  },

  contactLogo: {
    width: 64,
    height: 72,
    marginRight: 15,
  },

  contactContent: {
    flex: 1,
  },

  contactTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    fontWeight: "700",
    color: cores.branco,
  },

  contactDescription: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8.5,
    color: cores.branco,
    marginTop: 5,
  },

  contactLink: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 9.5,
    fontWeight: "700",
    color: cores.vermelho,
    marginTop: 6,
  },
});

export default ajudaSuporteStyle;
