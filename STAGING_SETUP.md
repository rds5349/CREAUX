# CREAUX Mobile staging setup

Staging Supabase project: `creaux-mobile-staging` (`vvxasyquwumcyyjjtdvj`).
Production project: `creaux-society` (`vvmrfusxzmqwbphrmlam`).

1. Copy `.env.example` to `.env`.
2. From the **staging** Supabase project, paste the publishable API key into `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY`. Never use a secret or service-role key.
3. Keep `EXPO_PUBLIC_SIGNUP_ENABLED=false` until legal consent and account onboarding are tested.
4. Review the SQL files in `supabase/` before applying them to staging. These files are not deployed.
5. Install packages with `npm install` and run `npm run typecheck`, then `npx expo start`.
6. Confirm app authentication and account data refer to staging, never production.

The staging database is currently newly created and does not yet have the production schema. No live data has been copied.
