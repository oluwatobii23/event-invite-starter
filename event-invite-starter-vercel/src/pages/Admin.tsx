
import { useMemo } from 'react'

type Row = {
  name: string
  group: string
  adults: number
  kids: number
  openedAt: string
  opens: number
  response: 'Yes'|'Maybe'|'No'|''
}

export default function Admin(){
  // Example dataset — replace with real backend/Firebase reads
  const rows: Row[] = useMemo(()=> [
    { name:'Priscilla Duro', group:'Duro Family', adults:2, kids:2, openedAt:'2025-10-29 13:21', opens:3, response:'Yes' },
    { name:'Oluwatomisin N.', group:'Nwanchi Family', adults:1, kids:0, openedAt:'2025-10-29 16:02', opens:1, response:'Maybe' },
  ], [])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold">Admin</h2>
        <a className="text-sm link" href="/admin">Refresh</a>
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[rgba(231,214,161,.15)]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#0c231c]">
            <tr className="text-left">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Group</th>
              <th className="px-3 py-2">Adults</th>
              <th className="px-3 py-2">Kids</th>
              <th className="px-3 py-2">Date link opened</th>
              <th className="px-3 py-2">Times opened</th>
              <th className="px-3 py-2">Response</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i)=> (
              <tr key={i} className="odd:bg-[#0a1d17] even:bg-[#092016] border-t border-[rgba(231,214,161,.06)]">
                <td className="px-3 py-2">{r.name}</td>
                <td className="px-3 py-2">{r.group}</td>
                <td className="px-3 py-2">{r.adults}</td>
                <td className="px-3 py-2">{r.kids}</td>
                <td className="px-3 py-2 whitespace-nowrap">{r.openedAt}</td>
                <td className="px-3 py-2">{r.opens}</td>
                <td className="px-3 py-2">{r.response || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs opacity-75">Note: Each group appears once; rows refresh with latest values rather than duplicating entries.</p>
    </section>
  )
}
