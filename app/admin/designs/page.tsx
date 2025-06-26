"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Upload,
  Download,
  Palette,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

const designs = [
  {
    id: "DES-001",
    name: "Modern Blazer",
    designer: "Sarah Wilson",
    designerEmail: "sarah@example.com",
    designerAvatar: "/placeholder-user.jpg",
    status: "pending_review",
    submissionDate: "2024-01-15",
    category: "Formal Wear",
    materials: ["Premium Cotton", "Silk Lining"],
    images: [
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
      "/placeholder.svg?height=300&width=300",
    ],
    description: "A modern take on the classic blazer with contemporary cuts and sustainable materials.",
    comments: [
      {
        id: 1,
        author: "Admin",
        message: "Great design! Please adjust the shoulder width slightly.",
        date: "2024-01-16",
        type: "feedback",
      },
    ],
    modelFile: null,
    specifications: {
      sizes: ["XS", "S", "M", "L", "XL"],
      colors: ["Navy", "Charcoal", "Black"],
      estimatedCost: 89.99,
    },
  },
  {
    id: "DES-002",
    name: "Vintage Coat",
    designer: "Tom Brown",
    designerEmail: "tom@example.com",
    designerAvatar: "/placeholder-user.jpg",
    status: "approved",
    submissionDate: "2024-01-14",
    category: "Outerwear",
    materials: ["Merino Wool", "Cotton Lining"],
    images: ["/placeholder.svg?height=300&width=300", "/placeholder.svg?height=300&width=300"],
    description: "Classic vintage-inspired coat with modern functionality.",
    comments: [],
    modelFile: "vintage-coat-3d.glb",
    specifications: {
      sizes: ["S", "M", "L", "XL"],
      colors: ["Camel", "Navy", "Forest Green"],
      estimatedCost: 149.99,
    },
  },
  {
    id: "DES-003",
    name: "Sport Jacket",
    designer: "Lisa Davis",
    designerEmail: "lisa@example.com",
    designerAvatar: "/placeholder-user.jpg",
    status: "needs_revision",
    submissionDate: "2024-01-13",
    category: "Casual Wear",
    materials: ["Recycled Polyester", "Mesh Lining"],
    images: ["/placeholder.svg?height=300&width=300"],
    description: "Athletic-inspired jacket for active lifestyle.",
    comments: [
      {
        id: 1,
        author: "Admin",
        message: "Please revise the zipper placement and add more ventilation panels.",
        date: "2024-01-14",
        type: "revision",
      },
    ],
    modelFile: null,
    specifications: {
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["Black", "Navy", "Gray"],
      estimatedCost: 69.99,
    },
  },
]

export default function AdminDesigns() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDesign, setSelectedDesign] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [newComment, setNewComment] = useState("")
  const [modelFileName, setModelFileName] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-900/30 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "needs_revision":
        return (
          <Badge className="bg-red-900/30 text-red-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            Needs Revision
          </Badge>
        )
      case "in_production":
        return <Badge className="bg-blue-900/30 text-blue-400">In Production</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  const handleStatusChange = (designId: string, newStatus: string) => {
    console.log(`Changing status of ${designId} to ${newStatus}`)
  }

  const handleAddComment = () => {
    if (newComment.trim()) {
      console.log("Adding comment:", newComment)
      setNewComment("")
    }
  }

  const handleUploadModel = () => {
    if (modelFileName.trim()) {
      console.log("Uploading 3D model:", modelFileName)
      setModelFileName("")
    }
  }

  const filteredDesigns = designs.filter((design) => {
    const matchesSearch =
      design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.designer.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && design.status === "pending_review"
    if (activeTab === "approved") return matchesSearch && design.status === "approved"
    if (activeTab === "revision") return matchesSearch && design.status === "needs_revision"

    return matchesSearch
  })

  const getDesignCounts = () => {
    return {
      all: designs.length,
      pending: designs.filter((d) => d.status === "pending_review").length,
      approved: designs.filter((d) => d.status === "approved").length,
      revision: designs.filter((d) => d.status === "needs_revision").length,
    }
  }

  const counts = getDesignCounts()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Design Management</h1>
          <p className="text-gray-400">Review and manage user design submissions</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Designs</CardTitle>
            <Palette className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
            <p className="text-xs text-gray-400">All submissions</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.pending}</div>
            <p className="text-xs text-gray-400">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.approved}</div>
            <p className="text-xs text-gray-400">Ready for production</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Need Revision</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.revision}</div>
            <p className="text-xs text-gray-400">Require changes</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search designs or designers..."
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

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
          <TabsTrigger value="revision">Revision ({counts.revision})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Designs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{design.name}</h3>
                      <p className="text-sm text-gray-400">{design.category}</p>
                      <p className="text-xs text-gray-500">ID: {design.id}</p>
                    </div>
                    {getStatusBadge(design.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={design.images[0] || "/placeholder.svg"}
                      alt={design.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={design.designerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{design.designer.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{design.designer}</p>
                      <p className="text-xs text-gray-400">{design.submissionDate}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSelectedDesign(design)
                        setIsDetailModalOpen(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Design Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDesign && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedDesign.name}</span>
                  {getStatusBadge(selectedDesign.status)}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Images and Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDesign.images.map((image: string, index: number) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${selectedDesign.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Designer Information</h4>
                      <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                        <Avatar>
                          <AvatarImage src={selectedDesign.designerAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedDesign.designer.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedDesign.designer}</p>
                          <p className="text-sm text-gray-400">{selectedDesign.designerEmail}</p>
                        </div>
                        <Button variant="outline" size="sm" className="ml-auto">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Description</h4>
                      <p className="text-sm text-gray-300">{selectedDesign.description}</p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Materials</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedDesign.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Specifications</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Sizes</p>
                          <p>{selectedDesign.specifications.sizes.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Colors</p>
                          <p>{selectedDesign.specifications.colors.join(", ")}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Estimated Cost</p>
                          <p>£{selectedDesign.specifications.estimatedCost}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Submitted</p>
                          <p>{selectedDesign.submissionDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Actions and Comments */}
                <div className="space-y-4">
                  {/* Status Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => handleStatusChange(selectedDesign.id, "approved")}
                        className="bg-green-900/30 hover:bg-green-900/50 text-green-400"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleStatusChange(selectedDesign.id, "needs_revision")}
                        variant="outline"
                        className="border-red-900/50 text-red-400 hover:bg-red-900/20"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Request Revision
                      </Button>
                      <Button
                        onClick={() => handleStatusChange(selectedDesign.id, "in_production")}
                        className="col-span-2"
                      >
                        Move to Production
                      </Button>
                    </div>
                  </div>

                  {/* 3D Model Upload */}
                  <div>
                    <h4 className="font-medium mb-3">3D Model</h4>
                    {selectedDesign.modelFile ? (
                      <div className="p-3 bg-gray-800 rounded-lg">
                        <p className="text-sm text-green-400 mb-2">✓ Model uploaded: {selectedDesign.modelFile}</p>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Input
                          placeholder="Enter 3D model filename (e.g., model.glb)"
                          value={modelFileName}
                          onChange={(e) => setModelFileName(e.target.value)}
                        />
                        <Button onClick={handleUploadModel} className="w-full">
                          <Upload className="w-4 h-4 mr-1" />
                          Upload 3D Model
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Comments Section */}
                  <div>
                    <h4 className="font-medium mb-3">Comments & Feedback</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedDesign.comments.map((comment: any) => (
                        <div key={comment.id} className="p-3 bg-gray-800 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{comment.author}</span>
                            <span className="text-xs text-gray-400">{comment.date}</span>
                          </div>
                          <p className="text-sm text-gray-300">{comment.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 space-y-2">
                      <Textarea
                        placeholder="Add your feedback or comments..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <Button onClick={handleAddComment} className="w-full">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
