import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@repo/store/auth.store";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, logout, isLoading } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace("/sign-in");
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-lg text-blue-500">⏳ Loading profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-red-500">No user found. Please sign in.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="text-3xl font-bold text-primary mb-4">👤 Profile</Text>
      <View className="bg-gray-100 rounded-lg p-4 w-full max-w-md space-y-2">
        <Text><Text className="font-bold">Name:</Text> {user.name ?? "N/A"}</Text>
        <Text><Text className="font-bold">Email:</Text> {user.email}</Text>
        <Text><Text className="font-bold">Role:</Text> {user.role}</Text>

        {user.role === "admin" && (
          <TouchableOpacity onPress={() => router.push("/admin")}>
            <Text className="mt-2 text-blue-600 font-semibold">Go to Admin Dashboard</Text>
          </TouchableOpacity>
        )}
        {user.role === "host" && (
          <TouchableOpacity onPress={() => router.push("/host")}>
            <Text className="mt-2 text-blue-600 font-semibold">Go to Host Dashboard</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-500 px-4 py-2 rounded-lg mt-4"
        >
          <Text className="text-white font-semibold text-center">🚪 Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
