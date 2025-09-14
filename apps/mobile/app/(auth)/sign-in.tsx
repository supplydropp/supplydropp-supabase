import React from "react";
import { router, Link } from "expo-router";
import { SignInForm } from "@repo/ui";
import { useAuthStore } from "@repo/store/auth.store";
import { supabase } from "@repo/lib/supabase.client";
import { Text } from "react-native";

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
    <SignInForm
      onSubmit={handleSubmit}
      footer={
        <Link href="/sign-up" asChild>
          <Text className="font-semibold text-blue-500">Sign Up</Text>
        </Link>
      }
    />
  );
}
