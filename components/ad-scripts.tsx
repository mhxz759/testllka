"use client"

import { useEffect } from "react"

export function AdScripts() {
  useEffect(() => {
    // Zone 10610182 - nap5k.com
    const s1 = document.createElement("script")
    s1.dataset.zone = "10610182"
    s1.src = "https://nap5k.com/tag.min.js"
    document.body.appendChild(s1)

    // Zone 10610188 - gizokraijaw.net vignette
    const s2 = document.createElement("script")
    s2.dataset.zone = "10610188"
    s2.src = "https://gizokraijaw.net/vignette.min.js"
    document.body.appendChild(s2)

    return () => {
      s1.remove()
      s2.remove()
    }
  }, [])

  return null
}
