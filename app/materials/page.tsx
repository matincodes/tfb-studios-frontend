"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Upload, Heart, Eye, Plus, Leaf, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)

  // Mock data for user materials
  const userMaterials = [
    {
      id: 1,
      name: "Custom Cotton Blend",
      type: "Cotton",
      composition: "70% Cotton, 30% Polyester",
      uploadDate: "2024-01-15",
      status: "approved",
      usedInDesigns: 3,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Vintage Denim",
      type: "Denim",
      composition: "100% Cotton",
      uploadDate: "2024-01-10",
      status: "pending",
      usedInDesigns: 0,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Silk Blend",
      type: "Silk",
      composition: "60% Silk, 40% Cotton",
      uploadDate: "2024-01-05",
      status: "rejected",
      usedInDesigns: 0,
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  // Mock data for admin materials
  const adminMaterials = [
    {
      id: 1,
      name: "Organic Cotton",
      type: "Cotton",
      composition: "100% Organic Cotton",
      pricePerMeter: 25,
      sustainability: "A+",
      inStock: true,
      description: "Premium organic cotton sourced from certified farms",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      name: "Recycled Polyester",
      type: "Polyester",
      composition: "100% Recycled Polyester",
      pricePerMeter: 18,
      sustainability: "A",
      inStock: true,
      description: "Made from recycled plastic bottles",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      name: "Hemp Canvas",
      type: "Hemp",
      composition: "100% Hemp",
      pricePerMeter: 32,
      sustainability: "A+",
      inStock: false,
      description: "Durable hemp canvas for structured garments",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 4,
      name: "Bamboo Jersey",
      type: "Bamboo",
      composition: "95% Bamboo, 5% Spandex",
      pricePerMeter: 22,
      sustainability: "A",
      inStock: true,
      description: "Soft and breathable bamboo jersey",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-900/30 text-green-400 border-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-900/30 text-red-400 border-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const getSustainabilityBadge = (rating: string) => {
    const color =
      rating === "A+"
        ? "bg-green-900/30 text-green-400 border-green-700"
        : "bg-blue-900/30 text-blue-400 border-blue-700"
    return (
      <Badge className={color}>
        <Leaf className="w-3 h-3 mr-1" />
        {rating}
      </Badge>
    )
  }

  const filteredUserMaterials = userMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAdminMaterials = adminMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <Layout>
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Materials Library</h1>
            <p className="text-gray-400">Manage your materials and browse available options</p>
          </div>

          <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Upload className="w-4 h-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Upload New Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-name">Material Name</Label>
                  <Input id="material-name" placeholder="Enter material name" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="material-type">Material Type</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select material type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="polyester">Polyester</SelectItem>
                      <SelectItem value="silk">Silk</SelectItem>
                      <SelectItem value="wool">Wool</SelectItem>
                      <SelectItem value="linen">Linen</SelectItem>
                      <SelectItem value="denim">Denim</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="composition">Composition</Label>
                  <Input id="composition" placeholder="e.g., 100% Cotton" className="bg-gray-800 border-gray-700" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the material..."
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="material-image">Material Sample</Label>
                  <Input id="material-image" type="file" accept="image/*" className="bg-gray-800 border-gray-700" />
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={() => setIsUploadModalOpen(false)} className="flex-1">
                    Upload Material
                  </Button>
                  <Button variant="outline" onClick={() => setIsUploadModalOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-700"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="my-materials" className="space-y-6">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="my-materials" className="data-[state=active]:bg-gray-800">
              My Materials ({filteredUserMaterials.length})
            </TabsTrigger>
            <TabsTrigger value="available-materials" className="data-[state=active]:bg-gray-800">
              Available Materials ({filteredAdminMaterials.length})
            </TabsTrigger>
          </TabsList>

          {/* My Materials Tab */}
          <TabsContent value="my-materials">
            {filteredUserMaterials.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">No materials uploaded yet</h3>
                  <p className="text-gray-400 text-center mb-4">
                    Upload your first material to get started with custom designs
                  </p>
                  <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Upload Material
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUserMaterials.map((material) => (
                  <Card key={material.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                    <div className="aspect-square relative">
                      <Image
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium truncate">{material.name}</h3>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{material.type}</p>
                      <p className="text-xs text-gray-500 mb-3">{material.composition}</p>

                      <div className="flex items-center justify-between mb-3">
                        {getStatusBadge(material.status)}
                        <span className="text-xs text-gray-400">Used in {material.usedInDesigns} designs</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 h-8">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Uploaded {new Date(material.uploadDate).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Available Materials Tab */}
          <TabsContent value="available-materials">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAdminMaterials.map((material) => (
                <Card key={material.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={material.image || "/placeholder.svg"}
                      alt={material.name}
                      fill
                      className="object-cover"
                    />
                    {!material.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge className="bg-red-900/30 text-red-400 border-red-700">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Out of Stock
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium truncate">{material.name}</h3>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{material.type}</p>
                    <p className="text-xs text-gray-500 mb-3">{material.composition}</p>

                    <div className="flex items-center justify-between mb-3">
                      {getSustainabilityBadge(material.sustainability)}
                      <span className="text-sm font-medium">£{material.pricePerMeter}/m</span>
                    </div>

                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{material.description}</p>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 h-8" disabled={!material.inStock}>
                        Use Material
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-3 h-3" />
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
