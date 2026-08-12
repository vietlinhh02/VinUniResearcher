"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

interface LoadingScreenProps {
  label?: string;
  fullScreen?: boolean;
}

export function LoadingScreen({ label = "Đang tải nội dung…" }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const segmentDuration = reduceMotion ? 1.2 : 0.575;
      gsap.fromTo(
        progressRef.current,
        { xPercent: -110, scaleX: 0.65 },
        {
          repeat: -1,
          keyframes: [
            {
              xPercent: 150,
              scaleX: 1.15,
              duration: segmentDuration,
              ease: "power1.inOut",
            },
            {
              xPercent: 410,
              scaleX: 0.65,
              duration: segmentDuration,
              ease: "power1.inOut",
            },
          ],
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      aria-label={label}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 overflow-hidden bg-primary/15"
    >
      <span ref={progressRef} className="block h-full w-1/3 origin-left bg-primary" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
