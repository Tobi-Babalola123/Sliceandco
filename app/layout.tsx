// console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("SUPABASE KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
// console.log("SUPABASE KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export const metadata: Metadata = {
  title: "Slice & Co. | Order Delivery & Pickup",
  description:
    "Order delivery or pickup from Slice & Co. in London. Authentic Neapolitan pizzas, loaded fries, dough bombs, and more.",
  generator: "Nextjs",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
