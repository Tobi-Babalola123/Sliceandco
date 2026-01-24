"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question:
      "Can I order Slice & Co. delivery in London?",
    answer:
      "Yes, you can order Slice & Co. delivery in London. Simply enter your delivery address to see if Slice & Co. delivers to your location.",
  },
  {
    question: "Is Slice & Co. delivery available near me?",
    answer:
      "Enter your delivery address to check if Slice & Co. delivers to your area. Delivery availability depends on your location and the restaurant's delivery radius.",
  },
  {
    question: "How do I order Slice & Co. delivery online in London?",
    answer:
      "To order from Slice & Co., simply browse their menu on this page, add items to your cart, and proceed to checkout. You can pay online and track your order in real-time.",
  },
  {
    question: "Where can I find Slice & Co. online menu prices?",
    answer:
      "You can find Slice & Co.'s complete menu with prices on this page. Prices may vary based on your delivery location and any applicable fees.",
  },
  {
    question: "How do I get free delivery on my Slice & Co. order?",
    answer:
      "Free delivery promotions may be available from time to time. Check the app for current offers or subscribe to Slice & Co. rewards for free delivery on eligible orders.",
  },
  {
    question: "How do I pay for my Slice & Co. order?",
    answer:
      "You can pay for your order using credit/debit cards, PayPal, Apple Pay, or Google Pay. All payment methods are secure and encrypted.",
  },
  {
    question:
      "What's the best thing to order for Slice & Co. delivery in London?",
    answer:
      "Popular items include The Flow signature pizza, Burrata + Nduja pizza, and the Bolognese Dough Bombs. Check the 'Popular' and 'Most Liked' tags for customer favorites.",
  },
];

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      gsap.to(contentRef.current, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  }, [isOpen]);

  return (
    <div className="faq-item border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left hover:bg-secondary/30 transition-colors px-2 -mx-2 rounded"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden h-0 opacity-0">
        <p className="pb-4 text-muted-foreground text-sm">{answer}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      const items = gsap.utils.toArray<HTMLElement>(".faq-item");
      gsap.from(items, {
        y: 20,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="px-4 py-12 max-w-7xl mx-auto">
      <h2 className="faq-title text-xl font-bold mb-6 text-foreground">
        Frequently asked questions
      </h2>
      <div className="max-w-3xl">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="mt-8 pt-8 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer">
            United Kingdom
          </span>
          <span>›</span>
          <span className="text-foreground">Slice & Co.</span>
        </div>
      </div>
    </div>
  );
}
