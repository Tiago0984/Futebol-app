import loginAtletaStyle from "@/styles/loginAtletaStyle";
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

export default function LoginAtleta() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

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
              tintColor={variaveis.branco}
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
              secureTextEntry={!senhaVisivel}
            />
            <Pressable onPress={() => setSenhaVisivel(!senhaVisivel)}>
              <Image
                source={
                  senhaVisivel
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

          <Pressable
            style={loginAtletaStyle.enterButton}
            onPress={() => router.navigate("/home")}
          >
            <Text style={loginAtletaStyle.enterButtonText}>Entrar</Text>
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
