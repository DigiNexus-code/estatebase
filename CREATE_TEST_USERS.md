# How to Create Test Users in Supabase

## Problem
The test user credentials were provided but the users don't exist yet in Supabase Authentication. You must create them in the Supabase dashboard manually.

## Solution: Step-by-Step Guide

### Step 1: Go to Supabase Dashboard
1. Visit: https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Users** in the left sidebar

### Step 2: Create First Test User (Admin)

1. Click **"Invite"** or **"+ New user"** button
2. Enter these credentials:
   ```
   Email: admin@estatebase.test
   Password: Test@123456
   ```
3. Make sure "Auto confirm user" is checked ✓
4. Click **"Send invite"** or **"Create user"**

### Step 3: Create Second Test User (Agent)

1. Click **"Invite"** or **"+ New user"** again
2. Enter these credentials:
   ```
   Email: agent@estatebase.test
   Password: Test@123456
   ```
3. Make sure "Auto confirm user" is checked ✓
4. Click **"Send invite"** or **"Create user"**

### Step 4: Verify Users Were Created

After creating both users:
- You should see them listed in the **Users** table
- Status should show as "Active" or "Confirmed"
- Both users should be ready to login

## Login Testing

### Test 1: Admin Login
1. Go to: `/login` page
2. Enter:
   ```
   Email: admin@estatebase.test
   Password: Test@123456
   ```
3. Click "Sign in"
4. You should be redirected to `/dashboard`

### Test 2: Agent Login
1. Go to: `/login` page
2. Enter:
   ```
   Email: agent@estatebase.test
   Password: Test@123456
   ```
3. Click "Sign in"
4. You should be redirected to `/dashboard`

## Troubleshooting

### Issue: "Invalid login credentials"
**Solution**: 
- Verify the email and password exactly match what you entered in Supabase
- Make sure "Auto confirm user" was checked when creating the user
- Try creating the user again

### Issue: "User not found"
**Solution**:
- The user hasn't been created in Supabase yet
- Follow Steps 1-3 above to create the user
- Wait a few seconds after creation before trying to login

### Issue: "Session expired"
**Solution**:
- This is normal - just login again
- The session timeout is set to 1 hour by default

### Issue: Login page shows but nothing happens
**Solution**:
- Check browser console for errors (F12 → Console)
- Verify Supabase environment variables are set correctly
- Clear browser cache and try again

## How Authentication Works

1. **User enters credentials** on `/login` page
2. **Frontend sends request** to Supabase Auth with email/password
3. **Supabase verifies** credentials against auth.users table
4. **Session is created** if valid
5. **Middleware checks** session on protected routes (/dashboard)
6. **Access granted** if valid session found

## Important Notes

- Test users should only be used for development/testing
- Passwords are hashed in Supabase database (never stored in plain text)
- Sessions are stored as secure cookies
- Middleware automatically protects `/dashboard` routes
- Users must be logged in to access dashboard

## Files Involved in Login Flow

- **Frontend**: `app/login/page.tsx` - Login form component
- **Client**: `lib/supabase/client.ts` - Supabase client initialization
- **Server**: `lib/supabase/server.ts` - Server-side Supabase client
- **Middleware**: `middleware.ts` - Route protection logic
- **Database**: Supabase `auth.users` table stores user credentials

## Next Steps After Login Works

1. ✓ Create test users (THIS STEP)
2. Test login with both credentials
3. Verify dashboard loads
4. Test property creation
5. Test leads management
6. Test all features

---

**Created**: 2024
**Purpose**: Test user setup guide
**Status**: Follow these steps to enable login functionality
