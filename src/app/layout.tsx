import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GRAFT — The Complete Ecommerce Blueprint",
  description: "Turn £59.99 into your first £1,000 online. The complete ecommerce system including AI automation secrets nobody else is teaching.",
  openGraph: {
    title: "GRAFT — The Complete Ecommerce Blueprint",
    description: "Turn £59.99 into your first £1,000 online. 9 modules. Video lessons. AI automation. Lifetime access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
