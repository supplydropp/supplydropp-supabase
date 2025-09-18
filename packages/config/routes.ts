export const ROUTES = {
  // Auth
  SIGN_IN: "/sign-in",         // ✅ no (auth)
  SIGN_UP: "/sign-up",
  CHECK_EMAIL: "/check-email",
  AUTH_CALLBACK: "/callback",

  // Dashboards
  GUEST_HOME: "/guest",
  HOST_HOME: "/host",
  ADMIN_HOME: "/admin",
} as const;

export const APP_HOME = "/";

export const PUBLIC_PATHS: string[] = [
  APP_HOME,
  ROUTES.SIGN_IN,
  ROUTES.SIGN_UP,
  ROUTES.CHECK_EMAIL,
  ROUTES.AUTH_CALLBACK,
];
