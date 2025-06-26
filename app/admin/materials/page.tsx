"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Edit, Trash2, Upload, Eye, Leaf, AlertCircle, CheckCircle, FileUp } from "lucide-react"
import Image from "next/image"

export default function AdminMaterials() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [materialName, setMaterialName] = useState("")
  const [materialType, setMaterialType] = useState("")
  const [composition, setComposition] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [sustainability, setSustainability] = useState("")
  const [materialFile, setMaterialFile] = useState<File | null>(null)

  // Mock data for admin materials
  const adminMaterials = [
    {
      id: 1,
      name: "Organic Cotton Premium",
      type: "Cotton",
      composition: "100% Organic Cotton",
      price: 25.99,
      sustainability: "A+",
      inStock: true,
      stockQuantity: 150,
      description: "Premium organic cotton sourced from certified farms",
      image: "/placeholder.svg?height=200&width=200",
      addedDate: "2024-01-10",
    },
    {
      id: 2,
      name: "Recycled Polyester Blend",
      type: "Polyester",
      composition: "100% Recycled Polyester",
      price: 18.5,
      sustainability: "A",
      inStock: true,
      stockQuantity: 200,
      description: "Made from recycled plastic bottles",
      image: "/placeholder.svg?height=200&width=200",
      addedDate: "2024-01-08",
    },
    {
      id: 3,
      name: "Hemp Canvas Heavy",
      type: "Hemp",
      composition: "100% Hemp",
      price: 32.0,
      sustainability: "A+",
      inStock: false,
      stockQuantity: 0,
      description: "Durable hemp canvas for structured garments",
      image: "/placeholder.svg?height=200&width=200",
      addedDate: "2024-01-05",
    },
  ]

  // Mock data for user submitted materials
  const userMaterials = [
    {
      id: 1,
      name: "Custom Silk Blend",
      type: "Silk",
      composition: "60% Silk, 40% Cotton",
      submittedBy: "John Doe",
      submissionDate: "2024-01-15",
      status: "pending",
      image: "/placeholder.svg?height=200&width=200",
      notes: "User submitted for custom jacket project",
    },
    {
      id: 2,
      name: "Vintage Denim",
      type: "Denim",
      composition: "100% Cotton",
      submittedBy: "Jane Smith",
      submissionDate: "2024-01-12",
      status: "approved",
      image: "/placeholder.svg?height=200&width=200",
      notes: "Approved for general use",
    },
    {
      id: 3,
      name: "Synthetic Leather",
      type: "Synthetic",
      composition: "PU Leather",
      submittedBy: "Mike Johnson",
      submissionDate: "2024-01-10",
      status: "rejected",
      image: "/placeholder.svg?height=200&width=200",
      notes: "Does not meet sustainability standards",
    },
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaterialFile(e.target.files[0])
    }
  }

  const handleAddMaterial = () => {
    if (!materialName || !materialType || !composition || !price) {
      alert("Please fill in all required fields")
      return
    }

    console.log("Adding material:", {
      name: materialName,
      type: materialType,
      composition,
      description,
      price: Number.parseFloat(price),
      sustainability,
      file: materialFile,
    })

    // Reset form
    setMaterialName("")
    setMaterialType("")
    setComposition("")
    setDescription("")
    setPrice("")
    setSustainability("")
    setMaterialFile(null)
    setIsAddModalOpen(false)

    alert("Material added successfully!")
  }

  const handleApproveUserMaterial = (id: number) => {
    console.log("Approving material:", id)
    alert("Material approved and added to library!")
  }

  const handleRejectUserMaterial = (id: number) => {
    console.log("Rejecting material:", id)
    alert("Material rejected!")
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
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-900/30 text-red-400 border-red-700">
            <AlertCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  const filteredAdminMaterials = adminMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredUserMaterials = userMaterials.filter(
    (material) =>
      material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Materials Management</h1>
          <p className="text-gray-400">Manage materials library and user submissions</p>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
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
              <div>
                <Label htmlFor="material-type">Material Type *</Label>
                <Select value={materialType} onValueChange={setMaterialType}>
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
                    <SelectItem value="hemp">Hemp</SelectItem>
                    <SelectItem value="bamboo">Bamboo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="composition">Composition *</Label>
                <Input
                  id="composition"
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  placeholder="e.g., 100% Cotton"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="price">Price per meter (£) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="sustainability">Sustainability Rating</Label>
                <Select value={sustainability} onValueChange={setSustainability}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="A+">A+ (Excellent)</SelectItem>
                    <SelectItem value="A">A (Very Good)</SelectItem>
                    <SelectItem value="B">B (Good)</SelectItem>
                    <SelectItem value="C">C (Fair)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the material..."
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="material-image">Material Sample Image</Label>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-400 mb-2">Upload material sample image</p>
                  <Label
                    htmlFor="material-image"
                    className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm inline-flex items-center"
                  >
                    <FileUp className="mr-2 h-4 w-4" />
                    Browse Files
                  </Label>
                  <Input
                    id="material-image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {materialFile && <p className="text-sm text-green-400 mt-2">{materialFile.name}</p>}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddMaterial} className="flex-1">
                  Add Material
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddModalOpen(false)
                    setMaterialName("")
                    setMaterialType("")
                    setComposition("")
                    setDescription("")
                    setPrice("")
                    setSustainability("")
                    setMaterialFile(null)
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search materials..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="admin-materials" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="admin-materials" className="data-[state=active]:bg-gray-800">
            Materials Library ({filteredAdminMaterials.length})
          </TabsTrigger>
          <TabsTrigger value="user-submissions" className="data-[state=active]:bg-gray-800">
            User Submissions ({filteredUserMaterials.length})
          </TabsTrigger>
        </TabsList>

        {/* Admin Materials Tab */}
        <TabsContent value="admin-materials">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAdminMaterials.map((material) => (
              <Card key={material.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={material.image || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
                  {!material.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge className="bg-red-900/30 text-red-400 border-red-700">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{material.name}</h3>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{material.type}</p>
                  <p className="text-xs text-gray-500 mb-3">{material.composition}</p>

                  <div className="flex items-center justify-between mb-3">
                    {getSustainabilityBadge(material.sustainability)}
                    <span className="text-sm font-medium">£{material.price}/m</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-gray-400">Stock: {material.stockQuantity} units</span>
                    <Badge
                      className={material.inStock ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}
                    >
                      {material.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{material.description}</p>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-8">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Added {new Date(material.addedDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* User Submissions Tab */}
        <TabsContent value="user-submissions">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUserMaterials.map((material) => (
              <Card key={material.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-square relative">
                  <Image src={material.image || "/placeholder.svg"} alt={material.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{material.name}</h3>
                    {getStatusBadge(material.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{material.type}</p>
                  <p className="text-xs text-gray-500 mb-3">{material.composition}</p>

                  <div className="mb-3">
                    <p className="text-xs text-gray-400">Submitted by: {material.submittedBy}</p>
                    <p className="text-xs text-gray-500">{new Date(material.submissionDate).toLocaleDateString()}</p>
                  </div>

                  <p className="text-xs text-gray-400 mb-3">{material.notes}</p>

                  {material.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 h-8 bg-green-600 hover:bg-green-700"
                        onClick={() => handleApproveUserMaterial(material.id)}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 h-8 border-red-600 text-red-400 hover:bg-red-900/20"
                        onClick={() => handleRejectUserMaterial(material.id)}
                      >
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {material.status !== "pending" && (
                    <Button variant="outline" size="sm" className="w-full h-8">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
