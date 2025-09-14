// apps/web/components/DebugOverlay.tsx
"use client";

import { useEffect, useState } from "react";

export default function DebugOverlay() {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;

    console.log = (...args: any[]) => {
      setLogs((prev) => [...prev, "🟢 " + args.join(" ")]);
      originalLog(...args);
    };
    console.error = (...args: any[]) => {
      setLogs((prev) => [...prev, "❌ " + args.join(" ")]);
      originalError(...args);
    };
    console.warn = (...args: any[]) => {
      setLogs((prev) => [...prev, "⚠️ " + args.join(" ")]);
      originalWarn(...args);
    };

    return () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 w-full max-h-40 overflow-y-auto bg-black text-green-400 text-xs font-mono p-2 z-50">
      {logs.slice(-20).map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}
