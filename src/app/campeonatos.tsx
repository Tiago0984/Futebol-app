import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import {
  andamentoDoCampeonato,
  categoriasNoPeriodo,
  type Categoria,
  type Resumo,
  type Situacao,
  type VinculoCategoria,
} from "@/utils/campeonatos";
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
  // Somando todas as categorias; servidor antigo não manda
  resumo?: Resumo | null;
  encerrado?: boolean;
};

// GET /api/v1/campeonatos-do-atleta: em quais o atleta participa e como
type Participacao = {
  id_campeonato: number;
  convocada: boolean;
  convocacoes: { id_categoria: number; rotulo: string; camisa: number }[];
  categorias: Categoria[];
};

type Filtro = "TODOS" | Situacao;

const FILTROS: { valor: Filtro; rotulo: string }[] = [
  { valor: "TODOS", rotulo: "Todos" },
  { valor: "ANDAMENTO", rotulo: "Em andamento" },
  { valor: "EM_BREVE", rotulo: "Em breve" },
  { valor: "ENCERRADO", rotulo: "Encerrados" },
];

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
  // null = não veio: sem saber o sub do atleta, nada é escondido nem marcado
  const [vinculos, setVinculos] = useState<VinculoCategoria[] | null>(null);
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
        const headers = {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        };
        const [respostaLista, respostaMeus, respostaAtleta] = await Promise.all([
          fetch(`${API}/campeonatos`, { headers: { Accept: "application/json" } }),
          fetch(await urlDoAtleta("/campeonatos-do-atleta"), { headers }),
          fetch(await urlDoAtleta("/atleta"), { headers }),
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
        const jsonAtleta = respostaAtleta.ok ? await respostaAtleta.json() : null;
        if (!ativa) return;
        setVinculos(jsonAtleta?.success ? jsonAtleta.data.categorias : null);
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

  const hoje = chaveDoDia(new Date());

  // Categorias do atleta neste campeonato (convocado ou só inscrito); vazio se não participa
  function categoriasDoAtleta(c: Campeonato) {
    const p = participacoes[c.id_campeonato];
    if (!p) return [];
    const ids = [...p.convocacoes, ...p.categorias].map((cat) => cat.id_categoria);
    return c.categorias.filter((cat) => ids.includes(cat.id_categoria));
  }

  // Subs do atleta no campeonato: os da participação (a convocação pode ser acima do dele)
  // e aqueles em que ele estava durante o campeonato. null = não se sabe o sub dele
  function subsDoAtleta(c: Campeonato) {
    const minhas = categoriasDoAtleta(c);
    if (!vinculos) return minhas.length > 0 ? minhas : null;
    const ids = categoriasNoPeriodo(c, vinculos);
    return c.categorias.filter(
      (cat) => minhas.includes(cat) || ids.includes(cat.id_categoria),
    );
  }

  // Andamento do card: o da categoria do atleta quando ele participa (bate com o detalhe,
  // que abre nela); senão, o do campeonato todo
  function andamento(c: Campeonato) {
    const minha = categoriasDoAtleta(c)[0];
    if (minha?.resumo !== undefined) {
      const a = andamentoDoCampeonato(c, hoje, minha.resumo, minha.encerrada);
      return c.categorias.length > 1
        ? { ...a, texto: `${minha.rotulo} · ${a.texto}` }
        : a;
    }
    return andamentoDoCampeonato(c, hoje, c.resumo, c.encerrado);
  }

  // Campeões das categorias encerradas (só as do atleta)
  function campeoesTexto(c: Campeonato) {
    return (subsDoAtleta(c) ?? c.categorias)
      .filter((cat) => cat.campeao?.campeao)
      .map((cat) =>
        c.categorias.length > 1
          ? `${cat.rotulo}: ${cat.campeao!.campeao!.nome}`
          : cat.campeao!.campeao!.nome,
      )
      .join("\n");
  }

  // Linha acima dos subs: o campeão ou a convocação do atleta; sem eles, nada
  function participacaoTexto(c: Campeonato) {
    const campeoes = campeoesTexto(c);
    if (campeoes) {
      return {
        rotulo: campeoes.includes("\n") ? "🏆 Campeões" : "🏆 Campeão",
        valor: campeoes,
      };
    }
    const p = participacoes[c.id_campeonato];
    if (p?.convocada && p.convocacoes.length > 0) {
      return {
        rotulo: "Sua participação",
        valor: p.convocacoes
          .map((conv) => `Convocação no ${conv.rotulo} · camisa ${conv.camisa}`)
          .join("\n"),
      };
    }
    return null;
  }

  // Campeonato sem o sub do atleta não aparece
  const lista = (campeonatos ?? [])
    .filter((c) => subsDoAtleta(c)?.length !== 0)
    .map((c) => ({ c, a: andamento(c) }))
    .filter(({ a }) =>
      filtroAtivo === "TODOS" ? true : a.situacao === filtroAtivo,
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
    <View style={[fundoStyle.container, { paddingTop: insets.top }]}>
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
                {filtroAtivo === "TODOS"
                  ? "Nenhum campeonato do seu sub por enquanto."
                  : "Nenhum campeonato neste filtro."}
              </Text>
            )}

            {/* Cards dos CAMPEONATOS */}
            {lista.map(({ c, a }) => (
              <CardCampeonato
                key={c.id_campeonato}
                c={c}
                a={a}
                linha={participacaoTexto(c)}
                meusSubs={subsDoAtleta(c)}
                largura={larguraCard}
                aoAbrir={() => abrirCampeonato(c.id_campeonato)}
              />
            ))}
          </>
        )}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}

// O status fica embaixo do nome, para não depender do tamanho dele; cada sub é um selo inteiro
function CardCampeonato({
  c,
  a,
  linha,
  meusSubs,
  largura,
  aoAbrir,
}: {
  c: Campeonato;
  a: ReturnType<typeof andamentoDoCampeonato>;
  linha: { rotulo: string; valor: string } | null;
  meusSubs: Categoria[] | null;
  largura: number;
  aoAbrir: () => void;
}) {
  const subtitulo = [c.tipo_label, c.organizador_campeonato]
    .filter(Boolean)
    .join(" · ");

  return (
    <Pressable
      style={[campeonatosStyle.card, { width: largura }]}
      onPress={aoAbrir}
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
            <Text style={campeonatosStyle.cardTitle} numberOfLines={2}>
              {c.nome_campeonato}
            </Text>
            {subtitulo !== "" && (
              <Text style={campeonatosStyle.cardSubtitle} numberOfLines={1}>
                {subtitulo}
              </Text>
            )}
            <View
              style={[
                campeonatosStyle.statusPill,
                a.situacao === "EM_BREVE" && campeonatosStyle.statusPillEmBreve,
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
                numberOfLines={1}
              >
                {a.selo}
              </Text>
            </View>
          </View>
        </View>

        <View style={campeonatosStyle.progressSection}>
          <View style={campeonatosStyle.progressLabelRow}>
            <Text
              style={[
                campeonatosStyle.progressLabelText,
                campeonatosStyle.progressLabelEtapa,
              ]}
              numberOfLines={2}
            >
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
          {linha && (
            <View>
              <Text style={campeonatosStyle.nextPhaseLabel}>{linha.rotulo}</Text>
              <Text style={campeonatosStyle.nextPhaseValue}>{linha.valor}</Text>
            </View>
          )}
          {c.categorias.length > 0 && (
            <View>
              <Text style={campeonatosStyle.nextPhaseLabel}>
                {c.categorias.length > 1 ? "Categorias" : "Categoria"}
              </Text>
              <View style={campeonatosStyle.subsRow}>
                {c.categorias.map((cat) => {
                  const doAtleta = meusSubs?.includes(cat);
                  return (
                    <View
                      key={cat.id_categoria}
                      style={[
                        campeonatosStyle.subSelo,
                        doAtleta && campeonatosStyle.subSeloDoAtleta,
                      ]}
                    >
                      <Text
                        style={[
                          campeonatosStyle.subSeloTexto,
                          doAtleta && campeonatosStyle.subSeloTextoDoAtleta,
                        ]}
                        numberOfLines={1}
                      >
                        {cat.rotulo}
                        {doAtleta && " (seu sub)"}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}
          <Text style={campeonatosStyle.verCampeonatoText}>
            Ver campeonato {">"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
