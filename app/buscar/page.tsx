import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { SearchPageContent } from "./search-content"

export default function BuscarPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense>
        <SearchPageContent />
      </Suspense>
    </main>
  )
}
