import { supabase } from "./supabase.client";

export async function ensureUserInDb(user: any, role: "guest" | "host" | "admin") {
  const { error } = await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      name: user.user_metadata?.name ?? null,
      role,
      avatar: user.user_metadata?.avatar ?? null,
    },
    { onConflict: "id" }
  );

  if (error) {
    console.error("❌ [ensureUserInDb] Failed:", error.message);
    throw error;
  }

  console.log("✅ [ensureUserInDb] User ensured in DB:", user.email);
}
