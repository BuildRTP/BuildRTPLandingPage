import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

/* =====================  HERO  ===================== */

function HeroBanner() {
  return (
    <section className="relative w-full h-[50vh] md:h-[55vh] flex items-center justify-center text-white bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-mainblue via-secondaryblue to-mainblue" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          Partner With BuildRTP
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mt-4 text-white/90">
          Support the next generation of builders and innovators in the Research Triangle Park area.
        </p>

        <div className="mt-8">
          <Link href="https://docs.google.com/document/d/1dEY-37KGgcW4orksnGiifpjXin3b1-TKJriyyuOiOiQ/edit?tab=t.0#heading=h.rp20ohikcijx" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white shadow-xl">
              View Sponsorship Packet
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* =====================  WHY SPONSOR  ===================== */

function WhySponsorSection() {
  const benefits = [
    {
      title: "Talent Pipeline",
      description: "Connect with high school students passionate about technology and entrepreneurship.",
    },
    {
      title: "Brand Visibility",
      description: "Showcase your company to students, parents, educators, and the broader RTP community.",
    },
    {
      title: "Community Impact",
      description: "Support student innovation and help shape the future of tech in the Triangle.",
    },
    {
      title: "Networking",
      description: "Join a community of forward-thinking companies and investors supporting youth entrepreneurship.",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Why Sponsor BuildRTP?</h2>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-mainblue via-orange to-mainblue" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, i) => (
            <Card key={i} className="border-mainblue/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-mainblue flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{benefit.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

/* =====================  SPONSOR TIERS  ===================== */

function SponsorTiersSection() {
  const sponsors: Record<"platinum" | "gold" | "silver" | "bronze", { name: string; logo?: string }[]> = {
    platinum: [
      { name: "ThinkSabio", logo: "/logos/platinum1.png" },
    ],
    gold: [
      { name: "Your Company Here!", logo: undefined },
    ],
    silver: [
      { name: "Your Company Here!", logo: undefined },
    ],
    bronze: [
      { name: "Cactus Capital", logo: "/logos/bronze1.png" },
    ],
  }

  const tierStyles: Record<"platinum" | "gold" | "silver" | "bronze", { heading: string; bgColor: string }> = {
    platinum: { heading: "text-4xl text-gray-600 font-extrabold", bgColor: "bg-gray-100" },
    gold: { heading: "text-3xl text-yellow-600 font-bold", bgColor: "bg-yellow-50" },
    silver: { heading: "text-2xl text-slate-600 font-semibold", bgColor: "bg-slate-50" },
    bronze: { heading: "text-xl text-orange-700 font-semibold", bgColor: "bg-orange-50" },
  }

  return (
    <section className="py-16">
      <div className="container max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Our Sponsors</h2>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-mainblue via-orange to-mainblue" />
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Thank you to our incredible sponsors who make BuildRTP possible.
          </p>
        </div>

        <div className="space-y-12">
          {Object.entries(sponsors).map(([tier, sponsorsList]) => {
            const tierKey = tier as keyof typeof tierStyles
            return (
              <div key={tier} className={`rounded-2xl p-8 ${tierStyles[tierKey].bgColor}`}>
                <h3 className={`mb-6 text-center ${tierStyles[tierKey].heading}`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors
                </h3>

                <div className="flex flex-wrap justify-center gap-8">
                  {sponsorsList.map((sponsor, i) => (
                    <div
                      key={i}
                      className="w-48 h-32 bg-white border border-gray-200 rounded-lg flex flex-col items-center justify-center p-4 overflow-hidden shadow-sm hover:shadow-md transition"
                    >
                      {sponsor.logo && (
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={180}
                          height={120}
                          className="max-h-full max-w-full object-contain mb-2"
                        />
                      )}
                      <p className="text-center text-sm font-medium">{sponsor.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* =====================  CTA  ===================== */

function CTASection() {
  return (
    <section className="py-16 bg-mainblue text-white">
      <div className="container max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
          Ready to Make an Impact?
        </h2>
        <p className="text-lg text-white/90 mb-8">
          Join us in empowering the next generation of student builders and entrepreneurs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="https://docs.google.com/document/d/1dEY-37KGgcW4orksnGiifpjXin3b1-TKJriyyuOiOiQ/edit?tab=t.0#heading=h.rp20ohikcijx" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white shadow-xl">
              View Sponsorship Packet
            </Button>
          </Link>
          <Link href="mailto:team@buildrtp.org">
            <Button size="lg" variant="outline" className="bg-white text-mainblue hover:bg-gray-100 border-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

/* =====================  PAGE  ===================== */

export default function SponsorsPage() {
  return (
    <div className="bg-white">
      <Header />
      <div className="pt-20">
        <HeroBanner />
      </div>
      <WhySponsorSection />
      <SponsorTiersSection />
      <CTASection />
    </div>
  )
}
