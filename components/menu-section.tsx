"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Plus } from "lucide-react";
import { ProductModal } from "@/components/product-modal";

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
  badges?: string[];
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const menuData: MenuCategory[] = [
  {
    title: "Pizzas",
    items: [
      {
        id: "1",
        name: 'Margherita (12")',
        price: "£10.00",
        description:
          "San Marzano tomato, mozzarella, basil, EVO",
        image: "/images/margherita.jpg",
        badges: ["Popular"],
      },
      {
        id: "2",
        name: 'Burrata + Nduja (12")',
        price: "£13.00",
        description:
          "San Marzano tomato, mozzarella, nduja (cured pork), burrata (soft creamy mozzarella), basil, EVO",
        image: "/images/burrata-nduja.jpg",
        badges: ["#1 most liked"],
      },
      {
        id: "3",
        name: 'The Flow (12")',
        price: "£12.00",
        description:
          "Our signature pizza. Mozzarella, red pesto, smoked cheddar, mortadella (Italian ham), rocket, Parmesan",
        image: "/images/the-flow.jpg",
        badges: ["#1 most liked"],
      },
      {
        id: "4",
        name: 'Nutella Pizza (12")',
        price: "£5.00",
        description:
          "Dessert pizza. Plain pizza base baked then smothered with lots of Nutella and dusted with powdered sugar.",
        image: "/images/nutella.jpg",
      },
      {
        id: "5",
        name: 'Calzone (folded 12" pizza)',
        price: "£12.00",
        description:
          "Ricotta, mozzarella, provola (smoked mozzarella), Napoli salami, San Marzano tomato, basil, EVO",
        image: "/images/calzone.jpg",
      },
      {
        id: "6",
        name: 'Salami (12")',
        price: "£11.00",
        description: "San Marzano tomato, mozzarella, Napoli salami, basil, EVO",
        image: "/images/salami.jpg",
        badges: ["Popular"],
      },
      {
        id: "7",
        name: 'Romana (12")',
        price: "£12.00",
        description:
          "San Marzano tomato, mozzarella, anchovy fillet, olives, capers, oregano, garlic, basil, EVO",
        image: "/images/romana.jpg",
      },
      {
        id: "8",
        name: 'Marinara (12")',
        price: "£9.00",
        description: "San Marzano tomato, oregano, garlic, EVO",
        image: "/images/marinara.jpg",
        badges: ["Vegan"],
      },
      {
        id: "9",
        name: 'Vegetarian (12")',
        price: "£12.00",
        description:
          "San Marzano tomato, mozzarella, mushrooms, peppers, olives, red onion, basil, EVO",
        image: "/images/vegetarian.jpg",
      },
      {
        id: "10",
        name: 'Ham + Mushroom (12")',
        price: "£11.00",
        description:
          "San Marzano tomato,mozzarella, ham, mushrooms, basil, EVO",
        image: "/images/ham-mushroom.jpg",
      },
      {
        id: "11",
        name: 'Pepperole (12")',
        price: "£12.00",
        description:
          "Mozzarella, red pesto, Neapolitan peppers, olives, capers, garlic, oregano, basil, EVO",
        badges: ["Vegan, vegetarian"],
      },
    ],
  },
  {
    title: "Neapolitan Style Loaded Fries",
    items: [
      {
        id: "12",
        name: "Bolognese",
        price: "£9.00",
        description:
          "Thin cut fries topped with: real bolognese ragu, mozzarella, Parmesan",
        image: "/images/loaded-fries.jpg",
      },
      {
        id: "13",
        name: "Napoli sausage + provola",
        price: "£9.50",
        description:
          "Thin cut fries topped with Neapolitan red pork sausage, provola (smoked mozzarella), fiore garlic mayo, Parmesan...",
      },
      {
        id: "14",
        name: "Pepperole fries",
        price: "£8.50",
        description:
          "Neapolitan style peppers, mozzarella, smoked cheddar, red pesto, fiore garlic mayo, Parmesan...",
      },
      {
        id: "15",
        name: "Parmesan + pepper",
        price: "£6.50",
        description: "Thin cut fries seasoned with Parmesan and pepper.",
      },
    ],
  },
  {
    title: "Dough Bombs",
    items: [
      {
        id: "16",
        name: "Bolognese",
        price: "£8.00",
        description: "Filled, fried dough bomb. Bolognese Ragu, mozzarella, ricotta",
        image: "/images/dough-bomb.jpg",
      },
      {
        id: "17",
        name: "Neapolitan",
        price: "£8.00",
        description:
          "Fried, fresh dough bomb. Ricotta, provola (smoked mozzarella), Napoli salami, touch of...",
        image: "/images/neapolitan-bomb.jpg",
      },
      {
        id: "18",
        name: "Pomodoro",
        price: "£7.00",
        description:
          "Fried, fresh dough bomb. San Marzano tomato, ricotta, mozzarella",
        badges: ["Popular"],
      },
    ],
  },
  {
    title: "Dips",
    items: [
      {
        id: "19",
        name: "Flow Garlic Mayo",
        price: "£1.25",
        description: "2 oz pot",
      },
      {
        id: "20",
        name: "Paprika Mayo",
        price: "£1.50",
        description: "2 oz pot",
      },
    ],
  },
  {
    title: "Drinks",
    items: [
      {
        id: "21",
        name: "Coca cola",
        price: "£1.95",
        description: "Can",
        image: "/images/coca-cola.jpg",
      },
      {
        id: "22",
        name: "Fanta",
        price: "£1.95",
        description: "Can",
        image: "/images/fanta.jpg",
      },
      {
        id: "23",
        name: "Coke Zero",
        price: "£1.95",
        description: "Can",
        badges: ["Popular"],
      },
    ],
  },
];

interface MenuItemCardProps {
  item: MenuItem;
  onItemClick: (item: MenuItem) => void;
}

function MenuItemCard({ item, onItemClick }: MenuItemCardProps) {
  return (
    <div
      className="menu-item flex gap-4 p-4 border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer group"
      onClick={() => onItemClick(item)}
    >
      <div className="flex-1 min-w-0 space-y-1">
        <h3 className="font-medium text-foreground">{item.name}</h3>
        <p className="text-sm text-muted-foreground font-medium">{item.price}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
        {item.badges && item.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {item.badges.map((badge) => (
              <span
                key={badge}
                className={`text-xs font-medium ${
                  badge === "Popular" || badge.includes("most liked")
                    ? "text-uber-green"
                    : "text-muted-foreground"
                }`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="relative shrink-0">
        {item.image ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <Image
              src={item.image || "/placeholder.svg"}
              alt={item.name}
              fill
              className="object-cover"
            />
            <button className="absolute bottom-2 right-2 w-8 h-8 bg-background rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}

export function MenuSection() {
  const containerRef = useRef<HTMLDivElement>(null);
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
    const ctx = gsap.context(() => {
      const categories = gsap.utils.toArray<HTMLElement>(".menu-category");
      categories.forEach((category) => {
        gsap.from(category, {
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: category,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      const items = gsap.utils.toArray<HTMLElement>(".menu-item");
      items.forEach((item, index) => {
        gsap.from(item, {
          x: -30,
          opacity: 0,
          duration: 0.4,
          delay: index * 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div ref={containerRef} className="px-4 py-8 max-w-7xl mx-auto">
        {menuData.map((category) => (
          <div key={category.title} className="menu-category mb-8">
            <h2 className="text-xl font-bold mb-4 text-foreground">
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-border">
              {category.items.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onItemClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
      />
    </>
  );
}
