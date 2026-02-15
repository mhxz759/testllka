import Link from "next/link"
import { Star } from "lucide-react"
import { type TMDBMovie, getImageUrl } from "@/lib/tmdb"

interface ContentCardProps {
  item: TMDBMovie
  type?: "filme" | "serie"
}

export function ContentCard({ item, type }: ContentCardProps) {
  const title = item.title || item.name || "Sem titulo"
  const posterUrl = getImageUrl(item.poster_path, "w342")
  const resolvedType =
    type || (item.media_type === "tv" || item.first_air_date ? "serie" : "filme")

  if (!posterUrl) return null

  return (
    <Link
      href={`/assistir/${resolvedType}/${item.id}`}
      className="group relative flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px]"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-sm bg-muted">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterUrl}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/20" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
          <p className="truncate text-xs font-medium text-foreground">{title}</p>
          {item.vote_average > 0 && (
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-primary text-primary" />
              <span className="text-xs text-foreground/80">
                {item.vote_average.toFixed(1)}
              </span>
            </div>
          )}
        </div>
      </div>
      <p className="mt-1.5 truncate text-xs text-foreground/70 md:text-sm">{title}</p>
    </Link>
  )
}
