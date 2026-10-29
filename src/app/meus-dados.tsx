import BotaoNotificacoes from "@/components/botaoNotificacoes";
import TabBar from "@/components/tabBar";
import { API } from "@/config/api";
import editarPerfilStyle from "@/styles/editarPerfilStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import {
  exibirTelefone,
  formatarCpf,
  formatarTelefone,
  mensagensDeErro,
} from "@/utils/formatos";
import { CHAVES_SESSAO } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// GET /api/v1/responsavel: só os campos usados nesta tela
type Responsavel = {
  nome_responsavel: string;
  email_responsavel: string | null;
  cpf_responsavel: string | null;
  telefone_responsavel: string | null;
  whatsapp_responsavel: string | null;
  endereco: {
    cep_endereco: string | null;
    rua_endereco: string | null;
    numero_endereco: string | null;
    bairro_endereco: string | null;
    complemento_endereco: string | null;
    cidade_endereco: string | null;
    estado_endereco: string | null;
  } | null;
};

// "Rua X, 123 · Apto 4 · Centro · São Carlos/SP · CEP 13560-000"; partes vazias saem
function descreverEndereco(endereco: Responsavel["endereco"]) {
  if (!endereco) return "";
  const rua = [endereco.rua_endereco, endereco.numero_endereco]
    .filter(Boolean)
    .join(", ");
  const cidade = [endereco.cidade_endereco, endereco.estado_endereco]
    .filter(Boolean)
    .join("/");
  return [
    rua,
    endereco.complemento_endereco,
    endereco.bairro_endereco,
    cidade,
    endereco.cep_endereco ? `CEP ${endereco.cep_endereco}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
}

export default function MeusDados() {
  const insets = useSafeAreaInsets();
  const [responsavel, setResponsavel] = useState<Responsavel | null>(null);
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({});

  const timerSucesso = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancela o timer da mensagem se a tela for fechada
  useEffect(() => {
    return () => {
      if (timerSucesso.current) clearTimeout(timerSucesso.current);
    };
  }, []);

  // Token vencido, encerrado ou sem filho ativo: volta para o login
  async function sairPorSessaoInvalida() {
    await AsyncStorage.multiRemove(CHAVES_SESSAO);
    router.replace("/selecao-perfil");
  }

  function preencherCampos(dados: Responsavel) {
    setResponsavel(dados);
    setEmail(dados.email_responsavel ?? "");
    setTelefone(exibirTelefone(dados.telefone_responsavel));
    setWhatsapp(exibirTelefone(dados.whatsapp_responsavel));
  }

  useEffect(() => {
    async function carregarResponsavel() {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      try {
        const resposta = await fetch(`${API}/responsavel`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (resposta.status === 401 || resposta.status === 403) {
          await sairPorSessaoInvalida();
          return;
        }
        const json = await resposta.json();
        if (json.success) preencherCampos(json.data);
      } catch (erro) {
        console.log("Erro ao buscar os dados do responsável:", erro);
        setErroGeral("Não foi possível carregar seus dados.");
      }
    }
    carregarResponsavel();
  }, []);

  async function handleSalvar() {
    if (!responsavel || salvando) return;

    // Manda só o que mudou; nome, CPF e endereço ficam com a secretaria
    const alteracoes: Record<string, string> = {};
    const emailNovo = email.trim();
    if (emailNovo !== (responsavel.email_responsavel ?? "")) {
      alteracoes.email_responsavel = emailNovo;
    }
    if (telefone !== exibirTelefone(responsavel.telefone_responsavel)) {
      alteracoes.telefone_responsavel = telefone;
    }
    if (whatsapp !== exibirTelefone(responsavel.whatsapp_responsavel)) {
      alteracoes.whatsapp_responsavel = whatsapp;
    }

    setErroGeral("");
    setErrosCampos({});
    setMensagemSucesso("");

    if (Object.keys(alteracoes).length === 0) {
      setErroGeral("Nenhuma alteração para salvar.");
      return;
    }

    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return;
    }

    setSalvando(true);
    try {
      const resposta = await fetch(`${API}/responsavel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(alteracoes),
      });
      if (resposta.status === 401 || resposta.status === 403) {
        await sairPorSessaoInvalida();
        return;
      }
      const json = await resposta.json();

      // 422: a mensagem de cada campo aparece embaixo dele
      if (!resposta.ok || !json.success) {
        const erros = mensagensDeErro(json);
        setErrosCampos(erros.campos);
        if (Object.keys(erros.campos).length === 0) setErroGeral(erros.geral);
        return;
      }

      preencherCampos(json.data);
      let mensagem = json.message ?? "Dados atualizados com sucesso.";
      if (alteracoes.email_responsavel) {
        mensagem += ` Seu login agora é pelo e-mail ${json.data.email_responsavel}.`;
      }
      if (timerSucesso.current) clearTimeout(timerSucesso.current);
      setMensagemSucesso(mensagem);
      timerSucesso.current = setTimeout(() => setMensagemSucesso(""), 5000);
    } catch (erro) {
      console.log("Erro ao salvar os dados do responsável:", erro);
      setErroGeral("Não foi possível conectar ao servidor.");
    } finally {
      setSalvando(false);
    }
  }

  function handleVoltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/perfil");
    }
  }

  const endereco = descreverEndereco(responsavel?.endereco ?? null);

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
          editarPerfilStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
          },
        ]}
      >
        {/* HEADER */}
        <View style={editarPerfilStyle.header}>
          <View style={editarPerfilStyle.headerTopRow}>
            <Pressable
              style={editarPerfilStyle.backButton}
              onPress={handleVoltar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={editarPerfilStyle.backChevron}>‹</Text>
            </Pressable>

            <Text style={editarPerfilStyle.headerTitle} pointerEvents="none">
              Meus dados
            </Text>

            <View style={editarPerfilStyle.headerIconsRow}>
              <View style={editarPerfilStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={editarPerfilStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>

              <BotaoNotificacoes abaAtiva="perfil" />
            </View>
          </View>
        </View>

        {/* FORMULÁRIO */}
        <View style={editarPerfilStyle.form}>
          <View
            style={[
              editarPerfilStyle.fieldCard,
              editarPerfilStyle.fieldCardDisabled,
            ]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Nome completo</Text>
            <Text
              style={[
                editarPerfilStyle.fieldValue,
                editarPerfilStyle.fieldValueDisabled,
              ]}
            >
              {responsavel?.nome_responsavel ?? ""}
            </Text>
          </View>

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>E-mail (login)</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errosCampos.email_responsavel && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.email_responsavel}
            </Text>
          )}

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>Telefone</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={telefone}
              onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
              keyboardType="phone-pad"
              maxLength={15}
              placeholder="(11) 3333-4444"
              placeholderTextColor={cores.cinza}
            />
          </View>
          {errosCampos.telefone_responsavel && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.telefone_responsavel}
            </Text>
          )}

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>WhatsApp</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={whatsapp}
              onChangeText={(texto) => setWhatsapp(formatarTelefone(texto))}
              keyboardType="phone-pad"
              maxLength={15}
              placeholder="(11) 98765-4321"
              placeholderTextColor={cores.cinza}
            />
          </View>
          {errosCampos.whatsapp_responsavel && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.whatsapp_responsavel}
            </Text>
          )}

          {/* CPF e endereço só a secretaria muda */}
          <View
            style={[
              editarPerfilStyle.fieldCard,
              editarPerfilStyle.fieldCardDisabled,
            ]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>CPF</Text>
            <Text
              style={[
                editarPerfilStyle.fieldValue,
                editarPerfilStyle.fieldValueDisabled,
              ]}
            >
              {formatarCpf(responsavel?.cpf_responsavel)}
            </Text>
          </View>

          {endereco !== "" && (
            <View
              style={[
                editarPerfilStyle.fieldCard,
                editarPerfilStyle.fieldCardDisabled,
              ]}
            >
              <Text style={editarPerfilStyle.fieldLabel}>Endereço</Text>
              <Text
                style={[
                  editarPerfilStyle.fieldValue,
                  editarPerfilStyle.fieldValueDisabled,
                ]}
              >
                {endereco}
              </Text>
            </View>
          )}

          <Pressable
            style={[
              editarPerfilStyle.saveButton,
              (salvando || !responsavel) &&
                editarPerfilStyle.saveButtonDisabled,
            ]}
            onPress={handleSalvar}
            disabled={salvando || !responsavel}
          >
            <Text style={editarPerfilStyle.saveButtonText}>
              {salvando ? "Salvando..." : "Salvar alterações"}
            </Text>
          </Pressable>

          {erroGeral !== "" && (
            <View style={editarPerfilStyle.errorMessage}>
              <Text style={editarPerfilStyle.errorText}>{erroGeral}</Text>
            </View>
          )}

          {mensagemSucesso !== "" && (
            <View style={editarPerfilStyle.successMessage}>
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={editarPerfilStyle.successIcon}
                resizeMode="contain"
              />

              <Text style={editarPerfilStyle.successText}>
                {mensagemSucesso}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <TabBar abaAtiva="perfil" />
    </View>
  );
}
