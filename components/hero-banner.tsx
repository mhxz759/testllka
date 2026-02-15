import Link from "next/link"
import { Play, Info } from "lucide-react"
import { type TMDBMovie, getBackdropUrl } from "@/lib/tmdb"

interface HeroBannerProps {
  item: TMDBMovie
}

export function HeroBanner({ item }: HeroBannerProps) {
  const title = item.title || item.name || "Sem titulo"
  const type = item.media_type === "tv" || item.first_air_date ? "serie" : "filme"
  const backdropUrl = getBackdropUrl(item.backdrop_path)

  if (!backdropUrl) return null

  return (
    <section className="relative h-[70vh] w-full md:h-[85vh]">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={backdropUrl}
          alt={title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
      </div>
      <div className="absolute bottom-16 left-4 right-4 z-10 flex max-w-2xl flex-col gap-4 md:bottom-24 md:left-8">
        <h1 className="text-3xl font-bold text-foreground md:text-5xl lg:text-6xl text-balance">
          {title}
        </h1>
        {item.overview && (
          <p className="line-clamp-3 text-sm leading-relaxed text-foreground/80 md:text-base">
            {item.overview}
          </p>
        )}
        <div className="flex items-center gap-3">
          <Link
            href={`/assistir/${type}/${item.id}`}
            className="flex items-center gap-2 rounded-sm bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-opacity hover:opacity-80"
          >
            <Play className="h-5 w-5" fill="currentColor" />
            Assistir
          </Link>
          <Link
            href={`/assistir/${type}/${item.id}`}
            className="flex items-center gap-2 rounded-sm bg-foreground/20 px-5 py-2.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/30"
          >
            <Info className="h-5 w-5" />
            Mais Informacoes
          </Link>
        </div>
      </div>
    </section>
  )
}
