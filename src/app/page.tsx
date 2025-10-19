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
          title="LaunchUP Accelerator"
          date="Nov 3rd - Dec 12th"
          location="Innovate Carolina Junction - 136 E Rosemary St, Chapel Hill, NC 27514"
          description="In collaboration with Launch Chapel Hill and Innovate Carolina at UNC, we are offering a 6 week accelerator program for high school startups in the RTP area. Join us to get feedback from experts in your industry area, guidance from mentors that have been in your shoes, and more opportunities!"
          signupUrl="/launchup"
        />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

