"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Upload, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function Materials() {
  const userMaterials = [
    {
      id: 1,
      name: "Custom Denim",
      type: "Cotton",
      uploadDate: "2024-01-15",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Silk Blend",
      type: "Silk",
      uploadDate: "2024-01-10",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Wool Tweed",
      type: "Wool",
      uploadDate: "2024-01-05",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const adminMaterials = [
    {
      id: 4,
      name: "Organic Cotton",
      type: "Cotton",
      category: "Sustainable",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Recycled Polyester",
      type: "Synthetic",
      category: "Eco-Friendly",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Bamboo Fiber",
      type: "Natural",
      category: "Sustainable",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 7,
      name: "Hemp Canvas",
      type: "Natural",
      category: "Durable",
      image: "/placeholder.svg?height=200&width=200",
    },
    { id: 8, name: "Merino Wool", type: "Wool", category: "Premium", image: "/placeholder.svg?height=200&width=200" },
    {
      id: 9,
      name: "Linen Blend",
      type: "Natural",
      category: "Breathable",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

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
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search materials..." className="pl-8 bg-gray-900 border-gray-700" />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="my-materials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="my-materials">My Materials ({userMaterials.length})</TabsTrigger>
            <TabsTrigger value="admin-materials">Admin Materials ({adminMaterials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="my-materials" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">Materials you've uploaded to your library</p>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Add New Material
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {userMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-800 relative">
                      <Image
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-gray-400">{material.type}</p>
                      <p className="text-xs text-gray-500 mt-1">Uploaded {material.uploadDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center hover:border-gray-700 transition-colors">
                <CardContent className="p-6 text-center">
                  <Button variant="ghost" className="h-20 w-20 rounded-full">
                    <Upload className="h-10 w-10 text-gray-400" />
                  </Button>
                  <p className="mt-2 text-gray-400">Upload Material</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="admin-materials" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400">Curated materials available for all users</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {adminMaterials.map((material) => (
                <Card
                  key={material.id}
                  className="bg-gray-900 border-gray-800 overflow-hidden hover:border-gray-700 transition-colors"
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-800 relative">
                      <Image
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        width={200}
                        height={200}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-1 bg-blue-900/80 text-blue-300 rounded-md text-xs">
                          {material.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{material.name}</h3>
                      <p className="text-sm text-gray-400">{material.type}</p>
                      <p className="text-xs text-gray-500 mt-1">Admin Curated</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
