"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Search, Filter, Edit, Trash2, Check, X, Eye, Upload, Leaf, Star, Package } from "lucide-react"

const materials = [
  {
    id: 1,
    name: "Premium Cotton",
    type: "Natural",
    composition: "100% Organic Cotton",
    price: 25.99,
    stock: 150,
    sustainability: 5,
    image: "/placeholder.svg?height=100&width=100",
    description: "High-quality organic cotton perfect for casual wear",
    supplier: "EcoTextiles Ltd",
    addedDate: "2024-01-10",
  },
  {
    id: 2,
    name: "Recycled Polyester",
    type: "Synthetic",
    composition: "100% Recycled PET",
    price: 18.5,
    stock: 200,
    sustainability: 4,
    image: "/placeholder.svg?height=100&width=100",
    description: "Sustainable recycled polyester from plastic bottles",
    supplier: "GreenFiber Co",
    addedDate: "2024-01-08",
  },
  {
    id: 3,
    name: "Merino Wool",
    type: "Natural",
    composition: "100% Merino Wool",
    price: 45.0,
    stock: 75,
    sustainability: 4,
    image: "/placeholder.svg?height=100&width=100",
    description: "Luxurious merino wool for premium garments",
    supplier: "WoolCraft Inc",
    addedDate: "2024-01-05",
  },
]

const userSubmissions = [
  {
    id: 1,
    name: "Bamboo Fiber",
    type: "Natural",
    composition: "100% Bamboo",
    submittedBy: "Sarah Wilson",
    userEmail: "sarah@example.com",
    userAvatar: "/placeholder-user.jpg",
    submissionDate: "2024-01-15",
    status: "pending",
    description: "Sustainable bamboo fiber with antibacterial properties",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Hemp Canvas",
    type: "Natural",
    composition: "100% Hemp",
    submittedBy: "Mike Johnson",
    userEmail: "mike@example.com",
    userAvatar: "/placeholder-user.jpg",
    submissionDate: "2024-01-14",
    status: "pending",
    description: "Durable hemp canvas for outerwear",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function AdminMaterials() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null)
  const [newMaterial, setNewMaterial] = useState({
    name: "",
    type: "",
    composition: "",
    price: "",
    stock: "",
    sustainability: "",
    description: "",
    supplier: "",
  })

  const handleAddMaterial = () => {
    console.log("Adding material:", newMaterial)
    setIsAddModalOpen(false)
    setNewMaterial({
      name: "",
      type: "",
      composition: "",
      price: "",
      stock: "",
      sustainability: "",
      description: "",
      supplier: "",
    })
  }

  const handleApproveSubmission = (id: number) => {
    console.log("Approving submission:", id)
  }

  const handleRejectSubmission = (id: number) => {
    console.log("Rejecting submission:", id)
  }

  const getSustainabilityBadge = (rating: number) => {
    if (rating >= 4)
      return (
        <Badge className="bg-green-900/30 text-green-400">
          <Leaf className="w-3 h-3 mr-1" />
          Eco-Friendly
        </Badge>
      )
    if (rating >= 3) return <Badge className="bg-yellow-900/30 text-yellow-400">Moderate</Badge>
    return <Badge className="bg-red-900/30 text-red-400">Low Impact</Badge>
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-900/30 text-yellow-400">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-900/30 text-green-400">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-900/30 text-red-400">Rejected</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Material Management</h1>
          <p className="text-gray-400">Manage materials library and user submissions</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Material</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Material Name</Label>
                <Input
                  id="name"
                  value={newMaterial.name}
                  onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
                  placeholder="Enter material name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newMaterial.type}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="synthetic">Synthetic</SelectItem>
                    <SelectItem value="blend">Blend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="composition">Composition</Label>
                <Input
                  id="composition"
                  value={newMaterial.composition}
                  onChange={(e) => setNewMaterial({ ...newMaterial, composition: e.target.value })}
                  placeholder="e.g., 100% Cotton"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price per yard (£)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newMaterial.price}
                  onChange={(e) => setNewMaterial({ ...newMaterial, price: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={newMaterial.stock}
                  onChange={(e) => setNewMaterial({ ...newMaterial, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sustainability">Sustainability Rating (1-5)</Label>
                <Select
                  value={newMaterial.sustainability}
                  onValueChange={(value) => setNewMaterial({ ...newMaterial, sustainability: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Low</SelectItem>
                    <SelectItem value="2">2 - Fair</SelectItem>
                    <SelectItem value="3">3 - Good</SelectItem>
                    <SelectItem value="4">4 - Very Good</SelectItem>
                    <SelectItem value="5">5 - Excellent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={newMaterial.supplier}
                  onChange={(e) => setNewMaterial({ ...newMaterial, supplier: e.target.value })}
                  placeholder="Supplier name"
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({ ...newMaterial, description: e.target.value })}
                  placeholder="Material description"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddMaterial}>Add Material</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.length}</div>
            <p className="text-xs text-gray-400">Active materials</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
            <Upload className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userSubmissions.length}</div>
            <p className="text-xs text-gray-400">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eco-Friendly</CardTitle>
            <Leaf className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.filter((m) => m.sustainability >= 4).length}</div>
            <p className="text-xs text-gray-400">Sustainable options</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{materials.filter((m) => m.stock < 100).length}</div>
            <p className="text-xs text-gray-400">Need restocking</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="library">Materials Library</TabsTrigger>
          <TabsTrigger value="submissions">User Submissions ({userSubmissions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="library" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material) => (
              <Card key={material.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={material.image || "/placeholder.svg"}
                        alt={material.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{material.name}</h3>
                        <p className="text-sm text-gray-400">{material.type}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-400">Composition</p>
                    <p className="text-sm">{material.composition}</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Price</p>
                      <p className="font-semibold">£{material.price}/yard</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Stock</p>
                      <p className="font-semibold">{material.stock} yards</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    {getSustainabilityBadge(material.sustainability)}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < material.sustainability ? "text-yellow-400 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{material.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          <div className="grid gap-6">
            {userSubmissions.map((submission) => (
              <Card key={submission.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={submission.image || "/placeholder.svg"}
                      alt={submission.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{submission.name}</h3>
                          <p className="text-gray-400">{submission.composition}</p>
                          <p className="text-sm text-gray-500 mt-1">{submission.description}</p>
                        </div>
                        {getStatusBadge(submission.status)}
                      </div>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={submission.userAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{submission.submittedBy.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{submission.submittedBy}</p>
                            <p className="text-xs text-gray-400">{submission.userEmail}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-400">Submitted: {submission.submissionDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleApproveSubmission(submission.id)}>
                        <Check className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRejectSubmission(submission.id)}>
                        <X className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
