import { db } from './firebase'
import { doc, getDoc, updateDoc, serverTimestamp, increment } from 'firebase/firestore'

export type Guest = {
  token: string
  name: string
  group: string
  opens: number
  status?: 'Yes'|'Maybe'|'No'
  adults?: number
  kids?: number
  notes?: string
  editCount?: number
  updatedAt?: any
  groupId?: string | null
}

export async function loadGuest(token: string){
  const ref = doc(db, 'guests', token)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  // Increment opens (non-blocking)
  updateDoc(ref, { opens: increment(1), updatedAt: serverTimestamp() }).catch(()=>{})
  return { token, ...(snap.data() as any) } as Guest
}

export async function saveGuest(token: string, partial: Partial<Guest>){
  const ref = doc(db, 'guests', token)
  const snap = await getDoc(ref)
  if (!snap.exists()) throw new Error('Invalid link')

  const g = snap.data() as Guest
  const nextEditCount = (g.editCount ?? 0) + 1
  if (nextEditCount > 3) throw new Error('Edit limit reached (max 3).')

  await updateDoc(ref, {
    status: partial.status ?? g.status ?? '',
    adults: partial.adults ?? g.adults ?? 0,
    kids: partial.kids ?? g.kids ?? 0,
    notes: partial.notes ?? g.notes ?? '',
    editCount: nextEditCount,
    updatedAt: serverTimestamp(),
  } as any)
}
