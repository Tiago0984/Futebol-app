export const cores = {

    vermelho: "#D71920",
    laranja: "#FF8800",
    preto: "#111111",
    cinza: "#888888",
    branco: "#ffffff",
    branco80: "#FFFFFFCC",
    branco70: "#FFFFFFB3",
    branco30: "#FFFFFF4D",
    verde: "#169D5D",
    verdeclaro: "#DDFFEE",
    pastel: "#FFEDDD",
    rosa: "#EFE3FF",
    azulclaro: "#DBEBFF",
    vermelho20: "#D7192033",

}

export const fontes = {
    OpenSans_Bold: "OpenSans_700Bold",
    OpenSans_Regular: "OpenSans_400Regular",
    OpenSans_SemiBold: "OpenSans_600SemiBold",
    Oswald_Regular: "Oswald_400Regular",
    Oswald_Bold: "Oswald_700Bold",
}

/**
 * Escala padrão de tamanho de fonte. Baseada no que já predominava nas
 * telas de referência (ajuda-suporte, campeonato-detalhe, desempenho) e
 * no restante do app — usar sempre um destes valores em vez de números
 * soltos (ex: 8.5, 21, 25), pra não haver diferença brusca entre telas.
 */
export const fontSizes = {
    minusculo: 7,      // legendas mínimas (autor de observação, labels ínfimos)
    legenda: 8,        // legendas/labels pequenos (descrição de categoria, badge)
    pequeno: 9,        // textos pequenos (badge de notificação, subtítulo curto)
    apoio: 10,         // texto de apoio padrão (info de card, data)
    corpo: 11,         // texto padrão
    corpoMedio: 12,    // texto padrão um pouco maior / labels de valor
    destaqueLeve: 13,  // valores de destaque pequenos (stat value)
    subtitulo: 15,     // subtítulos e botão "voltar"
    titulo: 16,        // título de card branco (ex: Índice Geral)
    tituloSecao: 18,   // título de seção de tela
    tituloHeader: 20,  // título principal do header da tela
    numeroGrande: 30,  // números grandes de destaque (índice, placar)
} as const;

/**
 * Escala padrão de tamanho de ícone/imagem pequena. Mesma lógica do
 * fontSizes: evita ícones de header ora com 22px, ora 24, ora 25 etc.
 */
export const iconSizes = {
    minusculo: 13,   // setas/indicadores dentro de linha
    pequeno: 18,      // ícones pequenos em círculo/indicador
    padrao: 20,       // ícones padrão dentro de conteúdo
    acaoHeader: 24,   // ícones de ação no header (sino, compartilhar)
    estatistica: 25,  // ícones de estatística/indicador em card
    media: 34,        // ícones grandes de card (avaliação, indicador)
    avatar: 50,       // avatar pequeno
    avatarGrande: 80, // avatar grande (ex: home)
} as const;