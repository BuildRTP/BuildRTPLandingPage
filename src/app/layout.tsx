import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700'], 
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: "BuildRTP",
  description: "RTP's first Student-Driven Space to Build your Passions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className}  antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
