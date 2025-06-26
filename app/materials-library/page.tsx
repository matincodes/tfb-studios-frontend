"use client"

import type React from "react"
import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Upload, FileUp, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Package } from "lucide-react"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Material {
  id: string
  name: string
  type: string
  composition: string
  price?: string
  thumbnail: string
  inStock: boolean
  source: "user" | "admin"
  uploadedAt: string
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
    uploadedAt: "2024-01-15",
    description: "High-quality organic cotton canvas perfect for structured garments",
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
    uploadedAt: "2024-01-10",
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
    uploadedAt: "2024-01-08",
    description: "Soft merino wool flannel ideal for winter garments",
  },
  // User materials
  {
    id: "user-custom-denim",
    name: "Vintage Denim",
    type: "Denim",
    composition: "100% Cotton Denim",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "user",
    uploadedAt: "2024-01-20",
    description: "Custom vintage-style denim fabric",
  },
  {
    id: "user-linen-blend",
    name: "Linen Cotton Blend",
    type: "Linen",
    composition: "60% Linen, 40% Cotton",
    thumbnail: "/placeholder.svg?height=200&width=200",
    inStock: true,
    source: "user",
    uploadedAt: "2024-01-18",
    description: "Breathable linen-cotton blend for summer wear",
  },
]

export default function MaterialsLibraryPage() {
  const [materials, setMaterials] = useState<Material[]>(sampleMaterials)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  // Upload form states
  const [materialName, setMaterialName] = useState("")
  const [materialType, setMaterialType] = useState("")
  const [materialComposition, setMaterialComposition] = useState("")
  const [materialDescription, setMaterialDescription] = useState("")
  const [materialFile, setMaterialFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  // Filter materials based on search and type
  const filteredMaterials = materials.filter((material) => {
    const matchesSearch =
      material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.composition.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || material.type.toLowerCase() === selectedType.toLowerCase()
    return matchesSearch && matchesType
  })

  const userMaterials = filteredMaterials.filter((m) => m.source === "user")
  const adminMaterials = filteredMaterials.filter((m) => m.source === "admin")

  // File upload handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setMaterialFile(e.dataTransfer.files[0])
    }
  }

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
        description: materialDescription,
        thumbnail: materialFile ? URL.createObjectURL(materialFile) : "/placeholder.svg?height=200&width=200",
        inStock: true,
        source: "user",
        uploadedAt: new Date().toISOString().split("T")[0],
      }

      setMaterials((prev) => [newMaterial, ...prev])

      // Reset form
      setMaterialName("")
      setMaterialType("")
      setMaterialComposition("")
      setMaterialDescription("")
      setMaterialFile(null)
      setIsUploadDialogOpen(false)
    }
  }

  const handleDeleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id))
  }

  const materialTypes = ["all", ...Array.from(new Set(materials.map((m) => m.type)))]

  return (
    <Layout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Package className="h-6 w-6" />
              Materials Library
            </h1>
            <p className="text-gray-400 mt-1">Manage your custom materials and browse available fabrics</p>
          </div>

          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upload Material
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Custom Material</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material-name">Material Name *</Label>
                    <Input
                      id="material-name"
                      value={materialName}
                      onChange={(e) => setMaterialName(e.target.value)}
                      placeholder="Enter material name"
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material-type">Material Type *</Label>
                    <Input
                      id="material-type"
                      value={materialType}
                      onChange={(e) => setMaterialType(e.target.value)}
                      placeholder="e.g., Cotton, Silk, Wool"
                      className="bg-gray-900 border-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="material-composition">Composition *</Label>
                  <Input
                    id="material-composition"
                    value={materialComposition}
                    onChange={(e) => setMaterialComposition(e.target.value)}
                    placeholder="e.g., 100% Organic Cotton"
                    className="bg-gray-900 border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="material-description">Description</Label>
                  <Textarea
                    id="material-description"
                    value={materialDescription}
                    onChange={(e) => setMaterialDescription(e.target.value)}
                    placeholder="Describe the material properties, feel, and best use cases..."
                    className="bg-gray-900 border-gray-700"
                    rows={3}
                  />
                </div>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                    dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center text-center">
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
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
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUploadMaterial}
                    disabled={!materialName || !materialType || !materialComposition}
                  >
                    Upload Material
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-sm"
            >
              {materialTypes.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Materials Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Materials ({filteredMaterials.length})</TabsTrigger>
            <TabsTrigger value="user">My Materials ({userMaterials.length})</TabsTrigger>
            <TabsTrigger value="admin">Available Materials ({adminMaterials.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <MaterialGrid materials={filteredMaterials} onDelete={handleDeleteMaterial} showSource={true} />
          </TabsContent>

          <TabsContent value="user" className="mt-6">
            <MaterialGrid
              materials={userMaterials}
              onDelete={handleDeleteMaterial}
              showSource={false}
              emptyMessage="You haven't uploaded any custom materials yet. Click 'Upload Material' to add your first one."
            />
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <MaterialGrid
              materials={adminMaterials}
              onDelete={handleDeleteMaterial}
              showSource={false}
              canDelete={false}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

interface MaterialGridProps {
  materials: Material[]
  onDelete: (id: string) => void
  showSource?: boolean
  canDelete?: boolean
  emptyMessage?: string
}

function MaterialGrid({ materials, onDelete, showSource = false, canDelete = true, emptyMessage }: MaterialGridProps) {
  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">{emptyMessage || "No materials found matching your criteria."}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {materials.map((material) => (
        <Card key={material.id} className="bg-gray-900 border-gray-800 hover:border-gray-600 transition-colors">
          <CardContent className="p-4">
            <div className="aspect-square relative rounded-md overflow-hidden mb-3">
              <Image src={material.thumbnail || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
              {showSource && (
                <Badge variant={material.source === "user" ? "default" : "secondary"} className="absolute top-2 left-2">
                  {material.source === "user" ? "Custom" : "Available"}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-sm leading-tight">{material.name}</h4>
                {canDelete && material.source === "user" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400" onClick={() => onDelete(material.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              <p className="text-xs text-gray-400">{material.type}</p>
              <p className="text-xs text-gray-500">{material.composition}</p>

              {material.description && <p className="text-xs text-gray-400 line-clamp-2">{material.description}</p>}

              <div className="flex justify-between items-center pt-2">
                {material.price ? (
                  <span className="text-xs font-medium">{material.price}</span>
                ) : (
                  <span className="text-xs text-gray-500">Custom</span>
                )}
                <Badge variant={material.inStock ? "default" : "secondary"} className="text-xs">
                  {material.inStock ? "Available" : "Out of Stock"}
                </Badge>
              </div>

              <p className="text-xs text-gray-500">Added {new Date(material.uploadedAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
