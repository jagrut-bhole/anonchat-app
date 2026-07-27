import React from "react";
import { Pressable, Text, View, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import Feather from "@react-native-vector-icons/feather";
import { TAB_BAR } from "@/constants/theme";
import type { ComponentProps } from "react";

export type FeatherIconName = ComponentProps<typeof Feather>["name"];

export interface TabButtonProps {
  icon: FeatherIconName;
  label: string;
  isActive: boolean;
  badge?: number;
  onPress: () => void;
  onLongPress?: () => void;
  activeColor: string;
  inactiveColor: string;
  rippleColor: string;
}

const SPRING_CONFIG = {
  damping: 18,
  stiffness: 200,
  mass: 0.8,
};


const TabButton: React.FC<TabButtonProps> = ({
  icon,
  label,
  isActive,
  badge,
  onPress,
  onLongPress,
  activeColor,
  inactiveColor,
  rippleColor,
}) => {
  // ── Shared values ──────────────────────────────────────────
  const progress = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    progress.value = withSpring(isActive ? 1 : 0, SPRING_CONFIG);
  }, [isActive, progress]);

  // ── Animated: active circle scale ──────────────────────────
  const circleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: progress.value }],
    opacity: progress.value,
  }));

  // ── Animated: icon lift + scale ────────────────────────────
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, TAB_BAR.ICON_LIFT],
        ),
      },
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, TAB_BAR.ICON_SCALE_ACTIVE],
        ),
      },
    ],
  }));

  // ── Derived colours ────────────────────────────────────────
  const iconColor = isActive ? activeColor : inactiveColor;

  // ── Badge text ─────────────────────────────────────────────
  const badgeLabel =
    badge !== undefined
      ? badge > 99
        ? "99+"
        : String(badge)
      : undefined;

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={label}
      android_ripple={{
        color: rippleColor,
        borderless: true,
        radius: TAB_BAR.HEIGHT / 2 - 4,
      }}
      className="flex-1 items-center justify-center"
    >
      <View className="items-center justify-center pt-1.5 pb-1">
        {/* Icon layer */}
        <View
          className="items-center justify-center"
          style={{
            width: TAB_BAR.ACTIVE_CIRCLE,
            height: TAB_BAR.ACTIVE_CIRCLE,
          }}
        >
          {/* Active circle */}
          <Animated.View
            className="absolute bg-tab-active-bg"
            style={[
              {
                width: TAB_BAR.ACTIVE_CIRCLE,
                height: TAB_BAR.ACTIVE_CIRCLE,
                borderRadius: TAB_BAR.ACTIVE_CIRCLE_RADIUS,
              },
              circleStyle,
            ]}
          />

          {/* Icon */}
          <Animated.View style={iconStyle}>
            <Feather
              name={icon}
              size={TAB_BAR.ICON_SIZE}
              color={iconColor}
            />
          </Animated.View>

          {/* Badge */}
          {badgeLabel !== undefined && (
            <View
              className="absolute items-center justify-center bg-tab-badge-bg px-1"
              style={{
                top: -4,
                right: -8,
                minWidth: TAB_BAR.BADGE_SIZE,
                height: TAB_BAR.BADGE_SIZE,
                borderRadius: TAB_BAR.BADGE_SIZE / 2,
              }}
            >
              <Text
                className="text-tab-badge-text font-bold"
                style={{
                  fontSize: TAB_BAR.BADGE_FONT,
                  includeFontPadding: false,
                  ...(Platform.OS === "android"
                    ? { lineHeight: TAB_BAR.BADGE_SIZE - 2 }
                    : {}),
                }}
                numberOfLines={1}
              >
                {badgeLabel}
              </Text>
            </View>
          )}
        </View>

        {/* Label */}
        <Text
          className={`text-center ${isActive ? "font-semibold text-tab-active" : "font-medium text-tab-inactive"}`}
          style={{
            fontSize: TAB_BAR.LABEL_SIZE,
            marginTop: TAB_BAR.ICON_LABEL_GAP,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(TabButton);
