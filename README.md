# EstateBase — Real Estate Listing Platform (Prototype)

A Next.js + TypeScript prototype for a real estate agency: a public listings
site (houses, plots, commercial, rentals) plus an agency dashboard to manage
properties, leads, and team members.

## What's included

**Public site**
- `/` — landing page: hero search, categories, featured listings, why-us, areas, CTA
- `/listings` — search results with filters (purpose, type, area) via query params
- `/listings/[id]` — property detail page with gallery, agent contact, similar listings

**Agency dashboard**
- `/dashboard` — overview with stats, top listings, recent leads
- `/dashboard/properties` — property manager table
- `/dashboard/properties/new` — multi-step add-property form
- `/dashboard/leads` — inquiry inbox with status tracking
- `/dashboard/agents` — team management
- `/dashboard/analytics` — views, lead sources, conversion
- `/dashboard/settings` — agency branding & contact info

## Data layer — Supabase, already wired in

`lib/data.ts` is what every page actually calls. It queries Supabase when
credentials are present, and silently falls back to `lib/mock-data.ts` when
they're not — so the project runs with zero setup, and goes live the moment
you add two environment variables.

**Setup per client (one Supabase project each, since deploys are one-per-client):**

1. Create a new project at supabase.com for this client.
2. Open the SQL editor and run `supabase/schema.sql` (creates tables + RLS
   policies), then `supabase/seed.sql` if you want the demo listings as a
   starting point.
3. Authentication → Users → Add user, for each staff member who needs
   dashboard access (owner + agents). There's no public sign-up form by
   design — `/login` only accepts existing accounts.
4. After creating the owner's user, insert their row into `agents` (see the
   commented example at the bottom of `seed.sql`) so their name/role shows
   in the Team page.
5. Storage → New bucket → `property-photos` (public), for listing images.
6. Copy `.env.local.example` to `.env.local`, fill in the URL + anon key from
   Settings → API, and add the same two variables in Vercel's project
   settings for the deployed site.

Once those env vars are set: `/dashboard/*` is gated by `middleware.ts`
(redirects to `/login` if signed out), listings write to real tables, and
leads submitted from the public site land in the dashboard's Leads inbox.

**Still mock/local for now** (small enough to wire per-client as needed):
- The "Add Property" form's submit currently just shows a confirmation —
  point it at `supabase.from('properties').insert(...)` to persist.
- The "Photos" upload step is a visual placeholder — wire it to
  `supabase.storage.from('property-photos').upload(...)`.
- `agencyProfile` (branding, in Settings) and `agents` (Team page) still read
  from `lib/mock-data.ts` directly rather than through `lib/data.ts` — same
  pattern, just not yet ported, since branding rarely changes.

## Local development

```bash
npm install
npm run dev
```

Visit http://localhost:3000

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Next.js (auto-detected). No extra config needed.
4. Deploy.

## Onboarding a new agency client

This project is built for a separate deploy per client — the simplest model,
and the right call unless you're running dozens of agencies at once:

1. Fork/clone this repo for the new client.
2. Edit `lib/mock-data.ts` → `agencyProfile` with their name, tagline, city,
   contact info, and areas covered (this is also what `supabase/seed.sql`
   inserts, so keep the two in sync).
3. Optionally adjust `tailwind.config.ts` colors (`primary`, `brass`, `clay`)
   if the client wants their own palette instead of the default teal/brass.
4. Follow the Supabase setup steps above with a fresh project for this client.
5. Push to a new GitHub repo → import into a new Vercel project → add the
   client's Supabase env vars → deploy. Point their domain at it.

Each client ends up fully isolated: own database, own auth users, own domain,
own branding — nothing shared between them.
