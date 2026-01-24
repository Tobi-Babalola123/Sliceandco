"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MapPin, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DeliverySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".delivery-animate", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-4 pb-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left side - Delivery input */}
        <div className="delivery-animate bg-foreground text-background rounded-xl p-6 space-y-4">
          <h2 className="text-lg font-bold">Get it delivered to your door.</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Enter your address"
                className="pl-10 bg-background/10 border-background/20 text-background placeholder:text-background/60 focus:bg-background/20"
              />
            </div>
            <Button className="bg-uber-green hover:bg-uber-green/90 text-background font-medium px-6">
              Log in for saved address
            </Button>
          </div>

          {/* Map placeholder */}
          <div className="relative h-[180px] rounded-lg overflow-hidden bg-secondary/10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2UwZTBlMCIgb3BhY2l0eT0iMC4zIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <div className="w-8 h-8 bg-foreground rounded-full flex items-center justify-center">
                  <span className="text-background text-xs font-bold">S&C</span>
                </div>
                <span className="text-sm font-medium text-foreground">
                  Slice & Co.
                </span>
              </div>
            </div>
            {/* Map labels */}
            <div className="absolute top-4 left-4 text-xs text-background/70 font-medium">
              ABBEY ROAD
            </div>
            <div className="absolute top-12 right-8 text-xs text-background/70 font-medium">
              TRANTON ROAD
            </div>
            <div className="absolute bottom-8 left-8 text-xs text-background/70 font-medium">
              ORANGE WALK
            </div>
          </div>
        </div>

        {/* Right side - Delivery info */}
        <div className="delivery-animate space-y-4">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">£4.99 Delivery Fee</p>
                <p className="text-sm text-muted-foreground">
                  Order £15+, fees apply
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Navigation className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium">92 Enid Street</p>
                <p className="text-sm text-muted-foreground">London, England</p>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
              <Navigation className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-destructive">Too far to deliver</p>
                <p className="text-sm text-muted-foreground">
                  Open until 12:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
