import { StyleSheet } from "react-native";

import { cores, fontes } from "./variaveis";

const ajudaPerguntasStyle = StyleSheet.create({
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
    minHeight: 66,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  backButton: {
    width: 78,
    paddingVertical: 5,
  },

  backText: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 15,
    color: cores.branco,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 13,
    color: cores.branco,
  },

  headerIcons: {
    width: 78,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  headerIconButton: {
    position: "relative",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  headerIcon: {
    width: 25,
    height: 25,
  },

  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -4,
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
    marginTop: 9,
  },

  screenTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
  },

  /* PERGUNTAS */

  faqList: {
    marginHorizontal: 24,
    marginTop: 17,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.28)",
  },

  faqItem: {
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.28)",
    paddingVertical: 8,
  },

  questionRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 30,
  },

  question: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 10,
    color: cores.branco,
  },

  questionArrow: {
    width: 20,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 19,
    fontWeight: "700",
    color: cores.branco70,
  },

  questionArrowOpen: {
    color: cores.vermelho,
  },

  answerContainer: {
    overflow: "hidden",
  },

  answer: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 8.5,
    lineHeight: 13,
    color: cores.branco70,
    paddingTop: 6,
    paddingRight: 24,
  },

  /* OUTRAS CATEGORIAS */

  otherCategories: {
    marginHorizontal: 24,
    marginTop: 39,
  },

  otherCategoriesTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
  },

  categoryList: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.28)",
  },

  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 61,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.28)",
  },

  categoryIconBox: {
    width: 51,
    alignItems: "center",
    justifyContent: "center",
  },

  categoryIcon: {
    width: 23,
    height: 23,
  },

  categoryText: {
    flex: 1,
    marginLeft: 14,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
  },

  categoryArrow: {
    width: 20,
    textAlign: "right",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "700",
    color: cores.branco70,
  },
});

export default ajudaPerguntasStyle;