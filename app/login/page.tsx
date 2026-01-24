"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { Input } from "@/components/ui/input";
import { MessageSquareMore, QrCode, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    
    try {
      const supabase = createClient();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        console.log("[v0] Google OAuth error:", error);
        setError(error.message);
        setIsGoogleLoading(false);
      }
      
      if (data?.url) {
        console.log("[v0] Redirecting to:", data.url);
        window.location.href = data.url;
      }
    } catch (err) {
      console.log("[v0] Unexpected error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  const handleAppleLogin = async () => {
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
    const ctx = gsap.context(() => {
      // Animate header
      gsap.from(".login-header", {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      // Animate form elements
      gsap.from(".form-element", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Black Header */}
      <header className="login-header bg-black py-5 px-6">
        <Link href="/" className="flex items-center w-fit">
          <span className="text-xl font-bold text-white tracking-tight">
            Slice
          </span>
          <span className="text-xl font-normal text-white tracking-tight">
            &nbsp;& Co.
          </span>
        </Link>
      </header>

      {/* Login Form */}
      <main className="flex justify-center px-4 py-12">
        <div ref={formRef} className="w-full max-w-[400px]">
          {/* Heading */}
          <h1 className="form-element text-2xl font-bold text-foreground mb-6">
            {"What's your phone number or email?"}
          </h1>

          {/* Phone/Email Input */}
          <div className="form-element relative mb-4">
            <Input
              type="text"
              placeholder="Enter phone number or email"
              className="w-full h-14 px-4 pr-12 text-base bg-[#f6f6f6] border-0 rounded-lg placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-foreground"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-[#e0e0e0] rounded-md hover:bg-[#d5d5d5] transition-colors"
              aria-label="Use messaging"
            >
              <MessageSquareMore className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Continue Button */}
          <button className="form-element w-full h-14 bg-black text-white text-base font-medium rounded-lg hover:bg-black/90 transition-colors mb-6">
            Continue
          </button>

          {/* Divider */}
          <div className="form-element flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Error Message */}
          {error && (
            <div className="form-element mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading}
              className="form-element w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              {isGoogleLoading ? "Connecting..." : "Continue with Google"}
            </button>

            {/* Apple */}
            <button
              onClick={handleAppleLogin}
              disabled={isAppleLoading}
              className="form-element w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isAppleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              )}
              {isAppleLoading ? "Connecting..." : "Continue with Apple"}
            </button>
          </div>

          {/* Second Divider */}
          <div className="form-element flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-sm text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* QR Code Login */}
          <button className="form-element w-full h-14 bg-[#eeeeee] text-foreground text-base font-medium rounded-lg hover:bg-[#e5e5e5] transition-colors flex items-center justify-center gap-3 mb-8">
            <QrCode className="w-5 h-5" />
            Log in with QR code
          </button>

          {/* Disclaimer */}
          <p className="form-element text-sm text-muted-foreground leading-relaxed">
            By continuing, you agree to calls, including by autodialler,
            WhatsApp or texts from Slice & Co. and its affiliates.
          </p>
        </div>
      </main>
    </div>
  );
}
