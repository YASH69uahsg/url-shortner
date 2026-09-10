import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/tokens";
import {
  createSafeLinkSession,
} from "@/lib/safelink";
import { registerSession } from "@/lib/session-pairing";
import { MONETIZATION_CONFIG } from "@/lib/monetization-config";
import { getRandomArticleSlug, getArticleBySlug } from "@/lib/articles-data";
import Step1Client from "./Step1Client";
import GoogleRedirectGateway from "@/components/GoogleRedirectGateway";

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
    title: link.title || `Redirecting — ${code}`,
    description: "You are being redirected. Please wait for the countdown.",
    robots: "noindex, nofollow",
  };
}

export default async function Step1Page({ params }: Props) {
  const { code } = await params;

  // Fetch link metadata — NEVER send destinationUrl to client
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

  // Record initial view (fire-and-forget)
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

  // Generate a signed token (10 min TTL)
  const token = generateToken(code, 2, 600);

  // Extract client IP and User-Agent for fail-safe session pairing
  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headerList.get("x-real-ip") ||
    "127.0.0.1";
  const userAgent = headerList.get("user-agent") || "";

  // Register session pairing: guarantees token can be recovered even if browser sandbox wipes cookies/storage
  registerSession(ip, userAgent, code, token, 600);

  // SafeLink mode from config or environment
  const mode = (process.env.SAFELINK_MODE ||
    process.env.NEXT_PUBLIC_SAFELINK_MODE ||
    MONETIZATION_CONFIG.mode) as "safe_search_gateway" | "direct_blog" | "direct";

  if (mode === "safe_search_gateway" || mode === "direct_blog") {
    // 1. Create SafeLink session string
    const sessionStr = createSafeLinkSession(
      code,
      token,
      mode === "safe_search_gateway" ? "google" : "direct_blog",
      600
    );

    const searchDomain =
      process.env.SAFELINK_SEARCH_DOMAIN ||
      process.env.NEXT_PUBLIC_SAFELINK_SEARCH_DOMAIN ||
      "yashlab.me";

    const articleSlug = getRandomArticleSlug();
    const article = getArticleBySlug(articleSlug);

    // 2. Render the Google Redirect Gateway with rotated natural keyword
    return (
      <GoogleRedirectGateway
        code={link.code}
        title={link.title}
        searchDomain={searchDomain}
        mode={mode === "safe_search_gateway" ? "google" : "direct_blog"}
        articleSlug={articleSlug}
        articleTitle={article?.title}
        sessionStr={sessionStr}
      />
    );
  }

  // Fallback to standard direct interstitial flow
  return (
    <Step1Client
      code={link.code}
      title={link.title}
      token={token}
    />
  );
}
