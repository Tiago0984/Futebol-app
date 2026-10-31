import TabBar from "@/components/tabBar";
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { API } from "@/config/api";
import { cores } from "@/styles/variaveis";
import { buscarComPrazo } from "@/utils/buscarComPrazo";
import { mensagensDeErro } from "@/utils/formatos";
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

export default function FaleConosco() {
  const insets = useSafeAreaInsets();

  const [assunto, setAssunto] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aguardando, setAguardando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({});
  const timerRetentativa = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timerRetentativa.current) clearTimeout(timerRetentativa.current);
  }, []);

  function aguardarNovaTentativa(retryAfter: string | null) {
    if (!retryAfter) return;
    const segundos = Number(retryAfter);
    const espera = Number.isFinite(segundos)
      ? segundos * 1000
      : Date.parse(retryAfter) - Date.now();
    if (!Number.isFinite(espera) || espera <= 0) return;
    if (timerRetentativa.current) clearTimeout(timerRetentativa.current);
    setAguardando(true);
    // Retry-After aceita segundos ou uma data HTTP.
    timerRetentativa.current = setTimeout(
      () => setAguardando(false),
      Math.min(espera, 2147483647),
    );
  }

  async function enviarMensagem() {
    if (enviando || aguardando) return;
    setErro("");
    setSucesso("");
    const campos: Record<string, string> = {};
    if (!assunto.trim()) campos.assunto = "Informe o assunto.";
    if (!mensagem.trim()) campos.mensagem = "Escreva sua mensagem.";
    setErrosCampos(campos);
    if (Object.keys(campos).length > 0) return;

    setEnviando(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      const resposta = await buscarComPrazo(`${API}/fale-conosco`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assunto: assunto.trim(), mensagem: mensagem.trim() }),
      });
      if (resposta.status === 401 || resposta.status === 403) {
        await AsyncStorage.multiRemove(CHAVES_SESSAO);
        router.replace("/selecao-perfil");
        return;
      }
      if (resposta.status === 404) {
        setErro("O envio de mensagens ainda não está disponível.");
        return;
      }
      if (resposta.status === 429) {
        setErro("Você enviou muitas mensagens. Tente de novo em alguns instantes.");
        aguardarNovaTentativa(resposta.headers.get("Retry-After"));
        return;
      }
      const json = await resposta.json().catch(() => null);
      if (resposta.status === 201) {
        setAssunto("");
        setMensagem("");
        setSucesso(json?.message ?? "Mensagem enviada com sucesso.");
        return;
      }
      const erros = mensagensDeErro(json ?? {});
      setErrosCampos(erros.campos);
      setErro(Object.keys(erros.campos).length === 0
        ? (json?.message ?? "Não foi possível enviar sua mensagem.")
        : "");
    } catch (falha) {
      console.log("Erro ao enviar a mensagem:", falha);
      setErro("Não foi possível conectar ao servidor.");
    } finally {
      setEnviando(false);
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
        style={faleConoscoStyle.scrollView}
        contentContainerStyle={[
          faleConoscoStyle.scrollContent,
          {
            paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 30,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={faleConoscoStyle.header}>
          <Pressable
            style={faleConoscoStyle.backButton}
            onPress={() => router.back()}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
          >
            <Text style={faleConoscoStyle.backChevron}>‹</Text>
          </Pressable>

          <Text style={faleConoscoStyle.headerTitle}>Fale conosco</Text>

          <View style={faleConoscoStyle.headerSpacer} />
        </View>

        {/* FORMULÁRIO */}
        <View style={faleConoscoStyle.formCard}>
          {/* ASSUNTO */}
          <View style={faleConoscoStyle.inputWrapper}>
            <Image
              source={require("@/assets/images/img/tag.png")}
              style={faleConoscoStyle.inputIcon}
              resizeMode="contain"
            />

            <TextInput
              style={faleConoscoStyle.assuntoInput}
              editable={!enviando}
              value={assunto}
              onChangeText={setAssunto}
              placeholder="Assunto"
              placeholderTextColor={cores.cinza}
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>

          {errosCampos.assunto && (
            <Text style={faleConoscoStyle.erroCampo}>{errosCampos.assunto}</Text>
          )}

          {/* MENSAGEM */}
          <View
            style={[
              faleConoscoStyle.inputWrapper,
              faleConoscoStyle.messageWrapper,
            ]}
          >
            <Image
              source={require("@/assets/images/img/mensagem.png")}
              style={faleConoscoStyle.inputIcon}
              resizeMode="contain"
            />

            <TextInput
              style={faleConoscoStyle.messageInput}
              editable={!enviando}
              value={mensagem}
              onChangeText={setMensagem}
              placeholder="Mensagem"
              placeholderTextColor={cores.cinza}
              multiline
              scrollEnabled
              textAlignVertical="top"
              autoCapitalize="sentences"
              autoCorrect
            />
          </View>

          {errosCampos.mensagem && (
            <Text style={faleConoscoStyle.erroCampo}>{errosCampos.mensagem}</Text>
          )}
          {erro !== "" && <Text style={faleConoscoStyle.erroCampo}>{erro}</Text>}
          {sucesso !== "" && (
            <Text style={faleConoscoStyle.sucesso}>{sucesso}</Text>
          )}

          {/* ENVIAR */}
          <Pressable
            style={[
              faleConoscoStyle.sendButton,
              (enviando || aguardando) && faleConoscoStyle.sendButtonDisabled,
            ]}
            onPress={enviarMensagem}
            disabled={enviando || aguardando}
          >
            <Text style={faleConoscoStyle.sendButtonText}>
              {enviando ? "Enviando..." : aguardando ? "Aguarde para reenviar" : "Enviar mensagem"}
            </Text>
          </Pressable>
        </View>

        {/* ATENDIMENTO */}
        <View style={faleConoscoStyle.attendanceSection}>
          <View style={faleConoscoStyle.attendanceContent}>
            <Text style={faleConoscoStyle.attendanceTitle}>Atendimento</Text>

            <View style={faleConoscoStyle.attendanceBlock}>
              <Text style={faleConoscoStyle.attendanceValue}>
                Envie suas dúvidas e sugestões para a equipe da AACJ pelo formulário acima.
              </Text>
            </View>
          </View>

          <Image
            source={require("@/assets/images/img/logo/logo-aacj.png")}
            style={faleConoscoStyle.aacjLogo}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
