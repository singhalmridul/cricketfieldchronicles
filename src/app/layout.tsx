import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import BottomNav from "../components/BottomNav";

import JsonLd from "../components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Cricket Field Chronicles",
  description: "Unearthing forgotten gems, celebrating historical triumphs, and exploring the finest literature from the world of cricket.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-stone-100 text-stone-900`}>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Cricket Field Chronicles",
          "url": "https://cricketfieldchronicles.com",
          "description": "Unearthing forgotten gems, celebrating historical triumphs, and exploring the finest literature from the world of cricket."
        }} />
        <div className="pb-16 md:pb-0">
          {children}
        </div>
        <BottomNav />
      </body>
    </html>
  );
}
