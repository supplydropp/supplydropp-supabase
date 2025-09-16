"use client";

import { SignInForm } from "@repo/ui";
import { supabase } from "@repo/lib/supabase.client";
import { useAuthStore } from "@repo/store/auth.store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { fetchAuthenticatedUser } = useAuthStore();
  const router = useRouter();

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

    // 👇 Force refresh auth state
    await fetchAuthenticatedUser(true);

    // 🚦 Let AuthGate handle redirect based on role
  } catch (err: any) {
    console.error("❌ [SignInPage] unexpected error:", err);
    alert(err?.message ?? "Sign-in failed");
  }
};

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <SignInForm
        onSubmit={handleSubmit}
        footer={
          <div className="flex flex-row justify-center gap-2 mt-3">
            <span className="text-gray-600">Don’t have an account?</span>
            <Link href="/" className="font-semibold text-blue-500">
              Sign Up
            </Link>
          </div>
        }
      />
    </main>
  );
}
