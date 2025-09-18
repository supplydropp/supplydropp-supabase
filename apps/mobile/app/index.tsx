import React from "react";
import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-2xl font-bold mb-8">👋 Welcome to SupplyDropp</Text>

      {/* Join as Guest */}
      <Pressable
        onPress={() => router.push("/sign-up?role=guest")}
        className="w-full bg-blue-500 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-semibold">
          Join as Guest
        </Text>
      </Pressable>

      {/* Join as Host */}
      <Pressable
        onPress={() => router.push("/sign-up?role=host")}
        className="w-full bg-green-500 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center font-semibold">
          Join as Host
        </Text>
      </Pressable>

      {/* Sign In */}
      <Pressable onPress={() => router.push("/sign-in")}>
        <Text className="text-blue-600 font-medium">
          Already have an account? Sign In
        </Text>
      </Pressable>
    </View>
  );
}
