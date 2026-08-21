import loginAtletaStyle from "@/styles/loginAtletaStyle";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    ImageBackground,
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
      <ScrollView
        contentContainerStyle={loginAtletaStyle.scrollContent}
        bounces={false}
      >
        <ImageBackground
          source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
          style={loginAtletaStyle.hero}
          resizeMode="cover"
        >
          <View style={loginAtletaStyle.heroOverlay} />
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
                resizeMode="contain"
              />
              <Text style={loginAtletaStyle.badgeText}>Área do Atleta</Text>
            </View>
          </View>
        </ImageBackground>

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
