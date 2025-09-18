"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import useAuthStore from "@repo/store/auth.store";
import { getRedirectTarget } from "@repo/lib/authGateLogic";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, fetchAuthenticatedUser, user } = useAuthStore();
  const pathname = usePathname();
  const router = useRouter();

  const [isRedirecting, setIsRedirecting] = useState(false);
  const didFetch = useRef(false);

  // Fetch once
  useEffect(() => {
    if (!didFetch.current) {
      console.log("🟡 [AuthGate:Mobile] Initial fetch...");
      fetchAuthenticatedUser();
      didFetch.current = true;
    }
  }, [fetchAuthenticatedUser]);

  // Handle redirect logic
  useEffect(() => {
    if (isLoading) {
      console.log("⏳ [AuthGate] Still loading, skip redirect...");
      return;
    }

    console.log("🔍 [AuthGate] Path:", pathname, "| Authenticated:", isAuthenticated, "| Role:", user?.role);

    const target = getRedirectTarget(isAuthenticated, pathname, user?.role);

    console.log("🎯 [AuthGate] getRedirectTarget returned:", target);

    if (target && target.startsWith("/") && target !== pathname) {
      console.log(`🔀 [AuthGate] Redirecting from ${pathname} → ${target}`);
      setIsRedirecting(true);
      router.replace(target);
    } else {
      if (!target) {
        console.log("✅ [AuthGate] No redirect needed, staying on", pathname);
      }
      setIsRedirecting(false);
    }
  }, [isAuthenticated, user?.role, isLoading, pathname, router]);

  if (isLoading || isRedirecting) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
        <Text className="mt-4 text-gray-600">Checking session…</Text>
      </View>
    );
  }

  return <>{children}</>;
}
