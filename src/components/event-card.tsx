import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface EventCard2Props {
  eventType?: string
  title?: string
  date?: string
  location?: string
  description?: string
  signupUrl?: string
}

export default function EventCard2({
  eventType = "Event Type",
  title = "Event Title",
  date = "Date",
  location = "Location",
  description = "Description",
  signupUrl = "#",
}: EventCard2Props = {}) {
  return (
    <section className="container relative z-10">
      <Card className="relative mx-auto max-w-2xl overflow-visible">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Left Side: Logistics */}
          <div className="space-y-4 p-6">
            <Badge variant="secondary" className="w-fit text-secondaryblue">
              {eventType}
            </Badge>
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold text-primary text-mainblue">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              <p className="text-sm text-bold text-muted-foreground">{date}</p>
              <p className="text-sm text-bold text-muted-foreground">{location}</p>
            </CardContent>
          </div>

          {/* Right Side: Description */}
          <div className="flex items-center border-t md:border-l md:border-t-0 border-border p-6">
            <CardDescription className="text-sm text-muted-foreground">{description}</CardDescription>
          </div>
        </div>

        {/* Signup Button */}
        <Link
          href="/launchup"
          className="absolute -right-4 top-1/2 -translate-y-1/2 md:-right-6"
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl bg-orange hover:bg-secondaryblue "
          >
            <ArrowRight className="h-6 w-6" />
            <span className="sr-only">Sign up for {title}</span>
          </Button>
        </Link>
      </Card>
    </section>
  )
}

