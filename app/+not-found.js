import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "খুঁজে পাওয়া যায় নি।" }} />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text className="text-3xl font-semibold text-blue-600 py-3">
          এই স্ক্রিনটি বিদ্যমান নেই।
        </Text>
        <Link href="/" className="mt-5 p-4 bg-blue-600 rounded-md">
          <Text className="text-lg text-center">
            হোম স্ক্রীনে ফিরে যান
          </Text>
        </Link>
      </View>
    </>
  );
}
