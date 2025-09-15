# Changelog

## [0.2.0] - 2025-09-12
### Added
- Debug logging for full auth cycle (login, fetch user, logout) on web.
- Redirect logic for unauthenticated web sessions.

### Fixed
- Web stuck in loading state due to missing Appwrite exports.
- Web login not redirecting after successful sign-in.
- Export conflicts between `appwrite.web.ts` and `appwrite.native.ts`.

### Notes
- Mobile auth flow remains unchanged and stable.
- Both platforms now share consistent logout behaviour and debug logs.

## [0.3.0] - 2025-09-15
### Added
- Supabase auth across web + mobile:
  - New shared client `@repo/lib/supabase.client` that auto-picks `NEXT_PUBLIC_*` (web) or `EXPO_PUBLIC_*` (mobile).
  - Server-only admin client `@repo/lib/supabase.admin` for API/server actions (uses `SUPABASE_SERVICE_ROLE_KEY`).
- Auth store (Zustand) refactor:
  - Replaced Appwrite calls with `supabase.auth.*` (`signInWithPassword`, `signUp`, `getUser`, `signOut`).
  - `initAuth()` listener using `onAuthStateChange` to keep session in sync.
  - `fetchAuthenticatedUser()` for one-shot load on mount (web & mobile).
- AuthGate (web) with robust route guards:
  - Redirect unauthenticated users to `/sign-in`.
  - Redirect authenticated users away from `/sign-in`/`/sign-up`.
- Sign-in / Sign-up pages:
  - Web: updated to call Supabase, refresh Zustand, and redirect.
  - Shared UI forms now support a footer slot (links between Sign In/Sign Up).
  - Mobile: screens mirror web logic using Expo Router and `router.replace("/")`.
- Environment setup:
  - Web: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
  - Mobile: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
  - Server-only (optional): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
- Expo URL polyfill on mobile (`react-native-url-polyfill/auto`) to avoid URL/crypto quirks.

### Changed
- Next.js monorepo config (`apps/web/next.config.js`):
  - Added `transpilePackages` for RN/interop libs.
  - Aliased `"react-native"` → `"react-native-web"` to fix web builds using RN primitives.
  - Kept monorepo-friendly `outputFileTracingRoot`.
- Build commands / CI:
  - Vercel: `Build Command → npm run build --workspace=web` (Install: `npm install`).
- Env naming (breaking change):
  - Replaced generic `SUPABASE_KEY` with explicit public keys per platform.
  - Old Appwrite envs no longer required for Supabase paths.

### Fixed
- Vercel build failures:
  - Resolved workspace resolution issues with workspace-specific builds.
  - Fixed `routes-manifest.json` / client-reference tracing errors by removing unsupported `experimental.outputFileTracingExcludes` and relying on proper tracing root.
  - Addressed “Module not found: 'zustand' / '@supabase/supabase-js'” by ensuring deps are installed where needed (root & web workspace).
- Redirect loops after sign-in:
  - AuthGate + store sequencing corrected; no more flash-redirect ping-pong.
- Web app using RN primitives:
  - Fixed `react-native-safe-area-context` “codegenNativeComponent” error by aliasing and transpiling RN packages.

### DevOps
- Deployed web to Vercel (Next.js 15.5.x) with Supabase-backed auth working in production.
- Documented environment variables in Vercel Project Settings.
- Git hygiene: added commands to back up WIP, hard reset to `origin/main`, and clean install.

### Migration Notes
- Remove Appwrite usage from auth paths; Supabase now the source of truth.
- Ensure public keys only in clients:
  - Do not ship `SUPABASE_SERVICE_ROLE_KEY` to browser or mobile.
- Update local envs:
  - `apps/web/.env.local` → `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `apps/mobile/.env` → `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`

### Known Issues / Follow-ups
- Styling:
  - Tailwind/NativeWind trial in monorepo succeeded, but final approach can be:
    - (A) Independent styling per app (simplest), or  
    - (B) Shared RN-based UI with NativeWind enabled in both apps.  
  - Current production auth flows are stable; styling reintroduction can be done incrementally on a feature branch.
- Require cycles in `@repo/ui` are harmless but should be tidied.
- Upgrade minor Expo/Router versions to match SDK recommendations when convenient.

# Changelog

## [0.3.3] - 2025-09-15
### Fixed
- Vercel web build failure caused by `nativewind/preset` being included in the web Tailwind config.
- `globals.css` parsing error resolved by ensuring plain UTF-8 encoding without BOM.

### Changed
- Split Tailwind configs per platform:
  - **Web** (`apps/web/tailwind.config.js`): uses standard TailwindCSS only (no NativeWind).
  - **Mobile** (`tailwind.config.js` at repo root): retains `nativewind/preset` for Expo/React Native.
- PostCSS in web simplified to always resolve the local config.

### Notes
- Web now deploys successfully to Vercel with full Tailwind styling.
- Mobile continues to use NativeWind for React Native styling.
- This version marks a stable baseline for auth + styling across both platforms.
