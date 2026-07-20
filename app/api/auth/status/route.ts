import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = createClient();

    // Get current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      return NextResponse.json({
        status: "error",
        message: "Failed to get session",
        error: sessionError.message,
      }, { status: 500 });
    }

    if (!session) {
      return NextResponse.json({
        status: "not_authenticated",
        message: "No active session",
        session: null,
      }, { status: 401 });
    }

    return NextResponse.json({
      status: "authenticated",
      message: "Session active",
      session: {
        user_id: session.user.id,
        email: session.user.email,
        created_at: session.user.created_at,
        expires_at: session.expires_at,
      },
    });
  } catch (error) {
    console.error("[v0] Auth status error:", error);
    return NextResponse.json({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 });
  }
}
