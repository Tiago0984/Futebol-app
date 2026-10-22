import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import perfilStyle from "@/styles/perfilStyle";
import { cores } from "@/styles/variaveis";
import {
  exibirTelefone,
  formatarCpf,
  formatarDataNascimento,
} from "@/utils/formatos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Só os campos de GET /api/v1/atleta usados no Perfil
type Atleta = {
  nome_atleta: string;
  cpf_atleta: string | null;
  data_nasc_atleta: string | null;
  email_atleta: string | null;
  telefone_atleta: string | null;
  numero_matricula_atleta: string | null;
  categorias: {
    nome_categoria: string;
    pivot: {
      status_categoria_atleta: string;
      data_fim_categoria_atleta: string | null;
    };
  }[];
};

export default function Perfil() {
  const insets = useSafeAreaInsets();
  const [atleta, setAtleta] = useState<Atleta | null>(null);

  // Recarrega ao voltar da tela de edição, para mostrar o que acabou de ser salvo
  useFocusEffect(
    useCallback(() => {
      async function carregarAtleta() {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/selecao-perfil");
          return;
        }
        try {
          const resposta = await fetch(`${API}/atleta`, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          // Token vencido, encerrado ou atleta inativado: volta para o login
          if (resposta.status === 401 || resposta.status === 403) {
            await AsyncStorage.multiRemove(["token", "perfil"]);
            router.replace("/selecao-perfil");
            return;
          }

          const json = await resposta.json();
          if (json.success) setAtleta(json.data);
        } catch (erro) {
          console.log("Erro ao buscar dados do perfil:", erro);
        }
      }
      carregarAtleta();
    }, []),
  );

  const categoriaAtual = atleta?.categorias.find(
    (c) =>
      c.pivot.status_categoria_atleta === "ATIVO" &&
      !c.pivot.data_fim_categoria_atleta,
  );

  function handleSair() {
    // Limpa o histórico para o usuário não voltar ao app logado
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace("/");
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
          <Pressable
            style={perfilStyle.backButton}
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={perfilStyle.backChevron}>‹</Text>
          </Pressable>
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

            <BotaoNotificacoes abaAtiva="perfil" />
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
            <Text style={perfilStyle.profileName}>
              {atleta?.nome_atleta ?? ""}
            </Text>

            {categoriaAtual && (
              <Text style={perfilStyle.profileDetail}>
                Categoria {categoriaAtual.nome_categoria}
              </Text>
            )}

            {atleta?.numero_matricula_atleta && (
              <Text style={perfilStyle.profileDetail}>
                Matrícula {atleta.numero_matricula_atleta}
              </Text>
            )}

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

              <Text style={perfilStyle.infoValue}>
                {exibirTelefone(atleta?.telefone_atleta)}
              </Text>
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
                {atleta?.email_atleta ?? ""}
              </Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/matricula.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>CPF</Text>

              <Text style={perfilStyle.infoValue}>
                {formatarCpf(atleta?.cpf_atleta)}
              </Text>
            </View>

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/agendaPreta.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Data de nascimento</Text>

              <Text style={perfilStyle.infoValue}>
                {formatarDataNascimento(atleta?.data_nasc_atleta)}
              </Text>
            </View>

            {/* Responsável volta quando GET /api/v1/atleta passar a trazê-lo */}

            <View style={perfilStyle.infoRow}>
              <Image
                source={require("@/assets/images/img/categoria.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Categoria</Text>

              <Text style={perfilStyle.infoValue}>
                {categoriaAtual?.nome_categoria ?? ""}
              </Text>
            </View>

            <View style={[perfilStyle.infoRow, perfilStyle.infoRowLast]}>
              <Image
                source={require("@/assets/images/img/matricula.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Matrícula</Text>

              <Text style={perfilStyle.infoValue}>
                {atleta?.numero_matricula_atleta ?? ""}
              </Text>
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

            <Pressable style={perfilStyle.infoRow} onPress={() => router.navigate("/ajuda-suporte")}>
              <Image
                source={require("@/assets/images/img/ajudaEsuporte.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Ajuda e suporte</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </Pressable>

            <Pressable style={perfilStyle.infoRow} onPress={() => router.navigate("/sobre-a-aacj")}>
              <Image
                source={require("@/assets/images/img/atencaoPreto.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={perfilStyle.infoLabel}>Sobre a AACJ</Text>

              <Text style={perfilStyle.menuArrow}>{">"}</Text>
            </Pressable>

            <Pressable
              style={[perfilStyle.infoRow, perfilStyle.infoRowLast]}
              onPress={handleSair}
            >
              <Image
                source={require("@/assets/images/img/sairDaContaVermelho.png")}
                style={perfilStyle.infoIcon}
                tintColor={cores.vermelho}
                resizeMode="contain"
              />

              <Text style={perfilStyle.logoutLabel}>Sair da conta</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
