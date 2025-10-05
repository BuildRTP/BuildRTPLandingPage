"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const yOffset = -80 // Adjust this value based on your header height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/buildrtplogov2.jpg"
              alt="BuildRTP Logo"
              width={120}
              height={120}
              className="w-auto h-8 sm:h-12"
            />
            <span className="text-xl font-bold text-black">
              Build<span className="text-mainblue">RTP</span>
            </span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-600 hover:text-mainblue transition-colors"
            >
              About
            </button>
            <Link
              href="/sponsors"
              className="text-gray-600 hover:text-mainblue transition-colors"
            >
              Sponsors
            </Link>
            <Link
              href="/events"
              className="text-gray-600 hover:text-mainblue transition-colors"
            >
              Events
            </Link>
            <Link
              href="/checkin"
              className="text-gray-600 hover:text-mainblue transition-colors"
            >
              Check-In
            </Link>
            <button
              onClick={() => scrollToSection("footer")}
              className="text-gray-600 hover:text-mainblue transition-colors"
            >
              Connect
            </button>
          </nav>
          <button className="md:hidden text-gray-600 hover:text-mainblue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
