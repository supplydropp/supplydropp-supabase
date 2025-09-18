"use client";

import { useEffect } from "react";
import { View, Text } from "react-native";
import useAuthStore from "@repo/store/auth.store";
import { router } from "expo-router";

export default function AuthCallbackScreen() {
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      const role = user?.role ?? "guest";
      if (role === "host") router.replace("/host");
      else if (role === "admin") router.replace("/admin");
      else router.replace("/guest");
    }
  }, [isAuthenticated, user]);

  return (
    <View className="flex-1 items-center justify-center bg-gray-100">
      <Text className="text-lg text-blue-600">
        🔄 Finishing login, please wait...
      </Text>
    </View>
  );
}
