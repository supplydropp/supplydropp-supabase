// apps/mobile/app/_layout.tsx
import "./global.css"; // ✅ same folder as _layout.tsx

import { Slot } from "expo-router";

export default function RootLayout() {
  return <Slot />;
}
