"use client";

import { Slot } from "expo-router";

export default function AuthLayout() {
  // No AuthGate here → always accessible
  return <Slot />;
}
