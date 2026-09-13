/**
 * Master Monetization & SafeLink Configuration
 * 
 * Pure Google AdSense 3-Step Flow (Zero Monetag / Zero Adsterra).
 * Set `isAdsenseApproved: true` once officially approved in Google AdSense.
 * When false, the shortener operates with clean responsive preview placeholders.
 */
export const MONETIZATION_CONFIG = {
  // MASTER SWITCH: Set to true once Google AdSense approves your domain
  isAdsenseApproved: false,

  // Google AdSense Publisher & Slot IDs
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID || "ca-pub-XXXXXXXXXXXXXXXX",
    slots: {
      // Step 1 Ads (4 Slots)
      step1Top: process.env.NEXT_PUBLIC_ADSENSE_STEP1_TOP || "1001001001",
      step1Article1: process.env.NEXT_PUBLIC_ADSENSE_STEP1_ART1 || "1001001002",
      step1Article2: process.env.NEXT_PUBLIC_ADSENSE_STEP1_ART2 || "1001001003",
      step1Bottom: process.env.NEXT_PUBLIC_ADSENSE_STEP1_BOTTOM || "1001001004",

      // Step 2 Ads (4 Slots)
      step2Top: process.env.NEXT_PUBLIC_ADSENSE_STEP2_TOP || "2002002001",
      step2Article1: process.env.NEXT_PUBLIC_ADSENSE_STEP2_ART1 || "2002002002",
      step2Article2: process.env.NEXT_PUBLIC_ADSENSE_STEP2_ART2 || "2002002003",
      step2Bottom: process.env.NEXT_PUBLIC_ADSENSE_STEP2_BOTTOM || "2002002004",

      // Step 3 Ads (3 Slots - Final Get Link)
      step3Top: process.env.NEXT_PUBLIC_ADSENSE_STEP3_TOP || "3003003001",
      step3Middle: process.env.NEXT_PUBLIC_ADSENSE_STEP3_MID || "3003003002",
      step3Bottom: process.env.NEXT_PUBLIC_ADSENSE_STEP3_BOTTOM || "3003003003",
    },
  },

  // Countdown timers per step (seconds)
  timers: {
    step1: 10,
    step2: 10,
    step3: 8,
  },

  // Default Shortener Domain
  shortenerDomain: process.env.NEXT_PUBLIC_APP_URL || "https://yashlab.me",

  // Enable automatic breakout from Telegram / WhatsApp / Instagram In-App WebViews into Chrome
  enableInAppBrowserEscape: true,

  // Enable IP + UserAgent session pairing
  enableIpSessionPairing: true,

  // Session pairing TTL in seconds (10 minutes)
  sessionTtlSeconds: 600,
};
