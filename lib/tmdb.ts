const TMDB_API_KEY = "feecd96529202ee94267aeea28b2fb90"
const TMDB_BASE_URL = "https://api.themoviedb.org/3"

export interface TMDBMovie {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  genre_ids: number[]
  media_type?: string
}

export interface TMDBMovieDetail {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  genres: { id: number; name: string }[]
  runtime?: number
  number_of_seasons?: number
  number_of_episodes?: number
  seasons?: {
    id: number
    name: string
    season_number: number
    episode_count: number
    poster_path: string | null
  }[]
  tagline?: string
  status?: string
}

export interface TMDBResponse {
  results: TMDBMovie[]
  page: number
  total_pages: number
  total_results: number
}

async function tmdbFetch<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const searchParams = new URLSearchParams({
    api_key: TMDB_API_KEY,
    language: "pt-BR",
    ...params,
  })
  const res = await fetch(`${TMDB_BASE_URL}${endpoint}?${searchParams}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`TMDB API error: ${res.status}`)
  return res.json()
}

export async function getTrending(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/trending/all/week")
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getPopularMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/movie/popular")
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getPopularAnime(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/discover/tv", {
    with_genres: "16",
    with_original_language: "ja",
    sort_by: "popularity.desc",
  })
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getTopRatedAnime(): Promise<TMDBMovie[]> {
  const page1 = await tmdbFetch<TMDBResponse>("/discover/tv", {
    with_genres: "16",
    with_original_language: "ja",
    sort_by: "vote_average.desc",
    "vote_count.gte": "100",
    page: "1",
  })
  return page1.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getActionMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/discover/movie", {
    with_genres: "28",
    sort_by: "popularity.desc",
  })
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getComedyMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/discover/movie", {
    with_genres: "35",
    sort_by: "popularity.desc",
  })
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getTopRatedMovies(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/movie/top_rated")
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getPopularSeries(): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/tv/popular")
  return data.results.filter((i) => i.poster_path).slice(0, 14)
}

export async function getMovieDetails(id: string): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/movie/${id}`)
}

export async function getSeriesDetails(id: string): Promise<TMDBMovieDetail> {
  return tmdbFetch<TMDBMovieDetail>(`/tv/${id}`)
}

export async function searchMulti(query: string): Promise<TMDBMovie[]> {
  const data = await tmdbFetch<TMDBResponse>("/search/multi", { query })
  return data.results
    .filter((item) => item.media_type === "movie" || item.media_type === "tv")
    .slice(0, 20)
}

export function getImageUrl(path: string | null, size: string = "w500"): string {
  if (!path) return ""
  return `https://image.tmdb.org/t/p/${size}${path}`
}

export function getBackdropUrl(path: string | null): string {
  if (!path) return ""
  return `https://image.tmdb.org/t/p/original${path}`
}
