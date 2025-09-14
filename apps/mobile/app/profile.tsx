

import { View, Text, Pressable } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <View className="rounded-xl bg-white shadow-md p-6">
        <Text className="text-3xl font-bold text-blue-600">Expo ✅</Text>
        <Text className="mt-2 text-gray-700">If this is styled, NativeWind works.</Text>
        <Pressable className="mt-4 px-4 py-2 rounded-lg bg-green-500">
          <Text className="text-white font-semibold">Test Button</Text>
        </Pressable>
      </View>
    </View>
  );
}
