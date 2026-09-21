import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import classificacaoStyle from "@/styles/classificacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const times = [
  "Verdão",
  "AACJ",
  "Santos",
  "Palmeiras",
  "São Paulo",
  "Corinthians",
  "Flamengo",
  "Guarani",
  "Ferroviária",
  "Time Preto",
  "Grêmio",
  "Internacional",
  "Atlético",
  "Cruzeiro",
  "Bahia",
  "Vitória",
  "Sport",
  "Náutico",
  "Fluminense",
  "Botafogo",
  "Vasco",
  "Coritiba",
  "Goiás",
];

export default function Classificacao() {

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
        contentContainerStyle={classificacaoStyle.scrollContent}
      >
        <View style={classificacaoStyle.header}>
          <View style={classificacaoStyle.headerTopRow}>
            <Pressable
              style={classificacaoStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={classificacaoStyle.backChevron}>‹</Text>
              <Text style={classificacaoStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={classificacaoStyle.headerTitleCol}>
              <Text style={classificacaoStyle.headerTitle} numberOfLines={1}>
                Classificação
              </Text>
              <Text style={classificacaoStyle.headerSubtitle} numberOfLines={1}>
                Categoria Sub-17
              </Text>
            </View>
            <View style={classificacaoStyle.headerIconsRow}>
              <View style={classificacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={classificacaoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="campeonatos" />
            </View>
          </View>
        </View>

        <View style={classificacaoStyle.tableCard}>
          <View style={classificacaoStyle.tableHeaderRow}>
            <View style={classificacaoStyle.colPos}>
              <Text style={classificacaoStyle.tableHeaderText}>POS</Text>
            </View>
            <View style={classificacaoStyle.colEquipe}>
              <Text style={classificacaoStyle.tableHeaderText}>Equipe</Text>
            </View>
            <View style={classificacaoStyle.colNumero}>
              <Text style={classificacaoStyle.tableHeaderText}>PJ</Text>
            </View>
            <View style={classificacaoStyle.colNumero}>
              <Text style={classificacaoStyle.tableHeaderText}>V</Text>
            </View>
            <View style={classificacaoStyle.colNumero}>
              <Text style={classificacaoStyle.tableHeaderText}>E</Text>
            </View>
            <View style={classificacaoStyle.colNumero}>
              <Text style={classificacaoStyle.tableHeaderText}>D</Text>
            </View>
            <View style={classificacaoStyle.colDestaque}>
              <Text style={classificacaoStyle.tableHeaderText}>SG</Text>
            </View>
            <View style={classificacaoStyle.colDestaque}>
              <Text style={classificacaoStyle.tableHeaderText}>PTS</Text>
            </View>
          </View>

          {times.map((nome, index) => (
            <View key={nome} style={classificacaoStyle.linhaRow}>
              <View style={classificacaoStyle.colPos}>
                <Text style={classificacaoStyle.colPosText}>{index + 1}</Text>
              </View>
              <View style={classificacaoStyle.colEquipe}>
                <View style={classificacaoStyle.equipeBadge} />
                <Text style={classificacaoStyle.equipeNome} numberOfLines={1}>
                  {nome}
                </Text>
              </View>
              <View style={classificacaoStyle.colNumero}>
                <Text style={classificacaoStyle.colNumeroTexto}>27</Text>
              </View>
              <View style={classificacaoStyle.colNumero}>
                <Text style={classificacaoStyle.colNumeroTexto}>7</Text>
              </View>
              <View style={classificacaoStyle.colNumero}>
                <Text style={classificacaoStyle.colNumeroTexto}>2</Text>
              </View>
              <View style={classificacaoStyle.colNumero}>
                <Text style={classificacaoStyle.colNumeroTexto}>0</Text>
              </View>
              <View style={classificacaoStyle.colDestaque}>
                <Text style={classificacaoStyle.colDestaqueTexto}>+14</Text>
              </View>
              <View style={classificacaoStyle.colDestaque}>
                <Text style={classificacaoStyle.colDestaqueTexto}>24</Text>
              </View>
            </View>
          ))}

          <View style={classificacaoStyle.legenda}>
            <View style={classificacaoStyle.legendaLinha}>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>PJ: </Text>
                Jogos
              </Text>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>V: </Text>
                Vitórias
              </Text>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>E: </Text>
                Empates
              </Text>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>D: </Text>
                Derrotas
              </Text>
            </View>
            <View style={classificacaoStyle.legendaLinha}>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>SG: </Text>
                Saldo de gols
              </Text>
              <Text style={classificacaoStyle.legendaItem}>
                <Text style={classificacaoStyle.legendaSigla}>PTS: </Text>
                Pontos
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
