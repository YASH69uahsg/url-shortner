import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/get-destination
 *
 * Securely returns the destination URL for a given short code.
 * Enforces:
 * - Valid session token (tied to code + step 2)
 * - Rate limiting per IP (5 requests/minute)
 * - POST-only (no GET exposure)
 */
export async function POST(request: NextRequest) {
  try {
    // Extract client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Rate limit check: 5 requests per minute per IP
    const limiter = rateLimit(ip, 5, 60 * 1000);
    if (!limiter.success) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          retryAfter: limiter.resetIn,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(limiter.resetIn),
          },
        }
      );
    }

    const body = await request.json();
    const { code, token } = body;

    if (!code || !token) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      );
    }

    // Verify session token
    const payload = verifyToken(token, code, 2);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid or expired session. Please start over." },
        { status: 403 }
      );
    }

    // Fetch the link from database
    const link = await prisma.link.findUnique({
      where: { code, active: true },
    });

    if (!link) {
      return NextResponse.json(
        { error: "Link not found or has been deactivated" },
        { status: 404 }
      );
    }

    // Record step-2 completion view
    await prisma.view.create({
      data: {
        linkId: link.id,
        ip,
        userAgent: request.headers.get("user-agent") || null,
        referer: request.headers.get("referer") || null,
        step: 2,
      },
    });

    const response = NextResponse.json({ url: link.destinationUrl });
    response.cookies.delete("rtg_session");
    return response;
  } catch {
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}

/** Block GET requests */
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
