import { createHmac, timingSafeEqual } from "crypto";

const SECRET = process.env.ADMIN_SECRET_KEY || "fallback-dev-secret";
export const SAFELINK_COOKIE_NAME = "rtg_session";

export interface SafeLinkSession {
  code: string;
  token: string;
  exp: number;
  mode: "google" | "direct_blog";
  createdAt: number;
}

/**
 * Creates a signed, base64url-encoded SafeLink session string.
 * Default TTL is 300 seconds (5 minutes).
 */
export function createSafeLinkSession(
  code: string,
  token: string,
  mode: "google" | "direct_blog" = "google",
  ttlSeconds: number = 300
): string {
  const payload: SafeLinkSession = {
    code,
    token,
    mode,
    createdAt: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
  };

  const data = JSON.stringify(payload);
  const encoded = Buffer.from(data).toString("base64url");
  const signature = createHmac("sha256", SECRET).update(encoded).digest("base64url");

  return `${encoded}.${signature}`;
}

/**
 * Verifies and decodes a SafeLink session string.
 * Returns null if the signature is invalid or the session has expired.
 */
export function verifySafeLinkSession(sessionStr: string): SafeLinkSession | null {
  try {
    const parts = sessionStr.split(".");
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;
    const expectedSig = createHmac("sha256", SECRET).update(encoded).digest("base64url");

    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const data = Buffer.from(encoded, "base64url").toString("utf-8");
    const payload: SafeLinkSession = JSON.parse(data);

    // Check expiration
    if (Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
