"use client";

import { useEffect, useRef, useState } from "react";

interface AdsterraBannerProps {
  slot?: "top" | "middle" | "bottom";
  className?: string;
}

/**
 * Responsive Adsterra 728x90 Banner Ad Component
 *
 * Safely isolates the Adsterra invoke.js script inside an iframe.
 * Automatically scales down on mobile screens (< 728px) using CSS transform scaling
 * so that the entire banner remains 100% visible with zero horizontal overflow/scrolling,
 * guaranteeing maximum IAB viewability score and CPM.
 */
export default function AdsterraBanner({
  slot = "top",
  className = "",
}: AdsterraBannerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Measure container width and compute responsive scale factor for mobile
  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        if (availableWidth > 0 && availableWidth < 728) {
          setScale(availableWidth / 728);
        } else {
          setScale(1);
        }
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

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

  const scaledWidth = 728 * scale;
  const scaledHeight = 90 * scale;

  return (
    <div
      ref={containerRef}
      className={`flex items-center justify-center w-full ${
        slot === "top" ? "mb-5" : slot === "middle" ? "my-4" : "mt-6"
      } ${className}`}
    >
      <div
        id={`adsterra-banner-${slot}`}
        className="relative flex items-center justify-center rounded-xl overflow-hidden border border-slate-200/80 bg-white shadow-sm transition-all"
        style={{
          width: scale < 1 ? `${scaledWidth}px` : "100%",
          maxWidth: "728px",
          height: `${scaledHeight}px`,
        }}
      >
        <div
          style={{
            width: "728px",
            height: "90px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
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
