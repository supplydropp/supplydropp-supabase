import { Redirect, Stack } from "expo-router";
import useAuthStore from "@repo/store/auth.store";

export default function GuestLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  if (user?.role !== "guest") return <Redirect href="/host" />;

  return (
    <Stack>
      {/* ✅ Remove explicit screen name.
          Expo Router will auto-detect index.tsx */}
      <Stack.Screen options={{ title: "Guest Dashboard" }} />
    </Stack>
  );
}
