"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function LandingMotion({ children }: Readonly<{ children: React.ReactNode }>) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) return;

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

      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>("[data-hover-card]");

          const enterCard = contextSafe((event: Event) => {
            const card = event.currentTarget as HTMLElement;
            gsap.to(card, {
              backgroundColor: "var(--color-surface-hover)",
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(card.querySelectorAll("[data-card-text]"), {
              scale: 1.035,
              duration: 0.24,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          const leaveCard = contextSafe((event: Event) => {
            const card = event.currentTarget as HTMLElement;
            gsap.to(card, {
              backgroundColor: "var(--color-canvas)",
              duration: 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
            gsap.to(card.querySelectorAll("[data-card-text]"), {
              scale: 1,
              duration: 0.28,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          cards.forEach((card) => {
            card.addEventListener("pointerenter", enterCard);
            card.addEventListener("pointerleave", leaveCard);
          });

          return () => {
            cards.forEach((card) => {
              card.removeEventListener("pointerenter", enterCard);
              card.removeEventListener("pointerleave", leaveCard);
            });
          };
        },
      );
      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
