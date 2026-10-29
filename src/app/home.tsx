import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  ImageSourcePropType,
  LayoutChangeEvent,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
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
import { CHAVES_SESSAO, ehResponsavel, urlDoAtleta } from "@/utils/sessao";
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

// GET /api/v1/banners: os banners do painel (os mesmos do site), na ordem e só os ativos
type Banner = {
  id_banner: number;
  titulo_banner: string | null;
  subtitulo_banner: string | null;
  foto_url: string | null;
};

// Só os campos de GET /api/v1/campeonatos-do-atleta usados no carrossel
type CampeonatoDoAtleta = {
  id_campeonato: number;
  nome_campeonato: string;
  tipo_label: string;
  logo_url: string | null;
  banner_url: string | null;
  data_inicio_campeonato: string;
  data_fim_campeonato: string;
  situacao: "EM_ANDAMENTO" | "PROXIMO";
  categorias: { id_categoria: number; rotulo: string }[];
  convocada: boolean;
  convocacoes: { id_categoria: number; rotulo: string; camisa: number }[];
};

// Slides do carrossel do topo: o próximo jogo, os campeonatos do atleta (pessoais)
// e depois os banners gerais
type Slide =
  | { tipo: "jogo" }
  | { tipo: "campeonato"; campeonato: CampeonatoDoAtleta }
  | { tipo: "banner"; banner: Banner };

// "2026-10-03T00:00:00-03:00" -> "03/10"; com o ano: "03/10/2026"
function diaMes(data: string, comAno = false) {
  const texto = `${data.slice(8, 10)}/${data.slice(5, 7)}`;
  return comAno ? `${texto}/${data.slice(0, 4)}` : texto;
}

// Linha do atleta no campeonato: a convocação (pode ser numa categoria acima) ou as categorias
function linhaDoCampeonato(c: CampeonatoDoAtleta) {
  if (c.convocada && c.convocacoes.length > 0) {
    return c.convocacoes
      .map((conv) => `Convocação no ${conv.rotulo} · camisa ${conv.camisa}`)
      .join("  |  ");
  }
  return c.categorias.map((cat) => cat.rotulo).join(" · ");
}

// Tempo de cada slide antes de passar sozinho
const INTERVALO_CARROSSEL = 6000;

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
  // Só com o responsável logado: a saudação é para ele, os dados são do filho
  const [nomeResponsavel, setNomeResponsavel] = useState<string | null>(null);
  const [proximoJogo, setProximoJogo] = useState<Evento | null>(null);
  // null enquanto a agenda não chegou (ou falhou)
  const [proximasAtividades, setProximasAtividades] = useState<
    Evento[] | null
  >(null);
  const [estatisticasApi, setEstatisticasApi] = useState<Estatisticas | null>(
    null,
  );
  const [banners, setBanners] = useState<Banner[]>([]);
  const [campeonatos, setCampeonatos] = useState<CampeonatoDoAtleta[]>([]);
  // O carrossel espera a agenda: o jogo entrando depois empurraria os banners de lugar
  const [agendaCarregada, setAgendaCarregada] = useState(false);
  // Largura de um slide (a do carrossel), medida na tela; 0 até medir
  const [larguraSlide, setLarguraSlide] = useState(0);
  const [slideAtual, setSlideAtual] = useState(0);
  const carrosselRef = useRef<ScrollView>(null);

  // Lista nova (a agenda ou os banners chegaram): volta para o primeiro slide
  function voltarAoPrimeiroSlide() {
    carrosselRef.current?.scrollTo({ x: 0, animated: false });
    setSlideAtual(0);
  }

  useEffect(() => {
    async function carregarDados() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      if (await ehResponsavel()) {
        setNomeResponsavel(await AsyncStorage.getItem("nome_responsavel"));
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
          respostaCampeonatos,
        ] = await Promise.all([
          fetch(await urlDoAtleta("/atleta"), { headers }),
          fetch(await urlDoAtleta("/agenda"), { headers }),
          // Só os jogos, para o banner achar o próximo mesmo com muitos treinos antes
          fetch(await urlDoAtleta("/agenda?tipo=JOGO"), { headers }),
          fetch(await urlDoAtleta("/atleta/estatisticas"), { headers }),
          fetch(await urlDoAtleta("/campeonatos-do-atleta"), { headers }),
        ]);

        // Token vencido, encerrado ou atleta inativado (em qualquer uma das
        // chamadas, todas com o mesmo token): volta para o login
        const sessaoAcabou = [
          respostaAtleta,
          respostaAgenda,
          respostaJogos,
          respostaEstatisticas,
          respostaCampeonatos,
        ].some((resposta) => resposta.status === 401 || resposta.status === 403);
        if (sessaoAcabou) {
          await AsyncStorage.multiRemove(CHAVES_SESSAO);
          router.replace("/selecao-perfil");
          return;
        }
        // Responsável: o filho escolhido foi inativado ou desvinculado
        if (respostaAtleta.status === 404 && (await ehResponsavel())) {
          router.replace("/escolha-atleta");
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

        // Servidor sem a rota (404): o carrossel fica só com o jogo e os banners
        if (respostaCampeonatos.ok) {
          const jsonCampeonatos = await respostaCampeonatos.json();
          if (jsonCampeonatos.success) setCampeonatos(jsonCampeonatos.data);
        }
      } catch (erro) {
        console.log("Erro ao buscar dados da Home:", erro);
      }
      setAgendaCarregada(true);
      voltarAoPrimeiroSlide();
    }
    carregarDados();

    // Banners gerais (rota pública): à parte, para uma falha aqui não afetar o resto da Home
    fetch(`${API}/banners`, { headers: { Accept: "application/json" } })
      .then((resposta) => resposta.json())
      .then((json) => {
        if (json.success) {
          setBanners(json.data.filter((b: Banner) => b.foto_url));
          voltarAoPrimeiroSlide();
        }
      })
      .catch((erro) => console.log("Erro ao buscar os banners:", erro));
  }, []);

  // Mostra primeiro o time em que o atleta está escalado; sem escalação, o time da casa
  const jogo = proximoJogo?.jogo;
  const meuTime = jogo ? (jogo.time_do_atleta ?? jogo.time_casa) : null;
  const adversario = jogo
    ? meuTime?.id_time === jogo.time_visitante.id_time
      ? jogo.time_casa
      : jogo.time_visitante
    : null;

  const slides: Slide[] = !agendaCarregada ? [] : [
    ...(proximoJogo && jogo && meuTime && adversario
      ? [{ tipo: "jogo" } as Slide]
      : []),
    ...campeonatos.map(
      (campeonato) => ({ tipo: "campeonato", campeonato }) as Slide,
    ),
    ...banners.map((banner) => ({ tipo: "banner", banner }) as Slide),
  ];
  const totalSlides = slides.length;
  const chaveDoSlide = (slide: Slide) =>
    slide.tipo === "jogo"
      ? "jogo"
      : slide.tipo === "campeonato"
        ? `campeonato-${slide.campeonato.id_campeonato}`
        : `banner-${slide.banner.id_banner}`;

  function irParaSlide(indice: number) {
    carrosselRef.current?.scrollTo({ x: indice * larguraSlide, animated: true });
    setSlideAtual(indice);
  }

  // Passa sozinho; recomeça a contagem a cada troca (inclusive pelo dedo ou pelos pontos)
  useEffect(() => {
    if (totalSlides < 2 || larguraSlide === 0) return;
    const temporizador = setTimeout(() => {
      const proximo = (slideAtual + 1) % totalSlides;
      carrosselRef.current?.scrollTo({
        x: proximo * larguraSlide,
        animated: true,
      });
      setSlideAtual(proximo);
    }, INTERVALO_CARROSSEL);
    return () => clearTimeout(temporizador);
  }, [slideAtual, totalSlides, larguraSlide]);

  function aoRolarCarrossel(evento: NativeSyntheticEvent<NativeScrollEvent>) {
    if (larguraSlide === 0) return;
    const indice = Math.round(evento.nativeEvent.contentOffset.x / larguraSlide);
    if (indice !== slideAtual && indice >= 0 && indice < totalSlides) {
      setSlideAtual(indice);
    }
  }

  function aoMedirCarrossel(evento: LayoutChangeEvent) {
    setLarguraSlide(evento.nativeEvent.layout.width);
  }

  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  // Enquanto carrega (ou se falhar), mantém os textos padrão
  const primeiroNome = atleta?.nome_atleta.split(" ")[0] ?? "Atleta";
  const saudacaoCompleta = nomeResponsavel
    ? `${saudacao}, ${nomeResponsavel.split(" ")[0]}`
    : saudacao;
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
              <Text style={homeStyle.greeting}>{saudacaoCompleta}</Text>

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

        {/* CARROSSEL: próximo jogo, campeonatos do atleta e os banners do painel (some sem nenhum) */}
        {totalSlides > 0 && (
          <View>
            <View style={homeStyle.carrossel} onLayout={aoMedirCarrossel}>
              <ScrollView
                ref={carrosselRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={aoRolarCarrossel}
                scrollEventThrottle={16}
              >
                {larguraSlide > 0 &&
                  slides.map((slide) =>
                    slide.tipo === "jogo" &&
                    proximoJogo &&
                    jogo &&
                    meuTime &&
                    adversario ? (
                      <Pressable
                        key="jogo"
                        style={[homeStyle.bannerSlide, { width: larguraSlide }]}
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
                    ) : slide.tipo === "campeonato" ? (
                      <Pressable
                        key={chaveDoSlide(slide)}
                        style={[homeStyle.bannerSlide, { width: larguraSlide }]}
                        onPress={() =>
                          router.navigate({
                            pathname: "/campeonato-detalhe",
                            params: { id: String(slide.campeonato.id_campeonato) },
                          })
                        }
                      >
                        <Image
                          source={
                            slide.campeonato.banner_url
                              ? { uri: slide.campeonato.banner_url }
                              : require("@/assets/images/img/fundoCardCampeonatos.png")
                          }
                          style={homeStyle.bannerImage}
                          resizeMode="cover"
                        />
                        <View style={homeStyle.bannerGeralOverlay} />

                        <View style={homeStyle.bannerContent}>
                          <View style={homeStyle.campeonatoTopo}>
                            <View style={homeStyle.bannerTag}>
                              <Text style={homeStyle.bannerTagText}>
                                {slide.campeonato.tipo_label.toUpperCase()}
                              </Text>
                            </View>
                            <Text
                              style={homeStyle.campeonatoSituacao}
                              numberOfLines={1}
                            >
                              {slide.campeonato.situacao === "EM_ANDAMENTO"
                                ? "Em andamento"
                                : `Começa em ${diaMes(slide.campeonato.data_inicio_campeonato)}`}
                            </Text>
                          </View>

                          <View style={homeStyle.campeonatoMeio}>
                            <View style={homeStyle.campeonatoLogoBox}>
                              <Image
                                source={
                                  slide.campeonato.logo_url
                                    ? { uri: slide.campeonato.logo_url }
                                    : require("@/assets/images/img/escudovermelho.png")
                                }
                                style={homeStyle.campeonatoLogo}
                                resizeMode="contain"
                              />
                            </View>
                            <View style={homeStyle.campeonatoTextoCol}>
                              <Text
                                style={homeStyle.campeonatoNome}
                                numberOfLines={2}
                              >
                                {slide.campeonato.nome_campeonato}
                              </Text>
                              <Text
                                style={
                                  slide.campeonato.convocada
                                    ? homeStyle.campeonatoConvocacao
                                    : homeStyle.campeonatoCategorias
                                }
                                numberOfLines={1}
                              >
                                {linhaDoCampeonato(slide.campeonato)}
                              </Text>
                            </View>
                          </View>

                          <View style={homeStyle.bannerFooter}>
                            <Text style={homeStyle.bannerDate}>
                              {diaMes(slide.campeonato.data_inicio_campeonato)} até{" "}
                              {diaMes(slide.campeonato.data_fim_campeonato, true)}
                            </Text>
                            <Text style={homeStyle.bannerLink}>
                              Ver campeonato {">"}
                            </Text>
                          </View>
                        </View>
                      </Pressable>
                    ) : slide.tipo === "banner" ? (
                      <View
                        key={chaveDoSlide(slide)}
                        style={[homeStyle.bannerSlide, { width: larguraSlide }]}
                      >
                        <Image
                          source={{ uri: slide.banner.foto_url as string }}
                          style={homeStyle.bannerImage}
                          resizeMode="cover"
                        />
                        <View style={homeStyle.bannerGeralOverlay} />
                        <View style={homeStyle.bannerGeralConteudo}>
                          {slide.banner.titulo_banner && (
                            <Text style={homeStyle.bannerTitle} numberOfLines={2}>
                              {slide.banner.titulo_banner}
                            </Text>
                          )}
                          {slide.banner.subtitulo_banner && (
                            <Text
                              style={homeStyle.bannerGeralSubtitulo}
                              numberOfLines={2}
                            >
                              {slide.banner.subtitulo_banner}
                            </Text>
                          )}
                        </View>
                      </View>
                    ) : null,
                  )}
              </ScrollView>
            </View>

            {/* Pontos: mostram o slide atual e, tocados, levam até ele */}
            {totalSlides > 1 && (
              <View style={homeStyle.carrosselPontos}>
                {slides.map((slide, i) => (
                  <Pressable
                    key={chaveDoSlide(slide)}
                    onPress={() => irParaSlide(i)}
                    hitSlop={6}
                    accessibilityRole="button"
                    accessibilityLabel={`Ir para o destaque ${i + 1}`}
                  >
                    <View
                      style={[
                        homeStyle.carrosselPonto,
                        i === slideAtual && homeStyle.carrosselPontoAtivo,
                      ]}
                    />
                  </Pressable>
                ))}
              </View>
            )}
          </View>
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
