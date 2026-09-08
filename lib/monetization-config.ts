/**
 * Master Monetization & SafeLink Configuration
 * 
 * Set `isAdsenseApproved: true` once yashlab.me is officially approved in Google AdSense.
 * When false, the shortener operates in clean review/safe mode.
 */
export const MONETIZATION_CONFIG = {
  // MASTER SWITCH: Flip to true once Google AdSense approves yashlab.me
  isAdsenseApproved: false,

  // Routing Mode:
  // "safe_search_gateway": Routes via Google Search keyword rotation (Urllinkshort / Suntechu style)
  // "direct_blog": Routes directly to article with no-referrer
  // "direct": Standard interstitial without external blog
  mode: "safe_search_gateway" as "safe_search_gateway" | "direct_blog" | "direct",

  // Target Blog Domain (AdSense / AdX Approved Portal)
  targetBlogDomain: "https://yashlab.me",

  // Default Shortener Domain
  shortenerDomain: process.env.NEXT_PUBLIC_APP_URL || "https://yashlab.me",

  // Article Timer on Blog (seconds)
  articleTimerSeconds: 10,

  // Enable automatic breakout from Telegram / WhatsApp / Instagram In-App WebViews into Chrome
  enableInAppBrowserEscape: true,

  // Enable IP + UserAgent session pairing so users never lose their token across webview/browser switches
  enableIpSessionPairing: true,

  // Session pairing TTL in seconds (10 minutes)
  sessionTtlSeconds: 600,
};
