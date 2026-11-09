import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import campeonatosStyle from "@/styles/campeonatosStyle";
import classificacaoStyle from "@/styles/classificacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import {
  gruposDaCategoria,
  useCampeonato,
  voltarParaCampeonatos,
  type LinhaTabela,
} from "@/utils/campeonatos";
import { useLocalSearchParams } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Colunas da tabela, na mesma ordem do site; o nome vai para a legenda
const COLUNAS: {
  sigla: string;
  nome: string;
  valor: (l: LinhaTabela) => number | string;
  destaque?: boolean;
}[] = [
  { sigla: "PTS", nome: "Pontos", valor: (l) => l.pontos, destaque: true },
  { sigla: "PJ", nome: "Partidas Jogadas", valor: (l) => l.jogos },
  { sigla: "V", nome: "Vitórias", valor: (l) => l.vitorias },
  { sigla: "E", nome: "Empates", valor: (l) => l.empates },
  { sigla: "D", nome: "Derrotas", valor: (l) => l.derrotas },
  { sigla: "GM", nome: "Gols Marcados", valor: (l) => l.gols_marcados },
  { sigla: "GC", nome: "Gols Contra", valor: (l) => l.gols_sofridos },
  {
    sigla: "SG",
    nome: "Saldo de Gols",
    valor: (l) => (l.saldo > 0 ? `+${l.saldo}` : l.saldo),
  },
];

// Classificação completa da categoria (?id=&categoria=), uma tabela por grupo
export default function Classificacao() {
  const insets = useSafeAreaInsets();
  const { id, categoria } = useLocalSearchParams<{
    id?: string;
    categoria?: string;
  }>();
  const { campeonato, erro, idCategoria } = useCampeonato(id, categoria);

  const rotuloCategoria = campeonato?.categorias.find(
    (cat) => cat.id_categoria === idCategoria,
  )?.rotulo;
  const grupos = campeonato ? gruposDaCategoria(campeonato, idCategoria) : [];
  const temClassificado = grupos.some((g) => g.tabela.some((l) => l.classificado));

  let conteudo;
  if (erro) {
    conteudo = <Text style={campeonatosStyle.estadoTexto}>{erro}</Text>;
  } else if (!campeonato) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>Carregando classificação...</Text>
    );
  } else if (grupos.length === 0) {
    conteudo = (
      <Text style={campeonatosStyle.estadoTexto}>
        A classificação aparece depois dos primeiros jogos com placar. No mata-mata
        não há tabela de pontos.
      </Text>
    );
  } else {
    conteudo = grupos.map((grupo) => (
      <View key={grupo.grupo} style={classificacaoStyle.tableCard}>
        {grupos.length > 1 && (
          <Text style={classificacaoStyle.grupoTitulo}>{grupo.grupo}</Text>
        )}
        <View style={classificacaoStyle.tableHeaderRow}>
          <View style={classificacaoStyle.colPos}>
            <Text style={classificacaoStyle.tableHeaderText}>#</Text>
          </View>
          <View style={classificacaoStyle.colEquipe}>
            <Text style={classificacaoStyle.tableHeaderText}>Equipe</Text>
          </View>
          {COLUNAS.map((col) => (
            <View
              key={col.sigla}
              style={col.destaque ? classificacaoStyle.colDestaque : classificacaoStyle.colNumero}
            >
              <Text style={classificacaoStyle.tableHeaderText}>{col.sigla}</Text>
            </View>
          ))}
        </View>

        {grupo.tabela.map((linha) => (
          <View
            key={linha.id_time}
            style={[
              classificacaoStyle.linhaRow,
              linha.da_aacj && classificacaoStyle.linhaAacj,
            ]}
          >
            <View style={classificacaoStyle.colPos}>
              <Text
                style={[
                  classificacaoStyle.colPosText,
                  linha.classificado && classificacaoStyle.posClassificado,
                ]}
              >
                {linha.posicao}
              </Text>
            </View>
            <View style={classificacaoStyle.colEquipe}>
              {linha.logo_url ? (
                <Image
                  source={{ uri: linha.logo_url }}
                  style={classificacaoStyle.equipeEscudo}
                  resizeMode="contain"
                />
              ) : (
                <View style={classificacaoStyle.equipeBadge} />
              )}
              <Text
                style={[
                  classificacaoStyle.equipeNome,
                  linha.da_aacj && classificacaoStyle.equipeNomeAacj,
                ]}
                numberOfLines={2}
              >
                {linha.time}
              </Text>
            </View>
            {COLUNAS.map((col) => (
              <View
                key={col.sigla}
                style={col.destaque ? classificacaoStyle.colDestaque : classificacaoStyle.colNumero}
              >
                <Text
                  style={
                    col.destaque
                      ? classificacaoStyle.colDestaqueTexto
                      : classificacaoStyle.colNumeroTexto
                  }
                >
                  {col.valor(linha)}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    ));
  }

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
        <View style={classificacaoStyle.header}>
          <View style={classificacaoStyle.headerTopRow}>
            <Pressable
              style={classificacaoStyle.backButton}
              onPress={voltarParaCampeonatos}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={classificacaoStyle.backChevron}>‹</Text>
            </Pressable>
            <View style={classificacaoStyle.headerTitleCol}>
              <Text style={classificacaoStyle.headerTitle}>Classificação</Text>
              {campeonato && (
                <Text style={classificacaoStyle.headerSubtitle} numberOfLines={2}>
                  {[campeonato.nome_campeonato, rotuloCategoria]
                    .filter(Boolean)
                    .join(" · ")}
                </Text>
              )}
            </View>
            <View style={classificacaoStyle.headerIconsRow}>
              <BotaoNotificacoes abaAtiva="campeonatos" />
            </View>
          </View>
        </View>

        {conteudo}

        {grupos.length > 0 && (
          <View style={[classificacaoStyle.tableCard, classificacaoStyle.legendaCard]}>
            <View style={classificacaoStyle.legenda}>
              <View style={classificacaoStyle.legendaLinha}>
                {COLUNAS.map((col) => (
                  <Text key={col.sigla} style={classificacaoStyle.legendaItem}>
                    <Text style={classificacaoStyle.legendaSigla}>{col.sigla}: </Text>
                    {col.nome}
                  </Text>
                ))}
                {temClassificado && (
                  <Text style={classificacaoStyle.legendaItem}>
                    <Text style={classificacaoStyle.posClassificado}>1 </Text>
                    Classificado
                  </Text>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
