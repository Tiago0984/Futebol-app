import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const alterarSenhaStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  /* HEADER */

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  headerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  backChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 20,
    fontWeight: "700",
    color: cores.branco,
    marginRight: 4,
  },

  backText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "600",
    color: cores.branco,
  },

  headerTitle: {
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "800",
    color: cores.branco,
  },

  headerIconsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  headerIconButton: {
    marginLeft: 16,
  },

  headerIcon: {
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },



  /* ÍCONE */

  iconSection: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 30,
  },

  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: cores.cinza,
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: 60,
    height: 60,
  },

  subtitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    textAlign: "center",
    color: cores.branco,
    marginTop: 16,
  },

  /* FORMULÁRIO */

  form: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  fieldWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 14,
    height: 54,
    paddingHorizontal: 18,
    marginBottom: 10,
  },

  fieldInput: {
    flex: 1,
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.preto,
    height: "100%",
    ...({ outlineStyle: "none" } as any),
  },

  eyeIcon: {
    width: 20,
    height: 20,
    marginLeft: 12,
  },

  /* REQUISITOS DA SENHA */

  requirementsSection: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  requirementsTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.branco,
    marginBottom: 14,
  },

  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  requirementCheckIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
  },

  requirementRadioOuter: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  requirementRadioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: cores.branco,
  },

  requirementTextMet: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.branco,
  },

  requirementTextPending: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.subtitulo,
    color: cores.branco,
  },

  /* SALVAR */

  saveSection: {
    paddingHorizontal: 20,
    marginTop: 50,
  },

  saveButton: {
    height: 50,
    borderRadius: 14,
    backgroundColor: cores.cinza,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },
});

export default alterarSenhaStyle;
