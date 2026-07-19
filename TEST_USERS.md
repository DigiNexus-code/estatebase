# EstateBase - Test User Guide

## How to Create Test Users in Supabase

Since EstateBase uses Supabase Authentication, test users must be created via the Supabase dashboard.

### Step 1: Go to Supabase Dashboard
1. Visit: https://app.supabase.com
2. Select your project: **estatebase** (ID: tpnjtriqjguinargvgzz)
3. Go to **Authentication** → **Users** in the left sidebar

### Step 2: Create New Users
Click **"Add user"** button and create the following test users:

---

## Test User Credentials

### Test User 1 - Admin
**Email:** `admin@estatebase.test`  
**Password:** `Test@123456`  
**Role:** Owner  

**Steps to create:**
1. Click "Add user"
2. Email: `admin@estatebase.test`
3. Password: `Test@123456`
4. Confirm password
5. Click "Create user"

### Test User 2 - Agent
**Email:** `agent@estatebase.test`  
**Password:** `Test@123456`  
**Role:** Agent

**Steps to create:**
1. Click "Add user"
2. Email: `agent@estatebase.test`
3. Password: `Test@123456`
4. Confirm password
5. Click "Create user"

---

## How to Use Test Credentials

### Login to Dashboard
1. Go to: https://v0-project-imh5au649-newsweek2002-2162s-projects.vercel.app/login
2. Enter email: `admin@estatebase.test`
3. Enter password: `Test@123456`
4. Click "Sign in"

### What You Can Do
- ✅ Create properties
- ✅ Upload property images
- ✅ Manage property status (active/pending/sold/rented/draft)
- ✅ View and manage leads
- ✅ Filter properties and leads
- ✅ Search leads by name/phone

---

## Testing Workflow

### 1. Create a Property
- Dashboard → Properties → "+ Add Property"
- Fill all 5 steps:
  1. Basic Info (title, purpose, type, description)
  2. Location (city, area, address)
  3. Pricing & Size (price, size, bedrooms, bathrooms)
  4. Media & Amenities (upload images, select amenities)
  5. Review (verify and submit)

### 2. Manage Properties
- Dashboard → Properties
- Use status buttons to change property status
- Filter properties by status
- View property details

### 3. Manage Leads
- Dashboard → Leads
- Filter by status (New/Contacted/Closed)
- Search by name or phone
- Change lead status with buttons
- Contact via WhatsApp or phone

### 4. Test Public Site
- Homepage: https://v0-project-imh5au649-newsweek2002-2162s-projects.vercel.app
- Browse featured properties
- Submit inquiry form

---

## Troubleshooting

### Can't Login?
1. Make sure user is created in Supabase Authentication → Users
2. Check email and password are correct
3. Clear browser cache and try again
4. Check browser console for errors (F12)

### Can't See Properties After Creating?
1. Check that property status is set to "active"
2. Properties with other statuses won't show on public site
3. But they'll show in dashboard Properties list

### Image Upload Not Working?
1. Use JPG or PNG format only
2. File size should be under 5MB
3. Try dragging and dropping instead of clicking

---

## Account Management

### Change Password
1. Login to Supabase dashboard
2. Go to Authentication → Users
3. Click on the user
4. Click "Reset Password"
5. User will receive email with reset link

### Delete User
1. Login to Supabase dashboard
2. Go to Authentication → Users
3. Click on the user
4. Click the menu (⋮) → Delete

---

## Additional Notes

- Test credentials are for development/testing only
- Do NOT use these in production
- Create separate accounts for each team member
- Password must be at least 6 characters
- Use strong passwords in production

---

**Last Updated:** July 18, 2026  
**Database:** Supabase (tpnjtriqjguinargvgzz)  
**Production URL:** https://v0-project-imh5au649-newsweek2002-2162s-projects.vercel.app
