import { NextRequest, NextResponse } from "next/server";
import { getLeads, createLead } from "@/lib/db";

/**
 * GET /api/leads?status=new&propertyId=p1
 * Fetch leads with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || undefined;
    const propertyId = searchParams.get("propertyId") || undefined;

    const leads = await getLeads({ status, propertyId });
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error("[v0] GET /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/leads
 * Create a new lead (public form submission, no auth required)
 * Body: { propertyId, name, phone, message? }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { property_id, name, phone } = body;
    if (!property_id || !name || !phone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: property_id, name, phone" },
        { status: 400 }
      );
    }

    const lead = await createLead({
      property_id,
      name,
      phone,
      message: body.message || null,
      status: "new",
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error) {
    console.error("[v0] POST /api/leads error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
