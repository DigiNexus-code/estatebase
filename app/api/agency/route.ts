import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAgencyProfile, updateAgencyProfile } from "@/lib/db";

/**
 * GET /api/agency
 * Fetch agency profile (public, no auth required)
 */
export async function GET(request: NextRequest) {
  try {
    const profile = await getAgencyProfile();
    
    if (!profile) {
      return NextResponse.json(
        { success: false, error: "Agency profile not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("[v0] GET /api/agency error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/agency
 * Update agency profile (authenticated dashboard only)
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const profile = await updateAgencyProfile(body);

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error("[v0] PUT /api/agency error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
