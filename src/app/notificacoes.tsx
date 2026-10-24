import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";

import TabBar from "@/components/tabBar";
import { API } from "@/config/api";
import fundoStyle from "@/styles/fundoStyle";
import notificacoesStyle from "@/styles/notificacoesStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";

type FiltroLeitura = "todas" | "naoLidas";

// agenda: mudanças nos compromissos e resumos de agenda; aacj: recados do admin (tipo AVISO)
type Categoria = "todas" | "agenda" | "aacj";

type Periodo = "Hoje" | "Ontem" | "Esta semana" | "Anteriores";

type AbaOrigem = "home" | "agenda" | "campeonatos" | "desempenho" | "perfil";

// Só os campos de um aviso de GET /api/v1/notificacoes usados nesta tela
type Notificacao = {
  id_notificacao: number;
  tipo: string;
  titulo: string;
  mensagem: string;
  id_evento: number | null;
  data: string;
  lida: boolean;
};

type RespostaNotificacoes = {
  notificacoes: Notificacao[];
  paginacao: { pagina_atual: number; ultima_pagina: number };
};

const abasValidas: AbaOrigem[] = [
  "home",
  "agenda",
  "campeonatos",
  "desempenho",
  "perfil",
];

const nomesCategorias: Record<Categoria, string> = {
  todas: "Todas",
  agenda: "Agenda",
  aacj: "Avisos da AACJ",
};

// Nome da página que o aviso abre, mostrado embaixo da mensagem
const destinoPorCategoria: Record<Exclude<Categoria, "todas">, string> = {
  agenda: "Agenda",
  aacj: "AACJ",
};

const ordemPeriodos: Periodo[] = ["Hoje", "Ontem", "Esta semana", "Anteriores"];

const MESES = [
  "jan", "fev", "mar", "abr", "mai", "jun",
  "jul", "ago", "set", "out", "nov", "dez",
];

function categoriaDe(notificacao: Notificacao): Exclude<Categoria, "todas"> {
  return notificacao.tipo === "AVISO" ? "aacj" : "agenda";
}

// Dia do aparelho no mesmo formato da API: "2026-10-22"
function chaveDoDia(data: Date) {
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function somarDias(data: Date, dias: number) {
  const nova = new Date(data);
  nova.setDate(data.getDate() + dias);
  return nova;
}

// A data vem no horário de Brasília ("2026-10-22T09:26:00-03:00"): recorta o
// texto em vez de usar new Date(), para o fuso do aparelho não trocar o dia
function periodoDe(notificacao: Notificacao, hoje: Date): Periodo {
  const dia = notificacao.data.slice(0, 10);
  if (dia === chaveDoDia(hoje)) return "Hoje";
  if (dia === chaveDoDia(somarDias(hoje, -1))) return "Ontem";
  // Semana começando na segunda
  const segunda = somarDias(hoje, -((hoje.getDay() + 6) % 7));
  if (dia >= chaveDoDia(segunda)) return "Esta semana";
  return "Anteriores";
}

// "Hoje · 09:26", "Ontem · 09:26" ou "22 out · 09:26"
function dataDoAviso(notificacao: Notificacao, hoje: Date) {
  const hora = notificacao.data.slice(11, 16);
  const periodo = periodoDe(notificacao, hoje);
  if (periodo === "Hoje" || periodo === "Ontem") return `${periodo} · ${hora}`;
  const dia = notificacao.data.slice(8, 10);
  const mes = MESES[Number(notificacao.data.slice(5, 7)) - 1];
  return `${dia} ${mes} · ${hora}`;
}

// Token vencido, encerrado ou atleta inativado: volta para o login
async function sairPorSessaoInvalida() {
  await AsyncStorage.multiRemove(["token", "perfil"]);
  router.replace("/selecao-perfil");
}

// Chama a API com o token; null quando não há sessão ou ela acabou
async function chamarApi(caminho: string, metodo = "GET") {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    router.replace("/selecao-perfil");
    return null;
  }
  const resposta = await fetch(`${API}${caminho}`, {
    method: metodo,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (resposta.status === 401 || resposta.status === 403) {
    await sairPorSessaoInvalida();
    return null;
  }
  return { ok: resposta.ok, json: await resposta.json() };
}

// Uma página de avisos; null quando a sessão acabou
async function buscarPagina(
  numero: number,
): Promise<{ dados?: RespostaNotificacoes; erro?: string } | null> {
  const resultado = await chamarApi(`/notificacoes?page=${numero}`);
  if (!resultado) return null;
  if (!resultado.ok || !resultado.json.success) {
    return {
      erro: resultado.json.message ?? "Não foi possível carregar os avisos.",
    };
  }
  return { dados: resultado.json.data };
}

export default function Notificacoes() {
  const params = useLocalSearchParams<{
    aba?: string | string[];
  }>();

  const abaParametro = Array.isArray(params.aba) ? params.aba[0] : params.aba;

  const abaOrigem: AbaOrigem = abasValidas.includes(abaParametro as AbaOrigem)
    ? (abaParametro as AbaOrigem)
    : "home";

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [pagina, setPagina] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);
  const [carregando, setCarregando] = useState(true);
  const [carregandoMais, setCarregandoMais] = useState(false);
  const [erro, setErro] = useState("");

  const [filtroLeitura, setFiltroLeitura] = useState<FiltroLeitura>("todas");

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria>("todas");

  const [categoriaAberta, setCategoriaAberta] = useState(false);

  // Evita pedir a mesma página duas vezes enquanto a rolagem dispara vários eventos
  const buscandoMais = useRef(false);

  const hoje = new Date();

  // Recarrega a primeira página sempre que a tela volta a aparecer
  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      (async () => {
        try {
          const resultado = await buscarPagina(1);
          if (!ativa || !resultado) return;
          const { dados, erro: erroApi } = resultado;
          if (!dados) {
            setErro(erroApi ?? "");
            return;
          }
          setErro("");
          setNotificacoes(dados.notificacoes);
          setPagina(dados.paginacao.pagina_atual);
          setUltimaPagina(dados.paginacao.ultima_pagina);
        } catch (e) {
          console.log("Erro ao buscar os avisos:", e);
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

  // Perto do fim da lista, busca a próxima página
  async function aoRolar(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;
    const pertoDoFim =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 200;
    if (!pertoDoFim || buscandoMais.current || pagina >= ultimaPagina) return;

    buscandoMais.current = true;
    setCarregandoMais(true);
    try {
      const dados = (await buscarPagina(pagina + 1))?.dados;
      if (!dados) return;
      // Sem repetir aviso que já está na lista (um aviso novo empurra os outros de página)
      setNotificacoes((atuais) => [
        ...atuais,
        ...dados.notificacoes.filter(
          (novo) =>
            !atuais.some((n) => n.id_notificacao === novo.id_notificacao),
        ),
      ]);
      setPagina(dados.paginacao.pagina_atual);
      setUltimaPagina(dados.paginacao.ultima_pagina);
    } catch (erroBusca) {
      console.log("Erro ao buscar mais avisos:", erroBusca);
    } finally {
      buscandoMais.current = false;
      setCarregandoMais(false);
    }
  }

  const notificacoesFiltradas = useMemo(
    () =>
      notificacoes.filter(
        (item) =>
          (filtroLeitura === "todas" || !item.lida) &&
          (categoriaSelecionada === "todas" ||
            categoriaDe(item) === categoriaSelecionada),
      ),
    [notificacoes, filtroLeitura, categoriaSelecionada],
  );

  const naoLidasNoFiltro = notificacoesFiltradas.filter((item) => !item.lida);

  function marcarLidasNaTela(ids: number[]) {
    setNotificacoes((estadoAtual) =>
      estadoAtual.map((item) =>
        ids.includes(item.id_notificacao) ? { ...item, lida: true } : item,
      ),
    );
  }

  // Toque no aviso: marca como lido e, se for da agenda, abre a Agenda.
  // Espera a API responder para o sino da próxima tela já vir atualizado
  const abrirNotificacao = async (notificacao: Notificacao) => {
    if (!notificacao.lida) {
      try {
        const resultado = await chamarApi(
          `/notificacoes/${notificacao.id_notificacao}/lida`,
          "PATCH",
        );
        if (!resultado) return;
        if (resultado.ok) marcarLidasNaTela([notificacao.id_notificacao]);
      } catch (e) {
        console.log("Erro ao marcar o aviso como lido:", e);
      }
    }

    if (categoriaDe(notificacao) === "agenda") {
      router.navigate("/agenda");
    }
  };

  // Com "Todas", a API marca tudo de uma vez; com uma categoria, marca só os
  // avisos dela que estão na tela, para não marcar o que a pessoa não está vendo
  const marcarTodasComoLidas = async () => {
    const ids = naoLidasNoFiltro.map((item) => item.id_notificacao);
    try {
      if (categoriaSelecionada === "todas") {
        const resultado = await chamarApi("/notificacoes/lidas", "PATCH");
        if (resultado?.ok) {
          setNotificacoes((estadoAtual) =>
            estadoAtual.map((item) => ({ ...item, lida: true })),
          );
        }
        return;
      }
      const resultados = await Promise.all(
        ids.map((id) => chamarApi(`/notificacoes/${id}/lida`, "PATCH")),
      );
      marcarLidasNaTela(ids.filter((_, i) => resultados[i]?.ok));
    } catch (e) {
      console.log("Erro ao marcar os avisos como lidos:", e);
    }
  };

  const selecionarCategoria = (categoria: Categoria) => {
    setCategoriaSelecionada(categoria);
    setCategoriaAberta(false);
  };

  const renderNotificacao = (notificacao: Notificacao) => (
    <Pressable
      key={notificacao.id_notificacao}
      style={notificacoesStyle.notificationItem}
      onPress={() => abrirNotificacao(notificacao)}
    >
      <View style={notificacoesStyle.notificationIndicator}>
        <View
          style={
            notificacao.lida
              ? notificacoesStyle.readIndicator
              : notificacoesStyle.unreadIndicator
          }
        />
      </View>

      <View style={notificacoesStyle.notificationContent}>
        <Text
          style={[
            notificacoesStyle.notificationTitle,
            !notificacao.lida && notificacoesStyle.notificationTitleUnread,
          ]}
        >
          {notificacao.titulo}
        </Text>

        <Text style={notificacoesStyle.notificationMessage}>
          {notificacao.mensagem}
        </Text>

        <Text style={notificacoesStyle.notificationDestination}>
          {destinoPorCategoria[categoriaDe(notificacao)]}
        </Text>

        <Text style={notificacoesStyle.notificationDate}>
          {dataDoAviso(notificacao, hoje)}
        </Text>
      </View>

      {/* O recado da AACJ não abre outra tela */}
      {categoriaDe(notificacao) === "agenda" && (
        <Text style={notificacoesStyle.notificationArrow}>{">"}</Text>
      )}
    </Pressable>
  );

  const renderSecoes = () => {
    const secoes = ordemPeriodos
      .map((periodo) => ({
        periodo,
        itens: notificacoesFiltradas.filter(
          (item) => periodoDe(item, hoje) === periodo,
        ),
      }))
      .filter((secao) => secao.itens.length > 0);

    return secoes.map((secao) => (
      <View key={secao.periodo} style={notificacoesStyle.section}>
        <Text style={notificacoesStyle.sectionTitle}>{secao.periodo}</Text>

        <View style={notificacoesStyle.notificationList}>
          {secao.itens.map(renderNotificacao)}
        </View>
      </View>
    ));
  };

  let conteudo;
  if (carregando) {
    conteudo = (
      <View style={notificacoesStyle.emptyState}>
        <Text style={notificacoesStyle.emptyDescription}>
          Carregando avisos...
        </Text>
      </View>
    );
  } else if (erro && notificacoes.length === 0) {
    conteudo = (
      <View style={notificacoesStyle.emptyState}>
        <Text style={notificacoesStyle.emptyDescription}>{erro}</Text>
      </View>
    );
  } else if (notificacoesFiltradas.length > 0) {
    conteudo = renderSecoes();
  } else {
    conteudo = (
      <View style={notificacoesStyle.emptyState}>
        <Text style={notificacoesStyle.emptyTitle}>
          Nenhuma nova notificação
        </Text>

        <Text style={notificacoesStyle.emptyDescription}>
          Você está em dia com as novidades da AACJ.
        </Text>
      </View>
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

      <View style={notificacoesStyle.container}>
        <ScrollView
          style={notificacoesStyle.scrollView}
          contentContainerStyle={[
            notificacoesStyle.scrollContent,
            {
              paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + 18,
            },
          ]}
          showsVerticalScrollIndicator={false}
          onScroll={aoRolar}
          scrollEventThrottle={200}
        >
          <View style={notificacoesStyle.header}>
            <Pressable
              style={notificacoesStyle.backButton}
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={notificacoesStyle.backChevron}>‹</Text>
            </Pressable>

            <Text style={notificacoesStyle.headerTitle}>Notificações</Text>

            <View style={notificacoesStyle.headerSpacer} />
          </View>

          <View style={notificacoesStyle.filtersWrapper}>
            <View style={notificacoesStyle.filtersRow}>
              <View style={notificacoesStyle.readFilters}>
                <Pressable
                  style={[
                    notificacoesStyle.readFilter,
                    filtroLeitura === "todas" &&
                      notificacoesStyle.readFilterActive,
                  ]}
                  onPress={() => setFiltroLeitura("todas")}
                >
                  <Text
                    style={[
                      notificacoesStyle.readFilterText,
                      filtroLeitura === "todas" &&
                        notificacoesStyle.readFilterTextActive,
                    ]}
                  >
                    Todas
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    notificacoesStyle.readFilter,
                    filtroLeitura === "naoLidas" &&
                      notificacoesStyle.readFilterActive,
                  ]}
                  onPress={() => setFiltroLeitura("naoLidas")}
                >
                  <Text
                    style={[
                      notificacoesStyle.readFilterText,
                      filtroLeitura === "naoLidas" &&
                        notificacoesStyle.readFilterTextActive,
                    ]}
                  >
                    Não lidas
                  </Text>
                </Pressable>
              </View>

              <View
                style={[
                  notificacoesStyle.categoryArea,
                  naoLidasNoFiltro.length === 0 &&
                    notificacoesStyle.categoryAreaRight,
                ]}
              >
                <Pressable
                  style={notificacoesStyle.categoryButton}
                  onPress={() =>
                    setCategoriaAberta((estadoAtual) => !estadoAtual)
                  }
                >
                  <Text style={notificacoesStyle.categoryButtonText}>
                    {nomesCategorias[categoriaSelecionada]}
                  </Text>

                  <Text
                    style={[
                      notificacoesStyle.categoryArrow,
                      categoriaAberta && notificacoesStyle.categoryArrowOpen,
                    ]}
                  >
                    {"▼"}
                  </Text>
                </Pressable>

                {categoriaAberta && (
                  <View style={notificacoesStyle.categoryDropdown}>
                    {(Object.keys(nomesCategorias) as Categoria[]).map(
                      (categoria) => (
                        <Pressable
                          key={categoria}
                          style={notificacoesStyle.categoryOption}
                          onPress={() => selecionarCategoria(categoria)}
                        >
                          <Text
                            style={[
                              notificacoesStyle.categoryOptionText,
                              categoriaSelecionada === categoria &&
                                notificacoesStyle.categoryOptionTextActive,
                            ]}
                          >
                            {nomesCategorias[categoria]}
                          </Text>
                        </Pressable>
                      ),
                    )}
                  </View>
                )}
              </View>

              {naoLidasNoFiltro.length > 0 && (
                <Pressable
                  style={notificacoesStyle.markAllButton}
                  onPress={marcarTodasComoLidas}
                >
                  <Text style={notificacoesStyle.markAllText}>
                    Marcar todas como lidas
                  </Text>
                </Pressable>
              )}
            </View>
          </View>

          {conteudo}

          {carregandoMais && (
            <View style={notificacoesStyle.emptyState}>
              <Text style={notificacoesStyle.emptyDescription}>
                Carregando mais...
              </Text>
            </View>
          )}
        </ScrollView>

        <TabBar abaAtiva={abaOrigem} />
      </View>
    </View>
  );
}
