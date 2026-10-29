import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import campeonatoDetalheStyle from "@/styles/campeonatoDetalheStyle";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { abrirDetalhe, chaveDoDia } from "@/utils/eventos";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Categoria = { id_categoria: number; rotulo: string };

// da_aacj: time da AACJ (tipo_time INTERNO); servidor antigo não manda
type Time = {
  id_time: number;
  nome_time: string;
  logo_url: string | null;
  da_aacj?: boolean;
};

type Jogo = {
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

type LinhaTabela = {
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
  da_aacj?: boolean;
};

type ClassificacaoCategoria = {
  id_categoria: number;
  categoria: string;
  grupos: { grupo: string; tabela: LinhaTabela[] }[];
};

// Só os campos de GET /api/v1/campeonatos/{id} usados nesta tela
type DadosCampeonato = {
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
const diaMes = (data: string) => `${data.slice(8, 10)}/${data.slice(5, 7)}`;
const dataCompleta = (data: string) => `${diaMes(data)}/${data.slice(0, 4)}`;
function diaDaSemana(data: string) {
  const [a, m, d] = data.slice(0, 10).split("-").map(Number);
  return DIAS[new Date(a, m - 1, d).getDay()];
}

const jogado = (j: Jogo) =>
  j.placar_time_casa_jogos !== null && j.placar_time_visitante_jogos !== null;

// Resultado do ponto de vista da AACJ; null quando nenhum dos times é da AACJ
// (ou o servidor ainda não diz qual é)
function resultadoDaAacj(j: Jogo) {
  const casa = j.time_casa.da_aacj;
  const fora = j.time_visitante.da_aacj;
  if (!jogado(j) || casa === fora) return null;
  let nossos = casa ? j.placar_time_casa_jogos! : j.placar_time_visitante_jogos!;
  let deles = casa ? j.placar_time_visitante_jogos! : j.placar_time_casa_jogos!;
  if (nossos === deles && j.penaltis_time_casa_jogos !== null) {
    nossos = casa ? j.penaltis_time_casa_jogos! : j.penaltis_time_visitante_jogos!;
    deles = casa ? j.penaltis_time_visitante_jogos! : j.penaltis_time_casa_jogos!;
  }
  return nossos > deles ? "VITORIA" : nossos < deles ? "DERROTA" : "EMPATE";
}

function placarTexto(j: Jogo) {
  const placar = `${j.placar_time_casa_jogos} x ${j.placar_time_visitante_jogos}`;
  return j.penaltis_time_casa_jogos !== null
    ? `${placar} (${j.penaltis_time_casa_jogos}-${j.penaltis_time_visitante_jogos} pên.)`
    : placar;
}

export default function CampeonatoDetalhe() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [campeonato, setCampeonato] = useState<DadosCampeonato | null>(null);
  // Categorias do atleta neste campeonato (para abrir já na dele)
  const [minhasCategorias, setMinhasCategorias] = useState<number[]>([]);
  // Jogos que estão na agenda do atleta: só esses abrem o detalhe do compromisso
  const [eventosNaAgenda, setEventosNaAgenda] = useState<number[]>([]);
  const [categoriaEscolhida, setCategoriaEscolhida] = useState<number | null>(
    null,
  );
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

        // As duas abaixo são extras: sem elas a tela aparece do mesmo jeito
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

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/campeonatos");
    }
  }

  let conteudo;
  if (erro) {
    conteudo = <Text style={campeonatosStyle.estadoTexto}>{erro}</Text>;
  } else if (!campeonato) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>Carregando campeonato...</Text>
    );
  } else {
    const c = campeonato;
    // Categoria mostrada: a escolhida, senão a do atleta, senão a primeira
    const idCategoria =
      categoriaEscolhida ??
      c.categorias.find((cat) => minhasCategorias.includes(cat.id_categoria))
        ?.id_categoria ??
      c.categorias[0]?.id_categoria ??
      null;

    const hoje = chaveDoDia(new Date());
    const inicio = c.data_inicio_campeonato.slice(0, 10);
    const fim = c.data_fim_campeonato.slice(0, 10);
    const situacao =
      fim < hoje ? "ENCERRADO" : inicio > hoje ? "EM_BREVE" : "ANDAMENTO";

    // Jogos da categoria (sem categoria no jogo: entra em todas)
    const jogos = c.jogos
      .filter((j) => idCategoria === null || j.id_categoria === null || j.id_categoria === idCategoria)
      .sort((a, b) => a.data_jogo.localeCompare(b.data_jogo));
    const realizados = jogos.filter(jogado);
    const pendentes = jogos.filter((j) => !jogado(j));
    const progresso = jogos.length
      ? Math.floor((realizados.length / jogos.length) * 100)
      : 0;
    // Fase atual: a do próximo jogo sem placar; tudo jogado, a do último
    const faseAtual = (pendentes[0] ?? realizados[realizados.length - 1])?.fase;
    // Próximas: sem placar e de hoje em diante (jogo passado sem placar espera o resultado)
    const futuros = pendentes.filter((j) => j.data_jogo.slice(0, 10) >= hoje);
    const proximo = futuros[0];
    const proximos = futuros.slice(1, 4);
    const ultimos = realizados.slice(-3).reverse();

    const classificacao = c.classificacao.find((cl) => cl.id_categoria === idCategoria);
    // Só grupos com jogos contados (o mata-mata vem com a tabela zerada)
    const grupos = (classificacao?.grupos ?? []).filter((g) =>
      g.tabela.some((l) => l.jogos > 0),
    );
    // Resumo: o grupo da AACJ; sem ele, o primeiro grupo com times
    const grupoResumo =
      grupos.find((g) => g.tabela.some((l) => l.da_aacj)) ?? grupos[0];
    const equipes = new Set(
      jogos.flatMap((j) => [j.time_casa.id_time, j.time_visitante.id_time]),
    ).size;

    // Campanha da AACJ pelos jogos dela com placar (vale também no mata-mata; nos pênaltis
    // conta quem passou). Gols só do tempo normal. Sem time marcado da_aacj, não aparece
    const jogosDaAacj = realizados.filter(
      (j) => j.time_casa.da_aacj !== j.time_visitante.da_aacj,
    );
    const campanha = jogosDaAacj.reduce(
      (t, j) => {
        const casa = !!j.time_casa.da_aacj;
        t.pro += casa ? j.placar_time_casa_jogos! : j.placar_time_visitante_jogos!;
        t.contra += casa ? j.placar_time_visitante_jogos! : j.placar_time_casa_jogos!;
        const r = resultadoDaAacj(j);
        if (r === "VITORIA") t.v++;
        else if (r === "EMPATE") t.e++;
        else t.d++;
        return t;
      },
      { v: 0, e: 0, d: 0, pro: 0, contra: 0 },
    );
    const pontos = campanha.v * 3 + campanha.e;
    const saldo = campanha.pro - campanha.contra;
    const estatisticas = jogosDaAacj.length > 0 && [
      { rotulo: "Vitórias", valor: campanha.v },
      { rotulo: "Empates", valor: campanha.e },
      { rotulo: "Derrotas", valor: campanha.d },
      { rotulo: "Pontos", valor: pontos },
      { rotulo: "Saldo", valor: saldo > 0 ? `+${saldo}` : saldo },
      { rotulo: "Gols Pró", valor: campanha.pro },
      { rotulo: "Gols Contra", valor: campanha.contra },
      {
        rotulo: "Aproveitamento",
        valor: `${Math.round((pontos / (jogosDaAacj.length * 3)) * 100)}%`,
      },
    ];

    const linhasInfo = [
      { rotulo: "Organizador", valor: c.organizador_campeonato },
      { rotulo: "Formato", valor: c.tipo_label },
      { rotulo: "Local", valor: c.local_evento },
      { rotulo: "Equipes", valor: equipes ? String(equipes) : null },
      { rotulo: "Período", valor: `${dataCompleta(inicio)} a ${dataCompleta(fim)}` },
    ].filter((l) => l.valor);

    const escudo = (t: Time) =>
      t.logo_url
        ? { uri: t.logo_url }
        : require("@/assets/images/img/escudovermelho.png");

    conteudo = (
      <>
        {/* Categorias do campeonato: troca o que aparece abaixo */}
        {c.categorias.length > 1 && (
          <View style={campeonatosStyle.filterRow}>
            {c.categorias.map((cat) => {
              const ativo = cat.id_categoria === idCategoria;
              return (
                <Pressable
                  key={cat.id_categoria}
                  style={[
                    campeonatosStyle.filterPill,
                    ativo && campeonatosStyle.filterPillActive,
                  ]}
                  onPress={() => setCategoriaEscolhida(cat.id_categoria)}
                >
                  <Text
                    style={[
                      campeonatosStyle.filterPillText,
                      ativo && campeonatosStyle.filterPillTextActive,
                    ]}
                  >
                    {cat.rotulo}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {/* INFORMAÇÕES DO CAMPEONATO */}
        <View style={[campeonatoDetalheStyle.infoCard, { marginTop: 16 }]}>
          <Image
            source={
              c.logo_url
                ? { uri: c.logo_url }
                : require("@/assets/images/img/campeonatosVermelho.png")
            }
            style={campeonatoDetalheStyle.campeonatoLogo}
            resizeMode="contain"
          />

          <View style={campeonatoDetalheStyle.infoContent}>
            <View style={campeonatoDetalheStyle.infoHeaderRow}>
              <View />
              <View
                style={[
                  campeonatoDetalheStyle.statusPill,
                  situacao === "EM_BREVE" && campeonatoDetalheStyle.statusPillEmBreve,
                  situacao === "ENCERRADO" &&
                    campeonatoDetalheStyle.statusPillEncerrado,
                ]}
              >
                <Text
                  style={[
                    campeonatoDetalheStyle.statusPillText,
                    situacao === "EM_BREVE" &&
                      campeonatoDetalheStyle.statusPillTextEmBreve,
                    situacao === "ENCERRADO" &&
                      campeonatoDetalheStyle.statusPillTextEncerrado,
                  ]}
                >
                  {situacao === "ENCERRADO"
                    ? "Encerrado"
                    : situacao === "EM_BREVE"
                      ? "Em breve"
                      : "Em andamento"}
                </Text>
              </View>
            </View>

            <View style={campeonatoDetalheStyle.infoRows}>
              {linhasInfo.map((linha) => (
                <View key={linha.rotulo} style={campeonatoDetalheStyle.infoRow}>
                  <Text style={campeonatoDetalheStyle.infoLabel}>
                    {linha.rotulo}
                  </Text>
                  <Text style={campeonatoDetalheStyle.infoValue}>
                    {linha.valor}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {c.descricao_campeonato && (
          <Text style={campeonatoDetalheStyle.descricao}>
            {c.descricao_campeonato}
          </Text>
        )}

        {/* PROGRESSO: jogos já marcados (o mata-mata entra quando é montado) */}
        {jogos.length > 0 && (
          <View style={campeonatoDetalheStyle.section}>
            <Text style={campeonatoDetalheStyle.sectionTitle}>
              Progresso do campeonato
            </Text>

            <View style={campeonatoDetalheStyle.progressHeader}>
              <View style={campeonatoDetalheStyle.progressRoundCol}>
                <Text style={campeonatoDetalheStyle.progressLabel}>Jogos</Text>
                <Text style={campeonatoDetalheStyle.progressValue}>
                  {realizados.length} de {jogos.length}
                </Text>
              </View>
              <Text style={campeonatoDetalheStyle.progressPercent}>
                {progresso}%
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.progressTrack}>
              <View
                style={[
                  campeonatoDetalheStyle.progressFill,
                  { width: `${progresso}%` },
                ]}
              />
            </View>

            {faseAtual && (
              <Text style={campeonatoDetalheStyle.nextPhaseText}>
                Fase atual:{" "}
                <Text style={campeonatoDetalheStyle.nextPhaseValue}>
                  {faseAtual}
                </Text>
              </Text>
            )}
          </View>
        )}

        {/* ESTATÍSTICAS da AACJ: só quando o servidor diz qual time é da AACJ */}
        {estatisticas && (
          <View style={campeonatoDetalheStyle.section}>
            <Text style={campeonatoDetalheStyle.sectionTitle}>
              Estatísticas da campanha
            </Text>
            <View style={campeonatoDetalheStyle.statsGrid}>
              {estatisticas.map((s) => (
                <View key={s.rotulo} style={campeonatoDetalheStyle.statCard}>
                  <Text style={campeonatoDetalheStyle.statValue}>{s.valor}</Text>
                  <Text style={campeonatoDetalheStyle.statLabel}>{s.rotulo}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* PRÓXIMA PARTIDA */}
        {proximo && (
          <View style={campeonatoDetalheStyle.matchCard}>
            <Text style={campeonatoDetalheStyle.matchCardTitle}>
              Próxima partida
            </Text>

            <View style={campeonatoDetalheStyle.matchContent}>
              <View style={campeonatoDetalheStyle.teamCol}>
                <Image
                  source={escudo(proximo.time_casa)}
                  style={campeonatoDetalheStyle.teamLogo}
                  resizeMode="contain"
                />
                <Text style={campeonatoDetalheStyle.teamName} numberOfLines={2}>
                  {proximo.time_casa.nome_time}
                </Text>
              </View>

              <View style={campeonatoDetalheStyle.matchCenter}>
                <Text style={campeonatoDetalheStyle.matchDay}>
                  {diaDaSemana(proximo.data_jogo)} · {diaMes(proximo.data_jogo)}
                </Text>
                <Text style={campeonatoDetalheStyle.matchTime}>
                  {proximo.horario_jogo ?? "A definir"}
                </Text>
                {proximo.local_jogo && (
                  <Text style={campeonatoDetalheStyle.matchLocation} numberOfLines={2}>
                    {proximo.local_jogo}
                  </Text>
                )}
                {proximo.fase && (
                  <Text style={campeonatoDetalheStyle.matchLocation}>
                    {proximo.fase}
                    {proximo.rodada_jogo ? ` · Rodada ${proximo.rodada_jogo}` : ""}
                  </Text>
                )}
              </View>

              <View style={campeonatoDetalheStyle.teamCol}>
                <Image
                  source={escudo(proximo.time_visitante)}
                  style={campeonatoDetalheStyle.teamLogo}
                  resizeMode="contain"
                />
                <Text style={campeonatoDetalheStyle.teamName} numberOfLines={2}>
                  {proximo.time_visitante.nome_time}
                </Text>
              </View>
            </View>

            {/* Só o jogo que está na agenda do atleta tem detalhe para abrir */}
            {eventosNaAgenda.includes(proximo.id_evento) && (
              <Pressable
                style={campeonatoDetalheStyle.matchDetailsButton}
                onPress={() => abrirDetalhe(proximo.id_evento)}
              >
                <Text style={campeonatoDetalheStyle.matchDetailsText}>
                  Ver detalhes {">"}
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* CLASSIFICAÇÃO + RESULTADOS */}
        {(grupoResumo || ultimos.length > 0) && (
          <View style={campeonatoDetalheStyle.tablesRow}>
            {grupoResumo && (
              <View style={campeonatoDetalheStyle.tableColumn}>
                <View style={campeonatoDetalheStyle.tableHeaderRow}>
                  <Text style={campeonatoDetalheStyle.tableTitle}>
                    Classificação
                  </Text>
                </View>
                {grupos.length > 1 && (
                  <Text style={campeonatoDetalheStyle.grupoNome}>
                    {grupoResumo.grupo}
                  </Text>
                )}
                <View style={campeonatoDetalheStyle.tableRows}>
                  {grupoResumo.tabela.slice(0, 4).map((l) => (
                    <View key={l.id_time} style={campeonatoDetalheStyle.classificationRow}>
                      <Text style={campeonatoDetalheStyle.position}>{l.posicao}</Text>
                      <View
                        style={[
                          campeonatoDetalheStyle.teamDot,
                          l.da_aacj && campeonatoDetalheStyle.teamDotAacj,
                        ]}
                      />
                      <Text
                        style={[
                          campeonatoDetalheStyle.classificationTeam,
                          l.da_aacj && campeonatoDetalheStyle.textoAacj,
                        ]}
                        numberOfLines={1}
                      >
                        {l.time}
                      </Text>
                      <Text style={campeonatoDetalheStyle.points}>{l.pontos}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {ultimos.length > 0 && (
              <View
                style={[
                  campeonatoDetalheStyle.tableColumn,
                  grupoResumo && campeonatoDetalheStyle.tableColumnRight,
                ]}
              >
                <View style={campeonatoDetalheStyle.tableHeaderRow}>
                  <Text style={campeonatoDetalheStyle.tableTitle}>
                    Últimos Resultados
                  </Text>
                </View>
                <View style={campeonatoDetalheStyle.tableRows}>
                  {ultimos.map((j) => {
                    const resultado = resultadoDaAacj(j);
                    return (
                      <View key={j.id_jogo} style={campeonatoDetalheStyle.resultRow}>
                        <Text style={campeonatoDetalheStyle.resultTeams} numberOfLines={1}>
                          {j.time_casa.nome_time}
                        </Text>
                        <Text style={campeonatoDetalheStyle.resultScore}>
                          {placarTexto(j)}
                        </Text>
                        <Text style={campeonatoDetalheStyle.resultTeams} numberOfLines={1}>
                          {j.time_visitante.nome_time}
                        </Text>
                        {resultado === "VITORIA" && (
                          <View style={campeonatoDetalheStyle.resultWin}>
                            <Text style={campeonatoDetalheStyle.resultWinText}>Vitória</Text>
                          </View>
                        )}
                        {resultado === "EMPATE" && (
                          <View style={campeonatoDetalheStyle.resultDraw}>
                            <Text style={campeonatoDetalheStyle.resultDrawText}>Empate</Text>
                          </View>
                        )}
                        {resultado === "DERROTA" && (
                          <View style={campeonatoDetalheStyle.resultLoss}>
                            <Text style={campeonatoDetalheStyle.resultLossText}>Derrota</Text>
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}

        {/* PRÓXIMAS PARTIDAS (depois da próxima) */}
        {proximos.length > 0 && (
          <View style={campeonatoDetalheStyle.upcomingSection}>
            <View style={campeonatoDetalheStyle.tableHeaderRow}>
              <Text style={campeonatoDetalheStyle.tableTitle}>
                Próximas partidas
              </Text>
            </View>
            {proximos.map((j) => (
              <View key={j.id_jogo} style={campeonatoDetalheStyle.upcomingRow}>
                <Text style={campeonatoDetalheStyle.upcomingDate}>
                  {diaDaSemana(j.data_jogo).slice(0, 3)}
                </Text>
                <Text style={campeonatoDetalheStyle.upcomingDate}>
                  {diaMes(j.data_jogo)}
                </Text>
                <Text style={campeonatoDetalheStyle.upcomingGame} numberOfLines={1}>
                  {j.time_casa.nome_time} vs {j.time_visitante.nome_time}
                </Text>
                <Text style={campeonatoDetalheStyle.upcomingTime}>
                  {j.horario_jogo ?? "--:--"}
                </Text>
              </View>
            ))}
          </View>
        )}

        {jogos.length === 0 && (
          <Text style={campeonatosStyle.estadoTexto}>
            Os jogos desta categoria ainda não foram marcados.
          </Text>
        )}
      </>
    );
  }

  const categoriaTitulo = campeonato?.categorias.find(
    (cat) =>
      cat.id_categoria ===
      (categoriaEscolhida ??
        campeonato.categorias.find((x) => minhasCategorias.includes(x.id_categoria))
          ?.id_categoria ??
        campeonato.categorias[0]?.id_categoria),
  )?.rotulo;

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={campeonatoDetalheStyle.scrollView}
        contentContainerStyle={[
          campeonatoDetalheStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={campeonatoDetalheStyle.header}>
          <Pressable
            style={campeonatoDetalheStyle.backButton}
            onPress={voltar}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={campeonatoDetalheStyle.backChevron}>‹</Text>
          </Pressable>

          <View style={campeonatoDetalheStyle.headerTitleCol}>
            <Text style={campeonatoDetalheStyle.screenTitle} numberOfLines={2}>
              {campeonato?.nome_campeonato ?? "Campeonato"}
            </Text>
            {categoriaTitulo && (
              <Text style={campeonatoDetalheStyle.screenSubtitle}>
                {categoriaTitulo}
              </Text>
            )}
          </View>

          <View style={campeonatoDetalheStyle.headerIconsRow}>
            <View style={campeonatoDetalheStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/shoppingbranco.png")}
                style={campeonatoDetalheStyle.headerIcon}
                resizeMode="contain"
              />
            </View>
            <BotaoNotificacoes abaAtiva="campeonatos" />
          </View>
        </View>

        {conteudo}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
