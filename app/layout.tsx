import React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "N ACADEMY | Graphic Design & IT & SMM Expert",
  description:
    "Academy IT and Graphic Design sohasida zamonaviy ta'lim beradi.",
  keywords: [
    "graphic design",
    "SMM",
    "Instagram",
    "branding",
    "social media marketing",
    "visual identity",
  ],
  authors: [{ name: "N ACADEMY" }],
  openGraph: {
    title: "N ACADEMY | Graphic Design & IT & SMM Expert",
    description:
      "Academy IT and Graphic Design sohasida zamonaviy ta'lim beradi.",
    type: "website",
  },
  generator: "Next.js",
};

export const viewport: Viewport = {
  themeColor: "#0A1A2F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased overflow-x-hidden w-full`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
