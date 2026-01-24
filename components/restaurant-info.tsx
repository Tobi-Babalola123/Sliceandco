"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Star, Clock, Users, ChevronRight } from "lucide-react";

export function RestaurantInfo() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".info-animate", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-4 py-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="info-animate text-2xl md:text-3xl font-bold text-foreground">
            Slice & Co.
          </h1>
          <div className="info-animate flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium">£4.99 Delivery Fee</span>
            <span>•</span>
            <span>Italian</span>
            <span>•</span>
            <span>Pizza</span>
            <span>•</span>
            <span>Pasta</span>
            <span>•</span>
            <span>Desserts</span>
            <span>•</span>
            <span>Drinks</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-foreground text-foreground" />
              <span className="font-medium text-foreground">4.6</span>
            </div>
          </div>
          <div className="info-animate flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Closed</span>
            <span>•</span>
            <span>Opens at 12:00 PM</span>
          </div>
          <p className="info-animate text-sm text-muted-foreground max-w-2xl">
            Slice & Co. in Bermondsey London, specialises in a variety of
            12&#34; pizzas, including unique options like Burrata + Nduja and
            The Flow. They also offer a selection of dips, dough bombs, and
            beverages, with C...{" "}
            <button className="font-medium text-foreground underline">
              More
            </button>
          </p>
        </div>

        <div className="info-animate flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Group order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
