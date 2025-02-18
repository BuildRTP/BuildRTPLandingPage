import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function SponsorsSection() {
  const sponsors: Record<"platinum" | "gold" | "silver" | "bronze", { name: string; logo?: string }[]> = {
    platinum: [
      { name: "ThinkSabio", logo: "/logos/platinum1.png" },
      // { name: "Platinum Sponsor 2", logo: "/logos/platinum2.png" },
    ],
    gold: [
      { name: "Your Company Here!", logo: undefined },
      // { name: "Gold Sponsor 2", logo: "/logos/gold2.png" },
      // { name: "Gold Sponsor 3", logo: "/logos/gold3.png" },
    ],
    silver: [
      { name: "Your Company Here!", logo: undefined },
      // { name: "Silver Sponsor 2", logo: "/logos/silver2.png" },
      // { name: "Silver Sponsor 3", logo: "/logos/silver3.png" },
      // { name: "Silver Sponsor 4", logo: "/logos/silver4.png" },
    ],
    bronze: [
      { name: "Cactus Capital", logo: "/logos/bronze1.png" },
      // { name: "Bronze Sponsor 2", logo: "/logos/bronze2.png" },
      // { name: "Bronze Sponsor 3", logo: "/logos/bronze3.png" },
      // { name: "Bronze Sponsor 4", logo: "/logos/bronze4.png" },
      // { name: "Bronze Sponsor 5", logo: "/logos/bronze5.png" },
    ],
  }

  const tierStyles: Record<"platinum" | "gold" | "silver" | "bronze", string> = {
    platinum: "text-4xl text-gray-500 font-extrabold",
    gold: "text-3xl text-yellow-500 font-bold",
    silver: "text-2xl text-slate-600 font-semibold",
    bronze: "text-xl text-yellow-800 font-semibold",
  }

  return (
    <section id="sponsors" className="py-24 bg-primary-dark/5">
      <div className="container text-center">
        <h2 className="text-3xl font-bold text-mainblue mb-12">Our Sponsors</h2>

        {/* New section for supporting */}
        <div className="mb-16">
          <p className="text-lg mb-6">
            Join our community of sponsors and help students across the area achieve their goals.
          </p>
          <Button className="bg-mainblue hover:scale-110 hover:shadow-xl shadow-lg transition-all hover:bg-secondaryblue text-white">
            <Link href="https://docs.google.com/document/d/1dEY-37KGgcW4orksnGiifpjXin3b1-TKJriyyuOiOiQ/edit?tab=t.0#heading=h.rp20ohikcijx" target="_blank" rel="noopener noreferrer">
              View Sponsorship Packet
            </Link>
          </Button>
        </div>

        {Object.entries(sponsors).map(([tier, sponsorsList]) => {
          const tierKey = tier as keyof typeof tierStyles
          return (
            <div key={tier} className="mb-12">
              <h3 className={`mb-6 ${tierStyles[tierKey]}`}>{tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors</h3>

              {/* Centered Sponsor Logos */}
              <div className="flex flex-wrap justify-center gap-8">
                {sponsorsList.map((sponsor, i) => (
                  <div
                    key={i}
                    className="w-40 h-24 bg-background border border-primary-dark/20 rounded-lg flex flex-col items-center justify-center p-4 overflow-hidden"
                  >
                    {/* If a logo exists, show it. */}
                    {sponsor.logo && (
                      <Image
                        src={sponsor.logo || "/placeholder.svg"}
                        alt={sponsor.name}
                        width={140}
                        height={96}
                        className="max-h-full max-w-full object-contain mb-2"
                      />
                    )}
                    {/* Always show the name. */}
                    <p className="text-center">{sponsor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

