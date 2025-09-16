import { create } from "zustand";
import { supabase } from "@repo/lib/supabase.client";

export type Role = "guest" | "host" | "admin";

type UserProfile = {
  id: string;
  email: string;
  name?: string;
  avatar?: string | null;
  role?: Role;
};

type AuthState = {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  hasFetched: boolean;

  fetchAuthenticatedUser: (force?: boolean) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  hasFetched: false,

  fetchAuthenticatedUser: async (force = false) => {
  console.log("🟡 [AuthStore] fetchAuthenticatedUser called", { force });

  if (get().hasFetched && !force) {
    console.log("ℹ️ [AuthStore] Already fetched, skipping");
    return;
  }

    set({ isLoading: true });

    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log("🔎 [AuthStore] Supabase getUser result:", { user, error });

      if (error || !user) {
        console.log("❌ [AuthStore] No active Supabase session");
        set({ isAuthenticated: false, user: null, hasFetched: true });
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (profileError) {
        console.warn("⚠️ [AuthStore] Profile fetch error:", profileError.message);
      }

      const newUser: UserProfile = {
        id: user.id,
        email: user.email!,
        name: profile?.name ?? user.user_metadata?.name,
        avatar: profile?.avatar ?? null,
        role: profile?.role ?? "guest",
      };

      set({
        isAuthenticated: true,
        user: newUser,
        hasFetched: true,
      });

      console.log("✅ [AuthStore] User profile loaded:", newUser);
    } catch (err) {
      console.error("⚠️ [AuthStore] fetchAuthenticatedUser unexpected error:", err);
      set({ isAuthenticated: false, user: null, hasFetched: true });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      console.log("🚪 [AuthStore] Logging out via Supabase");
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("⚠️ [AuthStore] Logout failed:", e);
    } finally {
      set({ isAuthenticated: false, user: null, hasFetched: false });
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
  },
}));
