import { PrismaClient } from '@prisma/client'

type Invite = {
  id: string
  title: string
  slug: string
  hostName?: string
  startAt: string
  endAt?: string
  venue?: string
  description?: string
  primaryColor?: string
  accentColor?: string
  font?: string
  coverImageUrl?: string
  guestFields?: string[]
  theme?: string
  createdAt: string
  updatedAt: string
}
type Guest = {
  id: string; name: string; email?: string; phone?: string; dietary?: string; arrivalDate?: string; group?: string; inviteId: string
}
type RSVP = { id: string; status: string; notes?: string; createdAt: string; guestId: string }

function cuid() { return 'id_' + Math.random().toString(36).slice(2) + Date.now().toString(36) }
function nowISO() { return new Date().toISOString() }

export const isDbEnabled = !!process.env.DATABASE_URL
export const prisma = isDbEnabled ? new PrismaClient() : null

const memory = {
  invites: [] as Invite[],
  guests: [] as Guest[],
  rsvps: [] as RSVP[],
}

if (!isDbEnabled) {
  const inviteId = cuid()
  const slug = 'sample-birthday'
  memory.invites.push({
    id: inviteId,
    title: '40th Birthday in Cancun',
    slug,
    hostName: 'Priscilla',
    startAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    venue: 'Moon Palace, Cancun',
    description: 'A week of sun, good food, and great company. RSVP below!',
    primaryColor: '#0b0b0f',
    accentColor: '#f59e0b',
    font: 'playfair',
    coverImageUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop',
    guestFields: ['name','email','group','phone','dietary','arrivalDate','notes'],
    theme: 'Gold & Black',
    createdAt: nowISO(),
    updatedAt: nowISO(),
  })
  const g1 = { id: cuid(), name: 'Group Alpha', group: 'Alpha', inviteId }
  const g2 = { id: cuid(), name: 'Group Beta', group: 'Beta', inviteId }
  memory.guests.push(g1 as any, g2 as any)
}

export const repo = {
  async listInvites() {
    if (isDbEnabled && prisma) {
      return prisma.invite.findMany({ orderBy: { createdAt: 'desc' } })
    }
    return memory.invites.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  },

async createInvite(data: any) {
  if (isDbEnabled && prisma) {
    const { startAt, endAt, guestFields, ...rest } = data as any
    return prisma.invite.create({
      data: {
        ...rest,
        startAt: new Date(startAt),
        endAt: endAt ? new Date(endAt) : undefined,
        guestFields: guestFields ? (guestFields as any) : undefined,
      },
    })
  }

  // Strip potentially duplicated keys coming from the API
  const { id: _id, createdAt: _c, updatedAt: _u, ...safe } = data || {}
  const inv = {
    id: cuid(),
    createdAt: nowISO(),
    updatedAt: nowISO(),
    ...safe,
  } as Invite
  memory.invites.push(inv as any)
  return inv
},

    const inv = { id: cuid(), createdAt: nowISO(), updatedAt: nowISO(), ...data }
    memory.invites.push(inv as any)
    return inv
  },

  async getInviteBySlug(slug: string) {
    if (isDbEnabled && prisma) {
      return prisma.invite.findUnique({ where: { slug }, include: { guests: true } })
    }
    const inv = memory.invites.find(i => i.slug === slug)
    const guests = memory.guests.filter(g => g.inviteId === inv?.id)
    return inv ? { ...inv, guests } : null
  },

  async addGuest(inviteId: string, payload: Partial<Guest>) {
    if (isDbEnabled && prisma) {
      return prisma.guest.create({ data: { inviteId, ...payload } as any })
    }
    const guest = { id: cuid(), inviteId, ...payload } as Guest
    memory.guests.push(guest)
    return guest
  },

  async createRSVP(guestId: string, status: string, notes?: string) {
    if (isDbEnabled && prisma) {
      return prisma.rSVP.create({ data: { guestId, status, notes } })
    }
    const rsvp = { id: cuid(), guestId, status, notes, createdAt: nowISO() }
    memory.rsvps.push(rsvp)
    return rsvp
  },

  async listGroupsByInviteSlug(slug: string) {
    const invite = await this.getInviteBySlug(slug) as any
    if (!invite) return []
    const set = new Set<string>()
    ;(invite.guests || []).forEach((g: any) => { if (g.group) set.add(g.group) })
    return Array.from(set)
  }
}
