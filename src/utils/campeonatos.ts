// Campeonato (GET /api/v1/campeonatos/{id}): tipos, placar do ponto de vista da AACJ,
// datas e a busca usada pelo detalhe e pelas telas de "ver tudo"
import { API } from "@/config/api";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export type Categoria = { id_categoria: number; rotulo: string };

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
  const casa = !!j.time_casa.da_aacj;
  const fora = !!j.time_visitante.da_aacj;
  if (!jogado(j) || casa === fora) return null;
  let nossos = casa ? j.placar_time_casa_jogos! : j.placar_time_visitante_jogos!;
  let deles = casa ? j.placar_time_visitante_jogos! : j.placar_time_casa_jogos!;
  if (nossos === deles && j.penaltis_time_casa_jogos !== null) {
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

/**
 * Busca o campeonato, as categorias do atleta nele (para abrir já na dele) e os jogos da
 * agenda do atleta (só esses abrem o detalhe do compromisso). A categoria mostrada é a
 * da rota (?categoria=), senão a do atleta, senão a primeira
 */
export function useCampeonato(id: string | undefined, categoriaDaRota?: string) {
  const [campeonato, setCampeonato] = useState<DadosCampeonato | null>(null);
  const [minhasCategorias, setMinhasCategorias] = useState<number[]>([]);
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
        const [resposta, respostaMeus, respostaJogos] = await Promise.all([
          fetch(`${API}/campeonatos/${id}`, {
            headers: { Accept: "application/json" },
          }),
          fetch(await urlDoAtleta("/campeonatos-do-atleta"), { headers }),
          fetch(await urlDoAtleta("/agenda?tipo=JOGO"), { headers }),
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

        // As duas abaixo são extras: sem elas as telas aparecem do mesmo jeito
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
        if (respostaJogos.ok) {
          const jsonJogos = await respostaJogos.json();
          const eventos = [
            ...(jsonJogos.data?.passados ?? []),
            ...(jsonJogos.data?.proximos ?? []),
          ];
          setEventosNaAgenda(eventos.map((e: { id_evento: number }) => e.id_evento));
        }
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

  const idCategoria = !campeonato
    ? null
    : (campeonato.categorias.find((cat) => String(cat.id_categoria) === categoriaDaRota)
        ?.id_categoria ??
      campeonato.categorias.find((cat) => minhasCategorias.includes(cat.id_categoria))
        ?.id_categoria ??
      campeonato.categorias[0]?.id_categoria ??
      null);

  return { campeonato, erro, idCategoria, eventosNaAgenda };
}

export function voltarParaCampeonatos() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/campeonatos");
  }
}
