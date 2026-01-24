"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { ProductModal } from "@/components/product-modal";

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
}

const pickedItems: MenuItem[] = [
  {
    id: "p1",
    name: "Bolognese",
    price: "£8.00",
    description: "Fried, fresh dough bomb. Bolognese Ragu, mozzarella, ricotta",
    image: "/images/dough-bomb.jpg",
  },
  {
    id: "p2",
    name: "Napoli sausage + provola",
    price: "£9.50",
    description:
      "Thin cut fries topped with Neapolitan red pork sausage, provola (smoked...",
    image: "/images/loaded-fries.jpg",
  },
  {
    id: "p3",
    name: "Neapolitan",
    price: "£8.00",
    description:
      "Fried, fresh dough bomb. Ricotta, provola (smoked mozzarella)...",
    image: "/images/neapolitan-bomb.jpg",
  },
  {
    id: "p4",
    name: 'Nutella Pizza (12")',
    price: "£9.00",
    description:
      "Dessert pizza. Plain pizza baked first then smothered with lots of Nutella and...",
    image: "/images/nutella.jpg",
  },
  {
    id: "p5",
    name: 'Pepperole (12")',
    price: "£12.00",
    description:
      "Mozzarella, red pesto, Neapolitan peppers, olives, capers, garlic, oregano...",
  },
];

export function PickedForYou() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(!!user);
      setIsLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user || isLoading) return;

    const ctx = gsap.context(() => {
      gsap.from(".picked-item", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [user, isLoading]);

  // Don't render if not logged in or still loading
  if (isLoading || !user) return null;

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Picked for you</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pickedItems.map((item) => (
          <div
            key={item.id}
            className="picked-item flex justify-between items-start p-4 border-b border-border hover:bg-secondary/30 transition-colors cursor-pointer rounded-lg"
          >
            <div className="flex-1 pr-4">
              <h3 className="font-medium text-base mb-1">{item.name}</h3>
              <p className="text-sm font-medium mb-2">{item.price}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.description}
              </p>
            </div>

            <div className="relative flex-shrink-0">
              {item.image ? (
                <div className="relative w-28 h-28 rounded-lg overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="w-28 h-28 flex items-end justify-end">
                  <button className="w-8 h-8 bg-white border border-border rounded-full shadow-sm flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
