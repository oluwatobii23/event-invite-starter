
export default function Footer(){
  return (
    <footer className="mt-10 border-t border-[rgba(231,214,161,.12)]">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-xs opacity-80">
        © {new Date().getFullYear()} Jibo’s 40 · Built with React + Vite · PWA ready
      </div>
    </footer>
  )
}
