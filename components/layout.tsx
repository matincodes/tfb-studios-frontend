"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
<<<<<<< Updated upstream
import { Button } from "@/components/ui/button"
=======
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  Palette,
  Package,
  MessageSquare,
  Settings,
  Bell,
  Search,
  Plus,
  ChevronDown,
  ChevronRight,
  Layers,
  BarChart3,
  Zap,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { UploadDesignModal } from "@/components/upload-design-modal"
>>>>>>> Stashed changes
import { useAuth } from "@/lib/auth-provider"
import DashboardLoading from "@/app/dashboard/loading"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
<<<<<<< Updated upstream
  const router = useRouter()
=======

  const router = useRouter()
  // Get the current pathname to determine active navigation item
  const pathname = usePathname()
  const [isDesignsOpen, setIsDesignsOpen] = useState(true)
  const [isOrdersOpen, setIsOrdersOpen] = useState(true)
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
>>>>>>> Stashed changes

  const { user, isLoading, logout } = useAuth()

  console.log("User in Layout:", user)

  // Logic to protect the dashboard routes
  useEffect(() => {
    // If the initial check is finished and there is no user, redirect to login page
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const handleVisitWebsite = () => {
    // Navigate to the home page
    window.location.href = "/"
  }

   if (isLoading) {
    return <DashboardLoading />;
  }

  return user ? (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-800 flex flex-col">
        <div className="p-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-70"></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xs">TFB STUDIOS</div>
            </div>
            <span className="text-xl font-bold">TFB STUDIOS</span>
          </Link>
        </div>

        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8 bg-gray-900 border-gray-700 focus:border-gray-600"
            />
          </div>
        </div>

<<<<<<< Updated upstream
        <nav className="flex-1 p-2">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <LayoutGrid className="h-5 w-5 text-gray-400" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/designs"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Palette className="h-5 w-5 text-gray-400" />
                <span>Designs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/orders"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Package className="h-5 w-5 text-gray-400" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link
                href="/create-order"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <ShoppingBag className="h-5 w-5 text-gray-400" />
                <span>Create Order</span>
              </Link>
            </li>
            <li>
              <Link
                href="/messages"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <MessageSquare className="h-5 w-5 text-gray-400" />
                <span>Messages</span>
                <span className="ml-auto bg-gray-700 text-xs px-2 py-0.5 rounded-full">2</span>
              </Link>
            </li>
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                <Settings className="h-5 w-5 text-gray-400" />
                <span>Settings</span>
              </Link>
            </li>
            <li className="mt-4 pt-4 border-t border-gray-800">
              <Button className="w-full flex items-center gap-3" onClick={handleVisitWebsite}>
                <Globe className="h-5 w-5" />
                <span>Visit Website</span>
              </Button>
            </li>
          </ul>
        </nav>
=======
          {/* Quick Actions */}
          <div className="p-4 border-b border-gray-800">
            <Button
              onClick={() => setShowUploadModal(true)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Design
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              if (item.isCollapsible) {
                return (
                  <Collapsible key={item.name} open={item.isOpen} onOpenChange={item.setIsOpen}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-between hover:bg-gray-800 hover:text-white",
                          item.current ? "bg-gray-800 text-white" : "text-gray-300",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </div>
                        {item.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-1 mt-1">
                      {item.children?.map((child) => (
                        <Link key={child.name} href={child.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start pl-12 hover:bg-gray-800 hover:text-white",
                              child.current ? "bg-gray-800 text-white" : "text-gray-400",
                            )}
                          >
                            {child.name}
                          </Button>
                        </Link>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                )
              }

              return (
                item.href ? (
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
                          {item.icon && <item.icon className="w-5 h-5 mr-3" />}
                          <span>{item.name}</span>
                          {item.badge && <Badge className="ml-auto bg-blue-600 text-white">{item.badge}</Badge>}
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : null
              )
            })}
          </nav>
>>>>>>> Stashed changes

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{user.name || "TFB User"}</p>
              <p className="text-xs text-gray-400">Fashion Designer</p>
            </div>
            {/* Logout Button */}
            <Button variant="ghost" size="icon" className="ml-auto" onClick={logout}>
                <LogOut className="h-4 w-4" />
                <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
<<<<<<< Updated upstream
=======
        {/* Close sidebar div */}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Bell className="w-5 h-5" />
                </Button>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>{user.name ? user.name.charAt(0).toUpperCase() : 'UN'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>

        {/* Upload Design Modal */}
        <UploadDesignModal open={showUploadModal} onOpenChange={setShowUploadModal} />
>>>>>>> Stashed changes
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  ): null;
}
