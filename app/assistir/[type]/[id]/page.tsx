import { notFound } from "next/navigation"
import { Star, Calendar, Clock, Film } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { EmbedPlayer } from "@/components/embed-player"
import { SeasonSelector } from "@/components/season-selector"
import { getMovieDetails, getSeriesDetails, getImageUrl, getBackdropUrl } from "@/lib/tmdb"

interface WatchPageProps {
  params: Promise<{ type: string; id: string }>
  searchParams: Promise<{ t?: string; ep?: string }>
}

export default async function WatchPage({ params, searchParams }: WatchPageProps) {
  const { type, id } = await params
  const sp = await searchParams

  if (type !== "filme" && type !== "serie") {
    notFound()
  }

  let details
  try {
    if (type === "filme") {
      details = await getMovieDetails(id)
    } else {
      details = await getSeriesDetails(id)
    }
  } catch {
    notFound()
  }

  const title = details.title || details.name || "Sem titulo"
  const posterUrl = getImageUrl(details.poster_path, "w500")
  const backdropUrl = getBackdropUrl(details.backdrop_path)
  const releaseDate = details.release_date || details.first_air_date
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null

  const currentSeason = sp.t ? parseInt(sp.t) : 1
  const currentEpisode = sp.ep ? parseInt(sp.ep) : 1

  const validSeasons =
    details.seasons?.filter((s) => s.season_number > 0) || []

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {backdropUrl && (
        <div className="absolute inset-x-0 top-0 h-[50vh] opacity-20">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={backdropUrl} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-20 pb-16 md:px-8 md:pt-24">
        <div className="mb-8">
          <EmbedPlayer
            type={type}
            id={id}
            season={type === "serie" ? String(currentSeason) : undefined}
            episode={type === "serie" ? String(currentEpisode) : undefined}
          />
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          {posterUrl && (
            <div className="hidden flex-shrink-0 md:block">
              <div className="relative h-[360px] w-[240px] overflow-hidden rounded-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={posterUrl}
                  alt={title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col gap-4">
            <h1 className="text-2xl font-bold text-foreground md:text-4xl text-balance">
              {title}
            </h1>

            {details.tagline && (
              <p className="text-sm italic text-muted-foreground">{details.tagline}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {details.vote_average > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-foreground">{details.vote_average.toFixed(1)}</span>
                </div>
              )}
              {year && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{year}</span>
                </div>
              )}
              {details.runtime && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{details.runtime} min</span>
                </div>
              )}
              {details.number_of_seasons && (
                <div className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  <span>{details.number_of_seasons} temporada{details.number_of_seasons > 1 ? "s" : ""}</span>
                </div>
              )}
            </div>

            {details.genres && details.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {details.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-sm bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            {details.overview && (
              <p className="leading-relaxed text-foreground/80">{details.overview}</p>
            )}

            {type === "serie" && validSeasons.length > 0 && (
              <div className="mt-4 rounded-sm border border-border bg-card p-4">
                <SeasonSelector
                  seasons={validSeasons.map((s) => ({
                    season_number: s.season_number,
                    name: s.name,
                    episode_count: s.episode_count,
                  }))}
                  currentSeason={currentSeason}
                  currentEpisode={currentEpisode}
                  type={type}
                  id={id}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
