import menuInferiorStyle, {
  TAB_BAR_BASE_PADDING_BOTTOM,
} from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type TabName = "home" | "agenda" | "campeonatos" | "desempenho" | "perfil";

interface TabBarProps {
  abaAtiva: TabName;
}

const ICONES: Record<TabName, number> = {
  home: require("@/assets/images/img/homeBranca.png"),
  agenda: require("@/assets/images/img/agendaBranca.png"),
  campeonatos: require("@/assets/images/img/campeonatosbranco.png"),
  desempenho: require("@/assets/images/img/desempenhoBranco.png"),
  perfil: require("@/assets/images/img/perfilbranco.png"),
};

const ABAS: { nome: TabName; label: string; rota?: "/home" | "/agenda" | "/campeonatos" | "/desempenho" | "/perfil" }[] = [
  { nome: "home", label: "Home", rota: "/home" },
  { nome: "agenda", label: "Agenda", rota: "/agenda" },
  { nome: "campeonatos", label: "Campeonatos", rota: "/campeonatos" },
  { nome: "perfil", label: "Usuário", rota: "/perfil" },
];

export default function TabBar({ abaAtiva }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        menuInferiorStyle.tabBar,
        { paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom },
      ]}
    >
      {ABAS.map((aba) => {
        const ativa = aba.nome === abaAtiva;

        return (
          <Pressable
            key={aba.nome}
            style={menuInferiorStyle.tabItem}
            onPress={() => aba.rota && router.navigate(aba.rota)}
          >
            <View
              style={[
                menuInferiorStyle.tabIndicator,
                ativa && menuInferiorStyle.tabIndicatorActive,
              ]}
            />
            <Image
              source={ICONES[aba.nome]}
              style={menuInferiorStyle.tabIcon}
              tintColor={ativa ? cores.vermelho : cores.branco}
              resizeMode="contain"
            />
            <Text
              style={ativa ? menuInferiorStyle.tabLabelActive : menuInferiorStyle.tabLabel}
              numberOfLines={1}
            >
              {aba.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
