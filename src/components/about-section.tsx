export default function AboutSection() {
    return (
      <section id="about" className="py-12 bg-background mt-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-mainblue mb-4">What is BuildRTP?</h2>
            </div>
            <div>
              <p className="text-lg text-foreground/70">
                BuildRTP is the first student-focused space in the Research Triangle Park area where any high schooler can come and work on anything they are passionate about. With an office space in RTP provided by our amazing sponsors, we aim to provide a community to support driven high schoolers with resources to help them succeed and impact their community positively.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  