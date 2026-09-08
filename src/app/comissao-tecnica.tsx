import comissaoTecnicaStyle from "@/styles/comissaoTecnicaStyle";
import fundoStyle from "@/styles/fundoStyle";
import menuInferiorStyle from "@/styles/menuInferiorStyle";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Image, Pressable, ScrollView, Text, View } from "react-native";

const categoriasAtendidas = [
  { label: "Sub-13", ativo: false },
  { label: "Sub-15", ativo: true },
  { label: "Sub-17", ativo: false },
];

export default function ComissaoTecnica() {
  const indicadorAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(indicadorAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [indicadorAnim]);

  return (
    <View style={fundoStyle.container}>
      <Image
        source={require("@/assets/images/img/background-aacj-app1.png")}
        style={fundoStyle.backgroundImage}
        resizeMode="cover"
      />
      <View style={fundoStyle.backgroundOverlay} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={comissaoTecnicaStyle.scrollContent}
      >
        <View style={comissaoTecnicaStyle.header}>
          <View style={comissaoTecnicaStyle.headerTopRow}>
            <Pressable
              style={comissaoTecnicaStyle.backButton}
              onPress={() => router.back()}
            >
              <Text style={comissaoTecnicaStyle.backChevron}>‹</Text>
              <Text style={comissaoTecnicaStyle.backText}>Voltar</Text>
            </Pressable>
            <Text style={comissaoTecnicaStyle.headerTitle}>
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
              <View style={comissaoTecnicaStyle.headerIconButton}>
                <Image
                  source={require("@/assets/images/img/sinoBranco.png")}
                  style={comissaoTecnicaStyle.headerIcon}
                  resizeMode="contain"
                />
                <View style={comissaoTecnicaStyle.notificationBadge}>
                  <Text style={comissaoTecnicaStyle.notificationBadgeText}>
                    2
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={comissaoTecnicaStyle.profileSection}>
          <View style={comissaoTecnicaStyle.avatarCircle}>
            <Image
              source={require("@/assets/images/img/perfilbranco.png")}
              style={comissaoTecnicaStyle.avatarIcon}
              resizeMode="contain"
            />
          </View>
          <View style={comissaoTecnicaStyle.profileTextCol}>
            <Text style={comissaoTecnicaStyle.profileName}>
              Professor João Silva
            </Text>
            <Text style={comissaoTecnicaStyle.profileRole}>
              Treinador técnico
            </Text>
            <View style={comissaoTecnicaStyle.confirmedPill}>
              <Image
                source={require("@/assets/images/img/checkVerde.png")}
                style={comissaoTecnicaStyle.confirmedIcon}
                resizeMode="contain"
              />
              <Text style={comissaoTecnicaStyle.confirmedText}>
                Confirmado
              </Text>
            </View>
          </View>
        </View>

        <View style={comissaoTecnicaStyle.detailsCard}>
          <View style={comissaoTecnicaStyle.detailsRow}>
            <View style={comissaoTecnicaStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/bandeiravermelha.png")}
                style={comissaoTecnicaStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={comissaoTecnicaStyle.detailsTextCol}>
              <Text style={comissaoTecnicaStyle.detailsLabel}>Categoria</Text>
              <Text style={comissaoTecnicaStyle.detailsValue}>Sub-17</Text>
            </View>
          </View>

          <View
            style={[
              comissaoTecnicaStyle.detailsRow,
              comissaoTecnicaStyle.detailsRowDivider,
            ]}
          >
            <View style={comissaoTecnicaStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/clockvermelho.png")}
                style={comissaoTecnicaStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={comissaoTecnicaStyle.detailsTextCol}>
              <Text style={comissaoTecnicaStyle.detailsLabel}>
                Tempo na AACJ
              </Text>
              <Text style={comissaoTecnicaStyle.detailsValue}>5 anos</Text>
            </View>
          </View>

          <View
            style={[
              comissaoTecnicaStyle.detailsRow,
              comissaoTecnicaStyle.detailsRowDivider,
            ]}
          >
            <View style={comissaoTecnicaStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/escudovermelho.png")}
                style={comissaoTecnicaStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={comissaoTecnicaStyle.detailsTextCol}>
              <Text style={comissaoTecnicaStyle.detailsLabel}>Licença</Text>
              <Text style={comissaoTecnicaStyle.detailsValue}>
                CBF Academy
              </Text>
            </View>
          </View>

          <View
            style={[
              comissaoTecnicaStyle.detailsRow,
              comissaoTecnicaStyle.detailsRowDivider,
            ]}
          >
            <View style={comissaoTecnicaStyle.detailsIconSquare}>
              <Image
                source={require("@/assets/images/img/coracaoVermelho.png")}
                style={comissaoTecnicaStyle.detailsIcon}
                resizeMode="contain"
              />
            </View>
            <View style={comissaoTecnicaStyle.detailsTextCol}>
              <Text style={comissaoTecnicaStyle.detailsLabel}>
                Especialidade
              </Text>
              <Text style={comissaoTecnicaStyle.detailsValue}>
                Treinamento técnico
              </Text>
            </View>
          </View>

          <View
            style={[
              comissaoTecnicaStyle.detailsRow,
              comissaoTecnicaStyle.detailsRowDivider,
            ]}
          >
            <View style={comissaoTecnicaStyle.detailsIconSquare}>
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
              <View style={comissaoTecnicaStyle.categoriesRow}>
                {categoriasAtendidas.map((categoria) => (
                  <View
                    key={categoria.label}
                    style={[
                      comissaoTecnicaStyle.categoryPill,
                      categoria.ativo && comissaoTecnicaStyle.categoryPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        comissaoTecnicaStyle.categoryPillText,
                        categoria.ativo &&
                          comissaoTecnicaStyle.categoryPillTextActive,
                      ]}
                    >
                      {categoria.label}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={comissaoTecnicaStyle.contatoSection}>
          <Text style={comissaoTecnicaStyle.contatoTitle}>
            Contato Institucional
          </Text>

          <View style={comissaoTecnicaStyle.contatoRow}>
            <Image
              source={require("@/assets/images/img/telefonevermelho.png")}
              style={comissaoTecnicaStyle.contatoIcon}
              resizeMode="contain"
            />
            <View style={comissaoTecnicaStyle.contatoTextCol}>
              <Text style={comissaoTecnicaStyle.contatoLabel}>Telefone</Text>
              <Text style={comissaoTecnicaStyle.contatoValue}>
                (11) 99999-9999
              </Text>
            </View>
          </View>

          <View style={comissaoTecnicaStyle.contatoRow}>
            <Image
              source={require("@/assets/images/img/email.png")}
              style={comissaoTecnicaStyle.contatoIcon}
              resizeMode="contain"
            />
            <View style={comissaoTecnicaStyle.contatoTextCol}>
              <Text style={comissaoTecnicaStyle.contatoLabel}>E-mail</Text>
              <Text style={comissaoTecnicaStyle.contatoValue}>
                joao.silva@aacj.com.br
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={menuInferiorStyle.tabBar}>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/home")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/homeBranca.png")}
            style={menuInferiorStyle.tabIcon}
            tintColor="#FFFFFF"
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Home</Text>
        </Pressable>
        <View style={menuInferiorStyle.tabItem}>
          <Animated.View
            style={[
              menuInferiorStyle.tabIndicator,
              menuInferiorStyle.tabIndicatorActive,
              {
                opacity: indicadorAnim,
                transform: [{ scaleX: indicadorAnim }],
              },
            ]}
          />
          <Image
            source={require("@/assets/images/img/agendaVermelha.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabelActive}>Agenda</Text>
        </View>
        <Pressable
          style={menuInferiorStyle.tabItem}
          onPress={() => router.navigate("/campeonatos")}
        >
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/campeonatosbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Campeonatos</Text>
        </Pressable>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/desempenhoBranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Desempenho</Text>
        </View>
        <View style={menuInferiorStyle.tabItem}>
          <View style={menuInferiorStyle.tabIndicator} />
          <Image
            source={require("@/assets/images/img/perfilbranco.png")}
            style={menuInferiorStyle.tabIcon}
            resizeMode="contain"
          />
          <Text style={menuInferiorStyle.tabLabel}>Usuário</Text>
        </View>
      </View>
    </View>
  );
}
