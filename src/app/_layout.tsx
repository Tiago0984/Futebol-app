import { Stack } from "expo-router";

import { useFonts } from "expo-font";
import { OpenSans_700Bold, OpenSans_400Regular, OpenSans_600SemiBold } from "@expo-google-fonts/open-sans";
import { Oswald_700Bold, Oswald_400Regular } from "@expo-google-fonts/oswald";

import { useEffect } from "react";

import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const fontesCarregar = {
  OpenSans_700Bold, 
  OpenSans_400Regular, 
  OpenSans_600SemiBold,
  Oswald_400Regular,
  Oswald_700Bold,
};

export default function RootLayout() {
  const [fontesLoaded] = useFonts(fontesCarregar);

  useEffect(() => {
    if (fontesLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontesLoaded]);

  if (!fontesLoaded) {
    return null;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
