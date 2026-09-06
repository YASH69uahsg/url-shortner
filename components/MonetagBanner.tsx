"use client";

import { useState, useEffect } from "react";

interface MonetagBannerProps {
  className?: string;
  theme?: "dark" | "light";
}

const AD_CREATIVES = [
  {
    tag: "High Speed",
    title: "⚡ Fast Cloud Storage & Instant File Transfer",
    subtitle: "Unlimited bandwidth • 100% Secure & Encrypted",
    buttonText: "Open Sponsor",
    iconColor: "from-blue-500 to-cyan-400",
  },
  {
    tag: "Security",
    title: "🛡️ Ultra-Fast Secure VPN & Ad-Free Browsing",
    subtitle: "Protect your privacy on all devices with 1-click",
    buttonText: "Get Access",
    iconColor: "from-purple-500 to-indigo-500",
  },
  {
    tag: "Recommended",
    title: "🚀 Boost Download Speed & Direct Media Player",
    subtitle: "Zero wait time • High definition streaming",
    buttonText: "Claim Offer",
    iconColor: "from-emerald-500 to-teal-400",
  },
];

export default function MonetagBanner({
  className = "",
  theme = "dark",
}: MonetagBannerProps) {
  const [creativeIndex, setCreativeIndex] = useState(0);

  const directLink =
    process.env.NEXT_PUBLIC_MONETAG_DIRECT_LINK ||
    "https://omg10.com/4/11732678";

  useEffect(() => {
    // Pick a random creative on load
    const randomIndex = Math.floor(Math.random() * AD_CREATIVES.length);
    setCreativeIndex(randomIndex);
  }, []);

  const creative = AD_CREATIVES[creativeIndex];

  const handleClick = () => {
    window.open(directLink, "_blank", "noopener,noreferrer");
  };

  const isLight = theme === "light";

  return (
    <div className={`flex items-center justify-center w-full my-4 ${className}`}>
      <div
        id="monetag-banner-bottom"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        className={`group relative flex items-center justify-between w-full max-w-[728px] min-h-[90px] px-4 py-3.5 rounded-2xl cursor-pointer
          ${
            isLight
              ? "bg-white border border-slate-200/90 shadow-md shadow-slate-100 hover:shadow-lg hover:border-indigo-400/80"
              : "bg-gradient-to-r from-slate-900/95 via-indigo-950/70 to-slate-900/95 border border-indigo-500/30 hover:border-indigo-400/60 shadow-lg shadow-indigo-950/40 hover:shadow-indigo-500/20 backdrop-blur-md"
          }
          transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
          overflow-hidden select-none`}
      >
        {/* Ambient background glow */}
        <div
          className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
            isLight
              ? "bg-indigo-500/5 group-hover:bg-indigo-500/10"
              : "bg-indigo-500/10 group-hover:bg-indigo-500/20"
          }`}
        />
        <div
          className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl pointer-events-none transition-all duration-500 ${
            isLight
              ? "bg-blue-500/5 group-hover:bg-blue-500/10"
              : "bg-cyan-500/10 group-hover:bg-cyan-500/20"
          }`}
        />

        {/* Left: Icon & Text content */}
        <div className="relative z-10 flex items-center gap-3.5 min-w-0 pr-3">
          {/* Glowing Icon */}
          <div
            className={`w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br ${creative.iconColor} p-[1px] shadow-sm`}
          >
            <div
              className={`w-full h-full rounded-[11px] flex items-center justify-center ${
                isLight ? "bg-slate-50" : "bg-slate-950/80 backdrop-blur-sm"
              }`}
            >
              <svg
                className={`w-5 h-5 ${isLight ? "text-indigo-600" : "text-white"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>

          {/* Texts */}
          <div className="flex flex-col text-left min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                  isLight
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
                }`}
              >
                Ad • {creative.tag}
              </span>
              <span
                className={`text-[10px] hidden sm:inline ${
                  isLight ? "text-slate-400" : "text-white/40"
                }`}
              >
                Sponsored Partner
              </span>
            </div>
            <p
              className={`text-xs sm:text-sm font-semibold truncate font-display transition-colors ${
                isLight
                  ? "text-slate-900 group-hover:text-indigo-600"
                  : "text-white group-hover:text-indigo-200"
              }`}
            >
              {creative.title}
            </p>
            <p
              className={`text-[11px] truncate hidden xs:block ${
                isLight ? "text-slate-500" : "text-white/50"
              }`}
            >
              {creative.subtitle}
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white shadow-md transition-all duration-300 ${
              isLight
                ? "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 shadow-indigo-500/20 group-hover:shadow-indigo-500/40"
                : "bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400 shadow-indigo-500/30 group-hover:shadow-indigo-500/50"
            }`}
          >
            <span>{creative.buttonText}</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
