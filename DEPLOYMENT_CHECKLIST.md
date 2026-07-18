# EstateBase Deployment Checklist

Use this checklist to ensure everything is properly set up before deploying to production.

## ✅ Pre-Deployment Checklist

### Database & Backend
- [x] Supabase project created
- [x] Database schema applied (tables: agency_profile, agents, properties, leads)
- [x] Row Level Security (RLS) policies configured
- [x] Authentication enabled with email/password
- [x] Storage bucket created for property images (optional)

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set in `.env.development.local`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in `.env.development.local`
- [ ] `.env.development.local` is NOT committed to git (check .gitignore)
- [ ] All variables verified to work locally

### Local Testing
- [ ] Run `pnpm dev` successfully
- [ ] Homepage loads at http://localhost:3000
- [ ] Public listings page works: http://localhost:3000/listings
- [ ] Can create an account: http://localhost:3000/login (sign up)
- [ ] Can log in with created account
- [ ] Can access dashboard after login
- [ ] Can create a property listing
- [ ] Property appears on public listings
- [ ] Can submit a lead/inquiry
- [ ] Lead appears in dashboard

### Code Quality
- [ ] Run `pnpm build` completes without errors
- [ ] No TypeScript errors: check terminal output
- [ ] No console errors in browser
- [ ] All links and forms work correctly

## 🚀 Vercel Deployment

### GitHub Setup
- [ ] Project pushed to GitHub repository
- [ ] Repository is public or Vercel has access
- [ ] main branch contains latest code
- [ ] .env.development.local is in .gitignore

### Vercel Project
- [ ] Vercel account created at vercel.com
- [ ] New project created in Vercel dashboard
- [ ] GitHub repository connected
- [ ] Next.js framework auto-detected

### Environment Variables in Vercel
- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` (from Supabase Settings → API)
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` (from Supabase Settings → API)
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY` (from Supabase Settings → API)
- [ ] Verified variables are set for all environments (Production, Preview, Development)

### Deployment
- [ ] Clicked "Deploy" in Vercel
- [ ] Deployment completed successfully
- [ ] Build logs show no errors
- [ ] Vercel domain assigned (usually estatebase.vercel.app)

## 🔐 Post-Deployment Verification

### Supabase Configuration
- [ ] Supabase → Authentication → URL Configuration
- [ ] Added your Vercel domain to "Redirect URLs":
  ```
  https://your-domain.vercel.app/auth/callback
  ```
- [ ] For custom domain (if using):
  ```
  https://your-custom-domain.com/auth/callback
  ```

### Live Site Testing
- [ ] Homepage loads at your Vercel URL
- [ ] Public listings page works
- [ ] Can create new account on live site
- [ ] Can log in with created account
- [ ] Dashboard is accessible after login
- [ ] Can create a property listing
- [ ] Property appears on public listings after ~1 minute
- [ ] Can submit a lead/inquiry
- [ ] Lead appears in dashboard leads page
- [ ] Mobile view works correctly (responsive design)

### Security Verification
- [ ] Environment variables are NOT visible in source code
- [ ] .env files are in .gitignore
- [ ] HTTPS is enabled (automatic with Vercel)
- [ ] RLS policies protect data correctly
- [ ] Only authenticated users can access dashboard

### Performance Check
- [ ] Homepage loads in < 3 seconds
- [ ] Listings page loads quickly with filters
- [ ] Dashboard pages respond quickly
- [ ] No console errors in browser
- [ ] No failed API requests in Network tab

## 📊 Post-Launch Monitoring

### Week 1
- [ ] Monitor Vercel analytics
- [ ] Check Supabase performance metrics
- [ ] Review any error logs
- [ ] Test all user workflows
- [ ] Ensure email notifications work (if configured)

### Ongoing
- [ ] Set up monitoring/alerts in Vercel
- [ ] Regular backups of Supabase data
- [ ] Monitor database storage usage
- [ ] Check for security updates
- [ ] Monitor site performance

## 🛠️ Troubleshooting

### Deployment Fails
- [ ] Check Vercel build logs for errors
- [ ] Verify all environment variables are set
- [ ] Ensure GitHub repository is public or connected
- [ ] Check for TypeScript errors locally first

### Authentication Issues
- [ ] Verify Supabase redirect URLs are correct
- [ ] Check that email is confirmed in Supabase
- [ ] Clear browser cookies and try again
- [ ] Check Supabase auth logs for errors

### Database Errors
- [ ] Verify Supabase credentials in environment variables
- [ ] Check RLS policies in Supabase
- [ ] Ensure database schema is up to date
- [ ] Check Supabase storage quota

### UI/Performance Issues
- [ ] Clear browser cache
- [ ] Check for missing environment variables
- [ ] Review browser console for errors
- [ ] Check Vercel analytics for slow pages

## 📝 Configuration Notes

### Supabase Project ID
```
tpnjtriqjguinargvgzz
```

### Database Tables
- `agency_profile` - Agency information
- `agents` - Team members
- `properties` - Property listings
- `leads` - Property inquiries

### RLS Policies
- Public: Can view active properties and submit leads
- Authenticated: Can manage all data

### Auth Settings
- Email confirmation may be required (configurable)
- No public sign-up from dashboard
- Users created manually or via sign-up form

## 🎯 Next Steps After Launch

1. **Add Initial Content**
   - [ ] Create agency profile with branding
   - [ ] Add first few property listings
   - [ ] Add team members as agents

2. **Configure Domain (Optional)**
   - [ ] Purchase custom domain
   - [ ] Point domain to Vercel
   - [ ] Update Supabase redirect URLs
   - [ ] Enable automatic HTTPS

3. **Set Up Analytics (Optional)**
   - [ ] Enable Vercel Web Analytics
   - [ ] Set up Google Analytics
   - [ ] Configure Supabase usage monitoring

4. **Backup & Maintenance**
   - [ ] Enable automated backups in Supabase
   - [ ] Set up error tracking/monitoring
   - [ ] Plan for database maintenance
   - [ ] Document deployment process for team

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Supabase dashboard for errors
3. Check Vercel deployment logs
4. Review browser console for client errors
5. Check application README and documentation

---

**Ready to deploy?** Follow this checklist step-by-step for a smooth launch! 🚀
