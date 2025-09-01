"use client"

import { useState, useEffect } from "react"
import { CheckCircle, MessageCircle, Send, Users, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SystemStatusBannerProps {
  className?: string
}

export function SystemStatusBanner({ className }: SystemStatusBannerProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: "系統管理員", message: "歡迎使用方舟即時聊天室", time: "09:00", isSystem: true },
    { id: 2, user: "林信宏", message: "早安大家！", time: "09:15", isSystem: false },
    { id: 3, user: "陳靜宜", message: "今天系統運作很順暢", time: "09:20", isSystem: false },
  ])
  const [onlineUsers] = useState(["林信宏", "陳靜宜", "張瑋倫", "吳凱文", "王小明"])

  const statusMessages = [
    { type: "normal", message: "系統運作正常 - 所有服務皆可正常使用", icon: CheckCircle },
    { type: "normal", message: "AI搜尋引擎運行順暢 - 平均回應時間 0.3秒", icon: CheckCircle },
    { type: "normal", message: "知識庫已更新 - 新增 15 篇實戰案例", icon: CheckCircle },
    { type: "normal", message: "協作群組活躍中 - 目前 127 位同仁在線", icon: CheckCircle },
    { type: "normal", message: "應變中心待命 - 所有監控系統正常", icon: CheckCircle },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % statusMessages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [statusMessages.length])

  const currentStatus = statusMessages[currentMessageIndex]
  const IconComponent = currentStatus.icon

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "林信宏",
        message: chatMessage,
        time: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }),
        isSystem: false,
      }
      setChatMessages([...chatMessages, newMessage])
      setChatMessage("")

      setTimeout(() => {
        const autoReply = {
          id: chatMessages.length + 2,
          user: "AI助手",
          message: "收到您的訊息，如需協助請隨時告知！",
          time: new Date().toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }),
          isSystem: true,
        }
        setChatMessages((prev) => [...prev, autoReply])
      }, 1000)
    }
  }

  return (
    <div className={cn("mb-6", className)}>
      <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1 flex items-center gap-3 overflow-hidden">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <IconComponent className="h-4 w-4 text-green-600" />
            </div>

            <div className="flex-1 overflow-hidden">
              <div
                className="marquee-container"
                onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
              >
                <div className="marquee-content text-green-800 font-medium whitespace-nowrap">
                  {currentStatus.message}
                </div>
              </div>
            </div>

            <div className="flex gap-1 flex-shrink-0">
              {statusMessages.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-colors",
                    index === currentMessageIndex ? "bg-green-600" : "bg-green-300",
                  )}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <Badge variant="outline" className="text-xs bg-white/50">
              <Users className="h-3 w-3 mr-1" />
              {onlineUsers.length} 在線
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="text-green-700 hover:text-green-800 hover:bg-green-100"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              即時聊天
              {isChatOpen ? <Minimize2 className="h-3 w-3 ml-1" /> : <Maximize2 className="h-3 w-3 ml-1" />}
            </Button>
          </div>
        </div>

        {isChatOpen && (
          <div className="border-t border-green-200 bg-white/80 backdrop-blur-sm">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm text-green-800">方舟即時聊天室</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {onlineUsers.length} 人在線
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={() => setIsChatOpen(false)} className="p-1 h-6 w-6">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-green-100 p-3 mb-3 max-h-40 overflow-y-auto space-y-2">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2 text-sm">
                    <div
                      className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                        msg.isSystem ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      {msg.user.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900 text-xs">{msg.user}</span>
                        <span className="text-gray-500 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-gray-700 text-xs break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="輸入訊息..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 h-8 text-sm"
                />
                <Button onClick={handleSendMessage} size="sm" className="h-8 px-3 bg-green-600 hover:bg-green-700">
                  <Send className="h-3 w-3" />
                </Button>
              </div>

              <div className="mt-3 pt-3 border-t border-green-100">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-3 w-3 text-green-600" />
                  <span className="text-xs font-medium text-green-800">在線用戶</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {onlineUsers.map((user, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1"></div>
                      {user}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
