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
          eventType="PITCH COMPETITION"
          title="LaunchUP"
          date="Saturday, August 10th - 12:30PM to 6PM"
          location="5310 S Alston Ave. STE 200, Durham, NC 27713"
          description="Join us for a pitch competition with thousands in prize money! Come in with any ideas, with a team of up to 4 people and get feedback from judges with decades of experience!"
          signupUrl="/launchup"
        />
        <AboutSection />
        <SponsorsSection />
      </main>
      <Footer />
    </>
  )
}

