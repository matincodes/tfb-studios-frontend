"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Upload, Download, Eye, Trash2, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Materials() {
  // Sample data for materials
  const userMaterials = [
    {
      id: 1,
      name: "Custom Cotton Blend",
      type: "Cotton",
      color: "Navy Blue",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Organic Linen",
      type: "Linen",
      color: "Natural",
      uploadDate: "2024-01-10",
      size: "1.8 MB",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Recycled Polyester",
      type: "Polyester",
      color: "Black",
      uploadDate: "2024-01-08",
      size: "3.1 MB",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const adminMaterials = [
    {
      id: 4,
      name: "Premium Wool",
      type: "Wool",
      color: "Charcoal",
      uploadDate: "2024-01-20",
      size: "4.2 MB",
      image: "/placeholder.svg?height=100&width=100",
      isAdmin: true,
    },
    {
      id: 5,
      name: "Sustainable Hemp",
      type: "Hemp",
      color: "Olive Green",
      uploadDate: "2024-01-18",
      size: "2.9 MB",
      image: "/placeholder.svg?height=100&width=100",
      isAdmin: true,
    },
    {
      id: 6,
      name: "Bamboo Fiber",
      type: "Bamboo",
      color: "Cream",
      uploadDate: "2024-01-16",
      size: "2.1 MB",
      image: "/placeholder.svg?height=100&width=100",
      isAdmin: true,
    },
    {
      id: 7,
      name: "Merino Wool",
      type: "Wool",
      color: "Grey",
      uploadDate: "2024-01-14",
      size: "3.8 MB",
      image: "/placeholder.svg?height=100&width=100",
      isAdmin: true,
    },
  ]

  const MaterialCard = ({ material, showActions = true }) => (
    <Card className="bg-gray-900 border-gray-800 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square bg-gray-800 relative">
          <Image
            src={material.image || "/placeholder.svg"}
            alt={material.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
          {material.isAdmin && <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">Admin</Badge>}
        </div>
        <div className="p-4">
          <h3 className="font-medium text-white mb-1">{material.name}</h3>
          <p className="text-sm text-gray-400 mb-2">
            {material.type} • {material.color}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <span>{material.uploadDate}</span>
            <span>{material.size}</span>
          </div>
          {showActions && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1 h-8 border-gray-700 hover:bg-gray-800">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button variant="outline" size="sm" className="h-8 border-gray-700 hover:bg-gray-800">
                <Download className="h-3 w-3" />
              </Button>
              {!material.isAdmin && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-gray-700 hover:bg-gray-800 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Materials Library</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search materials..." className="pl-8 bg-gray-900 border-gray-700" />
          </div>
          <Button className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Material
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="my-materials">My Materials</TabsTrigger>
            <TabsTrigger value="admin-materials">Admin Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">My Materials</h2>
                  <Badge variant="outline" className="border-gray-700">
                    {userMaterials.length} materials
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {userMaterials.map((material) => (
                    <MaterialCard key={material.id} material={material} />
                  ))}
                  <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center">
                    <CardContent className="p-6 text-center">
                      <Button variant="ghost" className="h-20 w-20 rounded-full">
                        <Plus className="h-10 w-10 text-gray-400" />
                      </Button>
                      <p className="mt-2 text-gray-400">Upload Material</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Admin Materials</h2>
                  <Badge variant="outline" className="border-gray-700">
                    {adminMaterials.length} materials
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {adminMaterials.map((material) => (
                    <MaterialCard key={material.id} material={material} showActions={false} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-materials" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">My Materials</h2>
              <Badge variant="outline" className="border-gray-700">
                {userMaterials.length} materials
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} />
              ))}
              <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center">
                <CardContent className="p-6 text-center">
                  <Button variant="ghost" className="h-20 w-20 rounded-full">
                    <Plus className="h-10 w-10 text-gray-400" />
                  </Button>
                  <p className="mt-2 text-gray-400">Upload Material</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin-materials" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Admin Materials</h2>
              <Badge variant="outline" className="border-gray-700">
                {adminMaterials.length} materials
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {adminMaterials.map((material) => (
                <MaterialCard key={material.id} material={material} showActions={false} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </Layout>
  )
}
