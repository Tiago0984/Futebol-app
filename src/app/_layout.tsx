import { Stack } from "expo-router";
import { useFonts } from "expo-font";

import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export const fontesCarregar = {
    
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts(fontesCarregar);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
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