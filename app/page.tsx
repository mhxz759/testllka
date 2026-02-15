import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { ContentRow } from "@/components/content-row"
import {
  getTrending,
  getPopularMovies,
  getPopularAnime,
  getTopRatedAnime,
  getActionMovies,
  getComedyMovies,
  getTopRatedMovies,
  getPopularSeries,
  type TMDBMovie,
} from "@/lib/tmdb"

function RowSkeleton() {
  return (
    <section className="px-4 py-4 md:px-8">
      <div className="mb-3 h-6 w-48 animate-pulse rounded bg-muted" />
      <div className="flex gap-2 overflow-hidden md:gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="aspect-[2/3] w-[140px] flex-shrink-0 animate-pulse rounded-sm bg-muted md:w-[180px] lg:w-[200px]"
          />
        ))}
      </div>
    </section>
  )
}

function HeroBannerSkeleton() {
  return (
    <section className="relative h-[70vh] w-full animate-pulse bg-muted md:h-[85vh]" />
  )
}

async function HeroSection() {
  const trending = await getTrending()
  const heroItem = trending[0]
  if (!heroItem) return null
  return <HeroBanner item={heroItem} />
}

async function AsyncContentRow({
  title,
  fetcher,
  type,
}: {
  title: string
  fetcher: () => Promise<TMDBMovie[]>
  type?: "filme" | "serie"
}) {
  const items = await fetcher()
  return <ContentRow title={title} items={items} type={type} />
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={<HeroBannerSkeleton />}>
        <HeroSection />
      </Suspense>
      <div className="relative z-10 -mt-16 flex flex-col gap-2 pb-16">
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Em Alta" fetcher={getTrending} />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Animes Populares" fetcher={getPopularAnime} type="serie" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Animes Mais Bem Avaliados" fetcher={getTopRatedAnime} type="serie" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Filmes Populares" fetcher={getPopularMovies} type="filme" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Filmes de Acao" fetcher={getActionMovies} type="filme" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Comedias" fetcher={getComedyMovies} type="filme" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Mais Bem Avaliados" fetcher={getTopRatedMovies} type="filme" />
        </Suspense>
        <Suspense fallback={<RowSkeleton />}>
          <AsyncContentRow title="Series Populares" fetcher={getPopularSeries} type="serie" />
        </Suspense>
      </div>
    </main>
  )
}
