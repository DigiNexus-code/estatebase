import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updateLeadStatus } from "@/lib/db";

/**
 * PUT /api/leads/[id]
 * Update lead status (new, contacted, closed)
 * Body: { status: "new" | "contacted" | "closed" }
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const { status } = await request.json();
    
    if (!["new", "contacted", "closed"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const lead = await updateLeadStatus(params.id, status);

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error("[v0] PUT /api/leads/[id] error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
