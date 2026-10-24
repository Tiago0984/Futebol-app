import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import detalheCompromissoStyle from "@/styles/detalheCompromissoStyle";
import detalheProximaPartidaStyle from "@/styles/detalheProximaPartidaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import treinoTecnicoStyle from "@/styles/treinoTecnicoStyle";
import {
  formatarDiaCompromisso,
  formatarDuracao,
  linkGoogleAgenda,
  nomePorTipo,
  visualDoTipo,
} from "@/utils/eventos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Time = { id_time: number; nome_time: string; logo_url: string | null };
type Gols = { casa: number; visitante: number };

// Só os campos de GET /api/v1/agenda/{idEvento} usados nesta tela
type EventoDetalhe = {
  id_evento: number;
  titulo: string;
  tipo: string;
  descricao: string | null;
  categoria: string | null;
  data: string;
  horario_inicio: string | null;
  horario_fim: string | null;
  inicio: string | null;
  fim: string | null;
  local: string | null;
  responsavel?: string | null;
  situacao: "CONFIRMADO" | "CANCELADO";
  concluido?: boolean;
  jogo: {
    amistoso: boolean;
    campeonato: { nome_campeonato: string } | null;
    time_casa: Time;
    time_visitante: Time;
    time_do_atleta: Time | null;
    placar: Gols | null;
    horario_chegada: string | null;
    adversario?: Time | null;
    fase_completa?: string | null;
    rodada?: number | null;
    penaltis?: Gols | null;
    confronto?: { texto: string } | null;
  } | null;
};

const escudoPadrao = require("@/assets/images/img/escudovermelho.png");

// "Faltam 2h 15min", "Faltam 3 dias", "Acontecendo agora" ou "Concluído"; null no cancelado
function contagem(evento: EventoDetalhe, agora: Date) {
  if (evento.situacao === "CANCELADO") return null;
  const terminou =
    evento.concluido ?? (evento.fim ? new Date(evento.fim) <= agora : false);
  if (terminou) return { texto: "Concluído", concluido: true };
  if (!evento.inicio) return null;
  const minutos = Math.ceil(
    (new Date(evento.inicio).getTime() - agora.getTime()) / 60000,
  );
  if (minutos <= 0) return { texto: "Acontecendo agora", concluido: false };
  if (minutos >= 24 * 60) {
    const dias = Math.floor(minutos / (24 * 60));
    return {
      texto: `Faltam ${dias} ${dias === 1 ? "dia" : "dias"}`,
      concluido: false,
    };
  }
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  const texto =
    horas === 0 ? `${resto}min` : resto === 0 ? `${horas}h` : `${horas}h ${resto}min`;
  return { texto: `Faltam ${texto}`, concluido: false };
}

// O time da AACJ fica à esquerda: o do atleta ou, sem escalação, o que não é o adversário
function timesDoJogo(jogo: NonNullable<EventoDetalhe["jogo"]>) {
  const meuTime =
    jogo.time_do_atleta ??
    (jogo.adversario?.id_time === jogo.time_casa.id_time
      ? jogo.time_visitante
      : jogo.time_casa);
  const souCasa = meuTime.id_time === jogo.time_casa.id_time;
  const adversario =
    jogo.adversario ?? (souCasa ? jogo.time_visitante : jogo.time_casa);
  // Placar e pênaltis na mesma ordem dos escudos
  const naOrdem = (gols: Gols) =>
    souCasa ? `${gols.casa} × ${gols.visitante}` : `${gols.visitante} × ${gols.casa}`;
  return { meuTime, adversario, naOrdem };
}

export default function DetalheCompromisso() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [evento, setEvento] = useState<EventoDetalhe | null>(null);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");

  useEffect(() => {
    let ativa = true;
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      try {
        const resposta = await fetch(`${API}/agenda/${id}`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Token vencido, encerrado ou atleta inativado: volta para o login
        if (resposta.status === 401 || resposta.status === 403) {
          await AsyncStorage.multiRemove(["token", "perfil"]);
          router.replace("/selecao-perfil");
          return;
        }
        const json = await resposta.json();
        if (!ativa) return;
        if (resposta.status === 404) {
          setErro("Este compromisso não está mais na sua agenda.");
        } else if (!resposta.ok || !json.success) {
          setErro(json.message ?? "Não foi possível carregar o compromisso.");
        } else {
          setEvento(json.data);
        }
      } catch (e) {
        console.log("Erro ao buscar o compromisso:", e);
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
      router.replace("/agenda");
    }
  }

  function horarioTexto(e: EventoDetalhe) {
    if (!e.horario_inicio) return "Horário a definir";
    return e.horario_fim
      ? `${e.horario_inicio} às ${e.horario_fim}`
      : e.horario_inicio;
  }

  function abrirMapa(local: string) {
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`,
    );
  }

  // No celular abre o compartilhamento do sistema; onde não existe (alguns
  // navegadores), copia o texto
  async function compartilhar(e: EventoDetalhe) {
    const mensagem = [
      e.titulo,
      `${formatarDiaCompromisso(e.data)} · ${horarioTexto(e)}`,
      e.local,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await Share.share({ message: mensagem });
      return;
    } catch {
      // Sem compartilhamento: tenta copiar abaixo
    }
    try {
      await Clipboard.setStringAsync(mensagem);
      setAviso("Informações copiadas. É só colar onde quiser.");
    } catch {
      setAviso("Não foi possível compartilhar neste aparelho.");
    }
    setTimeout(() => setAviso(""), 4000);
  }

  // Ações rápidas, em linhas de duas. "Abrir mapa" só com local
  function linhasDeAcoes(e: EventoDetalhe) {
    const acoes = [
      e.local && {
        titulo: "Abrir mapa",
        subtitulo: "Procurar o local no mapa",
        icone: require("@/assets/images/img/mapavermelho.png"),
        aoTocar: () => abrirMapa(e.local as string),
      },
      {
        titulo: "Adicionar ao calendário",
        subtitulo: "Salvar o compromisso no Google Agenda",
        icone: require("@/assets/images/img/agendaVermelha.png"),
        aoTocar: () => Linking.openURL(linkGoogleAgenda(e)),
      },
      {
        titulo: "Compartilhar",
        subtitulo: "Enviar data, horário e local para outra pessoa",
        icone: require("@/assets/images/img/compartilharVermelho.png"),
        aoTocar: () => compartilhar(e),
      },
    ].filter((acao) => !!acao);
    const linhas: (typeof acoes)[] = [];
    for (let i = 0; i < acoes.length; i += 2) linhas.push(acoes.slice(i, i + 2));
    return linhas;
  }

  let conteudo;
  if (erro) {
    conteudo = <Text style={detalheCompromissoStyle.estadoTexto}>{erro}</Text>;
  } else if (!evento) {
    conteudo = (
      <Text style={detalheCompromissoStyle.estadoTexto}>
        Carregando compromisso...
      </Text>
    );
  } else {
    const visual = visualDoTipo(evento.tipo);
    const cancelado = evento.situacao === "CANCELADO";
    const restante = contagem(evento, new Date());
    const duracao = formatarDuracao(evento.inicio, evento.fim);
    const jogo = evento.jogo;
    const times = jogo ? timesDoJogo(jogo) : null;
    const [nomeDia, dataDia] = formatarDiaCompromisso(evento.data).split(" · ");

    conteudo = (
      <>
        <View style={treinoTecnicoStyle.statusRow}>
          {cancelado ? (
            <View style={detalheCompromissoStyle.cancelledPill}>
              <View style={detalheCompromissoStyle.cancelledIconCircle}>
                <Image
                  source={require("@/assets/images/img/xBranco.png")}
                  style={detalheCompromissoStyle.cancelledIcon}
                  resizeMode="contain"
                />
              </View>
              <Text style={detalheCompromissoStyle.cancelledText}>
                Cancelado
              </Text>
            </View>
          ) : (
            <View style={treinoTecnicoStyle.confirmedPill}>
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={treinoTecnicoStyle.confirmedIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.confirmedText} numberOfLines={1}>
                Confirmado
              </Text>
            </View>
          )}
          {restante && (
            <View
              style={
                restante.concluido
                  ? detalheCompromissoStyle.concludedPill
                  : treinoTecnicoStyle.countdownPill
              }
            >
              <Text
                style={
                  restante.concluido
                    ? detalheCompromissoStyle.concludedText
                    : treinoTecnicoStyle.countdownText
                }
                numberOfLines={1}
              >
                {restante.texto}
              </Text>
            </View>
          )}
        </View>

        <View style={treinoTecnicoStyle.heroSection}>
          <View>
            <Image
              source={visual.icone}
              style={treinoTecnicoStyle.heroIcon}
              resizeMode="contain"
            />
          </View>
          <View style={treinoTecnicoStyle.heroTextCol}>
            <Text style={detalheCompromissoStyle.heroTitle} numberOfLines={2}>
              {evento.titulo}
            </Text>
            <View style={treinoTecnicoStyle.heroMetaRow}>
              <Image
                source={require("@/assets/images/img/agendaVermelha.png")}
                style={treinoTecnicoStyle.heroMetaIcon}
                resizeMode="contain"
              />
              <Text style={treinoTecnicoStyle.heroMetaText} numberOfLines={1}>
                {nomeDia}
              </Text>
              <View style={treinoTecnicoStyle.heroMetaDot} />
              <Text
                style={treinoTecnicoStyle.heroMetaTextMuted}
                numberOfLines={1}
              >
                {dataDia}
              </Text>
            </View>
          </View>
        </View>

        <View style={treinoTecnicoStyle.infoRow}>
          <View style={treinoTecnicoStyle.infoCol}>
            <Image
              source={require("@/assets/images/img/clockvermelho.png")}
              style={treinoTecnicoStyle.infoIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.infoTextCol}>
              <Text
                style={treinoTecnicoStyle.infoLabel}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
              >
                {horarioTexto(evento)}
              </Text>
              {duracao && (
                <Text style={treinoTecnicoStyle.infoSubLabel} numberOfLines={2}>
                  Duração: {duracao}
                </Text>
              )}
            </View>
          </View>
          <View style={treinoTecnicoStyle.infoCol}>
            <Image
              source={require("@/assets/images/img/localizacaoVermelho.png")}
              style={treinoTecnicoStyle.infoIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.infoTextCol}>
              <Text style={treinoTecnicoStyle.infoLabel} numberOfLines={2}>
                {evento.local ?? "Local a definir"}
              </Text>
            </View>
          </View>
        </View>

        {/* Jogo: os times, o placar (se já jogado), campeonato, fase e quem passa */}
        {jogo && times && (
          <View style={detalheProximaPartidaStyle.matchCard}>
            <View style={detalheProximaPartidaStyle.teamsRow}>
              <View style={detalheProximaPartidaStyle.teamCol}>
                <Image
                  source={
                    times.meuTime.logo_url
                      ? { uri: times.meuTime.logo_url }
                      : escudoPadrao
                  }
                  style={detalheProximaPartidaStyle.teamCrest}
                  resizeMode="contain"
                />
                <Text
                  style={detalheProximaPartidaStyle.teamName}
                  numberOfLines={2}
                >
                  {times.meuTime.nome_time}
                </Text>
              </View>
              {jogo.placar ? (
                <Text style={detalheCompromissoStyle.placar}>
                  {times.naOrdem(jogo.placar)}
                </Text>
              ) : (
                <Text style={detalheProximaPartidaStyle.vsText}>Vs</Text>
              )}
              <View style={detalheProximaPartidaStyle.teamCol}>
                <Image
                  source={
                    times.adversario.logo_url
                      ? { uri: times.adversario.logo_url }
                      : escudoPadrao
                  }
                  style={detalheProximaPartidaStyle.teamCrest}
                  resizeMode="contain"
                />
                <Text
                  style={detalheProximaPartidaStyle.teamName}
                  numberOfLines={2}
                >
                  {times.adversario.nome_time}
                </Text>
              </View>
            </View>

            <View style={detalheProximaPartidaStyle.matchDivider} />

            <Text style={detalheCompromissoStyle.jogoInfo}>
              {jogo.campeonato?.nome_campeonato ?? "Amistoso"}
            </Text>
            {jogo.fase_completa && (
              <Text style={detalheCompromissoStyle.jogoInfoMuted}>
                {jogo.fase_completa}
                {jogo.rodada ? ` · Rodada ${jogo.rodada}` : ""}
              </Text>
            )}
            {jogo.penaltis && (
              <Text style={detalheCompromissoStyle.jogoInfoMuted}>
                Pênaltis: {times.naOrdem(jogo.penaltis)}
              </Text>
            )}
            {jogo.confronto && (
              <Text style={detalheCompromissoStyle.jogoInfoMuted}>
                {jogo.confronto.texto}
              </Text>
            )}
            {jogo.horario_chegada && !restante?.concluido && !cancelado && (
              <Text style={detalheCompromissoStyle.jogoChegada}>
                Chegar às {jogo.horario_chegada}
              </Text>
            )}
          </View>
        )}

        <View style={treinoTecnicoStyle.detailsCard}>
          {evento.categoria && (
            <View style={treinoTecnicoStyle.detailsRow}>
              <Image
                source={require("@/assets/images/img/bandeiravermelha.png")}
                style={treinoTecnicoStyle.detailsIcon}
                resizeMode="contain"
              />
              <View style={treinoTecnicoStyle.detailsTextCol}>
                <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                  Categoria
                </Text>
                <Text style={treinoTecnicoStyle.detailsValue} numberOfLines={1}>
                  {evento.categoria}
                </Text>
              </View>
            </View>
          )}

          {evento.responsavel && (
            <View
              style={[
                treinoTecnicoStyle.detailsRow,
                evento.categoria && treinoTecnicoStyle.detailsRowDivider,
              ]}
            >
              <Image
                source={require("@/assets/images/img/perfilVermelho.png")}
                style={treinoTecnicoStyle.detailsIcon}
                resizeMode="contain"
              />
              <View style={treinoTecnicoStyle.detailsTextCol}>
                <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                  Responsável
                </Text>
                <Text style={treinoTecnicoStyle.detailsValue} numberOfLines={1}>
                  {evento.responsavel}
                </Text>
              </View>
            </View>
          )}

          <View
            style={[
              treinoTecnicoStyle.detailsRow,
              (evento.categoria || evento.responsavel) &&
                treinoTecnicoStyle.detailsRowDivider,
            ]}
          >
            <Image
              source={visual.icone}
              style={treinoTecnicoStyle.detailsIcon}
              resizeMode="contain"
            />
            <View style={treinoTecnicoStyle.detailsTextCol}>
              <Text style={treinoTecnicoStyle.detailsLabel} numberOfLines={1}>
                Tipo de atividade
              </Text>
              <Text style={treinoTecnicoStyle.detailsValue} numberOfLines={1}>
                {nomePorTipo[evento.tipo] ?? evento.tipo}
              </Text>
            </View>
          </View>
        </View>

        {evento.descricao && (
          <View style={treinoTecnicoStyle.observacoesCard}>
            <View>
              <Image
                source={require("@/assets/images/img/informacaovermelho.png")}
                style={treinoTecnicoStyle.observacoesIcon}
                resizeMode="contain"
              />
            </View>
            <View style={treinoTecnicoStyle.observacoesTextCol}>
              <Text style={treinoTecnicoStyle.observacoesTitle} numberOfLines={1}>
                Observações
              </Text>
              <Text style={treinoTecnicoStyle.observacoesItemText}>
                {evento.descricao}
              </Text>
            </View>
          </View>
        )}

        <View style={treinoTecnicoStyle.quickActionsSection}>
          <View style={treinoTecnicoStyle.sectionTitleRow}>
            <View style={treinoTecnicoStyle.sectionTitleIconBox}>
              <Image
                source={require("@/assets/images/img/raiovermelho.png")}
                style={treinoTecnicoStyle.sectionTitleIcon}
                resizeMode="contain"
              />
            </View>
            <Text style={treinoTecnicoStyle.sectionTitle} numberOfLines={1}>
              Ações rápidas
            </Text>
          </View>

          <View style={treinoTecnicoStyle.quickActionsGrid}>
            {linhasDeAcoes(evento).map((linha, i, linhas) => (
              <View
                key={i}
                style={[
                  treinoTecnicoStyle.quickActionRow,
                  i < linhas.length - 1 && treinoTecnicoStyle.quickActionRowDivider,
                ]}
              >
                {linha.map((acao, j) => (
                  <Pressable
                    key={acao.titulo}
                    style={[
                      treinoTecnicoStyle.quickActionCell,
                      j < linha.length - 1 &&
                        treinoTecnicoStyle.quickActionCellDivider,
                    ]}
                    onPress={acao.aoTocar}
                  >
                    <View style={treinoTecnicoStyle.quickActionTopRow}>
                      <Image
                        source={acao.icone}
                        style={treinoTecnicoStyle.quickActionIcon}
                        resizeMode="contain"
                      />
                      <View style={treinoTecnicoStyle.quickActionTextCol}>
                        {/* Até duas linhas: na web o texto não diminui para caber */}
                        <Text
                          style={treinoTecnicoStyle.quickActionTitle}
                          numberOfLines={2}
                        >
                          {acao.titulo}
                        </Text>
                        <Text
                          style={treinoTecnicoStyle.quickActionSubtitle}
                          numberOfLines={3}
                        >
                          {acao.subtitulo}
                        </Text>
                      </View>
                      <Text style={treinoTecnicoStyle.quickActionChevron}>›</Text>
                    </View>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          {aviso !== "" && (
            <Text style={detalheCompromissoStyle.avisoAcao}>{aviso}</Text>
          )}
        </View>
      </>
    );
  }

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
        }}
      >
        <View style={treinoTecnicoStyle.header}>
          <View style={treinoTecnicoStyle.headerTopRow}>
            <Pressable
              style={treinoTecnicoStyle.backButton}
              onPress={voltar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={treinoTecnicoStyle.backChevron}>‹</Text>
            </Pressable>
            <View style={treinoTecnicoStyle.headerIconsRow}>
              <View style={treinoTecnicoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={treinoTecnicoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="agenda" />
            </View>
          </View>
        </View>

        {conteudo}
      </ScrollView>

      <TabBar abaAtiva="agenda" />
    </View>
  );
}
