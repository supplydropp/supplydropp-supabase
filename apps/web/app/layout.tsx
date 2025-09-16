import "./globals.css";
import type { ReactNode } from "react";
import AuthGate from "../components/AuthGate"; // 👈 still imported from components

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthGate>{children}</AuthGate>
      </body>
    </html>
  );
}
