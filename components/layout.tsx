"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Home,
  Palette,
  ShoppingCart,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  FactoryIcon as Fabric,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Designs", href: "/designs", icon: Palette },
  { name: "Materials", href: "/materials", icon: Fabric },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Messages", href: "/messages", icon: MessageSquare },
]

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    // Handle logout logic here
    router.push("/login")
  }

  const handleVisitWebsite = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 lg:block hidden">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">TFB Studios</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-800">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">John Doe</div>
                    <div className="text-xs text-gray-400">Designer</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleVisitWebsite} className="cursor-pointer">
                  <Home className="w-4 h-4 mr-2" />
                  Visit Website
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-800" />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        {/* Mobile menu button */}
        <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between h-16 px-4 bg-gray-900 border-b border-gray-800">
          <h1 className="text-xl font-bold">TFB Studios</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile menu */}
        <div
          className={`fixed top-16 left-0 z-40 w-64 h-full bg-gray-900 border-r border-gray-800 transform transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <div className="lg:pt-0 pt-16">{children}</div>
      </div>
    </div>
  )
}
