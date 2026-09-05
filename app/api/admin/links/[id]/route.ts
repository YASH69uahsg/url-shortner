import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function isAdmin(request: NextRequest): boolean {
  const cookie = request.cookies.get("admin_session")?.value;
  return cookie === process.env.ADMIN_SECRET_KEY;
}

/** PATCH /api/admin/links/[id] — Toggle link active status */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const link = await prisma.link.findUnique({ where: { id } });
    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    const updated = await prisma.link.update({
      where: { id },
      data: { active: !link.active },
    });

    return NextResponse.json({ link: updated });
  } catch {
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

/** DELETE /api/admin/links/[id] — Delete a link and its views */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    await prisma.link.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
