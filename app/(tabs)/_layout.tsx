import { Tabs } from "expo-router";
import React from "react";
import TabBar from "@/components/navigation/TabBar";
import { tabs } from "@/constants/data";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
      }}
    >
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            ...tab.options,
          }}
        />
      ))}
    </Tabs>
  );
}
