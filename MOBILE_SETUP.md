# CREAUX mobile setup

Use the extracted repository source. The ZIP is the original import snapshot and is no longer the latest code.

```bash
npm ci
cp .env.example .env
npm run typecheck
npm run check
npx expo-doctor
npm run export
npm run web
```

The example environment points to staging. Never commit `.env` or private credentials.

`npm run export` creates web assets and iOS/Android JavaScript bundles, not signed installable apps. Native device testing and authenticated user-flow testing are still required. Signup remains disabled pending terms/privacy and versioned consent tracking.

See VERIFIED_PROGRESS.md for the latest verified checks and remaining beta work.
