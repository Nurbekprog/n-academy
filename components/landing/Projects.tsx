"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";

const projects = [
  {
    id: 1,
    title: "Cosmo Beauty Brand",
    description:
      "Kosmetika brendi uchun to'liq brending va Instagram strategiyasi",
    category: "Brending",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    fullDescription:
      "Cosmo Beauty brendi uchun to'liq visual identity yaratdim: logo dizayni, rang palitrasi, shrift tanlovi va barcha marketing materiallari. Instagram uchun 3 oylik kontent strategiyasi ishlab chiqildi va auditoriya 300% ga oshdi.",
    results: [
      "Logo va brending",
      "Instagram strategiya",
      "300% o'sish",
      "50+ post dizayn",
    ],
  },
  {
    id: 2,
    title: "Urban Cafe Rebrand",
    description: "Zamonaviy kofe uchun yangi vizual identifikatsiya",
    category: "Logo Dizayn",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    fullDescription:
      "Urban Cafe uchun to'liq rebrand loyihasi. Yangi logo, menyu dizayni, ichki bezak konsepti va social media presence yaratildi. Mijozlar oqimi 40% ga oshdi.",
    results: [
      "Logo rebrand",
      "Menyu dizayn",
      "40% mijoz o'sishi",
      "Social media kit",
    ],
  },
  {
    id: 3,
    title: "FitLife App",
    description: "Fitness ilovasi uchun UI/UX dizayn va brending",
    category: "UI/UX",
    image:
      "https://d2567ph5zp6ttk.cloudfront.net/public/blog_posts/0001/12/f2fc393375db6bd9302661644183dd6b78e6a291.jpeg?d=1200x630",
    fullDescription:
      "FitLife fitness ilovasi uchun to'liq UI/UX dizayn. User research, wireframing, prototyping va final dizayn. App Store'da 4.8 reyting oldi.",
    results: [
      "UI/UX dizayn",
      "Prototyping",
      "4.8 App Store reyting",
      "50K+ yuklab olish",
    ],
  },
  {
    id: 4,
    title: "Fashion Week Campaign",
    description: "Mahalliy fashion haftaligi uchun marketing kampaniyasi",
    category: "SMM",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    fullDescription:
      "Fashion Week Tashkent uchun to'liq digital marketing kampaniyasi. Instagram, Telegram va boshqa platformalarda kontent yaratish va targetlangan reklama.",
    results: [
      "1M+ reach",
      "50K engagement",
      "Sold out event",
      "Press coverage",
    ],
  },
  {
    id: 5,
    title: "EcoStore Branding",
    description: "Ekologik do'kon uchun barqaror brending",
    category: "Brending",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    fullDescription:
      "EcoStore uchun environmentally conscious brending. Recycled materiallardan packaging dizayni va sustainable marketing strategiyasi.",
    results: [
      "Eco-friendly dizayn",
      "Packaging",
      "Brand guidelines",
      "Marketing kit",
    ],
  },
  {
    id: 6,
    title: "Tech Startup Launch",
    description: "Texnologiya startapi uchun launch kampaniyasi",
    category: "Marketing",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    fullDescription:
      "SaaS startapi uchun product launch kampaniyasi. Landing page dizayn, email marketing va social media strategiyasi.",
    results: ["Landing page", "Email funnel", "500+ signups", "PR coverage"],
  },
];

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  fullDescription: string;
  results: string[];
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadAnimations = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

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
    };

    loadAnimations();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 lg:py-32 dot-pattern"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="section-header inline-block text-sm font-semibold text-[#0A1A2F] tracking-wider uppercase mb-4">
            Portfolio
          </span>
          <h2 className="section-header text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Tanlangan loyihalar
          </h2>
          <p className="section-header mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Turli sohalardagi mijozlar uchun yaratgan eng yaxshi ishlarim
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              title={project.title}
              description={project.description}
              category={project.category}
              image={project.image}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        {selectedProject && (
          <div className="space-y-6">
            {/* Project Image */}
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={selectedProject.image || "/placeholder.svg"}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Category Badge */}
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-[#0A1A2F]/10 text-[#0A1A2F] rounded-full">
              {selectedProject.category}
            </span>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {selectedProject.fullDescription}
            </p>

            {/* Results */}
            <div>
              <h4 className="font-semibold text-foreground mb-3">Natijalar:</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedProject.results.map((result) => (
                  <div
                    key={result}
                    className="flex items-center gap-2 p-3 bg-secondary rounded-xl"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#0A1A2F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-sm font-medium text-foreground">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button
              type="button"
              className="w-full py-4 text-center font-semibold text-white bg-[#0A1A2F] rounded-2xl hover:bg-[#0A1A2F]/90 transition-colors"
            >
              Bunday loyiha buyurtma berish
            </button>
          </div>
        )}
      </Modal>
    </section>
  );
}
