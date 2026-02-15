"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"
import { Search } from "lucide-react"
import { SearchResults } from "@/components/search-results"

export function SearchPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const q = searchParams.get("q") || ""
  const [input, setInput] = useState(q)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (input.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(input.trim())}`)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 md:px-8">
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Buscar filmes, series, animes..."
            className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
            autoFocus
          />
          <button
            type="submit"
            className="rounded-sm bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-80"
          >
            Buscar
          </button>
        </div>
      </form>

      {q && (
        <h1 className="mb-6 text-xl font-semibold text-foreground">
          {'Resultados para "'}{q}{'"'}
        </h1>
      )}

      <SearchResults query={q} />
    </div>
  )
}
