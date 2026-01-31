import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { About } from "@/components/landing/About"
import { Projects } from "@/components/landing/Projects"
import { Courses } from "@/components/landing/Courses"
import { CTA } from "@/components/landing/CTA"
import { Footer } from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="relative">
      {/* Navbar - Fixed at top */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Courses Section */}
      <Courses />

      {/* CTA / Contact Section */}
      <CTA />

      {/* Footer */}
      <Footer />
    </main>
  )
}
