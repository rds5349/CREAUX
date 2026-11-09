# CREAUX v0.6 staging deployment and acceptance tests

Production database must remain untouched until staging passes and approval is obtained.

## Prerequisites
- Create a separate Supabase staging project (billing/organization approval may be needed).
- Configure staging URL and staging publishable key in local .env; never commit secrets.
- Confirm Supabase Auth email settings, redirect URLs, and test accounts.
- Apply reviewed migrations in dependency order: mobile_directory_and_flocks, private_discovery_v6. Do NOT deploy the old PROPOSED_username_search.sql (it lacks protections).
- Run security advisors and review every RLS policy and function grant.

## End-to-end acceptance checklist
1. Create social account with test email; confirm email; sign in and persist session after app restart.
2. Create professional account; update profile; verify owner-only private data.
3. Check discovery preference defaults OFF for newly created users.
4. From user B search exact username of user A: no result while A is opted out.
5. A enables discovery; B searches exact username and sees only public name and username.
6. Run 10 searches by B within one minute; 11th must be rate-limited. Repeat with parallel requests to test advisory lock.
7. Anonymous client cannot execute discovery RPC or read rate-limit table.
8. B sends request to A; A accepts; B cannot accept own outgoing request; unrelated C cannot alter request.
9. Confirm accepted relationship does not expose private email/phone and cannot revert to pending.
10. Verify directory lists only published professional listings; unpublished listings owner-only.
11. Run `npm ci` and `npm run typecheck`; test on iOS and Android development builds.
12. Check deep links, password reset, logout, disabled/expired sessions, network errors.

## Release gates
- Privacy and rate limiting tested in staging; cleanup and monitoring configured.
- Legal Terms/Privacy Policy finalized; signup acceptance recorded server-side.
- Store signing credentials, developer accounts, and payment compliance reviewed.
- Explicit authorization before applying migrations to production.
