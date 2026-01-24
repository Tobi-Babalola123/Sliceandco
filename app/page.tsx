"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { RestaurantInfo } from "@/components/restaurant-info";
import { DeliverySection } from "@/components/delivery-section";
import { MenuSection } from "@/components/menu-section";
import { PickedForYou } from "@/components/picked-for-you";
import { FAQSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger when the page loads
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <RestaurantInfo />
        <DeliverySection />
        <PickedForYou />
        <MenuSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
