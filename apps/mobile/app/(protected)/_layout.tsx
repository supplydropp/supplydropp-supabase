"use client";

import { Slot } from "expo-router";
import AuthGate from "../../components/AuthGate";
import DeepLinkHandler from "../../components/DeepLinkHandler";


export default function ProtectedLayout() {
  return (
    <AuthGate>
      <DeepLinkHandler />
      <Slot />
    </AuthGate>
  );
}
