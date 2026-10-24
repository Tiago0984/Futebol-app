// Compromissos da agenda (GET /api/v1/agenda): visual por tipo, datas e o detalhe
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";

// Ícone e cor de fundo de cada tipo da API
export const visualPorTipo: Record<string, { icone: any; cor: string }> = {
  TREINO: {
    icone: require("@/assets/images/img/atletaVermelho.png"),
    cor: cores.vermelho20,
  },
  JOGO: {
    icone: require("@/assets/images/img/bolaVermelha.png"),
    cor: cores.azulclaro,
  },
  CAMPEONATO: {
    icone: require("@/assets/images/img/campeonatosVermelho.png"),
    cor: cores.pastel,
  },
  AVALIACAO: {
    icone: require("@/assets/images/img/pranchetaVermelha.png"),
    cor: cores.pastel,
  },
  REUNIAO: {
    icone: require("@/assets/images/img/grupoPessoasVermelho.png"),
    cor: cores.rosa,
  },
  EVENTO: {
    icone: require("@/assets/images/img/agendaVermelha.png"),
    cor: cores.azulclaro,
  },
  CONFRATERNIZACAO: {
    icone: require("@/assets/images/img/coracaoVermelho.png"),
    cor: cores.rosa,
  },
};

// Tipo desconhecido usa o visual de evento
export function visualDoTipo(tipo: string) {
  return visualPorTipo[tipo] ?? visualPorTipo.EVENTO;
}

// O tipo_label da API vem em maiúsculas ("REUNIÃO"); aqui, para mostrar na tela
export const nomePorTipo: Record<string, string> = {
  TREINO: "Treino",
  JOGO: "Jogo",
  CAMPEONATO: "Campeonato",
  AVALIACAO: "Avaliação",
  REUNIAO: "Reunião",
  EVENTO: "Evento",
  CONFRATERNIZACAO: "Confraternização",
};

const DIAS_DA_SEMANA = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira",
  "Quinta-feira", "Sexta-feira", "Sábado",
];

// Dia do aparelho no mesmo formato da API: "2026-11-03"
export function chaveDoDia(data: Date) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

// "Hoje · 03/11/2026", "Amanhã · 04/11/2026" ou "Quinta-feira · 05/11/2026".
// Recorta o texto da data (já vem no horário de Brasília) para o fuso do aparelho não trocar o dia
export function formatarDiaCompromisso(data: string) {
  const chave = data.slice(0, 10);
  const [ano, mes, dia] = chave.split("-").map(Number);
  const hoje = new Date();
  const amanha = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate() + 1);
  const nome =
    chave === chaveDoDia(hoje)
      ? "Hoje"
      : chave === chaveDoDia(amanha)
        ? "Amanhã"
        : DIAS_DA_SEMANA[new Date(ano, mes - 1, dia).getDay()];
  return `${nome} · ${chave.slice(8, 10)}/${chave.slice(5, 7)}/${ano}`;
}

// "1h 30min", "2h" ou "45min"; null sem início ou fim
export function formatarDuracao(inicio: string | null, fim: string | null) {
  if (!inicio || !fim) return null;
  const minutos = Math.round(
    (new Date(fim).getTime() - new Date(inicio).getTime()) / 60000,
  );
  if (minutos <= 0) return null;
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) return `${resto}min`;
  return resto === 0 ? `${horas}h` : `${horas}h ${resto}min`;
}

// Link do Google Agenda já preenchido (a pessoa só confirma "Salvar").
// Horários no fuso de Brasília: "2026-10-27T09:30:00-03:00" -> "20261027T093000".
// Sem horário vira compromisso de dia inteiro; sem fim, dura 1 hora
export function linkGoogleAgenda(evento: {
  titulo: string;
  data: string;
  inicio: string | null;
  fim: string | null;
  local: string | null;
  descricao: string | null;
}) {
  const compacto = (iso: string) => iso.slice(0, 19).replace(/[-:]/g, "");
  let datas: string;
  if (evento.inicio) {
    const inicio = compacto(evento.inicio);
    let fim: string;
    if (evento.fim) {
      fim = compacto(evento.fim);
    } else {
      // Soma 1 hora pelos números do texto (sem passar pelo fuso do aparelho)
      const [a, m, d, h, mi] = evento.inicio
        .slice(0, 16)
        .split(/[-T:]/)
        .map(Number);
      const depois = new Date(a, m - 1, d, h + 1, mi);
      const hora = `${String(depois.getHours()).padStart(2, "0")}${String(depois.getMinutes()).padStart(2, "0")}00`;
      fim = `${chaveDoDia(depois).replace(/-/g, "")}T${hora}`;
    }
    datas = `${inicio}/${fim}`;
  } else {
    const [ano, mes, dia] = evento.data.slice(0, 10).split("-").map(Number);
    datas = `${chaveDoDia(new Date(ano, mes - 1, dia)).replace(/-/g, "")}/${chaveDoDia(new Date(ano, mes - 1, dia + 1)).replace(/-/g, "")}`;
  }
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: evento.titulo,
    dates: datas,
    ctz: "America/Sao_Paulo",
  });
  if (evento.local) params.set("location", evento.local);
  if (evento.descricao) params.set("details", evento.descricao);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// O servidor que tem o detalhe (GET /agenda/{idEvento}) também manda o campo
// "responsavel" em todo evento: sem ele, o "Ver detalhes" fica escondido
export function temDetalhe(evento: object) {
  return "responsavel" in evento;
}

export function abrirDetalhe(idEvento: number) {
  router.navigate({
    pathname: "/detalhe-compromisso",
    params: { id: String(idEvento) },
  });
}
