import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { TAB_BAR } from "@/constants/theme";

const BlurBackground: React.FC = () => {
  return (
    <>
      {/* Frosted glass */}
      <BlurView
        intensity={80}
        tint="systemMaterial"
        className="absolute inset-0 overflow-hidden"
        style={{ borderRadius: TAB_BAR.BORDER_RADIUS }}
      />

      {/* Tint overlay — color from global.css via NativeWind */}
      <View
        className="absolute inset-0 bg-tab-tint"
        style={{ borderRadius: TAB_BAR.BORDER_RADIUS }}
      />
    </>
  );
};

export default React.memo(BlurBackground);
