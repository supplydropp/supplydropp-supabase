"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuthStore from "@repo/store/auth.store";
import { getRedirectTarget } from "@repo/lib/authGateLogic";
import { PUBLIC_PATHS } from "@repo/config/routes";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchAuthenticatedUser, user, hasFetched } =
    useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const didFetch = useRef(false);

  // Fetch once
  useEffect(() => {
    if (!didFetch.current) {
      console.log("🟡 [AuthGate:Web] Initial fetch...");
      fetchAuthenticatedUser();
      didFetch.current = true;
    }
  }, [fetchAuthenticatedUser]);

  // Handle redirects only after first fetch
  useEffect(() => {
    if (isLoading || !hasFetched) return;

    console.log(
      "🔍 [AuthGate:Web] Path:",
      pathname,
      "| Authenticated:",
      isAuthenticated,
      "| Role:",
      user?.role
    );

    // 🔴 If not logged in
    if (!isAuthenticated) {
      if (!PUBLIC_PATHS.includes(pathname)) {
        if (pathname !== "/") {
          console.log("🔑 [AuthGate:Web] Not authenticated, redirecting → /");
          setIsRedirecting(true);
          router.replace("/");
        } else {
          console.log("✅ [AuthGate:Web] Already on splash, no redirect");
          setIsRedirecting(false);
        }
      }
      return;
    }

    // ⏳ If logged in but role not yet resolved
    if (!user?.role) {
      console.log("⏳ [AuthGate:Web] Role not resolved yet, skipping redirect");
      return;
    }

    // 🎯 Normal redirect logic
    const target = getRedirectTarget(true, pathname, user.role);
    console.log("🎯 [AuthGate:Web] getRedirectTarget returned:", target);

    if (target && target !== pathname) {
      console.log(`🔀 [AuthGate:Web] Redirect → ${target}`);
      setIsRedirecting(true);
      router.replace(target);
    } else {
      console.log("✅ [AuthGate:Web] No redirect needed, staying put");
      setIsRedirecting(false);
    }
  }, [isAuthenticated, user?.role, isLoading, hasFetched, pathname, router]);

  if (isLoading || isRedirecting || !hasFetched) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p>⏳ Checking session…</p>
      </main>
    );
  }

  return <>{children}</>;
}
