import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes } from "./variaveis";

const escolhaAtletaStyle = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 22,
  },

  backButton: {
    width: 32,
    height: 32,
    marginLeft: -8,
    marginRight: 6,
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

  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginTop: 10,
  },

  titulo: {
    fontFamily: fontes.Oswald_Bold,
    fontSize: 28,
    color: cores.branco,
    textAlign: "center",
    marginTop: 14,
  },

  subtitulo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.branco80,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 24,
  },

  /* CARDS DOS ATLETAS */

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.branco,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  cardPressionado: {
    opacity: 0.85,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(0,0,0,0.06)",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginRight: 14,
  },

  avatarFoto: {
    width: "100%",
    height: "100%",
  },

  avatarIcon: {
    width: 30,
    height: 30,
  },

  cardTextos: {
    flex: 1,
    minWidth: 0,
  },

  cardNome: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.titulo,
    fontWeight: "700",
    color: cores.preto,
  },

  cardDetalhe: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.cinza,
    marginTop: 2,
  },

  avisos: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: cores.vermelho,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },

  avisosTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 12,
    color: cores.branco,
  },

  seta: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 22,
    color: cores.cinza,
    marginLeft: 10,
  },

  /* ESTADOS */

  mensagem: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 14,
    color: cores.branco,
    textAlign: "center",
    marginTop: 12,
  },

  botaoTentar: {
    alignSelf: "center",
    paddingHorizontal: 22,
    height: 42,
    borderRadius: 10,
    backgroundColor: cores.vermelho,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },

  botaoTentarTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    color: cores.branco,
  },

  sair: {
    alignSelf: "center",
    marginTop: 28,
    padding: 8,
  },

  sairTexto: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    color: cores.vermelho,
  },
});

export default escolhaAtletaStyle;
