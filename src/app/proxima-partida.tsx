import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import proximaPartidaStyle from "@/styles/proximaPartidaStyle";
import {
  diaDaSemana,
  diaMes,
  escudoDoTime,
  faseDoJogo,
  jogosDaCategoria,
  jogosFuturos,
  useCampeonato,
  voltarParaCampeonatos,
} from "@/utils/campeonatos";
import { abrirDetalhe, chaveDoDia } from "@/utils/eventos";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Jogos ainda sem placar da categoria (?id=&categoria=), de hoje em diante
export default function ProximaPartida() {
  const insets = useSafeAreaInsets();
  const { id, categoria } = useLocalSearchParams<{
    id?: string;
    categoria?: string;
  }>();
  const { campeonato, erro, idCategoria, eventosNaAgenda } = useCampeonato(
    id,
    categoria,
  );

  const rotuloCategoria = campeonato?.categorias.find(
    (cat) => cat.id_categoria === idCategoria,
  )?.rotulo;
  const partidas = campeonato
    ? jogosFuturos(jogosDaCategoria(campeonato, idCategoria), chaveDoDia(new Date()))
    : [];

  let conteudo;
  if (erro) {
    conteudo = <Text style={campeonatosStyle.estadoTexto}>{erro}</Text>;
  } else if (!campeonato) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>Carregando partidas...</Text>
    );
  } else if (partidas.length === 0) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>
        Não há partidas marcadas nesta categoria.
      </Text>
    );
  } else {
    conteudo = (
      <View style={proximaPartidaStyle.listSection}>
        {/* Datas à esquerda, alinhadas com os jogos do cartão */}
        <View>
          {partidas.map((j, index) => (
            <View key={j.id_jogo} style={proximaPartidaStyle.partidaRow}>
              <View style={proximaPartidaStyle.dateCol}>
                <Text style={proximaPartidaStyle.dateDay}>{diaMes(j.data_jogo)}</Text>
                <Text style={proximaPartidaStyle.dateWeekday}>
                  {diaDaSemana(j.data_jogo).slice(0, 3)}
                </Text>
              </View>
              <View style={proximaPartidaStyle.lineCol}>
                <View style={proximaPartidaStyle.lineDot} />
                {index < partidas.length - 1 && (
                  <View style={proximaPartidaStyle.lineConnector} />
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={proximaPartidaStyle.listCard}>
          {partidas.map((j, index) => {
            // Escudo do adversário da AACJ; jogo sem a AACJ, o do mandante
            const escudo =
              j.time_casa.da_aacj && !j.time_visitante.da_aacj
                ? j.time_visitante
                : j.time_casa;
            return (
              <View
                key={j.id_jogo}
                style={[
                  proximaPartidaStyle.partidaItem,
                  index < partidas.length - 1 && proximaPartidaStyle.partidaItemDivider,
                ]}
              >
                <Image
                  source={escudoDoTime(escudo)}
                  style={proximaPartidaStyle.partidaCrest}
                  resizeMode="contain"
                />
                <View style={proximaPartidaStyle.partidaTextCol}>
                  <Text
                    style={proximaPartidaStyle.partidaTeams}
                    numberOfLines={2}
                  >
                    {j.time_casa.nome_time}
                    <Text style={proximaPartidaStyle.partidaVs}> VS </Text>
                    {j.time_visitante.nome_time}
                  </Text>
                  <Text style={proximaPartidaStyle.partidaCompeticao} numberOfLines={1}>
                    {[j.horario_jogo, faseDoJogo(j)].filter(Boolean).join(" · ")}
                  </Text>
                  {j.local_jogo && (
                    <Text style={proximaPartidaStyle.partidaLocal} numberOfLines={1}>
                      {j.local_jogo}
                    </Text>
                  )}
                </View>
                {/* Só o jogo que está na agenda do atleta tem detalhe para abrir */}
                {eventosNaAgenda.includes(j.id_evento) && (
                  <Pressable onPress={() => abrirDetalhe(j.id_evento)} hitSlop={8}>
                    <Text style={proximaPartidaStyle.verDetalhesText}>
                      Ver detalhes {">"}
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })}
        </View>
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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
        }}
      >
        <View style={proximaPartidaStyle.header}>
          <View style={proximaPartidaStyle.headerTopRow}>
            <Pressable
              style={proximaPartidaStyle.backButton}
              onPress={voltarParaCampeonatos}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={proximaPartidaStyle.backChevron}>‹</Text>
            </Pressable>
            <View style={proximaPartidaStyle.headerTitleCol}>
              <Text style={proximaPartidaStyle.headerTitle}>Próximas partidas</Text>
              {campeonato && (
                <Text style={proximaPartidaStyle.headerSubtitle} numberOfLines={2}>
                  {[campeonato.nome_campeonato, rotuloCategoria]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              )}
            </View>
            <View style={proximaPartidaStyle.headerIconsRow}>
              <BotaoNotificacoes abaAtiva="campeonatos" />
            </View>
          </View>
        </View>

        {conteudo}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
