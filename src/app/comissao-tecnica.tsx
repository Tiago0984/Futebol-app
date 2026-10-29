import TabBar from "@/components/tabBar";
import BotaoNotificacoes from "@/components/botaoNotificacoes";
import comissaoTecnicaStyle from "@/styles/comissaoTecnicaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { exibirTelefone } from "@/utils/formatos";
import { CHAVES_SESSAO, urlDoAtleta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Categoria = { id_categoria: number; categoria: string };

// GET /api/v1/comissao-tecnica/{id}: o responsável pela atividade da agenda
type Profissional = {
  id_comissao_tecnica: number;
  nome: string;
  cargo_label: string | null;
  foto_url: string | null;
  categoria_principal: Categoria | null;
  categorias_atendidas: Categoria[];
  tempo_na_aacj: { texto: string } | null;
  licenca: string | null;
  especialidade: string | null;
  contato: { telefone: string | null; email: string | null } | null;
};

export default function ComissaoTecnica() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [profissional, setProfissional] = useState<Profissional | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativa = true;
    (async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/selecao-perfil");
        return;
      }
      if (!id) {
        setErro("Profissional não informado.");
        return;
      }
      try {
        const resposta = await fetch(await urlDoAtleta(`/comissao-tecnica/${id}`), {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // Token vencido, encerrado ou atleta inativado: volta para o login
        if (resposta.status === 401 || resposta.status === 403) {
          await AsyncStorage.multiRemove(CHAVES_SESSAO);
          router.replace("/selecao-perfil");
          return;
        }
        const json = await resposta.json();
        if (!ativa) return;
        // 404 também quando o profissional foi desativado
        if (resposta.status === 404) {
          setErro("Este profissional não está mais disponível.");
        } else if (!resposta.ok || !json.success) {
          setErro(json.message ?? "Não foi possível carregar o profissional.");
        } else {
          setProfissional(json.data);
        }
      } catch (e) {
        console.log("Erro ao buscar o profissional:", e);
        if (ativa) setErro("Não foi possível conectar ao servidor.");
      }
    })();
    return () => {
      ativa = false;
    };
  }, [id]);

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/agenda");
    }
  }

  // Linhas do card; cada uma só aparece com o dado preenchido
  function linhasDoCard(p: Profissional) {
    return [
      p.categoria_principal && {
        rotulo: "Categoria",
        valor: p.categoria_principal.categoria,
        icone: require("@/assets/images/img/bandeiravermelha.png"),
      },
      p.tempo_na_aacj && {
        rotulo: "Tempo na AACJ",
        valor: p.tempo_na_aacj.texto,
        icone: require("@/assets/images/img/clockvermelho.png"),
      },
      p.licenca && {
        rotulo: "Licença",
        valor: p.licenca,
        icone: require("@/assets/images/img/escudovermelho.png"),
      },
      p.especialidade && {
        rotulo: "Especialidade",
        valor: p.especialidade,
        icone: require("@/assets/images/img/coracaoVermelho.png"),
      },
    ].filter((linha) => !!linha);
  }

  let conteudo;
  if (erro) {
    conteudo = <Text style={comissaoTecnicaStyle.estadoTexto}>{erro}</Text>;
  } else if (!profissional) {
    conteudo = (
      <Text style={comissaoTecnicaStyle.estadoTexto}>
        Carregando profissional...
      </Text>
    );
  } else {
    const p = profissional;
    const linhas = linhasDoCard(p);
    const telefone = p.contato?.telefone;
    const email = p.contato?.email;

    conteudo = (
      <>
        <View style={comissaoTecnicaStyle.profileSection}>
          <View style={comissaoTecnicaStyle.avatarCircle}>
            {p.foto_url ? (
              <Image
                source={{ uri: p.foto_url }}
                style={comissaoTecnicaStyle.avatarFoto}
                resizeMode="cover"
              />
            ) : (
              <Image
                source={require("@/assets/images/img/perfilbranco.png")}
                style={comissaoTecnicaStyle.avatarIcon}
                resizeMode="contain"
              />
            )}
          </View>
          <View style={comissaoTecnicaStyle.profileTextCol}>
            <Text style={comissaoTecnicaStyle.profileName} numberOfLines={2}>
              {p.nome}
            </Text>
            {p.cargo_label && (
              <Text style={comissaoTecnicaStyle.profileRole}>
                {p.cargo_label}
              </Text>
            )}
          </View>
        </View>

        <View style={comissaoTecnicaStyle.detailsCard}>
          {linhas.map((linha, i) => (
            <View
              key={linha.rotulo}
              style={[
                comissaoTecnicaStyle.detailsRow,
                i > 0 && comissaoTecnicaStyle.detailsRowDivider,
              ]}
            >
              <View>
                <Image
                  source={linha.icone}
                  style={comissaoTecnicaStyle.detailsIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={comissaoTecnicaStyle.detailsTextCol}>
                <Text style={comissaoTecnicaStyle.detailsLabel}>
                  {linha.rotulo}
                </Text>
                <Text style={comissaoTecnicaStyle.detailsValue}>
                  {linha.valor}
                </Text>
              </View>
            </View>
          ))}

          {p.categorias_atendidas.length > 0 && (
            <View
              style={[
                comissaoTecnicaStyle.detailsRow,
                linhas.length > 0 && comissaoTecnicaStyle.detailsRowDivider,
              ]}
            >
              <View>
                <Image
                  source={require("@/assets/images/img/alvovermelho.png")}
                  style={comissaoTecnicaStyle.detailsIcon}
                  resizeMode="contain"
                />
              </View>
              <View style={comissaoTecnicaStyle.detailsTextCol}>
                <Text style={comissaoTecnicaStyle.detailsValue}>
                  Categorias atendidas
                </Text>
                {/* A principal fica destacada */}
                <View style={comissaoTecnicaStyle.categoriesRow}>
                  {p.categorias_atendidas.map((categoria) => {
                    const ativo =
                      categoria.id_categoria ===
                      p.categoria_principal?.id_categoria;
                    return (
                      <View
                        key={categoria.id_categoria}
                        style={[
                          comissaoTecnicaStyle.categoryPill,
                          ativo && comissaoTecnicaStyle.categoryPillActive,
                        ]}
                      >
                        <Text
                          style={[
                            comissaoTecnicaStyle.categoryPillText,
                            ativo && comissaoTecnicaStyle.categoryPillTextActive,
                          ]}
                        >
                          {categoria.categoria}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Só o contato institucional; null quando não há telefone nem e-mail */}
        {p.contato && (
          <View style={comissaoTecnicaStyle.contatoSection}>
            <Text style={comissaoTecnicaStyle.contatoTitle}>
              Contato Institucional
            </Text>

            {telefone && (
              <Pressable
                style={comissaoTecnicaStyle.contatoRow}
                onPress={() =>
                  Linking.openURL(`tel:${telefone.replace(/[^\d+]/g, "")}`)
                }
                accessibilityRole="link"
              >
                <Image
                  source={require("@/assets/images/img/telefonevermelho.png")}
                  style={comissaoTecnicaStyle.contatoIcon}
                  resizeMode="contain"
                />
                <View style={comissaoTecnicaStyle.contatoTextCol}>
                  <Text style={comissaoTecnicaStyle.contatoLabel}>Telefone</Text>
                  <Text style={comissaoTecnicaStyle.contatoValue}>
                    {exibirTelefone(telefone)}
                  </Text>
                </View>
              </Pressable>
            )}

            {email && (
              <Pressable
                style={comissaoTecnicaStyle.contatoRow}
                onPress={() => Linking.openURL(`mailto:${email}`)}
                accessibilityRole="link"
              >
                <Image
                  source={require("@/assets/images/img/email.png")}
                  style={comissaoTecnicaStyle.contatoIcon}
                  resizeMode="contain"
                />
                <View style={comissaoTecnicaStyle.contatoTextCol}>
                  <Text style={comissaoTecnicaStyle.contatoLabel}>E-mail</Text>
                  <Text style={comissaoTecnicaStyle.contatoValue}>{email}</Text>
                </View>
              </Pressable>
            )}
          </View>
        )}
      </>
    );
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
        contentContainerStyle={{
          paddingBottom: TAB_BAR_BASE_PADDING_BOTTOM + insets.bottom + 24,
        }}
      >
        <View style={comissaoTecnicaStyle.header}>
          <View style={comissaoTecnicaStyle.headerTopRow}>
            <Pressable
              style={comissaoTecnicaStyle.backButton}
              onPress={voltar}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={comissaoTecnicaStyle.backChevron}>‹</Text>
            </Pressable>
            <Text style={comissaoTecnicaStyle.headerTitle} pointerEvents="none">
              Comissão Técnica
            </Text>
            <View style={comissaoTecnicaStyle.headerIconsRow}>
              <View style={comissaoTecnicaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={comissaoTecnicaStyle.headerIcon}
                  resizeMode="contain"
                />
              </View>
              <BotaoNotificacoes abaAtiva="agenda" />
            </View>
          </View>
        </View>

        {conteudo}
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="agenda" />
    </View>
  );
}
