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
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 gap-6 p-6">
      {/* 🔵 TEST BLOCK — delete later */}
      <div className="rounded-xl bg-white shadow-md p-6 text-center">
        <h1 className="text-3xl font-bold text-blue-600">Style Test ✅</h1>
        <p className="mt-2 text-gray-700">
          If this box is styled (blue heading, gray text, shadow, rounded corners),
          then Tailwind/NativeWind is working on web!
        </p>
        <button className="mt-4 px-4 py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600">
          Test Button
        </button>
      </div>

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
