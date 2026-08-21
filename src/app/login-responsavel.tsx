import loginResponsavelStyle from "@/styles/loginResponsavelStyle";
import { Link } from "expo-router";
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

export default function LoginResponsavel() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaVisivel, setSenhaVisivel] = useState(false);

  return (
    <View style={loginResponsavelStyle.container}>
      <ScrollView
        contentContainerStyle={loginResponsavelStyle.scrollContent}
        bounces={false}
      >
        <ImageBackground
          source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
          style={loginResponsavelStyle.hero}
          resizeMode="cover"
        >
          <View style={loginResponsavelStyle.heroOverlay} />
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
                resizeMode="contain"
              />
              <Text style={loginResponsavelStyle.badgeText}>
                Área do Responsável
              </Text>
            </View>
          </View>
        </ImageBackground>

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

          <Link href="/esqueci-senha" asChild>
            <Pressable>
              <Text style={loginResponsavelStyle.forgotPasswordText}>
                Esqueci minha senha
              </Text>
            </Pressable>
          </Link>

          <Pressable style={loginResponsavelStyle.enterButton}>
            <Text style={loginResponsavelStyle.enterButtonText}>Entrar</Text>
          </Pressable>

          <Link href="/" asChild>
            <Pressable style={loginResponsavelStyle.inviteCard}>
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
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}
