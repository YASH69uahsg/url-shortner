import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";

export async function POST(request: NextRequest) {
  try {
    const { key } = await request.json();

    if (!key || typeof key !== "string") {
      return NextResponse.json(
        { error: "Secret key is required" },
        { status: 400 }
      );
    }

    const adminSecret = process.env.ADMIN_SECRET_KEY;
    if (!adminSecret) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Constant-time comparison to prevent timing attacks
    const keyBuffer = Buffer.from(key.padEnd(256, "\0"));
    const secretBuffer = Buffer.from(adminSecret.padEnd(256, "\0"));
    const isValid = timingSafeEqual(keyBuffer, secretBuffer);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid secret key" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });

    // Set HTTP-only secure cookie
    response.cookies.set("admin_session", adminSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
