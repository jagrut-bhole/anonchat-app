import Feather from "@react-native-vector-icons/feather";
import { ComponentProps } from "react";
import type { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export type FeatherIconName = ComponentProps<typeof Feather>["name"];

export interface TabItem {
  // file name from app/(tabs)/
  name: string;
  title: string;
  icon: FeatherIconName;
  /** Optional Expo Router screen options (badge, href, etc.) */
  options?: Omit<BottomTabNavigationOptions, "title">;
}

export const tabs: TabItem[] = [
  {
    name: "index",
    title: "Home",
    icon: "home",
    options: { tabBarBadge: 69 },
  },
  {
    name: "live-chat",
    title: "Live Chat",
    icon: "message-square",
  },
  {
    name: "settings",
    title: "Settings",
    icon: "settings",
  },
  {
    name: "profile",
    title: "Profile",
    icon: "user",
  },
];
