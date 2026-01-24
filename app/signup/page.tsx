"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { QrCode, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const formRef = useRef<HTMLDivElement>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignup = async () => {
    setIsAppleLoading(true);
    setError(null);

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setIsAppleLoading(false);
    }
  };

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Black Header */}
      <header className="bg-black py-4 px-6">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold text-white tracking-tight">
            Slice
          </span>
          <span className="text-xl font-normal text-white tracking-tight">
            &nbsp;& Co.
          </span>
        </Link>
      </header>

      {/* Form Content */}
      <main className="flex-1 flex items-start justify-center px-4 pt-12 md:pt-20">
        <div ref={formRef} className="w-full max-w-[400px] space-y-6">
          {/* Heading */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {"What's your phone number or email?"}
          </h1>

          {/* Input Field */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter phone number or email"
              className="w-full h-14 px-4 pr-12 bg-[#f6f6f6] rounded-lg text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-[#e8e8e8] transition-colors"
              aria-label="More options"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="11" width="4" height="4" rx="1" fill="#666" />
                <rect x="10" y="11" width="4" height="4" rx="1" fill="#666" />
                <rect x="17" y="11" width="4" height="4" rx="1" fill="#666" />
              </svg>
            </button>
          </div>

          {/* Continue Button */}
          <button className="w-full h-14 bg-black text-white text-base font-medium rounded-lg hover:bg-black/90 transition-colors">
            Continue
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleGoogleSignup}
              disabled={isGoogleLoading}
              className="w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            <button
              onClick={handleAppleSignup}
              disabled={isAppleLoading}
              className="w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAppleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              )}
              {isAppleLoading ? "Connecting..." : "Continue with Apple"}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* QR Code Login */}
          <button className="w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3">
            <QrCode className="w-5 h-5" />
            Log in with QR code
          </button>

          {/* Disclaimer */}
          <p className="text-sm text-muted-foreground leading-relaxed pt-4">
            By continuing, you agree to calls, including by autodialler,
            WhatsApp or texts from Slice & Co. and its affiliates.
          </p>
        </div>
      </main>
    </div>
  );
}
