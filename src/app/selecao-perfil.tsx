import selecaoPerfilStyle from "@/styles/selecaoPerfilStyle";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={selecaoPerfilStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={selecaoPerfilStyle.backgroundImage}
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
        style={selecaoPerfilStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={selecaoPerfilStyle.scrollContent}
        bounces={false}
      >
        <View style={selecaoPerfilStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={selecaoPerfilStyle.logo}
            resizeMode="contain"
          />
          <Text style={selecaoPerfilStyle.kicker}>CENTRO DE FORMAÇÃO</Text>
          <Text style={selecaoPerfilStyle.kickerBold}>DE ATLETAS</Text>
          <View style={selecaoPerfilStyle.dividerRow}>
            <View style={selecaoPerfilStyle.dividerLine} />
            <Text style={selecaoPerfilStyle.dividerText}>desde 2001</Text>
            <View style={selecaoPerfilStyle.dividerLine} />
          </View>
          <Text style={selecaoPerfilStyle.welcomeTitle}>Bem-Vindo(a) à AACJ</Text>
          <Text style={selecaoPerfilStyle.welcomeSubtitle}>
            Associação Atlética Cohab Juscelino
          </Text>
        </View>

        <View style={selecaoPerfilStyle.body}>
          <Text style={selecaoPerfilStyle.chooseProfile}>
            Escolha seu perfil para continuar
          </Text>

          <View style={selecaoPerfilStyle.card}>
            <View style={selecaoPerfilStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/atletaVermelho.png")}
                style={selecaoPerfilStyle.cardIcon}
                tintColor="#D71920"
                resizeMode="contain"
              />
              <View style={selecaoPerfilStyle.cardTextCol}>
                <Text style={selecaoPerfilStyle.cardTitle}>Atleta</Text>
                <Text style={selecaoPerfilStyle.cardDescription}>
                  Consulte seus treinos,{"\n"}campeonatos, frequência e desempenho.
                </Text>
              </View>
            </View>
            <Pressable
              style={selecaoPerfilStyle.cardButton}
              onPress={() => router.navigate("/login-atleta")}
            >
              <Text style={selecaoPerfilStyle.cardButtonText}>Entrar como Atleta</Text>
              <Text style={selecaoPerfilStyle.cardButtonArrow}>›</Text>
            </Pressable>
          </View>

          <View style={selecaoPerfilStyle.card}>
            <View style={selecaoPerfilStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/responsavelVermelho.png")}
                style={selecaoPerfilStyle.cardIcon}
                tintColor="#D71920"
                resizeMode="contain"
              />
              <View style={selecaoPerfilStyle.cardTextCol}>
                <Text style={selecaoPerfilStyle.cardTitle}>Responsável</Text>
                <Text style={selecaoPerfilStyle.cardDescription}>
                  Acompanhe frequência, evolução e comunicados do atleta.
                </Text>
              </View>
            </View>
            <Pressable
              style={selecaoPerfilStyle.cardButton}
              onPress={() => router.navigate("/login-responsavel")}
            >
              <Text style={selecaoPerfilStyle.cardButtonText}>
                Entrar como Responsável
              </Text>
              <Text style={selecaoPerfilStyle.cardButtonArrow}>›</Text>
            </Pressable>
          </View>

          <View style={selecaoPerfilStyle.firstAccessRow}>
            <View style={selecaoPerfilStyle.firstAccessLine} />
            <Text style={selecaoPerfilStyle.firstAccessText}>Primeiro acesso?</Text>
            <View style={selecaoPerfilStyle.firstAccessLine} />
          </View>

          <View style={selecaoPerfilStyle.footerLinksRow}>
            <Text style={selecaoPerfilStyle.footerLink}>Fazer matricula</Text>
            <Text style={selecaoPerfilStyle.footerDot}>•</Text>
            <Text style={selecaoPerfilStyle.footerLink}>Conheça a AACJ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
