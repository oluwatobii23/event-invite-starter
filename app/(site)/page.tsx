import Link from 'next/link'

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-semibold">Launch event invites in minutes</h1>
        <p className="opacity-80">Create a beautiful invite page, collect RSVPs, show a countdown, and share who’s coming by group.</p>
        <div className="flex gap-3 justify-center">
          <Link href="/dashboard" className="btn">Open Dashboard</Link>
          <Link href="/invite/sample-birthday" className="btn">View Sample Invite</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="font-semibold mb-2">Simple</h3>
          <p className="opacity-80 text-sm">Minimal stack. Works without a DB for instant Vercel deploys.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Scalable</h3>
          <p className="opacity-80 text-sm">Enable Prisma + Postgres to persist guests, RSVPs, and more.</p>
        </div>
        <div className="card">
          <h3 className="font-semibold mb-2">Extensible</h3>
          <p className="opacity-80 text-sm">Add auth, payments, image uploads, and realtime chat later.</p>
        </div>
      </div>
    </div>
  )
}
