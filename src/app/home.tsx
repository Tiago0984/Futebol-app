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

type ModoEstatistica = "porTime" | "aoTotal";

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

export default function Home() {
  const [atleta, setAtleta] = useState<Atleta | null>(null);

  useEffect(() => {
    async function carregarAtleta() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      try {
        const resposta = await fetch(`${API}/atleta`, {
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
        if (json.success) setAtleta(json.data);
      } catch (erro) {
        console.log("Erro ao buscar dados do atleta:", erro);
      }
    }
    carregarAtleta();
  }, []);

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
    useState<ModoEstatistica>("porTime");

  const [timeSelecionado, setTimeSelecionado] = useState("Sub-17 A");

  const [seletorTimeAberto, setSeletorTimeAberto] = useState(false);

  // Vem da posição principal do atleta na API
  const tipoAtleta: TipoAtleta =
    atleta?.posicao_atleta === "GOLEIRO" ? "goleiro" : "linha";

  const abrirEstatisticas = () => {
    setModalEstatisticasVisivel(true);
    setSeletorTimeAberto(false);
  };

  const fecharEstatisticas = () => {
    setModalEstatisticasVisivel(false);
    setSeletorTimeAberto(false);
  };

  const selecionarModo = (modo: ModoEstatistica) => {
    setModoEstatistica(modo);
    setSeletorTimeAberto(false);
  };

  const selecionarTime = (time: string) => {
    setTimeSelecionado(time);
    setSeletorTimeAberto(false);
  };

  const estatisticasLinha: Estatistica[] = [
    {
      id: "gols",
      titulo: "Gols",
      valor: modoEstatistica === "porTime" ? "8" : "12",
      icone: require("@/assets/images/img/bolaVermelha.png"),
    },
    {
      id: "assistencias",
      titulo: "Assistências",
      valor: modoEstatistica === "porTime" ? "5" : "8",
      icone: require("@/assets/images/img/tenisvermelho.png"),
    },
    {
      id: "partidas",
      titulo: "Partidas",
      valor: modoEstatistica === "porTime" ? "10" : "16",
      icone: require("@/assets/images/img/agendaVermelha.png"),
    },
    {
      id: "convocacoes",
      titulo: "Convocações",
      valor: modoEstatistica === "porTime" ? "5" : "8",
      icone: require("@/assets/images/img/bandeiravermelha.png"),
    },
    {
      id: "amarelos",
      titulo: "Cartões amarelos",
      valor: modoEstatistica === "porTime" ? "1" : "2",
      tipoIcone: "amarelo",
    },
    {
      id: "vermelhos",
      titulo: "Cartões vermelhos",
      valor: "0",
      tipoIcone: "vermelho",
    },
  ];

  const estatisticasGoleiro: Estatistica[] = [
    {
      id: "defesas",
      titulo: "Defesas",
      valor: modoEstatistica === "porTime" ? "24" : "38",
      tipoIcone: "goleiro",
    },
    {
      id: "golsSofridos",
      titulo: "Gols sofridos",
      valor: modoEstatistica === "porTime" ? "4" : "6",
      icone: require("@/assets/images/img/bolaVermelha.png"),
    },
    {
      id: "partidas",
      titulo: "Partidas",
      valor: modoEstatistica === "porTime" ? "10" : "16",
      icone: require("@/assets/images/img/agendaVermelha.png"),
    },
    {
      id: "convocacoes",
      titulo: "Convocações",
      valor: modoEstatistica === "porTime" ? "5" : "8",
      icone: require("@/assets/images/img/bandeiravermelha.png"),
    },
    {
      id: "amarelos",
      titulo: "Cartões amarelos",
      valor: modoEstatistica === "porTime" ? "1" : "2",
      tipoIcone: "amarelo",
    },
    {
      id: "vermelhos",
      titulo: "Cartões vermelhos",
      valor: "0",
      tipoIcone: "vermelho",
    },
  ];

  const estatisticas =
    tipoAtleta === "goleiro" ? estatisticasGoleiro : estatisticasLinha;

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
              <Text style={homeStyle.greeting}>Bom dia</Text>

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

        {/* BANNER */}
        <Pressable
          style={homeStyle.banner}
          onPress={() => router.navigate("/campeonatos")}
        >
          <Image
            source={require("@/assets/images/img/fundoCardCampeonatos.png")}
            style={homeStyle.bannerImage}
            resizeMode="cover"
          />

          <View style={homeStyle.bannerOverlay} />

          <View style={homeStyle.bannerContent}>
            <View style={homeStyle.bannerTag}>
              <Text style={homeStyle.bannerTagText}>CAMPEONATO</Text>
            </View>

            <Text style={homeStyle.bannerTitle}>Copa Escola 2026</Text>

            <Text style={homeStyle.bannerSubtitle}>
              Próximo desafio da equipe
            </Text>

            <View style={homeStyle.bannerMatchRow}>
              <View style={homeStyle.bannerTeam}>
                <Image
                  source={require("@/assets/images/img/escudovermelho.png")}
                  style={homeStyle.bannerTeamIcon}
                  resizeMode="contain"
                />

                <Text style={homeStyle.bannerTeamText}>AACJ</Text>
              </View>

              <Text style={homeStyle.bannerVersus}>X</Text>

              <Text style={homeStyle.bannerOpponent}>Adversário</Text>
            </View>

            <View style={homeStyle.bannerFooter}>
              <Text style={homeStyle.bannerDate}>03 AGO · 09:00</Text>

              <Text style={homeStyle.bannerLink}>Ver detalhes {">"}</Text>
            </View>
          </View>
        </Pressable>

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

              <Text style={homeStyle.statSummaryValue}>12</Text>

              <Text style={homeStyle.statSummaryLabel}>Gols</Text>
            </View>

            <View style={homeStyle.statSummaryItem}>
              <Image
                source={require("@/assets/images/img/agendaVermelha.png")}
                style={homeStyle.statSummaryIcon}
                resizeMode="contain"
                tintColor={cores.cinza}
              />

              <Text style={homeStyle.statSummaryValue}>16</Text>

              <Text style={homeStyle.statSummaryLabel}>Partidas</Text>
            </View>

            <View style={homeStyle.statSummaryItem}>
              <Image
                source={require("@/assets/images/img/bandeiravermelha.png")}
                style={homeStyle.statSummaryIcon}
                resizeMode="contain"
                tintColor={cores.cinza}
              />

              <Text style={homeStyle.statSummaryValue}>8</Text>

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

          <Pressable
            style={homeStyle.activityItem}
            onPress={() => router.navigate("/agenda")}
          >
            <Text style={homeStyle.activityDate}>Hoje · 30/07/2026</Text>

            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>Treino Técnico</Text>

                <Text style={homeStyle.activitySubtitle}>Campo Principal</Text>
              </View>

              <Text style={homeStyle.activityTime}>17:30</Text>
            </View>

            <View style={homeStyle.activityDivider} />
          </Pressable>

          <Pressable
            style={homeStyle.activityItem}
            onPress={() => router.navigate("/agenda")}
          >
            <Text style={homeStyle.activityDate}>
              Segunda-feira · 03/08/2026
            </Text>

            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>Avaliação Física</Text>

                <Text style={homeStyle.activitySubtitle}>
                  Centro de Performance
                </Text>
              </View>

              <Text style={homeStyle.activityTime}>09:00</Text>
            </View>

            <View style={homeStyle.activityDivider} />
          </Pressable>

          <Pressable
            style={homeStyle.activityItem}
            onPress={() => router.navigate("/agenda")}
          >
            <Text style={homeStyle.activityDate}>Sábado · 08/08/2026</Text>

            <View style={homeStyle.activityRow}>
              <View style={homeStyle.activityTextCol}>
                <Text style={homeStyle.activityTitle}>Campeonato Regional</Text>

                <Text style={homeStyle.activitySubtitle}>AACJ</Text>
              </View>

              <Text style={homeStyle.activityTime}>17:00</Text>
            </View>
          </Pressable>
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
              <Pressable
                style={[
                  homeStyle.filterButton,
                  modoEstatistica === "porTime" && homeStyle.filterButtonActive,
                ]}
                onPress={() => selecionarModo("porTime")}
              >
                <Text
                  style={[
                    homeStyle.filterButtonText,
                    modoEstatistica === "porTime" &&
                      homeStyle.filterButtonTextActive,
                  ]}
                >
                  Por time
                </Text>
              </Pressable>

              <Pressable
                style={[
                  homeStyle.filterButton,
                  modoEstatistica === "aoTotal" && homeStyle.filterButtonActive,
                ]}
                onPress={() => selecionarModo("aoTotal")}
              >
                <Text
                  style={[
                    homeStyle.filterButtonText,
                    modoEstatistica === "aoTotal" &&
                      homeStyle.filterButtonTextActive,
                  ]}
                >
                  Ao total
                </Text>
              </Pressable>
            </View>

            {/* SELETOR DE TIME */}
            {modoEstatistica === "porTime" && (
              <View style={homeStyle.teamSelectorArea}>
                <Text style={homeStyle.teamSelectorLabel}>Time</Text>

                <Pressable
                  style={homeStyle.teamSelector}
                  onPress={() =>
                    setSeletorTimeAberto((estadoAtual) => !estadoAtual)
                  }
                >
                  <Text style={homeStyle.teamSelectorText}>
                    {timeSelecionado}
                  </Text>

                  <Text style={homeStyle.teamSelectorArrow}>▼</Text>
                </Pressable>

                {seletorTimeAberto && (
                  <View style={homeStyle.teamDropdown}>
                    <Pressable
                      style={homeStyle.teamOption}
                      onPress={() => selecionarTime("Sub-17 A")}
                    >
                      <Text style={homeStyle.teamOptionText}>Sub-17 A</Text>
                    </Pressable>

                    <Pressable
                      style={homeStyle.teamOption}
                      onPress={() => selecionarTime("Sub-17 B")}
                    >
                      <Text style={homeStyle.teamOptionText}>Sub-17 B</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            )}

            <Text style={homeStyle.statsModalTitle}>
              {modoEstatistica === "porTime"
                ? `Estatísticas — ${timeSelecionado}`
                : "Estatísticas — Todos os times"}
            </Text>

            <View style={homeStyle.statsGrid}>
              {estatisticas.map((estatistica) => (
                <View key={estatistica.id} style={homeStyle.statCard}>
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
