export default function AboutSection() {
    return (
      <section id="about" className="py-24 bg-background mt-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-mainblue mb-4">What is BuildRTP?</h2>
            </div>
            <div>
              <p className="text-lg text-foreground/70">
                BuildRTP is the first student-focused space in the Research Triangle Park area where any high schooler can come and develop their passions. With an office space in RTP, we aim to provide a community to support driven high schoolers with resources to help them succeed and impact their community positively.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  