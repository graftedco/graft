import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRAFT — The Complete Ecommerce Blueprint",
  description:
    "What took us 2 years explained in less than 4 weeks. The complete ecommerce blueprint for beginners in 2026. 9 modules. 18 videos. Lifetime access.",
  openGraph: {
    title: "GRAFT — The Complete Ecommerce Blueprint",
    description: "What took us 2 years explained in less than 4 weeks.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
