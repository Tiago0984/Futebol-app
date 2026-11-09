import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import campeonatoDetalheStyle from "@/styles/campeonatoDetalheStyle";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import {
  dataCompleta,
  diaDaSemana,
  diaMes,
  escudoDoTime,
  gruposDaCategoria,
  jogado,
  jogosDaCategoria,
  jogosFuturos,
  extrasDoPlacar,
  resultadoDaAacj,
  vencedorDoJogo,
  useCampeonato,
  voltarParaCampeonatos,
  andamentoDoCampeonato,
  campanhaDaAacj,
  eliminacaoDaAacj,
  type Eliminacao,
  type Resumo,
  type Situacao,
} from "@/utils/campeonatos";
import { abrirDetalhe, chaveDoDia } from "@/utils/eventos";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CampeonatoDetalhe() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const {
    campeonato,
    erro,
    idCategoria: categoriaPadrao,
    meusSubs,
    eventosNaAgenda,
  } = useCampeonato(id);
  // Categoria mostrada: a escolhida nos botões, senão a do atleta, senão a primeira
  const [categoriaEscolhida, setCategoriaEscolhida] = useState<number | null>(
    null,
  );
  const idCategoria = categoriaEscolhida ?? categoriaPadrao;

  // Telas de "ver tudo", na mesma categoria
  function verCompleto(
    pathname: "/classificacao" | "/ultimos-resultados" | "/proxima-partida",
  ) {
    router.navigate({
      pathname,
      params: { id: String(id), categoria: String(idCategoria ?? "") },
    });
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

    const hoje = chaveDoDia(new Date());
    const inicio = c.data_inicio_campeonato.slice(0, 10);
    const fim = c.data_fim_campeonato.slice(0, 10);
    const jogos = jogosDaCategoria(c, idCategoria);
    const realizados = jogos.filter(jogado);
    const pendentes = jogos.filter((j) => !jogado(j));
    // Andamento da categoria: o do servidor (o mesmo da lista); servidor antigo, pelos jogos
    // (fase atual: a do próximo jogo sem placar; tudo jogado, a do último)
    const categoria = c.categorias.find((cat) => cat.id_categoria === idCategoria);
    const resumo: Resumo = categoria?.resumo ?? {
      fase_atual_label: (pendentes[0] ?? realizados[realizados.length - 1])?.fase ?? null,
      rodada_atual: null,
      total_rodadas: null,
      jogos_realizados: realizados.length,
      total_jogos: jogos.length,
    };
    const andamento = andamentoDoCampeonato(
      c,
      hoje,
      resumo,
      categoria?.encerrada ?? c.encerrado,
    );
    const situacao = andamento.situacao;
    const aguardando = resumo.jogos_aguardando_resultado ?? 0;
    // Todos os jogos marcados disputados, sem campeão e ainda no período
    const proximaFase =
      categoria?.encerrada === false &&
      situacao === "ANDAMENTO" &&
      resumo.total_jogos > 0 &&
      resumo.jogos_realizados === resumo.total_jogos;
    const campeao = categoria?.campeao ?? null;
    const futuros = jogosFuturos(jogos, hoje);
    const proximo = futuros[0];
    const proximos = futuros.slice(1);
    // Só o jogo que está na agenda do atleta tem detalhe para abrir
    const proximoTemDetalhe =
      proximo && eventosNaAgenda.includes(proximo.id_evento);
    const ultimos = realizados.slice(-3).reverse();

    const grupos = gruposDaCategoria(c, idCategoria);
    // Resumo: o grupo da AACJ; sem ele, o primeiro grupo com times
    const grupoResumo =
      grupos.find((g) => g.tabela.some((l) => l.da_aacj)) ?? grupos[0];
    const equipes = new Set(
      jogos.flatMap((j) => [j.time_casa.id_time, j.time_visitante.id_time]),
    ).size;

    // Campanha da AACJ nesta categoria (grupos e mata-mata). Sem time marcado da_aacj, não aparece
    const campanha = campanhaDaAacj(realizados);
    const estatisticas = campanha && [
      { rotulo: "Vitórias", valor: campanha.v },
      { rotulo: "Empates", valor: campanha.e },
      { rotulo: "Derrotas", valor: campanha.d },
      { rotulo: "Pontos", valor: campanha.pontos },
      { rotulo: "Saldo", valor: campanha.saldo > 0 ? `+${campanha.saldo}` : campanha.saldo },
      { rotulo: "Gols Pró", valor: campanha.pro },
      { rotulo: "Gols Contra", valor: campanha.contra },
      { rotulo: "Aproveitamento", valor: `${campanha.aproveitamento}%` },
    ];

    // AACJ fora da disputa do título nesta categoria (o campeonato segue para os outros)
    const eliminacao = eliminacaoDaAacj(c, idCategoria, jogos);
    const categoriaEncerrada = categoria?.encerrada ?? c.encerrado ?? false;

    const linhasInfo = [
      {
        icone: require("@/assets/images/img/agendaVermelha.png"),
        rotulo: "Período",
        valor: `${dataCompleta(inicio)} a ${dataCompleta(fim)}`,
      },
      {
        icone: require("@/assets/images/img/localizacaoVermelho.png"),
        rotulo: "Local",
        valor: c.local_evento,
      },
      {
        icone: require("@/assets/images/img/grupoPessoasVermelho.png"),
        rotulo: "Equipes",
        valor: equipes ? `${equipes} ${equipes === 1 ? "equipe" : "equipes"}` : null,
      },
    ].filter((l) => l.valor);

    const escudo = escudoDoTime;

    // Categorias do campeonato: troca o que aparece abaixo
    const seletorDeCategoria = c.categorias.length > 1 && (
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
                {meusSubs?.includes(cat.id_categoria) && " (seu sub)"}
              </Text>
            </Pressable>
          );
        })}
      </View>
    );

    // O atleta só vê as informações do sub dele; os outros mostram o aviso
    const semAcesso =
      meusSubs !== null &&
      idCategoria !== null &&
      !meusSubs.includes(idCategoria);

    conteudo = semAcesso ? (
      <>
        {seletorDeCategoria}
        <Text style={campeonatosStyle.estadoTexto}>
          Você não é do {categoria?.rotulo ?? "sub selecionado"}. As informações
          dele aparecem só para os atletas desse sub.
        </Text>
      </>
    ) : (
      <>
        {seletorDeCategoria}

        {/* INFORMAÇÕES DO CAMPEONATO */}
        <InfoCampeonato
          bannerUrl={c.banner_url ?? null}
          logoUrl={c.logo_url}
          formato={c.tipo_label ?? null}
          organizador={c.organizador_campeonato}
          selo={andamento.selo}
          situacao={situacao}
          linhas={linhasInfo}
        />

        {/* AACJ ELIMINADA: o campeonato continua, mas sem ela na disputa */}
        {eliminacao && (
          <AvisoEliminacao
            eliminados={eliminacao.eliminados}
            todos={eliminacao.todos}
            varios={eliminacao.varios}
            encerrada={categoriaEncerrada}
          />
        )}

        {c.descricao_campeonato && (
          <Text style={campeonatoDetalheStyle.descricao}>
            {c.descricao_campeonato}
          </Text>
        )}

        {/* PROGRESSO: jogos já marcados (o mata-mata entra quando é montado) */}
        {resumo.total_jogos > 0 && (
          <View style={campeonatoDetalheStyle.section}>
            <Text style={campeonatoDetalheStyle.sectionTitle}>
              Progresso do campeonato
            </Text>

            <View style={campeonatoDetalheStyle.progressHeader}>
              <View style={campeonatoDetalheStyle.progressRoundCol}>
                <Text style={campeonatoDetalheStyle.progressLabel}>Jogos</Text>
                <Text style={campeonatoDetalheStyle.progressValue}>
                  {resumo.jogos_realizados} de {resumo.total_jogos}
                </Text>
              </View>
              <Text style={campeonatoDetalheStyle.progressPercent}>
                {andamento.progresso}%
              </Text>
            </View>

            <View style={campeonatoDetalheStyle.progressTrack}>
              <View
                style={[
                  campeonatoDetalheStyle.progressFill,
                  { width: `${andamento.progresso}%` },
                ]}
              />
            </View>

            {resumo.fase_atual_label && (
              <Text style={campeonatoDetalheStyle.nextPhaseText}>
                Fase atual:{" "}
                <Text style={campeonatoDetalheStyle.nextPhaseValue}>
                  {resumo.fase_atual_label}
                  {resumo.rodada_atual && resumo.total_rodadas
                    ? ` · Rodada ${resumo.rodada_atual} de ${resumo.total_rodadas}`
                    : ""}
                </Text>
              </Text>
            )}
            {aguardando > 0 && (
              <Text style={campeonatoDetalheStyle.nextPhaseText}>
                {aguardando === 1
                  ? "1 jogo aguardando o resultado"
                  : `${aguardando} jogos aguardando o resultado`}
              </Text>
            )}
            {proximaFase && aguardando === 0 && (
              <Text style={campeonatoDetalheStyle.nextPhaseText}>
                Todos os jogos marcados foram disputados. Aguardando os próximos jogos.
              </Text>
            )}
          </View>
        )}

        {/* CAMPEÃO da categoria: só quando o servidor diz que ela acabou */}
        {campeao && (
          <View style={campeonatoDetalheStyle.section}>
            <Text style={campeonatoDetalheStyle.sectionTitle}>
              {campeao.situacao === "sorteio" ? "Resultado final" : "🏆 Campeão"}
            </Text>
            {campeao.situacao === "sorteio" ? (
              <Text style={campeonatoDetalheStyle.nextPhaseText}>
                Empate em todos os critérios no 1º lugar: o campeão será definido por sorteio.
              </Text>
            ) : (
              <View style={campeonatoDetalheStyle.podio}>
                {[
                  { rotulo: "Campeão", time: campeao.campeao },
                  { rotulo: "Vice", time: campeao.vice },
                  { rotulo: "3º lugar", time: campeao.terceiro },
                ]
                  .filter((p) => p.time)
                  .map((p, i) => (
                    <View
                      key={p.rotulo}
                      style={[
                        campeonatoDetalheStyle.podioLinha,
                        i === 0 && campeonatoDetalheStyle.podioLinhaCampeao,
                      ]}
                    >
                      <Image
                        source={
                          p.time!.logo_url
                            ? { uri: p.time!.logo_url }
                            : require("@/assets/images/img/escudovermelho.png")
                        }
                        style={campeonatoDetalheStyle.podioEscudo}
                        resizeMode="contain"
                      />
                      <View style={{ flex: 1 }}>
                        <Text style={campeonatoDetalheStyle.podioRotulo}>
                          {p.rotulo}
                        </Text>
                        <Text style={campeonatoDetalheStyle.podioNome} numberOfLines={2}>
                          {p.time!.nome}
                        </Text>
                      </View>
                    </View>
                  ))}
                {campeao.como && (
                  <Text style={campeonatoDetalheStyle.nextPhaseText}>
                    {campeao.como}
                  </Text>
                )}
              </View>
            )}
          </View>
        )}

        {/* ESTATÍSTICAS da AACJ: só quando o servidor diz qual time é da AACJ */}
        {estatisticas && (
          <View style={campeonatoDetalheStyle.section}>
            <Text style={campeonatoDetalheStyle.sectionTitle}>
              Estatísticas da campanha
            </Text>
            <Text style={campeonatoDetalheStyle.statsLegenda}>
              {campanha.jogos === 1 ? "1 jogo" : `${campanha.jogos} jogos`} da AACJ
              {eliminacao?.todos ? " · campanha encerrada" : ""}
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
          <Pressable
            style={campeonatoDetalheStyle.matchCard}
            onPress={() => abrirDetalhe(proximo.id_evento)}
            disabled={!proximoTemDetalhe}
          >
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

            {proximoTemDetalhe && (
              <View style={campeonatoDetalheStyle.matchDetailsButton}>
                <Text style={campeonatoDetalheStyle.matchDetailsText}>
                  Ver detalhes {">"}
                </Text>
              </View>
            )}
          </Pressable>
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
                  <Pressable onPress={() => verCompleto("/classificacao")}>
                    <Text style={campeonatoDetalheStyle.tableLink}>
                      Ver completo {">"}
                    </Text>
                  </Pressable>
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
                  <Pressable onPress={() => verCompleto("/ultimos-resultados")}>
                    <Text style={campeonatoDetalheStyle.tableLink}>
                      Ver completo {">"}
                    </Text>
                  </Pressable>
                </View>
                <View style={campeonatoDetalheStyle.tableRows}>
                  {/* Mini placar: cada time numa linha com os gols; o nome quebra a linha
                      em vez de ser cortado com "..." */}
                  {ultimos.map((j, i) => {
                    const resultado = resultadoDaAacj(j);
                    const extras = extrasDoPlacar(j);
                    const vencedor = vencedorDoJogo(j);
                    return (
                      <View
                        key={j.id_jogo}
                        style={[
                          campeonatoDetalheStyle.resultBloco,
                          i < ultimos.length - 1 && campeonatoDetalheStyle.resultBlocoDivisor,
                        ]}
                      >
                        {[
                          { time: j.time_casa, gols: j.placar_time_casa_jogos },
                          { time: j.time_visitante, gols: j.placar_time_visitante_jogos },
                        ].map(({ time, gols }) => (
                          <View key={time.id_time} style={campeonatoDetalheStyle.resultLinhaTime}>
                            <Text
                              style={[
                                campeonatoDetalheStyle.resultTeams,
                                vencedor && vencedor.id_time !== time.id_time &&
                                  campeonatoDetalheStyle.resultPerdedor,
                              ]}
                            >
                              {time.nome_time}
                            </Text>
                            <Text
                              style={[
                                campeonatoDetalheStyle.resultScore,
                                vencedor && vencedor.id_time !== time.id_time &&
                                  campeonatoDetalheStyle.resultPerdedor,
                              ]}
                            >
                              {gols}
                            </Text>
                          </View>
                        ))}
                        {(extras || resultado) && (
                          <View style={campeonatoDetalheStyle.resultRodape}>
                            {extras && (
                              <Text style={campeonatoDetalheStyle.resultExtras}>{extras}</Text>
                            )}
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
                        )}
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        )}

        {/* PRÓXIMAS PARTIDAS (depois da próxima); sem jogo nenhum, vale o aviso lá de baixo */}
        {jogos.length > 0 && (
          <View style={campeonatoDetalheStyle.upcomingSection}>
            <View style={campeonatoDetalheStyle.tableHeaderRow}>
              <Text style={campeonatoDetalheStyle.tableTitle}>
                Próximas partidas
              </Text>
              {proximos.length > 0 && (
                <Pressable onPress={() => verCompleto("/proxima-partida")}>
                  <Text style={campeonatoDetalheStyle.tableLink}>
                    Ver completo {">"}
                  </Text>
                </Pressable>
              )}
            </View>
            {proximos.length === 0 && (
              <Text style={campeonatoDetalheStyle.upcomingVazio}>
                {proximo
                  ? "Não há outras partidas marcadas por enquanto."
                  : "Não há próximas partidas marcadas por enquanto."}
              </Text>
            )}
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
    (cat) => cat.id_categoria === idCategoria,
  )?.rotulo;

  return (
    <View style={[fundoStyle.container, { paddingTop: insets.top }]}>
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
            onPress={voltarParaCampeonatos}
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

// Aviso vermelho da eliminação: por que caiu e que o campeonato segue sem a AACJ
function AvisoEliminacao({
  eliminados,
  todos,
  varios,
  encerrada,
}: {
  eliminados: Eliminacao[];
  todos: boolean;
  varios: boolean;
  encerrada: boolean;
}) {
  const um = eliminados.length === 1 ? eliminados[0] : null;
  const titulo = todos
    ? "AACJ eliminada"
    : um
      ? `${um.time} eliminado`
      : "Times da AACJ eliminados";
  return (
    <View style={campeonatoDetalheStyle.eliminadaCard}>
      <View style={campeonatoDetalheStyle.eliminadaTopo}>
        {um && (
          <Image
            source={escudoDoTime({
              id_time: um.id_time,
              nome_time: um.time,
              logo_url: um.logo_url,
            })}
            style={campeonatoDetalheStyle.eliminadaEscudo}
            resizeMode="contain"
          />
        )}
        <View style={{ flex: 1 }}>
          <Text style={campeonatoDetalheStyle.eliminadaPill}>FORA DA DISPUTA</Text>
          <Text style={campeonatoDetalheStyle.eliminadaTitulo}>{titulo}</Text>
        </View>
      </View>

      {eliminados.map((e) => (
        <View key={e.id_time} style={campeonatoDetalheStyle.eliminadaMotivoBloco}>
          <Text style={campeonatoDetalheStyle.eliminadaMotivo}>
            {varios && <Text style={campeonatoDetalheStyle.eliminadaNome}>{e.time}: </Text>}
            {e.motivo}
          </Text>
          {e.detalhe && (
            <Text style={campeonatoDetalheStyle.eliminadaDetalhe}>{e.detalhe}</Text>
          )}
          {e.disputaTerceiro && (
            <Text style={campeonatoDetalheStyle.eliminadaDetalhe}>
              Ainda disputa o 3º lugar.
            </Text>
          )}
        </View>
      ))}

      {!encerrada && (
        <Text style={campeonatoDetalheStyle.eliminadaRodape}>
          O campeonato continua até sair o campeão. Os jogos dos outros times seguem
          aparecendo aqui.
        </Text>
      )}
    </View>
  );
}

// Card do topo: banner com o status, o logo sobreposto com formato e organizador ao lado
// e, embaixo, as informações com ícone
function InfoCampeonato({
  bannerUrl,
  logoUrl,
  formato,
  organizador,
  selo,
  situacao,
  linhas,
}: {
  bannerUrl: string | null;
  logoUrl: string | null;
  formato: string | null;
  organizador: string | null;
  selo: string;
  situacao: Situacao;
  linhas: { icone: number; rotulo: string; valor: string | null | undefined }[];
}) {
  return (
    <View style={campeonatoDetalheStyle.infoCard}>
      <View style={campeonatoDetalheStyle.infoBanner}>
        <Image
          source={
            bannerUrl
              ? { uri: bannerUrl }
              : require("@/assets/images/img/fundoCardCampeonatos2.png")
          }
          style={campeonatoDetalheStyle.infoBannerImagem}
          resizeMode="cover"
        />
        <View style={campeonatoDetalheStyle.infoBannerOverlay} />
        <View
          style={[
            campeonatoDetalheStyle.statusPill,
            campeonatoDetalheStyle.statusPillNoBanner,
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
            numberOfLines={1}
          >
            {selo}
          </Text>
        </View>
      </View>

      <View style={campeonatoDetalheStyle.infoIdentidade}>
        <View style={campeonatoDetalheStyle.infoLogoCaixa}>
          <Image
            source={
              logoUrl
                ? { uri: logoUrl }
                : require("@/assets/images/img/campeonatosVermelho.png")
            }
            style={
              logoUrl
                ? campeonatoDetalheStyle.campeonatoLogo
                : campeonatoDetalheStyle.campeonatoLogoPadrao
            }
            resizeMode="contain"
          />
        </View>
        <View style={campeonatoDetalheStyle.infoIdentidadeTexto}>
          {formato && (
            <View style={campeonatoDetalheStyle.formatoPill}>
              <Text style={campeonatoDetalheStyle.formatoPillText}>{formato}</Text>
            </View>
          )}
          {organizador && (
            <Text style={campeonatoDetalheStyle.organizadorTexto} numberOfLines={2}>
              Organizado por{" "}
              <Text style={campeonatoDetalheStyle.organizadorNome}>{organizador}</Text>
            </Text>
          )}
        </View>
      </View>

      <View style={campeonatoDetalheStyle.infoRows}>
        {linhas.map((linha) => (
          <View key={linha.rotulo} style={campeonatoDetalheStyle.infoRow}>
            <View style={campeonatoDetalheStyle.infoIconeCaixa}>
              <Image
                source={linha.icone}
                style={campeonatoDetalheStyle.infoIcone}
                resizeMode="contain"
              />
            </View>
            <View style={campeonatoDetalheStyle.infoTextoCol}>
              <Text style={campeonatoDetalheStyle.infoLabel}>{linha.rotulo}</Text>
              <Text style={campeonatoDetalheStyle.infoValue}>{linha.valor}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
