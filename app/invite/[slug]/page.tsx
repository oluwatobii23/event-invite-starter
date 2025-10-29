import { repo } from '@/lib/db'
import Countdown from '@/components/Countdown'
import RSVPForm from '@/components/RSVPForm'

export const dynamic = 'force-dynamic'

export default async function InvitePage({ params }: { params: { slug: string } }) {
  const data = await repo.getInviteBySlug(params.slug) as any
  if (!data) return <div className="card">Invite not found.</div>

  const start = new Date(data.startAt).toISOString()
  const groups = await repo.listGroupsByInviteSlug(params.slug)

  const styleVars: React.CSSProperties = {
    // CSS variables for theme
    // @ts-ignore
    '--primary': data.primaryColor || undefined,
    // @ts-ignore
    '--accent': data.accentColor || undefined,
    // @ts-ignore
    '--font-family': data.font === 'playfair' ? 'var(--font-playfair)' :
                     data.font === 'bebas' ? 'var(--font-bebas)' :
                     data.font === 'inter' ? 'var(--font-inter)' :
                     'var(--font-inter)',
  }

  return (
    <div className="space-y-8" style={styleVars as any}>
      {data.coverImageUrl && (
        <div className="overflow-hidden rounded-lg border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.coverImageUrl} alt={data.title} className="w-full h-56 object-cover" />
        </div>
      )}

      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-family)' }}>{data.title}</h1>
        {data.hostName && <p className="opacity-80">Hosted by <span className="accent font-medium">{data.hostName}</span></p>}
        {data.venue && <p className="opacity-80">{data.venue}</p>}
        <div className="mt-3">
          <Countdown target={start} />
        </div>
      </header>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="card">
            <h3 className="font-semibold mb-2">Details</h3>
            <p className="opacity-80 text-sm whitespace-pre-wrap">{data.description || 'No description provided.'}</p>
            {data.theme && <p className="opacity-80 text-sm mt-2"><span className="font-medium">Theme:</span> {data.theme}</p>}
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">Who’s coming (by group)</h3>
            {groups.length === 0 ? (
              <p className="opacity-80 text-sm">No groups yet. Ask guests to include their group when RSVPing.</p>
            ) : (
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {groups.map((g: string) => (
                  <li key={g} className="card text-center py-2">{g}</li>
                ))}
              </ul>
            )}
            <p className="opacity-60 text-xs mt-2">Each group appears only once even if multiple guests RSVP from the group.</p>
          </div>
        </div>

        <div className="space-y-4">
          <RSVPForm inviteId={data.id} guestFields={data.guestFields || ['name','email','group','notes']} />
        </div>
      </section>
    </div>
  )
}
