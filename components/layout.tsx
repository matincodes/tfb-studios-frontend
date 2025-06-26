"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Palette,
  ShoppingBag,
  MessageSquare,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  Scissors,
  Shirt,
  Package,
  Globe,
  Layers,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const [isDesignsOpen, setIsDesignsOpen] = useState(true)
  const [isOrdersOpen, setIsOrdersOpen] = useState(true)

  const isActive = (path: string) => pathname === path

  const handleLogout = () => {
    // Handle logout logic here
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
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Scissors className="w-4 h-4 text-black" />
              </div>
              <span className="font-bold text-lg">FashionForge</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link href="/dashboard">
              <Button
                variant={isActive("/dashboard") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
            </Link>

            {/* Designs Section */}
            <Collapsible open={isDesignsOpen} onOpenChange={setIsDesignsOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-10">
                  <div className="flex items-center gap-3">
                    <Palette className="w-4 h-4" />
                    Designs
                  </div>
                  {isDesignsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4 mt-1">
                <Link href="/designs">
                  <Button
                    variant={isActive("/designs") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-3 h-8"
                  >
                    <Shirt className="w-3 h-3" />
                    All Designs
                  </Button>
                </Link>
                <Link href="/designs/new">
                  <Button
                    variant={isActive("/designs/new") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-3 h-8"
                  >
                    <Package className="w-3 h-3" />
                    Create New
                  </Button>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            {/* Materials */}
            <Link href="/materials">
              <Button
                variant={isActive("/materials") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
              >
                <Layers className="w-4 h-4" />
                Materials
              </Button>
            </Link>

            {/* Orders Section */}
            <Collapsible open={isOrdersOpen} onOpenChange={setIsOrdersOpen}>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-between h-10">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    Orders
                  </div>
                  {isOrdersOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 ml-4 mt-1">
                <Link href="/orders">
                  <Button
                    variant={isActive("/orders") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-3 h-8"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    All Orders
                  </Button>
                </Link>
                <Link href="/orders/new">
                  <Button
                    variant={isActive("/orders/new") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-3 h-8"
                  >
                    <Package className="w-3 h-3" />
                    Create Order
                  </Button>
                </Link>
              </CollapsibleContent>
            </Collapsible>

            <Link href="/messages">
              <Button
                variant={isActive("/messages") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
              >
                <MessageSquare className="w-4 h-4" />
                Messages
              </Button>
            </Link>

            <Link href="/settings">
              <Button
                variant={isActive("/settings") ? "secondary" : "ghost"}
                className="w-full justify-start gap-3 h-10"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </Link>
          </nav>

          {/* User Profile & Actions */}
          <div className="p-4 border-t border-gray-800 space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" onClick={handleVisitWebsite} className="w-full justify-start gap-3 h-10">
                  <Globe className="w-4 h-4" />
                  Visit Website
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Go to public website</p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center gap-3 p-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Matthew Johnson</p>
                <p className="text-xs text-gray-400 truncate">matthew@example.com</p>
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="h-8 w-8 p-0 hover:bg-red-900/20 hover:text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </div>
    </TooltipProvider>
  )
}
