"use client"

interface EmbedPlayerProps {
  type: "filme" | "serie"
  id: string
  season?: string
  episode?: string
}

export function EmbedPlayer({ type, id, season, episode }: EmbedPlayerProps) {
  let url: string

  if (type === "filme") {
    url = `https://superflixapi.one/filme/${id}`
  } else {
    url = `https://superflixapi.one/serie/${id}/${season || "1"}/${episode || "1"}`
  }

  return (
    <div className="relative w-full overflow-hidden rounded-sm bg-secondary" style={{ aspectRatio: "16/9" }}>
      <iframe
        src={url}
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; encrypted-media; picture-in-picture"
        title="Player"
      />
    </div>
  )
}
