"use client";

import { useEffect, useRef } from "react";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
        .fromTo(
          ".hero-title",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3",
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          ".hero-buttons",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          ".hero-stats",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );
    };

    loadGsap();
  }, []);

  const handleScroll = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-20 lg:pt-0 dot-pattern"
    >
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0A1A2F]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#0A1A2F]/3 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mt-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">
            Yangi kurslar mavjud
          </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1]">
          <span className="block">Instagramda Rivojlanish</span>
          <span className="block mt-2">
            <span className="text-[#0A1A2F]">Va</span>{" "}
            <span className="bg-gradient-to-r from-[#0A1A2F] to-[#0A1A2F]/70 bg-clip-text text-transparent">
              Visual Brending
            </span>
          </span>
          <span className="block text-muted-foreground mt-2">Expert</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Professional grafik dizayner va SMM mutaxassisi sifatida brendingizni
          yangi bosqichga olib chiqaman. Zamonaviy dizayn va strategik
          yondashuv.
        </p>

        {/* CTA Buttons */}
        <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <button
            type="button"
            onClick={() => handleScroll("#courses")}
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-[#0A1A2F] rounded-2xl hover:bg-[#0A1A2F]/90 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0A1A2F]/20 hover:-translate-y-0.5"
          >
            Kursga yozilish
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => handleScroll("#projects")}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground bg-white border border-border rounded-2xl hover:bg-secondary transition-all duration-300 hover:-translate-y-0.5"
          >
            Loyihalarni ko'rish
          </button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-16">
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              150+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Loyihalar</div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              50K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Instagram obunachilar
            </div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              500+
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              O'quvchilar
            </div>
          </div>
          <div className="hero-stats text-center">
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              5+
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Yillik tajriba
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          type="button"
          onClick={() => handleScroll("#about")}
          className="p-2 rounded-full hover:bg-secondary transition-colors"
          aria-label="Scroll down"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted-foreground"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>
    </section>
  );
}
