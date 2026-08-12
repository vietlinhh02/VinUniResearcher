"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({ children }: Readonly<{ children: React.ReactNode }>) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set("[data-hero], [data-console]", { autoAlpha: 0, y: 24 });
        gsap.set("[data-reveal]", { autoAlpha: 0, y: 32 });
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to("[data-hero]", { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09 })
          .to("[data-console]", { autoAlpha: 1, y: 0, duration: 0.9 }, "-=0.5");

        ScrollTrigger.batch("[data-reveal]", {
          start: "top 88%",
          once: true,
          onEnter: (items) => {
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.08,
              ease: "power3.out",
            });
          },
        });
      });
      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
