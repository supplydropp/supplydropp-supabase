"use client";

import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import useAuthStore from "@repo/store/auth.store";

export default function HostDashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/"); // ✅ redirect to splash
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6 gap-4">
      <Text className="text-2xl font-bold">🏡 Host Dashboard</Text>
      <Text className="text-gray-700 mt-2 text-center">
        {user?.name ?? user?.email}, manage your listings and bookings here.
      </Text>

      <Pressable
        onPress={handleLogout}
        className="mt-6 bg-red-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold text-center">Log Out</Text>
      </Pressable>
    </View>
  );
}
