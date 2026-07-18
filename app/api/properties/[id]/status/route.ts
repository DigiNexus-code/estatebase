import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { updatePropertyStatus } from "@/lib/db";

/**
 * PUT /api/properties/[id]/status
 * Update property status (active, pending, sold, rented, draft)
 * Body: { status: "active" | "pending" | "sold" | "rented" | "draft" }
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
    
    if (!["active", "pending", "sold", "rented", "draft"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const property = await updatePropertyStatus(params.id, status);

    return NextResponse.json({ success: true, data: property });
  } catch (error) {
    console.error("[v0] PUT /api/properties/[id]/status error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
