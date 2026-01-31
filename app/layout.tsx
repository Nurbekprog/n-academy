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
  title: "N ACADEMY | Graphic Design & SMM Expert",
  description:
    "Professional graphic designer and Instagram growth specialist. Transform your brand with stunning visuals and strategic social media marketing.",
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
    title: "N ACADEMY | Graphic Design & SMM Expert",
    description:
      "Transform your brand with stunning visuals and strategic social media marketing.",
    type: "website",
  },
  generator: "v0.app",
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
        className={`${inter.variable} font-sans antialiased overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
