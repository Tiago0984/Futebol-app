import esqueciSenhaStyle from "@/styles/esqueciSenhaStyle";
import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Image,
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

export default function EsqueciSenha() {
  const { perfil } = useLocalSearchParams<{ perfil?: string }>();
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={esqueciSenhaStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={esqueciSenhaStyle.backgroundImage}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[
          "rgba(17, 17, 17, 0.00)",
          "rgba(17, 17, 17, 0.15)",
          "rgba(17, 17, 17, 0.70)",
          "rgba(17, 17, 17, 1.00)",
        ]}
        locations={[0, 0.25, 0.55, 0.78]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={esqueciSenhaStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={esqueciSenhaStyle.scrollContent}
        bounces={false}
      >
        <View style={esqueciSenhaStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={esqueciSenhaStyle.logo}
            resizeMode="contain"
          />
          <Text style={esqueciSenhaStyle.title}>Esqueceu sua senha?</Text>
          <Text style={esqueciSenhaStyle.subtitle}>
            Informe o e-mail utilizado no seu cadastro e{"\n"}enviaremos um link
            para redefinir sua senha
          </Text>
          <View style={esqueciSenhaStyle.badge}>
            <Image
              source={require("@/assets/images/img/cadeadoBranco.png")}
              style={esqueciSenhaStyle.badgeIcon}
              resizeMode="contain"
            />
            <Text style={esqueciSenhaStyle.badgeText}>
              Recuperação de acesso
            </Text>
          </View>
        </View>

        <View style={esqueciSenhaStyle.body}>
          <View style={esqueciSenhaStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/emailModoEscuro.png")}
              style={esqueciSenhaStyle.inputIcon}
              tintColor="#000000"
              resizeMode="contain"
            />
            <TextInput
              style={esqueciSenhaStyle.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#8D8D8D"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <Pressable
            style={esqueciSenhaStyle.sendButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={esqueciSenhaStyle.sendButtonText}>Enviar link</Text>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={esqueciSenhaStyle.backToLoginText}>
              ← Voltar ao Login
            </Text>
          </Pressable>

          <View style={esqueciSenhaStyle.noticeCard}>
            <Image
              source={require("@/assets/images/img/atencaoBranco.png")}
              style={esqueciSenhaStyle.noticeIcon}
              resizeMode="contain"
            />
            <Text style={esqueciSenhaStyle.noticeText}>
              Utilize o e-mail cadastrado junto à AACJ. Se você ainda não possui
              acesso ao aplicativo, realize sua matrícula pela tela inicial ou
              entre em contato com a instituição.
            </Text>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={esqueciSenhaStyle.modalOverlay}>
          <View style={esqueciSenhaStyle.modalCard}>
            <Text style={esqueciSenhaStyle.modalTitle}>Enviar link</Text>
            <Text style={esqueciSenhaStyle.modalText}>
              Caso este e-mail esteja cadastrado em nosso sistema, você
              receberá um link de redefinição por e-mail.
            </Text>
            <Text style={esqueciSenhaStyle.modalValidity}>
              Validade do link (10 minutos).
            </Text>
            <Pressable
              style={esqueciSenhaStyle.modalButton}
              onPress={() => {
                setModalVisible(false);
                router.navigate(
                  perfil === "responsavel" ? "/login-responsavel" : "/login-atleta"
                );
              }}
            >
              <Text style={esqueciSenhaStyle.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
