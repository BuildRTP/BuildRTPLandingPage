'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '../../components/header'

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
          BuildRTP Events
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mt-4 text-white/90">
          Here are all of the events we&apos;ve hosted in the past. Check out our upcoming events below! If you want to plan your own event, reach out to us at <a href="mailto:team@buildrtp.org" className="underline text-white">team@buildrtp.org</a>.
        </p>

        {/*
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
        */}
      </div>
    </section>
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
  {
    id: 'InnovateHER',
    title: 'InnovateHer',
    blurb: [
      "InnovateHer was BuildRTP's flagship hackathon focused on empowering girls in technology, where high school students bring their innovative ideas to life. Solo founders and teams hack to create a product in 24 hours.",
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
  {
    id: 'scrapyard-2024',
    title: 'Scrapyard',
    blurb: [
      "Scrapyard is BuildRTP's flagship hackathon where high school students bring their innovative ideas to life. Solo founders and teams hack to create a product in 24 hours.",
      'Ideas ranged from AI tools to social impact initiatives. Our panel of seed investor judges with decades of experience provided targeted feedback to help teams refine their concepts and level up.',
    ],
    images: [
        '/events/past/scrapyard-1.jpg',
      '/events/past/scrapyard-2.jpg',
      '/events/past/scrapyard-3.jpg',
      '/events/past/scrapyard-4.jpg',
      '/events/past/scrapyard-5.jpg',
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

/* =====================  PAGE  ===================== */

export default function EventsPage() {
  return (
    <>
      <Header />
      <HeroBanner />

      <div className="bg-[linear-gradient(180deg,rgba(15,23,42,0.03)_0%,rgba(15,23,42,0.00)_100%)]">
        <div className="pt-10 pb-16">
          <PastEventsShowcaseSection />
        </div>
      </div>
    </>
  )
}
