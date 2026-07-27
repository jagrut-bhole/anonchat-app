import { Text } from "react-native";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const LiveChat = () => {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-gray-800">Live Chat</Text>
    </SafeAreaView>
  );
};

export default LiveChat;