import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EventCard from "@/components/event-card"
import AboutSection from "@/components/about-section"
import SponsorsSection from "@/components/sponsors-section"
import Footer from "@/components/footer"
import EmailSignup from "@/components/email-signup"

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        <EmailSignup />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

