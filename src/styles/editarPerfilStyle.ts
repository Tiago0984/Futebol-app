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
    width: 32,
    height: 32,
    marginLeft: -8,
    alignItems: "center",
    justifyContent: "center",
  },
  backChevron: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 34,
    lineHeight: 36,
    fontWeight: "700",
    color: cores.branco,
  },

  headerTitle: {
    position: "absolute",
    left: 72,
    right: 72,
    textAlign: "center",
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
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

  // Foto do atleta ocupando o círculo inteiro
  avatarFoto: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
  },

  // Véu sobre a foto enquanto ela é enviada
  avatarEnviando: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: 75,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarEnviandoTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    color: cores.branco,
  },

  fotoErro: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.vermelho,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 24,
  },

  fotoPendente: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 24,
  },

  /* MODAL DA FOTO */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "100%",
    backgroundColor: cores.branco,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: cores.vermelho,
    padding: 22,
  },

  modalTitulo: {
    fontFamily: fontes.Oswald_Bold,
    fontSize: 24,
    color: cores.vermelho,
    textAlign: "center",
  },

  modalTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.cinza,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 18,
  },

  modalOpcao: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: cores.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  modalOpcaoTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    color: cores.preto,
  },

  modalOpcaoTextoRemover: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 15,
    color: cores.vermelho,
  },

  modalCancelar: {
    alignSelf: "center",
    width: "50%",
    height: 46,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: cores.vermelho20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  modalCancelarTexto: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 14,
    color: cores.cinza,
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

  fieldError: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.vermelho,
    marginTop: -4,
    marginBottom: 10,
    marginLeft: 4,
  },

  /* ENDEREÇO (Meus dados do responsável) */

  sectionTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "800",
    color: cores.branco,
    marginTop: 10,
    marginBottom: 10,
  },

  // Dois campos lado a lado (Número e Complemento, Cidade e UF)
  fieldRow: {
    flexDirection: "row",
    gap: 10,
  },

  fieldCardFlex: {
    flex: 1,
  },

  fieldCardEstreito: {
    width: 96,
  },

  // Linha com texto e o botão de ligar e desligar
  switchCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 14,
  },

  switchLabel: {
    flex: 1,
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 14,
    color: cores.preto,
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

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.branco,
  },

  errorMessage: {
    backgroundColor: cores.vermelho20,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
  },

  errorText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
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
    flex: 1,
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.verde,
  },
});

export default editarPerfilStyle;
