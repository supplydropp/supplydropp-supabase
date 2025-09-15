import { View, Text, TouchableOpacity } from "react-native";
import { useAuthStore } from "@repo/store/auth.store";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl font-bold text-primary">👤 Profile</Text>
      {user && (
        <>
          <Text className="mt-4">Email: {user.email}</Text>
          <TouchableOpacity
            onPress={async () => {
              await logout();
              router.replace("/sign-in");
            }}
            className="mt-6 bg-red-500 px-4 py-2 rounded-lg"
          >
            <Text className="text-white font-semibold">🚪 Log Out</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
