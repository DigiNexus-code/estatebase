# EstateBase Deployment Guide

## Overview

EstateBase is a Next.js 14 real estate platform with Supabase backend. This guide covers:
- Deploying to Vercel
- Setting up Supabase infrastructure
- Configuring environment variables
- Deployment workflow

## Prerequisites

✅ **Already Completed:**
- ✅ Supabase database schema created (tables: agency_profile, agents, properties, leads)
- ✅ Row Level Security (RLS) policies configured
- ✅ Supabase integration connected

## Quick Start

### 1. Environment Variables

The following environment variables are required in Vercel project settings. These are already in your `.env.development.local` but must be added to Vercel for production:

**Public Variables (safe to expose):**
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

**Private Variables (server-side only):**
- `SUPABASE_SERVICE_ROLE_KEY` - For server-side operations (never expose to client)

### 2. Deploy to Vercel

**Option A: Using GitHub (Recommended)**
1. Push this project to a GitHub repository
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Select your GitHub repository
5. Vercel will auto-detect Next.js
6. Add environment variables in the "Environment Variables" section:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://tpnjtriqjguinargvgzz.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<your_service_role_key>
   ```
7. Click "Deploy"

**Option B: CLI Deployment**
```bash
pnpm install -g vercel
vercel
```

### 3. Supabase Configuration for Production

Your Supabase instance is already set up, but verify these settings:

**Check Auth Settings:**
1. Go to Supabase Dashboard → Authentication → Providers
2. Confirm Email/Password auth is enabled
3. Set redirect URLs in Auth → URL Configuration:
   - `https://your-vercel-domain.vercel.app/auth/callback`
   - `http://localhost:3000/auth/callback` (for local development)

**Enable Email Confirmation (Optional):**
By default, users must confirm email after signup. To adjust:
1. Go to Authentication → Policies
2. Configure email confirmation requirements

## Project Structure

```
app/
├── page.tsx                    # Homepage (public listings)
├── layout.tsx                  # Root layout
├── login/page.tsx              # Login page
├── listings/                   # Public property listings
│   ├── page.tsx               # Listings grid
│   └── [id]/page.tsx          # Property detail page
└── dashboard/                 # Protected staff area
    ├── layout.tsx             # Dashboard layout with sidebar
    ├── page.tsx               # Dashboard home
    ├── properties/            # Property management
    ├── agents/                # Agent management
    ├── leads/                 # Lead management
    ├── analytics/             # Analytics dashboard
    └── settings/              # Agency settings

lib/
├── supabase/
│   ├── client.ts              # Browser client
│   ├── server.ts              # Server client
│   └── proxy.ts               # Session handling
├── data.ts                    # Supabase data fetching
├── types.ts                   # TypeScript types
└── utils.ts                   # Utilities

components/
├── ui/
│   └── button.tsx             # Base button component
├── Navbar.tsx                 # Navigation bar
├── Sidebar.tsx                # Dashboard sidebar
├── PropertyCard.tsx           # Property listing card
└── ...                        # Other components

middleware.ts                  # Auth middleware
```

## Key Features

### Public Features
- **Property Listings**: Browse all active properties with filters
- **Property Details**: View full property information and photos
- **Lead Submission**: Contact form for property inquiries

### Staff Features (Authenticated)
- **Dashboard**: Overview of properties, leads, and analytics
- **Property Management**: Create, edit, and publish property listings
- **Lead Management**: Track and manage property inquiries
- **Agent Management**: Add and manage team members
- **Analytics**: View performance metrics
- **Settings**: Update agency profile

## Database Schema

### Tables

**agency_profile**
- Agency information and contact details
- One row per Supabase project (one agency per project)

**agents**
- Team members with different roles (owner/agent)
- Links to auth.users via auth.uid()

**properties**
- Real estate listings with detailed information
- Status: active, pending, sold, rented, draft
- Supports sale/rent listings

**leads**
- Property inquiries from potential buyers/renters
- Tracks lead status: new, contacted, closed

### Row Level Security

- **Public Access**: Anyone can view `active` properties
- **Staff Access**: Authenticated users can manage all data
- **Lead Submissions**: Anyone can submit a lead inquiry

## Development

### Local Setup
```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment File
Create `.env.development.local` with Supabase credentials (already done in this project).

## Troubleshooting

### RLS Errors
If you see "new row violates row-level security policy", ensure:
1. User is authenticated
2. User has appropriate role
3. RLS policy allows the operation

### Auth Not Working
- Check redirect URLs in Supabase Auth settings
- Verify environment variables are set correctly
- Check middleware.ts is being invoked

### Properties Not Loading
- Verify RLS policy `"Public can view active properties"` exists
- Ensure properties have status = 'active'
- Check browser console for errors

## Production Checklist

- [ ] Environment variables set in Vercel
- [ ] Supabase auth redirect URLs configured
- [ ] Email confirmation settings verified
- [ ] Database backups enabled in Supabase
- [ ] CORS and security settings reviewed
- [ ] Performance monitoring set up
- [ ] Error handling and logging configured

## Support & Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

## Next Steps

1. Test the application locally: `pnpm dev`
2. Create initial agency profile in dashboard
3. Add team members as agents
4. Create sample properties
5. Test public listings and lead submission
6. Deploy to Vercel when ready

---

**Deployed Version**: Will be available at your Vercel domain once deployed
**Local Preview**: http://localhost:3000
**Supabase Project**: https://tpnjtriqjguinargvgzz.supabase.co
