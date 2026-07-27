import { Text } from "react-native";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <Text className="text-5xl font-manrope-extrabold">Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;