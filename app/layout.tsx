import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import type { ReactNode } from 'react'
import { Inter, Playfair_Display, Bebas_Neue } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas' })

export const metadata = {
  title: 'GlowMap RSVP',
  description: 'Invite & RSVP starter, deploy-ready on Vercel.'
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${bebas.variable}`}>
      <body>
        <Navbar />
        <main className="container py-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
