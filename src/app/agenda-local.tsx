import { useState } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  Share,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import AgendaLocalStyle from "@/styles/agendaLocalStyle";
import { variaveis } from "@/styles/variaveis";

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

      <View style={AgendaLocalStyle.container}>
        <ScrollView
          style={AgendaLocalStyle.scrollView}
          contentContainerStyle={AgendaLocalStyle.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={AgendaLocalStyle.header}>
            <Pressable
              style={AgendaLocalStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={AgendaLocalStyle.backIcon}>‹</Text>

              <Text style={AgendaLocalStyle.backText}>Voltar</Text>
            </Pressable>

            <Text style={AgendaLocalStyle.headerTitle}>Local</Text>

            <View style={AgendaLocalStyle.headerIcons}>
              <Pressable style={AgendaLocalStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/shoppingbranco.png")}
                  style={AgendaLocalStyle.headerIcon}
                  contentFit="contain"
                  tintColor={variaveis.branco}
                />
              </Pressable>

              <Pressable style={AgendaLocalStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={AgendaLocalStyle.headerIcon}
                  contentFit="contain"
                  tintColor={variaveis.branco}
                />

                <View style={AgendaLocalStyle.notificationBadge}>
                  <Text style={AgendaLocalStyle.notificationText}>2</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* MAPA */}
          <View style={AgendaLocalStyle.mapContainer}>
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
          <View style={AgendaLocalStyle.locationCard}>
            <Text style={AgendaLocalStyle.locationTitle}>
              Campo principal
            </Text>

            <Text style={AgendaLocalStyle.locationSubtitle}>
              Centro de formação AACJ
            </Text>

            <View style={AgendaLocalStyle.addressRow}>
              <Image
                source={require("@/assets/images/img/localizaçãocinza.png")}
                style={AgendaLocalStyle.locationIcon}
                contentFit="contain"
                tintColor={variaveis.cinza}
              />

              <Text style={AgendaLocalStyle.addressText}>{endereco}</Text>
            </View>
          </View>

          {/* AÇÕES */}
          <View style={AgendaLocalStyle.actionsSection}>
            <Text style={AgendaLocalStyle.sectionTitle}>Ações</Text>

            <View style={AgendaLocalStyle.actionsCard}>
              {/* ABRIR NO MAPA */}
              <Pressable
                style={AgendaLocalStyle.actionRow}
                onPress={abrirMapa}
              >
                <View style={AgendaLocalStyle.actionIconContainer}>
                  <Image
                    source={require("@/assets/images/img/localizaçãovermelho.png")}
                    style={AgendaLocalStyle.actionIcon}
                    contentFit="contain"
                    tintColor={variaveis.vermelho}
                  />
                </View>

                <View style={AgendaLocalStyle.actionContent}>
                  <Text style={AgendaLocalStyle.actionTitle}>
                    Abrir no mapa
                  </Text>

                  <Text style={AgendaLocalStyle.actionDescription}>
                    Ver rota e localização
                  </Text>
                </View>

                <Text style={AgendaLocalStyle.actionArrow}>›</Text>
              </Pressable>

              <View style={AgendaLocalStyle.actionDivider} />

              {/* COPIAR ENDEREÇO */}
              <Pressable
                style={AgendaLocalStyle.actionRow}
                onPress={copiarEndereco}
              >
                <View style={AgendaLocalStyle.actionIconContainer}>
                  <Image style={AgendaLocalStyle.copyIcon}
                    source={require("@/assets/images/img/copy.png")}
                    contentFit="contain"
                    tintColor={variaveis.vermelho}
                  />
                </View>

                <View style={AgendaLocalStyle.actionContent}>
                  <Text style={AgendaLocalStyle.actionTitle}>
                    {copiado ? "Endereço copiado!" : "Copiar endereço"}
                  </Text>

                  <Text style={AgendaLocalStyle.actionDescription}>
                    Copiar endereço para a área de transferência
                  </Text>
                </View>

                <Text style={AgendaLocalStyle.actionArrow}>›</Text>
              </Pressable>

              <View style={AgendaLocalStyle.actionDivider} />

              {/* COMPARTILHAR */}
              <Pressable
                style={AgendaLocalStyle.actionRow}
                onPress={compartilharLocalizacao}
              >
                <View style={AgendaLocalStyle.actionIconContainer}>
                  <Image style={AgendaLocalStyle.shareIcon}
                    source={require("@/assets/images/img/compartilharVermelho.png")}
                    contentFit="contain"
                    tintColor={variaveis.vermelho}
                  />
                </View>

                <View style={AgendaLocalStyle.actionContent}>
                  <Text style={AgendaLocalStyle.actionTitle}>
                    Compartilhar localização
                  </Text>

                  <Text style={AgendaLocalStyle.actionDescription}>
                    Enviar local para outra pessoa
                  </Text>
                </View>

                <Text style={AgendaLocalStyle.actionArrow}>›</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>

        {/* MENU INFERIOR */}
        <View style={menuInferiorStyle.tabBar}>
          <Pressable
            style={menuInferiorStyle.tabItem}
            onPress={() => router.navigate("/home")}
          >
            <View style={menuInferiorStyle.tabIndicator} />

            <Image
              source={require("@/assets/images/img/homeBranca.png")}
              style={menuInferiorStyle.tabIcon}
              contentFit="contain"
              tintColor={variaveis.branco}
            />

            <Text style={menuInferiorStyle.tabLabel}>Início</Text>
          </Pressable>

          <Pressable
            style={menuInferiorStyle.tabItem}
            onPress={() => router.navigate("/agenda")}
          >
            <View
              style={[
                menuInferiorStyle.tabIndicator,
                menuInferiorStyle.tabIndicatorActive,
              ]}
            />

            <Image
              source={require("@/assets/images/img/agendaBranca.png")}
              style={menuInferiorStyle.tabIcon}
              contentFit="contain"
              tintColor={variaveis.vermelho}
            />

            <Text style={menuInferiorStyle.tabLabelActive}>Agenda</Text>
          </Pressable>

          <Pressable style={menuInferiorStyle.tabItem}>
            <View style={menuInferiorStyle.tabIndicator} />

            <Image
              source={require("@/assets/images/img/campeonatosbranco.png")}
              style={menuInferiorStyle.tabIcon}
              contentFit="contain"
              tintColor={variaveis.branco}
            />

            <Text style={menuInferiorStyle.tabLabel}>Campeonatos</Text>
          </Pressable>

          <Pressable style={menuInferiorStyle.tabItem}>
            <View style={menuInferiorStyle.tabIndicator} />

            <Image
              source={require("@/assets/images/img/desempenhoBranco.png")}
              style={menuInferiorStyle.tabIcon}
              contentFit="contain"
              tintColor={variaveis.branco}
            />

            <Text style={menuInferiorStyle.tabLabel}>Desempenho</Text>
          </Pressable>

          <Pressable style={menuInferiorStyle.tabItem}>
            <View style={menuInferiorStyle.tabIndicator} />

            <Image
              source={require("@/assets/images/img/perfilbranco.png")}
              style={menuInferiorStyle.tabIcon}
              contentFit="contain"
              tintColor={variaveis.branco}
            />

            <Text style={menuInferiorStyle.tabLabel}>Perfil</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}