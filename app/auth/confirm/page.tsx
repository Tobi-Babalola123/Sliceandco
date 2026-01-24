"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const countryCodes = [
  { code: "NG", dial: "+234", name: "Nigeria" },
  { code: "US", dial: "+1", name: "United States" },
  { code: "GB", dial: "+44", name: "United Kingdom" },
  { code: "CA", dial: "+1", name: "Canada" },
  { code: "AU", dial: "+61", name: "Australia" },
  { code: "DE", dial: "+49", name: "Germany" },
  { code: "FR", dial: "+33", name: "France" },
  { code: "IN", dial: "+91", name: "India" },
  { code: "JP", dial: "+81", name: "Japan" },
  { code: "CN", dial: "+86", name: "China" },
  { code: "BR", dial: "+55", name: "Brazil" },
  { code: "ZA", dial: "+27", name: "South Africa" },
  { code: "KE", dial: "+254", name: "Kenya" },
  { code: "GH", dial: "+233", name: "Ghana" },
];

export default function ConfirmInfoPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Pre-fill with user data from Google if available
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user?.user_metadata) {
        const fullName = user.user_metadata.full_name || user.user_metadata.name || "";
        const nameParts = fullName.split(" ");
        if (nameParts.length > 0) {
          setFirstName(nameParts[0] || "");
          setSurname(nameParts.slice(1).join(" ") || "");
        }
      }
    };
    
    fetchUser();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".form-element",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }, formRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async () => {
    if (!firstName.trim() || !surname.trim() || !phoneNumber.trim()) {
      setError("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Update user metadata (don't mark profile as completed yet - they still need to accept terms)
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            first_name: firstName,
            last_name: surname,
            phone: `${selectedCountry.dial}${phoneNumber}`,
          },
        });

        if (updateError) {
          setError(updateError.message);
          setIsLoading(false);
          return;
        }

        // Redirect to terms page
        router.push("/auth/terms");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

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

      {/* Form */}
      <main className="flex flex-col items-center justify-center px-4 py-16">
        <div ref={formRef} className="w-full max-w-md">
          <h1 className="form-element text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
            Confirm your information
          </h1>

          {/* Error Message */}
          {error && (
            <div className="form-element mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Name Fields */}
          <div className="form-element flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Please enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="flex-1 h-14 px-4 bg-[#eeeeee] text-foreground placeholder:text-muted-foreground rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-foreground text-base"
            />
            <input
              type="text"
              placeholder="Please enter surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="flex-1 h-14 px-4 bg-[#eeeeee] text-foreground placeholder:text-muted-foreground rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-foreground text-base"
            />
          </div>

          {/* Phone Fields */}
          <div className="form-element flex gap-3 mb-8">
            {/* Country Code Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-14 px-4 bg-[#eeeeee] text-foreground rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-foreground flex items-center gap-2 min-w-[90px]"
              >
                <span className="font-medium">{selectedCountry.code}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-secondary transition-colors flex items-center justify-between"
                    >
                      <span>{country.name}</span>
                      <span className="text-muted-foreground">{country.dial}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Number Input */}
            <div className="flex-1 relative">
              <input
                type="tel"
                placeholder="Mobile number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                className="w-full h-14 pl-16 pr-4 bg-[#eeeeee] text-foreground placeholder:text-muted-foreground rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-foreground text-base"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-medium">
                {selectedCountry.dial}
              </span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="form-element flex items-center justify-between mt-12">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="h-12 px-8 bg-black text-white rounded-full font-medium flex items-center gap-2 hover:bg-black/90 transition-colors disabled:opacity-70"
            >
              {isLoading ? "Saving..." : "Next"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
