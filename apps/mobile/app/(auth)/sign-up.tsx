import React from "react";
import { Text } from "react-native";
import { router, Link } from "expo-router";
import { SignUpForm } from "@repo/ui";
import { useAuthStore } from "@repo/store/auth.store";
import { supabase } from "@repo/lib/supabase.client";

export default function SignUpScreen() {
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async (email: string, password: string, name: string) => {
    console.log("🟢 [SignUpScreen] handleSubmit called", { email });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) {
        console.error("❌ [SignUpScreen] error:", error.message);
        alert(error.message);
        return;
      }

      console.log("✅ [SignUpScreen] signUp success:", data);
      await fetchAuthenticatedUser();
      router.replace("/");
    } catch (err: any) {
      console.error("❌ [SignUpScreen] unexpected error:", err);
      alert(err?.message ?? "Sign-up failed");
    }
  };

  return (
    <SignUpForm
      onSubmit={handleSubmit}
      footer={
        <Link href="/sign-in" asChild>
          <Text className="text-blue-500 font-semibold">
            Already have an account? Sign In
          </Text>
        </Link>
      }
    />
  );
}
