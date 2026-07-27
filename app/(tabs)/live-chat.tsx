import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LiveChat = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-800">Live Chat</Text>
    </SafeAreaView>
  );
};

export default LiveChat;