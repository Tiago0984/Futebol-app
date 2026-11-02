import { API } from "@/config/api";
import { buscarComPrazo } from "@/utils/buscarComPrazo";
import { mensagensDeErro } from "@/utils/formatos";
import redefinirSenhaStyle from "@/styles/redefinirSenhastyle";
import { router, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RedefinirSenha() {
  // Android: a barra de navegação fica por cima da tela; o fim da rolagem passa dela
  const insets = useSafeAreaInsets();
  const { email, perfil } = useLocalSearchParams<{ email?: string; perfil?: string }>();
  const perfilDaConta = perfil === "responsavel" ? "responsavel" : "atleta";
  const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);
  const [codigo, setCodigo] = useState(["", "", "", ""]);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const camposCodigo = useRef<(TextInput | null)[]>([]);

  function alterarDigito(texto: string, indice: number) {
    const digito = texto.replace(/\D/g, "").slice(0, 1);
    setCodigo((atual) => atual.map((valor, posicao) => posicao === indice ? digito : valor));
    if (digito && indice < 3) camposCodigo.current[indice + 1]?.focus();
  }

  function voltarDigito(tecla: string, indice: number) {
    if (tecla === "Backspace" && !codigo[indice] && indice > 0) {
      camposCodigo.current[indice - 1]?.focus();
    }
  }

  async function salvarNovaSenha() {
    if (carregando) return;
    setMensagem("");
    if (!email?.trim()) {
      setMensagem("E-mail não informado. Solicite um novo código.");
      return;
    }
    if (!/^\d{4}$/.test(codigo.join(""))) {
      setMensagem("Informe os 4 dígitos do código.");
      return;
    }
    if (!novaSenha || !confirmarSenha) {
      setMensagem("Preencha os campos de senha.");
      return;
    }
    if (novaSenha.length < 8) {
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não correspondem.");
      return;
    }

    setCarregando(true);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    try {
      const respostaCodigo = await buscarComPrazo(`${API}/auth/validar-codigo`, {
        method: "POST",
        headers,
        // O backend precisa do perfil para localizar a conta deste e-mail.
        body: JSON.stringify({ email: email.trim(), perfil: perfilDaConta, codigo: codigo.join("") }),
      });
      const jsonCodigo = await respostaCodigo.json();
      if (!respostaCodigo.ok || !jsonCodigo.success) {
        const erros = mensagensDeErro(jsonCodigo);
        setMensagem(erros.campos.codigo ?? jsonCodigo.message ?? "Não foi possível validar o código.");
        return;
      }
      const resetToken = jsonCodigo.data?.reset_token;
      if (typeof resetToken !== "string" || !resetToken) {
        setMensagem("Token de redefinição não recebido.");
        return;
      }
      // O token serve somente para esta tentativa e não vai para o AsyncStorage.
      const resposta = await buscarComPrazo(`${API}/auth/redefinir-senha`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          reset_token: resetToken,
          nova_senha: novaSenha,
          nova_senha_confirmation: confirmarSenha,
        }),
      });
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        const erros = mensagensDeErro(json);
        setMensagem(erros.campos.nova_senha ?? erros.campos.nova_senha_confirmation ?? json.message ?? "Não foi possível salvar a senha.");
        return;
      }
      // O app tem logins por perfil; a rota inicial apenas retoma a sessão.
      router.replace(perfilDaConta === "responsavel" ? "/login-responsavel" : "/login-atleta");
    } catch {
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={redefinirSenhaStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={redefinirSenhaStyle.backgroundImage}
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
        style={redefinirSenhaStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[redefinirSenhaStyle.scrollContent, { paddingBottom: insets.bottom }]}
        bounces={false}
      >
        <View style={redefinirSenhaStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={redefinirSenhaStyle.logo}
            resizeMode="contain"
          />
          <Text style={redefinirSenhaStyle.title}>Redefinir senha</Text>
          <Text style={redefinirSenhaStyle.subtitle}>
            Escolha uma nova senha para continuar utilizando o aplicativo
          </Text>
          <View style={redefinirSenhaStyle.badge}>
            <Image
              source={require("@/assets/images/img/ferramenta.png")}
              style={redefinirSenhaStyle.badgeIcon}
              resizeMode="contain"
            />
            <Text style={redefinirSenhaStyle.badgeText}>Nova senha</Text>
          </View>
        </View>

        <View style={redefinirSenhaStyle.body}>
          <Text style={redefinirSenhaStyle.subtitulo}>Código de verificação</Text>
          <View style={redefinirSenhaStyle.linhaCodigo}>
            {codigo.map((digito, indice) => (
              <TextInput
                key={indice}
                ref={(campo) => { camposCodigo.current[indice] = campo; }}
                style={redefinirSenhaStyle.campoCodigo}
                value={digito}
                editable={!carregando}
                onChangeText={(texto) => alterarDigito(texto, indice)}
                onKeyPress={({ nativeEvent }) => voltarDigito(nativeEvent.key, indice)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
                accessibilityLabel={`Dígito ${indice + 1} do código`}
              />
            ))}
          </View>
          <View style={redefinirSenhaStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/cadeadoPreto.png")}
              style={redefinirSenhaStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={redefinirSenhaStyle.input}
              placeholder="Nova senha"
              placeholderTextColor="#8D8D8D"
              editable={!carregando}
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!verSenha}
            />
            <Pressable onPress={() => setVerSenha(!verSenha)}>
              <Image
                source={
                  verSenha
                    ? require("@/assets/images/img/olhofechado.png")
                    : require("@/assets/images/img/olhoaberto.png")
                }
                style={redefinirSenhaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={redefinirSenhaStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/cadeadoPreto.png")}
              style={redefinirSenhaStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={redefinirSenhaStyle.input}
              placeholder="Confirmar nova senha"
              placeholderTextColor="#8D8D8D"
              editable={!carregando}
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!verConfirmarSenha}
            />
            <Pressable
              onPress={() => setVerConfirmarSenha(!verConfirmarSenha)}
            >
              <Image
                source={
                  verConfirmarSenha
                    ? require("@/assets/images/img/olhofechado.png")
                    : require("@/assets/images/img/olhoaberto.png")
                }
                style={redefinirSenhaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={redefinirSenhaStyle.requirementsCard}>
            <Text style={redefinirSenhaStyle.requirementsTitle}>
              Requisitos da senha
            </Text>
            <View style={redefinirSenhaStyle.requirementRow}>
              <Image
                source={require("@/assets/images/img/circulo.png")}
                style={redefinirSenhaStyle.requirementIcon}
                resizeMode="contain"
              />
              <Text style={redefinirSenhaStyle.requirementText}>
                Mínimo de 8 caracteres
              </Text>
            </View>
          </View>

          {mensagem !== "" && (
            <Text style={redefinirSenhaStyle.erroSenha}>{mensagem}</Text>
          )}
          <Pressable
            style={[
              redefinirSenhaStyle.saveButton,
              carregando && redefinirSenhaStyle.saveButtonDisabled,
            ]}
            onPress={salvarNovaSenha}
            disabled={carregando}
          >
            <Text style={redefinirSenhaStyle.saveButtonText}>
              {carregando ? "Salvando..." : "Salvar senha"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.navigate(
                perfil === "responsavel"
                  ? "/login-responsavel"
                  : "/login-atleta",
              )
            }
          >
            <Text style={redefinirSenhaStyle.backToLoginText}>
              ← Voltar ao Login
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
