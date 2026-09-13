"use client";

import AdSenseUnit from "@/components/AdSenseUnit";

interface AdXBannerProps {
  slot: "top" | "middle" | "bottom";
  gamSlotName?: string;
  adUnitPath?: string;
}

/**
 * Responsive Google AdSense banner container
 */
export default function AdXBanner({ slot }: AdXBannerProps) {
  const slotMap = {
    top: "1001001001",
    middle: "1001001002",
    bottom: "1001001004",
  };

  return (
    <div className="w-full flex justify-center my-2">
      <AdSenseUnit slot={slotMap[slot]} format={slot === "bottom" ? "rectangle" : "horizontal"} />
    </div>
  );
}
