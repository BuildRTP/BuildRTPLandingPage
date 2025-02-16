import { ArrowRight } from "lucide-react";

export default function HackathonCard() {
  return (
    <section className="container relative z-10 flex justify-center">
      <div className="w-full max-w-2xl mx-auto p-6 bg-primary/5 rounded-xl shadow-lg border border-primary-dark/20 flex flex-col md:flex-row items-center md:items-start relative">
        
        {/* Left Side: Logistics */}
        <div className="w-full md:w-1/2 pr-6 text-center md:text-left">
          <h1 className="text-2xl font-bold text-primary-dark mb-4">Scrapyard RTP</h1>
          <h2 className="text-foreground/70">March 16th - 8AM to 8PM</h2>
          <h2 className="text-foreground/70">5310 S Alston Ave. STE 200, Durham, NC 27713</h2>
        </div>

        {/* Divider Line */}
        <div className="hidden md:block w-px bg-primary-dark/20 h-full"></div>

        {/* Right Side: Event Description */}
        <div className="w-full md:w-1/2 pl-6 text-center md:text-left">
          <p className="text-foreground/70">
            Join us for 12 hours of building with workshops, free food, and cash prizes! Form teams of up to 3 people and try to create a stupid solution to a real world problem.
          </p>
        </div>
        <div className="px-0">
        {/* Signup Arrow Button */}
        <a 
          href="https://scrapyard.hackclub.com/rtp" 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute right-[-70px] top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition-transform duration-200 hover:scale-110 flex items-center justify-center"
        >
          <ArrowRight className="w-6 h-6" />
        </a>
        </div>
      </div>
    </section>
  );
}
