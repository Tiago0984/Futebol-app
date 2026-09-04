import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Animated, Easing, Text, View } from "react-native";
import { router } from "expo-router";

import preloaderStyle from "@/styles/preloaderStyle";
import fundoStyle from "@/styles/fundoStyle";

export default function Index() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.92)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
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
    ]).start();

    /*
     * Após o carregamento, direciona
     * para a seleção de perfil.
     */
    const timer = setTimeout(() => {
      router.replace("/selecao-perfil");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={fundoStyle.container}>
      <View style={preloaderStyle.container}>
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

        {/* Rodapé */}
        <Animated.View
          style={[
            preloaderStyle.footer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={preloaderStyle.footerText}>DESDE 2001</Text>
        </Animated.View>
      </View>
    </View>
  );
}
