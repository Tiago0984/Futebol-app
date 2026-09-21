import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import observacaoStyle from "@/styles/observacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const observacoes = [
  {
    nome: "Professor João Silva",
    cargo: "Treinador técnico",
    mensagem:
      "Continue mantendo sua dedicação.\nSua evolução física foi muito positiva nas últimas semanas.",
    data: "12 de Maio",
  },
  {
    nome: "Professor Lucas",
    cargo: "Preparador Físico",
    mensagem:
      "Excelente disciplina.\nAgora vamos intensificar o trabalho de resistência",
    data: "10 de Maio",
  },
  {
    nome: "Professor João Silva",
    cargo: "Treinador técnico",
    mensagem:
      "Continue mantendo sua dedicação.\nSua evolução física foi muito positiva nas últimas semanas.",
    data: "09 de Maio",
  },
];

export default function Observacao() {
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
        contentContainerStyle={observacaoStyle.scrollContent}
      >
        <View style={observacaoStyle.header}>
          <View style={observacaoStyle.headerTopRow}>
            <Pressable
              style={observacaoStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={observacaoStyle.backChevron}>‹</Text>
              <Text style={observacaoStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={observacaoStyle.headerTitleCol}>
              <Text style={observacaoStyle.headerTitle} numberOfLines={1}>
                Observações Comissão
              </Text>
              <Text style={observacaoStyle.headerSubtitle} numberOfLines={1}>
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={observacaoStyle.headerIconsRow}>
              <View style={observacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={observacaoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="desempenho" />
            </View>
          </View>
        </View>

        <View style={observacaoStyle.listSection}>
          {observacoes.map((item, index) => (
            <View key={index} style={observacaoStyle.card}>
              <View style={observacaoStyle.cardHeaderRow}>
                <View style={observacaoStyle.avatarCirculo}>
                  <Image
                    source={require("@/assets/images/img/userPreto.png")}
                    style={observacaoStyle.avatarIcone}
                    resizeMode="contain"
                  />
                </View>
                <View style={observacaoStyle.nomeCol}>
                  <Text style={observacaoStyle.nome}>{item.nome}</Text>
                  <Text style={observacaoStyle.cargo}>{item.cargo}</Text>
                  <Text style={observacaoStyle.mensagem}>
                    {item.mensagem}
                  </Text>
                  <Text style={observacaoStyle.dataTexto}>{item.data}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <TabBar abaAtiva="desempenho" />
    </View>
  );
}
