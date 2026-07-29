import { SplashScreen, Stack } from "expo-router";
import "@/global.css";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "font-regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "font-medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "font-semibold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "font-bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "font-extrabold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
    "font-extralight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "font-light": require("../assets/fonts/Manrope-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
