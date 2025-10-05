import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, MapPin, Users, Trophy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LaunchUP Accelerator - BuildRTP",
  description: "RTP's First Student Startup Accelerator. Join us Nov 2nd - Dec 14th for mentorship, investor support, and up to $5,000 in prizes. Open to all high school students.",
  openGraph: {
    title: "LaunchUP Accelerator - BuildRTP",
    description: "RTP's First Student Startup Accelerator. Join us Nov 2nd - Dec 14th for mentorship, investor support, and up to $5,000 in prizes. Open to all high school students.",
    url: "https://buildrtp.org/launchup",
    siteName: "BuildRTP",
    images: [
      {
        url: "/buildrtplogov2.jpg",
        width: 1200,
        height: 630,
        alt: "BuildRTP LaunchUP Accelerator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchUP Accelerator - BuildRTP",
    description: "RTP's First Student Startup Accelerator. Join us Nov 2nd - Dec 14th for mentorship, investor support, and up to $5,000 in prizes.",
    images: ["/buildrtplogov2.jpg"],
  },
}

export default function LaunchUPPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-mainblue to-secondaryblue py-24">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">LaunchUP Accelerator</h1>
              <p className="text-2xl md:text-3xl mb-4 opacity-90">
                RTP&apos;s First Student Startup Accelerator
              </p>
              <p className="text-lg md:text-xl mb-8 opacity-90">
                In collaboration with <a href="https://launchchapelhill.com" className="underline text-white">Launch Chapel Hill</a> and <a href="https://innovate.unc.edu" className="underline text-white">Innovate Carolina</a>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Nov 2nd - Dec 14th</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>Monday 6:30PM - 8:30PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>5310 S Alston Ave. STE210, Durham, NC 27713</span>
                </div>
              </div>
              <Button size="lg" className="bg-orange hover:bg-secondaryblue text-white text-lg py-6 mt-4">
                <Link href="https://airtable.com/app9rUWmeWG5sKQ0b/pagKaOdp2kRagqDp7/form" target="_blank" rel="noopener noreferrer">
                  Register for LaunchUP!
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-mainblue mb-6">What is the LaunchUP Accelerator?</h2>
                <p className="text-lg text-foreground/80 mb-6">
                  The LaunchUP Accelerator is BuildRTP&apos;s flagship startup accelerator program where high school students can bring their innovative ideas to life. Whether you&apos;re a solo entrepreneur or part of a team, this is your chance to develop your vision with the help of mentors and seed investors who will provide valuable feedback and support.
                </p>
                <p className="text-lg text-foreground/80 mb-6">
                  Come in with any idea - from tech startups to social impact initiatives. Our team of mentors and investors that have been in your shoes before will provide valuable feedback to help you refine your concept and take it to the next level. Winners gain direct access to investor support that will help push their company forward and turn their ideas into reality.
                </p>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-orange" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mainblue">Nov 3rd - Dec 12th</p>
                    <p className="text-muted-foreground">Every Monday from 6:30PM - 8:30PM with a concluding demo day on Dec 14th</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange" />
                      Mentors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mainblue">Direct Support</p>
                    <p className="text-muted-foreground">RTP's best and brightest that have been in your shoes before</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange" />
                      Team Size
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mainblue">1-4 People</p>
                    <p className="text-muted-foreground">Solo or team participation welcome</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Event Schedule */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-mainblue mb-8 text-center">Accelerator Schedule</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>November 3rd</CardTitle>
                    <CardDescription>Introductions and Exploration into Entrepreneurship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Check in, meet other participants, and enjoy refreshments while exploring entrepreneurship.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>November 10th</CardTitle>
                    <CardDescription>Idea Validation and Refinement</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Present your ideas to our panel of mentors. Each team gets dedicated time to showcase their vision.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>November 17th</CardTitle>
                    <CardDescription>Product Development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Develop your product and get feedback from our mentors.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>November 24th</CardTitle>
                    <CardDescription>Product Development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Develop your product and get feedback from our mentors.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>December 1st</CardTitle>
                    <CardDescription>Product Development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Develop your product and get feedback from our mentors.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>December 8th</CardTitle>
                    <CardDescription>Product Development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Develop your product and get feedback from our mentors.</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Location Details */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-mainblue mb-8 text-center">Event Location</h2>
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange" />
                    BuildRTP Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg mb-4">5310 S Alston Ave. STE 200, Durham, NC 27713</p>
                  <p className="text-muted-foreground mb-4">
                    Located in the heart of Research Triangle Park, our office provides the perfect environment for innovation and collaboration.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Parking is available on-site. The building is accessible and we&apos;ll have clear signage to guide you to our suite.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-mainblue mb-6">Ready to Launch Your Idea?</h2>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Don&apos;t miss this opportunity to showcase your innovation, receive feedback from mentors, compete for investment, and gain direct professional support to push your company forward. Registration is free and open to all high school students.
              </p>
              <Button size="lg" className="bg-orange hover:bg-secondaryblue text-white text-lg px-8 py-4">
                <Link href="https://airtable.com/app9rUWmeWG5sKQ0b/pagKaOdp2kRagqDp7/form" target="_blank" rel="noopener noreferrer">
                  Register for LaunchUP!
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
