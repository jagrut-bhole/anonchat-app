import "@/global.css";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { Text } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

export default function LandingScreen() {
  const SafeAreaView = styled(RNSafeAreaView);
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-5xl font-manrope-extrabold">Anonchat</Text>
      <Text className="text-xl font-bold text-success">
        Welcome to Anonchat!!
      </Text>
      <Link
        className="self-center bg-black text-center h-12 w-32 rounded-full"
        href="/signin"
      >
        <Text className="text-white text-xl font-bold mt-4">CLick Here</Text>
      </Link>
    </SafeAreaView>
  );
}
