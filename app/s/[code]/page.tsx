import { notFound } from "next/navigation";
import { cookies, headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/tokens";
import {
  SAFELINK_COOKIE_NAME,
  createSafeLinkSession,
} from "@/lib/safelink";
import { getRandomArticleSlug } from "@/lib/articles-data";
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

  // Generate a signed token (5 min TTL)
  const token = generateToken(code, 2, 300);

  // Check active SafeLink Mode — Defaults to "google" (urllinkshort.in style)
  const mode = (process.env.SAFELINK_MODE ||
    process.env.NEXT_PUBLIC_SAFELINK_MODE ||
    "google") as "google" | "direct_blog" | "direct";

  if (mode === "google" || mode === "direct_blog") {
    // 1. Create and store SafeLink session cookie
    const sessionStr = createSafeLinkSession(code, token, mode, 300);
    const cookieStore = await cookies();
    cookieStore.set(SAFELINK_COOKIE_NAME, sessionStr, {
      maxAge: 300,
      path: "/",
      httpOnly: false,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    const headerList = await headers();
    const host = headerList.get("host") || "localhost:3000";
    const searchDomain =
      process.env.SAFELINK_SEARCH_DOMAIN ||
      process.env.NEXT_PUBLIC_SAFELINK_SEARCH_DOMAIN ||
      host;

    const articleSlug = getRandomArticleSlug();

    // 2. Render the Google Redirect Gateway
    return (
      <GoogleRedirectGateway
        code={link.code}
        title={link.title}
        searchDomain={searchDomain}
        mode={mode}
        articleSlug={articleSlug}
      />
    );
  }

  // Fallback to standard 2-step direct interstitial flow
  return (
    <Step1Client
      code={link.code}
      title={link.title}
      token={token}
    />
  );
}
