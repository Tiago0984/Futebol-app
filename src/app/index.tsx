import { Image } from "expo-image";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import preloaderStyle from "@/styles/preloaderStyle";
import fundoStyle from "@/styles/fundoStyle";

export default function Index() {
  const insets = useSafeAreaInsets();

  const [fadeAnim] = useState(() => new Animated.Value(0));
  const [scaleAnim] = useState(() => new Animated.Value(0.92));
  const [progressAnim] = useState(() => new Animated.Value(0));

  useEffect(() => {
    const animacao = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),

      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        tension: 45,
        useNativeDriver: true,
      }),

      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 1800,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }),
    ]);
    animacao.start();

    return () => animacao.stop();
  }, [fadeAnim, scaleAnim, progressAnim]);

  useFocusEffect(
    useCallback(() => {
      let ativa = true;
      const timer = setTimeout(async () => {
        try {
          const [token, perfil, atleta] = await Promise.all([
            AsyncStorage.getItem("token"),
            AsyncStorage.getItem("perfil"),
            AsyncStorage.getItem("atleta_selecionado"),
          ]);
          // O toque no push pode abrir outra tela enquanto a sessão é lida.
          if (!ativa) return;
          const destino = !token
            ? "/selecao-perfil"
            : perfil === "responsavel" && !atleta
              ? "/escolha-atleta"
              : "/home";
          router.replace(destino);
        } catch {
          if (ativa) router.replace("/selecao-perfil");
        }
      }, 2000);

      return () => {
        ativa = false;
        clearTimeout(timer);
      };
    }, []),
  );

  return (
    <View style={fundoStyle.container}>
      <View style={preloaderStyle.container}>
        <View style={preloaderStyle.content}>
          {/* Logo AACJ */}
          <Animated.View
            style={[
              preloaderStyle.logoContainer,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    scale: scaleAnim,
                  },
                ],
              },
            ]}
          >
            <Image
              source={require("@/assets/images/img/logo/logo-aacj.png")}
              style={preloaderStyle.logo}
              contentFit="contain"
            />
          </Animated.View>

          {/* Nome da instituição */}
          <Animated.View
            style={{
              opacity: fadeAnim,
            }}
          >
            <Text style={preloaderStyle.titulo}>Centro de Formação</Text>

            <Text style={preloaderStyle.subtitulo}>DE ATLETAS</Text>
          </Animated.View>

          {/* Barra de carregamento */}
          <View style={preloaderStyle.progressContainer}>
            <Animated.View
              style={[
                preloaderStyle.progressBar,
                {
                  width: progressAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>

        {/* Rodapé */}
        <Animated.View
          style={[
            preloaderStyle.footer,
            {
              opacity: fadeAnim,
              bottom: 45 + insets.bottom,
            },
          ]}
        >
          <Text style={preloaderStyle.footerText}>DESDE 2001</Text>
        </Animated.View>
      </View>
    </View>
  );
}
