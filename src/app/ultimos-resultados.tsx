import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import campeonatosStyle from "@/styles/campeonatosStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import ultimosResultadosStyle from "@/styles/ultimosResultadosStyle";
import { cores } from "@/styles/variaveis";
import {
  diaDaSemana,
  diaMes,
  escudoDoTime,
  faseDoJogo,
  jogado,
  jogosDaCategoria,
  placarTexto,
  resultadoDaAacj,
  ROTULO_RESULTADO,
  useCampeonato,
  voltarParaCampeonatos,
} from "@/utils/campeonatos";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Todos os jogos com placar da categoria (?id=&categoria=), do mais recente ao mais antigo
export default function UltimosResultados() {
  const insets = useSafeAreaInsets();
  const { id, categoria } = useLocalSearchParams<{
    id?: string;
    categoria?: string;
  }>();
  const { campeonato, erro, idCategoria } = useCampeonato(id, categoria);

  const rotuloCategoria = campeonato?.categorias.find(
    (cat) => cat.id_categoria === idCategoria,
  )?.rotulo;
  const resultados = campeonato
    ? jogosDaCategoria(campeonato, idCategoria).filter(jogado).reverse()
    : [];

  let conteudo;
  if (erro) {
    conteudo = <Text style={campeonatosStyle.estadoTexto}>{erro}</Text>;
  } else if (!campeonato) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>Carregando resultados...</Text>
    );
  } else if (resultados.length === 0) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>
        Ainda não há resultados nesta categoria.
      </Text>
    );
  } else {
    conteudo = (
      <View style={ultimosResultadosStyle.listSection}>
        {/* Datas à esquerda, alinhadas com os jogos do cartão */}
        <View>
          {resultados.map((j, index) => (
            <View key={j.id_jogo} style={ultimosResultadosStyle.resultRow}>
              <View style={ultimosResultadosStyle.dateCol}>
                <Text style={ultimosResultadosStyle.dateDay}>{diaMes(j.data_jogo)}</Text>
                <Text style={ultimosResultadosStyle.dateWeekday}>
                  {diaDaSemana(j.data_jogo).slice(0, 3)}
                </Text>
              </View>
              <View style={ultimosResultadosStyle.lineCol}>
                <View style={ultimosResultadosStyle.lineDot} />
                {index < resultados.length - 1 && (
                  <View style={ultimosResultadosStyle.lineConnector} />
                )}
              </View>
            </View>
          ))}
        </View>

        <View style={ultimosResultadosStyle.listCard}>
          {resultados.map((j, index) => {
            const resultado = resultadoDaAacj(j);
            // Escudo do adversário da AACJ; jogo sem a AACJ, o do mandante
            const escudo =
              j.time_casa.da_aacj && !j.time_visitante.da_aacj
                ? j.time_visitante
                : j.time_casa;
            const estiloPill =
              resultado === "VITORIA"
                ? ultimosResultadosStyle.resultPillVitoria
                : resultado === "DERROTA"
                  ? ultimosResultadosStyle.resultPillDerrota
                  : ultimosResultadosStyle.resultPillEmpate;
            const corTexto =
              resultado === "VITORIA"
                ? cores.verde
                : resultado === "DERROTA"
                  ? cores.vermelho
                  : cores.cinza;

            return (
              <View
                key={j.id_jogo}
                style={[
                  ultimosResultadosStyle.resultItem,
                  index < resultados.length - 1 &&
                    ultimosResultadosStyle.resultItemDivider,
                ]}
              >
                <Image
                  source={escudoDoTime(escudo)}
                  style={ultimosResultadosStyle.resultCrest}
                  resizeMode="contain"
                />
                <View style={ultimosResultadosStyle.resultTextCol}>
                  <Text
                    style={ultimosResultadosStyle.resultScore}
                    numberOfLines={2}
                  >
                    {j.time_casa.nome_time}  {placarTexto(j)}  {j.time_visitante.nome_time}
                  </Text>
                  <Text style={ultimosResultadosStyle.resultCompeticao} numberOfLines={1}>
                    {faseDoJogo(j) || campeonato.nome_campeonato}
                  </Text>
                  {j.local_jogo && (
                    <Text style={ultimosResultadosStyle.resultLocal} numberOfLines={1}>
                      {j.local_jogo}
                    </Text>
                  )}
                </View>
                {/* Vitória/Empate/Derrota só nos jogos da AACJ */}
                {resultado && (
                  <View style={[ultimosResultadosStyle.resultPill, estiloPill]}>
                    <Text style={[ultimosResultadosStyle.resultPillText, { color: corTexto }]}>
                      {ROTULO_RESULTADO[resultado]}
                    </Text>
                  </View>
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
        <View style={ultimosResultadosStyle.header}>
          <View style={ultimosResultadosStyle.headerTopRow}>
            <Pressable
              style={ultimosResultadosStyle.backButton}
              onPress={voltarParaCampeonatos}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={ultimosResultadosStyle.backChevron}>‹</Text>
            </Pressable>
            <View style={ultimosResultadosStyle.headerTitleCol}>
              <Text style={ultimosResultadosStyle.headerTitle}>
                Últimos resultados
              </Text>
              {campeonato && (
                <Text style={ultimosResultadosStyle.headerSubtitle} numberOfLines={2}>
                  {[campeonato.nome_campeonato, rotuloCategoria]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              )}
            </View>
            <View style={ultimosResultadosStyle.headerIconsRow}>
              <View style={ultimosResultadosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={ultimosResultadosStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
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
