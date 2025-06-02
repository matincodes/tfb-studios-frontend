"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, ShoppingBag } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"

export default function Dashboard() {
  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hello Matthew 👋</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800" asChild>
            <Link href="/designs/new">
              <Plus className="h-4 w-4 mr-2" />
              New Design
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/create-order">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Create Order
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Designs</h2>
            <Button variant="outline" size="sm" asChild>
              <Link href="/designs">View all</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <Card className="bg-gray-900 border-gray-800 overflow-hidden">
              <CardContent className="p-0">
                <Link href="/designs/funky-jacket">
                  <div className="aspect-square bg-gray-800 relative">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Funky Jacket"
                      width={300}
                      height={300}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">Funky Jacket</h3>
                    <p className="text-sm text-gray-400">1 minute ago</p>
                  </div>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center">
              <CardContent className="p-6 text-center">
                <Link href="/designs/new">
                  <Button variant="ghost" className="h-20 w-20 rounded-full">
                    <Plus className="h-10 w-10 text-gray-400" />
                  </Button>
                </Link>
                <p className="mt-2 text-gray-400">New Design</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Ongoing Orders</h2>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input type="search" placeholder="Search orders" className="pl-8 bg-gray-900 border-gray-700" />
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-xs text-gray-400">
                  <th className="px-4 py-3">PREVIEW</th>
                  <th className="px-4 py-3">NAME</th>
                  <th className="px-4 py-3">DATE</th>
                  <th className="px-4 py-3">TOTAL</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3">UNITS</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 bg-gray-800 rounded-sm"></div>
                  </td>
                  <td className="px-4 py-3">Funky Jacket</td>
                  <td className="px-4 py-3 text-gray-400">20/06/2024</td>
                  <td className="px-4 py-3">£ 360</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-900/30 text-blue-400 rounded-md text-xs">On Hold</span>
                  </td>
                  <td className="px-4 py-3">1</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <svg
                        width="15"
                        height="3"
                        viewBox="0 0 15 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3"
                      >
                        <path d="M1.5 1.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
            <p>1-6 of 6</p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                <span className="sr-only">Previous page</span>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 1L1 6L6 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
              <Button variant="outline" size="sm" disabled className="h-8 w-8 p-0">
                <span className="sr-only">Next page</span>
                <svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 1L6 6L1 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
