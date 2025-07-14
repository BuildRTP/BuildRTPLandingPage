import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, MapPin, Users, Trophy, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LaunchUPPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-mainblue to-secondaryblue py-24">
          <div className="container">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">LaunchUP</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                BuildRTP&apos;s Premier Pitch Competition
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Saturday, August 10th</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>2:00PM - 6:00PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>5310 S Alston Ave. STE210, Durham, NC 27713</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <section className="py-16">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-mainblue mb-6">What is LaunchUP?</h2>
                <p className="text-lg text-foreground/80 mb-6">
                  LaunchUP is BuildRTP&apos;s flagship pitch competition where high school students can bring their innovative ideas to life. Whether you&apos;re a solo entrepreneur or part of a team, this is your chance to present your vision to seed investors who serve as our judges and compete for thousands in prize money.
                </p>
                <p className="text-lg text-foreground/80">
                  Come with any idea - from tech startups to social impact initiatives. Our panel of seed investor judges with decades of experience will provide valuable feedback to help you refine your concept and take it to the next level. Winners gain direct access to investor support that will help push their company forward and turn their ideas into reality.
                </p>
              </div>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-orange" />
                      Prize Pool
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mainblue">Up to $5,000</p>
                    <p className="text-muted-foreground">Cash prizes across multiple categories</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-orange" />
                      Investor Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-mainblue">Direct Investor Support</p>
                    <p className="text-muted-foreground">Seed investors help push your company forward</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-orange" />
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
              <h2 className="text-3xl font-bold text-mainblue mb-8 text-center">Event Schedule</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>2:00 PM - 2:30 PM</CardTitle>
                    <CardDescription>Registration & Networking</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Check in, meet other participants, and enjoy refreshments while preparing for your pitch.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>2:30 PM - 5:00 PM</CardTitle>
                    <CardDescription>Pitch Presentations</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Present your ideas to our panel of seed investor judges. Each team gets dedicated time to showcase their vision.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>5:30 PM - 6:00 PM</CardTitle>
                    <CardDescription>Judging & Awards</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Seed investor judges deliberate while participants network. Winners announced and prizes awarded!</p>
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
                Don&apos;t miss this opportunity to showcase your innovation, receive feedback from seed investors, compete for up to $5,000 in prizes, and gain direct investor support to push your company forward. Registration is free and open to all high school students.
              </p>
              <Button size="lg" className="bg-orange hover:bg-secondaryblue text-white text-lg px-8 py-4">
                <Link href="https://tally.so/r/w40ZJk" target="_blank" rel="noopener noreferrer">
                  Register for LaunchUP
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
