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
          eventType="STARTUP ACCELERATOR"
          title="LaunchUp Accelerator"
          date="Nov 2nd - Dec 14th"
          location="5310 S Alston Ave. STE 200, Durham, NC 27713"
          description="In collaboration with LaunchChapelHill and Innovate Carolina at UNC, we are offering a 6 week accelerator program for high school startups in the RTP area. Join us to get feedback from experts in your industry area, guidance from mentors that have been in your shoes, and opportunities to pitch to investors."
          signupUrl="https://airtable.com/app9rUWmeWG5sKQ0b/pagKaOdp2kRagqDp7/form"
        />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

