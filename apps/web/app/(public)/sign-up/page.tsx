"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@repo/lib/supabase.client";
import { SignUpForm } from "@repo/ui";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const role = (searchParams.get("role") as "guest" | "host") ?? "guest";

  const handleSubmit = async (email: string, password: string, name: string) => {
    console.log("🟢 [SignUpPage] handleSubmit called", { email, role });

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000") +
            "/auth/callback",
          data: { name, role },
        },
      });

      if (error) {
        console.error("❌ [SignUpPage] signUp error:", error.message);
        alert(error.message);
        return;
      }

      console.log("✅ [SignUpPage] signUp success:", data);

      router.replace("/check-email");
    } catch (err: unknown) {
      console.error("❌ [SignUpPage] unexpected error:", err);
      alert(err instanceof Error ? err.message : "Sign-up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <SignUpForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
}

// ✅ Wrap it in Suspense here (fix for Vercel build)
export default function SignUpPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignUpContent />
    </Suspense>
  );
}
