"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface Season {
  season_number: number
  name: string
  episode_count: number
}

interface SeasonSelectorProps {
  seasons: Season[]
  currentSeason: number
  currentEpisode: number
  type: string
  id: string
}

export function SeasonSelector({
  seasons,
  currentSeason,
  currentEpisode,
  type,
  id,
}: SeasonSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const activeSeason = seasons.find((s) => s.season_number === currentSeason)
  const episodeCount = activeSeason?.episode_count || 1

  function handleSeasonChange(season: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("t", String(season))
    params.set("ep", "1")
    router.push(`/assistir/${type}/${id}?${params.toString()}`)
  }

  function handleEpisodeChange(episode: number) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("t", String(currentSeason))
    params.set("ep", String(episode))
    router.push(`/assistir/${type}/${id}?${params.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm font-medium text-foreground" htmlFor="season-select">Temporada:</label>
        <select
          id="season-select"
          value={currentSeason}
          onChange={(e) => handleSeasonChange(Number(e.target.value))}
          className="rounded-sm border border-border bg-secondary px-3 py-2 text-sm text-foreground outline-none focus:ring-1 focus:ring-primary"
        >
          {seasons.map((s) => (
            <option key={s.season_number} value={s.season_number}>
              {s.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Episodios:</p>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: episodeCount }, (_, i) => i + 1).map((ep) => (
            <button
              key={ep}
              onClick={() => handleEpisodeChange(ep)}
              className={`flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium transition-colors ${
                ep === currentEpisode
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {ep}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
