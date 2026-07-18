# EstateBase Setup Guide

Welcome to EstateBase! This guide will help you set up the application locally and deploy it to Vercel.

## Prerequisites

Ensure you have:
- Node.js 18+ installed
- pnpm (or npm/yarn)
- A Supabase account
- A Vercel account (for deployment)

## Local Development Setup

### Step 1: Install Dependencies

```bash
cd /path/to/estatebase
pnpm install
```

### Step 2: Environment Variables

The `.env.development.local` file contains your Supabase credentials. Make sure it's in the project root with these keys:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tpnjtriqjguinargvgzz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important**: Never commit `.env.development.local` to git. It contains secrets!

### Step 3: Verify Setup

```bash
pnpm verify
```

This script checks:
- ✅ Environment variables are configured
- ✅ Supabase connection works
- ✅ Database tables exist
- ✅ RLS policies are configured

### Step 4: Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You should see the EstateBase homepage with public property listings.

## First-Time Usage

### 1. Create an Account

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Click "Sign Up"
3. Enter your email and password
4. Confirm your email (check your inbox or Supabase email console)
5. Log in with your credentials

### 2. Set Up Your Agency Profile

1. After logging in, go to **Dashboard** → **Settings**
2. Fill in your agency information:
   - Agency name
   - Tagline
   - Contact information (phone, WhatsApp, email)
   - Service areas
   - Years in business
3. Click "Save"

### 3. Add Team Members

1. Go to **Dashboard** → **Agents**
2. Click "Add Agent"
3. Enter agent details:
   - Name
   - Role (Owner or Agent)
   - Contact information
4. Each agent can create their own account and log in

### 4. Create Your First Property

1. Go to **Dashboard** → **Properties**
2. Click "Add Property"
3. Fill in property details:
   - Title (e.g., "Modern 4-Bed House in DHA")
   - Type (House, Plot, Commercial, Apartment)
   - Purpose (Sale or Rent)
   - Price and location
   - Beds/baths
   - Size and unit
   - Description and amenities
4. Upload property images
5. Set status to "Active" to publish
6. Click "Save"

### 5. Manage Leads

1. When potential buyers submit inquiries, they appear in **Dashboard** → **Leads**
2. View lead details and contact information
3. Update lead status (New → Contacted → Closed)

## Project Structure

```
estatebase/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage
│   ├── listings/          # Public property listings
│   ├── dashboard/         # Protected staff area
│   └── login/             # Authentication
├── components/            # React components
├── lib/
│   ├── supabase/          # Supabase clients
│   ├── data.ts            # Data fetching
│   └── types.ts           # TypeScript types
├── public/                # Static assets
└── DEPLOYMENT.md          # Deployment guide
```

## Features Overview

### 🌍 Public Site
- **Homepage**: Featured properties showcase
- **Listings**: Browse all active properties with filters
- **Property Details**: View full information, images, and contact form
- **Lead Submission**: Submit inquiry for any property

### 🔐 Dashboard (Staff Only)
- **Properties**: Create, edit, publish, and manage listings
- **Leads**: Track and manage property inquiries
- **Agents**: Add and manage team members
- **Analytics**: View property performance and lead stats
- **Settings**: Update agency profile and preferences

## Deployment to Vercel

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/estatebase.git
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Vercel auto-detects Next.js configuration

3. **Add Environment Variables**
   - In Vercel project settings → "Environment Variables"
   - Add:
     ```
     NEXT_PUBLIC_SUPABASE_URL=https://tpnjtriqjguinargvgzz.supabase.co
     NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
     SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
     ```

4. **Deploy**
   - Click "Deploy"
   - Your app will be live at `https://estatebase.vercel.app` (or your custom domain)

### Option 2: Vercel CLI

```bash
# Install Vercel CLI globally
pnpm install -g vercel

# Deploy
vercel

# Follow the prompts to select project and environment variables
```

### Option 3: Manual Deployment

```bash
# Build the app
pnpm build

# Test the production build locally
pnpm start

# Deploy to Vercel (after connecting GitHub or using Vercel CLI)
```

## Supabase Configuration for Production

After deploying to Vercel, verify these settings in Supabase:

### 1. Authentication Settings
- Go to **Authentication** → **URL Configuration**
- Add your Vercel domain to redirect URLs:
  ```
  https://your-app.vercel.app/auth/callback
  ```

### 2. Email Confirmation (Optional)
- Go to **Authentication** → **Policies**
- Configure whether email confirmation is required
- By default, users must confirm email before RLS policies allow data access

### 3. Database Security
- Verify RLS (Row Level Security) policies exist
- Check that public can view `active` properties
- Ensure staff can manage all data when authenticated

## Troubleshooting

### "Database connection failed"
- [ ] Check environment variables in Vercel settings
- [ ] Verify Supabase project is not paused
- [ ] Check network connectivity to Supabase

### "RLS policy violation" when creating properties
- [ ] Ensure you're logged in
- [ ] Check email is confirmed in Supabase Auth
- [ ] Verify your user exists in the `agents` table

### Properties not showing on public listings
- [ ] Ensure properties have `status = 'active'`
- [ ] Check browser console for errors
- [ ] Verify RLS policy `"Public can view active properties"` exists

### Authentication not working
- [ ] Check redirect URL in Supabase Auth settings
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` and anon key are correct
- [ ] Clear browser cookies and try again

## Common Tasks

### Change Agency Information
1. Dashboard → Settings → Edit agency profile → Save

### Add More Agents
1. Dashboard → Agents → Add Agent → Enter details → Save
2. Each agent creates their own account and logs in

### Publish a Property
1. Dashboard → Properties → Edit → Set status to "Active" → Save

### Track Leads
1. Dashboard → Leads → View all inquiries
2. Click on a lead to view contact info and message
3. Update status as you progress

### View Analytics
1. Dashboard → Analytics
2. See property views, leads, and performance metrics

## Support & Resources

- **Documentation**: See `README.md` and `DEPLOYMENT.md`
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs

## Security Best Practices

1. **Never commit secrets**: `.env.development.local` should be in `.gitignore`
2. **Use environment variables**: Store all sensitive data in env vars
3. **Enable RLS**: Database tables use Row Level Security for data protection
4. **Validate input**: All forms validate input before submission
5. **Secure cookies**: Session cookies are secure and HTTP-only

## Next Steps

- [ ] Complete local setup and verify it works
- [ ] Create an agency profile
- [ ] Add some sample properties
- [ ] Test the public listing page
- [ ] Deploy to Vercel
- [ ] Configure Supabase auth redirect URLs for your domain
- [ ] Set up custom domain (optional)
- [ ] Monitor performance with Vercel analytics

---

**Questions?** Check the troubleshooting section above or review the inline code comments.

Happy listing! 🏠
