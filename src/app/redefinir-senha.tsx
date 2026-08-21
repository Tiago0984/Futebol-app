import redefinirSenhaStyle from "@/styles/redefinirSenhastyle";
import { router, useLocalSearchParams } from "expo-router";
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

export default function RedefinirSenha() {
  const { perfil } = useLocalSearchParams<{ perfil?: string }>();
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

  return (
    <View style={redefinirSenhaStyle.container}>
      <ScrollView
        contentContainerStyle={redefinirSenhaStyle.scrollContent}
        bounces={false}
      >
        <ImageBackground
          source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
          style={redefinirSenhaStyle.hero}
          resizeMode="cover"
        >
          <View style={redefinirSenhaStyle.heroOverlay} />
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
        </ImageBackground>

        <View style={redefinirSenhaStyle.body}>
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
              value={novaSenha}
              onChangeText={setNovaSenha}
              secureTextEntry={!novaSenhaVisivel}
            />
            <Pressable onPress={() => setNovaSenhaVisivel(!novaSenhaVisivel)}>
              <Image
                source={
                  novaSenhaVisivel
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
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={!confirmarSenhaVisivel}
            />
            <Pressable
              onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
            >
              <Image
                source={
                  confirmarSenhaVisivel
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
              Ainda não possui acesso?
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
            <View style={redefinirSenhaStyle.requirementRow}>
              <Image
                source={require("@/assets/images/img/circulo.png")}
                style={redefinirSenhaStyle.requirementIcon}
                resizeMode="contain"
              />
              <Text style={redefinirSenhaStyle.requirementText}>
                Pelo menos uma letra
              </Text>
            </View>
            <View style={redefinirSenhaStyle.requirementRow}>
              <Image
                source={require("@/assets/images/img/circulo.png")}
                style={redefinirSenhaStyle.requirementIcon}
                resizeMode="contain"
              />
              <Text style={redefinirSenhaStyle.requirementText}>
                Pelo menos um número
              </Text>
            </View>
          </View>

          <Pressable style={redefinirSenhaStyle.saveButton}>
            <Text style={redefinirSenhaStyle.saveButtonText}>
              Salvar nova senha
            </Text>
          </Pressable>

          <Pressable
            onPress={() =>
              router.navigate(
                perfil === "responsavel" ? "/login-responsavel" : "/login-atleta"
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
