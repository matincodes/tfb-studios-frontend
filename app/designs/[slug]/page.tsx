"use client"

import { Layout } from "@/components/layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ArrowLeft,
  MoreHorizontal,
  Heart,
  MessageSquare,
  Hand,
  MousePointer,
  ZoomIn,
  Download,
  Eye,
  FileText,
  Package,
  Palette,
  Clock,
  Send,
  RotateCcw,
  Home,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useState, Suspense, useRef, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { useGLTF, Environment, OrbitControls, Center, Html } from "@react-three/drei"
import * as THREE from "three"

// Loading component for 3D models
function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-white">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="text-sm">Loading 3D Model...</p>
      </div>
    </Html>
  )
}

// 3D Model Component with error handling
function Model({ url }: { url: string }) {
  const { scene, error } = useGLTF(url)
  const modelRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (scene && modelRef.current) {
      // Calculate bounding box to properly scale and center the model
      const box = new THREE.Box3().setFromObject(scene)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())

      // Scale the model to fit in a reasonable size
      const maxDimension = Math.max(size.x, size.y, size.z)
      const scale = 2 / maxDimension
      scene.scale.setScalar(scale)

      // Center the model
      scene.position.copy(center).multiplyScalar(-scale)
      scene.position.y -= size.y * scale * 0.5 // Adjust vertical position
    }
  }, [scene])

  if (error) {
    return (
      <Html center>
        <div className="text-red-400 text-center">
          <Package className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Failed to load 3D model</p>
        </div>
      </Html>
    )
  }

  if (!scene) {
    return <LoadingSpinner />
  }

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  )
}

// 3D Scene Component with better lighting and controls
function Scene({ modelUrl }: { modelUrl: string }) {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [5, 5, 5], fov: 50 }}
        style={{ background: "linear-gradient(to bottom, #2a2a2a, #1a1a1a)" }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        {/* Improved lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={0.5} />

        {/* Center the model automatically */}
        <Center>
          <Suspense fallback={<LoadingSpinner />}>
            <Model url={modelUrl} />
          </Suspense>
        </Center>

        {/* Orbit controls for better interaction */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          autoRotate={false}
          autoRotateSpeed={0.5}
        />

        {/* Environment for reflections */}
        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}

export default function DesignDetail({ params }: { params: { slug: string } }) {
  const [newComment, setNewComment] = useState("")
  const [selectedVersion, setSelectedVersion] = useState("v3")

  // Mock data - replace with actual data fetching
  const design = {
    name: "Fashion Collection",
    status: "In Progress",
    files: [
      { name: "jacket-front.jpg", size: "2.4 MB", type: "image" },
      { name: "jacket-back.jpg", size: "2.1 MB", type: "image" },
      { name: "pattern.ai", size: "5.2 MB", type: "vector" },
      { name: "measurements.pdf", size: "1.8 MB", type: "document" },
    ],
    material: {
      name: "Organic Cotton Canvas",
      type: "Canvas",
      composition: "100% Organic Cotton",
      color: "Navy Blue",
      price: "£12.95 per metre",
      supplier: "EcoFabrics Ltd",
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
  }

  const comments = [
    {
      id: 1,
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=32&width=32", role: "Designer" },
      message: "Initial design looks great! The proportions are perfect for the target demographic.",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      user: { name: "Mike Chen", avatar: "/placeholder.svg?height=32&width=32", role: "Production Manager" },
      message: "We need to adjust the sleeve length by 2cm based on the latest measurements.",
      timestamp: "1 day ago",
    },
    {
      id: 3,
      user: { name: "Emma Davis", avatar: "/placeholder.svg?height=32&width=32", role: "Quality Control" },
      message: "Material selection approved. The organic cotton will work well with this design.",
      timestamp: "2 days ago",
    },
  ]

  const versions = [
    {
      id: "v3",
      name: "Jacket v3.0",
      date: "2024-01-20",
      status: "Current",
      changes: "Updated sleeve measurements, adjusted collar design",
      modelUrl: "/assets/3d/jacket.gltf",
      type: "Jacket",
    },
    {
      id: "v2",
      name: "Pants v2.1",
      date: "2024-01-18",
      status: "Previous",
      changes: "Material color adjustment, pocket positioning",
      modelUrl: "/assets/3d/pants.glb",
      type: "Pants",
    },
    {
      id: "v1",
      name: "Jacket v1.0",
      date: "2024-01-15",
      status: "Initial",
      changes: "Initial design concept and base measurements",
      modelUrl: "/assets/3d/jacket.gltf",
      type: "Jacket",
    },
  ]

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // Add comment logic here
      setNewComment("")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500"
      case "in progress":
        return "bg-yellow-500"
      case "pending review":
        return "bg-orange-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Eye className="h-4 w-4" />
      case "vector":
        return <Palette className="h-4 w-4" />
      case "document":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const selectedVersionData = versions.find((v) => v.id === selectedVersion)

  return (
    <Layout>
      <header className="p-4 border-b border-gray-800 flex items-center gap-4">
        <Link href="/designs">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="font-medium">{design.name}</h1>
          <p className="text-xs text-gray-400">All Designs</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge className={`${getStatusColor(design.status)} text-white`}>{design.status}</Badge>
          <Button variant="outline" size="sm">
            Order Physical sample
          </Button>
          <Button size="sm">Get pricing</Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="details" className="flex-1 flex flex-col">
          <div className="border-b border-gray-800">
            <div className="px-4">
              <TabsList className="bg-transparent border-b-0">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none"
                >
                  Comments
                </TabsTrigger>
                <TabsTrigger
                  value="3d"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none"
                >
                  3D Versions
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          <TabsContent value="details" className="flex-1 p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Design Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Design Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">Design Name</label>
                    <p className="text-lg font-medium">{design.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">Status</label>
                    <div className="mt-1">
                      <Badge className={`${getStatusColor(design.status)} text-white`}>{design.status}</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">Created</label>
                      <p className="text-sm">{design.createdAt}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">Last Updated</label>
                      <p className="text-sm">{design.updatedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Material Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Selected Material
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-700 rounded-md"></div>
                    <div>
                      <p className="font-medium">{design.material.name}</p>
                      <p className="text-sm text-gray-400">{design.material.type}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Composition</span>
                      <span className="text-sm">{design.material.composition}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Color</span>
                      <span className="text-sm">{design.material.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Price</span>
                      <span className="text-sm font-medium">{design.material.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Supplier</span>
                      <span className="text-sm">{design.material.supplier}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Files Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Design Files ({design.files.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {design.files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="flex-1 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {comment.user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{comment.user.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {comment.user.role}
                            </Badge>
                            <span className="text-xs text-gray-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-sm text-gray-300">{comment.message}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Add Comment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Add Comment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Add your comment here..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <div className="flex justify-end">
                    <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                      <Send className="h-4 w-4 mr-2" />
                      Post Comment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="3d" className="flex-1 p-0 m-0">
            <div className="flex h-full">
              {/* Version Sidebar */}
              <div className="w-80 border-r border-gray-800 p-4 space-y-4">
                <h3 className="font-medium text-lg">3D Versions</h3>
                <div className="space-y-2">
                  {versions.map((version) => (
                    <Card
                      key={version.id}
                      className={`cursor-pointer transition-colors ${
                        selectedVersion === version.id ? "bg-gray-800 border-gray-600" : "hover:bg-gray-800/50"
                      }`}
                      onClick={() => setSelectedVersion(version.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{version.name}</span>
                          <Badge variant={version.status === "Current" ? "default" : "outline"}>{version.status}</Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="h-3 w-3" />
                            {version.date}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-blue-400">
                            <Package className="h-3 w-3" />
                            {version.type}
                          </div>
                          <p className="text-xs text-gray-500">{version.changes}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 3D Viewer */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 relative">
                  {selectedVersionData && <Scene key={selectedVersion} modelUrl={selectedVersionData.modelUrl} />}

                  {/* Loading Overlay */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      <span>Viewing {selectedVersionData?.name}</span>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-300">
                    <p>Left click + drag to rotate • Scroll to zoom • Right click + drag to pan</p>
                  </div>

                  {/* Built with info */}
                  <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs">
                    <span>Built with Three.js</span>
                  </div>
                </div>

                {/* 3D Controls */}
                <div className="border-t border-gray-800 p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <MousePointer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Hand className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Home className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t border-gray-800 p-4 flex items-center justify-center">
        <Button variant="default" size="lg">
          Approve 3D design
        </Button>
      </div>
    </Layout>
  )
}
