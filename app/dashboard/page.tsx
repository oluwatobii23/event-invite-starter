import Link from 'next/link'
import { repo } from '@/lib/db'
import { toSlug } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const invites = await repo.listInvites()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>

      <CreateInvite />

      <div className="grid gap-3">
        {invites.map((inv: any) => (
          <div key={inv.id} className="card flex items-center justify-between">
            <div>
              <div className="font-semibold">{inv.title}</div>
              <div className="text-sm opacity-70">/{inv.slug}</div>
            </div>
            <Link className="btn" href={`/invite/${inv.slug}`}>Open</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

async function createInvite(formData: FormData) {
  "use server"
  const title = String(formData.get('title') || 'New Invite')
  const startAt = String(formData.get('startAt') || new Date().toISOString())
  const venue = String(formData.get('venue') || '')
  const description = String(formData.get('description') || '')
  const hostName = String(formData.get('hostName') || '')
  const primaryColor = String(formData.get('primaryColor') || '')
  const accentColor = String(formData.get('accentColor') || '')
  const font = String(formData.get('font') || 'system')
  const coverImageUrl = String(formData.get('coverImageUrl') || '')
  const theme = String(formData.get('theme') || '')
  const guestFields = (formData.getAll('guestFields') as string[]) || []

  const slug = toSlug(title)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/invites`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, slug, startAt, venue, description, hostName, primaryColor, accentColor, font, coverImageUrl, theme, guestFields })
  })
  if (!res.ok) throw new Error('Failed to create invite')
}

function Checkbox({ id, label, defaultChecked=false }: { id: string; label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" name="guestFields" value={id} defaultChecked={defaultChecked} />
      <span>{label}</span>
    </label>
  )
}

function CreateInvite() {
  return (
    <form action={createInvite} className="card grid md:grid-cols-2 gap-3">
      <div>
        <label className="label">Title</label>
        <input className="input" name="title" placeholder="e.g. 40th Birthday in Cancun" required />
      </div>
      <div>
        <label className="label">Start Date & Time (ISO)</label>
        <input className="input" name="startAt" placeholder="2025-09-03T17:00:00Z" />
      </div>
      <div>
        <label className="label">Venue</label>
        <input className="input" name="venue" placeholder="Moon Palace, Cancun" />
      </div>
      <div>
        <label className="label">Host Name</label>
        <input className="input" name="hostName" placeholder="Priscilla" />
      </div>

      <div className="md:col-span-2">
        <label className="label">Description</label>
        <textarea className="input" name="description" rows={3} placeholder="Trip details, itinerary, notes..." />
      </div>

      <div className="md:col-span-2 border-t border-white/10 pt-3">
        <h3 className="font-semibold mb-2">Theme & Appearance</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="label">Primary Color</label>
            <input className="input" name="primaryColor" placeholder="#0b0b0f" />
          </div>
          <div>
            <label className="label">Accent Color</label>
            <input className="input" name="accentColor" placeholder="#f59e0b" />
          </div>
          <div>
            <label className="label">Font</label>
            <select className="input" name="font" defaultValue="system">
              <option value="system">System</option>
              <option value="inter">Inter</option>
              <option value="playfair">Playfair</option>
              <option value="bebas">Bebas Neue</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label className="label">Cover Image URL</label>
            <input className="input" name="coverImageUrl" placeholder="https://..." />
          </div>
          <div className="md:col-span-3">
            <label className="label">Theme (legacy / optional)</label>
            <input className="input" name="theme" placeholder="Gold & Black / Aso Ebi info" />
          </div>
        </div>
      </div>

      <div className="md:col-span-2 border-t border-white/10 pt-3">
        <h3 className="font-semibold mb-2">Guest Info to Collect</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          <Checkbox id="name" label="Name" defaultChecked />
          <Checkbox id="email" label="Email" defaultChecked />
          <Checkbox id="group" label="Group (for Who’s coming)" defaultChecked />
          <Checkbox id="phone" label="Phone" />
          <Checkbox id="dietary" label="Dietary Needs" />
          <Checkbox id="arrivalDate" label="Arrival Date" />
          <Checkbox id="notes" label="Notes" />
        </div>
        <p className="text-xs opacity-70 mt-2">Only checked fields will appear on the RSVP form.</p>
      </div>

      <button className="btn md:col-span-2">Create Invite</button>
    </form>
  )
}
