"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@repo/store/auth.store";
import { PUBLIC_PATHS } from "@repo/config";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchAuthenticatedUser, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Run only once (no force)
  const didFetch = useRef(false);
  useEffect(() => {
    if (!didFetch.current) {
      console.log("🟡 [AuthGate] Initial fetch of authenticated user (once)...");
      fetchAuthenticatedUser(); // 👈 no force here
      didFetch.current = true;
    }
  }, [fetchAuthenticatedUser]);

  // ✅ Handle redirects
  useEffect(() => {
    if (isLoading) return;

    console.log(
      "🔍 [AuthGate] Path check",
      pathname,
      "| Authenticated:",
      isAuthenticated,
      "| Role:",
      user?.role
    );

    // Unauthenticated → protected path
    if (!isAuthenticated && !PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
      console.log("🔒 [AuthGate] Redirect unauthenticated → /sign-in");
      router.replace("/sign-in");
      return;
    }

    // Authenticated → public path
    if (
      isAuthenticated &&
      PUBLIC_PATHS.some((p) => pathname.startsWith(p)) &&
      !pathname.startsWith("/auth/callback")
    ) {
      let target = "/guest/dashboard";
      if (user?.role === "host") target = "/host/dashboard";
      if (user?.role === "admin") target = "/admin/dashboard";

      if (pathname !== target) {
        console.log(`🔓 [AuthGate] Redirecting ${user?.role} → ${target}`);
        router.replace(target);
      }
    }
  }, [isAuthenticated, isLoading, pathname, user?.role, router]);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>⏳ Checking session…</p>
      </main>
    );
  }

  return <>{children}</>;
}
