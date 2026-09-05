import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/tokens";
import Step2Client from "./Step2Client";

interface Props {
  params: Promise<{ code: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({ params }: Props) {
  const { code } = await params;
  return {
    title: `Almost There — ${code}`,
    description: "One more step to reach your destination.",
    robots: "noindex, nofollow",
  };
}

export default async function Step2Page({ params, searchParams }: Props) {
  const { code } = await params;
  const resolvedSearchParams = await searchParams;
  const token = typeof resolvedSearchParams.token === "string"
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

  // Validate the session token
  if (!token) {
    redirect(`/s/${code}`);
  }

  const payload = verifyToken(token, code, 2);
  if (!payload) {
    redirect(`/s/${code}`);
  }

  return (
    <Step2Client
      code={link.code}
      title={link.title}
      token={token}
    />
  );
}
