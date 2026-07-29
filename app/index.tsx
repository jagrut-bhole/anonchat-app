import "@/global.css";
import { mask } from "@/assets";
import GlowBackground from "@/components/landingScreen/GlowBackground";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LandingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-black relative justify-between">
      <StatusBar style="light" />
      <GlowBackground />

      {/* Main Hero Content (Centered) */}
      <View className="flex-1 justify-center items-center px-6">
        {/* Mask Image - used directly as requested, without any background div/box */}
        <Image
          source={mask}
          style={{ width: 450, height: 450 }}
          contentFit="contain"
          className="mb-6"
        />

        {/* App Title */}
        <Text
          className="text-6xl text-white font-manrope-extrabold tracking-tight mb-3 text-center"
          style={{ fontFamily: "font-extrabold" }}
        >
          Anonchat
        </Text>

        {/* Subtitle / Tagline */}
        <Text
          className="text-base text-zinc-400 font-manrope text-center max-w-65"
          style={{ fontFamily: "font-regular" }}
        >
          Anonymous conversations, completely unmasked.
        </Text>
      </View>

      {/* Bottom Action Buttons */}
      <View
        className="w-full px-6 gap-4"
        style={{ paddingBottom: Math.max(insets.bottom, 32) }}
      >
        {/* Sign Up Button (Primary Accent) */}
        <Pressable
          onPress={() => router.push("/(auth)/signup")}
          className="w-full h-14 bg-[#F5C440] rounded-full items-center justify-center active:opacity-90 shadow-lg"
        >
          <Text
            className="text-[#0e0e10] text-base font-manrope-bold tracking-wide"
            style={{ fontFamily: "font-bold" }}
          >
            Sign up
          </Text>
        </Pressable>

        {/* Login Button (Secondary Dark Glass) */}
        <Pressable
          onPress={() => router.push("/(auth)/signin")}
          className="w-full h-14 bg-zinc-900/90 border border-white/15 rounded-full items-center justify-center active:opacity-80"
        >
          <Text
            className="text-white text-base font-manrope-semibold tracking-wide"
            style={{ fontFamily: "font-semibold" }}
          >
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
}


