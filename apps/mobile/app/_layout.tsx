"use client";

import "./global.css";
import { Slot } from "expo-router";

export default function RootLayout() {
  // Only global concerns: theme, fonts, providers
  return <Slot />;
}
