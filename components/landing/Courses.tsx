"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { Modal } from "./Modal";

const courses = [
  {
    id: 1,
    title: "Instagram SMM Professional",
    description:
      "Instagram'da professional darajada marketing qilishni o'rganing",
    price: "1,500,000",
    duration: "8 hafta",
    lessons: 32,
    students: 234,
    level: "Boshlang'ich",
    icon: (
      <svg
        width="28"
        height="28"
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
    fullDescription:
      "Bu kursda Instagram platformasining barcha sirlarini o'rganasiz: algoritmlar, kontent yaratish, reels, stories, engagement oshirish va monetizatsiya. 8 haftalik intensiv dastur sizni professional SMM mutaxassisiga aylantiradi.",
    modules: [
      "Instagram algoritmlari",
      "Kontent strategiyasi",
      "Reels va Stories",
      "Engagement oshirish",
      "Monetizatsiya yo'llari",
      "Analytics va o'sish",
    ],
    features: [
      "32 video dars",
      "Amaliy topshiriqlar",
      "Guruh chat",
      "Sertifikat",
    ],
  },
  {
    id: 2,
    title: "Personal Branding Mastery",
    description:
      "Shaxsiy brendingizni noldan professional darajaga olib chiqing",
    price: "2,000,000",
    duration: "6 hafta",
    lessons: 24,
    students: 156,
    level: "O'rta",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    fullDescription:
      "Shaxsiy brend - bu sizning eng katta aktivingiz. Bu kursda o'z niche'ingizni topish, unique value proposition yaratish, visual identity va kontent strategiyasini o'rganasiz.",
    modules: [
      "Niche tanlash",
      "Brand positioning",
      "Visual identity",
      "Content pillars",
      "Audience building",
      "Monetizatsiya",
    ],
    features: [
      "24 video dars",
      "1-on-1 mentorlik",
      "Brand audit",
      "Sertifikat",
    ],
  },
  {
    id: 3,
    title: "Grafik Dizayn Fundamentals",
    description: "Canva va boshqa toollar orqali professional dizayn yaratish",
    price: "1,200,000",
    duration: "4 hafta",
    lessons: 20,
    students: 312,
    level: "Boshlang'ich",
    icon: (
      <svg
        width="28"
        height="28"
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
    fullDescription:
      "Dizayn asoslarini va zamonaviy toollarni o'rganing. Canva Pro, Figma va boshqa dasturlar orqali professional darajadagi grafikalar yaratishni o'rgataman.",
    modules: [
      "Dizayn asoslari",
      "Rang nazariyasi",
      "Typography",
      "Canva mastery",
      "Figma basics",
      "Social media dizayn",
    ],
    features: [
      "20 video dars",
      "Templates to'plami",
      "Amaliy mashqlar",
      "Sertifikat",
    ],
  },
];

interface Course {
  id: number;
  title: string;
  description: string;
  price: string;
  duration: string;
  lessons: number;
  students: number;
  level: string;
  icon: React.ReactNode;
  fullDescription: string;
  modules: string[];
  features: string[];
}

export function Courses() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      // Header animation with GSAP
      gsap.fromTo(
        section.querySelectorAll(".section-header"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Cards animation with CSS transitions
      const cards = section.querySelectorAll<HTMLElement>(".course-card");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              cards.forEach((card, index) => {
                card.style.transition = `opacity 0.7s ease-out ${index * 0.15}s, transform 0.7s ease-out ${index * 0.15}s`;
                card.style.opacity = "1";
                card.style.transform = "translateY(0) scale(1)";
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 },
      );

      if (section.querySelector(".courses-grid")) {
        observer.observe(section.querySelector(".courses-grid") as Element);
      }
    };

    loadAnimations();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="courses"
      className="relative py-24 lg:py-32 bg-[#0A1A2F]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-header inline-block text-sm font-semibold text-white/60 tracking-wider uppercase mb-4">
            Ta'lim
          </span>
          <h2 className="section-header text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Online kurslar
          </h2>
          <p className="section-header mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            Professional darajadagi bilimlar va amaliy ko'nikmalarni o'rganing
          </p>
        </div>

        {/* Courses Grid */}
        <div className="courses-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => setSelectedCourse(course)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedCourse(course)}
              role="button"
              tabIndex={0}
              style={{ opacity: 0, transform: "translateY(50px) scale(0.95)" }}
              className="course-card group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 lg:p-8 cursor-pointer hover:bg-white/10 hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {course.icon}
              </div>

              {/* Level Badge */}
              <span className="inline-block px-3 py-1 text-xs font-medium bg-white/10 text-white/80 rounded-full mb-4">
                {course.level}
              </span>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-3">
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-white/50 mb-6">
                <span className="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
                    <rect x="2" y="6" width="14" height="12" rx="2" />
                  </svg>
                  {course.lessons} dars
                </span>
              </div>

              {/* Price & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div>
                  <span className="text-2xl font-bold text-white">
                    {course.price}
                  </span>
                  <span className="text-white/50 text-sm ml-1">so'm</span>
                </div>
                <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                  Batafsil
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline-block ml-1 transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        title={selectedCourse?.title}
      >
        {selectedCourse && (
          <div className="space-y-6">
            {/* Course Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#0A1A2F] text-white flex items-center justify-center flex-shrink-0">
                {selectedCourse.icon}
              </div>
              <div>
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[#0A1A2F]/10 text-[#0A1A2F] rounded-full mb-2">
                  {selectedCourse.level}
                </span>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{selectedCourse.duration}</span>
                  <span>•</span>
                  <span>{selectedCourse.lessons} dars</span>
                  <span>•</span>
                  <span>{selectedCourse.students} o'quvchi</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {selectedCourse.fullDescription}
            </p>

            {/* Modules */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Kurs modullari:
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedCourse.modules.map((module, index) => (
                  <div
                    key={module}
                    className="flex items-center gap-2 p-3 bg-secondary rounded-xl"
                  >
                    <span className="w-6 h-6 rounded-full bg-[#0A1A2F] text-white text-xs flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {module}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">
                Kursga kiradi:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCourse.features.map((feature) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex items-center justify-between p-4 bg-secondary rounded-2xl">
              <div>
                <span className="text-sm text-muted-foreground">Narxi:</span>
                <div className="text-2xl font-bold text-foreground">
                  {selectedCourse.price}{" "}
                  <span className="text-lg font-normal text-muted-foreground">
                    so'm
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="px-6 py-3 font-semibold text-white bg-[#0A1A2F] rounded-xl hover:bg-[#0A1A2F]/90 transition-colors"
              >
                Kursga yozilish
              </button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
