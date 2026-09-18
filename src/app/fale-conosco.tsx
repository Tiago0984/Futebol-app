import TabBar from "@/components/tabBar";
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FaleConosco() {
  const insets = useSafeAreaInsets();

  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");

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
          >
            <Text style={faleConoscoStyle.backText}>{"<"} Voltar</Text>
          </Pressable>

          <Text style={faleConoscoStyle.headerTitle}>Fale conosco</Text>

          <View style={faleConoscoStyle.headerSpacer} />
        </View>

        {/* FORMULÁRIO */}
        <View style={faleConoscoStyle.formCard}>
          {/* ASSUNTO */}
          <View style={faleConoscoStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/tag.png")}
              style={faleConoscoStyle.inputIcon}
              resizeMode="contain"
            />

            <TextInput
              style={faleConoscoStyle.assuntoInput}
              value={assunto}
              onChangeText={setAssunto}
              placeholder="Assunto"
              placeholderTextColor={cores.cinza}
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>

          {/* MENSAGEM */}
          <View
            style={[
              faleConoscoStyle.inputWrapper,
              faleConoscoStyle.messageWrapper,
            ]}
          >
            <Image
              source={require("@/assets/images/img/mensagem.png")}
              style={faleConoscoStyle.inputIcon}
              resizeMode="contain"
            />

            <TextInput
              style={faleConoscoStyle.messageInput}
              value={mensagem}
              onChangeText={setMensagem}
              placeholder="Mensagem"
              placeholderTextColor={cores.cinza}
              multiline
              scrollEnabled
              textAlignVertical="top"
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>

          {/* ENVIAR */}
          <Pressable style={faleConoscoStyle.sendButton} onPress={() => {}}>
            <Text style={faleConoscoStyle.sendButtonText}>Enviar mensagem</Text>
          </Pressable>
        </View>

        {/* ATENDIMENTO */}
        <View style={faleConoscoStyle.attendanceSection}>
          <View style={faleConoscoStyle.attendanceContent}>
            <Text style={faleConoscoStyle.attendanceTitle}>Atendimento</Text>

            <View style={faleConoscoStyle.attendanceBlock}>
              <Text style={faleConoscoStyle.attendanceLabel}>WhatsApp</Text>

              <Text style={faleConoscoStyle.attendanceValue}>
                (11) 99999-9999
              </Text>
            </View>

            <View style={faleConoscoStyle.attendanceBlock}>
              <Text style={faleConoscoStyle.attendanceLabel}>E-mail</Text>

              <Text style={faleConoscoStyle.attendanceValue}>
                contato@aacj.com.br
              </Text>
            </View>

            <View style={faleConoscoStyle.attendanceBlock}>
              <Text style={faleConoscoStyle.attendanceLabel}>
                Horário de atendimento
              </Text>

              <Text style={faleConoscoStyle.attendanceValue}>
                Seg à Sáb. das 9h às 18h
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
