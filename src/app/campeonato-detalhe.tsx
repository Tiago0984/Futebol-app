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
  placarTexto,
  resultadoDaAacj,
  useCampeonato,
  voltarParaCampeonatos,
} from "@/utils/campeonatos";
import { abrirDetalhe, chaveDoDia } from "@/utils/eventos";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function CampeonatoDetalhe() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { campeonato, erro, idCategoria: categoriaPadrao, eventosNaAgenda } =
    useCampeonato(id);
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
    const situacao =
      fim < hoje ? "ENCERRADO" : inicio > hoje ? "EM_BREVE" : "ANDAMENTO";

    const jogos = jogosDaCategoria(c, idCategoria);
    const realizados = jogos.filter(jogado);
    const pendentes = jogos.filter((j) => !jogado(j));
    const progresso = jogos.length
      ? Math.floor((realizados.length / jogos.length) * 100)
      : 0;
    // Fase atual: a do próximo jogo sem placar; tudo jogado, a do último
    const faseAtual = (pendentes[0] ?? realizados[realizados.length - 1])?.fase;
    const futuros = jogosFuturos(jogos, hoje);
    const proximo = futuros[0];
    const proximos = futuros.slice(1, 4);
    const ultimos = realizados.slice(-3).reverse();

    const grupos = gruposDaCategoria(c, idCategoria);
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

    const escudo = escudoDoTime;

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
              <Pressable onPress={() => verCompleto("/proxima-partida")}>
                <Text style={campeonatoDetalheStyle.tableLink}>
                  Ver completo {">"}
                </Text>
              </Pressable>
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
    (cat) => cat.id_categoria === idCategoria,
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
