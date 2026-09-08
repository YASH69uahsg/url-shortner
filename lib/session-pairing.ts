import { createHash } from "crypto";

export interface SessionRecord {
  code: string;
  token: string;
  ip: string;
  uaHash: string;
  createdAt: number;
  expiresAt: number;
}

// In-memory high-speed cache for active sessions (TTL: 10 minutes)
const sessionStore = new Map<string, SessionRecord>();

function hashUa(userAgent: string): string {
  return createHash("md5").update(userAgent || "").digest("hex").slice(0, 16);
}

function makeKey(ip: string, code: string): string {
  return `${ip}::${code}`;
}

/**
 * Register a temporary click session for IP + code + UA
 */
export function registerSession(
  ip: string,
  userAgent: string,
  code: string,
  token: string,
  ttlSeconds = 600
): void {
  // Prune expired sessions lazily
  const now = Math.floor(Date.now() / 1000);
  if (sessionStore.size > 2000) {
    sessionStore.forEach((v, k) => {
      if (v.expiresAt < now) {
        sessionStore.delete(k);
      }
    });
  }

  const key = makeKey(ip, code);
  sessionStore.set(key, {
    code,
    token,
    ip,
    uaHash: hashUa(userAgent),
    createdAt: now,
    expiresAt: now + ttlSeconds,
  });
}

/**
 * Resolve a session by IP and code (fallback when token is lost in webview switch)
 */
export function resolveSession(
  ip: string,
  userAgent: string,
  code: string
): SessionRecord | null {
  const now = Math.floor(Date.now() / 1000);
  const key = makeKey(ip, code);
  const rec = sessionStore.get(key);

  if (!rec) return null;
  if (rec.expiresAt < now) {
    sessionStore.delete(key);
    return null;
  }

  return rec;
}
