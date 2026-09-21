import { useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import TabBar from "@/components/tabBar";
import fundoStyle from "@/styles/fundoStyle";
import notificacoesStyle from "@/styles/notificacoesStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";

type FiltroLeitura = "todas" | "naoLidas";

type Categoria = "todas" | "agenda" | "campeonatos" | "desempenho" | "aacj";

type Periodo = "Hoje" | "Ontem" | "Esta semana" | "Anteriores";

type AbaOrigem = "home" | "agenda" | "campeonatos" | "desempenho" | "perfil";

type RotaNotificacao = "/agenda" | "/campeonato-detalhe" | "/desempenho";

type Notificacao = {
  id: string;
  titulo: string;
  mensagem: string;
  data: string;
  periodo: Periodo;
  categoria: Exclude<Categoria, "todas">;
  lida: boolean;
  rota?: RotaNotificacao;
  paginaDestino: string;
};

const abasValidas: AbaOrigem[] = [
  "home",
  "agenda",
  "campeonatos",
  "desempenho",
  "perfil",
];

const notificacoesIniciais: Notificacao[] = [
  {
    id: "treino-alterado",
    titulo: "Treino alterado",
    mensagem: "Seu treino técnico foi alterado para amanhã às 17:00.",
    data: "Hoje · 08:30",
    periodo: "Hoje",
    categoria: "agenda",
    lida: false,
    rota: "/agenda",
    paginaDestino: "Agenda",
  },

  {
    id: "novo-campeonato",
    titulo: "Novo campeonato",
    mensagem: "Você foi inscrito na Copa Escola 2026.",
    data: "Hoje · 07:15",
    periodo: "Hoje",
    categoria: "campeonatos",
    lida: false,
    rota: "/campeonato-detalhe",
    paginaDestino: "Campeonatos",
  },

  {
    id: "resultado-disponivel",
    titulo: "Resultado disponível",
    mensagem: "O resultado da última partida já está disponível.",
    data: "Ontem · 14:20",
    periodo: "Ontem",
    categoria: "campeonatos",
    lida: true,
    rota: "/campeonato-detalhe",
    paginaDestino: "Campeonatos",
  },

  {
    id: "avaliacao-atualizada",
    titulo: "Avaliação atualizada",
    mensagem: "Uma nova avaliação de desempenho está disponível.",
    data: "18 set · 16:30",
    periodo: "Esta semana",
    categoria: "desempenho",
    lida: true,
    rota: "/desempenho",
    paginaDestino: "Desempenho",
  },

  {
    id: "comunicado-aacj",
    titulo: "Comunicado AACJ",
    mensagem: "Confira as informações sobre a programação da semana.",
    data: "12 set · 09:00",
    periodo: "Anteriores",
    categoria: "aacj",
    lida: true,
    paginaDestino: "AACJ",
  },
];

const nomesCategorias: Record<Categoria, string> = {
  todas: "Todas",
  agenda: "Agenda",
  campeonatos: "Campeonatos",
  desempenho: "Desempenho",
  aacj: "AACJ",
};

const ordemPeriodos: Periodo[] = ["Hoje", "Ontem", "Esta semana", "Anteriores"];

export default function Notificacoes() {
  const params = useLocalSearchParams<{
    aba?: string | string[];
  }>();

  const abaParametro = Array.isArray(params.aba) ? params.aba[0] : params.aba;

  const abaOrigem: AbaOrigem = abasValidas.includes(abaParametro as AbaOrigem)
    ? (abaParametro as AbaOrigem)
    : "home";

  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);

  const [filtroLeitura, setFiltroLeitura] = useState<FiltroLeitura>("todas");

  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<Categoria>("todas");

  const [categoriaAberta, setCategoriaAberta] = useState(false);

  const quantidadeNaoLidas = useMemo(
    () => notificacoes.filter((item) => !item.lida).length,
    [notificacoes],
  );

  const existemNaoLidasNoFiltro = useMemo(
    () =>
      notificacoes.some((item) => {
        const correspondeCategoria =
          categoriaSelecionada === "todas" ||
          item.categoria === categoriaSelecionada;

        const correspondeFiltroLeitura =
          filtroLeitura === "todas" || !item.lida;

        return !item.lida && correspondeCategoria && correspondeFiltroLeitura;
      }),
    [notificacoes, categoriaSelecionada, filtroLeitura],
  );

  const notificacoesFiltradas = useMemo(() => {
    return notificacoes.filter((item) => {
      const correspondeLeitura = filtroLeitura === "todas" || !item.lida;

      const correspondeCategoria =
        categoriaSelecionada === "todas" ||
        item.categoria === categoriaSelecionada;

      return correspondeLeitura && correspondeCategoria;
    });
  }, [notificacoes, filtroLeitura, categoriaSelecionada]);

  const marcarComoLida = (id: string) => {
    setNotificacoes((estadoAtual) =>
      estadoAtual.map((item) =>
        item.id === id
          ? {
              ...item,
              lida: true,
            }
          : item,
      ),
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes((estadoAtual) =>
      estadoAtual.map((item) => {
        const correspondeCategoria =
          categoriaSelecionada === "todas" ||
          item.categoria === categoriaSelecionada;

        const correspondeFiltroLeitura =
          filtroLeitura === "todas" || !item.lida;

        if (!item.lida && correspondeCategoria && correspondeFiltroLeitura) {
          return {
            ...item,
            lida: true,
          };
        }

        return item;
      }),
    );
  };

  const abrirNotificacao = (notificacao: Notificacao) => {
    marcarComoLida(notificacao.id);

    if (notificacao.rota) {
      router.navigate(notificacao.rota);
    }
  };

  const selecionarCategoria = (categoria: Categoria) => {
    setCategoriaSelecionada(categoria);
    setCategoriaAberta(false);
  };

  const renderNotificacao = (notificacao: Notificacao) => (
    <Pressable
      key={notificacao.id}
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
          {notificacao.paginaDestino}
        </Text>

        <Text style={notificacoesStyle.notificationDate}>
          {notificacao.data}
        </Text>
      </View>

      <Text style={notificacoesStyle.notificationArrow}>{">"}</Text>
    </Pressable>
  );

  const renderSecoes = () => {
    const secoes = ordemPeriodos
      .map((periodo) => ({
        periodo,
        itens: notificacoesFiltradas.filter((item) => item.periodo === periodo),
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
        >
          <View style={notificacoesStyle.header}>
            <Pressable
              style={notificacoesStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={notificacoesStyle.backText}>{"< Voltar"}</Text>
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
                  !existemNaoLidasNoFiltro &&
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

              {existemNaoLidasNoFiltro && (
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

          {notificacoesFiltradas.length > 0 ? (
            renderSecoes()
          ) : (
            <View style={notificacoesStyle.emptyState}>
              <Text style={notificacoesStyle.emptyTitle}>
                Nenhuma nova notificação
              </Text>

              <Text style={notificacoesStyle.emptyDescription}>
                Você está em dia com as novidades da AACJ.
              </Text>
            </View>
          )}
        </ScrollView>

        <TabBar abaAtiva={abaOrigem} />
      </View>
    </View>
  );
}
