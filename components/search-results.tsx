"use client"

import useSWR from "swr"
import { TMDBMovie } from "@/lib/tmdb"
import { ContentCard } from "./content-card"
import { Loader2 } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const { data, isLoading } = useSWR<{ results: TMDBMovie[] }>(
    query ? `/api/search?q=${encodeURIComponent(query)}` : null,
    fetcher
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!data || data.results.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-lg text-muted-foreground">
          {query ? `Nenhum resultado encontrado para "${query}"` : "Digite algo para buscar"}
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.results.map((item) => (
        <ContentCard key={item.id} item={item} />
      ))}
    </div>
  )
}
