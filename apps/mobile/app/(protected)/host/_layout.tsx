import { Redirect, Stack } from "expo-router";
import useAuthStore from "@repo/store/auth.store";

export default function HostLayout() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  if (user?.role !== "host") return <Redirect href="/guest" />;

  return (
    <Stack>
      <Stack.Screen options={{ title: "Host Dashboard" }} />
    </Stack>
  );
}
