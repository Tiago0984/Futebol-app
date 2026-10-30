import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import agendaStyle from "@/styles/agendaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";
import { abrirDetalhe, temDetalhe, visualDoTipo } from "@/utils/eventos";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

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

// A API só manda CONFIRMADO ou CANCELADO; mudanças chegam pelos avisos
type Status = "confirmado" | "cancelado";

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

const SIGLAS_DIAS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
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

// Mesma regra da API para "concluído": passou o fim; sem fim, vale o início;
// sem horário nenhum, só no dia seguinte
function jaTerminou(evento: Evento, agora: Date) {
  const referencia = evento.fim ?? evento.inicio;
  if (referencia) return new Date(referencia) <= agora;
  return chaveDoEvento(evento) < chaveDoDia(agora);
}

// "2026-11-03" -> data local do aparelho (sem passar por fuso)
function dataDaChave(chave: string) {
  const [ano, mes, dia] = chave.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

function segundaDaSemana(data: Date) {
  return somarDias(data, -((data.getDay() + 6) % 7));
}

// Segunda a domingo da semana que começa em "segunda"
function diasDaSemana(segunda: Date) {
  return Array.from({ length: 7 }, (_, i) => {
    const dia = somarDias(segunda, i);
    return {
      sigla: SIGLAS_DIAS[dia.getDay()],
      numero: dia.getDate(),
      chave: chaveDoDia(dia),
    };
  });
}

function statusDoEvento(evento: Evento): Status {
  return evento.situacao === "CANCELADO" ? "cancelado" : "confirmado";
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

  const listaRef = useRef<ScrollView>(null);
  // Posição (y) de cada linha na lista, para rolar até o dia tocado na semana
  const posicoes = useRef<Record<string, number>>({});
  // Rolagem esperando a lista carregar ou medir: vai para o primeiro dia com
  // compromisso entre "de" e "ate" assim que ele aparecer
  const rolagemPendente = useRef<{ de: string; ate: string } | null>(null);
  // Enquanto a lista rola sozinha (toque na semana, nas setas, no calendário), o
  // cabeçalho não acompanha a rolagem, para não passar pelos dias do caminho
  const ignorarRolagemAte = useRef(0);

  // Guarda onde cada linha ficou e, se havia rolagem pendente para aquele dia, rola agora
  const registrarPosicao = useCallback(
    (id: string, chave: string, y: number) => {
      posicoes.current[id] = y;
      const pendente = rolagemPendente.current;
      if (pendente && chave >= pendente.de && chave <= pendente.ate) {
        rolagemPendente.current = null;
        setDiaSelecionado(chave);
        pausarCabecalho(ignorarRolagemAte);
        listaRef.current?.scrollTo({
          y: Math.max(y - ESPACO_TOPO_LISTA, 0),
          animated: true,
        });
      }
    },
    [],
  );
  // Evita pedir a mesma página duas vezes enquanto a rolagem dispara vários eventos
  const buscandoMais = useRef(false);

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

  // Busca uma página da agenda; null quando a sessão acabou ou deu erro
  async function buscarPagina(numero: number): Promise<RespostaAgenda | null> {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return null;
    }
    const resposta = await fetch(await urlDoAtleta(`/agenda?page=${numero}`), {
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
      setErro(json.message ?? "Não foi possível carregar a agenda.");
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
          const dados = await buscarPagina(1);
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
        const dados = await buscarPagina(paginaAtual + 1);
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

  // Perto do fim da lista, busca a próxima página. Rolando com o dedo, o mês e a
  // semana do topo passam a ser os do dia que está no alto da lista
  function aoRolar(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 200) {
      carregarAte("9999-12-31", 1);
    }
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
    if (!chaveNoTopo) return;
    // Os passados ficam no começo da lista; com eles no topo, o cabeçalho fica em hoje
    const dia = chaveNoTopo < chaveHoje ? chaveHoje : chaveNoTopo;
    if (dia !== diaSelecionado) setDiaSelecionado(dia);
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
  // A API manda os passados do mais recente para o mais antigo; aqui ficam em ordem
  const todosPassados = [...passadosApi].reverse().concat(terminadosAgora);

  const combinaCom = (tipo: string | null) => (e: Evento) =>
    tipo === null || e.tipo === tipo;

  function contarCompromissos(tipo: string | null) {
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

  const passados = todosPassados
    .filter(combinaCom(filtroAtivo))
    .slice(-QUANTIDADE_PASSADOS);
  const abertos = proximosAbertos.filter(combinaCom(filtroAtivo));
  // Próximo = primeiro que ainda não terminou e não foi cancelado
  const proximo = abertos.find((e) => e.situacao !== "CANCELADO") ?? null;

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
  for (const evento of abertos) {
    if (evento === proximo) {
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

  const diasComCompromisso = new Set(linhas.map(chaveDaLinha));

  // A faixa mostra a semana do dia selecionado; não volta antes da semana de hoje,
  // porque a API só manda os próximos e os 3 últimos que passaram
  const chaveHoje = chaveDoDia(agora);
  const segundaVisivel = segundaDaSemana(dataDaChave(diaSelecionado));
  const semana = diasDaSemana(segundaVisivel);
  const podeVoltarSemana =
    chaveDoDia(segundaVisivel) > chaveDoDia(segundaDaSemana(agora));
  const podeVoltarMes = diaSelecionado.slice(0, 7) > chaveHoje.slice(0, 7);
  const dataSelecionada = dataDaChave(diaSelecionado);

  function rolarAte(y: number) {
    pausarCabecalho(ignorarRolagemAte);
    listaRef.current?.scrollTo({
      y: Math.max(y - ESPACO_TOPO_LISTA, 0),
      animated: true,
    });
  }

  // Rola até o primeiro dia com compromisso entre "de" e "ate" e seleciona esse dia.
  // Se ele ainda não foi carregado ou medido, fica pendente até aparecer
  function rolarParaPrimeiroDia(de: string, ate: string) {
    const medidas = linhas
      .filter((linha) => chaveDaLinha(linha) >= de && chaveDaLinha(linha) <= ate)
      .map((linha) => ({
        chave: chaveDaLinha(linha),
        y: posicoes.current[idDaLinha(linha)],
      }))
      .filter((medida) => medida.y !== undefined);
    if (medidas.length === 0) {
      rolagemPendente.current = { de, ate };
      // O período pode estar numa página que ainda não veio
      if (ultimoCarregado < ate) carregarAte(ate);
      return;
    }
    rolagemPendente.current = null;
    const primeira = medidas.reduce((a, b) => (b.y < a.y ? b : a));
    setDiaSelecionado(primeira.chave);
    rolarAte(primeira.y);
  }


  // Botão do calendário e volta para a semana ou o mês de hoje: a lista volta ao começo
  function irParaHoje() {
    rolagemPendente.current = null;
    setDiaSelecionado(chaveHoje);
    pausarCabecalho(ignorarRolagemAte);
    listaRef.current?.scrollTo({ y: 0, animated: true });
  }

  // Toque num dia da semana: rola a lista até ele
  function selecionarDia(chave: string) {
    setDiaSelecionado(chave);
    rolarParaPrimeiroDia(chave, chave);
  }

  function trocarSemana(direcao: 1 | -1) {
    const segunda = somarDias(segundaVisivel, 7 * direcao);
    const chaveSegunda = chaveDoDia(segunda);
    const chaveDomingo = chaveDoDia(somarDias(segunda, 6));
    if (chaveSegunda <= chaveHoje && chaveHoje <= chaveDomingo) {
      irParaHoje();
      return;
    }
    setDiaSelecionado(chaveSegunda);
    rolarParaPrimeiroDia(chaveSegunda, chaveDomingo);
  }

  function trocarMes(direcao: 1 | -1) {
    const primeiro = new Date(
      dataSelecionada.getFullYear(),
      dataSelecionada.getMonth() + direcao,
      1,
    );
    const chavePrimeiro = chaveDoDia(primeiro);
    if (chavePrimeiro.slice(0, 7) === chaveHoje.slice(0, 7)) {
      irParaHoje();
      return;
    }
    // Dia 0 do mês seguinte = último dia deste mês
    const ultimo = new Date(primeiro.getFullYear(), primeiro.getMonth() + 1, 0);
    setDiaSelecionado(chavePrimeiro);
    rolarParaPrimeiroDia(chavePrimeiro, chaveDoDia(ultimo));
  }

  function trocarFiltro(tipo: string | null) {
    setFiltroAtivo(tipo);
    // A lista remonta com o filtro novo, volta ao começo e as posições são
    // medidas de novo; a semana e o mês voltam para hoje junto com ela
    posicoes.current = {};
    rolagemPendente.current = null;
    setDiaSelecionado(chaveHoje);
  }

  let conteudo;
  if (carregando) {
    conteudo = <Text style={agendaStyle.estadoTexto}>Carregando agenda...</Text>;
  } else if (erro && linhas.length === 0) {
    conteudo = <Text style={agendaStyle.estadoTexto}>{erro}</Text>;
  } else if (linhas.length === 0) {
    conteudo = (
      <Text style={agendaStyle.estadoTexto}>Nenhum compromisso por aqui.</Text>
    );
  } else {
    conteudo = linhas.map((linha, index) => {
      const id = idDaLinha(linha);
      const chave = chaveDaLinha(linha);
      const temDepois = index < linhas.length - 1;
      const primeira = index === 0;

      if (linha.tipo === "dia") {
        return (
          <LinhaMedida
            key={id}
            id={id}
            chave={chave}
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
            chave={chave}
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
          chave={chave}
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
    <View style={fundoStyle.container}>
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

        {/* O mês acompanha o dia selecionado; antes do mês de hoje a seta fica apagada */}
        <View style={agendaStyle.monthNavRow}>
          <View style={agendaStyle.monthNavLeft}>
            <Pressable
              onPress={() => trocarMes(-1)}
              disabled={!podeVoltarMes}
              hitSlop={8}
              accessibilityLabel="Mês anterior"
            >
              <Text
                style={[
                  agendaStyle.monthChevron,
                  !podeVoltarMes && agendaStyle.setaDesativada,
                ]}
              >
                ‹
              </Text>
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
              onPress={irParaHoje}
              accessibilityLabel="Voltar para hoje"
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

      {/* Semana do dia selecionado: a bolinha marca os dias com compromisso e o toque rola a lista até o dia */}
      <View style={agendaStyle.weekStrip}>
        <Pressable
          style={agendaStyle.weekSeta}
          onPress={() => trocarSemana(-1)}
          disabled={!podeVoltarSemana}
          hitSlop={8}
          accessibilityLabel="Semana anterior"
        >
          <Text
            style={[
              agendaStyle.monthChevron,
              !podeVoltarSemana && agendaStyle.setaDesativada,
            ]}
          >
            ‹
          </Text>
        </Pressable>
        {semana.map((dia) => {
          const ativo = dia.chave === diaSelecionado;
          const temCompromisso = diasComCompromisso.has(dia.chave);
          return (
            <Pressable
              key={dia.chave}
              style={agendaStyle.weekDayCol}
              onPress={() => selecionarDia(dia.chave)}
              disabled={!temCompromisso}
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
              <View
                style={[
                  agendaStyle.weekDayDot,
                  !temCompromisso && agendaStyle.weekDayDotVazio,
                ]}
              />
            </Pressable>
          );
        })}
        <Pressable
          style={agendaStyle.weekSeta}
          onPress={() => trocarSemana(1)}
          hitSlop={8}
          accessibilityLabel="Próxima semana"
        >
          <Text style={agendaStyle.monthChevron}>›</Text>
        </Pressable>
      </View>

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
          A key remonta a lista ao trocar de filtro, voltando ao topo */}
      <ScrollView
        key={filtroAtivo ?? "TODOS"}
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
    </View>
  );
}

// Linha da lista que avisa onde ficou (y), para a faixa da semana rolar até ela
function LinhaMedida({
  id,
  chave,
  aoMedir,
  style,
  children,
}: {
  id: string;
  chave: string;
  aoMedir: (id: string, chave: string, y: number) => void;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  return (
    <View
      style={style}
      onLayout={(e) => aoMedir(id, chave, e.nativeEvent.layout.y)}
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
  const status = statusConfig[statusDoEvento(evento)];
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
          <View style={[agendaStyle.statusPill, { borderColor: status.cor }]}>
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
