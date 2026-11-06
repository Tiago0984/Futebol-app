import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import agendaStyle from "@/styles/agendaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";
import {
  abrirDetalhe,
  jaTerminou,
  temDetalhe,
  visualDoTipo,
} from "@/utils/eventos";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Só os campos de um evento de GET /api/v1/agenda usados nesta tela
type Evento = {
  id_evento: number;
  titulo: string;
  tipo: string;
  descricao: string | null;
  categoria: string | null;
  data: string;
  horario_inicio: string | null;
  inicio: string | null;
  fim: string | null;
  local: string | null;
  situacao: "CONFIRMADO" | "CANCELADO";
  concluido?: boolean;
  // Quem conduz a atividade; quando vem, aparece no lugar da categoria.
  // Servidor sem o detalhe do evento não manda o campo
  responsavel?: string | null;
  jogo: { horario_chegada: string | null } | null;
};

type RespostaAgenda = {
  proximos: Evento[];
  passados: Evento[];
  paginacao: { pagina_atual: number; ultima_pagina: number };
  // Quantos próximos existem de cada tipo, somando todas as páginas
  // (servidor antigo não manda: aí a contagem usa só o que já carregou)
  totais?: Record<string, number>;
};

// Um botão por tipo da API; tipo null = Todos
const filtros: { rotulo: string; tipo: string | null }[] = [
  { rotulo: "Todos", tipo: null },
  { rotulo: "Treinos", tipo: "TREINO" },
  { rotulo: "Jogos", tipo: "JOGO" },
  { rotulo: "Campeonatos", tipo: "CAMPEONATO" },
  { rotulo: "Avaliações", tipo: "AVALIACAO" },
  { rotulo: "Reuniões", tipo: "REUNIAO" },
  { rotulo: "Eventos", tipo: "EVENTO" },
  { rotulo: "Confraternizações", tipo: "CONFRATERNIZACAO" },
];

// A API só manda CONFIRMADO ou CANCELADO; mudanças chegam pelos avisos.
// Concluído é o confirmado que já terminou
type Status = "confirmado" | "cancelado" | "concluido";

const statusConfig: Record<
  Status,
  { texto: string; cor: string; corFundo: string; icone: any }
> = {
  confirmado: {
    texto: "Confirmado",
    cor: cores.verde,
    corFundo: cores.verdeclaro,
    icone: require("@/assets/images/img/checkBranco.png"),
  },
  cancelado: {
    texto: "Cancelado",
    cor: cores.vermelho,
    corFundo: cores.vermelho20,
    icone: require("@/assets/images/img/xBranco.png"),
  },
  concluido: {
    texto: "Concluído",
    cor: cores.verde,
    corFundo: cores.verdeclaro,
    icone: require("@/assets/images/img/checkBranco.png"),
  },
};

// A API manda os 3 últimos concluídos
const QUANTIDADE_PASSADOS = 3;

// Espaço entre os filtros e o primeiro item da timeline
const ESPACO_TOPO_LISTA = 10;
// Tempo de uma rolagem animada feita pelo app (scrollTo), com folga
const DURACAO_ROLAGEM_DO_APP = 800;

// O cabeçalho para de acompanhar a rolagem até a animação do app terminar
function pausarCabecalho(pausaAte: { current: number }) {
  pausaAte.current = Date.now() + DURACAO_ROLAGEM_DO_APP;
}

function cabecalhoPausado(pausaAte: { current: number }) {
  return Date.now() < pausaAte.current;
}

// Largura de cada dia na faixa e o espaço nas pontas dela
const LARGURA_DIA_FAIXA = 48;
const MARGEM_FAIXA = 8;

const SIGLAS_DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
// O calendário começa na segunda, como a semana da agenda
const SIGLAS_CALENDARIO = ["S", "T", "Q", "Q", "S", "S", "D"];
const NOMES_DIAS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];
const MESES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

// Dia do aparelho no mesmo formato da API: "2026-11-03"
function chaveDoDia(data: Date) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

// "2026-11-03T00:00:00-03:00" -> "2026-11-03"
// Recorta o texto (já vem no horário de Brasília) para o fuso do aparelho não trocar o dia
function chaveDoEvento(evento: Evento) {
  return evento.data.slice(0, 10);
}

function somarDias(data: Date, dias: number) {
  const nova = new Date(data);
  nova.setDate(data.getDate() + dias);
  return nova;
}

// "Hoje", "Amanhã", "Ontem" ou "Segunda · 03/11"
function rotuloDoDia(chave: string, hoje: Date) {
  if (chave === chaveDoDia(hoje)) return "Hoje";
  if (chave === chaveDoDia(somarDias(hoje, 1))) return "Amanhã";
  if (chave === chaveDoDia(somarDias(hoje, -1))) return "Ontem";
  const [ano, mes, dia] = chave.split("-").map(Number);
  const diaDaSemana = new Date(ano, mes - 1, dia).getDay();
  return `${NOMES_DIAS[diaDaSemana]} · ${chave.slice(8, 10)}/${chave.slice(5, 7)}`;
}

// "2026-11-03" -> data local do aparelho (sem passar por fuso)
function dataDaChave(chave: string) {
  const [ano, mes, dia] = chave.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

// Do dia 1 ao último dia do mês de "data" (dia 0 do mês seguinte = último deste)
function diasDoMes(data: Date) {
  const ano = data.getFullYear();
  const mes = data.getMonth();
  const total = new Date(ano, mes + 1, 0).getDate();
  return Array.from({ length: total }, (_, i) => {
    const dia = new Date(ano, mes, i + 1);
    return {
      sigla: SIGLAS_DIAS[dia.getDay()],
      numero: i + 1,
      chave: chaveDoDia(dia),
    };
  });
}

function statusDoEvento(evento: Evento, passado = false): Status {
  if (evento.situacao === "CANCELADO") return "cancelado";
  return passado ? "concluido" : "confirmado";
}

// Linha de informação de pessoa: o responsável quando a API mandar; até lá, a categoria
function pessoaOuCategoria(evento: Evento) {
  return evento.responsavel ?? evento.categoria;
}

// Cada linha da timeline; o "dia" é o cabeçalho de data entre os compromissos
type Linha =
  | { tipo: "dia"; chave: string }
  | { tipo: "evento"; evento: Evento; passado: boolean }
  | { tipo: "proximo"; evento: Evento };

function chaveDaLinha(linha: Linha) {
  return linha.tipo === "dia" ? linha.chave : chaveDoEvento(linha.evento);
}

function idDaLinha(linha: Linha) {
  if (linha.tipo === "dia") return `dia-${linha.chave}`;
  if (linha.tipo === "proximo") return "proximo";
  return `evento-${linha.evento.id_evento}`;
}

export default function Agenda() {
  const insets = useSafeAreaInsets();
  const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null);
  const [passadosApi, setPassadosApi] = useState<Evento[]>([]);
  const [proximosApi, setProximosApi] = useState<Evento[]>([]);
  const [pagina, setPagina] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);
  const [totais, setTotais] = useState<Record<string, number> | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState("");
  const [agora, setAgora] = useState(() => new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(() =>
    chaveDoDia(new Date()),
  );
  // Dia tocado na faixa ou no calendário: a lista mostra só ele; null = lista completa
  const [diaFiltrado, setDiaFiltrado] = useState<string | null>(null);
  // Eventos do mês visível (GET /agenda?de=&ate=). Traz os que já passaram, que a
  // lista completa não tem (só os 3 últimos), e por isso diz quais dias estão vazios
  const [mesApi, setMesApi] = useState<{
    inicio: string;
    eventos: Evento[];
    erro?: string;
  } | null>(null);

  const [calendarioAberto, setCalendarioAberto] = useState(false);

  const dataSelecionada = dataDaChave(diaSelecionado);
  const diasDaFaixa = diasDoMes(dataSelecionada);
  const primeiroDoMes = diasDaFaixa[0].chave;
  const ultimoDoMes = diasDaFaixa[diasDaFaixa.length - 1].chave;
  const chaveHoje = chaveDoDia(agora);

  const { width: larguraTela } = useWindowDimensions();
  // Onde a faixa fica com o dia selecionado no meio, sem passar das pontas
  const fimDaFaixa =
    diasDaFaixa.length * LARGURA_DIA_FAIXA + MARGEM_FAIXA * 2 - larguraTela;
  const xDoDia = Math.max(
    0,
    Math.min(
      fimDaFaixa,
      MARGEM_FAIXA +
        (dataSelecionada.getDate() - 0.5) * LARGURA_DIA_FAIXA -
        larguraTela / 2,
    ),
  );

  const faixaRef = useRef<ScrollView>(null);
  const listaRef = useRef<ScrollView>(null);
  // Posição (y) de cada linha na lista, para o cabeçalho seguir o dia que está no topo
  const posicoes = useRef<Record<string, number>>({});
  // Enquanto a lista rola sozinha (volta para hoje), o
  // cabeçalho não acompanha a rolagem, para não passar pelos dias do caminho
  const ignorarRolagemAte = useRef(0);

  // Guarda onde cada linha ficou
  const registrarPosicao = useCallback((id: string, y: number) => {
    posicoes.current[id] = y;
  }, []);
  // Evita pedir a mesma página duas vezes enquanto a rolagem dispara vários eventos
  const buscandoMais = useRef(false);

  // A faixa acompanha o dia selecionado, inclusive quando ele muda rolando a lista
  useEffect(() => {
    faixaRef.current?.scrollTo({ x: xDoDia, animated: true });
  }, [xDoDia]);

  // Atualiza o horário na virada do minuto: o que termina sai do "próximo" sozinho
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const agendar = () => {
      const atual = new Date();
      const msAteVirada =
        (60 - atual.getSeconds()) * 1000 - atual.getMilliseconds();
      timeout = setTimeout(() => {
        setAgora(new Date());
        agendar();
      }, msAteVirada);
    };
    agendar();
    return () => clearTimeout(timeout);
  }, []);

  // Busca a agenda; null quando a sessão acabou ou deu erro (a mensagem vai para aoFalhar)
  async function buscarAgenda<T>(
    consulta: string,
    aoFalhar: (mensagem: string) => void,
  ): Promise<T | null> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return null;
    }
    const resposta = await fetch(await urlDoAtleta(`/agenda?${consulta}`), {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Token vencido, encerrado ou atleta inativado: volta para o login
    if (resposta.status === 401 || resposta.status === 403) {
      await AsyncStorage.multiRemove(CHAVES_SESSAO);
      router.replace("/selecao-perfil");
      return null;
    }

    const json = await resposta.json();
    if (!resposta.ok || !json.success) {
      aoFalhar(json.message ?? "Não foi possível carregar a agenda.");
      return null;
    }
    return json.data;
  }

  // Recarrega a primeira página sempre que a tela volta a aparecer
  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      (async () => {
        try {
          const dados = await buscarAgenda<RespostaAgenda>("page=1", setErro);
          if (!ativa || !dados) return;
          setErro("");
          setPassadosApi(dados.passados);
          setProximosApi(dados.proximos);
          setPagina(dados.paginacao.pagina_atual);
          setUltimaPagina(dados.paginacao.ultima_pagina);
          setTotais(dados.totais ?? null);
          setAgora(new Date());
        } catch (e) {
          console.log("Erro ao buscar a agenda:", e);
          if (ativa) setErro("Não foi possível conectar ao servidor.");
        } finally {
          if (ativa) setCarregando(false);
        }
      })();
      return () => {
        ativa = false;
      };
    }, []),
  );

  // Busca os eventos do mês visível ao abrir a tela e a cada troca de mês
  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      const falhar = (erro: string) => {
        if (ativa) setMesApi({ inicio: primeiroDoMes, eventos: [], erro });
      };
      (async () => {
        try {
          const dados = await buscarAgenda<{ eventos: Evento[] }>(
            `de=${primeiroDoMes}&ate=${ultimoDoMes}`,
            falhar,
          );
          if (ativa && dados) {
            setMesApi({ inicio: primeiroDoMes, eventos: dados.eventos });
          }
        } catch (e) {
          console.log("Erro ao buscar o mês:", e);
          falhar("Não foi possível conectar ao servidor.");
        }
      })();
      return () => {
        ativa = false;
      };
    }, [primeiroDoMes, ultimoDoMes]),
  );

  // Busca as próximas páginas até ter compromissos até o dia "ate"
  // (a API manda 20 por página, do mais perto ao mais longe), no máximo "limite" páginas
  async function carregarAte(ate: string, limite = Infinity) {
    if (buscandoMais.current || pagina >= ultimaPagina) return;
    buscandoMais.current = true;
    setCarregandoMais(true);
    let paginaAtual = pagina;
    let ultima = ultimaPagina;
    let ultimoDia = ultimoCarregado;
    let buscadas = 0;
    try {
      while (ultimoDia < ate && paginaAtual < ultima && buscadas < limite) {
        const dados = await buscarAgenda<RespostaAgenda>(
          `page=${paginaAtual + 1}`,
          setErro,
        );
        if (!dados) break;
        buscadas++;
        // Sem repetir evento que já está na lista
        setProximosApi((atuais) => [
          ...atuais,
          ...dados.proximos.filter(
            (novo) => !atuais.some((e) => e.id_evento === novo.id_evento),
          ),
        ]);
        paginaAtual = dados.paginacao.pagina_atual;
        ultima = dados.paginacao.ultima_pagina;
        if (dados.proximos.length === 0) break;
        ultimoDia = chaveDoEvento(dados.proximos[dados.proximos.length - 1]);
      }
    } catch (e) {
      console.log("Erro ao buscar mais compromissos:", e);
    } finally {
      setPagina(paginaAtual);
      setUltimaPagina(ultima);
      buscandoMais.current = false;
      setCarregandoMais(false);
    }
  }

  // Perto do fim da lista, busca a próxima página. Rolando com o dedo, o mês e o
  // dia do topo passam a ser os do dia que está no alto da lista
  function aoRolar(e: NativeSyntheticEvent<NativeScrollEvent>) {
    // A lista de um dia já está completa e o dia selecionado não muda rolando
    if (diaFiltrado) return;
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const pertoDoFim =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
    if (pertoDoFim) carregarAte("9999-12-31", 1);
    if (cabecalhoPausado(ignorarRolagemAte)) return;

    // Última linha que já passou do topo (as linhas estão em ordem de posição)
    const topo = contentOffset.y + ESPACO_TOPO_LISTA + 1;
    let chaveNoTopo: string | null = null;
    for (const linha of linhas) {
      const y = posicoes.current[idDaLinha(linha)];
      if (y === undefined) continue;
      if (y > topo) break;
      chaveNoTopo = chaveDaLinha(linha);
    }
    if (chaveNoTopo && chaveNoTopo !== diaSelecionado) {
      setDiaSelecionado(chaveNoTopo);
    }
  }

  // O dedo na lista volta a mandar no cabeçalho, mesmo no meio de uma rolagem do app
  function aoComecarArrastar() {
    ignorarRolagemAte.current = 0;
  }

  const ultimoCarregado =
    proximosApi.length > 0
      ? chaveDoEvento(proximosApi[proximosApi.length - 1])
      : "";

  // O que a API mandou como próximo e terminou depois que a tela abriu vira passado
  const proximosAbertos = proximosApi.filter((e) => !jaTerminou(e, agora));
  const terminadosAgora = proximosApi.filter(
    (e) => jaTerminou(e, agora) && e.situacao !== "CANCELADO",
  );
  // A API manda os passados do mais recente para o mais antigo; aqui ficam em ordem.
  // A lista completa começa em hoje: os de dias anteriores só aparecem tocando no dia
  const todosPassados = [...passadosApi]
    .reverse()
    .concat(terminadosAgora)
    .filter((e) => chaveDoEvento(e) === chaveHoje);

  const combinaCom = (tipo: string | null) => (e: Evento) =>
    tipo === null || e.tipo === tipo;

  function contarCompromissos(tipo: string | null) {
    // Com um dia tocado, os contadores são só desse dia
    if (diaFiltrado) {
      return (eventosDoMes ?? []).filter(
        (e) => chaveDoEvento(e) === diaFiltrado && combinaCom(tipo)(e),
      ).length;
    }
    const passadosNaTela = todosPassados
      .filter(combinaCom(tipo))
      .slice(-QUANTIDADE_PASSADOS).length;
    if (!totais) {
      return passadosNaTela + proximosAbertos.filter(combinaCom(tipo)).length;
    }
    // totais vem da API ao abrir a tela e já conta as páginas que ainda não vieram;
    // tira os carregados que terminaram depois disso (viraram passados ou sumiram)
    const totalDaApi =
      tipo === null
        ? Object.values(totais).reduce((soma, n) => soma + n, 0)
        : (totais[tipo] ?? 0);
    const terminadosDepois = proximosApi.filter(
      (e) => jaTerminou(e, agora) && combinaCom(tipo)(e),
    ).length;
    return passadosNaTela + totalDaApi - terminadosDepois;
  }

  const abertos = proximosAbertos.filter(combinaCom(filtroAtivo));
  // Próximo = primeiro que ainda não terminou e não foi cancelado
  const proximo = abertos.find((e) => e.situacao !== "CANCELADO") ?? null;

  // null enquanto o mês não chegou ou se a busca falhou: ainda não se sabe o que é vazio.
  // A bolinha e o "×" valem para qualquer compromisso, seja qual for o filtro de tipo
  const eventosDoMes =
    mesApi?.inicio === primeiroDoMes && !mesApi.erro
      ? mesApi.eventos
      : null;
  const diasComCompromisso = new Set(eventosDoMes?.map(chaveDoEvento));
  const eventosDoDia = (eventosDoMes ?? []).filter(
    (e) => chaveDoEvento(e) === diaFiltrado && combinaCom(filtroAtivo)(e),
  );

  // Com um dia tocado, a lista são só os compromissos dele
  const passados = diaFiltrado
    ? eventosDoDia.filter((e) => jaTerminou(e, agora))
    : todosPassados.filter(combinaCom(filtroAtivo)).slice(-QUANTIDADE_PASSADOS);
  const pendentes = diaFiltrado
    ? eventosDoDia.filter((e) => !jaTerminou(e, agora))
    : abertos;

  // Monta a timeline com um cabeçalho a cada dia novo, em ordem de data. Um cancelado
  // antes do próximo fica antes do card; o card do próximo já mostra o dia dele
  const linhas: Linha[] = [];
  let diaAnterior = "";
  for (const evento of passados) {
    if (chaveDoEvento(evento) !== diaAnterior) {
      diaAnterior = chaveDoEvento(evento);
      linhas.push({ tipo: "dia", chave: diaAnterior });
    }
    linhas.push({ tipo: "evento", evento, passado: true });
  }
  for (const evento of pendentes) {
    if (evento.id_evento === proximo?.id_evento) {
      linhas.push({ tipo: "proximo", evento });
      diaAnterior = chaveDoEvento(evento);
      continue;
    }
    if (chaveDoEvento(evento) !== diaAnterior) {
      diaAnterior = chaveDoEvento(evento);
      linhas.push({ tipo: "dia", chave: diaAnterior });
    }
    linhas.push({ tipo: "evento", evento, passado: false });
  }


  // Sai da lista de um dia: a lista completa remonta e as posições são medidas de novo
  function voltarParaListaCompleta() {
    if (!diaFiltrado) return;
    setDiaFiltrado(null);
    posicoes.current = {};
  }

  // "Voltar para hoje" do calendário e volta para o mês de hoje: a lista volta ao começo
  function irParaHoje() {
    voltarParaListaCompleta();
    setDiaSelecionado(chaveHoje);
    pausarCabecalho(ignorarRolagemAte);
    listaRef.current?.scrollTo({ y: 0, animated: true });
  }

  // Toque num dia da faixa: a lista mostra só ele; tocar de novo volta para a completa
  function selecionarDia(chave: string) {
    if (chave === diaFiltrado) {
      irParaHoje();
      return;
    }
    posicoes.current = {};
    setDiaFiltrado(chave);
    setDiaSelecionado(chave);
  }

  // Abre o mês no mesmo dia de hoje, tendo compromisso ou não; no mês de hoje, volta para hoje
  function trocarMes(direcao: 1 | -1) {
    const ano = dataSelecionada.getFullYear();
    const mes = dataSelecionada.getMonth() + direcao;
    if (chaveDoDia(new Date(ano, mes, 1)).slice(0, 7) === chaveHoje.slice(0, 7)) {
      irParaHoje();
      return;
    }
    // Mês mais curto (hoje é 31, mês de 30): dia 0 do mês seguinte = último dia deste
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const dia = chaveDoDia(new Date(ano, mes, Math.min(agora.getDate(), ultimoDia)));
    posicoes.current = {};
    setDiaFiltrado(dia);
    setDiaSelecionado(dia);
  }

  function trocarFiltro(tipo: string | null) {
    setFiltroAtivo(tipo);
    // A lista remonta com o filtro novo, volta ao começo e as posições são
    // medidas de novo; o dia e o mês voltam para hoje junto com ela
    posicoes.current = {};
    // Com um dia tocado, o filtro vale dentro dele
    if (!diaFiltrado) setDiaSelecionado(chaveHoje);
  }

  let conteudo;
  if (carregando) {
    conteudo = <Text style={agendaStyle.estadoTexto}>Carregando agenda...</Text>;
  } else if (diaFiltrado && !eventosDoMes) {
    conteudo = (
      <Text style={agendaStyle.estadoTexto}>
        {mesApi?.inicio === primeiroDoMes
          ? mesApi.erro
          : "Carregando agenda..."}
      </Text>
    );
  } else if (diaFiltrado && linhas.length === 0) {
    conteudo = (
      <Text style={agendaStyle.estadoTexto}>
        {filtroAtivo
          ? "Nenhum compromisso desse tipo neste dia."
          : "Nenhum compromisso neste dia."}
      </Text>
    );
  } else if (erro && linhas.length === 0) {
    conteudo = <Text style={agendaStyle.estadoTexto}>{erro}</Text>;
  } else if (linhas.length === 0) {
    conteudo = (
      <Text style={agendaStyle.estadoTexto}>Nenhum compromisso por aqui.</Text>
    );
  } else {
    conteudo = linhas.map((linha, index) => {
      const id = idDaLinha(linha);
      const temDepois = index < linhas.length - 1;
      const primeira = index === 0;

      if (linha.tipo === "dia") {
        return (
          <LinhaMedida
            key={id}
            id={id}
            aoMedir={registrarPosicao}
            style={primeira && { paddingTop: ESPACO_TOPO_LISTA }}
          >
            <CabecalhoDia
              rotulo={rotuloDoDia(linha.chave, agora)}
              comLinha={temDepois}
              primeira={primeira}
            />
          </LinhaMedida>
        );
      }

      if (linha.tipo === "proximo") {
        return (
          <LinhaMedida
            key={id}
            id={id}
            aoMedir={registrarPosicao}
          >
            {!primeira && <Conector />}
            <CardProximo
              evento={linha.evento}
              rotuloDia={rotuloDoDia(chaveDoEvento(linha.evento), agora)}
              colado={!primeira}
            />
            {temDepois && <Conector />}
          </LinhaMedida>
        );
      }

      return (
        <LinhaMedida
          key={id}
          id={id}
          aoMedir={registrarPosicao}
          style={[
            agendaStyle.timelineSection,
            primeira && { paddingTop: ESPACO_TOPO_LISTA },
          ]}
        >
          <ItemTimeline
            evento={linha.evento}
            passado={linha.passado}
            comLinha={temDepois}
          />
        </LinhaMedida>
      );
    });
  }

  return (
    <View style={[fundoStyle.container, { paddingTop: insets.top }]}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="stretch"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <View style={agendaStyle.header}>
        <View style={agendaStyle.headerTopRow}>
          <Pressable
            style={agendaStyle.backButton}
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={agendaStyle.backChevron}>‹</Text>
          </Pressable>
          <View style={agendaStyle.headerTitleCol}>
            <Text style={agendaStyle.screenTitle}>Agenda</Text>
            <Text style={agendaStyle.screenSubtitle}>
              Sua programação esportiva
            </Text>
          </View>
          <View style={agendaStyle.headerIconsRow}>
            <BotaoNotificacoes abaAtiva="agenda" />
          </View>
        </View>

        {/* O mês acompanha o dia selecionado */}
        <View style={agendaStyle.monthNavRow}>
          <View style={agendaStyle.monthNavLeft}>
            <Pressable
              onPress={() => trocarMes(-1)}
              hitSlop={8}
              accessibilityLabel="Mês anterior"
            >
              <Text style={agendaStyle.monthChevron}>‹</Text>
            </Pressable>
            <Text style={agendaStyle.monthText}>
              {MESES[dataSelecionada.getMonth()]} {dataSelecionada.getFullYear()}
            </Text>
            <Pressable
              onPress={() => trocarMes(1)}
              hitSlop={8}
              accessibilityLabel="Próximo mês"
            >
              <Text style={agendaStyle.monthChevron}>›</Text>
            </Pressable>
          </View>
          <View style={agendaStyle.monthNavRight}>
            <Pressable
              style={agendaStyle.calendarButton}
              onPress={() => setCalendarioAberto(true)}
              accessibilityLabel="Abrir calendário"
            >
              <Image
                source={require("@/assets/images/img/agendaBranca.png")}
                style={agendaStyle.calendarButtonIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Mês do dia selecionado, do dia 1 ao último: bolinha nos dias com compromisso, "×" nos vazios; o toque mostra só o dia */}
      <ScrollView
        ref={faixaRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={agendaStyle.weekStrip}
        contentContainerStyle={agendaStyle.weekStripConteudo}
        onContentSizeChange={() =>
          faixaRef.current?.scrollTo({ x: xDoDia, animated: false })
        }
      >
        {diasDaFaixa.map((dia) => {
          const ativo = dia.chave === diaSelecionado;
          const temCompromisso = diasComCompromisso.has(dia.chave);
          return (
            <Pressable
              key={dia.chave}
              style={agendaStyle.weekDayCol}
              onPress={() => selecionarDia(dia.chave)}
            >
              <Text style={agendaStyle.weekDayLabel}>{dia.sigla}</Text>
              <View
                style={[
                  agendaStyle.weekDayCircle,
                  ativo && agendaStyle.weekDayCircleActive,
                ]}
              >
                <Text
                  style={[
                    agendaStyle.weekDayNumber,
                    ativo && agendaStyle.weekDayNumberActive,
                  ]}
                >
                  {dia.numero}
                </Text>
              </View>
              {eventosDoMes && !temCompromisso ? (
                <Text style={agendaStyle.weekDayX}>×</Text>
              ) : (
                <View
                  style={[
                    agendaStyle.weekDayDot,
                    !temCompromisso && agendaStyle.weekDayDotVazio,
                  ]}
                />
              )}
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={agendaStyle.filterScroll}
        contentContainerStyle={agendaStyle.filterRow}
      >
        {filtros.map((filtro) => {
          const ativo = filtro.tipo === filtroAtivo;
          return (
            <Pressable
              key={filtro.rotulo}
              style={[
                agendaStyle.filterPill,
                ativo && agendaStyle.filterPillActive,
              ]}
              onPress={() => trocarFiltro(filtro.tipo)}
            >
              <Text style={agendaStyle.filterPillText}>{filtro.rotulo}</Text>
              <Text style={agendaStyle.filterPillCount}>
                {contarCompromissos(filtro.tipo)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Só a timeline rola; cabeçalho, dias e filtros ficam fixos.
          A key remonta a lista ao trocar de filtro ou de dia, voltando ao topo */}
      <ScrollView
        key={`${filtroAtivo ?? "TODOS"}-${diaFiltrado ?? "TUDO"}`}
        ref={listaRef}
        style={{ flex: 1 }}
        contentContainerStyle={agendaStyle.scrollContent}
        onScroll={aoRolar}
        onScrollBeginDrag={aoComecarArrastar}
        scrollEventThrottle={100}
      >
        {conteudo}
        {carregandoMais && (
          <Text style={agendaStyle.estadoTexto}>Carregando mais...</Text>
        )}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="agenda" />

      <CalendarioModal
        visivel={calendarioAberto}
        dias={diasDaFaixa}
        titulo={`${MESES[dataSelecionada.getMonth()]} ${dataSelecionada.getFullYear()}`}
        diasComCompromisso={diasComCompromisso}
        mesCarregado={eventosDoMes !== null}
        diaFiltrado={diaFiltrado}
        chaveHoje={chaveHoje}
        aoTrocarMes={trocarMes}
        aoEscolher={(chave) => {
          setCalendarioAberto(false);
          if (chave !== diaFiltrado) selecionarDia(chave);
        }}
        aoVoltarParaHoje={() => {
          setCalendarioAberto(false);
          irParaHoje();
        }}
        aoFechar={() => setCalendarioAberto(false)}
      />
    </View>
  );
}

// Calendário do mês aberto pelo botão da agenda; as setas trocam o mês da tela junto
function CalendarioModal({
  visivel,
  dias,
  titulo,
  diasComCompromisso,
  mesCarregado,
  diaFiltrado,
  chaveHoje,
  aoTrocarMes,
  aoEscolher,
  aoVoltarParaHoje,
  aoFechar,
}: {
  visivel: boolean;
  dias: { numero: number; chave: string }[];
  titulo: string;
  diasComCompromisso: Set<string>;
  mesCarregado: boolean;
  diaFiltrado: string | null;
  chaveHoje: string;
  aoTrocarMes: (direcao: 1 | -1) => void;
  aoEscolher: (chave: string) => void;
  aoVoltarParaHoje: () => void;
  aoFechar: () => void;
}) {
  // Casas vazias antes do dia 1, para ele cair na coluna do dia da semana certo
  const vazios = (dataDaChave(dias[0].chave).getDay() + 6) % 7;

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="fade"
      onRequestClose={aoFechar}
    >
      <View style={agendaStyle.calendarioContainer}>
        <Pressable style={agendaStyle.calendarioFundo} onPress={aoFechar} />

        <View style={agendaStyle.calendarioCard}>
          <View style={agendaStyle.calendarioTopo}>
            <Pressable
              onPress={() => aoTrocarMes(-1)}
              hitSlop={8}
              accessibilityLabel="Mês anterior"
            >
              <Text style={agendaStyle.monthChevron}>‹</Text>
            </Pressable>
            <Text style={agendaStyle.monthText}>{titulo}</Text>
            <Pressable
              onPress={() => aoTrocarMes(1)}
              hitSlop={8}
              accessibilityLabel="Próximo mês"
            >
              <Text style={agendaStyle.monthChevron}>›</Text>
            </Pressable>
          </View>

          <View style={agendaStyle.calendarioGrade}>
            {SIGLAS_CALENDARIO.map((sigla, index) => (
              <Text key={index} style={agendaStyle.calendarioSigla}>
                {sigla}
              </Text>
            ))}
            {Array.from({ length: vazios }, (_, index) => (
              <View key={index} style={agendaStyle.calendarioCasa} />
            ))}
            {dias.map((dia) => {
              const ativo = dia.chave === diaFiltrado;
              const temCompromisso = diasComCompromisso.has(dia.chave);
              return (
                <Pressable
                  key={dia.chave}
                  style={agendaStyle.calendarioCasa}
                  onPress={() => aoEscolher(dia.chave)}
                  accessibilityLabel={`Dia ${dia.numero}`}
                >
                  <View
                    style={[
                      agendaStyle.calendarioDia,
                      dia.chave === chaveHoje && agendaStyle.calendarioDiaHoje,
                      ativo && agendaStyle.weekDayCircleActive,
                    ]}
                  >
                    <Text style={agendaStyle.calendarioNumero}>{dia.numero}</Text>
                  </View>
                  {mesCarregado && !temCompromisso ? (
                    <Text style={agendaStyle.calendarioX}>×</Text>
                  ) : (
                    <View
                      style={[
                        agendaStyle.calendarioBolinha,
                        !temCompromisso && agendaStyle.weekDayDotVazio,
                      ]}
                    />
                  )}
                </Pressable>
              );
            })}
          </View>

          <Pressable
            style={agendaStyle.calendarioHoje}
            onPress={aoVoltarParaHoje}
          >
            <Text style={agendaStyle.calendarioHojeTexto}>Voltar para hoje</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// Linha da lista que avisa onde ficou (y), para o cabeçalho seguir o dia do topo
function LinhaMedida({
  id,
  aoMedir,
  style,
  children,
}: {
  id: string;
  aoMedir: (id: string, y: number) => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  return (
    <View
      style={style}
      onLayout={(e) => aoMedir(id, e.nativeEvent.layout.y)}
    >
      {children}
    </View>
  );
}

// Trecho da linha vertical que liga a timeline ao card do próximo compromisso
function Conector() {
  return (
    <View style={agendaStyle.timelineConnector}>
      <View style={agendaStyle.timelineConnectorSpacer} />
      <View style={agendaStyle.timelineConnectorRail}>
        <View style={agendaStyle.timelineConnectorLine} />
      </View>
    </View>
  );
}

// Data entre os compromissos ("Hoje", "Segunda · 03/11"), com a linha da timeline passando
function CabecalhoDia({
  rotulo,
  comLinha,
  primeira,
}: {
  rotulo: string;
  comLinha: boolean;
  primeira: boolean;
}) {
  return (
    <View style={agendaStyle.diaCabecalho}>
      <View style={agendaStyle.timelineConnectorSpacer} />
      <View style={agendaStyle.timelineConnectorRail}>
        {comLinha && (
          <View
            style={[
              agendaStyle.timelineConnectorLine,
              // No primeiro cabeçalho a linha começa no meio do texto, não acima dele
              primeira && agendaStyle.diaCabecalhoLinhaInicio,
            ]}
          />
        )}
      </View>
      <Text style={agendaStyle.diaCabecalhoTexto}>{rotulo}</Text>
    </View>
  );
}

function CardProximo({
  evento,
  rotuloDia,
  colado,
}: {
  evento: Evento;
  rotuloDia: string;
  colado: boolean;
}) {
  const visual = visualDoTipo(evento.tipo);
  const status = statusConfig[statusDoEvento(evento)];
  const pessoa = pessoaOuCategoria(evento);
  const chegada = evento.jogo?.horario_chegada;
  const comDetalhe = temDetalhe(evento);

  return (
    <Pressable
      style={[agendaStyle.nextCard, colado && { marginTop: 0 }]}
      onPress={() => abrirDetalhe(evento.id_evento)}
      disabled={!comDetalhe}
    >
      <Text style={agendaStyle.nextCardLabel}>
        Próximo compromisso · {rotuloDia}
      </Text>
      <View style={agendaStyle.nextCardTopRow}>
        <View style={agendaStyle.nextCardMainRow}>
          <View
            style={[
              agendaStyle.nextCardIconSquare,
              { backgroundColor: visual.cor },
            ]}
          >
            <Image
              source={visual.icone}
              style={agendaStyle.nextCardIcon}
              resizeMode="contain"
            />
          </View>
          <View style={agendaStyle.nextCardTextCol}>
            <Text style={agendaStyle.nextCardTime} numberOfLines={1}>
              {evento.horario_inicio ?? "A definir"}
            </Text>
            <Text
              style={agendaStyle.nextCardTitle}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {evento.titulo}
            </Text>
            {evento.local && (
              <View style={agendaStyle.nextCardInfoRow}>
                <Image
                  source={require("@/assets/images/img/localizacaoPreto.png")}
                  style={agendaStyle.nextCardInfoIcon}
                  resizeMode="contain"
                />
                <Text
                  style={agendaStyle.nextCardInfoText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {evento.local}
                </Text>
              </View>
            )}
            {pessoa && (
              <View style={agendaStyle.nextCardInfoRow}>
                <Image
                  source={require("@/assets/images/img/userPreto.png")}
                  style={agendaStyle.nextCardInfoIcon}
                  resizeMode="contain"
                />
                <Text
                  style={agendaStyle.nextCardInfoText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.7}
                >
                  {pessoa}
                </Text>
              </View>
            )}
            {chegada && (
              <Text style={agendaStyle.nextCardChegada}>
                Chegar às {chegada}
              </Text>
            )}
          </View>
        </View>
        <View style={agendaStyle.nextCardSide}>
          <View
            style={[
              agendaStyle.nextConfirmedPill,
              { backgroundColor: status.corFundo },
            ]}
          >
            <View
              style={[
                agendaStyle.nextStatusIconCircle,
                { backgroundColor: status.cor },
              ]}
            >
              <Image
                source={status.icone}
                style={agendaStyle.statusIconGlyph}
                resizeMode="contain"
              />
            </View>
            <Text style={[agendaStyle.nextConfirmedText, { color: status.cor }]}>
              {status.texto}
            </Text>
          </View>
          {comDetalhe && (
            <Text style={agendaStyle.nextDetailsLink}>Ver detalhes {">"}</Text>
          )}
        </View>
      </View>
      {evento.descricao && (
        <Text style={agendaStyle.nextCardDescricao} numberOfLines={3}>
          {evento.descricao}
        </Text>
      )}
    </Pressable>
  );
}

function ItemTimeline({
  evento,
  comLinha,
  passado = false,
}: {
  evento: Evento;
  comLinha: boolean;
  passado?: boolean;
}) {
  const visual = visualDoTipo(evento.tipo);
  const status = statusConfig[statusDoEvento(evento, passado)];
  const pessoa = pessoaOuCategoria(evento);
  const chegada = evento.jogo?.horario_chegada;

  // Toque no item abre o detalhe (servidor sem o detalhe: não faz nada)
  return (
    <Pressable
      style={agendaStyle.timelineItem}
      onPress={() => abrirDetalhe(evento.id_evento)}
      disabled={!temDetalhe(evento)}
    >
      <View style={agendaStyle.timelineTimeCol}>
        {/* Sem horário: "--:--" (o "A definir" não cabe nesta coluna) */}
        <Text
          style={[agendaStyle.timelineTime, passado && agendaStyle.passado]}
        >
          {evento.horario_inicio ?? "--:--"}
        </Text>
      </View>
      <View style={agendaStyle.timelineLineCol}>
        {comLinha && <View style={agendaStyle.timelineLine} />}
        <View
          style={[
            agendaStyle.timelineDot,
            { backgroundColor: status.cor },
            passado && agendaStyle.passado,
          ]}
        />
      </View>
      <View
        style={[
          agendaStyle.timelineItemContent,
          passado && agendaStyle.passado,
        ]}
      >
        <View
          style={[
            agendaStyle.timelineIconSquare,
            { backgroundColor: visual.cor },
          ]}
        >
          <Image
            source={visual.icone}
            style={agendaStyle.timelineIcon}
            resizeMode="contain"
          />
        </View>
        <View style={agendaStyle.timelineTextCol}>
          <Text
            style={agendaStyle.timelineTitle}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {evento.titulo}
          </Text>
          {evento.local && (
            <View style={agendaStyle.timelineInfoRow}>
              <Image
                source={require("@/assets/images/img/localizacaoCinza.png")}
                style={agendaStyle.timelineInfoIcon}
                resizeMode="contain"
              />
              <Text
                style={agendaStyle.timelineInfoText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {evento.local}
              </Text>
            </View>
          )}
          {pessoa && (
            <View style={agendaStyle.timelineInfoRow}>
              <Image
                source={require("@/assets/images/img/perfilCinza.png")}
                style={agendaStyle.timelineInfoIcon}
                resizeMode="contain"
              />
              <Text
                style={agendaStyle.timelineInfoText}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.7}
              >
                {pessoa}
              </Text>
            </View>
          )}
          {chegada && (
            <Text style={agendaStyle.timelineChegada}>Chegar às {chegada}</Text>
          )}
        </View>
        <View style={agendaStyle.timelineStatusCol}>
          <View
            style={[
              agendaStyle.statusPill,
              { borderColor: status.cor },
              passado && agendaStyle.statusPillPassado,
            ]}
          >
            <View
              style={[
                agendaStyle.statusIconCircle,
                { backgroundColor: status.cor },
              ]}
            >
              <Image
                source={status.icone}
                style={agendaStyle.statusIconGlyph}
                resizeMode="contain"
              />
            </View>
            <Text style={[agendaStyle.statusText, { color: status.cor }]}>
              {status.texto}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
