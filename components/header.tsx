"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import {
  MapPin,
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Apple,
  Search,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const addressModalRef = useRef<HTMLDivElement>(null);
  const addressOverlayRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Get initial user
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      gsap.from(logoRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.from(".menu-item", {
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        delay: 0.2,
        ease: "power2.out",
      });
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(menuRef.current, {
        x: "-100%",
        duration: 0.3,
        ease: "power3.in",
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  // Address modal animation
  useEffect(() => {
    if (isAddressModalOpen) {
      gsap.to(addressOverlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        addressModalRef.current,
        { opacity: 0, y: -20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(addressOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(addressModalRef.current, {
        opacity: 0,
        y: -20,
        scale: 0.95,
        duration: 0.2,
        ease: "power3.in",
      });
      document.body.style.overflow = "";
    }
  }, [isAddressModalOpen]);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  const menuLinks = [
    { label: "Create a business account", href: "#", external: false },
    { label: "Add your restaurant", href: "#", external: false },
    { label: "Sign up to deliver", href: "#", external: false },
    { label: "Request a trip", href: "#", external: true },
  ];

  const loggedInMenuLinks = [
    { label: "Orders", href: "#", external: false },
    { label: "Favourites", href: "#", external: false },
    { label: "Account", href: "#", external: false },
    { label: "Help", href: "#", external: false },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-background border-b border-border"
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link href="/">
              <div ref={logoRef} className="flex items-center cursor-pointer">
                <span className="text-xl font-bold tracking-tight">Slice</span>
                <span className="text-xl font-normal tracking-tight">
                  &nbsp;& Co.
                </span>
              </div>
            </Link>

            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-full transition-colors"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Enter delivery address</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Right side - changes based on auth state */}
          {!isLoading && (
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  {/* Logged in state */}
                  <button className="hidden sm:flex items-center gap-2 px-3 py-2 hover:bg-secondary rounded-full transition-colors">
                    <Search className="w-4 h-4" />
                    <span className="text-sm font-medium">Search</span>
                  </button>
                  <button className="p-2 hover:bg-secondary rounded-full transition-colors">
                    <User className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  {/* Logged out state */}
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-sm font-medium hidden sm:inline-flex"
                    >
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="text-sm font-medium bg-foreground text-background hover:bg-foreground/90">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-[60] opacity-0 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Slide-in Menu */}
      <div
        ref={menuRef}
        className="fixed top-0 left-0 h-full w-[360px] max-w-[85vw] bg-background z-[70] shadow-2xl -translate-x-full flex flex-col"
      >
        {/* Close Button */}
        <div className="p-4 pl-8 flex justify-start">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="flex-1 px-8 pb-6 flex flex-col overflow-y-auto">
          {user ? (
            <>
              {/* Logged in menu */}
              <div className="menu-item mb-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {user.user_metadata?.first_name || "User"}
                    </p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Links for logged in users */}
              <nav className="space-y-2 mb-auto">
                {loggedInMenuLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="menu-item flex items-center gap-2 py-3 text-base font-medium hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-4 h-4" />}
                  </a>
                ))}
              </nav>

              {/* Sign out button */}
              <button
                onClick={handleSignOut}
                className="menu-item flex items-center gap-2 py-3 text-base font-medium text-red-600 hover:text-red-700 transition-colors mt-4 border-t border-border pt-6"
              >
                <LogOut className="w-5 h-5" />
                Sign out
              </button>
            </>
          ) : (
            <>
              {/* Auth Buttons for logged out users */}
              <div className="space-y-3 mb-8 pt-2">
                <Link
                  href="/signup"
                  className="menu-item w-full h-12 text-base font-medium bg-black text-white hover:bg-black/90 rounded-lg transition-colors flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="menu-item w-full h-12 text-base font-medium bg-[#eeeeee] text-black hover:bg-[#e0e0e0] rounded-lg transition-colors flex items-center justify-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2 mb-auto">
                {menuLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="menu-item flex items-center gap-2 py-3 text-base font-medium hover:text-muted-foreground transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-4 h-4" />}
                  </a>
                ))}
              </nav>

              {/* App Promotion */}
              <div className="menu-item pt-6 border-t border-border mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-foreground rounded-xl flex items-center justify-center">
                    <span className="text-background text-xs font-bold leading-tight text-center">
                      Slice
                      <br />& Co.
                    </span>
                  </div>
                  <p className="text-base font-medium">
                    There&apos;s more to love in
                    <br />
                    the app.
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 h-10 gap-2 bg-secondary hover:bg-secondary/80"
                  >
                    <Apple className="w-4 h-4" />
                    iPhone
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 h-10 gap-2 bg-secondary hover:bg-secondary/80"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="currentColor"
                    >
                      <path d="M17.523 15.341a.498.498 0 00-.473-.066c-.148.058-.31.147-.447.255-.102.08-.193.168-.266.257a.467.467 0 00-.092.289.548.548 0 00.548.548.544.544 0 00.359-.135c.093-.081.176-.176.244-.279.069-.103.123-.214.157-.329a.467.467 0 00-.03-.54zm.001-6.682a.498.498 0 00-.474-.066c-.148.058-.31.147-.447.255-.102.08-.193.168-.266.257a.467.467 0 00-.092.289.548.548 0 00.548.548.544.544 0 00.359-.135c.093-.081.176-.176.244-.279.069-.103.123-.214.157-.329a.467.467 0 00-.029-.54zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-3.5-9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm7 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm-7.74 3.855a.75.75 0 00-1.02 1.09c1.757 1.643 4.228 2.555 6.76 2.555s5.003-.912 6.76-2.555a.75.75 0 00-1.02-1.09c-1.449 1.354-3.563 2.145-5.74 2.145s-4.291-.791-5.74-2.145z" />
                    </svg>
                    Android
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Address Modal Overlay */}
      <div
        ref={addressOverlayRef}
        className={`fixed inset-0 bg-black/50 z-[80] opacity-0 ${
          isAddressModalOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={() => setIsAddressModalOpen(false)}
        aria-hidden="true"
      />

      {/* Address Modal */}
      <div
        className={`fixed inset-0 z-[90] flex items-start justify-center pt-20 ${
          isAddressModalOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          ref={addressModalRef}
          className="bg-background w-[560px] max-w-[90vw] rounded-2xl shadow-2xl opacity-0"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 pb-4">
            <h2 className="text-xl font-semibold">Enter delivery address</h2>
            <button
              onClick={() => setIsAddressModalOpen(false)}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search Input */}
          <div className="px-6 pb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for an address"
                className="w-full h-14 pl-12 pr-4 bg-[#f5f5f5] rounded-xl text-base outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
