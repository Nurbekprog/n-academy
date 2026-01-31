"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description: string;
  category?: string;
  image?: string;
  onClick?: () => void;
  className?: string;
  index?: number;
}

export function Card({
  title,
  description,
  category,
  image,
  onClick,
  className,
  index = 0,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use CSS transitions instead of anime.js for card entry
            card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
            card.style.opacity = "1";
            card.style.transform = "translateY(0) scale(1)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      {...(onClick ? { role: "button", tabIndex: 0 } : {})}
      style={{ opacity: 0, transform: "translateY(40px) scale(0.95)" }}
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-secondary/50 border border-border/50",
        "hover:shadow-2xl hover:shadow-black/10 hover:-translate-y-2",
        onClick && "cursor-pointer",
        className,
      )}
    >
      {/* Image */}
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className={cn("p-6", image && "absolute bottom-0 left-0 right-0")}>
        {category && (
          <span
            className={cn(
              "inline-block px-3 py-1 text-xs font-medium rounded-full mb-3",
              image
                ? "bg-white/20 backdrop-blur-sm text-white"
                : "bg-[#0A1A2F]/10 text-[#0A1A2F]",
            )}
          >
            {category}
          </span>
        )}
        <h3
          className={cn(
            "text-lg font-semibold mb-2 line-clamp-2",
            image ? "text-white" : "text-foreground",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "text-sm leading-relaxed line-clamp-2",
            image ? "text-white/80" : "text-muted-foreground",
          )}
        >
          {description}
        </p>

        {/* Arrow indicator */}
        {onClick && (
          <div
            className={cn(
              "mt-4 inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3",
              image ? "text-white" : "text-[#0A1A2F]",
            )}
          >
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
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
