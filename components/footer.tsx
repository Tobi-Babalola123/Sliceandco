"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Facebook, Twitter, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  column1: [
    { label: "Get help", href: "#" },
    { label: "Add your restaurant", href: "#" },
    { label: "Sign up to deliver", href: "#" },
    { label: "Create a business account", href: "#" },
    { label: "Promotions", href: "#" },
  ],
  column2: [
    { label: "Restaurants near me", href: "#" },
    { label: "View all cities", href: "#" },
    { label: "View all countries", href: "#" },
    { label: "Pick-up near me", href: "#" },
    { label: "About Slice & Co.", href: "#" },
    { label: "Shop groceries", href: "#" },
  ],
};

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".footer-content", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-secondary/30 border-t border-border">
      {/* Disclaimer */}
      <div className="px-4 py-6 max-w-7xl mx-auto border-b border-border">
        <p className="text-xs text-muted-foreground">
          ALLERGIES: If you or someone you&apos;re ordering for has an allergy,
          please contact the merchant directly to let them know. Slice & Co.
          has a FHRS rating of 5. This information was updated on 28/12/2025.
          The current rating is on their page on the{" "}
          <span className="underline cursor-pointer">FSA Website</span>. Adults
          need around 2000 kcal a day.
        </p>
      </div>

      {/* Main footer content */}
      <div className="footer-content px-4 py-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and app downloads */}
          <div className="space-y-6">
            <div className="flex items-center">
              <span className="text-2xl font-bold tracking-tight">Slice</span>
              <span className="text-2xl font-normal tracking-tight">&nbsp;& Co.</span>
            </div>
            <div className="flex flex-col gap-3">
              <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg w-fit hover:opacity-90 transition-opacity">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-tight">
                    Download on the
                  </div>
                  <div className="text-sm font-semibold leading-tight">
                    App Store
                  </div>
                </div>
              </button>
              <button className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg w-fit hover:opacity-90 transition-opacity">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-[10px] leading-tight">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">
                    Google Play
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Links column 1 */}
          <div className="space-y-4">
            {footerLinks.column1.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-foreground hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Links column 2 */}
          <div className="space-y-4">
            {footerLinks.column2.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-sm text-foreground hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Language selector */}
          <div>
            <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-full hover:bg-secondary transition-colors">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">English</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="px-4 py-6 max-w-7xl mx-auto border-t border-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-70 transition-opacity">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:opacity-70 transition-opacity">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#" className="hover:text-foreground">
              Do not sell or share my personal information
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 Slice & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
