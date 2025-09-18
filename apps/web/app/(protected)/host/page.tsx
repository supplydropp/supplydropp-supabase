"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@repo/store/auth.store";

export default function HostDashboardPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();        // clear session
    router.replace("/");   // 🚀 go back to splash
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white gap-6">
      <h1 className="text-3xl font-bold text-primary">🏠 Host Dashboard</h1>
      <p className="text-gray-700">
        {user?.name ?? user?.email}, manage your listings, guests, and availability.
      </p>

      {/* 🔘 Logout button */}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition"
      >
        🚪 Logout
      </button>
    </main>
  );
}
