'use client'

import { useMemo, useState } from 'react'

type FieldKey = 'name' | 'email' | 'group' | 'phone' | 'dietary' | 'arrivalDate' | 'notes'

export default function RSVPForm({ inviteId, guestFields }: { inviteId: string; guestFields: FieldKey[] }) {
  const fields = useMemo(() => new Set<FieldKey>(guestFields), [guestFields])

  // State for all potential fields
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [group, setGroup] = useState('')
  const [phone, setPhone] = useState('')
  const [dietary, setDietary] = useState('')
  const [arrivalDate, setArrivalDate] = useState('')
  const [status, setStatus] = useState<'going' | 'not_going' | 'maybe'>('going')
  const [notes, setNotes] = useState('')
  const [done, setDone] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      const r = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inviteId,
          name, email, group, phone, dietary, arrivalDate,
          status, notes
        }),
      })
      if (!r.ok) throw new Error('Failed')
      setDone('RSVP saved. Thank you!')
      setName(''); setEmail(''); setGroup(''); setPhone(''); setDietary(''); setArrivalDate(''); setStatus('going'); setNotes('')
    } catch (e) {
      setDone('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="card space-y-3">
      {fields.has('name') && (
        <div>
          <label className="label">Name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} required />
        </div>
      )}
      {fields.has('email') && (
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
      )}
      {fields.has('group') && (
        <div>
          <label className="label">Group (for "Who’s coming")</label>
          <input className="input" value={group} onChange={e=>setGroup(e.target.value)} placeholder="e.g. Alpha" />
        </div>
      )}
      {fields.has('phone') && (
        <div>
          <label className="label">Phone</label>
          <input className="input" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 ..." />
        </div>
      )}
      {fields.has('dietary') && (
        <div>
          <label className="label">Dietary Needs</label>
          <input className="input" value={dietary} onChange={e=>setDietary(e.target.value)} placeholder="e.g. vegetarian, allergies" />
        </div>
      )}
      {fields.has('arrivalDate') && (
        <div>
          <label className="label">Arrival Date</label>
          <input className="input" type="date" value={arrivalDate} onChange={e=>setArrivalDate(e.target.value)} />
        </div>
      )}
      <div>
        <label className="label">Status</label>
        <select className="input" value={status} onChange={e=>setStatus(e.target.value as any)}>
          <option value="going">Going</option>
          <option value="maybe">Maybe</option>
          <option value="not_going">Not going</option>
        </select>
      </div>
      {fields.has('notes') && (
        <div>
          <label className="label">Notes</label>
          <textarea className="input" rows={3} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Diet, arrival time, etc." />
        </div>
      )}
      <button className="btn" disabled={loading}>{loading ? 'Saving…' : 'Submit RSVP'}</button>
      {done && <p className="text-sm opacity-80">{done}</p>}
    </form>
  )
}
