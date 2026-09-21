import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import fundoStyle from "@/styles/fundoStyle";
import proximaPartidaStyle from "@/styles/proximaPartidaStyle";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

const crestAacj = require("@/assets/images/img/logo/logo-aacj.png");
const crestTimePreto = require("@/assets/images/img/logo/time-preto.jpg");

const partidas = [
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "20/04",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
  {
    dia: "04/05",
    semana: "Dom",
    crest: crestAacj,
    adversario: "Santos",
    competicao: "Campeonato paulista sub-17",
    local: "Estádio Municipal",
  },
  {
    dia: "27/04",
    semana: "Dom",
    crest: crestTimePreto,
    adversario: "Palmeiras",
    competicao: "Campeonato paulista sub-17",
    local: "Arena Barueri",
  },
];

export default function ProximaPartida() {
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
        contentContainerStyle={proximaPartidaStyle.scrollContent}
      >
        <View style={proximaPartidaStyle.header}>
          <View style={proximaPartidaStyle.headerTopRow}>
            <Pressable
              style={proximaPartidaStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={proximaPartidaStyle.backChevron}>‹</Text>
              <Text style={proximaPartidaStyle.backText}>Voltar</Text>
            </Pressable>
            <View style={proximaPartidaStyle.headerTitleCol}>
              <Text style={proximaPartidaStyle.headerTitle} numberOfLines={1}>
                Próximas partidas
              </Text>
              <Text
                style={proximaPartidaStyle.headerSubtitle}
                numberOfLines={1}
              >
                Categoria Sub-17
              </Text>
            </View>
            <View style={proximaPartidaStyle.headerIconsRow}>
              <View style={proximaPartidaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={proximaPartidaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="campeonatos" />
            </View>
          </View>
        </View>

        <View style={proximaPartidaStyle.listSection}>
          <View>
            {partidas.map((item, index) => {
              const ehUltimo = index === partidas.length - 1;

              return (
                <View key={index} style={proximaPartidaStyle.partidaRow}>
                  <View style={proximaPartidaStyle.dateCol}>
                    <Text style={proximaPartidaStyle.dateDay}>
                      {item.dia}
                    </Text>
                    <Text style={proximaPartidaStyle.dateWeekday}>
                      {item.semana}
                    </Text>
                  </View>

                  <View style={proximaPartidaStyle.lineCol}>
                    <View style={proximaPartidaStyle.lineDot} />
                    {!ehUltimo && (
                      <View style={proximaPartidaStyle.lineConnector} />
                    )}
                  </View>
                </View>
              );
            })}
          </View>

          <View style={proximaPartidaStyle.listCard}>
            {partidas.map((item, index) => {
              const ehUltimo = index === partidas.length - 1;

              return (
                <View
                  key={index}
                  style={[
                    proximaPartidaStyle.partidaItem,
                    !ehUltimo && proximaPartidaStyle.partidaItemDivider,
                  ]}
                >
                  <Image
                    source={item.crest}
                    style={proximaPartidaStyle.partidaCrest}
                    resizeMode="contain"
                  />
                  <View style={proximaPartidaStyle.partidaTextCol}>
                    <Text
                      style={proximaPartidaStyle.partidaTeams}
                      numberOfLines={1}
                      adjustsFontSizeToFit
                      minimumFontScale={0.7}
                    >
                      AACJ
                      <Text style={proximaPartidaStyle.partidaVs}> VS </Text>
                      {item.adversario}
                    </Text>
                    <Text
                      style={proximaPartidaStyle.partidaCompeticao}
                      numberOfLines={1}
                    >
                      {item.competicao}
                    </Text>
                    <Text
                      style={proximaPartidaStyle.partidaLocal}
                      numberOfLines={1}
                    >
                      {item.local}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => router.navigate("/detalhe-proxima-partida")}
                  >
                    <Text style={proximaPartidaStyle.verDetalhesText}>
                      Ver detalhes {">"}
                    </Text>
                  </Pressable>
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
