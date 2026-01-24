"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AuthErrorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".error-content", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-black py-4 px-6">
        <Link href="/" className="flex items-center w-fit">
          <span className="text-xl font-bold text-white tracking-tight">
            Slice
          </span>
          <span className="text-xl font-normal text-white tracking-tight">
            &nbsp;& Co.
          </span>
        </Link>
      </header>

      {/* Error Content */}
      <main className="flex items-center justify-center px-4 py-20">
        <div className="error-content w-full max-w-md text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Authentication Error
            </h1>
            <p className="text-muted-foreground">
              Something went wrong during the authentication process. Please try
              again.
            </p>
          </div>

          <Link
            href="/login"
            className="inline-block w-full h-12 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-colors flex items-center justify-center"
          >
            Back to Login
          </Link>
        </div>
      </main>
    </div>
  );
}
