# CREAUX staging verification — 2026-11-05

## Completed against connected Supabase staging project
- Deployed `staging_profile_signup_trigger`: creates a profile and default-private discovery preference when valid signup metadata is supplied. Does not replace Auth confirmation or Terms acceptance.
- Deployed `staging_readonly_bookings`: creates a read-only staging gatherings table for the existing Bookings screen. Not a full production booking system.
- Verified six public tables with RLS enabled and no test rows.
- Supabase security advisor: one INFO (deliberately inaccessible search-limit table), one WARN (authenticated callable SECURITY DEFINER username search function; requires review before public launch).

## Local checks
- `node scripts/check-project.mjs`: passed 16 source/configuration contract checks.
- `npm install --no-audit --no-fund --fetch-retries=0 --fetch-timeout=12000`: FAILED, DNS EAI_AGAIN resolving registry.npmjs.org.
- TypeScript compilation and iOS/Android build: NOT verified.

## Remaining before beta
1. Restore npm registry connectivity; install packages, generate lockfile, run `npm run typecheck` and Expo diagnostics.
2. Configure staging Auth confirmation, redirect URLs, test email, and create two dedicated staging test users. Avoid copying production customer data.
3. Test user signup/profile trigger, login, opt-in discovery, rate limit, Flock send/accept/decline/cancel with two authenticated users.
4. Implement and approve Terms/Privacy and server-side consent recording before enabling public signup.
5. Verify professional listing ownership and publishing, then booking, Stripe test-mode, messaging and notifications.
6. Build via Expo EAS with appropriate Apple/Google credentials, then install and test on devices.

No production changes were made. No staging test accounts or app binaries have been created.
