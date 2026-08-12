"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export interface Slide {
  src: string;
  alt: string;
}

interface ImageSlideshowProps {
  slides: readonly Slide[];
  intervalMs?: number;
  dimClassName?: string;
  sizes: string;
}

export function ImageSlideshow({
  slides,
  intervalMs = 5000,
  dimClassName = "",
  sizes,
}: ImageSlideshowProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((current) => (current + 1) % slides.length), intervalMs);
    return () => clearInterval(id);
  }, [slides.length, intervalMs]);

  return (
    <div className="absolute inset-0">
      <div className={`absolute inset-0 ${dimClassName}`}>
        {slides.map((slide, i) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={sizes}
            quality={90}
            priority={i === 0}
            className={`object-cover transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="absolute bottom-4 right-4 flex gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Ảnh ${i + 1}: ${slide.alt}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-on-dark" : "w-2 bg-on-dark/40 hover:bg-on-dark/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
