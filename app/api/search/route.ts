import { NextRequest, NextResponse } from "next/server"
import { searchMulti } from "@/lib/tmdb"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query || query.trim().length === 0) {
    return NextResponse.json({ results: [] })
  }

  try {
    const results = await searchMulti(query)
    return NextResponse.json({ results })
  } catch {
    return NextResponse.json({ results: [], error: "Failed to search" }, { status: 500 })
  }
}
