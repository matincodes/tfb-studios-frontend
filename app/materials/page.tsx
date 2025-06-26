"use client"

import type React from "react"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Upload, FileUp, Grid3X3, List, Heart, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface Material {
  id: string
  name: string
  type: string
  composition: string
  price: string
  thumbnail: string
  inStock: boolean
  source: "admin" | "user"
  uploadedBy?: string
  uploadDate?: string
  isFavorite?: boolean
  description?: string
}

// Sample materials data
const sampleMaterials: Material[] = [
  // Admin materials
  {
    id: "admin-cotton-canvas",
    name: "Organic Cotton Canvas",
    type: "Canvas",
    composition: "100% Organic Cotton",
    price: "£12.95 PER METRE",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "admin",
    description: "Premium organic cotton canvas perfect for structured garments",
  },
  {
    id: "admin-silk-satin",
    name: "Premium Silk Satin",
    type: "Satin & Silk",
    composition: "100% Mulberry Silk",
    price: "£24.95 PER METRE",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "admin",
    description: "Luxurious silk satin with beautiful drape and sheen",
  },
  {
    id: "admin-wool-flannel",
    name: "Merino Wool Flannel",
    type: "Flannel",
    composition: "100% Merino Wool",
    price: "£18.95 PER METRE",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: false,
    source: "admin",
    description: "Soft merino wool flannel ideal for winter garments",
  },
  // User uploaded materials
  {
    id: "user-custom-denim",
    name: "Vintage Denim",
    type: "Denim",
    composition: "98% Cotton, 2% Elastane",
    price: "Custom",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "user",
    uploadedBy: "You",
    uploadDate: "2024-01-15",
    isFavorite: true,
    description: "Custom vintage-style denim with slight stretch",
  },
  {
    id: "user-linen-blend",
    name: "Summer Linen Blend",
    type: "Linen",
    composition: "70% Linen, 30% Cotton",
    price: "Custom",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "user",
    uploadedBy: "You",
    uploadDate: "2024-01-10",
    description: "Breathable linen blend perfect for summer wear",
  },
]

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>(sampleMaterials)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showUploadDialog, setShowUploadDialog] = useState(false)

  // Upload form states
  const [materialName, setMaterialName] = useState("")
  const [materialType, setMaterialType] = useState("")
  const [materialComposition, setMaterialComposition] = useState("")
  const [materialDescription, setMaterialDescription] = useState("")
  const [materialFile, setMaterialFile] = useState<File | null>(null)

  // Filter materials based on search and type
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.composition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || material.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesType
  })

  const adminMaterials = filteredMaterials.filter((m) => m.source === "admin")
  const userMaterials = filteredMaterials.filter((m) => m.source === "user")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaterialFile(e.target.files[0])
    }
  }

  const handleUploadMaterial = () => {
    if (materialName && materialType && materialComposition) {
      const newMaterial: Material = {
        id: `user-${Date.now()}`,
        name: materialName,
        type: materialType,
        composition: materialComposition,
        price: "Custom",
        thumbnail: "/placeholder.svg?height=200&width=200",
        inStock: true,
        source: "user",
        uploadedBy: "You",
        uploadDate: new Date().toISOString().split("T")[0],
        description: materialDescription,
      }

      setMaterials((prev) => [...prev, newMaterial])

      // Reset form
      setMaterialName("")
      setMaterialType("")
      setMaterialComposition("")
      setMaterialDescription("")
      setMaterialFile(null)
      setShowUploadDialog(false)
    }
  }

  const toggleFavorite = (materialId: string) => {
    setMaterials((prev) =>
      prev.map((material) =>
        material.id === materialId ? { ...material, isFavorite: !material.isFavorite } : material,
      ),
    )
  }

  const deleteMaterial = (materialId: string) => {
    setMaterials((prev) => prev.filter((material) => material.id !== materialId))
  }

  const MaterialCard = ({ material }: { material: Material }) => (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all group">
      <CardContent className="p-4">
        <div className="aspect-square relative rounded-md overflow-hidden mb-3">
          <Image src={material.thumbnail || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
          <div className="absolute top-2 right-2 flex gap-1">
            {material.source === "user" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-black/50 hover:bg-black/70"
                onClick={() => toggleFavorite(material.id)}
              >
                <Heart className={`h-3 w-3 ${material.isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
              </Button>
            )}
          </div>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/30">
              <Eye className="h-4 w-4 text-white" />
            </Button>
            {material.source === "user" && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8 bg-white/20 hover:bg-white/30">
                  <Edit className="h-4 w-4 text-white" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 bg-white/20 hover:bg-red-500/50"
                  onClick={() => deleteMaterial(material.id)}
                >
                  <Trash2 className="h-4 w-4 text-white" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h4 className="font-medium text-sm leading-tight">{material.name}</h4>
            <Badge variant={material.source === "admin" ? "default" : "secondary"} className="text-xs">
              {material.source === "admin" ? "Admin" : "Custom"}
            </Badge>
          </div>

          <p className="text-xs text-gray-400">{material.type}</p>
          <p className="text-xs text-gray-500">{material.composition}</p>

          <div className="flex justify-between items-center pt-1">
            <span className="text-xs font-medium">{material.price}</span>
            <Badge variant={material.inStock ? "default" : "secondary"} className="text-xs">
              {material.inStock ? "Available" : "Out of Stock"}
            </Badge>
          </div>

          {material.uploadDate && <p className="text-xs text-gray-500">Uploaded: {material.uploadDate}</p>}
        </div>
      </CardContent>
    </Card>
  )

  const MaterialListItem = ({ material }: { material: Material }) => (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-all">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
            <Image src={material.thumbnail || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-medium">{material.name}</h4>
                <p className="text-sm text-gray-400">
                  {material.type} • {material.composition}
                </p>
                {material.description && <p className="text-xs text-gray-500 mt-1">{material.description}</p>}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={material.source === "admin" ? "default" : "secondary"}>
                  {material.source === "admin" ? "Admin" : "Custom"}
                </Badge>
                <Badge variant={material.inStock ? "default" : "secondary"}>
                  {material.inStock ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">{material.price}</span>
              <div className="flex items-center gap-2">
                {material.source === "user" && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toggleFavorite(material.id)}>
                    <Heart className={`h-4 w-4 ${material.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                {material.source === "user" && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 hover:text-red-500"
                      onClick={() => deleteMaterial(material.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
            </div>

            {material.uploadDate && <p className="text-xs text-gray-500 mt-2">Uploaded: {material.uploadDate}</p>}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Layout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Materials Library</h1>
            <p className="text-gray-400">Manage your fabric collection and discover new materials</p>
          </div>

          <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Upload Custom Material</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="material-name">Material Name *</Label>
                  <Input
                    id="material-name"
                    value={materialName}
                    onChange={(e) => setMaterialName(e.target.value)}
                    placeholder="Enter material name"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material-type">Type *</Label>
                    <Input
                      id="material-type"
                      value={materialType}
                      onChange={(e) => setMaterialType(e.target.value)}
                      placeholder="e.g., Cotton, Silk"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material-composition">Composition *</Label>
                    <Input
                      id="material-composition"
                      value={materialComposition}
                      onChange={(e) => setMaterialComposition(e.target.value)}
                      placeholder="e.g., 100% Cotton"
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="material-description">Description</Label>
                  <Input
                    id="material-description"
                    value={materialDescription}
                    onChange={(e) => setMaterialDescription(e.target.value)}
                    placeholder="Brief description of the material"
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
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  {materialFile && <p className="text-sm text-green-400 mt-2">{materialFile.name}</p>}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowUploadDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadMaterial}
                    disabled={!materialName || !materialType || !materialComposition}
                    className="flex-1"
                  >
                    Upload Material
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-sm"
          >
            <option value="all">All Types</option>
            <option value="canvas">Canvas</option>
            <option value="satin & silk">Satin & Silk</option>
            <option value="flannel">Flannel</option>
            <option value="denim">Denim</option>
            <option value="linen">Linen</option>
          </select>

          <div className="flex items-center border border-gray-700 rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Materials Content */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="all">All Materials ({filteredMaterials.length})</TabsTrigger>
            <TabsTrigger value="admin">Admin Materials ({adminMaterials.length})</TabsTrigger>
            <TabsTrigger value="custom">My Materials ({userMaterials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredMaterials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMaterials.map((material) => (
                  <MaterialListItem key={material.id} material={material} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {adminMaterials.map((material) => (
                  <MaterialCard key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {adminMaterials.map((material) => (
                  <MaterialListItem key={material.id} material={material} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom" className="mt-6">
            {userMaterials.length === 0 ? (
              <div className="text-center py-12">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No custom materials yet</h3>
                <p className="text-gray-400 mb-4">Upload your own materials to get started</p>
                <Button onClick={() => setShowUploadDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Material
                </Button>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {userMaterials.map((material) => (
                      <MaterialCard key={material.id} material={material} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userMaterials.map((material) => (
                      <MaterialListItem key={material.id} material={material} />
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
