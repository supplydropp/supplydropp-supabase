"use client"; // 👈 Add this at the top

import { Button } from "@repo/ui/Button";

export default function Page() {
  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "40px",
      }}
    >
      <h1>Next.js Web App</h1>
      <Button title="Click Me" onPress={() => console.log("Web Button clicked")} />
    </main>
  );
}
