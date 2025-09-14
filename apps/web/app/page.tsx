// apps/web/app/page.tsx
"use client";

import { useAuthStore } from "@repo/store/auth.store";

export default function HomePage() {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();

  if (isLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-semibold text-blue-500">⏳ Loading...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-extrabold mb-6 text-indigo-600">🏡 Home</h1>
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <button
          onClick={async () => {
            await logout();
            if (typeof window !== "undefined") {
              window.location.href = "/sign-in";
            }
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md w-full mt-4"
        >
          🚪 Log Out
        </button>
      </div>
    </main>
  );
}
