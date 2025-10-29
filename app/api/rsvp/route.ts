import { NextResponse } from 'next/server'
import { repo } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.json()
  const { inviteId, name, email, group, phone, dietary, arrivalDate, status, notes } = body || {}
  if (!inviteId || !name || !status) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const guest = await repo.addGuest(inviteId, {
    name: String(name),
    email: email ? String(email) : undefined,
    group: group ? String(group) : undefined,
    phone: phone ? String(phone) : undefined,
    dietary: dietary ? String(dietary) : undefined,
    arrivalDate: arrivalDate ? new Date(arrivalDate).toISOString() as any : undefined,
  } as any)
  const rsvp = await repo.createRSVP(guest.id, String(status), notes ? String(notes) : undefined)
  return NextResponse.json({ ok: true, rsvp })
}
