"use client"

import type React from "react"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowLeft, Upload, Heart, Eye, Search, Filter, Plus, FileUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function Materials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [customMaterialName, setCustomMaterialName] = useState("")
  const [customMaterialType, setCustomMaterialType] = useState("")
  const [customMaterialComposition, setCustomMaterialComposition] = useState("")
  const [customMaterialFile, setCustomMaterialFile] = useState<File | null>(null)

  // Mock data for user materials
  const userMaterials = [
    {
      id: 1,
      name: "Custom Cotton Blend",
      type: "Cotton",
      color: "Navy Blue",
      composition: "80% Cotton, 20% Polyester",
      uploadDate: "2024-01-15",
      status: "Approved",
      image: "/placeholder.svg?height=200&width=200",
      usedInDesigns: 3,
    },
    {
      id: 2,
      name: "Organic Linen",
      type: "Linen",
      color: "Natural",
      composition: "100% Organic Linen",
      uploadDate: "2024-01-10",
      status: "Pending",
      image: "/placeholder.svg?height=200&width=200",
      usedInDesigns: 0,
    },
    {
      id: 3,
      name: "Recycled Polyester",
      type: "Polyester",
      color: "Black",
      composition: "100% Recycled Polyester",
      uploadDate: "2024-01-08",
      status: "Approved",
      image: "/placeholder.svg?height=200&width=200",
      usedInDesigns: 1,
    },
  ]

  // Mock data for admin materials
  const adminMaterials = [
    {
      id: 1,
      name: "Premium Wool",
      type: "Wool",
      color: "Charcoal",
      composition: "100% Merino Wool",
      price: "£15.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
    },
    {
      id: 2,
      name: "Organic Cotton",
      type: "Cotton",
      color: "White",
      composition: "100% Organic Cotton",
      price: "£12.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
    },
    {
      id: 3,
      name: "Bamboo Fiber",
      type: "Bamboo",
      color: "Sage Green",
      composition: "100% Bamboo Fiber",
      price: "£18.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
    },
    {
      id: 4,
      name: "Hemp Canvas",
      type: "Hemp",
      color: "Natural",
      composition: "100% Hemp",
      price: "£14.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: false,
    },
    {
      id: 5,
      name: "Tencel Lyocell",
      type: "Tencel",
      color: "Light Blue",
      composition: "100% Tencel Lyocell",
      price: "£16.99/m",
      sustainability: "Very High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
    },
    {
      id: 6,
      name: "Recycled Denim",
      type: "Denim",
      color: "Indigo",
      composition: "80% Recycled Cotton, 20% Polyester",
      price: "£13.99/m",
      sustainability: "High",
      image: "/placeholder.svg?height=200&width=200",
      inStock: true,
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

  const handleMaterialFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomMaterialFile(e.target.files[0])
    }
  }

  const handleUploadMaterial = () => {
    if (customMaterialName && customMaterialType && customMaterialComposition) {
      // Here you would typically upload the material to your backend
      console.log("Uploading material:", {
        name: customMaterialName,
        type: customMaterialType,
        composition: customMaterialComposition,
        file: customMaterialFile,
      })

      // Reset form and close modal
      setCustomMaterialName("")
      setCustomMaterialType("")
      setCustomMaterialComposition("")
      setCustomMaterialFile(null)
      setShowUploadModal(false)
    }
  }

  const filteredUserMaterials = userMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredAdminMaterials = adminMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.type.toLowerCase().includes(searchTerm.toLowerCase()),
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
        <div className="flex items-center gap-2">
          <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Upload Custom Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="material-name">Material Name</Label>
                  <Input
                    id="material-name"
                    value={customMaterialName}
                    onChange={(e) => setCustomMaterialName(e.target.value)}
                    placeholder="Enter material name"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="material-type">Material Type</Label>
                  <Input
                    id="material-type"
                    value={customMaterialType}
                    onChange={(e) => setCustomMaterialType(e.target.value)}
                    placeholder="e.g., Cotton, Silk, Wool"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="material-composition">Composition</Label>
                  <Input
                    id="material-composition"
                    value={customMaterialComposition}
                    onChange={(e) => setCustomMaterialComposition(e.target.value)}
                    placeholder="e.g., 100% Organic Cotton"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 mb-2">Upload material sample image</p>
                  <Label
                    htmlFor="material-file-upload"
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm inline-flex items-center"
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    Browse Files
                  </Label>
                  <Input
                    id="material-file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleMaterialFileChange}
                    accept="image/*"
                  />
                  {customMaterialFile && <p className="text-sm text-green-400 mt-2">{customMaterialFile.name}</p>}
                </div>
                <Button
                  onClick={handleUploadMaterial}
                  className="w-full"
                  disabled={!customMaterialName || !customMaterialType || !customMaterialComposition}
                >
                  Upload Material
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="flex-1 p-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-800 border-gray-700"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="my-materials" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-materials">My Materials ({filteredUserMaterials.length})</TabsTrigger>
            <TabsTrigger value="admin-materials">Available Materials ({filteredAdminMaterials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="my-materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Your Uploaded Materials</h2>
                <p className="text-sm text-gray-400">Materials you've uploaded for approval and use in designs</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUserMaterials.map((material) => (
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
                        <p className="text-xs text-gray-500 mt-1">{material.composition}</p>
                      </div>
                      <Badge className={`${getStatusColor(material.status)} text-white text-xs`}>
                        {material.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>Uploaded: {material.uploadDate}</span>
                      <span>Used in {material.usedInDesigns} designs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredUserMaterials.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No materials found</h3>
                <p className="text-gray-400 mb-4">
                  {searchTerm ? "Try adjusting your search terms" : "Upload your first material to get started"}
                </p>
                {!searchTerm && (
                  <Button onClick={() => setShowUploadModal(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="admin-materials" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Available Materials</h2>
                <p className="text-sm text-gray-400">Curated sustainable materials from our library</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdminMaterials.map((material) => (
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
                        <p className="text-xs text-gray-500 mt-1">{material.composition}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Badge className={`${getSustainabilityColor(material.sustainability)} text-white text-xs`}>
                          {material.sustainability}
                        </Badge>
                        <Badge variant={material.inStock ? "default" : "secondary"} className="text-xs">
                          {material.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between text-sm font-medium mb-3">
                      <span>{material.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredAdminMaterials.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium mb-2">No materials found</h3>
                <p className="text-gray-400">Try adjusting your search terms or filters</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
