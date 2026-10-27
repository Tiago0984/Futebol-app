import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import { API } from "@/config/api";
import editarPerfilStyle from "@/styles/editarPerfilStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
import {
  dataBrParaIso,
  descreverResponsavel,
  exibirTelefone,
  formatarCpf,
  formatarDataNascimento,
  formatarTelefone,
  mascaraCpf,
  mascaraData,
  mensagensDeErro,
  ResponsavelAtleta,
} from "@/utils/formatos";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Só os campos de GET /api/v1/atleta usados nesta tela
type Atleta = {
  nome_atleta: string;
  cpf_atleta: string | null;
  data_nasc_atleta: string | null;
  email_atleta: string | null;
  telefone_atleta: string | null;
  numero_matricula_atleta: string | null;
  // null = foto padrão
  foto_url: string | null;
  // Lista vazia quando não há; só a secretaria muda
  responsaveis?: ResponsavelAtleta[];
  categorias: {
    nome_categoria: string;
    pivot: {
      status_categoria_atleta: string;
      data_fim_categoria_atleta: string | null;
    };
  }[];
};

export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const [atleta, setAtleta] = useState<Atleta | null>(null);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [errosCampos, setErrosCampos] = useState<Record<string, string>>({});
  const [modalFotoVisivel, setModalFotoVisivel] = useState(false);
  const [enviandoFoto, setEnviandoFoto] = useState(false);
  // Foto escolhida, mostrada enquanto o envio não termina
  const [fotoLocal, setFotoLocal] = useState<string | null>(null);
  const [erroFoto, setErroFoto] = useState("");

  const timerSucesso = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cancela o timer da mensagem se a tela for fechada
  useEffect(() => {
    return () => {
      if (timerSucesso.current) clearTimeout(timerSucesso.current);
    };
  }, []);

  // Token vencido, encerrado ou atleta inativado: volta para o login
  async function sairPorSessaoInvalida() {
    await AsyncStorage.multiRemove(["token", "perfil"]);
    router.replace("/selecao-perfil");
  }

  function preencherCampos(dados: Atleta) {
    setAtleta(dados);
    setNome(dados.nome_atleta ?? "");
    setTelefone(exibirTelefone(dados.telefone_atleta));
    setEmail(dados.email_atleta ?? "");
    setCpf(formatarCpf(dados.cpf_atleta));
    setDataNascimento(formatarDataNascimento(dados.data_nasc_atleta));
  }

  function mostrarSucesso(mensagem: string) {
    if (timerSucesso.current) clearTimeout(timerSucesso.current);
    setMensagemSucesso(mensagem);
    timerSucesso.current = setTimeout(() => setMensagemSucesso(""), 5000);
  }

  // Abre a câmera ou a galeria já com recorte quadrado; o que for escolhido vai para a API
  async function escolherFoto(origem: "camera" | "galeria") {
    setModalFotoVisivel(false);
    setErroFoto("");
    const opcoes: ImagePicker.ImagePickerOptions = {
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    };
    try {
      // No navegador não há pedido de permissão, e o seletor precisa abrir logo após o toque
      if (Platform.OS !== "web") {
        const permissao =
          origem === "camera"
            ? await ImagePicker.requestCameraPermissionsAsync()
            : await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissao.granted) {
          setErroFoto(
            origem === "camera"
              ? "Permita o acesso à câmera para tirar a foto."
              : "Permita o acesso às fotos para escolher uma imagem.",
          );
          return;
        }
      }
      const resultado =
        origem === "camera"
          ? await ImagePicker.launchCameraAsync(opcoes)
          : await ImagePicker.launchImageLibraryAsync(opcoes);
      if (resultado.canceled) return;
      await enviarFoto(resultado.assets[0]);
    } catch (erro) {
      console.log("Erro ao escolher a foto:", erro);
      setErroFoto("Não foi possível abrir a câmera ou a galeria.");
    }
  }

  // Resposta da foto: a API devolve o atleta no formato do GET. Só a foto muda;
  // os campos do formulário ficam como estão, para não perder o que não foi salvo
  async function tratarRespostaFoto(resposta: Response, mensagemPadrao: string) {
    if (resposta.status === 401 || resposta.status === 403) {
      await sairPorSessaoInvalida();
      return;
    }
    if (resposta.status === 404) {
      setErroFoto("A troca de foto ainda não está disponível.");
      return;
    }
    const json = await resposta.json();
    if (!resposta.ok || !json.success) {
      const erros = mensagensDeErro(json);
      setErroFoto(erros.campos.foto ?? erros.geral);
      return;
    }
    setAtleta(json.data);
    mostrarSucesso(json.message ?? mensagemPadrao);
  }

  // POST /api/v1/atleta/foto, multipart com o campo "foto" (rota pedida ao backend)
  async function enviarFoto(foto: ImagePicker.ImagePickerAsset) {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return;
    }
    setFotoLocal(foto.uri);
    setEnviandoFoto(true);
    try {
      const formulario = new FormData();
      const nomeArquivo = foto.fileName ?? "foto.jpg";
      if (Platform.OS === "web") {
        // No navegador a imagem é um endereço blob/data: vira arquivo antes de enviar
        const arquivo = await (await fetch(foto.uri)).blob();
        formulario.append("foto", arquivo, nomeArquivo);
      } else {
        formulario.append("foto", {
          uri: foto.uri,
          name: nomeArquivo,
          type: foto.mimeType ?? "image/jpeg",
        } as unknown as Blob);
      }
      // Sem Content-Type: o fetch monta o multipart com o separador certo
      const resposta = await fetch(`${API}/atleta/foto`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: formulario,
      });
      await tratarRespostaFoto(resposta, "Foto atualizada com sucesso.");
    } catch (erro) {
      console.log("Erro ao enviar a foto:", erro);
      setErroFoto("Não foi possível conectar ao servidor.");
    } finally {
      setFotoLocal(null);
      setEnviandoFoto(false);
    }
  }

  // DELETE /api/v1/atleta/foto: volta para a foto padrão (rota pedida ao backend)
  async function removerFoto() {
    setModalFotoVisivel(false);
    setErroFoto("");
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return;
    }
    setEnviandoFoto(true);
    try {
      const resposta = await fetch(`${API}/atleta/foto`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      await tratarRespostaFoto(resposta, "Foto removida.");
    } catch (erro) {
      console.log("Erro ao remover a foto:", erro);
      setErroFoto("Não foi possível conectar ao servidor.");
    } finally {
      setEnviandoFoto(false);
    }
  }

  useEffect(() => {
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
        if (resposta.status === 401 || resposta.status === 403) {
          await sairPorSessaoInvalida();
          return;
        }
        const json = await resposta.json();
        if (json.success) preencherCampos(json.data);
      } catch (erro) {
        console.log("Erro ao buscar dados do perfil:", erro);
        setErroGeral("Não foi possível carregar seus dados.");
      }
    }
    carregarAtleta();
  }, []);

  async function handleSalvar() {
    if (!atleta || salvando) return;

    // Manda só o que mudou; a API aceita receber parte dos campos
    const alteracoes: Record<string, string> = {};
    // Erros encontrados antes de enviar, com as mesmas chaves que a API usa
    const errosLocais: Record<string, string> = {};

    const nomeNovo = nome.trim();
    if (nomeNovo !== atleta.nome_atleta) {
      if (nomeNovo.length < 3) {
        errosLocais.nome_atleta = "Informe o nome completo.";
      } else {
        alteracoes.nome_atleta = nomeNovo;
      }
    }
    if (telefone !== exibirTelefone(atleta.telefone_atleta)) {
      alteracoes.telefone_atleta = telefone;
    }
    const emailNovo = email.trim();
    if (emailNovo !== (atleta.email_atleta ?? "")) {
      alteracoes.email_atleta = emailNovo;
    }
    // Só confere os 11 dígitos; os dígitos verificadores a API valida
    if (cpf !== formatarCpf(atleta.cpf_atleta)) {
      if (cpf.replace(/\D/g, "").length !== 11) {
        errosLocais.cpf_atleta = "Informe um CPF com 11 dígitos.";
      } else {
        alteracoes.cpf_atleta = cpf;
      }
    }
    // A API só aceita mudar dia e mês; ano diferente volta 422 com a mensagem dela
    if (dataNascimento !== formatarDataNascimento(atleta.data_nasc_atleta)) {
      const dataIso = dataBrParaIso(dataNascimento);
      if (!dataIso) {
        errosLocais.data_nasc_atleta = "Informe uma data válida.";
      } else {
        alteracoes.data_nasc_atleta = dataIso;
      }
    }

    setErroGeral("");
    setErrosCampos(errosLocais);
    setMensagemSucesso("");

    if (Object.keys(errosLocais).length > 0) return;

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
      const resposta = await fetch(`${API}/atleta`, {
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

      // 422: errors tem a mensagem de cada campo, mostrada embaixo dele;
      // message (que repete a primeira delas) só aparece quando não há campo
      if (!resposta.ok || !json.success) {
        const erros = mensagensDeErro(json);
        setErrosCampos(erros.campos);
        if (Object.keys(erros.campos).length === 0) setErroGeral(erros.geral);
        return;
      }

      preencherCampos(json.data);
      let mensagem = json.message ?? "Dados atualizados com sucesso.";
      if (alteracoes.email_atleta) {
        mensagem += ` Seu login agora é pelo e-mail ${json.data.email_atleta}.`;
      }
      mostrarSucesso(mensagem);
    } catch (erro) {
      console.log("Erro ao salvar o perfil:", erro);
      setErroGeral("Não foi possível conectar ao servidor.");
    } finally {
      setSalvando(false);
    }
  }

  const categoriaAtual = atleta?.categorias.find(
    (c) =>
      c.pivot.status_categoria_atleta === "ATIVO" &&
      !c.pivot.data_fim_categoria_atleta,
  );

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
              Editar Perfil
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

        {/* FOTO: tocar na foto, no ícone ou em "Alterar foto" abre as opções */}
        <View style={editarPerfilStyle.photoSection}>
          <Pressable
            style={editarPerfilStyle.avatarCircle}
            onPress={() => setModalFotoVisivel(true)}
            disabled={!atleta || enviandoFoto}
            accessibilityRole="button"
            accessibilityLabel="Alterar foto"
          >
            {fotoLocal || atleta?.foto_url ? (
              <Image
                source={{ uri: fotoLocal ?? atleta?.foto_url ?? undefined }}
                style={editarPerfilStyle.avatarFoto}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("@/assets/images/img/userPreto.png")}
                style={editarPerfilStyle.avatarIcon}
                tintColor={cores.preto}
                resizeMode="contain"
              />
            )}

            {enviandoFoto && (
              <View style={editarPerfilStyle.avatarEnviando}>
                <Text style={editarPerfilStyle.avatarEnviandoTexto}>
                  Enviando...
                </Text>
              </View>
            )}

            <View style={editarPerfilStyle.cameraBadge}>
              <Image
                source={require("@/assets/images/img/camerablack.png")}
                style={editarPerfilStyle.cameraIcon}
                resizeMode="contain"
              />
            </View>
          </Pressable>

          <Pressable
            onPress={() => setModalFotoVisivel(true)}
            disabled={!atleta || enviandoFoto}
          >
            <Text style={editarPerfilStyle.changePhotoText}>Alterar foto</Text>
          </Pressable>

          {erroFoto !== "" && (
            <Text style={editarPerfilStyle.fotoErro}>{erroFoto}</Text>
          )}
        </View>

        {/* FORMULÁRIO */}
        <View style={editarPerfilStyle.form}>
          {/* Categoria e matrícula só a secretaria muda */}
          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>Nome completo</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />
          </View>
          {errosCampos.nome_atleta && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.nome_atleta}
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
              placeholder="(11) 98765-4321"
              placeholderTextColor={cores.cinza}
            />
          </View>
          {errosCampos.telefone_atleta && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.telefone_atleta}
            </Text>
          )}

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>E-mail</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errosCampos.email_atleta && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.email_atleta}
            </Text>
          )}

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>CPF</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={cpf}
              onChangeText={(texto) => setCpf(mascaraCpf(texto))}
              keyboardType="number-pad"
              maxLength={14}
              placeholder="000.000.000-00"
              placeholderTextColor={cores.cinza}
            />
          </View>
          {errosCampos.cpf_atleta && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.cpf_atleta}
            </Text>
          )}

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>Data de nascimento</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={dataNascimento}
              onChangeText={(texto) => setDataNascimento(mascaraData(texto))}
              keyboardType="number-pad"
              maxLength={10}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={cores.cinza}
            />
          </View>
          {errosCampos.data_nasc_atleta && (
            <Text style={editarPerfilStyle.fieldError}>
              {errosCampos.data_nasc_atleta}
            </Text>
          )}

          {/* Responsáveis, categoria e matrícula só a secretaria muda */}
          {(atleta?.responsaveis ?? []).map((responsavel, index) => (
            <View
              key={`${responsavel.nome}-${index}`}
              style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
            >
              <Text style={editarPerfilStyle.fieldLabel}>Responsável</Text>
              <Text
                style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
              >
                {descreverResponsavel(responsavel)}
              </Text>
            </View>
          ))}

          <View
            style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Categoria</Text>
            <Text
              style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
            >
              {categoriaAtual?.nome_categoria ?? ""}
            </Text>
          </View>

          <View
            style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Matrícula</Text>
            <Text
              style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
            >
              {atleta?.numero_matricula_atleta ?? ""}
            </Text>
          </View>

          <Pressable
            style={[
              editarPerfilStyle.saveButton,
              (salvando || !atleta) && editarPerfilStyle.saveButtonDisabled,
            ]}
            onPress={handleSalvar}
            disabled={salvando || !atleta}
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

      {/* Opções da foto */}
      <Modal
        visible={modalFotoVisivel}
        transparent
        animationType="fade"
        onRequestClose={() => setModalFotoVisivel(false)}
      >
        <View style={editarPerfilStyle.modalOverlay}>
          <View style={editarPerfilStyle.modalCard}>
            <Text style={editarPerfilStyle.modalTitulo}>Alterar foto</Text>
            <Text style={editarPerfilStyle.modalTexto}>
              Como deseja adicionar sua foto?
            </Text>

            {/* No navegador a câmera abriria o mesmo seletor de arquivos da galeria */}
            {Platform.OS !== "web" && (
              <Pressable
                style={editarPerfilStyle.modalOpcao}
                onPress={() => escolherFoto("camera")}
              >
                <Text style={editarPerfilStyle.modalOpcaoTexto}>
                  📷 Tirar foto
                </Text>
              </Pressable>
            )}

            <Pressable
              style={editarPerfilStyle.modalOpcao}
              onPress={() => escolherFoto("galeria")}
            >
              <Text style={editarPerfilStyle.modalOpcaoTexto}>
                🖼️ Escolher da galeria
              </Text>
            </Pressable>

            {atleta?.foto_url && (
              <Pressable
                style={editarPerfilStyle.modalOpcao}
                onPress={removerFoto}
              >
                <Text style={editarPerfilStyle.modalOpcaoTextoRemover}>
                  Remover foto
                </Text>
              </Pressable>
            )}

            <Pressable
              style={editarPerfilStyle.modalCancelar}
              onPress={() => setModalFotoVisivel(false)}
            >
              <Text style={editarPerfilStyle.modalCancelarTexto}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
