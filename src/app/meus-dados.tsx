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
  mascaraCep,
  mascaraCpf,
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
  StyleProp,
  Switch,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Endereco = {
  cep_endereco: string | null;
  rua_endereco: string | null;
  numero_endereco: string | null;
  bairro_endereco: string | null;
  complemento_endereco: string | null;
  cidade_endereco: string | null;
  estado_endereco: string | null;
  // Filhos que usam o mesmo registro de endereço; servidor antigo não manda
  compartilhado_com?: { id_atleta: number; nome_atleta: string }[];
};

// GET /api/v1/responsavel: só os campos usados nesta tela
type Responsavel = {
  nome_responsavel: string;
  email_responsavel: string | null;
  cpf_responsavel: string | null;
  telefone_responsavel: string | null;
  whatsapp_responsavel: string | null;
  endereco: Endereco | null;
};

// Os campos do endereço como o formulário guarda (texto, sem null)
type CamposEndereco = {
  cep_endereco: string;
  rua_endereco: string;
  numero_endereco: string;
  complemento_endereco: string;
  bairro_endereco: string;
  cidade_endereco: string;
  estado_endereco: string;
};

function camposDoEndereco(endereco: Endereco | null): CamposEndereco {
  return {
    cep_endereco: mascaraCep(endereco?.cep_endereco ?? ""),
    rua_endereco: endereco?.rua_endereco ?? "",
    numero_endereco: endereco?.numero_endereco ?? "",
    complemento_endereco: endereco?.complemento_endereco ?? "",
    bairro_endereco: endereco?.bairro_endereco ?? "",
    cidade_endereco: endereco?.cidade_endereco ?? "",
    estado_endereco: endereco?.estado_endereco ?? "",
  };
}

// "Rua X, 123 · Apto 4 · Centro · São Carlos/SP · CEP 13560-000"; partes vazias saem
function descreverEndereco(endereco: Endereco | null) {
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

// "Joana", "Joana e João", "Ana, Joana e João" (só o primeiro nome)
function juntarNomes(atletas: { nome_atleta: string }[]) {
  const nomes = atletas.map((a) => a.nome_atleta.split(" ")[0]);
  if (nomes.length <= 1) return nomes.join("");
  return `${nomes.slice(0, -1).join(", ")} e ${nomes[nomes.length - 1]}`;
}

type CampoProps = TextInputProps & {
  rotulo: string;
  erro?: string;
  estilo?: StyleProp<ViewStyle>;
};

// Card com rótulo, campo e a mensagem de erro embaixo
function Campo({ rotulo, erro, estilo, ...props }: CampoProps) {
  return (
    <View style={estilo}>
      <View style={editarPerfilStyle.fieldCard}>
        <Text style={editarPerfilStyle.fieldLabel}>{rotulo}</Text>
        <TextInput
          style={editarPerfilStyle.fieldValue}
          placeholderTextColor={cores.cinza}
          {...props}
        />
      </View>
      {erro && <Text style={editarPerfilStyle.fieldError}>{erro}</Text>}
    </View>
  );
}

// Card cinza de só leitura
function CampoFixo({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View
      style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
    >
      <Text style={editarPerfilStyle.fieldLabel}>{rotulo}</Text>
      <Text
        style={[
          editarPerfilStyle.fieldValue,
          editarPerfilStyle.fieldValueDisabled,
        ]}
      >
        {valor}
      </Text>
    </View>
  );
}

export default function MeusDados() {
  const insets = useSafeAreaInsets();
  const [responsavel, setResponsavel] = useState<Responsavel | null>(null);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState<CamposEndereco>(
    camposDoEndereco(null),
  );
  const [enderecoDosFilhos, setEnderecoDosFilhos] = useState(true);
  const [buscandoCep, setBuscandoCep] = useState(false);
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
    setNome(dados.nome_responsavel ?? "");
    setEmail(dados.email_responsavel ?? "");
    setTelefone(exibirTelefone(dados.telefone_responsavel));
    setWhatsapp(exibirTelefone(dados.whatsapp_responsavel));
    setCpf(formatarCpf(dados.cpf_responsavel));
    setEndereco(camposDoEndereco(dados.endereco));
    setEnderecoDosFilhos(true);
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

  function mudarEndereco(campo: keyof CamposEndereco, valor: string) {
    setEndereco((atual) => ({ ...atual, [campo]: valor }));
  }

  // Com os 8 dígitos, o ViaCEP preenche rua, bairro, cidade e UF; número e complemento ficam
  async function mudarCep(texto: string) {
    const cep = mascaraCep(texto);
    mudarEndereco("cep_endereco", cep);
    const numeros = cep.replace(/\D/g, "");
    if (numeros.length !== 8) return;

    setBuscandoCep(true);
    setErrosCampos((atual) => {
      const outros = { ...atual };
      delete outros["endereco.cep_endereco"];
      return outros;
    });
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
      const dados = await resposta.json();
      if (dados.erro) {
        setErrosCampos((atual) => ({
          ...atual,
          "endereco.cep_endereco":
            "CEP não encontrado. Confira ou preencha o endereço.",
        }));
        return;
      }
      setEndereco((atual) => ({
        ...atual,
        rua_endereco: dados.logradouro || atual.rua_endereco,
        bairro_endereco: dados.bairro || atual.bairro_endereco,
        cidade_endereco: dados.localidade || atual.cidade_endereco,
        estado_endereco: dados.uf || atual.estado_endereco,
      }));
    } catch (erro) {
      // Sem a busca, a pessoa preenche à mão
      console.log("Erro ao buscar o CEP:", erro);
    } finally {
      setBuscandoCep(false);
    }
  }

  // Servidor com a edição de nome, CPF e endereço manda o compartilhado_com
  const podeEditarTudo = responsavel?.endereco?.compartilhado_com !== undefined;
  const filhosNoEndereco = responsavel?.endereco?.compartilhado_com ?? [];
  const enderecoOriginal = camposDoEndereco(responsavel?.endereco ?? null);
  const enderecoMudou = (
    Object.keys(endereco) as (keyof CamposEndereco)[]
  ).some((campo) => endereco[campo].trim() !== enderecoOriginal[campo]);

  async function handleSalvar() {
    if (!responsavel || salvando) return;

    // Manda só o que mudou; o endereço vai inteiro quando algum campo dele muda
    const alteracoes: Record<string, unknown> = {};
    // Erros encontrados antes de enviar, com as mesmas chaves que a API usa
    const errosLocais: Record<string, string> = {};

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

    if (podeEditarTudo) {
      const nomeNovo = nome.trim();
      if (nomeNovo !== responsavel.nome_responsavel) {
        if (nomeNovo.length < 3) {
          errosLocais.nome_responsavel = "Informe o nome completo.";
        } else {
          alteracoes.nome_responsavel = nomeNovo;
        }
      }
      // Só confere os 11 dígitos; os dígitos verificadores a API valida
      if (cpf !== formatarCpf(responsavel.cpf_responsavel)) {
        if (cpf.replace(/\D/g, "").length !== 11) {
          errosLocais.cpf_responsavel = "Informe um CPF com 11 dígitos.";
        } else {
          alteracoes.cpf_responsavel = cpf;
        }
      }
      if (enderecoMudou) {
        if (endereco.cep_endereco.replace(/\D/g, "").length !== 8) {
          errosLocais["endereco.cep_endereco"] =
            "Informe um CEP com 8 dígitos.";
        }
        if (endereco.estado_endereco.trim().length !== 2) {
          errosLocais["endereco.estado_endereco"] = "Use a sigla (ex.: SP).";
        }
        alteracoes.endereco = {
          cep_endereco: endereco.cep_endereco,
          rua_endereco: endereco.rua_endereco.trim(),
          numero_endereco: endereco.numero_endereco.trim(),
          complemento_endereco: endereco.complemento_endereco.trim() || null,
          bairro_endereco: endereco.bairro_endereco.trim(),
          cidade_endereco: endereco.cidade_endereco.trim(),
          estado_endereco: endereco.estado_endereco.trim().toUpperCase(),
        };
        if (filhosNoEndereco.length > 0) {
          alteracoes.endereco_dos_filhos = enderecoDosFilhos;
        }
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
      if (alteracoes.nome_responsavel) {
        // A saudação da Home usa o nome guardado no login
        await AsyncStorage.setItem(
          "nome_responsavel",
          json.data.nome_responsavel ?? "",
        );
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
        keyboardShouldPersistTaps="handled"
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

              <BotaoNotificacoes abaAtiva="perfil" />
            </View>
          </View>
        </View>

        {/* FORMULÁRIO */}
        <View style={editarPerfilStyle.form}>
          {podeEditarTudo ? (
            <Campo
              rotulo="Nome completo"
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
              erro={errosCampos.nome_responsavel}
            />
          ) : (
            <CampoFixo
              rotulo="Nome completo"
              valor={responsavel?.nome_responsavel ?? ""}
            />
          )}

          <Campo
            rotulo="E-mail (login)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            erro={errosCampos.email_responsavel}
          />

          <Campo
            rotulo="Telefone"
            value={telefone}
            onChangeText={(texto) => setTelefone(formatarTelefone(texto))}
            keyboardType="phone-pad"
            maxLength={15}
            placeholder="(11) 3333-4444"
            erro={errosCampos.telefone_responsavel}
          />

          <Campo
            rotulo="WhatsApp"
            value={whatsapp}
            onChangeText={(texto) => setWhatsapp(formatarTelefone(texto))}
            keyboardType="phone-pad"
            maxLength={15}
            placeholder="(11) 98765-4321"
            erro={errosCampos.whatsapp_responsavel}
          />

          {podeEditarTudo ? (
            <Campo
              rotulo="CPF"
              value={cpf}
              onChangeText={(texto) => setCpf(mascaraCpf(texto))}
              keyboardType="number-pad"
              maxLength={14}
              placeholder="000.000.000-00"
              erro={errosCampos.cpf_responsavel}
            />
          ) : (
            <CampoFixo
              rotulo="CPF"
              valor={formatarCpf(responsavel?.cpf_responsavel)}
            />
          )}

          {/* Servidor antigo: o endereço só a secretaria muda, numa linha só */}
          {!podeEditarTudo && responsavel?.endereco && (
            <CampoFixo
              rotulo="Endereço"
              valor={descreverEndereco(responsavel.endereco)}
            />
          )}

          {podeEditarTudo && (
            <>
              <Text style={editarPerfilStyle.sectionTitle}>Endereço</Text>

              <Campo
                rotulo={buscandoCep ? "CEP · buscando..." : "CEP"}
                value={endereco.cep_endereco}
                onChangeText={mudarCep}
                keyboardType="number-pad"
                maxLength={9}
                placeholder="00000-000"
                erro={errosCampos["endereco.cep_endereco"]}
              />

              <Campo
                rotulo="Rua"
                value={endereco.rua_endereco}
                onChangeText={(texto) => mudarEndereco("rua_endereco", texto)}
                erro={errosCampos["endereco.rua_endereco"]}
              />

              <View style={editarPerfilStyle.fieldRow}>
                <Campo
                  rotulo="Número"
                  value={endereco.numero_endereco}
                  onChangeText={(texto) =>
                    mudarEndereco("numero_endereco", texto)
                  }
                  erro={errosCampos["endereco.numero_endereco"]}
                  estilo={editarPerfilStyle.fieldCardEstreito}
                />
                <Campo
                  rotulo="Complemento"
                  value={endereco.complemento_endereco}
                  onChangeText={(texto) =>
                    mudarEndereco("complemento_endereco", texto)
                  }
                  placeholder="Opcional"
                  erro={errosCampos["endereco.complemento_endereco"]}
                  estilo={editarPerfilStyle.fieldCardFlex}
                />
              </View>

              <Campo
                rotulo="Bairro"
                value={endereco.bairro_endereco}
                onChangeText={(texto) =>
                  mudarEndereco("bairro_endereco", texto)
                }
                erro={errosCampos["endereco.bairro_endereco"]}
              />

              <View style={editarPerfilStyle.fieldRow}>
                <Campo
                  rotulo="Cidade"
                  value={endereco.cidade_endereco}
                  onChangeText={(texto) =>
                    mudarEndereco("cidade_endereco", texto)
                  }
                  erro={errosCampos["endereco.cidade_endereco"]}
                  estilo={editarPerfilStyle.fieldCardFlex}
                />
                <Campo
                  rotulo="UF"
                  value={endereco.estado_endereco}
                  onChangeText={(texto) =>
                    mudarEndereco(
                      "estado_endereco",
                      texto.replace(/[^a-zA-Z]/g, "").toUpperCase(),
                    )
                  }
                  autoCapitalize="characters"
                  maxLength={2}
                  erro={errosCampos["endereco.estado_endereco"]}
                  estilo={editarPerfilStyle.fieldCardEstreito}
                />
              </View>

              {/* Só quando o endereço muda e é o mesmo registro de algum filho */}
              {enderecoMudou && filhosNoEndereco.length > 0 && (
                <View
                  style={[
                    editarPerfilStyle.fieldCard,
                    editarPerfilStyle.switchCard,
                  ]}
                >
                  <Text style={editarPerfilStyle.switchLabel}>
                    Mudar também o endereço de {juntarNomes(filhosNoEndereco)}
                  </Text>
                  <Switch
                    value={enderecoDosFilhos}
                    onValueChange={setEnderecoDosFilhos}
                    trackColor={{ false: cores.cinza, true: cores.vermelho }}
                    thumbColor={cores.branco}
                    // Na web a bolinha ligada usa outra prop (verde por padrão), que não está na tipagem
                    {...({ activeThumbColor: cores.branco } as object)}
                    accessibilityLabel={`Mudar também o endereço de ${juntarNomes(filhosNoEndereco)}`}
                  />
                </View>
              )}
            </>
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
