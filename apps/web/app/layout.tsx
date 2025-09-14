import "./globals.css";             // 👈 import tailwind once here
import type { ReactNode } from "react";
import AuthGate from "../components/AuthGate";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* AuthGate can be a client component */}
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
