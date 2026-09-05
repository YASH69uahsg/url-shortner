import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { customAlphabet } from "nanoid";

// Generate URL-safe 6-character codes
const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  6
);

function isAdmin(request: NextRequest): boolean {
  const cookie = request.cookies.get("admin_session")?.value;
  return cookie === process.env.ADMIN_SECRET_KEY;
}

/** GET /api/admin/links — List all links with view counts */
export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const links = await prisma.link.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { views: true },
      },
      views: {
        select: { step: true },
      },
    },
  });

  const formatted = links.map((link) => ({
    id: link.id,
    code: link.code,
    destinationUrl: link.destinationUrl,
    title: link.title,
    active: link.active,
    createdAt: link.createdAt.toISOString(),
    totalViews: link._count.views,
    step1Views: link.views.filter((v) => v.step === 1).length,
    step2Views: link.views.filter((v) => v.step === 2).length,
  }));

  return NextResponse.json({ links: formatted });
}

/** POST /api/admin/links — Create a new short link */
export async function POST(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { destinationUrl, title, customCode } = body;

    if (!destinationUrl || typeof destinationUrl !== "string") {
      return NextResponse.json(
        { error: "Destination URL is required" },
        { status: 400 }
      );
    }

    // Basic URL validation
    try {
      new URL(destinationUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    // Use custom code or generate random one
    let code = customCode?.trim();
    if (code) {
      // Validate custom code: alphanumeric, 3-20 chars
      if (!/^[a-zA-Z0-9_-]{3,20}$/.test(code)) {
        return NextResponse.json(
          {
            error:
              "Custom code must be 3-20 characters, alphanumeric with hyphens/underscores",
          },
          { status: 400 }
        );
      }

      // Check if code already exists
      const existing = await prisma.link.findUnique({ where: { code } });
      if (existing) {
        return NextResponse.json(
          { error: "This short code is already taken" },
          { status: 409 }
        );
      }
    } else {
      // Generate unique code
      let attempts = 0;
      do {
        code = nanoid();
        const existing = await prisma.link.findUnique({ where: { code } });
        if (!existing) break;
        attempts++;
      } while (attempts < 10);

      if (attempts >= 10) {
        return NextResponse.json(
          { error: "Failed to generate unique code" },
          { status: 500 }
        );
      }
    }

    const link = await prisma.link.create({
      data: {
        code,
        destinationUrl,
        title: title?.trim() || null,
      },
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create link";
    console.error("Error creating link in database:", err);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
