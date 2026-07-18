import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getAgents, createAgent } from "@/lib/db";

/**
 * GET /api/agents
 * Fetch all agents
 */
export async function GET(request: NextRequest) {
  try {
    const agents = await getAgents();
    return NextResponse.json({ success: true, data: agents });
  } catch (error) {
    console.error("[v0] GET /api/agents error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * POST /api/agents
 * Invite/create a new agent (authenticated dashboard only)
 * Body: { email, name, role: "owner" | "agent", phone?, whatsapp? }
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
    const { email, name, role, phone, whatsapp } = body;
    
    if (!email || !name || !role) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: email, name, role" },
        { status: 400 }
      );
    }

    if (!["owner", "agent"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Invalid role" },
        { status: 400 }
      );
    }

    // TODO: In production, you would create a Supabase auth user here and send an invite email
    // For now, we'll just create an agent entry (requires manual user creation in Supabase dashboard)
    
    const agent = await createAgent({
      id: user.id, // Would be the newly created user ID in production
      name,
      role,
      phone: phone || null,
      whatsapp: whatsapp || null,
      email,
      avatar_initials: name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2),
    });

    return NextResponse.json({ success: true, data: agent }, { status: 201 });
  } catch (error) {
    console.error("[v0] POST /api/agents error:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
