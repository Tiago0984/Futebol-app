import { StyleSheet } from "react-native";

import { cores, fontes, fontSizes } from "./variaveis";

// Só o que a tela de detalhe tem a mais. O resto vem de treinoTecnicoStyle
// (cabeçalho, status, informações, detalhes, observações e ações) e de
// detalheProximaPartidaStyle (o card dos times no jogo)
const detalheCompromissoStyle = StyleSheet.create({
  cancelledPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.vermelho20,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
  },
  cancelledIconCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: cores.vermelho,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  cancelledIcon: {
    width: 8,
    height: 8,
  },
  cancelledText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
    fontWeight: "700",
    color: cores.vermelho,
  },

  // "Concluído": pílula neutra no lugar da contagem regressiva
  concludedPill: {
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 26,
    justifyContent: "center",
  },
  concludedText: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
    fontWeight: "700",
    color: cores.branco70,
  },

  // Título pode ocupar duas linhas (nomes de jogo são longos)
  heroTitle: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 22,
    fontWeight: "800",
    color: cores.branco,
  },

  // Card do jogo: placar no lugar do "Vs" e as linhas de campeonato, fase e confronto
  placar: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: 24,
    fontWeight: "800",
    color: cores.preto,
    marginHorizontal: 8,
  },
  jogoInfo: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.preto,
    textAlign: "center",
  },
  jogoInfoMuted: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: fontSizes.corpoMedio,
    color: cores.cinza,
    textAlign: "center",
    marginTop: 4,
  },
  jogoChegada: {
    fontFamily: fontes.OpenSans_Bold,
    fontSize: fontSizes.corpoMedio,
    fontWeight: "700",
    color: cores.vermelho,
    textAlign: "center",
    marginTop: 8,
  },

  // Carregando, erro e aviso das ações rápidas
  estadoTexto: {
    fontFamily: fontes.OpenSans_Regular,
    fontSize: 14,
    color: cores.branco70,
    textAlign: "center",
    marginTop: 60,
    paddingHorizontal: 30,
  },
  avisoAcao: {
    fontFamily: fontes.OpenSans_SemiBold,
    fontSize: fontSizes.corpoMedio,
    color: cores.branco70,
    textAlign: "center",
    marginTop: 10,
  },
});

export default detalheCompromissoStyle;
