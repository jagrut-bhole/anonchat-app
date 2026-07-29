import { themeColors } from "@/constants/theme";
import { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  LinearGradient,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get("window");

// ════════════════════════════════════════════════════════════════════
// 🎛️ GLOW SETTINGS — this is the only place you should need to touch.
// Values below are exactly what you landed on in the playground.
// ════════════════════════════════════════════════════════════════════
export const GLOW_SETTINGS = {
  /** Orb color (hex). Swap this per theme. */
  color: themeColors.glow,

  /** 0–100 — matches the playground's "Glow intensity" slider. */
  glowIntensity: 40,

  /** 0–100 — matches the playground's "Orb size" slider. */
  orbSize: 80,

  /** 10–100 — matches the playground's "Blur amount" slider. */
  blurAmount: 100,

  /** Inflates every orb's radius so the fade never visibly clips at the
   * screen edge — independent of blurAmount, leave this alone unless
   * you're seeing hard edges. */
  spreadMultiplier: 2,
};

// ════════════════════════════════════════════════════════════════════
// 🧮 Derived values, computed from GLOW_SETTINGS — kept as a pure
// function so you can experiment (e.g. in a debug screen) without
// touching the component below.
// ════════════════════════════════════════════════════════════════════
function computeGlowValues(settings: typeof GLOW_SETTINGS) {
  const intensity = settings.glowIntensity / 100;
  const sizePct = settings.orbSize / 100;
  const blurPct = Math.min(Math.max(settings.blurAmount, 10), 100) / 100;

  // Same opacity curve the HTML playground used, so "40%" here reads
  // identically to what you previewed there (works out to 0.57 core).
  const mainCore = 0.35 + intensity * 0.55;
  const secCore = mainCore * 0.7;
  const terCore = mainCore * 0.55;

  // React Native can't apply a real CSS blur() to an SVG shape the way a
  // browser can, so "blur amount" instead widens how gradually the radial
  // gradient fades to transparent — that's what reads as "more blurred"
  // on a real device. Higher blurAmount = the fade starts later and ends
  // further out = softer edge.
  const falloffMid = 30 + blurPct * 25; // 32.5%–55%
  const falloffEnd = 60 + blurPct * 30; // 63%–90%

  return {
    sizePct,
    mainCore,
    secCore,
    terCore,
    falloffMid,
    falloffEnd,
    rgb: hexToRgb(settings.color),
    spread: settings.spreadMultiplier,
  };
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) || 245;
  const g = parseInt(clean.slice(2, 4), 16) || 196;
  const b = parseInt(clean.slice(4, 6), 16) || 64;
  return `${r}, ${g}, ${b}`;
}

// Resting positions for the onboarding → auth handoff, in px offset from center.
const POSITIONS = {
  start: SCREEN_H * 0.25, // onboarding — orb sits lower
  end: -SCREEN_H * 0.05, // auth — orb settles near the top
};

interface GlowBackgroundProps {
  /**
   * 0→1 shared value, driven from your onboarding slider/pager, that
   * slides the orb from its low "start" position up to its "end" resting
   * spot. Omit it entirely on the auth screen — it'll just render at rest.
   */
  progress?: SharedValue<number>;
}

export default function GlowBackground({ progress }: GlowBackgroundProps) {
  const breathe = useSharedValue(0);

  useEffect(() => {
    // Slow breathing pulse — not fast, just a subtle aura motion.
    breathe.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 4200 }),
        withTiming(0, { duration: 4200 }),
      ),
      -1,
      true,
    );
  }, [breathe]);

  const values = computeGlowValues(GLOW_SETTINGS);
  const scaleFactor = SCREEN_W / 340;

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = progress
      ? interpolate(
          progress.value,
          [0, 1],
          [POSITIONS.start, POSITIONS.end],
          Extrapolate.CLAMP,
        )
      : POSITIONS.end;

    const scale = interpolate(breathe.value, [0, 1], [1, 1.06]);
    const opacity = interpolate(breathe.value, [0, 1], [0.9, 1]);

    return { transform: [{ translateY }, { scale }], opacity };
  });

  const mainR = (420 * scaleFactor * values.spread * values.sizePct) / 2;
  const secR = (220 * scaleFactor * values.spread * values.sizePct) / 2;
  const terR = (170 * scaleFactor * values.spread * values.sizePct) / 2;

  const mainCx = SCREEN_W / 2;
  const mainCy = 90 * scaleFactor + (420 * scaleFactor * values.sizePct) / 2;
  const secCx = SCREEN_W * 0.25;
  const secCy = 40 * scaleFactor + (220 * scaleFactor * values.sizePct) / 2;
  const terCx = SCREEN_W * 0.75;
  const terCy = 260 * scaleFactor + (170 * scaleFactor * values.sizePct) / 2;

  const { rgb, mainCore, secCore, terCore, falloffMid, falloffEnd } = values;

  return (
    <View className="absolute inset-0" pointerEvents="none">
      {/* ── Background gradient: #1C1000 → #0A0704 → #000000 ── */}
      <Svg width={SCREEN_W} height={SCREEN_H} style={StyleSheet.absoluteFill}>
        <Defs>
          <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <Stop offset="0%" stopColor="#1C1000" stopOpacity="1" />
            <Stop offset="45%" stopColor="#0A0704" stopOpacity="1" />
            <Stop offset="100%" stopColor="#000000" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect width={SCREEN_W} height={SCREEN_H} fill="url(#bgGrad)" />
      </Svg>

      {/* ── Glow orbs — softness driven by blurAmount, size by orbSize ── */}
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Svg width={SCREEN_W} height={SCREEN_H}>
          <Defs>
            <RadialGradient id="gMain" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={`rgb(${rgb})`} stopOpacity={mainCore} />
              <Stop offset={`${falloffMid}%`} stopColor={`rgb(${rgb})`} stopOpacity={mainCore * 0.3} />
              <Stop offset={`${falloffEnd}%`} stopColor={`rgb(${rgb})`} stopOpacity={0} />
              <Stop offset="100%" stopColor={`rgb(${rgb})`} stopOpacity={0} />
            </RadialGradient>

            <RadialGradient id="gSec" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={`rgb(${rgb})`} stopOpacity={secCore} />
              <Stop offset={`${falloffMid}%`} stopColor={`rgb(${rgb})`} stopOpacity={secCore * 0.3} />
              <Stop offset={`${falloffEnd}%`} stopColor={`rgb(${rgb})`} stopOpacity={0} />
              <Stop offset="100%" stopColor={`rgb(${rgb})`} stopOpacity={0} />
            </RadialGradient>

            <RadialGradient id="gTer" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor={`rgb(${rgb})`} stopOpacity={terCore} />
              <Stop offset={`${falloffMid}%`} stopColor={`rgb(${rgb})`} stopOpacity={terCore * 0.3} />
              <Stop offset={`${falloffEnd}%`} stopColor={`rgb(${rgb})`} stopOpacity={0} />
              <Stop offset="100%" stopColor={`rgb(${rgb})`} stopOpacity={0} />
            </RadialGradient>
          </Defs>

          <Circle cx={secCx} cy={secCy} r={secR} fill="url(#gSec)" />
          <Circle cx={terCx} cy={terCy} r={terR} fill="url(#gTer)" />
          <Circle cx={mainCx} cy={mainCy} r={mainR} fill="url(#gMain)" />
        </Svg>
      </Animated.View>
    </View>
  );
}

/*
  USAGE

  // Onboarding screen — orb starts low, slides up as the user swipes.
  const progress = useSharedValue(0);
  <GlowBackground progress={progress} />

  // Auth (signin) screen — no progress needed, renders at rest near the top.
  <GlowBackground />
*/