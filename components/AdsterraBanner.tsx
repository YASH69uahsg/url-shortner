"use client";

import { useEffect, useRef } from "react";

interface AdsterraBannerProps {
  slot?: "top" | "bottom";
  className?: string;
}

/**
 * Adsterra 728x90 Banner Ad Component
 *
 * Safely injects the Adsterra configuration and invoke scripts into a container
 * ref within a useEffect hook, including cleanup on unmount/re-render to prevent
 * duplicate scripts or memory leaks in Next.js.
 */
export default function AdsterraBanner({
  slot = "top",
  className = "",
}: AdsterraBannerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!iframeDoc) return;

      iframeDoc.open();
      iframeDoc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <base target="_blank">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              html, body {
                width: 100%;
                height: 100%;
                overflow: hidden;
                background: transparent;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : '3d6571283d31f2967803a7a7f2e10da6',
                'format' : 'iframe',
                'height' : 90,
                'width' : 728,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://www.highrevenueformat.com/3d6571283d31f2967803a7a7f2e10da6/invoke.js"></script>
          </body>
        </html>
      `);
      iframeDoc.close();
    } catch (e) {
      console.error("AdsterraBanner isolation error:", e);
    }
  }, []);

  return (
    <div
      className={`flex items-center justify-center w-full ${
        slot === "top" ? "mb-6" : "mt-6"
      } ${className}`}
    >
      <div
        id={`adsterra-banner-${slot}`}
        className="relative flex items-center justify-center rounded-xl overflow-hidden min-h-[90px] w-full max-w-[728px] border border-white/5 bg-white/[0.02] backdrop-blur-sm"
      >
        <div className="w-full overflow-x-auto flex justify-center py-1 scrollbar-none">
          <iframe
            ref={iframeRef}
            title={`adsterra-banner-${slot}`}
            width={728}
            height={90}
            style={{
              border: "none",
              width: "728px",
              height: "90px",
              minWidth: "728px",
              overflow: "hidden",
              display: "block",
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
