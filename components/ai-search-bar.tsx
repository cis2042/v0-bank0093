"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface AISearchBarProps {
  placeholder?: string
  className?: string
  showSuggestions?: boolean
}

export function AISearchBar({
  placeholder = "輸入問題，AI 為您即時解答...",
  className = "",
  showSuggestions = false,
}: AISearchBarProps) {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const suggestions = ["持分房屋 貸款成數", "外匯匯款 紐西蘭", "企網銀 錯誤代碼 5001", "AML 系統異常"]

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Navigate to search results
    router.push(`/search?q=${encodeURIComponent(query)}`)
    setIsLoading(false)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    router.push(`/search?q=${encodeURIComponent(suggestion)}`)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          <Search className="text-muted-foreground w-4 h-4" />
          <Sparkles className="text-primary w-3 h-3" />
        </div>
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-12 pr-20 h-12 text-base bg-muted/50 border-border focus:bg-background"
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
        >
          {isLoading ? "搜尋中..." : "搜尋"}
        </Button>
      </div>
      {showSuggestions && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">熱門搜尋：</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
