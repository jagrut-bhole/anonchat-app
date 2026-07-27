import "@/global.css";
import {Text} from "react-native";
import {Link} from "expo-router";
import {SafeAreaView as RNSafeAreaView} from "react-native-safe-area-context";
import {styled} from "nativewind";

const SafeAreaView = styled(RNSafeAreaView);

export default function App() {
    return (
        <SafeAreaView className="flex-1 bg-background p-5">
            <Text className="text-5xl font-manrope-extrabold">Home</Text>
            <Text className="text-xl font-bold text-success">
                Welcome to Anonchat!!
            </Text>

            <Link href="/live-chat" className="mt-4 rounded-3xl bg-black text-white p-4">Go to Live Chat!!</Link>
        </SafeAreaView>
    );
}