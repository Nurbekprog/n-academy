"use client";

import { useEffect, useRef, useState } from "react";

import { About } from "@/components/landing/About";
import { CTA } from "@/components/landing/CTA";
import { Courses } from "@/components/landing/Courses";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";
import { Projects } from "@/components/landing/Projects";

export function LandingPageClient() {
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderMounted, setLoaderMounted] = useState(true);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    const startAt = Date.now();
    document.body.style.overflow = "hidden";

    const completeLoader = () => {
      const elapsed = Date.now() - startAt;
      const delay = Math.max(0, 950 - elapsed);

      hideTimerRef.current = window.setTimeout(() => {
        if (cancelled) return;
        setLoaderVisible(false);
        window.setTimeout(() => {
          if (cancelled) return;
          setLoaderMounted(false);
          document.body.style.overflow = "";
        }, 380);
      }, delay);
    };

    if (document.readyState === "complete") {
      completeLoader();
    } else {
      window.addEventListener("load", completeLoader, { once: true });
    }

    return () => {
      cancelled = true;
      if (hideTimerRef.current) {
        window.clearTimeout(hideTimerRef.current);
      }
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      {loaderMounted ? (
        <div
          className={[
            "fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-[#0A1A2F] to-[#142a45] transition-opacity duration-300",
            loaderVisible ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
          aria-live="polite"
          aria-label="Sahifa yuklanmoqda"
          role="status"
        >
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-2xl font-semibold tracking-wide text-white shadow-2xl shadow-black/20">
              N
            </div>
            <p className="mt-4 text-sm uppercase tracking-[0.22em] text-white/70">
              Academy
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[0, 160, 320].map((delay) => (
                <span
                  key={delay}
                  className="h-2 w-2 rounded-full bg-white/80 animate-bounce"
                  style={{ animationDelay: `${delay}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <main className="relative w-full">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Courses />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
