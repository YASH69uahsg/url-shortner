"use client";

import { useState, useEffect } from "react";

interface MonetagBannerProps {
  className?: string;
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

export default function MonetagBanner({ className = "" }: MonetagBannerProps) {
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

  return (
    <div className={`flex items-center justify-center w-full mt-6 ${className}`}>
      <div
        id="monetag-banner-bottom"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleClick();
        }}
        className="group relative flex items-center justify-between w-full max-w-[728px] min-h-[90px] px-4 py-3 rounded-2xl cursor-pointer
          bg-gradient-to-r from-slate-900/95 via-indigo-950/70 to-slate-900/95
          border border-indigo-500/30 hover:border-indigo-400/60
          shadow-lg shadow-indigo-950/40 hover:shadow-indigo-500/20
          backdrop-blur-md transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
          overflow-hidden select-none"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-500" />

        {/* Left: Icon & Text content */}
        <div className="relative z-10 flex items-center gap-3.5 min-w-0 pr-3">
          {/* Glowing Icon */}
          <div
            className={`w-11 h-11 flex-shrink-0 rounded-xl bg-gradient-to-br ${creative.iconColor} p-[1px] shadow-md`}
          >
            <div className="w-full h-full rounded-[11px] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
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
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Ad • {creative.tag}
              </span>
              <span className="text-[10px] text-white/40 hidden sm:inline">
                Sponsored Partner
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-white truncate font-display group-hover:text-indigo-200 transition-colors">
              {creative.title}
            </p>
            <p className="text-[11px] text-white/50 truncate hidden xs:block">
              {creative.subtitle}
            </p>
          </div>
        </div>

        {/* Right: CTA Button */}
        <div className="relative z-10 flex-shrink-0">
          <div
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white
              bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-400 hover:to-cyan-400
              shadow-md shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all duration-300"
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
