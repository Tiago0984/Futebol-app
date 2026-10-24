import { API } from "@/config/api";
import esqueciSenhaStyle from "@/styles/esqueciSenhaStyle";
import { mensagensDeErro } from "@/utils/formatos";
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
  const perfilDoLink = perfil === "responsavel" ? "responsavel" : "atleta";
  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [mensagemModal, setMensagemModal] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // A resposta é a mesma exista ou não o e-mail (a API não revela quem está
  // cadastrado); o modal mostra a mensagem dela, que já diz a validade do link
  async function enviarLink() {
    if (enviando) return;
    if (!email.trim()) {
      setErro("Informe seu e-mail.");
      return;
    }
    setErro("");
    setEnviando(true);
    try {
      const resposta = await fetch(`${API}/auth/esqueci-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email: email.trim(), perfil: perfilDoLink }),
      });
      const json = await resposta.json();

      // 422 e-mail inválido | 429 muitos pedidos seguidos
      if (!resposta.ok || !json.success) {
        setErro(mensagensDeErro(json).geral);
        return;
      }
      setMensagemModal(json.message);
      setModalVisible(true);
    } catch (e) {
      console.log("Erro ao pedir o link de nova senha:", e);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setEnviando(false);
    }
  }

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

          {erro !== "" && (
            <Text style={esqueciSenhaStyle.mensagemText}>{erro}</Text>
          )}

          <Pressable
            style={[
              esqueciSenhaStyle.sendButton,
              enviando && esqueciSenhaStyle.sendButtonDisabled,
            ]}
            onPress={enviarLink}
            disabled={enviando}
          >
            <Text style={esqueciSenhaStyle.sendButtonText}>
              {enviando ? "Enviando..." : "Enviar link"}
            </Text>
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
            <Text style={esqueciSenhaStyle.modalText}>{mensagemModal}</Text>
            <Pressable
              style={esqueciSenhaStyle.modalButton}
              onPress={() => {
                setModalVisible(false);
                router.navigate(
                  perfilDoLink === "responsavel"
                    ? "/login-responsavel"
                    : "/login-atleta",
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
