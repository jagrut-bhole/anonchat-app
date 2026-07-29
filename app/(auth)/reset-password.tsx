import GlowBackground from "@/components/landingScreen/GlowBackground";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
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

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);

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
          <View className="items-center mb-14">
            <Text className="text-4xl text-foreground mb-3 font-manrope-extrabold tracking-tight">
              Reset Access
            </Text>
            <Text className="text-base text-center text-accent font-manrope">
              Locked out of the void? Lets recover your link.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View className="w-full bg-card/60 rounded-2xl border border-border px-5 py-6">
            {/* Email */}
            <Text className="text-sm text-foreground font-manrope-semibold mb-2 ml-1">
              Registered Email
            </Text>
            <View
              className={`flex-row items-center bg-card rounded-xl border px-4 h-14 ${
                emailFocused ? "border-accent" : "border-border"
              }`}
            >
              <Feather
                name="mail"
                size={18}
                color={emailFocused ? "#F5C440" : "#6b6b6b"}
              />
              <TextInput
                style={{
                  flex: 1,
                  marginLeft: 12,
                  color: "#f0f0f0",
                  fontSize: 16,
                  fontFamily: "font-regular",
                }}
                placeholder="enter your email..."
                placeholderTextColor="hsl(30 6% 60%)"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Send OTP Button */}
            <Pressable className="bg-accent rounded-full h-14 items-center justify-center mt-8">
              <Text className="text-accent-foreground font-manrope-bold text-base tracking-widest">
                SEND OTP
              </Text>
            </Pressable>
          </View>

          {/* ── Footer Link ── */}
          <View className="items-center mt-8">
            <Link href="/(auth)/signin" asChild>
              <Pressable>
                <Text className="text-accent font-manrope text-sm">
                  Back to Sign In
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
