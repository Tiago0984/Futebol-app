import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import configuracoesStyle from "@/styles/configuracoesStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Configuracoes() {
  const insets = useSafeAreaInsets();

  function handleVoltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/perfil");
    }
  }

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={[
          configuracoesStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
      >
        {/* HEADER */}
        <View style={configuracoesStyle.header}>
          <View style={configuracoesStyle.headerTopRow}>
            <Pressable
              style={configuracoesStyle.backButton}
              onPress={handleVoltar}
            >
              <Text style={configuracoesStyle.backChevron}>‹</Text>
              <Text style={configuracoesStyle.backText}>Voltar</Text>
            </Pressable>

            <Text style={configuracoesStyle.headerTitle} pointerEvents="none">
              Configurações
            </Text>

            <View style={configuracoesStyle.headerIconsRow}>
              <View style={configuracoesStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={configuracoesStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>

              <BotaoNotificacoes abaAtiva="perfil" />
            </View>
          </View>
        </View>

        {/* CONTA */}
        <View style={configuracoesStyle.section}>
          <Text style={configuracoesStyle.sectionTitle}>Conta</Text>

          <View style={configuracoesStyle.card}>
            <View style={configuracoesStyle.row}>
              <Image
                source={require("@/assets/images/img/sinoPreto.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Notificações</Text>

              <Text style={configuracoesStyle.rowValue}>Ativado</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </View>

            <View style={[configuracoesStyle.row, configuracoesStyle.rowLast]}>
              <Image
                source={require("@/assets/images/img/cadeadoPretoFundoTransparente.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Privacidade</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </View>
          </View>
        </View>

        {/* APLICATIVO */}
        <View style={configuracoesStyle.sectionCompact}>
          <Text style={configuracoesStyle.sectionTitle}>Aplicativo</Text>

          <View style={configuracoesStyle.card}>
            <View style={configuracoesStyle.row}>
              <Image
                source={require("@/assets/images/img/controleDeslizante.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Notificações</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </View>

            <View style={[configuracoesStyle.row, configuracoesStyle.rowLast]}>
              <Image
                source={require("@/assets/images/img/refresh.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Atualizações</Text>

              <Text style={configuracoesStyle.rowValue}>1.0.0</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </View>
          </View>
        </View>

        {/* SUPORTE */}
        <View style={configuracoesStyle.sectionCompact}>
          <Text style={configuracoesStyle.sectionTitle}>Suporte</Text>

          <View style={configuracoesStyle.card}>
            <Pressable style={configuracoesStyle.row} onPress={() => router.navigate("/ajuda-suporte")}>
              <Image
                source={require("@/assets/images/img/ajudaEsuporte.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Ajuda & Suporte</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </Pressable>

            <Pressable style={configuracoesStyle.row} onPress={() => router.navigate("/fale-conosco")}>
              <Image
                source={require("@/assets/images/img/faleConosco.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Fale Conosco</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </Pressable>

            <Pressable style={[configuracoesStyle.row, configuracoesStyle.rowLast]} onPress={() => router.navigate("/sobre-a-aacj")}>
              <Image
                source={require("@/assets/images/img/atencaoPreto.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>Sobre a AACJ</Text>

              <Text style={configuracoesStyle.rowArrow}>{">"}</Text>
            </Pressable>
          </View>
        </View>

        {/* SAIR DA CONTA */}
        <View style={configuracoesStyle.logoutSection}>
          <Pressable style={configuracoesStyle.logoutButton} onPress={() => router.navigate("/")}>
            <Image
              source={require("@/assets/images/img/sairDaContaVermelho.png")}
              style={configuracoesStyle.logoutIcon}
              resizeMode="contain"
            />

            <Text style={configuracoesStyle.logoutText}>Sair da conta</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
