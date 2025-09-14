import { createClient } from "@supabase/supabase-js";

// ✅ Support both Next.js (`NEXT_PUBLIC_*`) and Expo (`EXPO_PUBLIC_*`)
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.EXPO_PUBLIC_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase env vars are missing. Check your .env files.");
}

// Create a typed client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
