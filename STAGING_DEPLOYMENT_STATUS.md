# CREAUX mobile staging — deployed 2026-11-05

Supabase project: creaux-mobile-staging (`vvxasyquwumcyyjjtdvj`), US East.
Production project was not modified.

## Applied migrations
- `mobile_staging_core_schema`: profiles, discovery preferences, professional listings, flock requests, RLS and transition trigger.
- `staging_private_username_discovery`: private search counters and opt-in, exact-username lookup RPC limited to 10 calls per minute per authenticated account.

## Verification
- Five public tables and thirteen RLS policies confirmed.
- Username lookup RPC exists.
- Supabase security advisor flagged the intentionally callable SECURITY DEFINER lookup function for review and the rate-limit table's RLS-without-policy informational finding. The rate-limit table is deliberately inaccessible to client roles.
- No user-level end-to-end authentication or Flock tests have run.
- npm dependency installation unavailable due to DNS resolution failure for registry.npmjs.org; Expo/TypeScript build not verified.

## Known blockers
- The mobile app's Bookings and legacy Contacts screens reference tables not yet copied into staging.
- Public registration remains disabled until Terms/Privacy acceptance is implemented.
- Rate limiting is per account only, not IP/device, and requires abuse review before public launch.
- No test users exist yet. Staging must not be assumed ready for public use.
