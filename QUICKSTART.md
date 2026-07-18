# EstateBase Quick Start

Get EstateBase up and running in 5 minutes.

## 🚀 Quick Setup

### 1. Install & Run Locally

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Visit http://localhost:3000
```

### 2. Create Your Account

- Go to http://localhost:3000/login
- Click "Sign Up"
- Create an account with any email/password
- (Email confirmation may be required; check Supabase dashboard or console)

### 3. Set Up Your Agency

After logging in, click **Dashboard** → **Settings** and fill in:
- Agency name
- Phone, WhatsApp, email
- Service areas
- Years in business

### 4. Create a Property

Click **Dashboard** → **Properties** → **Add Property**
- Title: "Modern 4-Bedroom House in DHA"
- Type: House
- Purpose: Sale
- Price: 2500000
- City: Karachi
- Area: 10 marla
- Beds: 4
- Baths: 2
- Description: Add details about the property
- Click **Publish** to make it live

### 5. View on Public Site

- Go to http://localhost:3000/listings
- See your property listed
- Click on it to view details
- Fill out the inquiry form to submit a lead

## 📊 Dashboard Features

| Page | What You Can Do |
|------|-----------------|
| **Home** | View agency stats & recent activity |
| **Properties** | Create, edit, publish property listings |
| **Leads** | Track property inquiries from buyers |
| **Agents** | Add team members with different roles |
| **Analytics** | View property views & lead performance |
| **Settings** | Update agency profile & branding |

## 🌐 Public Site Features

| Page | What Visitors See |
|------|-------------------|
| **Home** | Featured properties & search |
| **Listings** | Browse all active properties |
| **Detail** | Full property info & contact form |

## 🚢 Deploy to Vercel

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/your-username/estatebase.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Select your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` (from Supabase Settings → API)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase)
   - `SUPABASE_SERVICE_ROLE_KEY` (from Supabase)
5. Click "Deploy"

### Step 3: Configure Supabase for Production

1. Go to Supabase → Authentication → URL Configuration
2. Add your Vercel domain:
   ```
   https://your-app.vercel.app/auth/callback
   ```

Your app is now live! 🎉

## 🔑 Environment Variables

The app needs these to work:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
```

These are already in `.env.development.local`. For production deployment, add them to Vercel project settings.

## ⚡ Common Tasks

### Create a lead/inquiry
- Public site → Browse listings → Click property → Fill form

### Update lead status
- Dashboard → Leads → Click lead → Change status

### Publish a property
- Dashboard → Properties → Edit → Set to "Active"

### Add an agent
- Dashboard → Agents → Add Agent → Enter details

### View property performance
- Dashboard → Analytics → See views and leads

## 🐛 Troubleshooting

**Properties not showing?**
- Make sure status is set to "Active"
- Check that it's saved in the database

**Can't log in?**
- Verify your user exists in Supabase Auth
- Try clearing browser cookies
- Check email confirmation status

**Leads not saving?**
- Ensure database connection is working
- Check Supabase RLS policies are set correctly

## 📚 Full Documentation

- **Setup Guide**: See `SETUP.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Project Details**: See `README.md`

## 🆘 Need Help?

- Check the docs above
- Review code comments in `lib/` folder
- Check Supabase dashboard for any errors
- Review browser console for client-side errors

---

**Ready to go?** Run `pnpm dev` and start building! 🏠
