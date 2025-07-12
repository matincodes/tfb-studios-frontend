"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  LayoutDashboard,
  Layers,
  Palette,
  Package,
  MessageSquare,
  Settings,
  Users,
  BarChart3,
  LogOut,
  Shield,
  Globe,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const [isDesignsOpen, setIsDesignsOpen] = useState(true)
  const [isOrdersOpen, setIsOrdersOpen] = useState(true)

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: pathname === "/admin",
    },
    {
      name: "Materials",
      href: "/admin/materials",
      icon: Layers,
      current: pathname === "/admin/materials",
    },
    {
      name: "Designs",
      href: "/admin/designs",
      icon: Palette,
      current: pathname === "/admin/designs",
    },
    {
      name: "Orders",
      href: "/admin/orders",
      icon: Package,
      current: pathname === "/admin/orders",
    },
    {
      name: "Messages",
      href: "/admin/messages",
      icon: MessageSquare,
      current: pathname === "/admin/messages",
      badge: "5",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: pathname === "/admin/users",
    },
    {
      name: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      current: pathname === "/admin/analytics",
    },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      current: pathname === "/admin/settings",
    },
  ]

  const handleLogout = () => {
    window.location.href = "/login"
  }

  const handleVisitWebsite = () => {
    window.location.href = "/"
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold">Admin Panel</span>
                <p className="text-xs text-gray-400">FashionForge</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start hover:bg-gray-800 hover:text-white",
                        item.current ? "bg-gray-800 text-white" : "text-gray-300",
                      )}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      <span>{item.name}</span>
                      {item.badge && <Badge className="ml-auto bg-red-600 text-white">{item.badge}</Badge>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>

          {/* Admin Profile & Actions */}
          <div className="p-4 border-t border-gray-800 space-y-2">
            <Button variant="ghost" onClick={handleVisitWebsite} className="w-full justify-start">
              <Globe className="w-4 h-4 mr-3" />
              Visit Website
            </Button>

            <div className="flex items-center gap-3 p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-gray-400 truncate">admin@fashionforge.com</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Admin Dashboard</h1>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-red-600 text-white">Admin</Badge>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </TooltipProvider>
  )
}
