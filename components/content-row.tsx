"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { TMDBMovie } from "@/lib/tmdb"
import { ContentCard } from "./content-card"

interface ContentRowProps {
  title: string
  items: TMDBMovie[]
  type?: "filme" | "serie"
}

export function ContentRow({ title, items, type }: ContentRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.75
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  if (!items || items.length === 0) return null

  return (
    <section className="relative px-4 py-4 md:px-8">
      <h2 className="mb-3 text-lg font-semibold text-foreground md:text-xl">{title}</h2>
      <div className="group relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-0 z-10 hidden h-full items-center bg-background/60 px-2 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100"
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <div
          ref={scrollRef}
          className="scrollbar-hide flex gap-2 overflow-x-auto scroll-smooth md:gap-3"
        >
          {items.map((item) => (
            <ContentCard key={item.id} item={item} type={type} />
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-0 z-10 hidden h-full items-center bg-background/60 px-2 opacity-0 transition-opacity group-hover:flex group-hover:opacity-100"
          aria-label="Rolar para direita"
        >
          <ChevronRight className="h-6 w-6 text-foreground" />
        </button>
      </div>
    </section>
  )
}
