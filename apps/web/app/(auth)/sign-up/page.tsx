// apps/web/app/(auth)/sign-up/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@repo/lib/supabase.client";
import { useAuthStore } from "@repo/store/auth.store";
import { SignUpForm } from "@repo/ui";
import Link from "next/link";

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async (email: string, password: string, name: string) => {
    console.log("🟢 [SignUpPage] handleSubmit called", { email });
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });

      if (error) {
        console.error("❌ [SignUpPage] handleSubmit error:", error.message);
        alert(error.message);
        return;
      }

      console.log("✅ [SignUpPage] signUp completed:", data);

      // refresh Zustand state
      await fetchAuthenticatedUser();

      // redirect home
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("❌ [SignUpPage] unexpected error:", err);
      alert(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <SignUpForm
        onSubmit={handleSubmit}
        loading={loading}
        footer={
          <div className="flex flex-row justify-center gap-2 mt-3">
            <span className="text-gray-600">Already have an account?</span>
            <Link href="/sign-in" className="font-semibold text-blue-500">
              Sign In
            </Link>
          </div>
        }
      />
    </main>
  );
}
