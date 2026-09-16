import classificacaoStyle from "@/styles/classificacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const indicadorAnim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    Animated.timing(indicadorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [indicadorAnim]);

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
              <View style={classificacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={classificacaoStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={classificacaoStyle.notificationBadge}>
                  <Text style={classificacaoStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
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

      <View
        style={[
          menuInferiorStyle.tabBar,
          { paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom },
        ]}
      >
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/home")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/homeBranca.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Home
          </Text>
        </Pressable>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/agenda")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/agendaBranca.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Agenda
          </Text>
        </Pressable>
        <View style={menuInferiorStyle.tabItem}>
          <Animated.View
            style={[
              menuInferiorStyle.tabIndicator,
              menuInferiorStyle.tabIndicatorActive,
              {
                opacity: indicadorAnim,
                transform: [{ scaleX: indicadorAnim }],
              },
            ]}
          />
          <Image
            source={require("@/assets/images/img/campeonatosVermelho.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive} numberOfLines={1}>
            Campeonatos
          </Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/desempenhoBranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Desempenho
          </Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/perfilbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Usuário
          </Text>
        </View>
      </View>
    </View>
  );
}
