import TabBar from "@/components/tabBar";
import editarPerfilStyle from "@/styles/editarPerfilStyle";
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

export default function EditarPerfil() {
  const insets = useSafeAreaInsets();
  const [nomeCompleto, setNomeCompleto] = useState("João Silva");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [email, setEmail] = useState("joãosilva123@gmail.com");
  const [salvoComSucesso, setSalvoComSucesso] = useState(false);

  function handleSalvar() {
    setSalvoComSucesso(true);
    setTimeout(() => setSalvoComSucesso(false), 2500);
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
      >
        {/* HEADER */}
        <View style={editarPerfilStyle.header}>
          <View style={editarPerfilStyle.headerTopRow}>
            <Pressable
              style={editarPerfilStyle.backButton}
              onPress={handleVoltar}
            >
              <Text style={editarPerfilStyle.backChevron}>‹</Text>
              <Text style={editarPerfilStyle.backText}>Voltar</Text>
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

              <View style={editarPerfilStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={editarPerfilStyle.headerIcon}
                  resizeMode="contain"
                />

                <View style={editarPerfilStyle.notificationBadge}>
                  <Text style={editarPerfilStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* FOTO */}
        <View style={editarPerfilStyle.photoSection}>
          <View style={editarPerfilStyle.avatarCircle}>
            <Image
              source={require("@/assets/images/img/userPreto.png")}
              style={editarPerfilStyle.avatarIcon}
              tintColor={cores.preto}
              resizeMode="contain"
            />

            <View style={editarPerfilStyle.cameraBadge}>
              <Image
                source={require("@/assets/images/img/camerablack.png")}
                style={editarPerfilStyle.cameraIcon}
                resizeMode="contain"
              />
            </View>
          </View>

          <Text style={editarPerfilStyle.changePhotoText}>Alterar foto</Text>
        </View>

        {/* FORMULÁRIO */}
        <View style={editarPerfilStyle.form}>
          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>Nome completo</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={nomeCompleto}
              onChangeText={setNomeCompleto}
            />
          </View>

          <View style={editarPerfilStyle.fieldCard}>
            <Text style={editarPerfilStyle.fieldLabel}>Telefone</Text>
            <TextInput
              style={editarPerfilStyle.fieldValue}
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
          </View>

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

          <View
            style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Responsável</Text>
            <Text
              style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
            >
              Maria Silva
            </Text>
          </View>

          <View
            style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Categoria</Text>
            <Text
              style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
            >
              Sub-17
            </Text>
          </View>

          <View
            style={[editarPerfilStyle.fieldCard, editarPerfilStyle.fieldCardDisabled]}
          >
            <Text style={editarPerfilStyle.fieldLabel}>Matrícula</Text>
            <Text
              style={[editarPerfilStyle.fieldValue, editarPerfilStyle.fieldValueDisabled]}
            >
              2026-0017
            </Text>
          </View>

          <Pressable style={editarPerfilStyle.saveButton} onPress={handleSalvar}>
            <Text style={editarPerfilStyle.saveButtonText}>
              Salvar alterações
            </Text>
          </Pressable>

          {salvoComSucesso && (
            <View style={editarPerfilStyle.successMessage}>
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={editarPerfilStyle.successIcon}
                resizeMode="contain"
              />

              <Text style={editarPerfilStyle.successText}>
                Informações atualizadas com sucesso
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* TabBar unificada */}
      <TabBar abaAtiva="perfil" />
    </View>
  );
}
