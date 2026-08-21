import loginStyle from "@/styles/loginStyle";
import { Link } from "expo-router";
import {
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function Index() {
  return (
    <View style={loginStyle.container}>
      <ScrollView
        contentContainerStyle={loginStyle.scrollContent}
        bounces={false}
      >
        <ImageBackground
          source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
          style={loginStyle.hero}
          resizeMode="cover"
        >
          <View style={loginStyle.heroOverlay} />
          <View style={loginStyle.heroContent}>
            <Image
              source={require("@/assets/images/img/logo/logo-aacj.png")}
              style={loginStyle.logo}
              resizeMode="contain"
            />
            <Text style={loginStyle.kicker}>CENTRO DE FORMAÇÃO</Text>
            <Text style={loginStyle.kickerBold}>DE ATLETAS</Text>
            <View style={loginStyle.dividerRow}>
              <View style={loginStyle.dividerLine} />
              <Text style={loginStyle.dividerText}>desde 2001</Text>
              <View style={loginStyle.dividerLine} />
            </View>
            <Text style={loginStyle.welcomeTitle}>Bem-Vindo(a) à AACJ</Text>
            <Text style={loginStyle.welcomeSubtitle}>
              Associação Atlética Cohab Juscelino
            </Text>
          </View>
        </ImageBackground>

        <View style={loginStyle.body}>
          <Text style={loginStyle.chooseProfile}>
            Escolha seu perfil para continuar
          </Text>

          <View style={loginStyle.card}>
            <View style={loginStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/atletaVermelho.png")}
                style={loginStyle.cardIcon}
                tintColor="#D71920"
                resizeMode="contain"
              />
              <View style={loginStyle.cardTextCol}>
                <Text style={loginStyle.cardTitle}>Atleta</Text>
                <Text style={loginStyle.cardDescription}>
                  Consulte seus treinos, campeonatos, frequência e desempenho.
                </Text>
              </View>
            </View>
            <Link href="/login-atleta" asChild>
              <Pressable style={loginStyle.cardButton}>
                <Text style={loginStyle.cardButtonText}>
                  Entrar como Atleta
                </Text>
                <Text style={loginStyle.cardButtonArrow}>›</Text>
              </Pressable>
            </Link>
          </View>

          <View style={loginStyle.card}>
            <View style={loginStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/responsavelVermelho.png")}
                style={loginStyle.cardIcon}
                resizeMode="contain"
              />
              <View style={loginStyle.cardTextCol}>
                <Text style={loginStyle.cardTitle}>Responsável</Text>
                <Text style={loginStyle.cardDescription}>
                  Acompanhe frequência, evolução e comunicados do atleta.
                </Text>
              </View>
            </View>
            <Link href="/login-responsavel" asChild>
              <Pressable style={loginStyle.cardButton}>
                <Text style={loginStyle.cardButtonText}>
                  Entrar como Responsável
                </Text>
                <Text style={loginStyle.cardButtonArrow}>›</Text>
              </Pressable>
            </Link>
          </View>

          <View style={loginStyle.firstAccessRow}>
            <View style={loginStyle.firstAccessLine} />
            <Text style={loginStyle.firstAccessText}>Primeiro acesso?</Text>
            <View style={loginStyle.firstAccessLine} />
          </View>

          <View style={loginStyle.footerLinksRow}>
            <Text style={loginStyle.footerLink}>Fazer matricula</Text>
            <Text style={loginStyle.footerDot}>•</Text>
            <Text style={loginStyle.footerLink}>Conheça a AACJ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
