import { StyleSheet } from "react-native";

import { variaveis } from "./variaveis";

// A imagem já cobre 100% da tela por causa do resizeMode="cover". Para
// aproximar o enquadramento (mostrar o escudo mais deslocado pro canto
// superior esquerdo), aplicamos um ZOOM extra (sempre >= 1, nunca encolhe
// abaixo do que o "cover" já preenche) e deslocamos (pan) só dentro da
// margem que esse zoom cria. Como o deslocamento nunca ultrapassa essa
// margem, a imagem nunca deixa vão, em nenhum tamanho/proporção de tela.
const ZOOM = 1.05;
// 0 = centralizado, 1 = desloca até o limite seguro. Negativo inverte o lado.
const PAN_X = 0.6; // desloca a imagem pra esquerda
const PAN_Y = 0.6; // desloca a imagem pra cima

// Faixa de tela em que o ajuste é calculado. Fora desses limites, o
// enquadramento passa a se comportar como se a tela tivesse o valor
// mínimo/máximo, evitando resultados imprevisíveis em telas muito fora
// do que foi testado (ex: um Android bem estreito ou uma janela desktop
// bem larga no modo web).
const LARGURA_MINIMA = 560;
const LARGURA_MAXIMA = 1280;
const ALTURA_MINIMA = 320;
const ALTURA_MAXIMA = 834;

function limitar(valor: number, minimo: number, maximo: number) {
  return Math.min(Math.max(valor, minimo), maximo);
}

export function getBackgroundImageStyle(larguraTela: number, alturaTela: number) {
  const largura = limitar(larguraTela, LARGURA_MINIMA, LARGURA_MAXIMA);
  const altura = limitar(alturaTela, ALTURA_MINIMA, ALTURA_MAXIMA);

  const margemX = (largura * (ZOOM - 1)) / 2;
  const margemY = (altura * (ZOOM - 1)) / 2;

  return [
    fundoStyle.backgroundImage,
    {
      transform: [
        { translateX: -margemX * PAN_X },
        { translateY: -margemY * PAN_Y },
        { scale: ZOOM },
      ],
    },
  ];
}

const fundoStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: variaveis.preto,
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFill,
    // No React Native Web, position absolute + inset (top/left/right/bottom)
    // não força a Image a ocupar 100% do espaço como acontece nativamente —
    // sem isso, ela renderiza no tamanho intrínseco do arquivo (624x990).
    width: "100%",
    height: "100%",
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export default fundoStyle;
