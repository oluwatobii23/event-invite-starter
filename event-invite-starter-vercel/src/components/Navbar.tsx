
import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="backdrop-blur sticky top-0 z-40 border-b border-[rgba(231,214,161,.12)] bg-[#071813]/60">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-mint">Jibo’s 40</Link>
        <nav className="flex gap-4 text-sm">
          <NavLink to="/" className={({isActive})=> isActive ? 'text-mint' : 'opacity-80 hover:opacity-100'}>Home</NavLink>
          <NavLink to="/rsvp" className={({isActive})=> isActive ? 'text-mint' : 'opacity-80 hover:opacity-100'}>RSVP</NavLink>
          <NavLink to="/admin" className={({isActive})=> isActive ? 'text-mint' : 'opacity-80 hover:opacity-100'}>Admin</NavLink>
        </nav>
      </div>
    </header>
  )
}
