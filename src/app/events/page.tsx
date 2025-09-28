'use client'

import { Suspense, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../components/header'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Clock, MapPin, Users, Filter, ChevronRight } from 'lucide-react'

/* =====================  TYPES & SAMPLE DATA  ===================== */

export type EventTag = 'workshop' | 'pitch' | 'networking' | 'info' | 'social'

export type EventItem = {
  id: string
  title: string
  description: string
  date: string
  startTime?: string
  endTime?: string
  location: string
  tags: EventTag[]
  capacity?: number
  rsvps?: number
}

const SAMPLE_EVENTS: EventItem[] = [
  {
    id: 'evt-001',
    title: 'BuildRTP Kickoff & Founder Meet',
    description: 'Meet fellow builders, mentors, and learn how to plug into BuildRTP this season.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    startTime: '6:00 PM',
    endTime: '7:30 PM',
    location: 'HQ Atrium, RTP',
    tags: ['networking', 'info'],
    capacity: 60,
    rsvps: 42,
  },
  {
    id: 'evt-002',
    title: 'LaunchUP Pitch Practice',
    description: 'Rapid-fire 3-minute pitches with mentor feedback. Slides optional, demos encouraged.',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    startTime: '5:00 PM',
    endTime: '6:30 PM',
    location: 'Room B, HQ',
    tags: ['pitch', 'workshop'],
    capacity: 30,
    rsvps: 18,
  },
  {
    id: 'evt-003',
    title: 'After-Hours Builder Social',
    description: 'Casual hangout. Bring a project or just vibes. Snacks provided.',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    startTime: '7:00 PM',
    endTime: '9:00 PM',
    location: 'The Commons',
    tags: ['social'],
    capacity: 50,
    rsvps: 47,
  },
]

/* =====================  HERO  ===================== */

function HeroBanner() {
  return (
    <section className="relative w-full h-[68vh] md:h-[72vh] flex items-center justify-center text-white">
      <Image
        src="/events/hero-bg.jpg"
        alt="BuildRTP Events Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/70" />
      <div className="absolute -left-20 -top-24 rotate-6 w-[140%] h-32 bg-mainblue/20 blur-[2px]" />

      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
          BuildRTP Office Events
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mt-4 text-white/90">
          Connect, innovate, and build with entrepreneurs, innovators, and change-makers. See you there!
        </p>

        <div className="mt-6 flex justify-center gap-3 flex-wrap">
          <Link href="/subscribe">
            <Button size="lg" className="bg-mainblue hover:bg-blue-700 text-white shadow">
              Subscribe For Updates
            </Button>
          </Link>
          <a href="#events-list">
            <Button
              size="lg"
              variant="outline"
              className="bg-white/90 text-mainblue border-white hover:bg-white hover:text-blue-700"
            >
              Browse Events
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}

/* =====================  EVENT CARDS (moved above use)  ===================== */

function EventList({ items, emptyMessage }: { items: EventItem[]; emptyMessage: string }) {
  if (!items.length) {
    return (
      <Card className="shadow-sm">
        <CardContent className="py-12 text-center text-gray-500">{emptyMessage}</CardContent>
      </Card>
    )
  }

  return (
    <div className="container max-w-5xl">
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((e) => (
          <EventCard key={e.id} event={e} />
        ))}
      </div>
    </div>
  )
}

function EventCard({ event }: { event: EventItem }) {
  const date = new Date(event.date)
  const niceDate = date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card className="shadow-sm border-mainblue/10">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <span className="text-xl">{event.title}</span>
          <div className="flex gap-2 flex-wrap">
            {event.tags.map((t) => (
              <Badge key={t} className="capitalize bg-black text-white">
                {t}
              </Badge>
            ))}
          </div>
        </CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <CalendarDays className="w-4 h-4" /> {niceDate}
        </div>
        {(event.startTime || event.endTime) && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Clock className="w-4 h-4" />
            <span>
              {event.startTime}
              {event.endTime ? ` – ${event.endTime}` : ''}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin className="w-4 h-4" /> {event.location}
        </div>
        {(event.capacity || event.rsvps) && (
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Users className="w-4 h-4" />
            <span>
              {event.rsvps ?? 0}
              {event.capacity ? ` / ${event.capacity} spots` : ' RSVPs'}
            </span>
          </div>
        )}

        <div className="my-2 h-px w-full bg-gray-200" />

        <div className="flex gap-2">
          <Link href={`/events/${event.id}`}>
            <Button size="sm" className="gap-1 bg-mainblue hover:bg-blue-700 text-white">
              View Details <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href={`/checkin?type=event&id=${event.id}`}>
            <Button variant="outline" size="sm" className="gap-1 border-black text-black hover:bg-black/5">
              Event Check-In
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

/* =====================  PAST EVENTS – SHOWCASE  ===================== */

type PastEventShow = {
  id: string
  title: string
  blurb: string[]
  images: string[] // 5 images in /public
}

/** Only LaunchUP (Summer Social removed) */
const PAST_EVENTS_SHOWCASE: PastEventShow[] = [
  {
    id: 'launchup-2024',
    title: 'LaunchUP',
    blurb: [
      "LaunchUP is BuildRTP's flagship pitch competition where high school students bring their innovative ideas to life. Solo founders and teams pitch to seed investors who serve as judges and compete for thousands in prize money.",
      'Ideas ranged from AI tools to social impact initiatives. Our panel of seed investor judges with decades of experience provided targeted feedback to help teams refine their concepts and level up.',
    ],
    images: [
      '/events/past/launchup-1.jpg',
      '/events/past/launchup-2.jpg',
      '/events/past/launchup-3.jpg',
      '/events/past/launchup-4.jpg',
      '/events/past/launchup-5.jpg',
    ],
  },
]

function PastEventsShowcaseSection() {
  return (
    <section className="mt-16">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Past Events</h2>
          <div className="mx-auto mt-3 h-1 w-28 rounded-full bg-gradient-to-r from-mainblue via-orange-500 to-mainblue" />
        </div>

        <div className="space-y-16">
          {PAST_EVENTS_SHOWCASE.map((item, idx) => (
            <PastEventRow key={item.id} item={item} flip={idx % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function PastEventRow({ item, flip }: { item: PastEventShow; flip: boolean }) {
  return (
    <div className={`grid items-center gap-10 md:grid-cols-2 ${flip ? 'md:[&>*:first-child]:order-2' : ''}`}>
      {/* Left: text */}
      <div>
        <h3 className="text-4xl font-extrabold mb-4 text-mainblue">{item.title}</h3>
        <div className="space-y-4 text-gray-700 leading-relaxed">
          {item.blurb.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {/* Right: slider */}
      <div>
        <ShowcaseSlider images={item.images} />
      </div>
    </div>
  )
}

/** Brand-forward, accessible slider (arrows + numbered dots) */
function ShowcaseSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0)
  const total = images.length
  const go = (d: number) => setIdx((i) => (i + d + total) % total)

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
        <div className="relative aspect-video">
          <Image
            src={images[idx]}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 640px"
            priority={idx === 0}
          />
        </div>
        {/* top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/15 to-transparent rounded-t-2xl" />
      </div>

      {/* orange chevrons */}
      <button
        aria-label="Previous image"
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/95 text-orange-500 border border-black/5 shadow px-3 py-2 transition opacity-0 group-hover:opacity-100"
      >
        ‹
      </button>
      <button
        aria-label="Next image"
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/95 text-orange-500 border border-black/5 shadow px-3 py-2 transition opacity-0 group-hover:opacity-100"
      >
        ›
      </button>

      {/* numbered dots */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-7 min-w-7 px-2 rounded-full text-xs font-semibold shadow-sm transition
              ${i === idx ? 'bg-mainblue text-white' : 'bg-black/80 text-white/90 hover:bg-black'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

/* =====================  PAGE (Suspense around search params)  ===================== */

export default function EventsPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading events...</div>}>
      <EventsPageContent />
    </Suspense>
  )
}

function EventsPageContent() {
  const router = useRouter()
  const params = useSearchParams()
  const initialTab = (params.get('tab') || 'upcoming') as 'upcoming' | 'past'

  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>(initialTab)
  const [q, setQ] = useState('')
  const [activeTags, setActiveTags] = useState<EventTag[]>([])

  const now = new Date()
  const events = useMemo(() => {
    const filtered = SAMPLE_EVENTS.filter((e) => {
      const hay = (e.title + ' ' + e.description + ' ' + e.location).toLowerCase()
      const matchesQuery = q ? hay.includes(q.toLowerCase()) : true
      const matchesTags = activeTags.length ? activeTags.every((t) => e.tags.includes(t)) : true
      return matchesQuery && matchesTags
    })
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [q, activeTags])

  const upcoming = events.filter((e) => new Date(e.date) >= now)
  const past = events.filter((e) => new Date(e.date) < now)
  const tagOptions: EventTag[] = ['workshop', 'pitch', 'networking', 'info', 'social']

  const handleTab = (tab: 'upcoming' | 'past') => {
    setActiveTab(tab)
    const sp = new URLSearchParams(params.toString())
    sp.set('tab', tab)
    router.push(`/events?${sp.toString()}`)
  }

  return (
    <>
      <Header />
      <HeroBanner />

      <div className="bg-[linear-gradient(180deg,rgba(15,23,42,0.03)_0%,rgba(15,23,42,0.00)_100%)]">
        <div className="pt-10 pb-16">
          <div className="container max-w-5xl" id="events-list">
            <Card className="mb-8 border-mainblue/10 shadow-sm">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant={activeTab === 'upcoming' ? 'default' : 'outline'}
                      onClick={() => handleTab('upcoming')}
                      className={activeTab === 'upcoming' ? 'bg-mainblue' : ''}
                    >
                      Upcoming
                    </Button>
                    <Button
                      variant={activeTab === 'past' ? 'default' : 'outline'}
                      onClick={() => handleTab('past')}
                      className={activeTab === 'past' ? 'bg-mainblue' : ''}
                    >
                      Past
                    </Button>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Input
                      placeholder="Search events…"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="w-64"
                    />
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="flex items-center gap-1 bg-black/80 text-white">
                        <Filter className="w-3.5 h-3.5" /> Tags
                      </Badge>
                      {tagOptions.map((t) => {
                        const on = activeTags.includes(t)
                        return (
                          <Button
                            key={t}
                            size="sm"
                            variant={on ? 'default' : 'outline'}
                            onClick={() =>
                              setActiveTags((prev) => (on ? prev.filter((x) => x !== t) : [...prev, t]))
                            }
                            className={`capitalize ${on ? 'bg-mainblue' : ''}`}
                          >
                            {t}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {activeTab === 'upcoming' && (
              <EventList items={upcoming} emptyMessage="No upcoming events match your filters." />
            )}
            {activeTab === 'past' && (
              <EventList items={past} emptyMessage="No past events found with these filters." />
            )}
          </div>

          <PastEventsShowcaseSection />
        </div>
      </div>
    </>
  )
}
