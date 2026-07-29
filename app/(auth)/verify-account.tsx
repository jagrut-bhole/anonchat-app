import GlowBackground from "@/components/landingScreen/GlowBackground";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

const OTP_LENGTH = 6;

export default function VerifyAccountScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));

  const [focusedIndex, setFocusedIndex] = useState<number | null>(0);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    // Only accept single digit
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    // Go back on backspace when current cell is empty
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-background"
      edges={["left", "right", "bottom"]}
    >
      <GlowBackground />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
            paddingTop: 40,
            paddingBottom: 40,
          }}
        >
          {/* ── Header ── */}
          <View className="items-center mb-12">
            <Text className="text-3xl text-foreground mb-3 font-manrope-extrabold tracking-tight">
              Verify your account
            </Text>
            <Text className="text-base text-center text-accent font-manrope">
              Enter the 6-digit code sent to your email.
            </Text>
          </View>

          {/* ── OTP Inputs ── */}
          <View className="flex-row justify-center gap-3 mb-4">
            {Array.from({ length: OTP_LENGTH }).map((_, index) => (
              <View
                key={index}
                className={`w-12 h-14 rounded-xl border items-center justify-center ${
                  focusedIndex === index
                    ? "border-accent bg-card"
                    : "border-border bg-card/60"
                }`}
              >
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={{
                    textAlign: "center",
                    color: "#f0f0f0",
                    fontSize: 20,
                    width: "100%",
                    height: "100%",
                    fontFamily: "font-bold",
                  }}
                  value={otp[index]}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  onFocus={() => setFocusedIndex(index)}
                  onBlur={() => setFocusedIndex(null)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                  autoFocus={index === 0}
                />
              </View>
            ))}
          </View>

          {/* ── Resend Code ── */}
          <Pressable className="flex-row items-center justify-center gap-2 mb-16">
            <Feather name="refresh-cw" size={14} color="hsl(30 6% 60%)" />
            <Text className="text-muted-foreground font-manrope text-sm">
              Resend code
            </Text>
          </Pressable>

          {/* ── Verify Button ── */}
          <Pressable 
            onPress={() => router.replace("/home")}
            className="w-full bg-accent rounded-full h-14 items-center justify-center">
            <Text className="text-accent-foreground font-manrope-bold text-base tracking-widest">
              VERIFY
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
