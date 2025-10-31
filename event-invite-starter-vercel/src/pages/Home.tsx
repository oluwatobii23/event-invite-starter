
import Countdown from '../components/Countdown'

export default function Home(){
  return (
    <div>
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="card">
          <h1 className="text-3xl font-display font-black text-mint">Jibo’s 40th — Sept 3–7</h1>
          <p className="mt-2 opacity-90">Moon Palace Grand · Cancún, Mexico</p>
          <p className="mt-4">Welcome! Use your personalized link to RSVP. If you don’t have one yet, contact the host.</p>
        </div>
      </section>
      <Countdown targetISO="2025-09-03T15:00:00-06:00" />
    </div>
  )
}
