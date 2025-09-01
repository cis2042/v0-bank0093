"use client"

import { useState } from "react"
import { Search, Bell, Users, BookOpen, AlertTriangle, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SidebarNav } from "@/components/sidebar-nav"
import { TopHeader } from "@/components/top-header"

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    // 模擬 AI 搜尋
    setTimeout(() => {
      setSearchResults([
        {
          type: "official",
          title: "持分房屋貸款成數規定",
          content: "根據最新授信規章，持分房屋貸款成數不得超過房屋鑑價之60%...",
          department: "授信部",
          lastUpdated: "2025-01-15",
          relevance: 95,
        },
        {
          type: "case",
          title: "持分房屋案件成功經驗分享",
          content: "處理類似案件時，建議補強財力證明文件，包括...",
          author: "資深授信專員 王小明",
          helpful: 23,
          relevance: 88,
        },
      ])
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <SidebarNav />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <TopHeader />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">歡迎回來，林信宏</h1>
            <p className="text-muted-foreground">今天是 2025年8月25日，讓我們開始高效的一天</p>
          </div>

          {/* AI Search Section */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">智慧知識搜尋</h2>
              <p className="text-gray-600">用白話文提問，立即獲得權威解答與實戰經驗</p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="flex space-x-2">
                <Input
                  placeholder="例如：持分房屋 貸款成數、匯款到紐西蘭、企網銀 5001..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="text-base"
                />
                <Button onClick={handleSearch} disabled={isSearching} className="bg-blue-600 hover:bg-blue-700">
                <Button onClick={handleSearch} disabled={isSearching} className="bg-red-600 hover:bg-red-700">
                  <Search className="w-4 h-4 mr-2" />
                  {isSearching ? "搜尋中..." : "搜尋"}
                </Button>
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-w-4xl mx-auto mt-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                      官方知識
                    </h3>
                    {searchResults
                      .filter((r) => r.type === "official")
                      .map((result, index) => (
                        <Card key={index} className="mb-4">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{result.title}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {result.relevance}% 相關
                              </Badge>
                            </div>
                            <CardDescription className="text-sm text-gray-600">
                              {result.department} • 更新於 {result.lastUpdated}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{result.content}</p>
                            <Button variant="link" className="p-0 h-auto text-blue-600 text-sm mt-2">
                              查看完整文件 →
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Users className="w-5 h-5 mr-2 text-green-600" />
                      實戰案例
                    </h3>
                    {searchResults
                      .filter((r) => r.type === "case")
                      .map((result, index) => (
                        <Card key={index} className="mb-4">
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base">{result.title}</CardTitle>
                              <Badge variant="outline" className="text-xs">
                                {result.relevance}% 相關
                              </Badge>
                            </div>
                            <CardDescription className="text-sm text-gray-600">
                              {result.author} • {result.helpful} 人認為有幫助
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-700">{result.content}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Button variant="link" className="p-0 h-auto text-green-600 text-sm">
                                查看完整案例 →
                              </Button>
                              <Button variant="ghost" size="sm" className="text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                有幫助
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Dashboard */}
          <Tabs defaultValue="dashboard" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard">儀表板</TabsTrigger>
              <TabsTrigger value="knowledge">{"業務交流"}</TabsTrigger>
              <TabsTrigger className="font-medium tracking-tighter" value="collaboration">
                {"群組討論"}
              </TabsTrigger>
              <TabsTrigger value="crisis">緊急公告</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">今日查詢次數</CardTitle>
                    <Search className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,247</div>
                    <p className="text-xs text-muted-foreground">+12% 較昨日</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">活躍協作群組</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <p className="text-xs text-muted-foreground">8 個新討論</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">知識庫文章</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,847</div>
                    <p className="text-xs text-muted-foreground">+15 篇本週新增</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">平均回應時間</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2.3秒</div>
                    <p className="text-xs text-muted-foreground">-0.5秒 較上週</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>我的常用知識</CardTitle>
                    <CardDescription>最近查看的重要文件</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { title: "授信案件審核標準", dept: "授信部", time: "2小時前" },
                      { title: "外匯匯款作業流程", dept: "存匯部", time: "1天前" },
                      { title: "AML系統操作手冊", dept: "法遵處", time: "2天前" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.dept}</p>
                        </div>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>最新討論</CardTitle>
                    <CardDescription>熱門話題與問答</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { title: "新版企網銀常見問題討論", replies: 12, time: "30分鐘前" },
                      { title: "持分房屋案件經驗分享", replies: 8, time: "1小時前" },
                      { title: "PEP客戶識別標準澄清", replies: 15, time: "3小時前" },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600">{item.replies} 則回覆</p>
                        </div>
                        <span className="text-xs text-gray-500">{item.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="knowledge">
              <Card>
                <CardHeader>
                  <CardTitle>知識中心</CardTitle>
                  <CardDescription>瀏覽和管理組織知識庫</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: "授信業務", count: 342, icon: "💼" },
                      { name: "存匯外匯", count: 256, icon: "💱" },
                      { name: "法規遵循", count: 189, icon: "⚖️" },
                      { name: "電子金融", count: 167, icon: "💻" },
                      { name: "風險管理", count: 134, icon: "🛡️" },
                      { name: "客戶服務", count: 98, icon: "🤝" },
                      { name: "作業流程", count: 445, icon: "📋" },
                      { name: "系統操作", count: 223, icon: "⚙️" },
                    ].map((category, index) => (
                      <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">{category.icon}</div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-600">{category.count} 篇文章</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="collaboration">
              <Card>
                <CardHeader>
                  <CardTitle>協作空間</CardTitle>
                  <CardDescription>參與討論群組和專案協作</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "授信新人訓練群組", members: 45, activity: "活躍", type: "公開" },
                      { name: "法遵政策討論", members: 23, activity: "中等", type: "限制" },
                      { name: "系統異常應變小組", members: 12, activity: "高度活躍", type: "私密" },
                      { name: "產品知識分享", members: 78, activity: "活躍", type: "公開" },
                    ].map((group, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-medium">{group.name}</h3>
                          <p className="text-sm text-gray-600">
                            {group.members} 位成員 • {group.activity}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              group.type === "公開" ? "default" : group.type === "限制" ? "secondary" : "outline"
                            }
                          >
                            {group.type}
                          </Badge>
                          <Button size="sm">加入</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="crisis">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
                    重大事件應變中心
                  </CardTitle>
                  <CardDescription>監控系統狀態並管理緊急事件</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Alert className="border-green-200 bg-green-50">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <AlertDescription className="text-green-800">所有關鍵系統運作正常</AlertDescription>
                      </div>
                    </Alert>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">系統監控</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {[
                            { name: "AML 系統", status: "正常", color: "green" },
                            { name: "核心銀行系統", status: "正常", color: "green" },
                            { name: "企業網銀", status: "正常", color: "green" },
                            { name: "行動銀行", status: "正常", color: "green" },
                          ].map((system, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{system.name}</span>
                              <div className="flex items-center">
                                <div className={`w-2 h-2 rounded-full mr-2 bg-${system.color}-500`}></div>
                                <span className="text-xs text-gray-600">{system.status}</span>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">應變工具</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            發布緊急公告
                          </Button>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <Users className="w-4 h-4 mr-2" />
                            建立應變頻道
                          </Button>
                          <Button className="w-full justify-start bg-transparent" variant="outline">
                            <Bell className="w-4 h-4 mr-2" />
                            通知相關人員
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
