"use client";

import { useEffect, useRef } from "react";

const skills = [
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
    title: "Grafik Dizayn",
    description: "Logo, branding va visual identity yaratish",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
    title: "Instagram SMM",
    description: "Kontent strategiyasi va auditoriya o'sishi",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    title: "Shaxsiy Brending",
    description: "Brendingizni professional darajaga olib chiqish",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    title: "Online Ta'lim",
    description: "Professional kurslar va mentorlik dasturlari",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".about-animate"),
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        section.querySelectorAll(".skill-card"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section.querySelector(".skills-grid"),
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    };

    loadAnimations();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Text */}
          <div>
            <span className="about-animate inline-block text-sm font-semibold text-[#0A1A2F] tracking-wider uppercase mb-4">
              Men haqimda
            </span>
            <h2 className="about-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Kreativ yechimlar orqali{" "}
              <span className="text-[#0A1A2F]">brendingizni</span>{" "}
              rivojlantiraman
            </h2>
            <p className="about-animate mt-6 text-lg text-muted-foreground leading-relaxed">
              5 yildan ortiq tajribaga ega professional grafik dizayner va SMM
              mutaxassisiman. Mijozlarimning brendlarini zamonaviy dizayn va
              samarali marketing strategiyalari orqali rivojlantirishga yordam
              beraman.
            </p>
            <p className="about-animate mt-4 text-lg text-muted-foreground leading-relaxed">
              Instagram platformasida 50,000 dan ortiq auditoriya yig'ishga
              erishdim va 500 dan ortiq o'quvchilarga online kurslarim orqali
              bilim berdim. Sizning brendingiz ham mening loyiham bo'lishi
              mumkin.
            </p>

            {/* CTA */}
            <div className="about-animate mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[#0A1A2F] font-semibold hover:gap-3 transition-all duration-300"
              >
                Bog'lanish
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column - Skills */}
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.title}
                className="skill-card group p-6 rounded-2xl bg-secondary/50 border border-border/50 hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0A1A2F] text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {skill.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
