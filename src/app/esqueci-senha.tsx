import { API } from "@/config/api";
import { buscarComPrazo } from "@/utils/buscarComPrazo";
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
  const perfilDaConta = perfil === "responsavel" ? "responsavel" : "atleta";
  const [modalEnviarLink, setModalEnviarLink] = useState(false);
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  async function solicitarCodigo() {
    if (carregando) return;
    if (!email.trim()) {
      setMensagem("Informe seu e-mail.");
      return;
    }
    setMensagem("");
    setCarregando(true);
    try {
      const resposta = await buscarComPrazo(`${API}/auth/esqueci-senha`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        // O perfil identifica a conta certa quando o e-mail existe nos dois cadastros.
        body: JSON.stringify({ email: email.trim(), perfil: perfilDaConta }),
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        const erros = mensagensDeErro(json);
        setMensagem(erros.campos.email ?? json.message ?? "Não foi possível solicitar o código.");
        return;
      }
      setModalEnviarLink(true);
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  function fecharModal() {
    setModalEnviarLink(false);
    // O código é digitado na próxima tela; e-mail e perfil identificam a solicitação.
    router.push({
      pathname: "/redefinir-senha",
      params: { email: email.trim(), perfil: perfilDaConta },
    });
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
            Informe o e-mail utilizado no seu cadastro e{"\n"}enviaremos um código de 4 dígitos
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
              editable={!carregando}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {mensagem !== "" && (
            <Text style={esqueciSenhaStyle.erroSolicitacao}>{mensagem}</Text>
          )}

          <Pressable
            style={[
              esqueciSenhaStyle.sendButton,
              carregando && esqueciSenhaStyle.sendButtonDisabled,
            ]}
            onPress={solicitarCodigo}
            disabled={carregando}
          >
            <Text style={esqueciSenhaStyle.sendButtonText}>
              {carregando ? "Enviando..." : "Enviar código"}
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
        visible={modalEnviarLink}
        transparent
        animationType="fade"
        onRequestClose={fecharModal}
      >
        <View style={esqueciSenhaStyle.modalOverlay}>
          <View style={esqueciSenhaStyle.modalCard}>
            <Text style={esqueciSenhaStyle.modalTitle}>Código solicitado</Text>
            {/* O retorno agora orienta a digitar o código, sem mencionar link. */}
            <Text style={esqueciSenhaStyle.modalText}>
              Se o e-mail estiver cadastrado, você receberá um código de 4 dígitos.
              Confira sua caixa de entrada e a pasta de spam para continuar.
            </Text>
            <Pressable
              style={esqueciSenhaStyle.modalButton}
              onPress={fecharModal}
            >
              <Text style={esqueciSenhaStyle.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
