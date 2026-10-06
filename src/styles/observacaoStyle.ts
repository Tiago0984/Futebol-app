import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const observacaoStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
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
  headerTitleCol: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloHeader,
    fontWeight: "800",
    color: cores.branco,
  },
  headerSubtitle: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
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
    width: iconSizes.acaoHeader,
    height: iconSizes.acaoHeader,
  },

  listSection: {
    paddingHorizontal: 20,
    marginTop: 22,
    gap: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    padding: 16,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatarCirculo: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: cores.branco,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarIcone: {
    width: 50,
    height: 50,
  },
  nomeCol: {
    flex: 1,
  },
  nome: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 17,
    fontWeight: "800",
    color: cores.branco,
  },
  cargo: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.destaqueLeve,
    color: cores.branco70,
    marginTop: 2,
  },
  mensagem: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: 14,
    fontWeight: "600",
    color: cores.branco,
    lineHeight: 20,
    marginTop: 10,
  },
  dataTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
    marginTop: 10,
  },
});

export default observacaoStyle;
