import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import agendaStyle from "@/styles/agendaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";
import { Href, router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const diasDaSemana = [
  { label: "SEG", numero: 21 },
  { label: "TER", numero: 22 },
  { label: "QUA", numero: 23 },
  { label: "QUI", numero: 24 },
  { label: "SEX", numero: 25 },
  { label: "SAB", numero: 26 },
  { label: "DOM", numero: 27 },
];

const filtros = ["Todos", "Treinos", "Campeonatos", "Avaliações", "Reuniões"];

type Status = "confirmado" | "alterado" | "cancelado";

const statusConfig: Record<
  Status,
  { texto: string; cor: string; corFundo: string; icone: any }
> = {
  confirmado: {
    texto: "Confirmado",
    cor: cores.verde,
    corFundo: cores.verdeclaro,
    icone: require("@/assets/images/img/checkBranco.png"),
  },
  alterado: {
    texto: "Alterado",
    cor: cores.laranja,
    corFundo: cores.pastel,
    icone: require("@/assets/images/img/atencaoBranco.png"),
  },
  cancelado: {
    texto: "Cancelado",
    cor: cores.vermelho,
    corFundo: cores.vermelho20,
    icone: require("@/assets/images/img/xBranco.png"),
  },
};

// Para testar a troca do "Próximo compromisso", defina um horário aqui
// (ex: "17:45"). Com null, usa o horário atual do aparelho.
const HORARIO_SIMULADO: string | null = null;

type Compromisso = {
  id: string;
  categoria: string;
  horario: string;
  titulo: string;
  local: string;
  responsavel: string;
  status: Status;
  icone: any;
  corIcone: string;
  rota: Href;
};

// Lista em ordem cronológica
const compromissos: Compromisso[] = [
  {
    id: "treino-tecnico",
    categoria: "Treinos",
    horario: "17:30",
    titulo: "Treino Técnico",
    local: "Campo Principal",
    responsavel: "Professor João",
    status: "confirmado" as Status,
    rota: "/treino-tecnico",
    icone: require("@/assets/images/img/atletaVermelho.png"),
    corIcone: cores.vermelho20,
  },
  {
    id: "avaliacao-fisica",
    rota: "/avaliacao-fisica",
    categoria: "Avaliações",
    horario: "18:30",
    titulo: "Avaliação Física",
    local: "Departamento Médico",
    responsavel: "Fisiologista Ana",
    status: "confirmado" as Status,
    icone: require("@/assets/images/img/desempenhoVermelho.png"),
    corIcone: cores.pastel,
  },
  {
    id: "preparacao-fisica",
    rota: "/treino-tecnico",
    categoria: "Treinos",
    horario: "19:15",
    titulo: "Preparação Física",
    local: "Academia",
    responsavel: "Professor Lucas",
    status: "confirmado" as Status,
    icone: require("@/assets/images/img/coracaoVermelho.png"),
    corIcone: cores.vermelho20,
  },
  {
    id: "reuniao-tecnica",
    rota: "/agenda-local",
    categoria: "Reuniões",
    horario: "20:00",
    titulo: "Reunião Técnica",
    local: "Sala de Vídeo",
    responsavel: "Comissão Técnica",
    status: "confirmado" as Status,
    icone: require("@/assets/images/img/grupoPessoasVermelho.png"),
    corIcone: cores.rosa,
  },
  {
    id: "viagem",
    rota: "/detalhe-proxima-partida",
    categoria: "Campeonatos",
    horario: "21:30",
    titulo: "Viagem",
    local: "Deslocamento para jogo",
    responsavel: "Motorista Carlos",
    status: "cancelado" as Status,
    icone: require("@/assets/images/img/onibusVermelho.png"),
    corIcone: cores.azulclaro,
  },
];

function horarioAtual() {
  if (HORARIO_SIMULADO) return HORARIO_SIMULADO;
  const agora = new Date();
  const hh = String(agora.getHours()).padStart(2, "0");
  const mm = String(agora.getMinutes()).padStart(2, "0");
  return `${17}:${31}`;
}

function pertenceAoFiltro(categoria: string, filtro: string) {
  return filtro === "Todos" || categoria === filtro;
}

function contarCompromissos(filtro: string) {
  return compromissos.filter((c) => pertenceAoFiltro(c.categoria, filtro))
    .length;
}

export default function Agenda() {
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");

  const [agora, setAgora] = useState(horarioAtual);

  // Atualiza o horário a cada 30s para trocar o próximo compromisso sozinho
  useEffect(() => {
    const intervalo = setInterval(() => setAgora(horarioAtual()), 30000);
    return () => clearInterval(intervalo);
  }, []);

  const visiveis = compromissos.filter((c) =>
    pertenceAoFiltro(c.categoria, filtroAtivo),
  );
  // Próximo = primeiro que ainda não começou e não foi cancelado
  const indiceProximo = visiveis.findIndex(
    (c) => c.horario > agora && c.status !== "cancelado",
  );
  const proximo = indiceProximo >= 0 ? visiveis[indiceProximo] : null;
  const passados = visiveis.filter((c) => c.horario <= agora);
  const futuros = visiveis.filter((c) => c.horario > agora && c !== proximo);

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="stretch"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={agendaStyle.scrollContent}
      >
        <View style={agendaStyle.header}>
          <View style={agendaStyle.headerTopRow}>
            <View>
              <Text style={agendaStyle.screenTitle}>Agenda</Text>
              <Text style={agendaStyle.screenSubtitle}>
                Sua programação esportiva
              </Text>
            </View>
            <View style={agendaStyle.headerIconsRow}>
              <View style={agendaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={agendaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="agenda" />
            </View>
          </View>

          <View style={agendaStyle.monthNavRow}>
            <View style={agendaStyle.monthNavLeft}>
              <Text style={agendaStyle.monthChevron}>‹</Text>
              <Text style={agendaStyle.monthText}>Agosto 2026</Text>
              <Text style={agendaStyle.monthChevron}>›</Text>
            </View>
            <View style={agendaStyle.monthNavRight}>
              <Image
                source={require("@/assets/images/img/setaVermelha.png")}
                style={agendaStyle.dropdownChevron}
                resizeMode="contain"
              />
              <View style={agendaStyle.calendarButton}>
                <Image
                  source={require("@/assets/images/img/agendaBranca.png")}
                  style={agendaStyle.calendarButtonIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={agendaStyle.weekStrip}>
          {diasDaSemana.map((dia) => {
            const ativo = dia.label === "QUI";
            return (
              <View key={dia.label} style={agendaStyle.weekDayCol}>
                <Text style={agendaStyle.weekDayLabel}>{dia.label}</Text>
                <View
                  style={[
                    agendaStyle.weekDayCircle,
                    ativo && agendaStyle.weekDayCircleActive,
                  ]}
                >
                  <Text
                    style={[
                      agendaStyle.weekDayNumber,
                      ativo && agendaStyle.weekDayNumberActive,
                    ]}
                  >
                    {dia.numero}
                  </Text>
                </View>
                <View style={agendaStyle.weekDayDot} />
              </View>
            );
          })}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={agendaStyle.filterScroll}
          contentContainerStyle={agendaStyle.filterRow}
        >
          {filtros.map((filtro) => {
            const ativo = filtro === filtroAtivo;
            return (
              <Pressable
                key={filtro}
                style={[
                  agendaStyle.filterPill,
                  ativo && agendaStyle.filterPillActive,
                ]}
                onPress={() => setFiltroAtivo(filtro)}
              >
                <Text style={agendaStyle.filterPillText}>{filtro}</Text>
                <Text style={agendaStyle.filterPillCount}>
                  {contarCompromissos(filtro)}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {passados.length > 0 && (
          <View style={agendaStyle.timelineSection}>
            {passados.map((item, index) => (
              <ItemTimeline
                key={item.id}
                item={item}
                passado
                comLinha={index < passados.length - 1 || !!proximo}
              />
            ))}
          </View>
        )}

        {passados.length > 0 && proximo && (
          <View style={agendaStyle.timelineConnector}>
            <View style={agendaStyle.timelineConnectorSpacer} />
            <View style={agendaStyle.timelineConnectorRail}>
              <View style={agendaStyle.timelineConnectorLine} />
            </View>
          </View>
        )}

        {proximo && (
          <View
            style={[
              agendaStyle.nextCard,
              passados.length > 0 && { marginTop: 0 },
            ]}
          >
            <Text style={agendaStyle.nextCardLabel}>Próximo compromisso</Text>
            <View style={agendaStyle.nextCardTopRow}>
              <View style={agendaStyle.nextCardMainRow}>
                <View
                  style={[
                    agendaStyle.nextCardIconSquare,
                    { backgroundColor: proximo.corIcone },
                  ]}
                >
                  <Image
                    source={proximo.icone}
                    style={agendaStyle.nextCardIcon}
                    resizeMode="contain"
                  />
                </View>
                <View style={agendaStyle.nextCardTextCol}>
                  <Text style={agendaStyle.nextCardTime} numberOfLines={1}>
                    {proximo.horario}
                  </Text>
                  <Text
                    style={agendaStyle.nextCardTitle}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.7}
                  >
                    {proximo.titulo}
                  </Text>
                  <View style={agendaStyle.nextCardInfoRow}>
                    <Image
                      source={require("@/assets/images/img/localizacaoPreto.png")}
                      style={agendaStyle.nextCardInfoIcon}
                      resizeMode="contain"
                    />
                    <Text
                      style={agendaStyle.nextCardInfoText}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {proximo.local}
                    </Text>
                  </View>
                  <View style={agendaStyle.nextCardInfoRow}>
                    <Image
                      source={require("@/assets/images/img/userPreto.png")}
                      style={agendaStyle.nextCardInfoIcon}
                      resizeMode="contain"
                    />
                    <Text
                      style={agendaStyle.nextCardInfoText}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {proximo.responsavel}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={agendaStyle.nextCardSide}>
                <View
                  style={[
                    agendaStyle.nextConfirmedPill,
                    { backgroundColor: statusConfig[proximo.status].corFundo },
                  ]}
                >
                  <View
                    style={[
                      agendaStyle.nextStatusIconCircle,
                      { backgroundColor: statusConfig[proximo.status].cor },
                    ]}
                  >
                    <Image
                      source={statusConfig[proximo.status].icone}
                      style={agendaStyle.statusIconGlyph}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    style={[
                      agendaStyle.nextConfirmedText,
                      { color: statusConfig[proximo.status].cor },
                    ]}
                  >
                    {statusConfig[proximo.status].texto}
                  </Text>
                </View>
                <Pressable onPress={() => router.navigate(proximo.rota)}>
                  <Text style={agendaStyle.nextDetailsLink}>
                    Ver detalhes {">"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        )}

        {proximo && futuros.length > 0 && (
          <View style={agendaStyle.timelineConnector}>
            <View style={agendaStyle.timelineConnectorSpacer} />
            <View style={agendaStyle.timelineConnectorRail}>
              <View style={agendaStyle.timelineConnectorLine} />
            </View>
          </View>
        )}

        <View style={agendaStyle.timelineSection}>
          {futuros.map((item, index) => (
            <ItemTimeline
              key={item.id}
              item={item}
              comLinha={index < futuros.length - 1}
            />
          ))}
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="agenda" />
    </View>
  );
}

function ItemTimeline({
  item,
  comLinha,
  passado = false,
}: {
  item: Compromisso;
  comLinha: boolean;
  passado?: boolean;
}) {
  const status = statusConfig[item.status];
  return (
    <View style={agendaStyle.timelineItem}>
      <View style={agendaStyle.timelineTimeCol}>
        <Text
          style={[agendaStyle.timelineTime, passado && agendaStyle.passado]}
        >
          {item.horario}
        </Text>
      </View>
      <View style={agendaStyle.timelineLineCol}>
        {comLinha && <View style={agendaStyle.timelineLine} />}
        <View
          style={[
            agendaStyle.timelineDot,
            { backgroundColor: status.cor },
            passado && agendaStyle.passado,
          ]}
        />
      </View>
      <View
        style={[
          agendaStyle.timelineItemContent,
          passado && agendaStyle.passado,
        ]}
      >
        <View
          style={[
            agendaStyle.timelineIconSquare,
            { backgroundColor: item.corIcone },
          ]}
        >
          <Image
            source={item.icone}
            style={agendaStyle.timelineIcon}
            resizeMode="contain"
          />
        </View>
        <View style={agendaStyle.timelineTextCol}>
          <Text
            style={agendaStyle.timelineTitle}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {item.titulo}
          </Text>
          <View style={agendaStyle.timelineInfoRow}>
            <Image
              source={require("@/assets/images/img/localizacaoCinza.png")}
              style={agendaStyle.timelineInfoIcon}
              resizeMode="contain"
            />
            <Text
              style={agendaStyle.timelineInfoText}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {item.local}
            </Text>
          </View>
          <View style={agendaStyle.timelineInfoRow}>
            <Image
              source={require("@/assets/images/img/perfilCinza.png")}
              style={agendaStyle.timelineInfoIcon}
              resizeMode="contain"
            />
            <Text
              style={agendaStyle.timelineInfoText}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.7}
            >
              {item.responsavel}
            </Text>
          </View>
        </View>
        <View style={agendaStyle.timelineStatusCol}>
          <View style={[agendaStyle.statusPill, { borderColor: status.cor }]}>
            <View
              style={[
                agendaStyle.statusIconCircle,
                { backgroundColor: status.cor },
              ]}
            >
              <Image
                source={status.icone}
                style={agendaStyle.statusIconGlyph}
                resizeMode="contain"
              />
            </View>
            <Text style={[agendaStyle.statusText, { color: status.cor }]}>
              {status.texto}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
