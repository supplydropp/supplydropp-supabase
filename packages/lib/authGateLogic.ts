// packages/lib/authGateLogic.ts
import { PUBLIC_PATHS, ROUTES, APP_HOME } from "@repo/config/routes";

export function getRedirectTarget(
  isAuthenticated: boolean,
  pathname: string,
  role?: "guest" | "host" | "admin"
): string | null {
  // 🔑 If not authenticated
  if (!isAuthenticated) {
    if (PUBLIC_PATHS.includes(pathname)) {
      return null; // allow sign-in, sign-up, callback, splash
    }
    return APP_HOME; // 🚪 always send to splash on logout
  }

  // 🔑 If authenticated, route by role
  if (pathname === "/" || PUBLIC_PATHS.includes(pathname)) {
    if (role === "guest") return ROUTES.GUEST_HOME;
    if (role === "host") return ROUTES.HOST_HOME;
    if (role === "admin") return ROUTES.ADMIN_HOME;
  }

  return null; // ✅ otherwise, stay put
}
