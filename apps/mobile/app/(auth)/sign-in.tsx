import React from "react";
import { router, Link } from "expo-router";
import { SignInForm } from "@repo/ui";
import useAuthStore from "@repo/store/auth.store";
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

      // 👇 Force refresh auth state
      await fetchAuthenticatedUser(true);

      // 🔑 Fallback manual redirect (if AuthGate doesn’t catch it fast enough)
      const role = useAuthStore.getState().user?.role ?? "guest";
      if (role === "host") router.replace("/host");
      else if (role === "admin") router.replace("/admin");
      else router.replace("/guest");

      console.log("🔄 [SignInScreen] Redirect fallback applied");
    } catch (err: any) {
      console.error("❌ [SignInScreen] unexpected error:", err);
      alert(err?.message ?? "Sign-in failed");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6 gap-6">
      {/* 🔐 Sign-in form */}
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
