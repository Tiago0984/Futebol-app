import TabBar from "@/components/tabBar";
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { SITE } from "@/config/api";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FaleConosco() {
  const insets = useSafeAreaInsets();

  const [erro, setErro] = useState("");

  async function abrirContato() {
    setErro("");
    try {
      await Linking.openURL(`${SITE}/contato`);
    } catch {
      setErro("Não foi possível abrir a página de contato. Tente novamente.");
    }
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
        style={faleConoscoStyle.scrollView}
        contentContainerStyle={[
          faleConoscoStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 30,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={faleConoscoStyle.header}>
          <Pressable
            style={faleConoscoStyle.backButton}
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={faleConoscoStyle.backChevron}>‹</Text>
          </Pressable>

          <Text style={faleConoscoStyle.headerTitle}>Fale conosco</Text>

          <View style={faleConoscoStyle.headerSpacer} />
        </View>

        <View style={faleConoscoStyle.formCard}>
          <Text style={faleConoscoStyle.attendanceValue}>
            Envie sua mensagem pela página de contato da AACJ.
          </Text>
          <Pressable style={faleConoscoStyle.sendButton} onPress={abrirContato}>
            <Text style={faleConoscoStyle.sendButtonText}>Abrir página de contato</Text>
          </Pressable>
          {erro !== "" && (
            <Text style={faleConoscoStyle.attendanceValue}>{erro}</Text>
          )}
        </View>

        {/* ATENDIMENTO */}
        <View style={faleConoscoStyle.attendanceSection}>
          <View style={faleConoscoStyle.attendanceContent}>
            <Text style={faleConoscoStyle.attendanceTitle}>Atendimento</Text>

            <View style={faleConoscoStyle.attendanceBlock}>
              <Text style={faleConoscoStyle.attendanceValue}>
                Consulte os canais oficiais e as informações de atendimento na página de contato.
              </Text>
            </View>
          </View>

          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={faleConoscoStyle.aacjLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
