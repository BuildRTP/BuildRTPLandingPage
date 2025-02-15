import Link from "next/link"
import { Github, Instagram, Linkedin, Mail } from "lucide-react"  

export default function Footer() {
  return (
    <footer className="bg-mainblue text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">BuildRTP</h3>
            <p className="text-background/80">RTP&apos;s First Student-Focused Space to Build your Passions</p>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <h3 className="text-xl font-bold">Connect With Us</h3>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-secondary transition-colors">
                <Instagram className="w-6 h-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Linkedin className="w-6 h-6" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-secondary transition-colors">
                <Github className="w-6 h-6" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="mailto:contact@buildrtp.com" className="hover:text-secondary transition-colors">
                <Mail className="w-6 h-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <p className="text-background/80">team@buildrtp.com</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

