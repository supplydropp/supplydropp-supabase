"use client";

import { SignInForm } from "@repo/ui";
import { supabase } from "@repo/lib/supabase.client";
import { useAuthStore } from "@repo/store/auth.store";
import Link from "next/link";

export default function SignInPage() {
  const { fetchAuthenticatedUser } = useAuthStore();

  const handleSubmit = async (email: string, password: string) => {
    console.log("🟢 [SignInPage] handleSubmit called", { email });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("❌ [SignInPage] handleSubmit error:", error.message);
        alert(error.message);
        return;
      }

      console.log("✅ [SignInPage] signIn success:", data);

      // Refresh Zustand state
      await fetchAuthenticatedUser();

      // Redirect home
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: any) {
      console.error("❌ [SignInPage] unexpected error:", err);
      alert(err?.message ?? "Sign-in failed");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignInForm
        onSubmit={handleSubmit}
        footer={
          <div className="flex flex-row justify-center gap-2 mt-3">
            <span className="text-gray-600">Don’t have an account?</span>
            <Link href="/sign-up" className="font-semibold text-blue-500">
              Sign Up
            </Link>
          </div>
        }
      />
    </main>
  );
}
