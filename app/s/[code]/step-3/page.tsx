import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import { resolveSession } from "@/lib/session-pairing";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";
import Step3Client from "./Step3Client";

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  return {
    title: `Final Step — Unlocking Link ${code}`,
    description: "Final security verification before opening your destination link.",
    robots: "noindex, nofollow",
  };
}

export default async function Step3Page({ params, searchParams }: Props) {
  const { code } = await params;
  const resolvedSearchParams = await searchParams;
  let token =
    typeof resolvedSearchParams.token === "string"
      ? resolvedSearchParams.token
      : undefined;

  // Validate the link exists
  const link = await prisma.link.findUnique({
    where: { code, active: true },
    select: {
      id: true,
      code: true,
      title: true,
      // destinationUrl is intentionally excluded
    },
  });

  if (!link) {
    notFound();
  }

  // FAIL-SAFE: Recover token from IP + UserAgent session pairing if wiped
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = headerList.get("user-agent") || "";

  if (!token && MONETIZATION_CONFIG.enableIpSessionPairing) {
    const session = resolveSession(ip, userAgent, code);
    if (session && session.token) {
      token = session.token;
    }
  }

  if (!token) {
    redirect(`/s/${code}`);
  }

  // Validate Step 3 token
  const payload = verifyToken(token, code, 3);
  if (!payload) {
    redirect(`/s/${code}`);
  }

  // Record Step 3 view (fire-and-forget)
  prisma.view
    .create({
      data: {
        linkId: link.id,
        step: 3,
      },
    })
    .catch(() => {
      /* silently fail */
    });

  return (
    <Step3Client
      code={link.code}
      title={link.title}
      token={token}
    />
  );
}
