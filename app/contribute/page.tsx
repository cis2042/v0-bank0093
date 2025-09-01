"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "your-tabs-component-library" // Import Tabs and TabsContent
import { Button } from "your-button-component-library" // Import Button
import { Card, CardContent } from "your-card-component-library" // Import Card and CardContent
import { ThumbsUp } from "your-icon-component-library" // Import ThumbsUp icon

const recentContributions = [
  { id: "1", likes: 10 },
  { id: "2", likes: 20 },
  // ... more contributions ...
] // Declare recentContributions variable

export default function ContributePage() {
  const [likedContributions, setLikedContributions] = useState<Set<string>>(new Set())
  const [contributionLikes, setContributionLikes] = useState<Record<string, number>>({})

  const handleLikeContribution = (contributionId: string, currentLikes: number) => {
    const isLiked = likedContributions.has(contributionId)
    const newLikedContributions = new Set(likedContributions)
    const newContributionLikes = { ...contributionLikes }

    if (isLiked) {
      newLikedContributions.delete(contributionId)
      newContributionLikes[contributionId] = (newContributionLikes[contributionId] || currentLikes) - 1
    } else {
      newLikedContributions.add(contributionId)
      newContributionLikes[contributionId] = (newContributionLikes[contributionId] || currentLikes) + 1
    }

    setLikedContributions(newLikedContributions)
    setContributionLikes(newContributionLikes)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Recent Contributions */}
      <Tabs defaultValue="recent">
        <TabsContent value="recent" className="space-y-4">
          {recentContributions.map((contribution) => {
            const currentLikes = contributionLikes[contribution.id] ?? contribution.likes
            const isLiked = likedContributions.has(contribution.id)

            return (
              <Card key={contribution.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {currentLikes} 讚
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeContribution(contribution.id, contribution.likes)}
                        className={isLiked ? "text-blue-600" : ""}
                      >
                        <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                      </Button>
                      <Button variant="outline" size="sm">
                        查看詳情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
