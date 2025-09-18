import React from "react";
import { View, Text } from "react-native";
import { router, Link, useLocalSearchParams } from "expo-router";
import { SignUpForm } from "@repo/ui";
import { supabase } from "@repo/lib/supabase.client";
import * as Linking from "expo-linking";

export default function SignUpScreen() {
  const { role: roleParam } = useLocalSearchParams<{ role?: "guest" | "host" }>();
  const role = roleParam ?? "guest";

  const handleSubmit = async (email: string, password: string, name: string) => {
    try {
      // ✅ Unified redirect URL (no `(auth)`)
      const redirectUrl = Linking.createURL("auth/callback");
      console.log("🔗 [SignUpScreen] redirectUrl generated:", redirectUrl);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { name, role },
        },
      });

      console.log("📤 [SignUpScreen] Payload sent to Supabase:", {
        email,
        emailRedirectTo: redirectUrl,
      });

      if (error) throw error;
      console.log("✅ [SignUpScreen] signUp success:", data);

      router.replace("/check-email");
    } catch (err) {
      console.error("❌ [SignUpScreen] Error during sign up:", err);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-6 gap-6">
      <SignUpForm
        onSubmit={handleSubmit}
        footer={
          <Link href="/sign-in" asChild>
            <Text className="font-semibold text-blue-500">
              Already have an account? Sign In
            </Text>
          </Link>
        }
      />
    </View>
  );
}
