import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const SECRET = process.env.ADMIN_SECRET_KEY || "fallback-dev-secret";

interface TokenPayload {
  code: string;
  step: number;
  exp: number;
  nonce: string;
}

/**
 * Generate a signed session token for the redirection flow.
 * Tokens are tied to a specific short code and step, with a TTL.
 */
export function generateToken(
  code: string,
  step: number,
  ttlSeconds: number = 300 // 5 minutes default
): string {
  const payload: TokenPayload = {
    code,
    step,
    exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    nonce: randomBytes(8).toString("hex"),
  };

  const data = JSON.stringify(payload);
  const encoded = Buffer.from(data).toString("base64url");
  const signature = sign(encoded);

  return `${encoded}.${signature}`;
}

/**
 * Verify and decode a session token.
 * Returns the payload if valid, null otherwise.
 */
export function verifyToken(
  token: string,
  expectedCode: string,
  expectedStep: number
): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [encoded, signature] = parts;

    // Verify signature using constant-time comparison
    const expectedSig = sign(encoded);
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    // Decode payload
    const data = Buffer.from(encoded, "base64url").toString("utf-8");
    const payload: TokenPayload = JSON.parse(data);

    // Check expiration
    if (Math.floor(Date.now() / 1000) > payload.exp) {
      return null;
    }

    // Validate code and step match
    if (payload.code !== expectedCode || payload.step !== expectedStep) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}
