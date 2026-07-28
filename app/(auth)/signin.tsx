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

export default function SigninScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

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
            <Text className="text-5xl text-accent mb-3 font-manrope-extrabold tracking-tighter">
              AnonChat
            </Text>
            <Text className="text-base text-center text-muted-foreground font-manrope">
              Enter the void. Leave no trace.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View className="w-full bg-card/60 rounded-2xl border border-border px-5 py-6">
            {/* Email */}
            <Text className="text-sm text-foreground font-manrope-semibold mb-2 ml-1">
              Username / Email
            </Text>
            <View
              className={`flex-row items-center bg-card rounded-xl border px-4 h-14 mb-5 ${
                emailFocused ? "border-accent" : "border-border"
              }`}
            >
              <Feather
                name="user"
                size={18}
                color={emailFocused ? "#F5C440" : "#6b6b6b"}
              />
              <TextInput
                className="flex-1 ml-3 text-foreground font-manrope text-base"
                placeholder="Ghost in the machine"
                placeholderTextColor="hsl(30 6% 60%)"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            {/* Password */}
            <Text className="text-sm text-foreground font-manrope-semibold mb-2 ml-1">
              Password
            </Text>
            <View
              className={`flex-row items-center bg-card rounded-xl border px-4 h-14 ${
                passwordFocused ? "border-accent" : "border-border"
              }`}
            >
              <Feather
                name="key"
                size={18}
                color={passwordFocused ? "#F5C440" : "#6b6b6b"}
              />
              <TextInput
                className="flex-1 ml-3 text-foreground font-manrope text-base"
                placeholder="••••••••••••"
                placeholderTextColor="hsl(30 6% 60%)"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry={!showPassword}
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                hitSlop={12}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#6b6b6b"
                />
              </Pressable>
            </View>

            {/* Sign In Button */}
            <Pressable className="bg-accent rounded-full h-14 items-center justify-center mt-8">
              <Text className="text-accent-foreground font-manrope-bold text-base tracking-widest">
                SIGN IN
              </Text>
            </Pressable>
          </View>

          {/* ── Footer Links ── */}
          <View className="items-center mt-8 gap-3">
            <Link href="/(auth)/signup" asChild>
              <Pressable>
                <Text className="text-accent font-manrope text-sm">
                  Don&apos;t have an account?{" "}
                  <Text className="font-manrope-bold">Sign Up</Text>
                </Text>
              </Pressable>
            </Link>

            <Link href="/(auth)/reset-password" asChild>
              <Pressable>
                <Text className="text-muted-foreground font-manrope text-sm">
                  Forgot Password?
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
