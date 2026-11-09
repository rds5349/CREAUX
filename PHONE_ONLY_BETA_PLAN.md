# CREAUX phone-only beta: no paid enrollment

## What is ready
- Expo Router source project with five tabs and Supabase staging configuration.
- Supabase staging backend with RLS-enabled profiles, listings, discovery preferences, flock requests and read-only bookings.
- Mobile auth session handling configured for foreground/background transitions.

## What is not ready
- No verified npm install, TypeScript compilation, Expo bundle, live two-user test, or installable iPhone build.
- Sign-up is intentionally disabled (`EXPO_PUBLIC_SIGNUP_ENABLED=false`) until real terms/privacy URLs and versioned server-side consent recording are deployed.
- Messaging, production booking checkout, push notifications, Stripe Connect and Apple Pay are not complete.

## Phone-only options
1. **Free browser preview:** Once dependencies can install in a hosted development environment, run Expo web preview. This is not equivalent to a native iOS test.
2. **Expo Go:** May support a compatible development project, but Expo Go does not support every native library or every SDK combination. A reachable Expo development server and compatible Expo Go version are required. Verify current iOS availability before promising installation.
3. **Native iOS/TestFlight:** Requires Apple signing credentials and typically an Apple Developer Program membership. Defer payment until the app passes web and backend tests.

## Next developer commands (in a network-enabled environment)
```bash
cp .env.example .env
npm install
npx expo install --check
npm run typecheck
npx expo start --tunnel
```
Do not commit `.env` or credentials. The public Supabase publishable key is intended for client apps; never use service-role keys in the app.

## First live test checklist
- Confirm signup legal agreement and backend consent records before enabling signup.
- Register two **test-only** accounts in staging, confirm email, and log in/out.
- Verify username discovery opt-in, private search, rate limiting, request acceptance/decline/cancel and authorization between users.
- Test real iPhone screens, keyboard behavior, and background session refresh.
- Run staging security advisors; review the intentional SECURITY DEFINER discovery RPC warning.
