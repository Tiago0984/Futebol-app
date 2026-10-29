import { API } from "@/config/api";
import escolhaAtletaStyle from "@/styles/escolhaAtletaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";
import { CHAVES_SESSAO, sairDaConta } from "@/utils/sessao";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// GET /api/v1/responsavel/atletas: os filhos ATIVO do responsável logado
type AtletaDoResponsavel = {
  id_atleta: number;
  nome_atleta: string;
  numero_matricula_atleta: string | null;
  foto_url: string | null;
  notificacoes_nao_lidas: number;
};

export default function EscolhaAtleta() {
  const insets = useSafeAreaInsets();
  const [atletas, setAtletas] = useState<AtletaDoResponsavel[] | null>(null);
  const [erro, setErro] = useState("");
  const [saindo, setSaindo] = useState(false);

  const carregarAtletas = useCallback(async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      router.replace("/selecao-perfil");
      return;
    }
    try {
      const resposta = await fetch(`${API}/responsavel/atletas`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // Token vencido ou nenhum filho ativo: volta para o login
      if (resposta.status === 401 || resposta.status === 403) {
        await AsyncStorage.multiRemove(CHAVES_SESSAO);
        router.replace("/selecao-perfil");
        return;
      }

      const json = await resposta.json();
      if (json.success) {
        setAtletas(json.data);
        setErro("");
      } else {
        setErro(json.message ?? "Não foi possível carregar os atletas.");
      }
    } catch (falha) {
      console.log("Erro ao buscar os atletas do responsável:", falha);
      setErro("Não foi possível conectar ao servidor.");
    }
  }, []);

  // Recarrega ao voltar para a tela, para a contagem de avisos ficar em dia
  useFocusEffect(
    useCallback(() => {
      carregarAtletas();
    }, [carregarAtletas]),
  );

  function tentarDeNovo() {
    setErro("");
    carregarAtletas();
  }

  async function escolher(atleta: AtletaDoResponsavel) {
    await AsyncStorage.setItem("atleta_selecionado", String(atleta.id_atleta));
    // Fecha as telas abertas do atleta anterior antes de abrir a Home
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace("/home");
  }

  async function handleSair() {
    if (saindo) return;
    setSaindo(true);
    await sairDaConta();
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
          escolhaAtletaStyle.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Voltar só quando veio do Perfil; depois do login não há para onde voltar */}
        <View style={escolhaAtletaStyle.header}>
          {router.canGoBack() && (
            <Pressable
              style={escolhaAtletaStyle.backButton}
              onPress={() => router.back()}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel="Voltar"
            >
              <Text style={escolhaAtletaStyle.backChevron}>‹</Text>
            </Pressable>
          )}
        </View>

        <Image
          source={require("@/assets/images/img/logo/logo-aacj.png")}
          style={escolhaAtletaStyle.logo}
          resizeMode="contain"
        />
        <Text style={escolhaAtletaStyle.titulo}>Escolha o atleta</Text>
        <Text style={escolhaAtletaStyle.subtitulo}>
          De quem você quer ver a agenda e os avisos?
        </Text>

        {atletas === null && erro === "" && (
          <Text style={escolhaAtletaStyle.mensagem}>Carregando...</Text>
        )}

        {erro !== "" && (
          <>
            <Text style={escolhaAtletaStyle.mensagem}>{erro}</Text>
            <Pressable
              style={escolhaAtletaStyle.botaoTentar}
              onPress={tentarDeNovo}
            >
              <Text style={escolhaAtletaStyle.botaoTentarTexto}>
                Tentar de novo
              </Text>
            </Pressable>
          </>
        )}

        {(atletas ?? []).map((atleta) => (
          <Pressable
            key={atleta.id_atleta}
            style={({ pressed }) => [
              escolhaAtletaStyle.card,
              pressed && escolhaAtletaStyle.cardPressionado,
            ]}
            onPress={() => escolher(atleta)}
            accessibilityRole="button"
            accessibilityLabel={`Ver ${atleta.nome_atleta}`}
          >
            <View style={escolhaAtletaStyle.avatar}>
              {atleta.foto_url ? (
                <Image
                  source={{ uri: atleta.foto_url }}
                  style={escolhaAtletaStyle.avatarFoto}
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={require("@/assets/images/img/userPreto.png")}
                  style={escolhaAtletaStyle.avatarIcon}
                  tintColor={cores.preto}
                  resizeMode="contain"
                />
              )}
            </View>

            <View style={escolhaAtletaStyle.cardTextos}>
              <Text style={escolhaAtletaStyle.cardNome} numberOfLines={1}>
                {atleta.nome_atleta}
              </Text>
              {atleta.numero_matricula_atleta && (
                <Text style={escolhaAtletaStyle.cardDetalhe}>
                  Matrícula {atleta.numero_matricula_atleta}
                </Text>
              )}
            </View>

            {/* Avisos que este responsável ainda não leu */}
            {atleta.notificacoes_nao_lidas > 0 && (
              <View style={escolhaAtletaStyle.avisos}>
                <Text style={escolhaAtletaStyle.avisosTexto}>
                  {atleta.notificacoes_nao_lidas > 9
                    ? "9+"
                    : atleta.notificacoes_nao_lidas}
                </Text>
              </View>
            )}

            <Text style={escolhaAtletaStyle.seta}>›</Text>
          </Pressable>
        ))}

        <Pressable style={escolhaAtletaStyle.sair} onPress={handleSair}>
          <Text style={escolhaAtletaStyle.sairTexto}>Sair da conta</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
