"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Search, Settings, MessageSquare, Package, LayoutGrid, Palette, ShoppingBag, Globe } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()

  const handleVisitWebsite = () => {
    // Navigate to the home page
    window.location.href = "/"
  }

  return (
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

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Matthew</p>
              <p className="text-xs text-gray-400">Design Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">{children}</div>
    </div>
  )
}
