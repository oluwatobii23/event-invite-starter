
import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h2 className="text-3xl font-bold mb-3">404</h2>
      <p className="opacity-80">That page doesn’t exist.</p>
      <p className="mt-4"><Link className="link" to="/">Go home</Link></p>
    </section>
  )
}
