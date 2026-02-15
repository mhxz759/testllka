"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setQuery("")
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 transition-colors duration-300 md:px-8 ${
        scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="flex items-center gap-6">
        <Link href="/" className="text-2xl font-bold tracking-tight text-primary md:text-3xl">
          LYNXFLIX
        </Link>
        <nav className="hidden items-center gap-4 md:flex">
          <Link href="/" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Inicio
          </Link>
          <Link href="/buscar?q=anime" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Animes
          </Link>
          <Link href="/buscar?q=action" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Filmes
          </Link>
          <Link href="/buscar?q=series" className="text-sm text-foreground/80 transition-colors hover:text-foreground">
            Series
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        {searchOpen ? (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <div className="flex items-center gap-2 rounded-sm border border-foreground/30 bg-background/90 px-3 py-1.5">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar filmes, series, animes..."
                className="w-40 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground md:w-64"
              />
              <button type="button" onClick={() => { setSearchOpen(false); setQuery("") }}>
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="text-foreground/80 transition-colors hover:text-foreground"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  )
}
