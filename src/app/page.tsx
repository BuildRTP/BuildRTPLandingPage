import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import HackathonCard from "@/components/hackathon-card"
import AboutSection from "@/components/about-section"
import SponsorsSection from "@/components/sponsors-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />
        <HackathonCard />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

