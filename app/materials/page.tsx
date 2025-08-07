"use client"

import type React from "react"

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
import { Search, Upload, Heart, Eye, Plus, Leaf, Clock, CheckCircle, XCircle, AlertCircle, FileUp } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import api from "@/lib/api"; 
import { useAuth } from "@/lib/auth-provider";
import MaterialsLoading from "./loading";
import { toast } from "@/hooks/use-toast"
import { Fabric } from "@/types/design"
import MaterialDetailModal from "./materialDetailsModal";


export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [materialName, setMaterialName] = useState("")
  const [materialType, setMaterialType] = useState("")
  const [composition, setComposition] = useState("")
  const [description, setDescription] = useState("")
  const [materialFile, setMaterialFile] = useState<File | null>(null)
  const [userMaterials, setUserMaterials] = useState<Fabric[]>([]);
  const [adminMaterials, setAdminMaterials] = useState<Fabric[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Fabric | null>(null);



  const { user } = useAuth();


    const fetchFabrics = async () => {
      if (!user) return;
      try {
        setLoading(true);

        const [userRes, platformRes] = await Promise.all([
          api.get(`/fabrics`, {
            params: {
              source: "USER_UPLOAD",
              userId: user?.id,
            },
          }),
          api.get(`/fabrics`, {
            params: {
              source: "PLATFORM",
            },
          }),
        ]);

        setUserMaterials(userRes.data.fabrics);
        console.log(userRes.data)
        setAdminMaterials(platformRes.data.fabrics);
      } catch (err) {
        console.error(err);
        setError("Failed to load materials");
      } finally {
        setLoading(false);
      }
    };


    useEffect(() => {
      if (user) {
        fetchFabrics();
      }
    }, [user]);


  const handleUploadMaterial = async () => {
    if (!materialName || !materialType || !composition) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Unauthorized",
        description: "You must be logged in to upload a material.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", materialName);
      formData.append("type", materialType);
      formData.append("color", "default"); // You can update to real color picker if needed
      formData.append("composition", composition);
      formData.append("source", "USER_UPLOAD");

      if (materialFile) {
        formData.append("image", materialFile); // 'image' is the key your multer expects
      }

      await api.post("/fabrics", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await fetchFabrics(); // Call the same fetch logic again

      // Reset form
      setMaterialName("");
      setMaterialType("");
      setComposition("");
      setDescription("");
      setMaterialFile(null);
      setIsUploadModalOpen(false);

      toast({
        title: "Upload Successful",
        description: "Your material has been uploaded and is pending review.",
      });
    } catch (err) {
      console.error("Upload failed", err);
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading the material.",
      });
    }
  };


  const handleDeleteMaterial = async (materialId: string) => {
    try {
      await api.delete(`/fabrics/${materialId}`);
      toast({
        title: "Material Deleted",
        description: "The material has been successfully deleted.",
      });
      await fetchFabrics();
    } catch (err) {
      console.error("Delete error:", err);
      toast({
        title: "Delete Failed",
        description: "Could not delete the material.",
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMaterialFile(e.target.files[0])
    }
  }


  const getStatusBadge = (status: "PENDING_REVIEW" | "ACCEPTED" | "REJECTED" | undefined) => {
    switch (status) {
      case "ACCEPTED":
        return (
          <Badge className="bg-green-900/30 text-green-400 border-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "PENDING_REVIEW":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "REJECTED":
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

  const getSustainabilityBadge = (rating: string | undefined) => {
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

  const acceptedUserFabrics = userMaterials.filter((m) => m.status === "ACCEPTED");
  const combinedAvailableMaterials = [...adminMaterials, ...acceptedUserFabrics];

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

  if (loading) {
    return <MaterialsLoading />;
  }

    if (error) {
    return (
      <Layout>
        <div className="p-6 text-red-400">{error}</div>
      </Layout>
    );
  }


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
            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
              <DialogHeader>
                <DialogTitle>Upload New Material</DialogTitle>
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
                  <Button onClick={handleUploadMaterial} className="flex-1">
                    Upload Material
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsUploadModalOpen(false)
                      setMaterialName("")
                      setMaterialType("")
                      setComposition("")
                      setDescription("")
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
              Available Materials ({combinedAvailableMaterials.length})
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
                        src={material.imageUrl || "/placeholder.svg"}
                        alt={material.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium truncate">{material.name}</h3>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{material.type}</p>
                      <p className="text-xs text-gray-500 mb-3">{material.composition}</p>

                      <div className="flex items-center justify-between mb-3">
                        {getStatusBadge(material.status)}
                      </div>

                      <div className="flex gap-2 items-center justify-center">
                       <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 h-9"
                          onClick={() => {
                            setSelectedMaterial(material);
                            setIsDetailModalOpen(true);
                          }}
                        >
                          <Eye className="w-3 h-3 mr-1" />
                             View
                        </Button> 

                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 h-8"
                          onClick={() => handleDeleteMaterial(material.id)}
                        >
                          Delete
                        </Button>
                      </div>

                      <p className="text-xs text-gray-500 mt-2">
                        Uploaded {new Date(material.createdAt).toLocaleDateString()}
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
              {combinedAvailableMaterials.map((material) => (
                <Card key={material.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                  <div className="aspect-square relative">
                    <Image
                      src={material.imageUrl || "/placeholder.svg"}
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
                      <span className="text-sm font-medium">£{material.price}/m</span>
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
      <MaterialDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        material={selectedMaterial}
        refreshData={fetchFabrics}
      />
    </Layout>
  )
}
