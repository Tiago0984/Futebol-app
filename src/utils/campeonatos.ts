import { buscarComPrazo } from "@/utils/buscarComPrazo";
// Campeonato (GET /api/v1/campeonatos/{id}): tipos, placar do ponto de vista da AACJ,
// datas e a busca usada pelo detalhe e pelas telas de "ver tudo"
import { API } from "@/config/api";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

// Andamento pelos jogos já marcados (o total cresce quando o mata-mata é montado).
// jogos_aguardando_resultado: já terminaram e estão sem placar (servidor antigo não manda)
export type Resumo = {
  fase_atual_label: string | null;
  rodada_atual: number | null;
  total_rodadas: number | null;
  jogos_realizados: number;
  total_jogos: number;
  jogos_aguardando_resultado?: number;
};

// Time no pódio: o nome vem em "nome" (não nome_time)
export type TimeDoPodio = {
  id_time: number;
  nome: string;
  logo_url: string | null;
  da_aacj?: boolean;
};

// "sorteio": terminou empatado em tudo no 1º lugar, sem campeão definido
export type Campeao = {
  situacao: "campeao" | "sorteio";
  como: string | null;
  campeao: TimeDoPodio | null;
  vice: TimeDoPodio | null;
  terceiro: TimeDoPodio | null;
};

// resumo, encerrada e campeao por categoria: servidor antigo não manda
export type Categoria = {
  id_categoria: number;
  rotulo: string;
  resumo?: Resumo | null;
  encerrada?: boolean;
  campeao?: Campeao | null;
};

export type Situacao = "ANDAMENTO" | "EM_BREVE" | "ENCERRADO";

export const ROTULO_SITUACAO: Record<Situacao, string> = {
  ANDAMENTO: "Em andamento",
  EM_BREVE: "Em breve",
  ENCERRADO: "Encerrado",
};

// Situação e progresso pelas datas (recortadas do texto, sem passar pelo fuso do aparelho)
function andamentoPelasDatas(inicio: string, fim: string, hoje: string) {
  if (fim < hoje) {
    return {
      situacao: "ENCERRADO" as Situacao,
      texto: `Encerrado em ${diaMes(fim)}`,
      progresso: 100,
    };
  }
  if (inicio > hoje) {
    return {
      situacao: "EM_BREVE" as Situacao,
      texto: `Começa em ${diaMes(inicio)}`,
      progresso: 0,
    };
  }
  const dia = (chave: string) => {
    const [a, m, d] = chave.split("-").map(Number);
    return Date.UTC(a, m - 1, d) / 86400000;
  };
  const total = dia(fim) - dia(inicio) + 1;
  const passados = dia(hoje) - dia(inicio) + 1;
  return {
    situacao: "ANDAMENTO" as Situacao,
    texto: `Termina em ${diaMes(fim)}`,
    // Para baixo: 100% só quando terminar
    progresso: Math.min(99, Math.max(0, Math.floor((passados / total) * 100))),
  };
}

/**
 * Situação (filtros e ordem), selo, texto ("Fase de grupos · Rodada 4 de 5") e progresso,
 * iguais na lista e no detalhe. encerrado = o servidor diz que acabou (há campeão ou sorteio);
 * undefined = servidor antigo, vale só a data. 100% só quando acabou de verdade: com todos os
 * jogos marcados disputados e sem campeão, falta a próxima fase (ou o encerramento)
 */
export function andamentoDoCampeonato(
  datas: { data_inicio_campeonato: string; data_fim_campeonato: string },
  hoje: string,
  r: Resumo | null | undefined,
  encerrado: boolean | undefined,
) {
  const inicio = datas.data_inicio_campeonato.slice(0, 10);
  const fim = datas.data_fim_campeonato.slice(0, 10);
  const pelasDatas = andamentoPelasDatas(inicio, fim, hoje);
  const situacao: Situacao = encerrado ? "ENCERRADO" : pelasDatas.situacao;
  const aguardando = r?.jogos_aguardando_resultado ?? 0;
  const selo =
    !encerrado && aguardando > 0 && situacao === "ENCERRADO"
      ? "Aguardando resultados"
      : ROTULO_SITUACAO[situacao];

  if (!r || r.total_jogos === 0) {
    return {
      situacao,
      selo,
      texto: encerrado ? `Encerrado em ${diaMes(fim)}` : pelasDatas.texto,
      progresso: encerrado ? 100 : pelasDatas.progresso,
    };
  }

  const tudoJogado = r.jogos_realizados === r.total_jogos;
  const etapa = aguardando
    ? `${aguardando} aguardando resultado`
    : tudoJogado && encerrado === false && situacao === "ANDAMENTO"
      ? "Aguardando próximos jogos"
      : r.rodada_atual && r.total_rodadas
        ? `Rodada ${r.rodada_atual} de ${r.total_rodadas}`
        : `${r.jogos_realizados} de ${r.total_jogos} ${r.total_jogos === 1 ? "jogo" : "jogos"}`;
  const progresso = Math.floor((r.jogos_realizados / r.total_jogos) * 100);
  return {
    situacao,
    selo,
    texto: [r.fase_atual_label, etapa].filter(Boolean).join(" · "),
    progresso: encerrado
      ? 100
      : encerrado === false && tudoJogado && situacao === "ANDAMENTO"
        ? 99
        : progresso,
  };
}

// da_aacj: time da AACJ (tipo_time INTERNO); null ou ausente = não se sabe
export type Time = {
  id_time: number;
  nome_time: string;
  logo_url: string | null;
  da_aacj?: boolean | null;
};

export type Jogo = {
  id_jogo: number;
  id_evento: number;
  id_categoria: number | null;
  fase: string | null;
  rodada_jogo: number | null;
  placar_time_casa_jogos: number | null;
  placar_time_visitante_jogos: number | null;
  penaltis_time_casa_jogos: number | null;
  penaltis_time_visitante_jogos: number | null;
  data_jogo: string;
  horario_jogo: string | null;
  local_jogo: string | null;
  time_casa: Time;
  time_visitante: Time;
};

export type LinhaTabela = {
  posicao: number;
  id_time: number;
  time: string;
  logo_url: string | null;
  pontos: number;
  jogos: number;
  vitorias: number;
  empates: number;
  derrotas: number;
  gols_marcados: number;
  gols_sofridos: number;
  saldo: number;
  classificado?: boolean;
  da_aacj?: boolean | null;
};

export type ClassificacaoCategoria = {
  id_categoria: number;
  categoria: string;
  grupos: { grupo: string; tabela: LinhaTabela[] }[];
};

// Só os campos usados nas telas do app
export type DadosCampeonato = {
  id_campeonato: number;
  nome_campeonato: string;
  organizador_campeonato: string | null;
  descricao_campeonato: string | null;
  tipo_label?: string;
  local_evento: string | null;
  logo_url: string | null;
  data_inicio_campeonato: string;
  data_fim_campeonato: string;
  categorias: Categoria[];
  // Servidor antigo não manda
  resumo?: Resumo | null;
  encerrado?: boolean;
  jogos: Jogo[];
  classificacao: ClassificacaoCategoria[];
};

const DIAS = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

// Datas recortadas do texto (já vêm no horário de Brasília), sem passar pelo fuso do aparelho
export const diaMes = (data: string) => `${data.slice(8, 10)}/${data.slice(5, 7)}`;
export const dataCompleta = (data: string) => `${diaMes(data)}/${data.slice(0, 4)}`;
export function diaDaSemana(data: string) {
  const [a, m, d] = data.slice(0, 10).split("-").map(Number);
  return DIAS[new Date(a, m - 1, d).getDay()];
}

export const jogado = (j: Jogo) =>
  j.placar_time_casa_jogos !== null && j.placar_time_visitante_jogos !== null;

// Resultado do ponto de vista da AACJ (nos pênaltis, conta quem passou); null quando
// nenhum dos times é da AACJ, os dois são, ou o servidor ainda não diz qual é
export function resultadoDaAacj(j: Jogo) {
  const casa = j.time_casa.da_aacj === true;
  const fora = j.time_visitante.da_aacj === true;
  if (!jogado(j) || casa === fora) return null;
  let nossos = casa ? j.placar_time_casa_jogos! : j.placar_time_visitante_jogos!;
  let deles = casa ? j.placar_time_visitante_jogos! : j.placar_time_casa_jogos!;
  if (
    nossos === deles &&
    j.penaltis_time_casa_jogos != null &&
    j.penaltis_time_visitante_jogos != null
  ) {
    nossos = casa ? j.penaltis_time_casa_jogos! : j.penaltis_time_visitante_jogos!;
    deles = casa ? j.penaltis_time_visitante_jogos! : j.penaltis_time_casa_jogos!;
  }
  return nossos > deles ? "VITORIA" : nossos < deles ? "DERROTA" : "EMPATE";
}

export const ROTULO_RESULTADO = {
  VITORIA: "Vitória",
  EMPATE: "Empate",
  DERROTA: "Derrota",
} as const;

export function placarTexto(j: Jogo) {
  const placar = `${j.placar_time_casa_jogos} x ${j.placar_time_visitante_jogos}`;
  return j.penaltis_time_casa_jogos !== null
    ? `${placar} (${j.penaltis_time_casa_jogos}-${j.penaltis_time_visitante_jogos} pên.)`
    : placar;
}

// "Fase de grupos · Rodada 4"
export function faseDoJogo(j: Jogo) {
  return [j.fase, j.rodada_jogo ? `Rodada ${j.rodada_jogo}` : null]
    .filter(Boolean)
    .join(" · ");
}

export function escudoDoTime(t: Time) {
  return t.logo_url
    ? { uri: t.logo_url }
    : require("@/assets/images/img/escudovermelho.png");
}

// Jogos da categoria em ordem de data (jogo sem categoria entra em todas)
export function jogosDaCategoria(c: DadosCampeonato, idCategoria: number | null) {
  return c.jogos
    .filter(
      (j) =>
        idCategoria === null ||
        j.id_categoria === null ||
        j.id_categoria === idCategoria,
    )
    .sort((a, b) => a.data_jogo.localeCompare(b.data_jogo));
}

// Sem placar e de hoje em diante (jogo passado sem placar espera o resultado)
export function jogosFuturos(jogos: Jogo[], hoje: string) {
  return jogos.filter((j) => !jogado(j) && j.data_jogo.slice(0, 10) >= hoje);
}

// Grupos com jogos contados (o mata-mata vem com a tabela zerada)
export function gruposDaCategoria(c: DadosCampeonato, idCategoria: number | null) {
  const classificacao = c.classificacao.find((cl) => cl.id_categoria === idCategoria);
  return (classificacao?.grupos ?? []).filter((g) =>
    g.tabela.some((l) => l.jogos > 0),
  );
}

// Cada consulta cobre até 93 dias, incluindo as duas pontas do período.
function periodosDosJogos(jogos: Jogo[]) {
  const dias = [...new Set(jogos.map((j) => j.data_jogo.slice(0, 10)))].sort();
  const periodos: { de: string; ate: string }[] = [];
  for (const dia of dias) {
    const atual = periodos[periodos.length - 1];
    if (!atual || (Date.parse(dia) - Date.parse(atual.de)) / 86400000 >= 93) {
      periodos.push({ de: dia, ate: dia });
    } else {
      atual.ate = dia;
    }
  }
  return periodos;
}

// Categorias de GET /api/v1/atleta, com o período em cada uma
export type VinculoCategoria = {
  id_categoria: number;
  pivot: {
    data_inicio_categoria_atleta: string | null;
    data_fim_categoria_atleta: string | null;
  };
};

// A categoria atual sempre conta; uma encerrada, só se ele esteve nela durante o campeonato
export function categoriasNoPeriodo(
  datas: { data_inicio_campeonato: string; data_fim_campeonato: string },
  vinculos: VinculoCategoria[],
) {
  const inicio = datas.data_inicio_campeonato.slice(0, 10);
  const fim = datas.data_fim_campeonato.slice(0, 10);
  return vinculos
    .filter(({ pivot }) => {
      const entrou = pivot.data_inicio_categoria_atleta?.slice(0, 10);
      const saiu = pivot.data_fim_categoria_atleta?.slice(0, 10);
      return !saiu || (saiu >= inicio && (!entrou || entrou <= fim));
    })
    .map((vinculo) => vinculo.id_categoria);
}

/**
 * Busca o campeonato, as categorias do atleta nele (para abrir já na dele) e os jogos da
 * agenda do atleta (só esses abrem o detalhe do compromisso). A categoria mostrada é a
 * da rota (?categoria=), senão a do atleta, senão a primeira. meusSubs é null quando não
 * deu para saber as categorias do atleta: aí nenhuma fica bloqueada
 */
export function useCampeonato(id: string | undefined, categoriaDaRota?: string) {
  const [campeonato, setCampeonato] = useState<DadosCampeonato | null>(null);
  const [minhasCategorias, setMinhasCategorias] = useState<number[]>([]);
  const [vinculos, setVinculos] = useState<VinculoCategoria[] | null>(null);
  const [eventosNaAgenda, setEventosNaAgenda] = useState<number[]>([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativa = true;
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      try {
        const [resposta, respostaMeus, respostaAtleta] = await Promise.all([
          buscarComPrazo(`${API}/campeonatos/${id}`, {
            headers: { Accept: "application/json" },
          }),
          buscarComPrazo(await urlDoAtleta("/campeonatos-do-atleta"), { headers }),
          buscarComPrazo(await urlDoAtleta("/atleta"), { headers }),
        ]);

        // Token vencido, encerrado ou atleta inativado: volta para o login
        if (respostaMeus.status === 401 || respostaMeus.status === 403) {
          await AsyncStorage.multiRemove(CHAVES_SESSAO);
          router.replace("/selecao-perfil");
          return;
        }
        const json = await resposta.json();
        if (!ativa) return;
        if (resposta.status === 404) {
          setErro("Este campeonato não está mais disponível.");
          return;
        }
        if (!resposta.ok || !json.success) {
          setErro(json.message ?? "Não foi possível carregar o campeonato.");
          return;
        }

        // As abaixo são extras: sem elas as telas aparecem do mesmo jeito
        if (respostaAtleta.ok) {
          const jsonAtleta = await respostaAtleta.json();
          if (jsonAtleta.success) setVinculos(jsonAtleta.data.categorias);
        }
        if (respostaMeus.ok) {
          const jsonMeus = await respostaMeus.json();
          const meu = jsonMeus.data?.find(
            (c: { id_campeonato: number }) => c.id_campeonato === Number(id),
          );
          if (meu) {
            setMinhasCategorias([
              ...meu.convocacoes.map((c: Categoria) => c.id_categoria),
              ...meu.categorias.map((c: Categoria) => c.id_categoria),
            ]);
          }
        }
        const dados: DadosCampeonato = json.data;
        // O período retorna todos os eventos, sem depender da página da agenda.
        const respostasJogos = await Promise.all(
          periodosDosJogos(dados.jogos).map(async ({ de, ate }) => {
            const parametros = new URLSearchParams({ de, ate, tipo: "JOGO" });
            return buscarComPrazo(await urlDoAtleta(`/agenda?${parametros}`), { headers });
          }),
        );
        if (!ativa) return;
        if (respostasJogos.some((r) => r.status === 401 || r.status === 403)) {
          await AsyncStorage.multiRemove(CHAVES_SESSAO);
          router.replace("/selecao-perfil");
          return;
        }
        const eventosPorPeriodo = await Promise.all(
          respostasJogos.map(async (respostaJogos) => {
            if (!respostaJogos.ok) return [];
            const jsonJogos = await respostaJogos.json();
            return jsonJogos.success
              ? (jsonJogos.data.eventos as { id_evento: number }[])
              : [];
          }),
        );
        if (!ativa) return;
        setEventosNaAgenda([
          ...new Set(eventosPorPeriodo.flat().map((e) => e.id_evento)),
        ]);
        setCampeonato(json.data);
      } catch (e) {
        console.log("Erro ao buscar o campeonato:", e);
        if (ativa) setErro("Não foi possível conectar ao servidor.");
      }
    })();
    return () => {
      ativa = false;
    };
  }, [id]);

  const meusSubs =
    campeonato && vinculos
      ? [...minhasCategorias, ...categoriasNoPeriodo(campeonato, vinculos)]
      : null;

  const idCategoria = !campeonato
    ? null
    : (campeonato.categorias.find((cat) => String(cat.id_categoria) === categoriaDaRota)
        ?.id_categoria ??
      campeonato.categorias.find((cat) =>
        (meusSubs ?? minhasCategorias).includes(cat.id_categoria),
      )?.id_categoria ??
      campeonato.categorias[0]?.id_categoria ??
      null);

  return { campeonato, erro, idCategoria, meusSubs, eventosNaAgenda };
}

export function voltarParaCampeonatos() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/campeonatos");
  }
}
