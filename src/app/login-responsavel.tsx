import loginResponsavelStyle from "@/styles/loginResponsavelStyle";
import { variaveis } from "@/styles/variaveis";
import { LinearGradient } from "expo-linear-gradient";
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

export default function LoginResponsavel() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

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
              tintColor={variaveis.branco}
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

          <Pressable
            style={loginResponsavelStyle.enterButton}
            onPress={() => router.navigate("/home")}
          >
            <Text style={loginResponsavelStyle.enterButtonText}>Entrar</Text>
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
