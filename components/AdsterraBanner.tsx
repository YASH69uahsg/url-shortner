"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
  className?: string;
}

/**
 * Adsterra 728x90 Banner Ad Component
 *
 * Safely injects the Adsterra configuration and invoke scripts into a container
 * ref within a useEffect hook, including cleanup on unmount/re-render to prevent
 * duplicate scripts or memory leaks in Next.js.
 */
export default function AdsterraBanner({ className = "" }: AdsterraBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = bannerRef.current;
    if (!container) return;

    // Reset container to avoid duplicate scripts on re-renders
    container.innerHTML = "";

    // 1. Script for setting atOptions configuration
    const confScript = document.createElement("script");
    confScript.type = "text/javascript";
    confScript.text = `
      atOptions = {
        'key' : '3d6571283d31f2967803a7a7f2e10da6',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    `;

    // 2. Script for invoking the Adsterra loader
    const invokeScript = document.createElement("script");
    invokeScript.type = "text/javascript";
    invokeScript.src = "https://www.highrevenueformat.com/3d6571283d31f2967803a7a7f2e10da6/invoke.js";
    invokeScript.async = true;

    // Append both scripts into the container
    container.appendChild(confScript);
    container.appendChild(invokeScript);

    // Cleanup on unmount or remount
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className={`flex items-center justify-center w-full mb-6 ${className}`}>
      <div
        id="adsterra-banner-728x90"
        ref={bannerRef}
        className="relative flex items-center justify-center rounded-xl overflow-hidden min-h-[90px] w-full max-w-[728px] border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      />
    </div>
  );
}
