"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function NewOrder() {
  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">New Order</h1>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Main Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Mathew" className="bg-gray-900 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Smith" className="bg-gray-900 border-gray-700" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deliveryType">Delivery Type</Label>
                <Select>
                  <SelectTrigger className="bg-gray-900 border-gray-700">
                    <SelectValue placeholder="Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="express">Express</SelectItem>
                    <SelectItem value="overnight">Overnight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" placeholder="+44 8188822007" className="bg-gray-900 border-gray-700" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="12 Alexander way, Manor park, London E16 8BE"
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="comment">Comment</Label>
                <Textarea id="comment" placeholder="Type Something" className="bg-gray-900 border-gray-700" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Sample</h2>
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center">
              <div className="w-12 h-12 bg-gray-800 rounded-md flex items-center justify-center mr-4">
                <Image
                  src="/placeholder.svg?height=48&width=48"
                  alt="Funky Jacket Thumbnail"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Funky Jacket</h3>
              </div>
              <div>
                <Select defaultValue="medium">
                  <SelectTrigger className="bg-gray-900 border-gray-700 w-32">
                    <SelectValue placeholder="Size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="xlarge">X-Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <Button size="lg" className="px-8">
              Order sample
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
