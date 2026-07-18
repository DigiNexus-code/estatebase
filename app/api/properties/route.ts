import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getProperties, createProperty } from "@/lib/db";

/**
 * GET /api/properties?status=active&purpose=sale
 * Fetch properties with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get("status") || undefined;
    const purpose = searchParams.get("purpose") || undefined;

    const properties = await getProperties({ status, purpose });
    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    console.error("[v0] GET /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/properties
 * Create a new property (authenticated dashboard only)
 */
export async function POST(request: NextRequest) {
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
    
    // Validate required fields
    const { title, purpose, type, price, priceLabel, city, area, size, sizeUnit } = body;
    if (!title || !purpose || !type || !price || !priceLabel || !city || !area || !size || !sizeUnit) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const property = await createProperty({
      title,
      purpose,
      type,
      price: Number(price),
      priceLabel,
      city,
      area,
      size: Number(size),
      sizeUnit,
      beds: body.beds ? Number(body.beds) : null,
      baths: body.baths ? Number(body.baths) : null,
      status: body.status || "draft",
      verified: body.verified || false,
      featured: body.featured || false,
      coverImage: body.coverImage || null,
      images: body.images || [],
      description: body.description || null,
      amenities: body.amenities || [],
      agent_id: user.id,
      views: 0,
      leads_count: 0,
    });

    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error) {
    console.error("[v0] POST /api/properties error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
