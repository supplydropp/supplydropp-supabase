import { create } from "zustand";
import { supabase } from "@repo/lib/supabase.client";
import type { User as AppUser } from "@repo/types"; // 👈 reuse shared type

type AuthState = {
  isAuthenticated: boolean;
  user: AppUser | null;
  isLoading: boolean;

  fetchAuthenticatedUser: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,

  fetchAuthenticatedUser: async () => {
    console.log("🟡 fetchAuthenticatedUser called");
    set({ isLoading: true });

    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        console.log("❌ No active Supabase session");
        set({ isAuthenticated: false, user: null });
      } else {
        console.log("✅ Supabase session found:", user);
        set({
          isAuthenticated: true,
          user: {
            id: user.id,
            email: user.email!,
            name: user.user_metadata?.name,
            role: user.user_metadata?.role,
          },
        });
      }
    } catch (err) {
      console.error("⚠️ fetchAuthenticatedUser error:", err);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      console.log("🚪 Logging out via Supabase");
      await supabase.auth.signOut();
    } catch (e) {
      console.warn("⚠️ Logout failed:", e);
    } finally {
      set({ isAuthenticated: false, user: null });
    }
  },
}));
