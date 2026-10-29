import { API } from "@/config/api";
import loginAtletaStyle from "@/styles/loginAtletaStyle";
import { cores } from "@/styles/variaveis";
import { nomeDoDispositivo } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginAtleta() {
  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const timerMensagem = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancela o timer da mensagem se a tela for fechada
  useEffect(() => {
    return () => {
      if (timerMensagem.current) clearTimeout(timerMensagem.current);
    };
  }, []);

  function mostrarMensagem(texto: string) {
    // Cancela o timer anterior para não apagar a mensagem nova antes da hora
    if (timerMensagem.current) clearTimeout(timerMensagem.current);
    setMensagem(texto);
    timerMensagem.current = setTimeout(() => setMensagem(""), 5000);
  }

  async function fazerLogin() {
    if (!email.trim() || !senha) {
      mostrarMensagem("Informe e-mail e senha.");
      return;
    }
    setCarregando(true);
    try {
      const resposta = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          senha: senha,
          perfil: "atleta",
          device_name: await nomeDoDispositivo(),
        }),
      });
      const json = await resposta.json();

      // 401 senha errada | 403 inativo | 422 campos | 429 tentativas
      if (!resposta.ok || !json.success) {
        mostrarMensagem(json.message);
        return;
      }

      await AsyncStorage.removeItem("atleta_selecionado");
      await AsyncStorage.setItem("token", json.data.token);
      await AsyncStorage.setItem("perfil", "atleta");
      router.replace("/home");
    } catch (erro) {
      console.log("Erro ao realizar login:", erro);
      mostrarMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={loginAtletaStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={loginAtletaStyle.backgroundImage}
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
        style={loginAtletaStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={loginAtletaStyle.scrollContent}
        bounces={false}
      >
        <View style={loginAtletaStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={loginAtletaStyle.logo}
            resizeMode="contain"
          />
          <Text style={loginAtletaStyle.title}>Área do Atleta</Text>
          <Text style={loginAtletaStyle.subtitle}>
            Continue sua jornada no futebol
          </Text>
          
          <View style={loginAtletaStyle.badge}>
            <Image
              source={require("@/assets/images/img/atletaCinza.png")}
              style={loginAtletaStyle.badgeIcon}
              tintColor={cores.branco}
              resizeMode="contain"
            />
            <Text style={loginAtletaStyle.badgeText}>Área do Atleta</Text>
          </View>
        </View>

        <View style={loginAtletaStyle.body}>
          <View style={loginAtletaStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/perfilPreto.png")}
              style={loginAtletaStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={loginAtletaStyle.input}
              placeholder="E-mail"
              placeholderTextColor="#8D8D8D"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={loginAtletaStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/cadeadoPreto.png")}
              style={loginAtletaStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={loginAtletaStyle.input}
              placeholder="Senha"
              placeholderTextColor="#8D8D8D"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!verSenha}
            />
            <Pressable onPress={() => setVerSenha(!verSenha)}>
              <Image
                source={
                  verSenha
                    ? require("@/assets/images/img/olhofechado.png")
                    : require("@/assets/images/img/olhoaberto.png")
                }
                style={loginAtletaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/esqueci-senha",
                params: { perfil: "atleta" },
              })
            }
          >
            <Text style={loginAtletaStyle.forgotPasswordText}>
              Esqueci minha senha
            </Text>
          </Pressable>

          {mensagem !== "" && (
            <Text style={loginAtletaStyle.mensagemText}>{mensagem}</Text>
          )}

          <Pressable
            style={({ pressed }) => [
              loginAtletaStyle.enterButton,
              pressed && loginAtletaStyle.enterButtonPressed,
              carregando && loginAtletaStyle.enterButtonDisabled,
            ]}
            onPress={fazerLogin}
            disabled={carregando}
          >
            <Text style={loginAtletaStyle.enterButtonText}>
              {carregando ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Pressable
            style={loginAtletaStyle.inviteCard}
            onPress={() => router.navigate("/")}
          >
            <Text style={loginAtletaStyle.inviteChevron}>‹</Text>
            <Image
              source={require("@/assets/images/img/userModoClaro.png")}
              style={loginAtletaStyle.inviteIcon}
              resizeMode="contain"
            />
            <View style={loginAtletaStyle.inviteTextCol}>
              <Text style={loginAtletaStyle.inviteTitle}>
                Ainda não possui acesso?
              </Text>
              <Text style={loginAtletaStyle.inviteDescription}>
                Realize sua matrícula através do formulário disponível na tela
                inicial
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
