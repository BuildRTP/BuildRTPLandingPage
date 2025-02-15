import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container flex items-center py-4">
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/buildrtplogov2.jpg"
            alt="BuildRTP Logo"
            width={120}
            height={120}
            className="w-auto h-12"
          />
          <span className="text-xl font-bold text-black">Build<span className="text-mainblue">RTP</span></span>
        </Link>
      </div>
    </header>
  )
}
