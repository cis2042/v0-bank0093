"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import SidebarNav from "@/components/SidebarNav"
import TopHeader from "@/components/TopHeader"
import SystemStatusBanner from "@/components/SystemStatusBanner"
import Card from "@/components/Card"
import CardContent from "@/components/CardContent"
import CardHeader from "@/components/CardHeader"
import CardTitle from "@/components/CardTitle"
import Button from "@/components/Button"
import Badge from "@/components/Badge"
import Separator from "@/components/Separator"
import { BookOpen, Users, Eye, ThumbsUp, ArrowRight, Filter, Star, MessageSquare } from "lucide-react"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || "持分房屋 貸款成數"
  const [sortBy, setSortBy] = useState("relevance")

  const [likedItems, setLikedItems] = useState<Set<string>>(new Set())
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set())
  const [bookmarkedItems, setBookmarkedItems] = useState<Set<string>>(new Set())
  const [itemLikes, setItemLikes] = useState<Record<string, number>>({})
  const [itemVotes, setItemVotes] = useState<Record<string, number>>({})

  const handleLike = (itemId: string, currentLikes: number) => {
    const isLiked = likedItems.has(itemId)
    const newLikedItems = new Set(likedItems)
    const newItemLikes = { ...itemLikes }

    if (isLiked) {
      newLikedItems.delete(itemId)
      newItemLikes[itemId] = (newItemLikes[itemId] || currentLikes) - 1
    } else {
      newLikedItems.add(itemId)
      newItemLikes[itemId] = (newItemLikes[itemId] || currentLikes) + 1
    }

    setLikedItems(newLikedItems)
    setItemLikes(newItemLikes)
  }

  const handleVote = (itemId: string, currentVotes: number) => {
    const isVoted = votedItems.has(itemId)
    const newVotedItems = new Set(votedItems)
    const newItemVotes = { ...itemVotes }

    if (isVoted) {
      newVotedItems.delete(itemId)
      newItemVotes[itemId] = (newItemVotes[itemId] || currentVotes) - 1
    } else {
      newVotedItems.add(itemId)
      newItemVotes[itemId] = (newItemVotes[itemId] || currentVotes) + 1
    }

    setVotedItems(newVotedItems)
    setItemVotes(newItemVotes)
  }

  const handleBookmark = (itemId: string) => {
    const newBookmarkedItems = new Set(bookmarkedItems)
    if (bookmarkedItems.has(itemId)) {
      newBookmarkedItems.delete(itemId)
    } else {
      newBookmarkedItems.add(itemId)
    }
    setBookmarkedItems(newBookmarkedItems)
  }

  const officialKnowledge = [
    {
      title: "持分房屋貸款成數規定",
      type: "規章",
      department: "授信部門",
      content:
        "根據本行最新規定，持分房屋作為擔保品時，貸款成數不得超過市價之60%。若持分比例低於1/2，則需額外提供其他擔保品或保證人...",
      views: 1247,
      likes: 89,
      updated: "2天前",
      relevance: 95,
      source: "內部規章 AR-2024-015",
    },
    {
      title: "不動產擔保品估價作業要點",
      type: "SOP",
      department: "授信部門",
      content:
        "不動產擔保品估價應依據市場行情、地段條件、建物狀況等因素綜合評估。持分房屋需特別注意共有人同意書及處分限制...",
      views: 892,
      likes: 67,
      updated: "1週前",
      relevance: 88,
      source: "作業手冊 SOP-CR-001",
    },
    {
      title: "房屋貸款審核標準程序",
      type: "SOP",
      department: "授信部門",
      content: "房屋貸款審核應確認借款人還款能力、擔保品價值、貸款成數合規性。特殊案件如持分房屋需提報主管核准...",
      views: 756,
      likes: 54,
      updated: "3天前",
      relevance: 82,
      source: "作業手冊 SOP-CR-002",
    },
  ]

  const practicalCases = [
    {
      title: "持分房屋貸款成功案例：補強財力證明策略",
      author: "資深授信專員 王大明",
      department: "授信部門",
      content:
        "客戶持有1/3持分房屋申請貸款，原本因持分比例過低被退件。後來透過提供定存單質押、增加保證人，成功核貸800萬...",
      views: 634,
      likes: 78,
      updated: "5天前",
      tags: ["持分房屋", "財力補強", "成功案例"],
      helpfulVotes: 45,
    },
    {
      title: "處理持分房屋共有人不同意問題的實戰經驗",
      author: "授信經理 李小華",
      department: "授信部門",
      content:
        "遇到共有人不願配合簽署同意書的情況，可透過法律諮詢、協調溝通、替代方案等方式處理。以下是我的實際處理經驗...",
      views: 445,
      likes: 32,
      updated: "1週前",
      tags: ["持分房屋", "共有人", "溝通技巧"],
      helpfulVotes: 28,
    },
    {
      title: "持分房屋估價爭議處理心得",
      author: "資深專員 陳志明",
      department: "授信部門",
      content: "客戶對持分房屋估價有異議時，如何與估價師溝通、提供補充資料、重新評估的完整流程分享...",
      views: 321,
      likes: 19,
      updated: "2週前",
      tags: ["持分房屋", "估價", "爭議處理"],
      helpfulVotes: 15,
    },
  ]

  const relatedQuestions = [
    "持分房屋可以貸款多少成數？",
    "共有人不同意時該怎麼辦？",
    "持分房屋需要哪些文件？",
    "如何提高持分房屋貸款成數？",
  ]

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <SystemStatusBanner />

          {/* Main Results Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Official Knowledge Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">官方知識</h2>
                <Badge variant="outline">權威文件</Badge>
              </div>

              {officialKnowledge.map((item, index) => {
                const itemId = `official-${index}`
                const currentLikes = itemLikes[itemId] ?? item.likes
                const isLiked = likedItems.has(itemId)
                const isBookmarked = bookmarkedItems.has(itemId)

                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{item.type}</Badge>
                            <span className="text-sm text-muted-foreground">{item.department}</span>
                            <div className="flex items-center gap-1 text-sm text-green-600">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {item.relevance}% 相關
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.content}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>來源：{item.source}</span>
                        <span>更新於 {item.updated}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="h-3 w-3" />
                            {currentLikes}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(itemId, item.likes)}
                            className={isLiked ? "text-blue-600" : ""}
                          >
                            <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(itemId)}
                            className={isBookmarked ? "text-amber-600" : ""}
                          >
                            <Star className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            查看完整內容
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Practical Cases Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-secondary" />
                <h2 className="text-lg font-semibold">實戰案例</h2>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                  同仁分享
                </Badge>
              </div>

              {practicalCases.map((item, index) => {
                const itemId = `case-${index}`
                const currentVotes = itemVotes[itemId] ?? item.helpfulVotes
                const isVoted = votedItems.has(itemId)
                const isBookmarked = bookmarkedItems.has(itemId)

                return (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Users className="h-3 w-3" />
                          {item.author}
                        </div>
                        <Separator orientation="vertical" className="h-4" />
                        <span className="text-sm text-muted-foreground">{item.department}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{item.content}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {item.views}
                          </span>
                          <span className="flex items-center gap-1 text-green-600">
                            <ThumbsUp className="h-3 w-3" />
                            {currentVotes} 有幫助
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVote(itemId, item.helpfulVotes)}
                            className={isVoted ? "text-green-600" : ""}
                          >
                            <ThumbsUp className={`w-4 h-4 ${isVoted ? "fill-current" : ""}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleBookmark(itemId)}
                            className={isBookmarked ? "text-amber-600" : ""}
                          >
                            <Star className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            查看完整案例
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Related Questions Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">相關問題</h2>
            <div className="space-y-4">
              {relatedQuestions.map((question, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
