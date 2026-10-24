import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router } from "expo-router";

import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";

import fundoStyle from "@/styles/fundoStyle";
import homeStyle from "@/styles/homeStyle";

import { cores } from "@/styles/variaveis";
import {
  abrirDetalhe,
  formatarDiaCompromisso,
  temDetalhe,
} from "@/utils/eventos";

// categoria: números da categoria atual (ex.: Sub-13); total: desde que entrou na escolinha
type ModoEstatistica = "categoria" | "total";

type TipoAtleta = "linha" | "goleiro";

type Estatistica = {
  id: string;
  titulo: string;
  valor: string;
  icone?: ImageSourcePropType;
  tipoIcone?: "amarelo" | "vermelho" | "goleiro";
};

// Só os campos de GET /api/v1/atleta usados na Home
type Atleta = {
  nome_atleta: string;
  foto_url: string | null;
  posicao_atleta: string | null;
  categorias: {
    nome_categoria: string;
    pivot: {
      status_categoria_atleta: string;
      data_fim_categoria_atleta: string | null;
    };
  }[];
};

type TimeJogo = {
  id_time: number;
  nome_time: string;
  logo_url: string | null;
};

// Só os campos de um evento de GET /api/v1/agenda usados na Home
type Evento = {
  id_evento: number;
  titulo: string;
  tipo: string;
  categoria: string | null;
  data: string;
  horario_inicio: string | null;
  local: string | null;
  // Só vem do servidor que tem o detalhe do evento (decide se o toque abre o detalhe)
  responsavel?: string | null;
  situacao: string;
  jogo: {
    amistoso: boolean;
    campeonato: { id_campeonato: number; nome_campeonato: string } | null;
    time_casa: TimeJogo;
    time_visitante: TimeJogo;
    time_do_atleta: TimeJogo | null;
  } | null;
};

const MESES = [
  "JAN", "FEV", "MAR", "ABR", "MAI", "JUN",
  "JUL", "AGO", "SET", "OUT", "NOV", "DEZ",
];

// "2026-10-15T00:00:00-03:00" + "10:00" -> "15 OUT · 10:00"
// Recorta o texto da data (já vem no horário de Brasília) para não depender do fuso do aparelho
function formatarDataJogo(data: string, horario: string | null) {
  const dia = data.slice(8, 10);
  const mes = MESES[Number(data.slice(5, 7)) - 1];
  return `${dia} ${mes} · ${horario ?? "A definir"}`;
}

// Números de GET /api/v1/atleta/estatisticas; gols e assistencias null = ainda não registrado
type Numeros = {
  partidas: number;
  convocacoes: number;
  cartoes_amarelos: number;
  cartoes_vermelhos: number;
  gols: number | null;
  assistencias: number | null;
};

type NumerosDaCategoria = Numeros & {
  id_categoria: number;
  nome_categoria: string; // "Sub-13"
  categoria: string; // "Sub-13 Masculino"
};

type Estatisticas = {
  total: Numeros;
  // null = sem categoria ativa; ausente = servidor ainda sem esse bloco
  categoria_atual?: NumerosDaCategoria | null;
};

// null (não registrado) ou ainda carregando aparece como "—", diferente de 0
function exibirNumero(valor: number | null | undefined) {
  return valor == null ? "—" : String(valor);
}

export default function Home() {
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [proximoJogo, setProximoJogo] = useState<Evento | null>(null);
  // null enquanto a agenda não chegou (ou falhou)
  const [proximasAtividades, setProximasAtividades] = useState<
    Evento[] | null
  >(null);
  const [estatisticasApi, setEstatisticasApi] = useState<Estatisticas | null>(
    null,
  );

  useEffect(() => {
    async function carregarDados() {
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
        const [
          respostaAtleta,
          respostaAgenda,
          respostaJogos,
          respostaEstatisticas,
        ] = await Promise.all([
          fetch(`${API}/atleta`, { headers }),
          fetch(`${API}/agenda`, { headers }),
          // Só os jogos, para o banner achar o próximo mesmo com muitos treinos antes
          fetch(`${API}/agenda?tipo=JOGO`, { headers }),
          fetch(`${API}/atleta/estatisticas`, { headers }),
        ]);

        // Token vencido, encerrado ou atleta inativado: volta para o login
        if (respostaAtleta.status === 401 || respostaAtleta.status === 403) {
          await AsyncStorage.multiRemove(["token", "perfil"]);
          router.replace("/selecao-perfil");
          return;
        }

        const jsonAtleta = await respostaAtleta.json();
        if (jsonAtleta.success) setAtleta(jsonAtleta.data);

        const ehProximoJogo = (e: Evento) =>
          e.tipo === "JOGO" && e.jogo && e.situacao !== "CANCELADO";

        const jsonAgenda = await respostaAgenda.json();
        let proximos: Evento[] = [];
        if (jsonAgenda.success) {
          proximos = jsonAgenda.data.proximos;
          // Próximas atividades: os 3 primeiros não cancelados (cancelados aparecem na Agenda)
          setProximasAtividades(
            proximos.filter((e) => e.situacao !== "CANCELADO").slice(0, 3),
          );
        }

        // Banner: primeiro jogo não cancelado da lista só de jogos. Servidor sem o
        // filtro ignora o ?tipo e manda tudo: a mesma busca continua achando o jogo.
        // Se essa chamada falhar, procura na página 1 da agenda, como antes
        const jsonJogos = await respostaJogos.json();
        const jogos: Evento[] = jsonJogos.success
          ? jsonJogos.data.proximos
          : proximos;
        setProximoJogo(jogos.find(ehProximoJogo) ?? null);

        // Sem a rota (ou com erro), os números ficam "—"
        const jsonEstatisticas = await respostaEstatisticas.json();
        if (jsonEstatisticas.success) setEstatisticasApi(jsonEstatisticas.data);
      } catch (erro) {
        console.log("Erro ao buscar dados da Home:", erro);
      }
    }
    carregarDados();
  }, []);

  // Mostra primeiro o time em que o atleta está escalado; sem escalação, o time da casa
  const jogo = proximoJogo?.jogo;
  const meuTime = jogo ? (jogo.time_do_atleta ?? jogo.time_casa) : null;
  const adversario = jogo
    ? meuTime?.id_time === jogo.time_visitante.id_time
      ? jogo.time_casa
      : jogo.time_visitante
    : null;

  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  // Enquanto carrega (ou se falhar), mantém os textos padrão
  const primeiroNome = atleta?.nome_atleta.split(" ")[0] ?? "Atleta";
  const categoriaAtual = atleta?.categorias.find(
    (c) =>
      c.pivot.status_categoria_atleta === "ATIVO" &&
      !c.pivot.data_fim_categoria_atleta,
  );

  const [modalEstatisticasVisivel, setModalEstatisticasVisivel] =
    useState(false);

  const [modoEstatistica, setModoEstatistica] =
    useState<ModoEstatistica>("categoria");

  // Vem da posição principal do atleta na API
  const tipoAtleta: TipoAtleta =
    atleta?.posicao_atleta === "GOLEIRO" ? "goleiro" : "linha";

  const abrirEstatisticas = () => setModalEstatisticasVisivel(true);
  const fecharEstatisticas = () => setModalEstatisticasVisivel(false);

  // Sem categoria ativa (ou servidor sem o bloco), só existe o Total.
  // Enquanto carrega, o botão da categoria aparece com o nome do GET /atleta
  const numerosCategoria = estatisticasApi?.categoria_atual ?? null;
  const temCategoria = estatisticasApi ? numerosCategoria !== null : true;
  const modo: ModoEstatistica = temCategoria ? modoEstatistica : "total";
  const rotuloCategoria =
    numerosCategoria?.nome_categoria ??
    categoriaAtual?.nome_categoria ??
    "Categoria";

  // Os cards abaixo são da categoria atual; o Total mostra só os gols
  const numeros = numerosCategoria;

  const estatisticasLinha: Estatistica[] = [
    {
      id: "gols",
      titulo: "Gols",
      valor: exibirNumero(numeros?.gols),
      icone: require("@/assets/images/img/bolaVermelha.png"),
    },
    {
      id: "assistencias",
      titulo: "Assistências",
      valor: exibirNumero(numeros?.assistencias),
      icone: require("@/assets/images/img/tenisvermelho.png"),
    },
    {
      id: "partidas",
      titulo: "Partidas",
      valor: exibirNumero(numeros?.partidas),
      icone: require("@/assets/images/img/agendaVermelha.png"),
    },
    {
      id: "convocacoes",
      titulo: "Convocações",
      valor: exibirNumero(numeros?.convocacoes),
      icone: require("@/assets/images/img/bandeiravermelha.png"),
    },
    {
      id: "amarelos",
      titulo: "Cartões amarelos",
      valor: exibirNumero(numeros?.cartoes_amarelos),
      tipoIcone: "amarelo",
    },
    {
      id: "vermelhos",
      titulo: "Cartões vermelhos",
      valor: exibirNumero(numeros?.cartoes_vermelhos),
      tipoIcone: "vermelho",
    },
  ];

  // A API ainda não traz defesas nem gols sofridos: ficam "—" (não registrado)
  const estatisticasGoleiro: Estatistica[] = [
    {
      id: "defesas",
      titulo: "Defesas",
      valor: exibirNumero(null),
      tipoIcone: "goleiro",
    },
    {
      id: "golsSofridos",
      titulo: "Gols sofridos",
      valor: exibirNumero(null),
      icone: require("@/assets/images/img/bolaVermelha.png"),
    },
    {
      id: "partidas",
      titulo: "Partidas",
      valor: exibirNumero(numeros?.partidas),
      icone: require("@/assets/images/img/agendaVermelha.png"),
    },
    {
      id: "convocacoes",
      titulo: "Convocações",
      valor: exibirNumero(numeros?.convocacoes),
      icone: require("@/assets/images/img/bandeiravermelha.png"),
    },
    {
      id: "amarelos",
      titulo: "Cartões amarelos",
      valor: exibirNumero(numeros?.cartoes_amarelos),
      tipoIcone: "amarelo",
    },
    {
      id: "vermelhos",
      titulo: "Cartões vermelhos",
      valor: exibirNumero(numeros?.cartoes_vermelhos),
      tipoIcone: "vermelho",
    },
  ];

  // Gols desde que entrou na escolinha (null enquanto o painel não registra)
  const golsTotal: Estatistica = {
    id: "golsTotal",
    titulo: "Gols",
    valor: exibirNumero(estatisticasApi?.total.gols),
    icone: require("@/assets/images/img/bolaVermelha.png"),
  };

  const estatisticas =
    modo === "total"
      ? [golsTotal]
      : tipoAtleta === "goleiro"
        ? estatisticasGoleiro
        : estatisticasLinha;

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="stretch"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={homeStyle.scrollView}
        contentContainerStyle={homeStyle.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={homeStyle.header}>
          <View style={homeStyle.headerTopRow}>
            <View>
              <Text style={homeStyle.greeting}>{saudacao}</Text>

              <Text style={homeStyle.greetingName}>{primeiroNome}</Text>
            </View>

            <View style={homeStyle.headerIconsRow}>
              <View style={homeStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={homeStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>

              <BotaoNotificacoes abaAtiva="home" />
            </View>
          </View>

          <View style={homeStyle.headerBottomRow}>
            <View style={homeStyle.headerInfoCol}>
              <View style={homeStyle.categoriaRow}>
                <Image
                  source={require("@/assets/images/img/escudovermelho.png")}
                  style={homeStyle.categoriaIcon}
                  resizeMode="contain"
                />

                <Text style={homeStyle.categoriaText}>
                  {categoriaAtual
                    ? `Categoria ${categoriaAtual.nome_categoria}`
                    : "Categoria"}
                </Text>
              </View>

              <Text style={homeStyle.centroTexto}>Centro de formação</Text>

              <View style={homeStyle.centroDestaqueRow}>
                <View style={homeStyle.centroLine} />

                <Text style={homeStyle.centroDestaqueText}>de atletas</Text>

                <View style={homeStyle.centroLine} />
              </View>
            </View>

            <View style={homeStyle.avatarCircle}>
              {atleta?.foto_url ? (
                <Image
                  source={{ uri: atleta.foto_url }}
                  style={homeStyle.avatarFoto}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require("@/assets/images/img/perfilPreto.png")}
                  style={homeStyle.avatarIcon}
                  resizeMode="contain"
                />
              )}
            </View>
          </View>
        </View>

        {/* BANNER: próximo jogo do atleta (some quando não há jogo marcado) */}
        {proximoJogo && jogo && meuTime && adversario && (
          <Pressable
            style={homeStyle.banner}
            // Abre o detalhe do jogo; servidor sem o detalhe: Campeonatos, como antes
            onPress={() =>
              temDetalhe(proximoJogo)
                ? abrirDetalhe(proximoJogo.id_evento)
                : router.navigate("/campeonatos")
            }
          >
            <Image
              source={require("@/assets/images/img/fundoCardCampeonatos.png")}
              style={homeStyle.bannerImage}
              resizeMode="cover"
            />

            <View style={homeStyle.bannerOverlay} />

            <View style={homeStyle.bannerContent}>
              <View style={homeStyle.bannerTag}>
                <Text style={homeStyle.bannerTagText}>
                  {jogo.amistoso ? "AMISTOSO" : "CAMPEONATO"}
                </Text>
              </View>

              <Text style={homeStyle.bannerTitle} numberOfLines={1}>
                {jogo.campeonato?.nome_campeonato ?? "Amistoso"}
              </Text>

              <Text style={homeStyle.bannerSubtitle}>
                Próximo desafio da equipe
              </Text>

              <View style={homeStyle.bannerMatchRow}>
                <View style={homeStyle.bannerTeam}>
                  <Image
                    source={
                      meuTime.logo_url
                        ? { uri: meuTime.logo_url }
                        : require("@/assets/images/img/escudovermelho.png")
                    }
                    style={homeStyle.bannerTeamIcon}
                    resizeMode="contain"
                  />

                  <Text style={homeStyle.bannerTeamText} numberOfLines={1}>
                    {meuTime.nome_time}
                  </Text>
                </View>

                <Text style={homeStyle.bannerVersus}>X</Text>

                <Text style={homeStyle.bannerOpponent} numberOfLines={1}>
                  {adversario.nome_time}
                </Text>
              </View>

              <View style={homeStyle.bannerFooter}>
                <Text style={homeStyle.bannerDate}>
                  {formatarDataJogo(proximoJogo.data, proximoJogo.horario_inicio)}
                </Text>

                <Text style={homeStyle.bannerLink}>Ver detalhes {">"}</Text>
              </View>
            </View>
          </Pressable>
        )}

        {/* ESTATÍSTICAS */}
        <View style={homeStyle.statsSection}>
          <View style={homeStyle.statsHeaderRow}>
            <Text style={homeStyle.sectionTitle}>Seus números</Text>

            <Pressable onPress={abrirEstatisticas}>
              <Text style={homeStyle.sectionLink}>Ver estatísticas {">"}</Text>
            </Pressable>
          </View>

          <Pressable style={homeStyle.statsSummary} onPress={abrirEstatisticas}>
            <View style={homeStyle.statSummaryItem}>
              <Image
                source={require("@/assets/images/img/bolaVermelha.png")}
                style={homeStyle.statSummaryIcon}
                resizeMode="contain"
                tintColor={cores.cinza}
              />

              <Text style={homeStyle.statSummaryValue}>
                {exibirNumero(estatisticasApi?.total.gols)}
              </Text>

              <Text style={homeStyle.statSummaryLabel}>Gols</Text>
            </View>

            <View style={homeStyle.statSummaryItem}>
              <Image
                source={require("@/assets/images/img/agendaVermelha.png")}
                style={homeStyle.statSummaryIcon}
                resizeMode="contain"
                tintColor={cores.cinza}
              />

              <Text style={homeStyle.statSummaryValue}>
                {exibirNumero(estatisticasApi?.total.partidas)}
              </Text>

              <Text style={homeStyle.statSummaryLabel}>Partidas</Text>
            </View>

            <View style={homeStyle.statSummaryItem}>
              <Image
                source={require("@/assets/images/img/bandeiravermelha.png")}
                style={homeStyle.statSummaryIcon}
                resizeMode="contain"
                tintColor={cores.cinza}
              />

              <Text style={homeStyle.statSummaryValue}>
                {exibirNumero(estatisticasApi?.total.convocacoes)}
              </Text>

              <Text style={homeStyle.statSummaryLabel}>Convocações</Text>
            </View>
          </Pressable>
        </View>

        {/* PRÓXIMAS ATIVIDADES */}
        <View style={homeStyle.activitiesSection}>
          <View style={homeStyle.activitiesHeaderRow}>
            <Text style={homeStyle.sectionTitle}>Próximas atividades</Text>

            <Pressable onPress={() => router.navigate("/agenda")}>
              <Text style={homeStyle.sectionLink}>Ver todas {">"}</Text>
            </Pressable>
          </View>

          {proximasAtividades?.length === 0 && (
            <Text style={homeStyle.activitySubtitle}>
              Nenhuma atividade marcada por enquanto.
            </Text>
          )}

          {proximasAtividades?.map((atividade, index) => (
            <Pressable
              key={atividade.id_evento}
              style={homeStyle.activityItem}
              // Abre o detalhe; servidor sem o detalhe: a Agenda, como antes
              onPress={() =>
                temDetalhe(atividade)
                  ? abrirDetalhe(atividade.id_evento)
                  : router.navigate("/agenda")
              }
            >
              <Text style={homeStyle.activityDate}>
                {formatarDiaCompromisso(atividade.data)}
              </Text>

              <View style={homeStyle.activityRow}>
                <View style={homeStyle.activityTextCol}>
                  <Text style={homeStyle.activityTitle} numberOfLines={1}>
                    {atividade.titulo}
                  </Text>

                  {/* Sem local, mostra a categoria */}
                  {(atividade.local ?? atividade.categoria) && (
                    <Text style={homeStyle.activitySubtitle} numberOfLines={1}>
                      {atividade.local ?? atividade.categoria}
                    </Text>
                  )}
                </View>

                <Text style={homeStyle.activityTime}>
                  {atividade.horario_inicio ?? "A definir"}
                </Text>
              </View>

              {index < proximasAtividades.length - 1 && (
                <View style={homeStyle.activityDivider} />
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <TabBar abaAtiva="home" />

      {/* MODAL DE ESTATÍSTICAS */}
      <Modal
        visible={modalEstatisticasVisivel}
        transparent
        animationType="slide"
        onRequestClose={fecharEstatisticas}
      >
        <View style={homeStyle.modalContainer}>
          <Pressable
            style={homeStyle.modalOverlay}
            onPress={fecharEstatisticas}
          />

          <View style={homeStyle.bottomSheet}>
            <View style={homeStyle.sheetHandle} />

            <View style={homeStyle.sheetHeader}>
              <Text style={homeStyle.sheetTitle}>Estatísticas</Text>

              <Pressable
                style={homeStyle.sheetCloseButton}
                onPress={fecharEstatisticas}
              >
                <Text style={homeStyle.sheetCloseText}>×</Text>
              </Pressable>
            </View>

            {/* MODO DE FILTRO */}
            <View style={homeStyle.filterRow}>
              {temCategoria && (
                <Pressable
                  style={[
                    homeStyle.filterButton,
                    modo === "categoria" && homeStyle.filterButtonActive,
                  ]}
                  onPress={() => setModoEstatistica("categoria")}
                >
                  <Text
                    style={[
                      homeStyle.filterButtonText,
                      modo === "categoria" && homeStyle.filterButtonTextActive,
                    ]}
                  >
                    {rotuloCategoria}
                  </Text>
                </Pressable>
              )}

              <Pressable
                style={[
                  homeStyle.filterButton,
                  modo === "total" && homeStyle.filterButtonActive,
                ]}
                onPress={() => setModoEstatistica("total")}
              >
                <Text
                  style={[
                    homeStyle.filterButtonText,
                    modo === "total" && homeStyle.filterButtonTextActive,
                  ]}
                >
                  Total
                </Text>
              </Pressable>
            </View>

            <Text style={homeStyle.statsModalTitle}>
              {modo === "categoria"
                ? `Estatísticas — ${numerosCategoria?.categoria ?? rotuloCategoria}`
                : "Gols desde que entrou na escolinha"}
            </Text>

            <View style={homeStyle.statsGrid}>
              {estatisticas.map((estatistica) => (
                <View
                  key={estatistica.id}
                  style={[
                    homeStyle.statCard,
                    modo === "total" && homeStyle.statCardFull,
                  ]}
                >
                  <View style={homeStyle.statCardIcon}>
                    {"icone" in estatistica && estatistica.icone ? (
                      <Image
                        source={estatistica.icone}
                        style={homeStyle.statIconImage}
                        resizeMode="contain"
                      />
                    ) : estatistica.tipoIcone === "amarelo" ? (
                      <View
                        style={[
                          homeStyle.cardColorIcon,
                          homeStyle.yellowCardIcon,
                        ]}
                      />
                    ) : estatistica.tipoIcone === "vermelho" ? (
                      <View
                        style={[homeStyle.cardColorIcon, homeStyle.redCardIcon]}
                      />
                    ) : (
                      <Text style={homeStyle.goalkeeperIcon}>🧤</Text>
                    )}
                  </View>

                  <View style={homeStyle.statCardText}>
                    <Text style={homeStyle.statCardLabel}>
                      {estatistica.titulo}
                    </Text>

                    <Text style={homeStyle.statCardValue}>
                      {estatistica.valor}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
