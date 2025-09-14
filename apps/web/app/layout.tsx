"use client";

import "./globals.css";
import type { ReactNode } from "react";
import AuthGate from "./AuthGate";

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
