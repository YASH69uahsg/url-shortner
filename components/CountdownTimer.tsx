"use client";

import { useEffect, useState, useCallback } from "react";

interface CountdownTimerProps {
  seconds: number;
  onComplete: () => void;
  /** Called every second with the current timeLeft value */
  onTick?: (timeLeft: number) => void;
  size?: number;
  strokeWidth?: number;
}

export default function CountdownTimer({
  seconds,
  onComplete,
  onTick,
  size = 160,
  strokeWidth = 6,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const [isComplete, setIsComplete] = useState(false);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = ((seconds - timeLeft) / seconds) * circumference;

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleComplete();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        const next = prev - 1;
        onTick?.(next);
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, handleComplete]);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Glow effect */}
      <div
        className="absolute rounded-full blur-xl opacity-30 animate-pulse-slow"
        style={{
          width: size + 20,
          height: size + 20,
          background: isComplete
            ? "radial-gradient(circle, rgba(34,197,94,0.4), transparent)"
            : "radial-gradient(circle, rgba(124,58,237,0.4), transparent)",
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
      >
        {/* Background ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />

        {/* Progress ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isComplete ? "#22c55e" : "url(#gradient)"}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          className="transition-all duration-1000 ease-linear"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`font-display font-bold transition-all duration-300 ${
            isComplete
              ? "text-3xl text-green-400"
              : timeLeft <= 3
              ? "text-5xl text-red-400 animate-pulse"
              : "text-5xl text-white"
          }`}
        >
          {isComplete ? "✓" : timeLeft}
        </span>
        <span className="text-xs text-white/40 mt-1 uppercase tracking-widest">
          {isComplete ? "Ready" : "seconds"}
        </span>
      </div>
    </div>
  );
}
