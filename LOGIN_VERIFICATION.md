# Login System Verification Guide

## Quick Start

### Step 1: Create Test Users in Supabase
1. Go to https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Users**
4. Create user with: `admin@estatebase.test` / `Test@123456`
5. Create user with: `agent@estatebase.test` / `Test@123456`
6. Make sure "Auto confirm user" is enabled

### Step 2: Test Login

**Test Case 1: Valid Admin Credentials**
```
URL: https://your-app.vercel.app/login
Email: admin@estatebase.test
Password: Test@123456
Expected: Redirects to /dashboard with session active
```

**Test Case 2: Valid Agent Credentials**
```
URL: https://your-app.vercel.app/login
Email: agent@estatebase.test
Password: Test@123456
Expected: Redirects to /dashboard with session active
```

**Test Case 3: Invalid Credentials**
```
URL: https://your-app.vercel.app/login
Email: admin@estatebase.test
Password: wrongpassword
Expected: Shows error: "Invalid login credentials"
```

**Test Case 4: Non-existent User**
```
URL: https://your-app.vercel.app/login
Email: nonexistent@test.com
Password: Test@123456
Expected: Shows error: "User not found"
```

## System Architecture

### 1. Frontend (app/login/page.tsx)
```
User enters credentials
    ↓
Form submitted to Supabase Auth
    ↓
Supabase validates email/password
    ↓
Session created in secure cookies
    ↓
User redirected to /dashboard
```

### 2. Middleware (middleware.ts)
```
Request to /dashboard
    ↓
Middleware checks for valid session
    ↓
If valid → Allow access
If invalid → Redirect to /login?next=/dashboard
```

### 3. Database (Supabase)
```
auth.users table (Supabase managed)
├── email: admin@estatebase.test
├── encrypted_password: [hashed]
├── confirmed_at: [timestamp]
└── last_sign_in_at: [timestamp]

agents table (public schema)
├── id: (references auth.users.id)
├── email: admin@estatebase.test
├── name: Admin Agent
└── role: admin
```

## Testing the Login Flow

### Manual Testing Steps

**Step 1: Verify Test Users Exist**
```bash
# Check Supabase dashboard → Authentication → Users
# Should see:
# - admin@estatebase.test (Active)
# - agent@estatebase.test (Active)
```

**Step 2: Test Frontend Login Form**
1. Open https://your-app/login
2. Click "Show Test Credentials"
3. Click "Admin Account" button
4. Fields should auto-fill with `admin@estatebase.test` and `Test@123456`
5. Click "Sign In"
6. Should redirect to `/dashboard`

**Step 3: Verify Session**
1. In browser DevTools (F12)
2. Go to **Application** → **Cookies**
3. Look for `sb-*-auth-token` cookie
4. Should exist and contain valid JWT token

**Step 4: Check Auth Status**
```bash
# Make a request to the debug endpoint
curl https://your-app/api/auth/status

# If authenticated, response:
{
  "status": "authenticated",
  "message": "Session active",
  "session": {
    "user_id": "uuid-here",
    "email": "admin@estatebase.test",
    "created_at": "2024-07-19T...",
    "expires_at": 1234567890
  }
}

# If not authenticated, response:
{
  "status": "not_authenticated",
  "message": "No active session",
  "session": null
}
```

**Step 5: Test Logout by Clearing Cookies**
1. Open DevTools → Application → Cookies
2. Delete `sb-*-auth-token` cookie
3. Try to access `/dashboard`
4. Should redirect to `/login`

## Debugging Issues

### Issue: "Invalid login credentials"

**Checklist:**
- [ ] User exists in Supabase (Authentication → Users)
- [ ] Email matches exactly (including case)
- [ ] Password matches exactly
- [ ] User status is "Active" or "Confirmed"
- [ ] "Auto confirm user" was checked when creating user
- [ ] Check browser console for detailed error (F12 → Console)

**Solution:**
1. Delete the user from Supabase
2. Create it again with exact credentials
3. Ensure "Auto confirm user" is checked
4. Try login again after 5 seconds

### Issue: "User not found"

**Causes:**
- User doesn't exist in Supabase
- User was created with different email

**Solution:**
1. Go to Supabase dashboard
2. Authentication → Users
3. Verify test users exist
4. If missing, create them

### Issue: Infinite redirect loop

**Causes:**
- Session not being created properly
- Middleware misconfigured
- Cookie settings issue

**Solution:**
1. Clear all browser cookies (F12 → Application → Cookies)
2. Clear browser cache
3. Try login again in incognito window
4. Check browser console for errors

### Issue: Login button doesn't respond

**Causes:**
- Supabase credentials not configured
- Network error
- Browser console error

**Solution:**
1. Check environment variables: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Open browser console (F12) and check for errors
3. Check network tab for failed requests
4. Verify Supabase project is active

## File Structure

```
app/
├── login/
│   └── page.tsx              ← Login form with debugging
├── dashboard/
│   └── layout.tsx            ← Protected route
├── api/
│   └── auth/
│       └── status/
│           └── route.ts      ← Debug endpoint
└── layout.tsx

lib/
├── supabase/
│   ├── client.ts             ← Browser client
│   └── server.ts             ← Server client
└── db.ts                      ← Database functions

middleware.ts                   ← Route protection
```

## Key Components

### 1. Login Page (app/login/page.tsx)
- Form to collect email/password
- Auto-fill buttons for test credentials
- Error display with helpful hints
- Detailed console logging for debugging
- Responsive design with animations

### 2. Middleware (middleware.ts)
- Checks session validity
- Protects `/dashboard` routes
- Redirects unauthenticated users to `/login`
- Preserves redirect URL for post-login redirect

### 3. Supabase Client (lib/supabase/client.ts)
- Browser-side authentication
- Manages user sessions
- Handles login/logout
- Automatic cookie management

### 4. Auth Status Endpoint (app/api/auth/status/route.ts)
- Returns current session info
- Useful for debugging
- No authentication required to call it
- Returns user details if authenticated

## Common Error Messages

| Error | Cause | Fix |
|-------|-------|-----|
| `Invalid login credentials` | Wrong email/password | Check Supabase, verify credentials |
| `User not found` | User doesn't exist | Create user in Supabase dashboard |
| `Session expired` | Session timed out | Login again |
| `SUPABASE_URL not configured` | Missing env var | Set NEXT_PUBLIC_SUPABASE_URL |
| `Invalid Supabase credentials` | Bad API key | Check NEXT_PUBLIC_SUPABASE_ANON_KEY |

## Testing Checklist

- [ ] Test users created in Supabase
- [ ] Admin login works (admin@estatebase.test)
- [ ] Agent login works (agent@estatebase.test)
- [ ] Invalid credentials show error
- [ ] Logged-in users can access /dashboard
- [ ] Logged-out users redirected to /login
- [ ] Session persists after page reload
- [ ] Logout clears session
- [ ] /api/auth/status shows correct info
- [ ] Browser console has no errors

## Production Checklist

Before deploying to production:
- [ ] All test users deleted from Supabase
- [ ] Proper password policy enforced
- [ ] Email verification enabled
- [ ] Session timeout configured
- [ ] HTTPS enforced
- [ ] Environment variables secure
- [ ] Error messages don't leak sensitive info
- [ ] Rate limiting enabled on auth endpoints
- [ ] Monitoring/logging configured
- [ ] Backup procedures in place

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Next.js Guide](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [JWT and Sessions](https://supabase.com/docs/guides/auth/passwords)

---

**Last Updated**: July 2024
**Status**: Ready for testing
**Next**: Follow the quick start steps above
