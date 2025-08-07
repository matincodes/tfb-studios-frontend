"use client"

import type React from "react"
import { useRouter } from "next/navigation"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Upload, X, FileUp, ImageIcon, FileText, ArrowRight, Plus, Check, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import api from "@/lib/api" 

interface UploadedFile {
  file: File
  id: string
  preview?: string
}

interface Material {
  id: string
  name: string
  type: string
  color: string
  source: string
  composition: string
  price: string
  imageUrl: string
  inStock: boolean
}

// Sample materials data
// const availableMaterials: Material[] = [
//   {
//     id: "cotton-canvas",
//     name: "Organic Cotton Canvas",
//     type: "Canvas",
//     composition: "100% Organic Cotton",
//     price: "£12.95 PER METRE",
//     thumbnail: "/placeholder.svg?height=200&width=200",
//     inStock: true,
//   },
//   {
//     id: "silk-satin",
//     name: "Premium Silk Satin",
//     type: "Satin & Silk",
//     composition: "100% Mulberry Silk",
//     price: "£24.95 PER METRE",
//     thumbnail: "/placeholder.svg?height=200&width=200",
//     inStock: true,
//   },
//   {
//     id: "wool-flannel",
//     name: "Merino Wool Flannel",
//     type: "Flannel",
//     composition: "100% Merino Wool",
//     price: "£18.95 PER METRE",
//     thumbnail: "/placeholder.svg?height=200&width=200",
//     inStock: false,
//   },
//   {
//     id: "recycled-denim",
//     name: "Recycled Denim",
//     type: "Denim",
//     composition: "80% Recycled Cotton, 20% Polyester",
//     price: "£15.95 PER METRE",
//     thumbnail: "/placeholder.svg?height=200&width=200",
//     inStock: true,
//   },
// ]

export default function NewDesignPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [designName, setDesignName] = useState("")
  const [designDescription, setDesignDescription] = useState("")


  const [availableMaterials, setAvailableMaterials] = useState<Material[]>([])
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null)
  const [showMaterialUpload, setShowMaterialUpload] = useState(false)
  const [customMaterialName, setCustomMaterialName] = useState("")
  const [customMaterialType, setCustomMaterialType] = useState("")
  const [customMaterialComposition, setCustomMaterialComposition] = useState("")
  const [customMaterialColor, setCustomMaterialColor] = useState("")
  const [customMaterialFile, setCustomMaterialFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true)
      try {
        const response = await api.get("/fabrics")
        const formattedMaterials = response.data.fabrics.map((fabric: any) => ({
          id: fabric.id,
          name: fabric.name,
          type: fabric.type,
          color: fabric.color || "N/A",
          source: fabric.source || "N/A",
          composition: fabric.composition || "N/A",
          price: fabric.price || "0.00 PER METRE",
          imageUrl: fabric.imageUrl,
          inStock: true,
        }));
        setAvailableMaterials(formattedMaterials)
      } catch (err) {
        console.error("Error fetching materials:", err)
        toast({
          title: "Error",
          description: "Failed to load materials. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    };
    fetchMaterials()
  }, [toast])

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
      const newFiles = Array.from(e.dataTransfer.files)
      addFiles(newFiles)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFiles = Array.from(e.target.files)
      addFiles(newFiles)
    }
  }

  const handleMaterialFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomMaterialFile(e.target.files[0])
    }
  }

  const addFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    }))
    setFiles((prev) => [...prev, ...uploadedFiles])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === id)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter((f) => f.id !== id)
    })
  }

  const getFileIcon = (file: File) => {
    const type = file.type.split("/")[0]
    if (type === "image") {
      return <ImageIcon className="h-5 w-5 text-blue-400" />
    }
    return <FileText className="h-5 w-5 text-purple-400" />
  }

  const canProceedToStep2 = files.length > 0 && designName.trim() !== ""
  const canProceedToStep3 = selectedMaterial !== null

  const handleAddCustomMaterial = async () => {
    if (!customMaterialName || !customMaterialType || !customMaterialComposition) {
        toast({ title: "Please fill all material fields", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append('name', customMaterialName);
    formData.append('type', customMaterialType);
    formData.append('composition', customMaterialComposition);
    formData.append('color', customMaterialColor); 
    formData.append('source', 'USER_UPLOAD');
    if (customMaterialFile) {
        formData.append('image', customMaterialFile);
    }
    
    try {
        const response = await api.post('/fabrics', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Add new material to the list and reset the form
        const newMaterial = {
            id: response.data.fabric.id,
            name: response.data.fabric.name,
            type: response.data.fabric.type,
            color: response.data.fabric.color || 'N/A',
            source: response.data.fabric.source || 'N/A',
            composition: response.data.fabric.composition || 'N/A',
            price: `£${response.data.fabric.price || '0.00'} PER METRE`,
            imageUrl: response.data.fabric.imageUrl || '/placeholder.svg',
            inStock: false,
        };
        setAvailableMaterials(prev => [newMaterial, ...prev]);
        toast({ title: "Success", description: "Custom material added." });
        
        // Reset form
        setCustomMaterialName("");
        setCustomMaterialType("");
        setCustomMaterialComposition("");
        setCustomMaterialFile(null);
        setShowMaterialUpload(false);
        setCustomMaterialColor("");

    } catch (err: any) {
        toast({
            title: "Upload Failed",
            description: err.response?.data?.error || "Could not upload custom material.",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  }

  const handleSubmit = async () => {
    // Handle final submission
     if (!selectedMaterial) {
      toast({
        title: "Material not selected",
        description: "Please select a material before submitting your design.",
        variant: "destructive"
      });
      return;
    }

    if (files.length === 0) {
        toast({ title: "Please upload at least one design file.", variant: "destructive"});
        return;
    }
    setIsLoading(true);
    setError(null);


    const formData = new FormData();
    formData.append('name', designName);
    formData.append('description', designDescription);
    files.forEach(file => {
        formData.append('images', file.file);
    });
    formData.append('initialFabricId', selectedMaterial);
    
    try {
        // 4. Send the complete data package to the backend.
        await api.post('/designs', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        toast({
            title: "Design Submitted!",
            description: "Your design has been successfully created and is awaiting review.",
        });
        // Redirect to the main designs page on success
        router.push('/designs');

    } catch (err: any) {
        setError(err.response?.data?.error || "An error occurred during submission.");
        toast({
          title: "Submission Failed",
          description: err.response?.data?.error || "Could not submit your design.",
          variant: "destructive",
        })
    } finally {
        setIsLoading(false);
    }
  }


  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/designs">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New Design</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={currentStep >= 1 ? "default" : "secondary"}>1</Badge>
          <div className="w-8 h-px bg-gray-600"></div>
          <Badge variant={currentStep >= 2 ? "default" : "secondary"}>2</Badge>
          <div className="w-8 h-px bg-gray-600"></div>
          <Badge variant={currentStep >= 3 ? "default" : "secondary"}>3</Badge>
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Step 1: Upload Files and Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Upload Design Files</h2>
              <p className="text-gray-400 mb-6">Upload your design files and provide basic information</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="design-name" className="text-sm font-medium mb-2 block">
                  Design Name *
                </Label>
                <Input
                  id="design-name"
                  value={designName}
                  onChange={(e) => setDesignName(e.target.value)}
                  placeholder="Enter design name"
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div>
                <Label htmlFor="design-description" className="text-sm font-medium mb-2 block">
                  Description
                </Label>
                <Textarea
                  id="design-description"
                  value={designDescription}
                  onChange={(e) => setDesignDescription(e.target.value)}
                  placeholder="Describe your design..."
                  className="bg-gray-900 border-gray-700"
                  rows={3}
                />
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-8 transition-colors ${
                dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-700"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>
                <p className="mb-2 text-sm font-medium">Drag and drop your files here</p>
                <p className="mb-4 text-xs text-gray-500">Support for JPG, PNG, SVG, AI, PSD, and sketch files</p>
                <Label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm flex items-center"
                >
                  <FileUp className="mr-2 h-4 w-4" />
                  Browse Files
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.ai,.psd,.sketch"
                />
              </div>
            </div>

            {files.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-4">Uploaded Files ({files.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((uploadedFile) => (
                    <Card key={uploadedFile.id} className="bg-gray-900 border-gray-800">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getFileIcon(uploadedFile.file)}
                            <span className="text-sm font-medium truncate">{uploadedFile.file.name}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-full"
                            onClick={() => removeFile(uploadedFile.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        {uploadedFile.preview && (
                          <div className="aspect-square relative rounded-md overflow-hidden">
                            <Image
                              src={uploadedFile.preview || "/placeholder.svg"}
                              alt={uploadedFile.file.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-2">
                          {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!canProceedToStep2}
                className="flex items-center gap-2"
              >
                Next: Select Material
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Material Selection */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Select Material</h2>
              <p className="text-gray-400 mb-6">Choose a material for your design or upload a custom one</p>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Available Materials</h3>
              <Button
                variant="outline"
                onClick={() => setShowMaterialUpload(!showMaterialUpload)}
                className="border-gray-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Upload Custom Material
              </Button>
            </div>

            {showMaterialUpload && (
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-lg">Upload Custom Material</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div>
                    <Label htmlFor="material-composition">Color</Label>
                    <Input
                      id="material-color"
                      value={customMaterialColor}
                      onChange={(e) => setCustomMaterialColor(e.target.value)}
                      placeholder="e.g., Navy Blue"
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
                    onClick={handleAddCustomMaterial}
                    className="w-full"
                    disabled={!customMaterialName || !customMaterialType || !customMaterialComposition}
                  >
                    Add Custom Material
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableMaterials.map((material) => (
                <Card
                  key={material.id}
                  className={`cursor-pointer transition-all ${
                    selectedMaterial === material.id
                      ? "bg-blue-500/20 border-blue-500"
                      : "bg-gray-900 border-gray-800 hover:border-gray-600"
                  }`}
                  onClick={() => setSelectedMaterial(material.id)}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square relative rounded-md overflow-hidden mb-3">
                      <Image
                        src={material.imageUrl || "/placeholder.svg"}
                        alt={material.name}
                        fill
                        className="object-cover"
                      />
                      {selectedMaterial === material.id && (
                        <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <h4 className="font-medium mb-1">{material.name}</h4>
                    <p className="text-sm text-gray-400 mb-1">{material.type}</p>
                    <p className="text-xs text-gray-500 mb-2">{material.composition}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{material.price}</span>
                      <Badge variant={material.inStock ? "default" : "secondary"}>
                        {material.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={() => setCurrentStep(3)}
                disabled={!canProceedToStep3}
                className="flex items-center gap-2"
              >
                Next: Review
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review and Submit */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Review Your Design</h2>
              <p className="text-gray-400 mb-6">Review all details before submitting your design</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Design Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-400">Name</Label>
                    <p className="font-medium">{designName}</p>
                  </div>
                  {designDescription && (
                    <div>
                      <Label className="text-sm text-gray-400">Description</Label>
                      <p className="text-sm">{designDescription}</p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm text-gray-400">Files Uploaded</Label>
                    <p className="font-medium">{files.length} files</p>
                    <div className="mt-2 space-y-1">
                      {files.map((file) => (
                        <p key={file.id} className="text-xs text-gray-500">
                          {file.file.name} ({(file.file.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle>Selected Material</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedMaterial && (
                    <div className="space-y-3">
                      {(() => {
                        const material = availableMaterials.find((m) => m.id === selectedMaterial)
                        return material ? (
                          <>
                            <div className="aspect-square relative rounded-md overflow-hidden w-24 h-24">
                              <Image
                                src={material.imageUrl || "/placeholder.svg"}
                                alt={material.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{material.name}</p>
                              <p className="text-sm text-gray-400">{material.type}</p>
                              <p className="text-xs text-gray-500">{material.composition}</p>
                              <p className="text-sm font-medium mt-1">{material.price}</p>
                              <Badge variant={material.inStock ? "default" : "secondary"} className="mt-1">
                                {material.inStock ? "In Stock" : "Out of Stock"}
                              </Badge>
                            </div>
                          </>
                        ) : null
                      })()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setCurrentStep(2)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Submitting..." : "Create Design"}
                {!isLoading && <Check className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}
