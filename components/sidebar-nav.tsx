"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Users, AlertTriangle, Home, User, Gift } from "lucide-react"

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const [activeItem, setActiveItem] = useState("dashboard")

  const navItems = [
    {
      id: "dashboard",
      label: "首頁",
      icon: Home,
      href: "/",
      badge: null,
    },
    {
      id: "knowledge",
      label: "個人筆記",
      icon: BookOpen,
      href: "/knowledge",
      badge: null,
    },
    {
      id: "collaboration",
      label: "悄悄話",
      icon: Users,
      href: "/collaboration",
      badge: 3,
    },
    {
      id: "emergency",
      label: "問題回報",
      icon: AlertTriangle,
      href: "/emergency",
      badge: null,
    },
    {
      id: "contribute",
      label: "貢獻中心",
      icon: Gift,
      href: "/contribute",
      badge: null,
    },
    {
      id: "profile",
      label: "個人設定",
      icon: User,
      href: "/profile",
      badge: null,
    },
  ]

  return (
    <div className={cn("flex flex-col w-64 bg-sidebar border-r border-sidebar-border", className)}>
      {/* Logo and Title */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Search className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">方舟</h1>
            <p className="text-xs text-muted-foreground">智慧知識協作平台</p>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeItem === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={cn(
                "w-full justify-start gap-3 h-11",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
              onClick={() => setActiveItem(item.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          )
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-muted-foreground">系統正常運行</span>
        </div>
      </div>
    </div>
  )
}
