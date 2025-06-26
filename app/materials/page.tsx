"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, Heart, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function Materials() {
  // Mock data for user materials
  const userMaterials = [
    {
      id: 1,
      name: "Custom Cotton Blend",
      type: "Cotton",
      color: "Navy Blue",
      uploadDate: "2024-01-15",
      status: "Approved",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Organic Linen",
      type: "Linen",
      color: "Natural",
      uploadDate: "2024-01-10",
      status: "Pending",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Recycled Polyester",
      type: "Polyester",
      color: "Black",
      uploadDate: "2024-01-08",
      status: "Approved",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Mock data for admin materials
  const adminMaterials = [
    {
      id: 1,
      name: "Premium Wool",
      type: "Wool",
      color: "Charcoal",
      price: "£15.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Organic Cotton",
      type: "Cotton",
      color: "White",
      price: "£12.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Bamboo Fiber",
      type: "Bamboo",
      color: "Sage Green",
      price: "£18.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Hemp Canvas",
      type: "Hemp",
      color: "Natural",
      price: "£14.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 5,
      name: "Tencel Lyocell",
      type: "Tencel",
      color: "Light Blue",
      price: "£16.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 6,
      name: "Recycled Denim",
      type: "Denim",
      color: "Indigo",
      price: "£13.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSustainabilityColor = (level: string) => {
    switch (level) {
      case "Very High":
        return "bg-green-500"
      case "High":
        return "bg-blue-500"
      case "Medium":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

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

      <div className="flex-1 p-6">
        <Tabs defaultValue="my-materials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-materials">My Materials</TabsTrigger>
            <TabsTrigger value="admin-materials">Available Materials</TabsTrigger>
          </TabsList>

          <TabsContent value="my-materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Uploaded Materials</h2>
                <p className="text-sm text-gray-400">Materials you've uploaded for approval</p>
              </div>
              <Badge variant="secondary">{userMaterials.length} materials</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userMaterials.map((material) => (
                <Card key={material.id} className="bg-gray-800 border-gray-700">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-gray-700 rounded-md mb-3 overflow-hidden">
                      <img
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-medium">{material.name}</CardTitle>
                        <p className="text-xs text-gray-400">
                          {material.type} • {material.color}
                        </p>
                      </div>
                      <Badge className={`${getStatusColor(material.status)} text-white text-xs`}>
                        {material.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>Uploaded: {material.uploadDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="admin-materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Available Materials</h2>
                <p className="text-sm text-gray-400">Curated sustainable materials from our library</p>
              </div>
              <Badge variant="secondary">{adminMaterials.length} materials</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {adminMaterials.map((material) => (
                <Card key={material.id} className="bg-gray-800 border-gray-700">
                  <CardHeader className="p-4">
                    <div className="aspect-square bg-gray-700 rounded-md mb-3 overflow-hidden">
                      <img
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-medium">{material.name}</CardTitle>
                        <p className="text-xs text-gray-400">
                          {material.type} • {material.color}
                        </p>
                      </div>
                      <Badge className={`${getSustainabilityColor(material.sustainability)} text-white text-xs`}>
                        {material.sustainability}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-sm font-medium mb-3">
                      <span>{material.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-3 w-3 mr-1" />
                        Use Material
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-3 w-3" />
                      </Button>
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
