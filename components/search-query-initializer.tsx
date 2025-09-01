"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

interface SearchQueryInitializerProps {
  onQueryChange: (query: string) => void
}

export function SearchQueryInitializer({ onQueryChange }: SearchQueryInitializerProps) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const searchQuery = searchParams.get("q")
    if (searchQuery) {
      onQueryChange(searchQuery)
    }
  }, [searchParams, onQueryChange])

  return null
}