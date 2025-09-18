"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@repo/lib/supabase.client";
import { ensureUserInDb } from "@repo/lib/auth"; // ✅ shared helper
import useAuthStore from "@repo/store/auth.store";
import { APP_HOME } from "@repo/config";

export default function AuthCallbackPage() {
  const router = useRouter();
  const { fetchAuthenticatedUser } = useAuthStore();

  useEffect(() => {
    let ran = false;

    const handleCallback = async () => {
      if (ran) return;
      ran = true;

      console.log("🔵 [AuthCallback:Web] Starting callback flow...");

      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data?.session?.user) {
          console.error("❌ [AuthCallback:Web] Invalid session:", error ?? data);
          router.replace("/sign-in");
          return;
        }

        const user = data.session.user;
        console.log("✅ [AuthCallback:Web] Session restored. User:", user);

        // ✅ Decide role
        let role: "guest" | "host" | "admin" = "guest";
        if (user.email?.endsWith("@supplydropp.com")) {
          role = "admin";
        } else if (user.user_metadata?.role === "host") {
          role = "host";
        }

        // ✅ Ensure row in DB (shared helper)
        await ensureUserInDb(user, role);

        // ✅ Refresh Zustand auth store
        await fetchAuthenticatedUser(true);

        console.log(`➡️ [AuthCallback:Web] Redirecting to ${APP_HOME}`);
        router.replace(APP_HOME);
      } catch (err) {
        console.error("⚠️ [AuthCallback:Web] Unexpected error:", err);
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
