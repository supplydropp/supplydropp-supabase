"use client";

import Link from "next/link";
import AuthGate from "../../components/AuthGate";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Top Nav */}
      <nav className="flex gap-6 bg-gray-100 p-4 border-b">
        <Link href="/" className="font-semibold hover:text-primary">Home</Link>
        <Link href="/store" className="hover:text-primary">Store</Link>
        <Link href="/orders" className="hover:text-primary">Orders</Link>
        <Link href="/profile" className="hover:text-primary">Profile</Link>
      </nav>

      {/* Content */}
      <main className="p-6">{children}</main>
    </div>
  );
}

