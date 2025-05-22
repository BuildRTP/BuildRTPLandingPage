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
        <EventCard
          eventType="HACKATHON"
          title="Girls Who Code"
          date="May 31th - 9 AM to 9 PM"
          location="5310 S Alston Ave. STE 200, Durham, NC 27713"
          description="An all girls hackathon packed with free food, merch, guest speakers, prizes, and fun workshops. No coding experience needed, just bring yourself! "
          signupUrl="https://tally.so/r/wgOgrM"
        />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

