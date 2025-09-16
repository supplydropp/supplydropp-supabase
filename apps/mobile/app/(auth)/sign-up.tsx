import React from "react";
import { View, Text } from "react-native";
import { router, Link } from "expo-router";
import { SignUpForm } from "@repo/ui";
import { supabase } from "@repo/lib/supabase.client";
import { useAuthStore } from "@repo/store/auth.store";

export default function SignUpScreen() {
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async (email: string, password: string, name: string) => {
    console.log("🟢 [SignUpScreen] handleSubmit called", { email });

    try {
      // 1. Create Supabase Auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (authError) {
        console.error("❌ [SignUpScreen] error:", authError.message);
        alert(authError.message);
        return;
      }

      console.log("✅ [SignUpScreen] Auth account created:", authData);

      // 2. Insert into users table
      if (authData.user) {
        const { error: insertError } = await supabase.from("users").insert({
          id: authData.user.id,
          email,
          name,
          role: "guest",
          avatar: null,
        });

        if (insertError) {
          console.warn("⚠️ [SignUpScreen] Failed to insert profile:", insertError.message);
        }
      }

      // 3. Refresh Zustand state
      await fetchAuthenticatedUser();

      // 4. Redirect home
      router.replace("/(tabs)");
    } catch (err: any) {
      console.error("❌ [SignUpScreen] unexpected error:", err);
      alert(err?.message ?? "Sign-up failed");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6 gap-6">
      <SignUpForm
        onSubmit={handleSubmit}
        footer={
          <Link href="/sign-in" asChild>
            <Text className="font-semibold text-blue-500">Already have an account? Sign In</Text>
          </Link>
        }
      />
    </View>
  );
}
