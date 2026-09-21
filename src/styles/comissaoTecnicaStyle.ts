import { StyleSheet } from "react-native";

import { fontes, cores, fontSizes, iconSizes } from "./variaveis";

const comissaoTecnicaStyle = StyleSheet.create({
  scrollContent: {
    paddingBottom: 24,
  },

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
    fontSize: fontSizes.titulo,
    fontWeight: "700",
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

  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 24,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: cores.preto,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarIcon: {
    width: 50,
    height: 50,
  },
  profileTextCol: {
    flex: 1,
  },
  profileName: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.tituloSecao,
    fontWeight: "800",
    color: cores.branco,
  },
  profileRole: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "700",
    color: cores.vermelho,
    marginTop: 4,
  },
  confirmedPill: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    backgroundColor: cores.verdeclaro,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
    marginTop: 10,
  },
  confirmedIcon: {
    width: 14,
    height: 14,
    marginRight: 6,
  },
  confirmedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
    fontWeight: "700",
    color: cores.verde,
  },

  detailsCard: {
    borderRadius: 18,
    marginHorizontal: 20,
    marginTop: 26,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  detailsRowDivider: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
  },
  detailsIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  detailsTextCol: {
    flex: 1,
  },
  detailsLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
  },
  detailsValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },

  categoriesRow: {
    flexDirection: "row",
    columnGap: 10,
    marginTop: 12,
  },
  categoryPill: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryPillActive: {
    backgroundColor: cores.vermelho,
    borderColor: cores.vermelho,
  },
  categoryPillText: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.destaqueLeve,
    fontWeight: "600",
    color: cores.branco70,
  },
  categoryPillTextActive: {
    fontFamily: fontes.OpenSans_Bold,
    fontWeight: "700",
    color: cores.branco,
  },

  contatoSection: {
    paddingHorizontal: 20,
    marginTop: 28,
  },
  contatoTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.subtitulo,
    fontWeight: "700",
    color: cores.branco,
  },
  contatoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  contatoIcon: {
    width: 18,
    height: 18,
    marginRight: 12,
  },
  contatoTextCol: {
    flex: 1,
  },
  contatoLabel: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
  },
  contatoValue: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 14,
    fontWeight: "700",
    color: cores.branco,
    marginTop: 2,
  },
});

export default comissaoTecnicaStyle;
