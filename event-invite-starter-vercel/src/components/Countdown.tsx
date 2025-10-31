
import { useEffect, useState } from 'react'

function pad(n:number){ return n.toString().padStart(2,'0') }

export default function Countdown({ targetISO }:{ targetISO:string }){
  const [now, setNow] = useState(Date.now())
  useEffect(()=>{
    const t = setInterval(()=> setNow(Date.now()), 1000)
    return ()=> clearInterval(t)
  },[])

  const target = new Date(targetISO).getTime()
  const diff = Math.max(0, target - now)

  const days  = Math.floor(diff / (1000*60*60*24))
  const hours = Math.floor((diff / (1000*60*60)) % 24)
  const mins  = Math.floor((diff / (1000*60)) % 60)
  const secs  = Math.floor((diff / 1000) % 60)

  return (
    <section aria-labelledby="countdownTitle" className="max-w-5xl mx-auto px-4 py-8">
      <h2 id="countdownTitle" className="text-2xl font-bold">Countdown</h2>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        {[
          {label:'Days', value: days.toString()},
          {label:'Hours', value: pad(hours)},
          {label:'Minutes', value: pad(mins)},
          {label:'Seconds', value: pad(secs)},
        ].map(it => (
          <div key={it.label} className="card min-w-[84px] text-center">
            <div className="text-3xl font-black text-mint">{it.value}</div>
            <div className="text-[12px] uppercase tracking-wider opacity-80">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
