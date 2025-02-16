export default function SponsorsSection() {
    const sponsors: Record<
      "platinum" | "gold" | "silver" | "bronze",
      { name: string; logo: string }[]
    > = {
      platinum: [
        { name: "ThinkSabio", logo: "/logos/platinum1.png" },
        //{ name: "Platinum Sponsor 2", logo: "/logos/platinum2.png" },
      ],
      gold: [
        { name: "Your Company Here!", logo: "/logos/gold1.png" },
        //{ name: "Gold Sponsor 2", logo: "/logos/gold2.png" },
        //{ name: "Gold Sponsor 3", logo: "/logos/gold3.png" },
      ],
      silver: [
        { name: "Your Company Here!", logo: "/logos/silver1.png" },
        //{ name: "Silver Sponsor 2", logo: "/logos/silver2.png" },
        //{ name: "Silver Sponsor 3", logo: "/logos/silver3.png" },
        //{ name: "Silver Sponsor 4", logo: "/logos/silver4.png" },
      ],
      bronze: [
        { name: "Your Company Here!", logo: "/logos/bronze1.png" },
        //{ name: "Bronze Sponsor 2", logo: "/logos/bronze2.png" },
        //{ name: "Bronze Sponsor 3", logo: "/logos/bronze3.png" },
        //{ name: "Bronze Sponsor 4", logo: "/logos/bronze4.png" },
        //{ name: "Bronze Sponsor 5", logo: "/logos/bronze5.png" },
      ],
    };
  
    const tierStyles: Record<"platinum" | "gold" | "silver" | "bronze", string> = {
      platinum: "text-4xl text-secondaryblue font-extrabold",
      gold: "text-3xl text-yellow-500 font-bold",
      silver: "text-2xl text-gray-500 font-semibold",
      bronze: "text-xl text-orange-600 font-medium",
    };
  
    return (
        <section className="py-24 bg-primary-dark/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-mainblue mb-12">Our Sponsors</h2>
  
          {Object.entries(sponsors).map(([tier, sponsorsList]) => {
            const tierKey = tier as keyof typeof tierStyles;
            return (
              <div key={tier} className="mb-12">
                <h3 className={`mb-6 ${tierStyles[tierKey]}`}>
                  {tier.charAt(0).toUpperCase() + tier.slice(1)} Sponsors
                </h3>
  
                {/* Centered Sponsor Logos */}
                <div className="flex flex-wrap justify-center gap-8">
                  {sponsorsList.map((sponsor, i) => (
                    <div
                      key={i}
                      className="w-40 h-24 bg-background border border-primary-dark/20 rounded-lg flex items-center justify-center px-4 py-2"
                    >
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="max-h-16 max-w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
  
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  