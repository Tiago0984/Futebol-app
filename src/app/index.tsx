import indexStyle from "@/styles/indexStyle";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

export default function Index() {
  return (
    <View style={indexStyle.container}>
      <Image
        source={require("@/assets/images/img/background-campo-vazio-AACJ.png")}
        style={indexStyle.backgroundImage}
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
        style={indexStyle.gradient}
      />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={indexStyle.scrollContent}
        bounces={false}
      >
        <View style={indexStyle.heroContent}>
          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={indexStyle.logo}
            resizeMode="contain"
          />
          <Text style={indexStyle.kicker}>CENTRO DE FORMAÇÃO</Text>
          <Text style={indexStyle.kickerBold}>DE ATLETAS</Text>
          <View style={indexStyle.dividerRow}>
            <View style={indexStyle.dividerLine} />
            <Text style={indexStyle.dividerText}>desde 2001</Text>
            <View style={indexStyle.dividerLine} />
          </View>
          <Text style={indexStyle.welcomeTitle}>Bem-Vindo(a) à AACJ</Text>
          <Text style={indexStyle.welcomeSubtitle}>
            Associação Atlética Cohab Juscelino
          </Text>
        </View>

        <View style={indexStyle.body}>
          <Text style={indexStyle.chooseProfile}>
            Escolha seu perfil para continuar
          </Text>

          <View style={indexStyle.card}>
            <View style={indexStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/atletaVermelho.png")}
                style={indexStyle.cardIcon}
                tintColor="#D71920"
                resizeMode="contain"
              />
              <View style={indexStyle.cardTextCol}>
                <Text style={indexStyle.cardTitle}>Atleta</Text>
                <Text style={indexStyle.cardDescription}>
                  Consulte seus treinos,{"\n"}campeonatos, frequência e desempenho.
                </Text>
              </View>
            </View>
            <Pressable
              style={indexStyle.cardButton}
              onPress={() => router.navigate("/login-atleta")}
            >
              <Text style={indexStyle.cardButtonText}>Entrar como Atleta</Text>
              <Text style={indexStyle.cardButtonArrow}>›</Text>
            </Pressable>
          </View>

          <View style={indexStyle.card}>
            <View style={indexStyle.cardTopRow}>
              <Image
                source={require("@/assets/images/img/responsavelVermelho.png")}
                style={indexStyle.cardIcon}
                tintColor="#D71920"
                resizeMode="contain"
              />
              <View style={indexStyle.cardTextCol}>
                <Text style={indexStyle.cardTitle}>Responsável</Text>
                <Text style={indexStyle.cardDescription}>
                  Acompanhe frequência, evolução e comunicados do atleta.
                </Text>
              </View>
            </View>
            <Pressable
              style={indexStyle.cardButton}
              onPress={() => router.navigate("/login-responsavel")}
            >
              <Text style={indexStyle.cardButtonText}>
                Entrar como Responsável
              </Text>
              <Text style={indexStyle.cardButtonArrow}>›</Text>
            </Pressable>
          </View>

          <View style={indexStyle.firstAccessRow}>
            <View style={indexStyle.firstAccessLine} />
            <Text style={indexStyle.firstAccessText}>Primeiro acesso?</Text>
            <View style={indexStyle.firstAccessLine} />
          </View>

          <View style={indexStyle.footerLinksRow}>
            <Text style={indexStyle.footerLink}>Fazer matricula</Text>
            <Text style={indexStyle.footerDot}>•</Text>
            <Text style={indexStyle.footerLink}>Conheça a AACJ</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
