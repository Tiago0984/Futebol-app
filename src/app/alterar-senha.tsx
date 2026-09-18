import TabBar from "@/components/tabBar";
import alterarSenhaStyle from "@/styles/alterarSenhaStyle";
import fundoStyle from "@/styles/fundoStyle";
import { TAB_BAR_BASE_PADDING_BOTTOM } from "@/styles/menuInferiorStyle";
import { cores } from "@/styles/variaveis";
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
            >
              <Text style={alterarSenhaStyle.backChevron}>‹</Text>
              <Text style={alterarSenhaStyle.backText}>Voltar</Text>
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

              <View style={alterarSenhaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={alterarSenhaStyle.headerIcon}
                  resizeMode="contain"
                />

                <View style={alterarSenhaStyle.notificationBadge}>
                  <Text style={alterarSenhaStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
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

          <View style={alterarSenhaStyle.requirementRow}>
            <Image
              source={require("@/assets/images/img/checkVerde.png")}
              style={alterarSenhaStyle.requirementCheckIcon}
              resizeMode="contain"
            />

            <Text style={alterarSenhaStyle.requirementTextMet}>
              Minimo 8 caracteres
            </Text>
          </View>

          <View style={alterarSenhaStyle.requirementRow}>
            <Image
              source={require("@/assets/images/img/checkVerde.png")}
              style={alterarSenhaStyle.requirementCheckIcon}
              resizeMode="contain"
            />

            <Text style={alterarSenhaStyle.requirementTextMet}>
              Uma letra maiúscula
            </Text>
          </View>

          <View style={alterarSenhaStyle.requirementRow}>
            <Image
              source={require("@/assets/images/img/checkVerde.png")}
              style={alterarSenhaStyle.requirementCheckIcon}
              resizeMode="contain"
            />

            <Text style={alterarSenhaStyle.requirementTextMet}>
              Um número
            </Text>
          </View>

          <View style={alterarSenhaStyle.requirementRow}>
            <View style={alterarSenhaStyle.requirementRadioOuter}>
              <View style={alterarSenhaStyle.requirementRadioDot} />
            </View>

            <Text style={alterarSenhaStyle.requirementTextPending}>
              Uma senha forte
            </Text>
          </View>
        </View>

        {/* SALVAR */}
        <View style={alterarSenhaStyle.saveSection}>
          <Pressable style={alterarSenhaStyle.saveButton} disabled>
            <Text style={alterarSenhaStyle.saveButtonText}>
              Alterar senha
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
