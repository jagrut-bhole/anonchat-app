import React, { useCallback } from "react";
import { Platform, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TAB_BAR } from "@/constants/theme";
import { tabs } from "@/constants/data";
import type { FeatherIconName } from "@/constants/data";
import BlurBackground from "./BlurBackground";
import TabButton from "./TabButton";

const PROGRAMMATIC_COLORS = {
  light: {
    active: "#2B6CB0",
    inactive: "#6B7280",
    ripple: "rgba(43, 108, 176, 0.18)",
    shadow: "rgba(0, 0, 0, 0.12)",
  },
  dark: {
    active: "#63B3ED",
    inactive: "#A0AEC0",
    ripple: "rgba(99, 179, 237, 0.22)",
    shadow: "rgba(0, 0, 0, 0.40)",
  },
} as const;

const iconMap: Record<string, FeatherIconName> = Object.fromEntries(
  tabs.map((t) => [t.name, t.icon]),
);

function getIconForRoute(routeName: string): FeatherIconName {
  return iconMap[routeName] ?? "circle";
}

// ────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────

const TabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colors = PROGRAMMATIC_COLORS[scheme === "dark" ? "dark" : "light"];

  const bottomOffset = Math.max(insets.bottom, TAB_BAR.MARGIN_BOTTOM);

  const handlePress = useCallback(
    (routeKey: string, routeName: string, isFocused: boolean) => {
      const event = navigation.emit({
        type: "tabPress",
        target: routeKey,
        canPreventDefault: true,
      });
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(routeName);
      }
    },
    [navigation],
  );

  const handleLongPress = useCallback(
    (routeKey: string) => {
      navigation.emit({
        type: "tabLongPress",
        target: routeKey,
      });
    },
    [navigation],
  );

  return (
    <View
      className="absolute items-center"
      style={{
        bottom: bottomOffset,
        left: TAB_BAR.MARGIN_H,
        right: TAB_BAR.MARGIN_H,
      }}
      pointerEvents="box-none"
    >
      {/* Outer: carries shadow (no overflow hidden) */}
      <View
        className="w-full"
        style={{
          maxWidth: TAB_BAR.MAX_WIDTH,
          borderRadius: TAB_BAR.BORDER_RADIUS,
          shadowColor: colors.shadow,
          ...Platform.select({
            android: { elevation: TAB_BAR.ELEVATION },
            ios: {
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.18,
              shadowRadius: 12,
            },
          }),
        }}
      >
        {/* Inner: clips blur + content to rounded rect */}
        <View
          className="overflow-hidden"
          style={{
            height: TAB_BAR.HEIGHT,
            borderRadius: TAB_BAR.BORDER_RADIUS,
          }}
        >
          {/* Frosted glass + tint */}
          <BlurBackground />

          {/* Tab buttons */}
          <View className="flex-1 flex-row items-center">
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const isFocused = state.index === index;

              const label =
                typeof options.tabBarLabel === "string"
                  ? options.tabBarLabel
                  : (options.title ?? route.name);

              const badge = options.tabBarBadge as number | undefined;

              return (
                <TabButton
                  key={route.key}
                  icon={getIconForRoute(route.name)}
                  label={label}
                  isActive={isFocused}
                  badge={badge}
                  activeColor={colors.active}
                  inactiveColor={colors.inactive}
                  rippleColor={colors.ripple}
                  onPress={() =>
                    handlePress(route.key, route.name, isFocused)
                  }
                  onLongPress={() => handleLongPress(route.key)}
                />
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(TabBar);
