"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { X, Share, ChevronDown } from "lucide-react";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    price: string;
    description: string;
    image?: string;
    tag?: string;
  } | null;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      // Reset quantity when opening
      setQuantity(1);
      
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out", delay: 0.1 }
      );
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.2,
        ease: "power3.in",
      });
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, product]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/50 z-[100] opacity-0 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed inset-0 z-[110] flex items-center justify-center p-4 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          ref={contentRef}
          className="bg-background w-full max-w-[1000px] max-h-[90vh] rounded-2xl shadow-2xl opacity-0 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              className="p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Share"
            >
              <Share className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex flex-col md:flex-row max-h-[calc(90vh-80px)] overflow-y-auto">
            {/* Product Image */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative aspect-square">
                <Image
                  src={product.image || "/images/margherita.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl text-muted-foreground mb-4">{product.price}</p>
              
              <p className="text-base text-foreground/80 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="relative mb-6">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  <span>{quantity}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-background border border-border rounded-xl shadow-lg py-2 min-w-[80px] z-10">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <button
                        key={num}
                        onClick={() => {
                          setQuantity(num);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${
                          quantity === num ? "bg-secondary font-medium" : ""
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <button className="w-full h-14 bg-black text-white text-base font-medium rounded-lg hover:bg-black/90 transition-colors mb-4">
                Enter address for availability
              </button>

              {/* See Details Link */}
              <button className="text-base font-medium underline hover:no-underline transition-all">
                See details
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
