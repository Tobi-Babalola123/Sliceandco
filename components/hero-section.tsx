"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Heart, MoreHorizontal } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imagesRef.current?.children || [], {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={imagesRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-1 h-[200px] md:h-[280px]"
      >
        <div className="relative col-span-2 row-span-1 overflow-hidden">
          <Image
            src="/images/hero-pizza-1.jpg"
            alt="Delicious pizza"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative overflow-hidden hidden md:block">
          <Image
            src="/images/hero-pizza-2.jpg"
            alt="Pizza being sliced"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative overflow-hidden hidden md:block">
          <Image
            src="/images/hero-pizza-3.jpg"
            alt="Stretchy cheese pizza"
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
          <Heart className="w-5 h-5" />
        </button>
        <button className="w-10 h-10 bg-background rounded-full flex items-center justify-center shadow-md hover:scale-105 transition-transform">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
