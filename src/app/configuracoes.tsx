import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import configuracoesStyle from "@/styles/configuracoesStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import {
  notificacoesLigadas,
  pushDisponivel,
  registrarAparelho,
} from "@/utils/notificacoes";
import { sairDaConta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { router } from "expo-router";
import * as Updates from "expo-updates";
import { useEffect, useState } from "react";
import { Image, Platform, Pressable, ScrollView, Switch, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const VERSAO = Constants.expoConfig?.version ?? "1.0.0";
// Atualização pelo ar (EAS Update): só no app instalado; no Expo Go e no modo de teste não existe
const atualizacaoPeloAr = Platform.OS !== "web" && !__DEV__ && Updates.isEnabled;

// Data da atualização em uso ("atualizado em 01/11"); null no modo de teste
function dataDaAtualizacao() {
  const d = Updates.createdAt;
  if (!atualizacaoPeloAr || !d) return null;
  const dois = (n: number) => String(n).padStart(2, "0");
  return `${dois(d.getDate())}/${dois(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export default function Configuracoes() {
  const insets = useSafeAreaInsets();
  const [saindo, setSaindo] = useState(false);
  // Notificações no celular: a preferência vale no servidor (que deixa de enviar).
  // Só aparece no app instalado; na web não há push
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);
  const [avisoNotificacoes, setAvisoNotificacoes] = useState("");

  useEffect(() => {
    notificacoesLigadas()
      .then(setNotificacoesAtivas)
      .catch(() => {});
  }, []);

  async function alternarNotificacoes(ativas: boolean) {
    setAvisoNotificacoes("");
    setNotificacoesAtivas(ativas);
    const permitido = await registrarAparelho(ativas);
    if (!permitido) {
      // Ligou, mas o celular bloqueou: continua desligado até liberar nos ajustes
      setNotificacoesAtivas(false);
      setAvisoNotificacoes(
        "Permita as notificações do app AACJ nos ajustes do celular.",
      );
      return;
    }
    AsyncStorage.setItem("notificacoes_ativas", ativas ? "1" : "0").catch(
      () => {},
    );
  }

  // "procurando" e "baixando" travam o botão; os outros textos aparecem embaixo da linha
  const [atualizacao, setAtualizacao] = useState("");
  const ocupado = atualizacao === "procurando" || atualizacao === "baixando";

  async function procurarAtualizacao() {
    if (ocupado) return;
    if (Platform.OS === "web") {
      // A web já carrega a versão publicada ao recarregar a página
      window.location.reload();
      return;
    }
    if (!atualizacaoPeloAr) {
      setAtualizacao("As atualizações funcionam só no app instalado.");
      return;
    }
    try {
      setAtualizacao("procurando");
      const verificacao = await Updates.checkForUpdateAsync();
      if (!verificacao.isAvailable) {
        setAtualizacao("Você já está na versão mais recente.");
        return;
      }
      setAtualizacao("baixando");
      const baixada = await Updates.fetchUpdateAsync();
      if (!baixada.isNew) {
        setAtualizacao("Você já está na versão mais recente.");
        return;
      }
      // Reinicia já na versão nova
      await Updates.reloadAsync();
    } catch (erro) {
      console.log("Erro ao procurar atualização:", erro);
      setAtualizacao("Não foi possível procurar atualizações. Verifique a internet.");
    }
  }

  async function handleSair() {
    if (saindo) return;
    setSaindo(true);
    await sairDaConta();
  }

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
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={configuracoesStyle.backChevron}>‹</Text>
            </Pressable>

            <Text style={configuracoesStyle.headerTitle} pointerEvents="none">
              Configurações
            </Text>

            <View style={configuracoesStyle.headerIconsRow}>

              <BotaoNotificacoes abaAtiva="perfil" />
            </View>
          </View>
        </View>

        {/* CONTA */}
        {pushDisponivel && (
          <View style={configuracoesStyle.section}>
            <Text style={configuracoesStyle.sectionTitle}>Conta</Text>
            <View style={configuracoesStyle.card}>
              <View style={[configuracoesStyle.row, configuracoesStyle.rowLast]}>
                <Image
                  source={require("@/assets/images/img/sinoPreto.png")}
                  style={configuracoesStyle.rowIcon}
                  tintColor={cores.preto}
                  resizeMode="contain"
                />
                <Text style={configuracoesStyle.rowLabel}>Notificações</Text>
                <Switch
                  value={notificacoesAtivas}
                  onValueChange={alternarNotificacoes}
                  trackColor={{ false: cores.cinza, true: cores.vermelho }}
                  thumbColor={cores.branco}
                  {...({ activeThumbColor: cores.branco } as object)}
                  accessibilityLabel="Notificações"
                />
              </View>
              {avisoNotificacoes !== "" && (
                <Text style={configuracoesStyle.avisoNotificacoes}>
                  {avisoNotificacoes}
                </Text>
              )}
            </View>
          </View>
        )}

        {/* APLICATIVO */}
        <View style={configuracoesStyle.sectionCompact}>
          <Text style={configuracoesStyle.sectionTitle}>Aplicativo</Text>

          <View style={configuracoesStyle.card}>
            <Pressable
              style={[configuracoesStyle.row, configuracoesStyle.rowLast]}
              onPress={procurarAtualizacao}
              disabled={ocupado}
              accessibilityRole="button"
              accessibilityLabel="Procurar atualizações"
            >
              <Image
                source={require("@/assets/images/img/refresh.png")}
                style={configuracoesStyle.rowIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />

              <Text style={configuracoesStyle.rowLabel}>
                {atualizacao === "procurando"
                  ? "Procurando..."
                  : atualizacao === "baixando"
                    ? "Baixando atualização..."
                    : "Atualizações"}
              </Text>

              <Text style={configuracoesStyle.rowValue}>{VERSAO}</Text>
            </Pressable>
            {!ocupado && (atualizacao !== "" || dataDaAtualizacao()) && (
              <Text style={configuracoesStyle.avisoAtualizacao}>
                {atualizacao || `Atualizado em ${dataDaAtualizacao()}`}
              </Text>
            )}
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
          <Pressable style={configuracoesStyle.logoutButton} onPress={handleSair}>
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
