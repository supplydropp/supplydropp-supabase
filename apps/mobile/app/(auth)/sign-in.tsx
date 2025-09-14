import React from "react";
import { router, Link } from "expo-router";
import { SignInForm } from "@repo/ui";
import { useAuthStore } from "@repo/store/auth.store";
import { supabase } from "@repo/lib/supabase.client";
import { Text, View, Pressable } from "react-native";

export default function SignInScreen() {
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async (email: string, password: string) => {
    console.log("🟢 [SignInScreen] handleSubmit called", { email });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ [SignInScreen] error:", error.message);
        alert(error.message);
        return;
      }

      console.log("✅ [SignInScreen] signIn success:", data);
      await fetchAuthenticatedUser();
      router.replace("/");
    } catch (err: any) {
      console.error("❌ [SignInScreen] unexpected error:", err);
      alert(err?.message ?? "Sign-in failed");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6 gap-6">
      {/* 🔵 TEST BLOCK — remove later */}
      <View className="rounded-xl bg-white shadow-md p-6 w-72">
        <Text className="text-3xl font-bold text-blue-600 text-center">
          Expo Style Test ✅
        </Text>
        <Text className="mt-2 text-gray-700 text-center">
          If this box is styled (blue heading, gray text, rounded, shadow),
          then NativeWind is working on mobile!
        </Text>
        <Pressable className="mt-4 px-4 py-2 rounded-lg bg-green-500">
          <Text className="text-white font-semibold text-center">Test Button</Text>
        </Pressable>
      </View>

      {/* 🔐 Your real sign-in form */}
      <SignInForm
        onSubmit={handleSubmit}
        footer={
          <Link href="/sign-up" asChild>
            <Text className="font-semibold text-blue-500">Sign Up</Text>
          </Link>
        }
      />
    </View>
  );
}
