import TabBar from "@/components/tabBar";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import perfilStyle from "@/styles/perfilStyle";
import { cores } from "@/styles/variaveis";
import { router } from "expo-router";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Perfil() {
  const insets = useSafeAreaInsets();

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={perfilStyle.scrollView}
        contentContainerStyle={[
          perfilStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* HEADER */}
        <View style={perfilStyle.header}>
          <View style={perfilStyle.headerTitleCol}>
            <Text style={perfilStyle.screenTitle}>Perfil</Text>
            <Text style={perfilStyle.screenSubtitle}>Minha conta</Text>
          </View>

          <View style={perfilStyle.headerIconsRow}>
            <View style={perfilStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/shoppingbranco.png")}
                style={perfilStyle.headerIcon}
                resizeMode="contain"
              />
            </View>

            <View style={perfilStyle.headerIconButton}>
              <Image
                source={require("@/assets/images/img/sinoBranco.png")}
                style={perfilStyle.headerIcon}
                resizeMode="contain"
              />

              <View style={perfilStyle.notificationBadge}>
                <Text style={perfilStyle.notificationBadgeText}>2</Text>
              </View>
            </View>
          </View>
        </View>

        {/* PERFIL */}
        <View style={perfilStyle.profileRow}>
          <View style={perfilStyle.avatarCircle}>
            <Image
              source={require("@/assets/images/img/userPreto.png")}
              style={perfilStyle.avatarIcon}
              tintColor={cores.preto}
              resizeMode="contain"
            />
          </View>

          <View style={perfilStyle.profileInfoCol}>
            <Text style={perfilStyle.profileName}>João Silva</Text>

            <Text style={perfilStyle.profileDetail}>Categoria Sub-17</Text>

            <Text style={perfilStyle.profileDetail}>
              Matrícula 2026-0017
            </Text>

            <Pressable
              style={perfilStyle.editProfileButton}
              onPress={() => router.navigate("/editar-perfil")}
            >
              <Text style={perfilStyle.editProfileText}>
                Editar perfil →
              </Text>
            </Pressable>
          </View>
        </View>

        {/* DADOS PESSOAIS */}
        <View style={perfilStyle.section}>
          <Text style={perfilStyle.sectionTitle}>Dados Pessoais</Text>

          <View style={perfilStyle.infoCard}>
            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/telefone.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Telefone</Text>

              <Text style={perfilStyle.infoValue}>(11) 99999-9999</Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/emailModoEscuro.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>E-mail</Text>

              <Text style={perfilStyle.infoValue}>
                joãosilva123@gmail.com
              </Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/userPreto.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Responsável</Text>

              <Text style={perfilStyle.infoValue}>Maria Silva</Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/categoria.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Categoria</Text>

              <Text style={perfilStyle.infoValue}>Sub-17</Text>
            </View>

            <View style={[perfilStyle.infoRow, perfilStyle.infoRowLast]}>
              <Image
                source={require("@/assets/images/img/matricula.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Matrícula</Text>

              <Text style={perfilStyle.infoValue}>2026-0017</Text>
            </View>
          </View>
        </View>

        {/* CONFIGURAÇÕES */}
        <View style={perfilStyle.sectionCompact}>
          <Text style={perfilStyle.sectionTitle}>Configurações</Text>

          <View style={perfilStyle.infoCard}>
            <Pressable
              style={perfilStyle.infoRow}
              onPress={() => router.navigate("/configuracoes")}
            >
              <Image
                source={require("@/assets/images/img/configuracoes.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Configurações</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </Pressable>

            <Pressable
              style={perfilStyle.infoRow}
              onPress={() => router.navigate("/alterar-senha")}
            >
              <Image
                source={require("@/assets/images/img/cadeadoPretoFundoTransparente.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Alterar senha</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </Pressable>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/ajudaEsuporte.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Ajuda e suporte</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/atencaoPreto.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Sobre a AACJ</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </View>

            <View style={[perfilStyle.infoRow, perfilStyle.infoRowLast]}>
              <Image
                source={require("@/assets/images/img/sairDaContaVermelho.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />

              <Text style={perfilStyle.logoutLabel}>Sair da conta</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
