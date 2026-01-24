"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function TermsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".header-content", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      });

      // Form elements stagger animation
      gsap.from(".form-element", {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!agreed) return;
    
    setIsLoading(true);
    
    try {
      const supabase = createClient();
      
      // Update user metadata to mark profile as completed
      const { error } = await supabase.auth.updateUser({
        data: {
          profile_completed: true,
          terms_accepted: true,
          terms_accepted_at: new Date().toISOString(),
        },
      });

      if (error) {
        console.error("Error updating user:", error);
        setIsLoading(false);
        return;
      }

      // Redirect to home page
      router.push("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsLoading(false);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-black py-4 px-6">
        <div className="header-content max-w-7xl mx-auto">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-white tracking-tight">
              Slice
            </span>
            <span className="text-xl font-normal text-white tracking-tight">
              &nbsp;& Co.
            </span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex justify-center px-6 py-16">
        <div ref={formRef} className="w-full max-w-md">
          {/* Heading */}
          <h1 className="form-element text-3xl font-bold text-foreground mb-6">
            Accept Slice & Co.&apos;s Terms & Review Privacy Notice
          </h1>

          {/* Description */}
          <p className="form-element text-muted-foreground text-base leading-relaxed mb-12">
            By selecting &apos;I Agree&apos; below, I have reviewed and agree to the{" "}
            <Link
              href="/terms"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Terms of Use
            </Link>{" "}
            and acknowledge the{" "}
            <Link
              href="/privacy"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Privacy Notice
            </Link>
            . I am at least 18 years of age.
          </p>

          {/* Divider */}
          <div className="form-element border-t border-border mb-6" />

          {/* Checkbox Row */}
          <div className="form-element flex items-center justify-between mb-12">
            <span className="text-base font-medium text-foreground">
              I agree
            </span>
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                agreed
                  ? "bg-black border-black"
                  : "bg-white border-gray-400 hover:border-gray-600"
              }`}
              aria-label={agreed ? "Uncheck agreement" : "Check agreement"}
            >
              {agreed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
            </button>
          </div>

          {/* Navigation Buttons */}
          <div className="form-element flex items-center justify-between">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => router.back()}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!agreed || isLoading}
              className={`h-12 px-8 rounded-full flex items-center justify-center gap-2 text-base font-medium transition-all duration-300 ${
                agreed
                  ? "bg-black text-white hover:bg-black/90"
                  : "bg-[#e5e5e5] text-[#a3a3a3] cursor-not-allowed"
              }`}
            >
              {isLoading ? "Processing..." : "Next"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
