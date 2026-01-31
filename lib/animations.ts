// Animation utilities for GSAP and Anime.js
// This file contains reusable animation functions

export const gsapConfig = {
  ease: "power3.out",
  duration: 0.8,
}

export const animeConfig = {
  easing: "easeOutCubic",
  duration: 600,
}

// GSAP scroll animation defaults
export const scrollAnimationDefaults = {
  start: "top 80%",
  toggleActions: "play none none reverse",
}

// Fade in from bottom animation
export const fadeInUp = {
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 },
}

// Scale animation for cards
export const scaleIn = {
  from: { opacity: 0, scale: 0.95 },
  to: { opacity: 1, scale: 1 },
}

// Stagger configuration
export const staggerConfig = {
  amount: 0.4,
  from: "start" as const,
}

// Modal animation config for Anime.js
export const modalAnimations = {
  open: {
    overlay: {
      opacity: [0, 1],
      duration: 300,
      easing: "easeOutQuad",
    },
    content: {
      opacity: [0, 1],
      scale: [0.95, 1],
      translateY: [20, 0],
      duration: 400,
      easing: "easeOutCubic",
    },
  },
  close: {
    overlay: {
      opacity: [1, 0],
      duration: 250,
      easing: "easeInQuad",
    },
    content: {
      opacity: [1, 0],
      scale: [1, 0.95],
      translateY: [0, 20],
      duration: 250,
      easing: "easeInQuad",
    },
  },
}

// Card animation config for Anime.js
export const cardAnimation = {
  opacity: [0, 1],
  translateY: [40, 0],
  scale: [0.95, 1],
  duration: 600,
  easing: "easeOutCubic",
}

// Initialize smooth scroll
export function initSmoothScroll() {
  if (typeof window !== "undefined") {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (this: HTMLAnchorElement, e) {
        e.preventDefault()
        const href = this.getAttribute("href")
        if (href) {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }
      })
    })
  }
}

// Parallax effect helper
export function createParallax(element: HTMLElement, speed: number = 0.5) {
  if (typeof window === "undefined") return

  const handleScroll = () => {
    const scrolled = window.pageYOffset
    const rate = scrolled * speed
    element.style.transform = `translate3d(0, ${rate}px, 0)`
  }

  window.addEventListener("scroll", handleScroll)
  return () => window.removeEventListener("scroll", handleScroll)
}

// Text split animation helper
export function splitText(text: string): string[] {
  return text.split("")
}

// Intersection Observer factory
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const defaultOptions: IntersectionObserverInit = {
    threshold: 0.1,
    rootMargin: "0px",
    ...options,
  }

  return new IntersectionObserver(callback, defaultOptions)
}
