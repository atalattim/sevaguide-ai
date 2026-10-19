# SevaGuide AI (Phase 1)

Independent guide to Indian government services (Karnataka first). Not a government website.

## Run locally
1. `cp .env.example .env` and set `DATABASE_URL` (PostgreSQL).
2. `npm install`
3. `npx prisma migrate dev --name init`
4. `npm run db:seed` (demo data only, unverified)
5. `npm run dev` → http://localhost:3000

Build: `npm run build && npm run start`. Never commit `.env`.
Phase 2 adds Groq AI + checklist; Phase 3 adds admin, auth, SEO, analytics.

## Phase 2: AI + checklist
Set in `.env`: `GROQ_API_KEY` (from console.groq.com) and `GROQ_MODEL` (any chat model listed in your Groq console). The key is only read in `lib/groq.ts` (`server-only`).
- `POST /api/ai/chat`: intent → service lookup in DB → context → Groq → structured JSON. Unverified services never produce "verified facts"; `officialUrl` always comes from the DB.
- `POST /api/checklist`: builds the checklist; ticks are stored only in the browser (localStorage).
- Rate limiting is in-memory per instance; use Upstash/Redis for a global limit on Vercel.

## Phase 3: Admin, auth, SEO, analytics
1. Create a Google OAuth client; redirect URI: `{SITE_URL}/api/auth/callback/google`. Set `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `NEXTAUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_EMAILS`, `SITE_URL`.
2. Run `npx prisma migrate dev --name analytics` (adds `AnalyticsEvent`).
3. Sign in at `/login`; manage services at `/admin`. Only emails in `ADMIN_EMAILS` get in. Every admin page and `/api/admin/*` route re-checks the session.
4. A service can only be `VERIFIED` with an https official URL and source URL. The public site shows 🟢 only for those.
5. Analytics store only event name, service slug and language (no IP, user id or search text). Query with `SELECT name, count(*) FROM "AnalyticsEvent" GROUP BY 1;`.
6. SEO: `/sitemap.xml`, `/robots.txt`, per-page metadata/OpenGraph, JSON-LD on service pages.

## Deploy to Vercel
Add all env vars in the project settings, use a hosted Postgres (Neon/Supabase/Vercel Postgres), run `npx prisma migrate deploy` against it, then seed once. Build command is `npm run build`.

## Security notes
Secrets are server-only (`lib/groq.ts` imports `server-only`). Add a Content-Security-Policy with nonces before launch, and replace the in-memory rate limiter with Redis for a global limit.
