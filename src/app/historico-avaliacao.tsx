import TabBar from "@/components/tabBar";
import historicoAvaliacaoStyle from "@/styles/historicoAvaliacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const avaliacoes = [
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "92 Pontos",
    classificacao: "Excelente",
  },
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "92 Pontos",
    classificacao: "Excelente",
  },
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "92 Pontos",
    classificacao: "Excelente",
  },
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "92 Pontos",
    classificacao: "Excelente",
  },
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "79 Pontos",
    classificacao: "Regular",
  },
  {
    dia: "12/05",
    semana: "Dom",
    data: "12 de maio",
    titulo: "Avaliação Física",
    pontos: "76 Pontos",
    classificacao: "Regular",
  },
];

export default function HistoricoAvaliacao() {
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
        contentContainerStyle={historicoAvaliacaoStyle.scrollContent}
      >
        <View style={historicoAvaliacaoStyle.header}>
          <View style={historicoAvaliacaoStyle.headerTopRow}>
            <Pressable
              style={historicoAvaliacaoStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={historicoAvaliacaoStyle.backChevron}>‹</Text>
              <Text style={historicoAvaliacaoStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={historicoAvaliacaoStyle.headerTitleCol}>
              <Text
                style={historicoAvaliacaoStyle.headerTitle}
                numberOfLines={1}
              >
                Histórico de Avaliações
              </Text>
              <Text
                style={historicoAvaliacaoStyle.headerSubtitle}
                numberOfLines={1}
              >
                Temporada 2026 - Categoria Sub-17
              </Text>
            </View>
            <View style={historicoAvaliacaoStyle.headerIconsRow}>
              <View style={historicoAvaliacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={historicoAvaliacaoStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={historicoAvaliacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={historicoAvaliacaoStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={historicoAvaliacaoStyle.notificationBadge}>
                  <Text style={historicoAvaliacaoStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={historicoAvaliacaoStyle.listSection}>
          {avaliacoes.map((item, index) => {
            const ehUltimo = index === avaliacoes.length - 1;

            const estiloPill =
              item.classificacao === "Excelente"
                ? historicoAvaliacaoStyle.avaliacaoPillExcelente
                : historicoAvaliacaoStyle.avaliacaoPillRegular;

            const corTexto =
              item.classificacao === "Excelente" ? cores.verde : "#CAB24F";

            return (
              <View key={index} style={historicoAvaliacaoStyle.avaliacaoRow}>
                <View style={historicoAvaliacaoStyle.dateCol}>
                  <Text style={historicoAvaliacaoStyle.dateDay}>
                    {item.dia}
                  </Text>
                  <Text style={historicoAvaliacaoStyle.dateWeekday}>
                    {item.semana}
                  </Text>
                </View>

                <View style={historicoAvaliacaoStyle.lineCol}>
                  <View style={historicoAvaliacaoStyle.lineDot} />
                  {!ehUltimo && (
                    <View style={historicoAvaliacaoStyle.lineConnector} />
                  )}
                </View>

                <Pressable style={historicoAvaliacaoStyle.avaliacaoCard}>
                  <View style={historicoAvaliacaoStyle.avaliacaoTextCol}>
                    <Text style={historicoAvaliacaoStyle.avaliacaoData}>
                      {item.data}
                    </Text>
                    <Text style={historicoAvaliacaoStyle.avaliacaoTitulo}>
                      {item.titulo}
                    </Text>
                    <Text style={historicoAvaliacaoStyle.avaliacaoPontos}>
                      {item.pontos}
                    </Text>
                  </View>
                  <View
                    style={[
                      historicoAvaliacaoStyle.avaliacaoPill,
                      estiloPill,
                    ]}
                  >
                    <Text
                      style={[
                        historicoAvaliacaoStyle.avaliacaoPillText,
                        { color: corTexto },
                      ]}
                    >
                      {item.classificacao}
                    </Text>
                  </View>
                  <Text style={historicoAvaliacaoStyle.avaliacaoChevron}>
                    ›
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <TabBar abaAtiva="desempenho" />
    </View>
  );
}
