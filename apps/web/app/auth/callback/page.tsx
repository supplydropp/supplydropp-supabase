"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@repo/lib/supabase.client";
import { useAuthStore } from "@repo/store/auth.store";
import { APP_HOME } from "@repo/config";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    let ran = false;

    const handleCallback = async () => {
      if (ran) return;
      ran = true;

      console.log("🔵 [AuthCallback] Starting callback flow...");

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session?.user) {
          console.error("❌ [AuthCallback] Invalid session:", error ?? data);
          router.replace("/sign-in");
          return;
        }

        const user = data.session.user;
        console.log("✅ [AuthCallback] Session restored. User:", user);

        // ✅ Decide role
        let role: "guest" | "host" | "admin" = "guest";
        if (user.email?.endsWith("@supplydropp.com")) {
          role = "admin";
        } else if (user.user_metadata?.role === "host") {
          role = "host";
        } else {
          role = "guest";
        }

        // ✅ Ensure row in users table
        const { data: upsertData, error: upsertError } = await supabase
          .from("users")
          .upsert(
            [
              {
                id: user.id,
                email: user.email,
                name: user.user_metadata?.name ?? null,
                role,
                avatar: user.user_metadata?.avatar ?? null,
              },
            ],
            { onConflict: "id" }
          )
          .select()
          .single();

        if (upsertError) {
          console.error("❌ [AuthCallback] Upsert error:", upsertError);
        } else {
          console.log("✅ [AuthCallback] User ensured in DB:", upsertData);
        }

        console.log("🔄 [AuthCallback] Refreshing Zustand...");
        await fetchAuthenticatedUser();

        console.log(`➡️ [AuthCallback] Redirecting to ${APP_HOME}`);
        router.replace(APP_HOME);
      } catch (err) {
        console.error("⚠️ [AuthCallback] Unexpected error:", err);
        router.replace("/sign-in");
      }
    };

    handleCallback();
  }, [router, fetchAuthenticatedUser]);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-blue-600">🔄 Finishing login, please wait...</p>
    </main>
  );
}
