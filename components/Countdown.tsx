'use client'
import { useEffect, useMemo, useState } from 'react'

export default function Countdown({ target }: { target: string }) {
  const targetMs = useMemo(() => new Date(target).getTime(), [target])
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const diff = Math.max(0, targetMs - now)
  const sec = Math.floor(diff / 1000) % 60
  const min = Math.floor(diff / (1000*60)) % 60
  const hr = Math.floor(diff / (1000*60*60)) % 24
  const day = Math.floor(diff / (1000*60*60*24))

  return (
    <div className="grid grid-flow-col gap-3 auto-cols-max text-center">
      <TimeUnit label="Days" value={day} />
      <TimeUnit label="Hours" value={hr} />
      <TimeUnit label="Minutes" value={min} />
      <TimeUnit label="Seconds" value={sec} />
    </div>
  )
}

function TimeUnit({ label, value }: { label: string; value: number }) {
  return (
    <div className="card min-w-[80px]">
      <div className="text-2xl font-semibold">{String(value).padStart(2, '0')}</div>
      <div className="text-xs opacity-70">{label}</div>
    </div>
  )
}
