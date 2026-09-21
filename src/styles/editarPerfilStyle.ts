import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes, iconSizes } from "./variaveis";

const editarPerfilStyle = StyleSheet.create({
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

  notificationBadge: {
    position: "absolute",
    top: -5,
    right: -6,
    backgroundColor: cores.vermelho,
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },

  notificationBadgeText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.pequeno,
    fontWeight: "700",
    color: cores.branco,
  },

  /* FOTO */

  photoSection: {
    alignItems: "center",
    marginTop: 30,
  },

  avatarCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarIcon: {
    width: 80,
    height: 80,
  },

  cameraBadge: {
    position: "absolute",
    right: 2,
    bottom: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraIcon: {
    width: 20,
    height: 20,
  },

  changePhotoText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.vermelho,
    marginTop: 12,
  },

  /* FORMULÁRIO */

  form: {
    paddingHorizontal: 20,
    marginTop: 28,
  },

  fieldCard: {
    borderRadius: 12,
    backgroundColor: cores.branco,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
  },

  fieldCardDisabled: {
    backgroundColor: cores.branco80,
  },

  fieldLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.cinza,
  },

  fieldValue: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.titulo,
    color: cores.preto,
    marginTop: 2,
    padding: 0,
  },

  fieldValueDisabled: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
  },

  /* SALVAR */

  saveButton: {
    height: 50,
    borderRadius: 15,
    backgroundColor: cores.vermelho,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  saveButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },

  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },

  successIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  successText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.verde,
  },
});

export default editarPerfilStyle;
