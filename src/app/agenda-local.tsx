import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import TabBar from "@/components/tabBar";
import agendaLocalStyle from "@/styles/agendaLocalStyle";
import fundoStyle from "@/styles/fundoStyle";
import { cores } from "@/styles/variaveis";

export default function AgendaLocal() {
  const [copiado, setCopiado] = useState(false);

  const endereco =
    "Av. Marechal Tito, 1500, São Miguel Paulista, São Paulo - SP, 08010-090";

  const mapsUrl =
    "https://www.google.com/maps/search/?api=1&query=Senac+São+Miguel+Paulista,+Av.+Marechal+Tito,+1500,+São+Paulo+-+SP,+08010-090";

  const abrirMapa = async () => {
    try {
      await Linking.openURL(mapsUrl);
    } catch {
      // Não faz nada caso o navegador não consiga abrir o link.
    }
  };

  const copiarEndereco = async () => {
    try {
      await navigator.clipboard.writeText(endereco);

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch {
      // Não faz nada caso o navegador bloqueie a área de transferência.
    }
  };

  const compartilharLocalizacao = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Local do treino",
          text: `Centro de formação AACJ\n${endereco}`,
          url: mapsUrl,
        });

        return;
      }

      await navigator.clipboard.writeText(
        `Centro de formação AACJ\n${endereco}\n${mapsUrl}`,
      );

      setCopiado(true);

      setTimeout(() => {
        setCopiado(false);
      }, 2000);
    } catch {
      // Usuário cancelou o compartilhamento.
    }
  };

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app.png")}
        style={fundoStyle.backgroundImage}
        contentFit="cover"
      />

      <View style={fundoStyle.backgroundOverlay} />

      <View style={agendaLocalStyle.container}>
        <ScrollView
          style={agendaLocalStyle.scrollView}
          contentContainerStyle={agendaLocalStyle.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={agendaLocalStyle.header}>
            <Pressable
              style={agendaLocalStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={agendaLocalStyle.backIcon}>‹</Text>

              <Text style={agendaLocalStyle.backText}>Voltar</Text>
            </Pressable>

            <Text style={agendaLocalStyle.headerTitle} pointerEvents="none">
              Local
            </Text>

            <View style={agendaLocalStyle.headerIcons}>
              <Pressable style={agendaLocalStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={agendaLocalStyle.headerIcon}
                  contentFit="contain"
                  tintColor={cores.branco}
                />
              </Pressable>

              <Pressable style={agendaLocalStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={agendaLocalStyle.headerIcon}
                  contentFit="contain"
                  tintColor={cores.branco}
                />

                <View style={agendaLocalStyle.notificationBadge}>
                  <Text style={agendaLocalStyle.notificationText}>2</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* MAPA */}
          <View style={agendaLocalStyle.mapContainer}>
            <iframe
              src="https://www.google.com/maps?q=Senac+São+Miguel+Paulista,+Av.+Marechal+Tito,+1500,+São+Paulo+-+SP,+08010-090&output=embed"
              style={{
                width: "100%",
                height: "100%",
                border: 0,
              }}
              loading="lazy"
              allowFullScreen
              title="Local do treino"
            />
          </View>

          {/* INFORMAÇÕES DO LOCAL */}
          <View style={agendaLocalStyle.locationCard}>
            <Text style={agendaLocalStyle.locationTitle}>Campo principal</Text>

            <Text style={agendaLocalStyle.locationSubtitle}>
              Centro de formação AACJ
            </Text>

            <View style={agendaLocalStyle.addressRow}>
              <Image
                source={require("@/assets/images/img/localizacaoCinza.png")}
                style={agendaLocalStyle.locationIcon}
                contentFit="contain"
                tintColor={cores.cinza}
              />

              <Text style={agendaLocalStyle.addressText}>{endereco}</Text>
            </View>
          </View>

          {/* AÇÕES */}
          <View style={agendaLocalStyle.actionsSection}>
            <Text style={agendaLocalStyle.sectionTitle}>Ações</Text>

            <View style={agendaLocalStyle.actionsCard}>
              {/* ABRIR NO MAPA */}
              <Pressable style={agendaLocalStyle.actionRow} onPress={abrirMapa}>
                <View style={agendaLocalStyle.actionIconContainer}>
                  <Image
                    source={require("@/assets/images/img/localizacaoVermelho.png")}
                    style={agendaLocalStyle.actionIcon}
                    contentFit="contain"
                    tintColor={cores.vermelho}
                  />
                </View>

                <View style={agendaLocalStyle.actionContent}>
                  <Text style={agendaLocalStyle.actionTitle}>
                    Abrir no mapa
                  </Text>

                  <Text style={agendaLocalStyle.actionDescription}>
                    Ver rota e localização
                  </Text>
                </View>

                <Text style={agendaLocalStyle.actionArrow}>›</Text>
              </Pressable>

              <View style={agendaLocalStyle.actionDivider} />

              {/* COPIAR ENDEREÇO */}
              <Pressable
                style={agendaLocalStyle.actionRow}
                onPress={copiarEndereco}
              >
                <View style={agendaLocalStyle.actionIconContainer}>
                  <Image
                    style={agendaLocalStyle.copyIcon}
                    source={require("@/assets/images/img/copy.png")}
                    contentFit="contain"
                    tintColor={cores.vermelho}
                  />
                </View>

                <View style={agendaLocalStyle.actionContent}>
                  <Text style={agendaLocalStyle.actionTitle}>
                    {copiado ? "Endereço copiado!" : "Copiar endereço"}
                  </Text>

                  <Text style={agendaLocalStyle.actionDescription}>
                    Copiar endereço para a área de transferência
                  </Text>
                </View>

                <Text style={agendaLocalStyle.actionArrow}>›</Text>
              </Pressable>

              <View style={agendaLocalStyle.actionDivider} />

              {/* COMPARTILHAR */}
              <Pressable
                style={agendaLocalStyle.actionRow}
                onPress={compartilharLocalizacao}
              >
                <View style={agendaLocalStyle.actionIconContainer}>
                  <Image
                    style={agendaLocalStyle.shareIcon}
                    source={require("@/assets/images/img/compartilharVermelho.png")}
                    contentFit="contain"
                    tintColor={cores.vermelho}
                  />
                </View>

                <View style={agendaLocalStyle.actionContent}>
                  <Text style={agendaLocalStyle.actionTitle}>
                    Compartilhar localização
                  </Text>

                  <Text style={agendaLocalStyle.actionDescription}>
                    Enviar local para outra pessoa
                  </Text>
                </View>

                <Text style={agendaLocalStyle.actionArrow}>›</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* TabBar unificada */}
        <TabBar abaAtiva="agenda" />
      </View>
    </View>
  );
}
