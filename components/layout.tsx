"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { useAuth } from "@/lib/auth-provider"
import DashboardLoading from "@/app/dashboard/loading"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {

  const router = useRouter()
  // Get the current pathname to determine active navigation item
  const pathname = usePathname()
  const [showUploadModal, setShowUploadModal] = useState(false)

  const { user, isLoading, logout } = useAuth()

  console.log("User in Layout:", user)

  // Logic to protect the dashboard routes
  useEffect(() => {
    // If the initial check is finished and there is no user, redirect to login page
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [isLoading, user, router]);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Designs",
      href: "/designs",
      icon: Palette,
      current: pathname === "/designs",
    },
    {
      name: "Materials",
      href: "/materials",
      icon: Layers,
      current: pathname === "/materials",
    },
    {
      name: "Orders",
      href: "/orders",
      icon: Package,
      current: pathname === "/orders",
    },
    // {
    //   name: "Messages",
    //   href: "/messages",
    //   icon: MessageSquare,
    //   current: pathname === "/messages",
    //   badge: "3",
    // },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: pathname === "/settings",
    },
  ]

   if (isLoading) {
    return <DashboardLoading />;
  }

  return user ? (
    <>
    <TooltipProvider>
      <div className="flex h-screen bg-black text-white">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center gap-1">
              {/* <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div> */}
              <img src="assets/tfb-transparent.png" alt="" className="w-16 h-16"/>
              <span className="text-xl font-bold">TFB Studios</span>
            </div>
          </div>

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
          <nav className="flex-1 p-4 overflow-y-auto">
            {navigation.map((item) => (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <Button
                          variant="ghost"
                          className={cn(
                            "w-full justify-start mb-2 hover:bg-gray-800 hover:text-white",
                            item.current ? "bg-gray-800 text-white" : "text-gray-300",
                          )}
                        >
                          <item.icon className="w-5 h-5 mr-3" />
                          <span>{item.name}</span>
                          {/* {item.badge && <Badge className="ml-auto bg-blue-600 text-white">{item.badge}</Badge>} */}
                        </Button>
                      </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              )
            )}

            {/* Logout Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                   <Button variant="ghost" className="w-full justify-start mt-5 text-red-400 hover:bg-gray-800 hover:text-red-700" onClick={logout}>
                       <LogOut className="w-5 h-5 mr-3" />
                       <span>Logout</span>
                   </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
          </nav>

          
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
          </div>
        </div>
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
                  <AvatarFallback>{user.name ? `${user.name.charAt(0).toUpperCase()}${user.name.charAt(1).toUpperCase()}` : 'JD'}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>

        {/* Upload Design Modal */}
        <UploadDesignModal open={showUploadModal} onOpenChange={setShowUploadModal} />
      </div>
    </TooltipProvider>
    </>
  ): null;
}