
import { useEffect, useMemo, useState } from 'react'

// In production, replace with your backend/Firebase calls.
// This page auto-prefills name & group from the token (e.g., ?t=<token>).
type Guest = { token:string; name:string; group:string; opens:number; status?:'Yes'|'Maybe'|'No'; adults?:number; kids?:number; notes?:string }
const MEMORY: Record<string, Guest> = {
  'abc123': { token:'abc123', name:'Priscilla Duro', group:'Duro Family', opens:0 },
  'xyz789': { token:'xyz789', name:'Oluwatomisin N.', group:'Nwanchi Family', opens:0 },
}

function useQuery(){ return useMemo(()=> new URLSearchParams(location.search),[]) }

export default function RSVP(){
  const q = useQuery()
  const token = q.get('t') || ''
  const [okMsg, setOkMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(true)
  const [guest, setGuest] = useState<Guest | null>(null)

  useEffect(()=>{
    const g = token ? MEMORY[token] : undefined
    if(!g){ setErrMsg('This link is missing or invalid.'); setLoading(false); return }
    g.opens += 1
    setGuest({...g})
    setLoading(false)
  }, [token])

  async function onSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault()
    setOkMsg(''); setErrMsg('')
    if(!guest){ setErrMsg('No guest loaded.'); return }
    try{
      // Simulate save
      await new Promise(r=> setTimeout(r, 400))
      setOkMsg('Saved! We’ve recorded your response.')
    }catch(e:any){
      setErrMsg(e?.message || 'Unable to save right now.')
    }
  }

  if(loading) return <div className="max-w-3xl mx-auto px-4 py-10">Loading…</div>
  if(!guest) return <div className="max-w-3xl mx-auto px-4 py-10 text-red-300">Invalid or missing token.</div>

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <div className="card">
        <h2 className="text-2xl font-bold">RSVP</h2>
        <p className="opacity-80 text-sm mt-1">Please confirm your attendance by <b>Dec 31, 2025</b>.</p>

        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm mb-1" htmlFor="name">Name</label>
            <input id="name" value={guest.name} readOnly className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="group">Group</label>
            <input id="group" value={guest.group} readOnly className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="status">Attendance</label>
            <select id="status" required className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2"
              onChange={e=> setGuest({...guest, status: e.target.value as any})} value={guest.status || ''}>
              <option value="">Choose…</option>
              <option value="Yes">Yes – I’m in!</option>
              <option value="Maybe">Maybe – deciding</option>
              <option value="No">No – can’t make it</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm mb-1" htmlFor="adults">Adults</label>
              <input id="adults" type="number" min="0" value={guest.adults ?? 0}
                onChange={e=> setGuest({...guest, adults: Number(e.target.value || 0)})}
                className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm mb-1" htmlFor="kids">Kids</label>
              <input id="kids" type="number" min="0" value={guest.kids ?? 0}
                onChange={e=> setGuest({...guest, kids: Number(e.target.value || 0)})}
                className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="notes">Notes</label>
            <textarea id="notes" rows={3} placeholder="Allergies, room pref, etc."
              onChange={e=> setGuest({...guest, notes: e.target.value})}
              className="w-full rounded-md bg-[#072017] border border-[rgba(231,214,161,.25)] px-3 py-2">{guest.notes || ''}</textarea>
          </div>

          <div className="text-xs opacity-75">Opens recorded: <b>{guest.opens}</b></div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg px-4 py-2 bg-forest text-white border border-[rgba(231,214,161,.35)]">Save</button>
            {okMsg && <span className="text-green-300">{okMsg}</span>}
            {errMsg && <span className="text-red-300">{errMsg}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
