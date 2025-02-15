export default function SponsorsSection() {
    return (
      <section className="py-24 bg-primary-dark/5">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-mainblue mb-12">Our Sponsors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-background border border-primary-dark/20 rounded-lg flex items-center justify-center"
              >
                <span className="text-foreground/40">Sponsor Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  