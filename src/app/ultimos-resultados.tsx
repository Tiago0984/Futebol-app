import TabBar from "@/components/tabBar";
import fundoStyle from "@/styles/fundoStyle";
import ultimosResultadosStyle from "@/styles/ultimosResultadosStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const crestAacj = require("@/assets/images/img/logo/logo-aacj.png");
const crestTimePreto = require("@/assets/images/img/logo/time-preto.jpg");

const resultados = [
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  2 X 0  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Vitória",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    placar: "AACJ  1 X 1  Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
    resultado: "Empate",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  0 X 1  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Derrota",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  2 X 0  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Vitória",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    placar: "AACJ  1 X 1  Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
    resultado: "Empate",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    placar: "AACJ  0 X 1  Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
    resultado: "Derrota",
  },
];

export default function UltimosResultados() {

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
        contentContainerStyle={ultimosResultadosStyle.scrollContent}
      >
        <View style={ultimosResultadosStyle.header}>
          <View style={ultimosResultadosStyle.headerTopRow}>
            <Pressable
              style={ultimosResultadosStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={ultimosResultadosStyle.backChevron}>‹</Text>
              <Text style={ultimosResultadosStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={ultimosResultadosStyle.headerTitleCol}>
              <Text style={ultimosResultadosStyle.headerTitle} numberOfLines={1}>
                Últimos resultados
              </Text>
              <Text
                style={ultimosResultadosStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={ultimosResultadosStyle.headerIconsRow}>
              <View style={ultimosResultadosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={ultimosResultadosStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={ultimosResultadosStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={ultimosResultadosStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={ultimosResultadosStyle.notificationBadge}>
                  <Text style={ultimosResultadosStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={ultimosResultadosStyle.listSection}>
          <View>
            {resultados.map((item, index) => {
              const ehUltimo = index === resultados.length - 1;

              return (
                <View key={index} style={ultimosResultadosStyle.resultRow}>
                  <View style={ultimosResultadosStyle.dateCol}>
                    <Text style={ultimosResultadosStyle.dateDay}>
                      {item.dia}
                    </Text>
                    <Text style={ultimosResultadosStyle.dateWeekday}>
                      {item.semana}
                    </Text>
                  </View>

                  <View style={ultimosResultadosStyle.lineCol}>
                    <View style={ultimosResultadosStyle.lineDot} />
                    {!ehUltimo && (
                      <View style={ultimosResultadosStyle.lineConnector} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={ultimosResultadosStyle.listCard}>
            {resultados.map((item, index) => {
              const ehUltimo = index === resultados.length - 1;

              const estiloPill =
                item.resultado === "Vitória"
                  ? ultimosResultadosStyle.resultPillVitoria
                  : item.resultado === "Derrota"
                    ? ultimosResultadosStyle.resultPillDerrota
                    : ultimosResultadosStyle.resultPillEmpate;

              const corTexto =
                item.resultado === "Vitória"
                  ? cores.verde
                  : item.resultado === "Derrota"
                    ? cores.vermelho
                    : cores.cinza;

              return (
                <View
                  key={index}
                  style={[
                    ultimosResultadosStyle.resultItem,
                    !ehUltimo && ultimosResultadosStyle.resultItemDivider,
                  ]}
                >
                  <Image
                    source={item.crest}
                    style={ultimosResultadosStyle.resultCrest}
                    resizeMode="contain"
                  />
                  <View style={ultimosResultadosStyle.resultTextCol}>
                    <Text
                      style={ultimosResultadosStyle.resultScore}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      {item.placar}
                    </Text>
                    <Text
                      style={ultimosResultadosStyle.resultCompeticao}
                      numberOfLines={1}
                    >
                      {item.competicao}
                    </Text>
                    <Text
                      style={ultimosResultadosStyle.resultLocal}
                      numberOfLines={1}
                    >
                      {item.local}
                    </Text>
                  </View>
                  <View
                    style={[ultimosResultadosStyle.resultPill, estiloPill]}
                  >
                    <Text
                      style={[
                        ultimosResultadosStyle.resultPillText,
                        { color: corTexto },
                      ]}
                    >
                      {item.resultado}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="campeonatos" />
    </View>
  );
}
