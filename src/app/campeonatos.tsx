import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { chaveDoDia } from "@/utils/eventos";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Categoria = { id_categoria: number; rotulo: string };

// Só os campos de GET /api/v1/campeonatos usados nesta tela
type Campeonato = {
  id_campeonato: number;
  nome_campeonato: string;
  organizador_campeonato: string | null;
  tipo_label?: string;
  logo_url: string | null;
  banner_url: string | null;
  data_inicio_campeonato: string;
  data_fim_campeonato: string;
  categorias: Categoria[];
  // Jogos já marcados (o total cresce quando o mata-mata é montado); servidor antigo não manda
  resumo?: {
    fase_atual_label: string | null;
    rodada_atual: number | null;
    total_rodadas: number | null;
    jogos_realizados: number;
    total_jogos: number;
  } | null;
};

// GET /api/v1/campeonatos-do-atleta: em quais o atleta participa e como
type Participacao = {
  id_campeonato: number;
  convocada: boolean;
  convocacoes: { id_categoria: number; rotulo: string; camisa: number }[];
  categorias: Categoria[];
};

type Situacao = "ANDAMENTO" | "EM_BREVE" | "ENCERRADO";
type Filtro = "TODOS" | "MEUS" | Situacao;

const FILTROS: { valor: Filtro; rotulo: string }[] = [
  { valor: "TODOS", rotulo: "Todos" },
  { valor: "MEUS", rotulo: "Meus" },
  { valor: "ANDAMENTO", rotulo: "Em andamento" },
  { valor: "EM_BREVE", rotulo: "Em breve" },
  { valor: "ENCERRADO", rotulo: "Encerrados" },
];

// "2026-10-03T00:00:00-03:00" -> "03/10"
function diaMes(data: string) {
  return `${data.slice(8, 10)}/${data.slice(5, 7)}`;
}

// Com jogos marcados: "Fase de grupos · Rodada 4 de 5" (ou "6 de 10 jogos") e o progresso
// pelos jogos com placar. Sem eles, a situação pelas datas
function andamento(c: Campeonato, hoje: string) {
  const pelasDatas = andamentoPelasDatas(c, hoje);
  const r = c.resumo;
  if (!r || r.total_jogos === 0) return pelasDatas;
  const etapa =
    r.rodada_atual && r.total_rodadas
      ? `Rodada ${r.rodada_atual} de ${r.total_rodadas}`
      : `${r.jogos_realizados} de ${r.total_jogos} ${r.total_jogos === 1 ? "jogo" : "jogos"}`;
  return {
    situacao: pelasDatas.situacao,
    texto: [r.fase_atual_label, etapa].filter(Boolean).join(" · "),
    progresso: Math.floor((r.jogos_realizados / r.total_jogos) * 100),
  };
}

// Situação e progresso pelas datas (recortadas do texto, sem passar pelo fuso do aparelho)
function andamentoPelasDatas(c: Campeonato, hoje: string) {
  const inicio = c.data_inicio_campeonato.slice(0, 10);
  const fim = c.data_fim_campeonato.slice(0, 10);
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

const ROTULO_SITUACAO: Record<Situacao, string> = {
  ANDAMENTO: "Em andamento",
  EM_BREVE: "Em breve",
  ENCERRADO: "Encerrado",
};

// Em andamento primeiro (o que termina antes), depois os próximos, depois os encerrados
const ORDEM: Record<Situacao, number> = { ANDAMENTO: 0, EM_BREVE: 1, ENCERRADO: 2 };

export default function Campeonatos() {
  const insets = useSafeAreaInsets();
  const { width: larguraTela } = useWindowDimensions();
  const larguraCard = Math.min(larguraTela - 40, 560);

  const [filtroAtivo, setFiltroAtivo] = useState<Filtro>("TODOS");
  const [campeonatos, setCampeonatos] = useState<Campeonato[] | null>(null);
  const [participacoes, setParticipacoes] = useState<
    Record<number, Participacao>
  >({});
  const [erro, setErro] = useState("");
  // O "Atualizar" soma 1 e a busca roda de novo
  const [recarga, setRecarga] = useState(0);

  useEffect(() => {
    let ativa = true;
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      try {
        const [respostaLista, respostaMeus] = await Promise.all([
          fetch(`${API}/campeonatos`, { headers: { Accept: "application/json" } }),
          fetch(await urlDoAtleta("/campeonatos-do-atleta"), {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        // Token vencido, encerrado ou atleta inativado: volta para o login
        if (respostaMeus.status === 401 || respostaMeus.status === 403) {
          await AsyncStorage.multiRemove(CHAVES_SESSAO);
          router.replace("/selecao-perfil");
          return;
        }

        const jsonLista = await respostaLista.json();
        if (!ativa) return;
        if (!respostaLista.ok || !jsonLista.success) {
          setErro(jsonLista.message ?? "Não foi possível carregar os campeonatos.");
          return;
        }

        // Servidor sem a rota (404): a lista aparece, só sem o "Meus" marcado
        const meus: Record<number, Participacao> = {};
        if (respostaMeus.ok) {
          const jsonMeus = await respostaMeus.json();
          if (!ativa) return;
          if (jsonMeus.success) {
            for (const p of jsonMeus.data as Participacao[]) {
              meus[p.id_campeonato] = p;
            }
          }
        }
        setParticipacoes(meus);
        setCampeonatos(jsonLista.data);
        setErro("");
      } catch (e) {
        console.log("Erro ao buscar os campeonatos:", e);
        if (ativa) setErro("Não foi possível conectar ao servidor.");
      }
    })();
    return () => {
      ativa = false;
    };
  }, [recarga]);

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/home");
    }
  }

  function abrirCampeonato(id: number) {
    router.navigate({
      pathname: "/campeonato-detalhe",
      params: { id: String(id) },
    });
  }

  // Linha de baixo do card: a participação do atleta ou, sem ela, as categorias
  function participacaoTexto(c: Campeonato) {
    const p = participacoes[c.id_campeonato];
    if (p?.convocada && p.convocacoes.length > 0) {
      return {
        rotulo: "Sua participação",
        valor: p.convocacoes
          .map((conv) => `Convocação no ${conv.rotulo} · camisa ${conv.camisa}`)
          .join("\n"),
      };
    }
    if (p) {
      return {
        rotulo: "Sua participação",
        valor: `Sua categoria participa (${p.categorias.map((cat) => cat.rotulo).join(", ")})`,
      };
    }
    return {
      rotulo: "Categorias",
      valor: c.categorias.map((cat) => cat.rotulo).join(" · ") || "—",
    };
  }

  const hoje = chaveDoDia(new Date());
  const lista = (campeonatos ?? [])
    .map((c) => ({ c, a: andamento(c, hoje) }))
    .filter(({ c, a }) =>
      filtroAtivo === "TODOS"
        ? true
        : filtroAtivo === "MEUS"
          ? !!participacoes[c.id_campeonato]
          : a.situacao === filtroAtivo,
    )
    .sort((x, y) => {
      if (x.a.situacao !== y.a.situacao) {
        return ORDEM[x.a.situacao] - ORDEM[y.a.situacao];
      }
      if (x.a.situacao === "EM_BREVE") {
        return x.c.data_inicio_campeonato.localeCompare(y.c.data_inicio_campeonato);
      }
      if (x.a.situacao === "ENCERRADO") {
        return y.c.data_fim_campeonato.localeCompare(x.c.data_fim_campeonato);
      }
      return x.c.data_fim_campeonato.localeCompare(y.c.data_fim_campeonato);
    });

  const semNenhum = campeonatos !== null && campeonatos.length === 0;

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
        <View style={campeonatosStyle.header}>
          <View style={campeonatosStyle.headerTopRow}>
            <Pressable
              style={campeonatosStyle.backButton}
              onPress={voltar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={campeonatosStyle.backChevron}>‹</Text>
            </Pressable>
            <View style={campeonatosStyle.headerTitleCol}>
              <Text style={campeonatosStyle.screenTitle}>Campeonatos</Text>
              <Text style={campeonatosStyle.screenSubtitle}>
                Temporada {hoje.slice(0, 4)}
              </Text>
            </View>
            <View style={campeonatosStyle.headerIconsRow}>
              <BotaoNotificacoes abaAtiva="campeonatos" />
            </View>
          </View>
        </View>

        {/* Nenhum campeonato cadastrado, ou falha ao carregar: o mesmo aviso, com Atualizar */}
        {(semNenhum || erro !== "") && (
          <View style={campeonatosStyle.emptyStateSection}>
            <View style={campeonatosStyle.emptyStateIconCircle}>
              <Image
                source={require("@/assets/images/img/campeonatosVermelho.png")}
                style={campeonatosStyle.emptyStateIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />
            </View>
            <Text style={campeonatosStyle.emptyStateTitle}>
              {erro ? "Não foi possível\ncarregar" : "Nenhum campeonato\nem andamento"}
            </Text>
            <Text style={campeonatosStyle.emptyStateDescription}>
              {erro ||
                "Ainda não há competições cadastradas. Assim que a AACJ cadastrar um campeonato, todas as informações aparecerão aqui automaticamente."}
            </Text>
            <Pressable
              style={campeonatosStyle.emptyStateButton}
              onPress={() => {
                setErro("");
                setCampeonatos(null);
                setRecarga((n) => n + 1);
              }}
            >
              <Image
                source={require("@/assets/images/img/refreshPreto.png")}
                style={campeonatosStyle.emptyStateButtonIcon}
                resizeMode="contain"
              />
              <Text style={campeonatosStyle.emptyStateButtonText}>
                Atualizar
              </Text>
            </Pressable>
          </View>
        )}

        {campeonatos === null && erro === "" && (
          <Text style={campeonatosStyle.estadoTexto}>
            Carregando campeonatos...
          </Text>
        )}

        {campeonatos !== null && !semNenhum && erro === "" && (
          <>
            <View style={campeonatosStyle.filterRow}>
              {FILTROS.map((filtro) => {
                const ativo = filtroAtivo === filtro.valor;
                return (
                  <Pressable
                    key={filtro.valor}
                    style={[
                      campeonatosStyle.filterPill,
                      ativo && campeonatosStyle.filterPillActive,
                    ]}
                    onPress={() => setFiltroAtivo(filtro.valor)}
                  >
                    <Text
                      style={[
                        campeonatosStyle.filterPillText,
                        ativo && campeonatosStyle.filterPillTextActive,
                      ]}
                    >
                      {filtro.rotulo}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {lista.length === 0 && (
              <Text style={campeonatosStyle.estadoTexto}>
                {filtroAtivo === "MEUS"
                  ? "Você ainda não participa de nenhum campeonato."
                  : "Nenhum campeonato neste filtro."}
              </Text>
            )}

            {/* Cards dos CAMPEONATOS */}
            {lista.map(({ c, a }) => {
              const linha = participacaoTexto(c);
              const subtitulo = [c.tipo_label, c.organizador_campeonato]
                .filter(Boolean)
                .join(" · ");
              return (
                <Pressable
                  key={c.id_campeonato}
                  style={[campeonatosStyle.card, { width: larguraCard }]}
                  onPress={() => abrirCampeonato(c.id_campeonato)}
                >
                  <Image
                    source={
                      c.banner_url
                        ? { uri: c.banner_url }
                        : require("@/assets/images/img/fundoCardCampeonatos2.png")
                    }
                    style={campeonatosStyle.cardBanner}
                    resizeMode="cover"
                  />
                  <View style={campeonatosStyle.cardBannerOverlay} />

                  <View style={campeonatosStyle.cardContent}>
                    <View style={campeonatosStyle.cardTopRow}>
                      <View style={campeonatosStyle.cardTitleRow}>
                        <View style={campeonatosStyle.cardIconCircle}>
                          {c.logo_url ? (
                            <Image
                              source={{ uri: c.logo_url }}
                              style={campeonatosStyle.cardLogo}
                              resizeMode="contain"
                            />
                          ) : (
                            <Image
                              source={require("@/assets/images/img/campeonatosVermelho.png")}
                              style={campeonatosStyle.cardIcon}
                              resizeMode="contain"
                            />
                          )}
                        </View>
                        <View style={campeonatosStyle.cardTitleTextCol}>
                          <Text style={campeonatosStyle.cardTitle}>
                            {c.nome_campeonato}
                          </Text>
                          {subtitulo !== "" && (
                            <Text style={campeonatosStyle.cardSubtitle}>
                              {subtitulo}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View
                        style={[
                          campeonatosStyle.statusPill,
                          a.situacao === "EM_BREVE" &&
                            campeonatosStyle.statusPillEmBreve,
                          a.situacao === "ENCERRADO" &&
                            campeonatosStyle.statusPillEncerrado,
                        ]}
                      >
                        <Text
                          style={[
                            campeonatosStyle.statusPillText,
                            a.situacao === "EM_BREVE" &&
                              campeonatosStyle.statusPillTextEmBreve,
                            a.situacao === "ENCERRADO" &&
                              campeonatosStyle.statusPillTextEncerrado,
                          ]}
                        >
                          {ROTULO_SITUACAO[a.situacao]}
                        </Text>
                      </View>
                    </View>

                    <View style={campeonatosStyle.progressSection}>
                      <View style={campeonatosStyle.progressLabelRow}>
                        <Text style={campeonatosStyle.progressLabelText}>
                          {a.texto}
                        </Text>
                        <Text style={campeonatosStyle.progressLabelText}>
                          {a.progresso}%
                        </Text>
                      </View>
                      <View style={campeonatosStyle.progressTrack}>
                        <View
                          style={[
                            campeonatosStyle.progressFill,
                            { width: `${a.progresso}%` },
                          ]}
                        />
                      </View>
                    </View>

                    <View style={campeonatosStyle.cardBottomRow}>
                      <View style={campeonatosStyle.nextPhaseTextCol}>
                        <Text style={campeonatosStyle.nextPhaseLabel}>
                          {linha.rotulo}
                        </Text>
                        <Text style={campeonatosStyle.nextPhaseValue}>
                          {linha.valor}
                        </Text>
                      </View>
                      <Text style={campeonatosStyle.verCampeonatoText}>
                        Ver campeonato {">"}
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
          </>
        )}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
