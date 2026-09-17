import observacaoStyle from "@/styles/observacaoStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
              <View style={observacaoStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={observacaoStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={observacaoStyle.notificationBadge}>
                  <Text style={observacaoStyle.notificationBadgeText}>2</Text>
                </View>
              </View>
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
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/campeonatos")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel} numberOfLines={1}>
            Campeonatos
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
            source={require("@/assets/images/img/desempenhoVermelho.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive} numberOfLines={1}>
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
