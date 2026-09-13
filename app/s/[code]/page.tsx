import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/tokens";
import { registerSession } from "@/lib/session-pairing";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";
import { getRandomArticleSlug, getArticleBySlug, ARTICLES } from "@/lib/articles-data";
import Step1Client from "./Step1Client";

interface Props {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  const link = await prisma.link.findUnique({
    where: { code, active: true },
    select: { title: true, code: true },
  });

  if (!link) return { title: "Link Not Found" };

  return {
    title: link.title ? `Security Verification: ${link.title}` : `Secure Link Gateway — ${code}`,
    description: "Please complete the security verification countdown to unlock your destination URL.",
    robots: "noindex, nofollow",
  };
}

export default async function Step1Page({ params }: Props) {
  const { code } = await params;

  // Fetch link metadata — destinationUrl is NEVER exposed to the client
  const link = await prisma.link.findUnique({
    where: { code, active: true },
    select: {
      id: true,
      code: true,
      title: true,
    },
  });

  if (!link) {
    notFound();
  }

  // Record Step 1 view (fire-and-forget)
  prisma.view
    .create({
      data: {
        linkId: link.id,
        step: 1,
      },
    })
    .catch(() => {
      /* silently fail */
    });

  // Generate cryptographic token for Step 2 (10 min TTL)
  const token = generateToken(code, 2, 600);

  // Extract client IP and User-Agent for fail-safe session pairing
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = headerList.get("user-agent") || "";

  if (MONETIZATION_CONFIG.enableIpSessionPairing) {
    registerSession(ip, userAgent, code, token, 600);
  }

  // Pick random high-quality Article #1
  const articleSlug = getRandomArticleSlug();
  const article = getArticleBySlug(articleSlug) || ARTICLES[0];

  return (
    <Step1Client
      code={link.code}
      title={link.title}
      token={token}
      article={article}
    />
  );
}
