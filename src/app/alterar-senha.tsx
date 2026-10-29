import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import alterarSenhaStyle from "@/styles/alterarSenhaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import { CHAVES_SESSAO } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AlterarSenha() {
  const insets = useSafeAreaInsets();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaAtualVisivel, setSenhaAtualVisivel] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [novaSenhaVisivel, setNovaSenhaVisivel] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState("");

  // Única regra de senha da API: pelo menos 8 caracteres
  const temMinimo = novaSenha.length >= 8;
  const camposPreenchidos = !!senhaAtual && !!novaSenha && !!confirmarSenha;

  async function alterarSenha() {
    setSucesso("");
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMensagem("Preencha todos os campos.");
      return;
    }
    if (novaSenha.length < 8) {
      setMensagem("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMensagem("A confirmação da senha não corresponde à nova senha.");
      return;
    }

    setCarregando(true);
    setMensagem("");

    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }

      const resposta = await fetch(`${API}/atleta/senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          senha_atual: senhaAtual,
          nova_senha: novaSenha,
          nova_senha_confirmation: confirmarSenha,
        }),
      });

      // Token vencido, encerrado ou atleta inativado: volta para o login
      if (resposta.status === 401 || resposta.status === 403) {
        await AsyncStorage.multiRemove(CHAVES_SESSAO);
        router.replace("/selecao-perfil");
        return;
      }

      // 422: "Senha atual incorreta." ou a regra de um campo
      const json = await resposta.json();
      if (!resposta.ok || !json.success) {
        setMensagem(json.message || "Erro ao alterar a senha.");
        return;
      }

      // O token deste aparelho continua valendo; os outros aparelhos saem
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
      setSucesso(json.message || "Senha alterada com sucesso.");
    } catch (erro) {
      console.log("Erro ao alterar senha:", erro);
      setMensagem("Não foi possível conectar ao servidor.");
    } finally {
      setCarregando(false);
    }
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
          alterarSenhaStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
      >
        {/* HEADER */}
        <View style={alterarSenhaStyle.header}>
          <View style={alterarSenhaStyle.headerTopRow}>
            <Pressable
              style={alterarSenhaStyle.backButton}
              onPress={handleVoltar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={alterarSenhaStyle.backChevron}>‹</Text>
            </Pressable>

            <Text style={alterarSenhaStyle.headerTitle} pointerEvents="none">
              Alterar Senha
            </Text>

            <View style={alterarSenhaStyle.headerIconsRow}>
              <View style={alterarSenhaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={alterarSenhaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>

              <BotaoNotificacoes abaAtiva="perfil" />
            </View>
          </View>
        </View>

        {/* ÍCONE */}
        <View style={alterarSenhaStyle.iconSection}>
          <View style={alterarSenhaStyle.iconCircle}>
            <Image
              source={require("@/assets/images/img/cadeadoPretoFundoTransparente.png")}
              style={alterarSenhaStyle.icon}
              tintColor={cores.vermelho}
              resizeMode="contain"
            />
          </View>

          <Text style={alterarSenhaStyle.subtitle}>
            Atualize sua senha para {'\n'} manter sua conta segura.
          </Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={alterarSenhaStyle.form}>
          <View style={alterarSenhaStyle.fieldWrapper}>
            <TextInput
              style={alterarSenhaStyle.fieldInput}
              placeholder="Senha atual"
              placeholderTextColor={cores.cinza}
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              secureTextEntry={!senhaAtualVisivel}
            />

            <Pressable
              onPress={() => setSenhaAtualVisivel(!senhaAtualVisivel)}
            >
              <Image
                source={
                  senhaAtualVisivel
                    ? require("@/assets/images/img/olhofechado.png")
                    : require("@/assets/images/img/olhoaberto.png")
                }
                style={alterarSenhaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={alterarSenhaStyle.fieldWrapper}>
            <TextInput
              style={alterarSenhaStyle.fieldInput}
              placeholder="Nova senha"
              placeholderTextColor={cores.cinza}
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
                style={alterarSenhaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>

          <View style={alterarSenhaStyle.fieldWrapper}>
            <TextInput
              style={alterarSenhaStyle.fieldInput}
              placeholder="Confirmar nova senha"
              placeholderTextColor={cores.cinza}
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
                style={alterarSenhaStyle.eyeIcon}
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        {/* REQUISITOS DA SENHA */}
        <View style={alterarSenhaStyle.requirementsSection}>
          <Text style={alterarSenhaStyle.requirementsTitle}>
            Requisitos da senha
          </Text>

          {/* Fica verde assim que a nova senha chega a 8 caracteres */}
          <View style={alterarSenhaStyle.requirementRow}>
            {temMinimo ? (
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={alterarSenhaStyle.requirementCheckIcon}
                resizeMode="contain"
              />
            ) : (
              <View style={alterarSenhaStyle.requirementRadioOuter}>
                <View style={alterarSenhaStyle.requirementRadioDot} />
              </View>
            )}

            <Text
              style={
                temMinimo
                  ? alterarSenhaStyle.requirementTextMet
                  : alterarSenhaStyle.requirementTextPending
              }
            >
              Mínimo 8 caracteres
            </Text>
          </View>
        </View>

        {/* SALVAR */}
        <View style={alterarSenhaStyle.saveSection}>
          {mensagem ? (
            <Text style={alterarSenhaStyle.erroSalvar}>{mensagem}</Text>
          ) : null}

          {sucesso ? (
            <Text style={alterarSenhaStyle.sucessoSalvar}>{sucesso}</Text>
          ) : null}

          <Pressable
            style={[
              alterarSenhaStyle.saveButton,
              camposPreenchidos && !carregando && alterarSenhaStyle.saveButtonAtivo,
            ]}
            onPress={alterarSenha}
            disabled={carregando}
          >
            <Text style={alterarSenhaStyle.saveButtonText}>
              {carregando ? "Salvando..." : "Alterar senha"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
