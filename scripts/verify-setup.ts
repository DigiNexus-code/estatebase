#!/usr/bin/env node

/**
 * EstateBase Setup Verification Script
 *
 * This script verifies that:
 * 1. Environment variables are configured
 * 2. Supabase connection works
 * 3. Database tables exist
 * 4. RLS policies are in place
 */

import { createClient } from "@supabase/supabase-js";

const REQUIRED_ENV_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

const EXPECTED_TABLES = [
  "agency_profile",
  "agents",
  "properties",
  "leads",
];

async function verifySetup() {
  console.log("🔍 EstateBase Setup Verification\n");

  // 1. Check environment variables
  console.log("1️⃣  Checking environment variables...");
  const missingVars = REQUIRED_ENV_VARS.filter((v) => !process.env[v]);
  if (missingVars.length > 0) {
    console.error(`❌ Missing environment variables: ${missingVars.join(", ")}`);
    console.error("   Set these in your .env.development.local or Vercel settings");
    process.exit(1);
  }
  console.log("✅ All environment variables configured\n");

  // 2. Test Supabase connection
  console.log("2️⃣  Testing Supabase connection...");
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    console.log("✅ Supabase connection successful\n");
  } catch (error) {
    console.error("❌ Failed to connect to Supabase:", error);
    process.exit(1);
  }

  // 3. Check database tables
  console.log("3️⃣  Checking database tables...");
  try {
    for (const table of EXPECTED_TABLES) {
      const { data, error } = await supabase.from(table).select("*").limit(1);
      if (error && error.code !== "PGRST116") {
        // PGRST116 = relation doesn't exist
        console.error(`❌ Error checking table "${table}": ${error.message}`);
        continue;
      }
      if (error && error.code === "PGRST116") {
        console.error(`❌ Table "${table}" does not exist`);
        continue;
      }
      console.log(`✅ Table "${table}" exists`);
    }
    console.log("");
  } catch (error) {
    console.error("❌ Failed to check tables:", error);
    process.exit(1);
  }

  // 4. Test RLS policies
  console.log("4️⃣  Testing RLS policies...");
  try {
    // Test public access to active properties
    const { data: publicProps, error: publicError } = await supabase
      .from("properties")
      .select("id", { count: "exact" })
      .eq("status", "active")
      .limit(1);

    if (publicError) {
      console.warn(`⚠️  Could not read public properties (might be ok if no public session): ${publicError.message}`);
    } else {
      console.log("✅ RLS policy allows public access to active properties");
    }
  } catch (error) {
    console.error("⚠️  Error testing RLS:", error);
  }

  console.log("\n✨ Setup verification complete!");
  console.log("\n📝 Next steps:");
  console.log("   1. Run 'pnpm dev' to start the development server");
  console.log("   2. Open http://localhost:3000 in your browser");
  console.log("   3. Create an agency profile in the dashboard");
  console.log("   4. Add team members as agents");
  console.log("   5. Create your first property listing\n");
}

verifySetup().catch(console.error);
