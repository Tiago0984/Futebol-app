import { API } from "@/config/api";
import loginResponsavelStyle from "@/styles/loginResponsavelStyle";
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

export default function LoginResponsavel() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);
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
          perfil: "responsavel",
          device_name: await nomeDoDispositivo(),
        }),
      });
      const json = await resposta.json();

      // 401 senha errada | 403 sem filho ativo | 422 campos | 429 tentativas
      if (!resposta.ok || !json.success) {
        mostrarMensagem(json.message);
        return;
      }

      const atletas: { id_atleta: number }[] = json.data.atletas ?? [];
      await AsyncStorage.setItem("token", json.data.token);
      await AsyncStorage.setItem("perfil", "responsavel");
      // Para a saudação da Home ("Bom dia, Carla")
      await AsyncStorage.setItem(
        "nome_responsavel",
        json.data.responsavel?.nome_responsavel ?? "",
      );

      // Com um filho só, entra direto nele; com mais, escolhe na próxima tela
      if (atletas.length === 1) {
        await AsyncStorage.setItem(
          "atleta_selecionado",
          String(atletas[0].id_atleta),
        );
        router.replace("/home");
      } else {
        await AsyncStorage.removeItem("atleta_selecionado");
        router.replace("/escolha-atleta");
      }
    } catch (erro) {
      console.log("Erro ao realizar login:", erro);
      mostrarMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={loginResponsavelStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={loginResponsavelStyle.backgroundImage}
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
        style={loginResponsavelStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={loginResponsavelStyle.scrollContent}
        bounces={false}
      >
        <View style={loginResponsavelStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={loginResponsavelStyle.logo}
            resizeMode="contain"
          />
          <Text style={loginResponsavelStyle.title}>Área do Responsável</Text>
          <Text style={loginResponsavelStyle.subtitle}>
            Acompanhe toda a evolução do seu atleta
          </Text>
          <View style={loginResponsavelStyle.badge}>
            <Image
              source={require("@/assets/images/img/groupModoClaro.png")}
              style={loginResponsavelStyle.badgeIcon}
              tintColor={cores.branco}
              resizeMode="contain"
            />
            <Text style={loginResponsavelStyle.badgeText}>
              Área do Responsável
            </Text>
          </View>
        </View>

        <View style={loginResponsavelStyle.body}>
          <View style={loginResponsavelStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/perfilPreto.png")}
              style={loginResponsavelStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={loginResponsavelStyle.input}
              placeholder="E-mail"
              placeholderTextColor="#8D8D8D"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={loginResponsavelStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/cadeadoPreto.png")}
              style={loginResponsavelStyle.inputIcon}
              resizeMode="contain"
            />
            <TextInput
              style={loginResponsavelStyle.input}
              placeholder="Senha"
              placeholderTextColor="#8D8D8D"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={!senhaVisivel}
            />
            <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Image
                source={
                  senhaVisivel
                    ? require("@/assets/images/img/olhofechado.png")
                    : require("@/assets/images/img/olhoaberto.png")
                }
                style={loginResponsavelStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <Pressable
            onPress={() =>
              router.navigate({
                pathname: "/esqueci-senha",
                params: { perfil: "responsavel" },
              })
            }
          >
            <Text style={loginResponsavelStyle.forgotPasswordText}>
              Esqueci minha senha
            </Text>
          </Pressable>

          {mensagem !== "" && (
            <Text style={loginResponsavelStyle.mensagemText}>{mensagem}</Text>
          )}

          <Pressable
            style={({ pressed }) => [
              loginResponsavelStyle.enterButton,
              pressed && loginResponsavelStyle.enterButtonPressed,
              carregando && loginResponsavelStyle.enterButtonDisabled,
            ]}
            onPress={fazerLogin}
            disabled={carregando}
          >
            <Text style={loginResponsavelStyle.enterButtonText}>
              {carregando ? "Entrando..." : "Entrar"}
            </Text>
          </Pressable>

          <Pressable
            style={loginResponsavelStyle.inviteCard}
            onPress={() => router.navigate("/")}
          >
            <Text style={loginResponsavelStyle.inviteChevron}>‹</Text>
            <Image
              source={require("@/assets/images/img/userModoClaro.png")}
              style={loginResponsavelStyle.inviteIcon}
              resizeMode="contain"
            />
            <View style={loginResponsavelStyle.inviteTextCol}>
              <Text style={loginResponsavelStyle.inviteTitle}>
                Ainda não possui acesso?
              </Text>
              <Text style={loginResponsavelStyle.inviteDescription}>
                Realize a matrícula do atleta através do formulário disponível
                na tela inicial
              </Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
