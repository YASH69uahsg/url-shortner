import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/tokens";
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

  // Record step-1 view (fire-and-forget in server component)
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

  // Generate a signed token for step-2 validation (5 min TTL)
  const token = generateToken(code, 2, 300);

  return (
    <Step1Client
      code={link.code}
      title={link.title}
      token={token}
    />
  );
}
