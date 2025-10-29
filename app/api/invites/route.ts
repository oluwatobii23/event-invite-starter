import { NextResponse } from 'next/server'
import { repo } from '@/lib/db'

export async function GET() {
  const invites = await repo.listInvites()
  return NextResponse.json({ invites })
}

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.title || !body?.slug || !body?.startAt) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const inv = await repo.createInvite({
    title: String(body.title),
    slug: String(body.slug),
    startAt: String(body.startAt),
    endAt: body.endAt ? String(body.endAt) : undefined,
    venue: body.venue ? String(body.venue) : undefined,
    description: body.description ? String(body.description) : undefined,
    hostName: body.hostName ? String(body.hostName) : undefined,
    primaryColor: body.primaryColor ? String(body.primaryColor) : undefined,
    accentColor: body.accentColor ? String(body.accentColor) : undefined,
    font: body.font ? String(body.font) : undefined,
    coverImageUrl: body.coverImageUrl ? String(body.coverImageUrl) : undefined,
    guestFields: Array.isArray(body.guestFields) ? body.guestFields.map(String) : undefined,
    theme: body.theme ? String(body.theme) : undefined,
  } as any)

  return NextResponse.json({ invite: inv }, { status: 201 })
}
