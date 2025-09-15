"use client";

import { useAuthStore } from "@repo/store/auth.store";

export default function HomePage() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white gap-6">
      <h1 className="text-3xl font-bold text-primary">🏠 Home (Web)</h1>

      {user && (
        <div className="bg-gray-100 rounded-lg p-4 shadow-md text-center">
          <p className="mb-2">
            <strong>Welcome:</strong> {user.name ?? user.email}
          </p>
          <button
            onClick={async () => {
              await logout();
              if (typeof window !== "undefined") {
                window.location.href = "/sign-in";
              }
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
          >
            🚪 Log Out
          </button>
        </div>
      )}
    </div>
  );
}
