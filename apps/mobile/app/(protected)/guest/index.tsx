"use client";

import { Text, View, Pressable } from "react-native";
import { useRouter } from "expo-router";   // ✅ add router
import useAuthStore from "@repo/store/auth.store";

export default function GuestDashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();        // clears Supabase + store
    router.replace("/");   // ✅ send to splash screen
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-6 gap-4">
      <Text className="text-2xl font-bold">👤 Guest Dashboard</Text>
      <Text className="text-gray-700 mt-2 text-center">
        {user?.name ?? user?.email}, manage recurring turnover packs and deliveries.
      </Text>

      {/* 🚪 Logout */}
      <Pressable
        onPress={handleLogout}
        className="mt-6 bg-red-500 px-4 py-2 rounded-lg"
      >
        <Text className="text-white font-semibold text-center">Log Out</Text>
      </Pressable>
    </View>
  );
}
