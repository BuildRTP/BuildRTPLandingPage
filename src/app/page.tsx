import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import EventCard from "@/components/event-card"
import AboutSection from "@/components/about-section"
import SponsorsSection from "@/components/sponsors-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <HeroSection />

        <EventCard
          eventType="HACKATHON"
          title="Scrapyard RTP"
          date="March 16th - 8AM to 8PM"
          location="5310 S Alston Ave. STE 200, Durham, NC 27713"
          description="Join us for 12 hours of building with workshops, free food, and cash prizes! Form teams of up to 3 people and try to create a stupid solution to a real world problem."
          signupUrl="https://scrapyard.hackclub.com/rtp"
        />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

