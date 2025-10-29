'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-white/10 sticky top-0 backdrop-blur bg-black/20 z-30">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" className="font-semibold">GlowMap RSVP</Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="opacity-90 hover:opacity-100">Dashboard</Link>
          <a href="https://vercel.com/new" target="_blank" className="btn">Deploy</a>
        </div>
      </div>
    </nav>
  )
}
