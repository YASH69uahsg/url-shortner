/**
 * Simple in-memory sliding-window rate limiter.
 * For production, replace with Redis-backed limiter.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const store = new Map<string, RateLimitEntry>();

// Clean up stale entries every 5 minutes
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanup(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;

  lastCleanup = now;
  const cutoff = now - windowMs;

  const entries = Array.from(store.entries());
  for (let i = 0; i < entries.length; i++) {
    const [key, entry] = entries[i];
    entry.timestamps = entry.timestamps.filter((t) => t > cutoff);
    if (entry.timestamps.length === 0) {
      store.delete(key);
    }
  }
}

/**
 * Check if a request should be rate-limited.
 * @param identifier - Unique identifier (e.g., IP address)
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 * @returns { success: boolean, remaining: number, resetIn: number }
 */
export function rateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000 // 1 minute
): { success: boolean; remaining: number; resetIn: number } {
  cleanup(windowMs);

  const now = Date.now();
  const cutoff = now - windowMs;

  let entry = store.get(identifier);
  if (!entry) {
    entry = { timestamps: [] };
    store.set(identifier, entry);
  }

  // Remove expired timestamps
  entry.timestamps = entry.timestamps.filter((t) => t > cutoff);

  if (entry.timestamps.length >= maxRequests) {
    const oldestInWindow = entry.timestamps[0];
    const resetIn = Math.ceil((oldestInWindow + windowMs - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetIn,
    };
  }

  entry.timestamps.push(now);

  return {
    success: true,
    remaining: maxRequests - entry.timestamps.length,
    resetIn: Math.ceil(windowMs / 1000),
  };
}
