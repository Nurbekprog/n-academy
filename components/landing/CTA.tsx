"use client";

import React from "react";

import { useEffect, useRef, useState } from "react";
import { getCourses } from "@/lib/api";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [courses, setCourses] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    const loadAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelectorAll(".cta-animate"),
        { opacity: 0, y: 40 },
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
    };

    loadAnimations();
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadCourses = async () => {
      try {
        const data = await getCourses();
        if (!isMounted) return;
        setCourses(
          data.map((course) => ({ id: course.id, title: course.title })),
        );
      } catch {
        // ignore, fallback to empty
      }
    };
    loadCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", phone: "", course: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-20 sm:py-24 lg:py-32 bg-white dot-pattern"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-24 items-center">
          {/* Left Column - Content */}
          <div>
            <span className="cta-animate inline-block text-sm font-semibold text-[#0A1A2F] tracking-wider uppercase mb-4">
              Ro'yxatdan o'tish
            </span>
            <h2 className="cta-animate text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Kursga yoziling va{" "}
              <span className="text-[#0A1A2F]">
                o'z sohangizdagi professional
              </span>{" "}
              bo'ling
            </h2>
            <p className="cta-animate mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
              Hoziroq ro'yxatdan o'ting va maxsus chegirmalardan foydalaning.
              Sizning muvaffaqiyatingiz bizning maqsadimiz.
            </p>

            {/* Benefits */}
            <div className="cta-animate mt-6 sm:mt-8 space-y-4">
              {[
                "Professional mentorlik dasturi",
                "Cheksiz video darslar kirish",
                "Maxsus chegirmalar va bonuslar",
                "Sertifikat va portfolio tayyorlash",
              ].map((benefit) => (
                <div key={benefit} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="cta-animate">
            <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/5 border border-border">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Arizangiz qabul qilindi!
                  </h3>
                  <p className="text-muted-foreground">
                    Tez orada siz bilan bog'lanamiz
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    Bepul konsultatsiya
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Ma'lumotlaringizni qoldiring, biz siz bilan bog'lanamiz
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Ismingiz
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A1A2F]/20 focus:border-[#0A1A2F] transition-all"
                        placeholder="Ismingizni kiriting"
                      />
                    </div>

                    {/* Phone Input */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Telefon raqam
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0A1A2F]/20 focus:border-[#0A1A2F] transition-all"
                        placeholder="+998 90 123 45 67"
                      />
                    </div>

                    {/* Course Select */}
                    <div>
                      <label
                        htmlFor="course"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Qaysi kurs?
                      </label>
                      <select
                        id="course"
                        value={formData.course}
                        onChange={(e) =>
                          setFormData({ ...formData, course: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-[#0A1A2F]/20 focus:border-[#0A1A2F] transition-all"
                      >
                        <option value="">Kursni tanlang</option>
                        {courses.map((course) => (
                          <option key={course.id} value={String(course.id)}>
                            {course.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 text-base font-semibold text-white bg-[#0A1A2F] rounded-xl hover:bg-[#0A1A2F]/90 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Yuborilmoqda...
                        </>
                      ) : (
                        "Ro'yxatdan o'tish"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
