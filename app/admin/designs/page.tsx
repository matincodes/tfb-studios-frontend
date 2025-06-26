"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Eye,
  MessageCircle,
  Upload,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  FileUp,
  CuboidIcon as Cube,
} from "lucide-react"
import Image from "next/image"

export default function AdminDesigns() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDesign, setSelectedDesign] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [comment, setComment] = useState("")
  const [modelFile, setModelFile] = useState<File | null>(null)
  const [modelName, setModelName] = useState("")

  // Mock data for user designs
  const designs = [
    {
      id: 1,
      name: "Modern Blazer",
      designer: "Sarah Wilson",
      email: "sarah@example.com",
      status: "pending_review",
      submissionDate: "2024-01-15",
      category: "Formal",
      description: "A modern take on the classic blazer with sustainable materials",
      materials: ["Organic Cotton", "Recycled Polyester"],
      images: ["/placeholder.svg?height=400&width=400", "/placeholder.svg?height=400&width=400"],
      comments: [
        {
          id: 1,
          author: "Admin",
          message: "Great concept! Please adjust the collar design.",
          date: "2024-01-14",
        },
      ],
      hasModel: false,
      modelName: "",
    },
    {
      id: 2,
      name: "Vintage Coat",
      designer: "Tom Brown",
      email: "tom@example.com",
      status: "approved",
      submissionDate: "2024-01-12",
      category: "Outerwear",
      description: "Vintage-inspired coat with modern functionality",
      materials: ["Wool", "Cotton Lining"],
      images: ["/placeholder.svg?height=400&width=400"],
      comments: [
        {
          id: 1,
          author: "Admin",
          message: "Approved for production. Excellent work!",
          date: "2024-01-13",
        },
      ],
      hasModel: true,
      modelName: "vintage-coat-3d.glb",
    },
    {
      id: 3,
      name: "Sport Jacket",
      designer: "Lisa Davis",
      email: "lisa@example.com",
      status: "needs_revision",
      submissionDate: "2024-01-10",
      category: "Casual",
      description: "Athletic-inspired jacket for everyday wear",
      materials: ["Bamboo Fiber", "Recycled Polyester"],
      images: ["/placeholder.svg?height=400&width=400"],
      comments: [
        {
          id: 1,
          author: "Admin",
          message: "Please revise the sleeve length and add more ventilation.",
          date: "2024-01-11",
        },
      ],
      hasModel: false,
      modelName: "",
    },
    {
      id: 4,
      name: "Summer Dress",
      designer: "Emma Johnson",
      email: "emma@example.com",
      status: "in_production",
      submissionDate: "2024-01-08",
      category: "Casual",
      description: "Light and airy summer dress perfect for warm weather",
      materials: ["Organic Linen", "Cotton"],
      images: ["/placeholder.svg?height=400&width=400"],
      comments: [
        {
          id: 1,
          author: "Admin",
          message: "Moving to production phase. Great design!",
          date: "2024-01-09",
        },
      ],
      hasModel: true,
      modelName: "summer-dress-3d.glb",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending_review":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending Review
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-900/30 text-green-400 border-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "needs_revision":
        return (
          <Badge className="bg-red-900/30 text-red-400 border-red-700">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Needs Revision
          </Badge>
        )
      case "in_production":
        return (
          <Badge className="bg-blue-900/30 text-blue-400 border-blue-700">
            <Cube className="w-3 h-3 mr-1" />
            In Production
          </Badge>
        )
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  const handleViewDesign = (design: any) => {
    setSelectedDesign(design)
    setIsDetailModalOpen(true)
  }

  const handleStatusChange = (designId: number, newStatus: string) => {
    console.log(`Changing design ${designId} status to ${newStatus}`)
    alert(`Design status changed to ${newStatus}`)
  }

  const handleAddComment = () => {
    if (!comment.trim()) return

    console.log("Adding comment:", comment)
    setComment("")
    alert("Comment added successfully!")
  }

  const handleModelUpload = () => {
    if (!modelFile || !modelName.trim()) {
      alert("Please select a file and enter a model name")
      return
    }

    console.log("Uploading 3D model:", { file: modelFile, name: modelName })
    setModelFile(null)
    setModelName("")
    alert("3D model uploaded successfully!")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModelFile(e.target.files[0])
    }
  }

  const filteredDesigns = designs.filter(
    (design) =>
      design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.designer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      design.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingDesigns = filteredDesigns.filter((d) => d.status === "pending_review")
  const approvedDesigns = filteredDesigns.filter((d) => d.status === "approved")
  const revisionDesigns = filteredDesigns.filter((d) => d.status === "needs_revision")
  const productionDesigns = filteredDesigns.filter((d) => d.status === "in_production")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Design Management</h1>
          <p className="text-gray-400">Review and manage user-submitted designs</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search designs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingDesigns.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Approved</p>
                <p className="text-2xl font-bold text-green-400">{approvedDesigns.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Need Revision</p>
                <p className="text-2xl font-bold text-red-400">{revisionDesigns.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">In Production</p>
                <p className="text-2xl font-bold text-blue-400">{productionDesigns.length}</p>
              </div>
              <Cube className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Designs Grid */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all" className="data-[state=active]:bg-gray-800">
            All Designs ({filteredDesigns.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-gray-800">
            Pending ({pendingDesigns.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-gray-800">
            Approved ({approvedDesigns.length})
          </TabsTrigger>
          <TabsTrigger value="revision" className="data-[state=active]:bg-gray-800">
            Revision ({revisionDesigns.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDesigns.map((design) => (
              <Card key={design.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={design.images[0] || "/placeholder.svg"} alt={design.name} fill className="object-cover" />
                  {design.hasModel && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-700">
                        <Cube className="w-3 h-3 mr-1" />
                        3D Model
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{design.name}</h3>
                    {getStatusBadge(design.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">by {design.designer}</p>
                  <p className="text-xs text-gray-500 mb-3">{design.category}</p>
                  <p className="text-xs text-gray-400 mb-3 line-clamp-2">{design.description}</p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.materials.map((material, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-600">
                        {material}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 h-8" onClick={() => handleViewDesign(design)}>
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                      <MessageCircle className="w-3 h-3" />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Submitted {new Date(design.submissionDate).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingDesigns.map((design) => (
              <Card key={design.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={design.images[0] || "/placeholder.svg"} alt={design.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{design.name}</h3>
                    {getStatusBadge(design.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">by {design.designer}</p>
                  <p className="text-xs text-gray-500 mb-3">{design.category}</p>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 h-8 bg-green-600 hover:bg-green-700"
                      onClick={() => handleStatusChange(design.id, "approved")}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 border-red-600 text-red-400 hover:bg-red-900/20"
                      onClick={() => handleStatusChange(design.id, "needs_revision")}
                    >
                      <XCircle className="w-3 h-3 mr-1" />
                      Reject
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="approved">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {approvedDesigns.map((design) => (
              <Card key={design.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={design.images[0] || "/placeholder.svg"} alt={design.name} fill className="object-cover" />
                  {design.hasModel && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-900/30 text-blue-400 border-blue-700">
                        <Cube className="w-3 h-3 mr-1" />
                        3D Model
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{design.name}</h3>
                    {getStatusBadge(design.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">by {design.designer}</p>
                  <p className="text-xs text-gray-500 mb-3">{design.category}</p>

                  <Button variant="outline" size="sm" className="w-full h-8" onClick={() => handleViewDesign(design)}>
                    <Eye className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="revision">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {revisionDesigns.map((design) => (
              <Card key={design.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video relative">
                  <Image src={design.images[0] || "/placeholder.svg"} alt={design.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium truncate">{design.name}</h3>
                    {getStatusBadge(design.status)}
                  </div>
                  <p className="text-sm text-gray-400 mb-1">by {design.designer}</p>
                  <p className="text-xs text-gray-500 mb-3">{design.category}</p>

                  <Button variant="outline" size="sm" className="w-full h-8" onClick={() => handleViewDesign(design)}>
                    <MessageCircle className="w-3 h-3 mr-1" />
                    View Feedback
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Design Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDesign && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedDesign.name}</span>
                  {getStatusBadge(selectedDesign.status)}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Design Images */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedDesign.images.map((image: string, index: number) => (
                    <div key={index} className="aspect-video relative bg-gray-800 rounded-lg overflow-hidden">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Design ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Design Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Design Information</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-400">Designer:</span> {selectedDesign.designer}
                      </p>
                      <p>
                        <span className="text-gray-400">Email:</span> {selectedDesign.email}
                      </p>
                      <p>
                        <span className="text-gray-400">Category:</span> {selectedDesign.category}
                      </p>
                      <p>
                        <span className="text-gray-400">Submitted:</span>{" "}
                        {new Date(selectedDesign.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-400 mb-2">Materials:</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedDesign.materials.map((material: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-gray-600">
                            {material}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-400 mb-2">Description:</p>
                      <p className="text-sm">{selectedDesign.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">3D Model Upload</h3>
                    {selectedDesign.hasModel ? (
                      <div className="p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Cube className="h-5 w-5 text-blue-400" />
                          <span className="text-sm font-medium">3D Model Available</span>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">Model: {selectedDesign.modelName}</p>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-3 h-3 mr-1" />
                          Download Model
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="model-name">Model Name</Label>
                          <Input
                            id="model-name"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            placeholder="Enter 3D model name"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-400 mb-2">Upload 3D model file (.glb, .gltf)</p>
                          <Label
                            htmlFor="model-file"
                            className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm inline-flex items-center"
                          >
                            <FileUp className="mr-2 h-4 w-4" />
                            Browse Files
                          </Label>
                          <Input
                            id="model-file"
                            type="file"
                            accept=".glb,.gltf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {modelFile && <p className="text-sm text-green-400 mt-2">{modelFile.name}</p>}
                        </div>
                        <Button onClick={handleModelUpload} className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Upload 3D Model
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Comments & Feedback</h3>
                  <div className="space-y-3 mb-4">
                    {selectedDesign.comments.map((comment: any) => (
                      <div key={comment.id} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <Textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add your feedback..."
                      className="bg-gray-800 border-gray-700"
                    />
                    <Button onClick={handleAddComment} className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusChange(selectedDesign.id, "approved")}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Design
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                    onClick={() => handleStatusChange(selectedDesign.id, "needs_revision")}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Request Revision
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleStatusChange(selectedDesign.id, "in_production")}
                  >
                    <Cube className="w-4 h-4 mr-2" />
                    Move to Production
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
