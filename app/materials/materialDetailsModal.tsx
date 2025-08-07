"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import api from "@/lib/api";
import type { Fabric } from "@/types/design";
import { useEffect } from "react";


interface MaterialDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  material: Fabric | null;
  refreshData: () => void;
}

export default function MaterialDetailModal({
  isOpen,
  onClose,
  material,
  refreshData,
}: MaterialDetailModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(material?.name || "");
  const [type, setType] = useState(material?.type || "");
  const [composition, setComposition] = useState(material?.composition || "");
  const [description, setDescription] = useState(material?.description || "");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);


useEffect(() => {
  if (material) {
    setName(material.name);
    setType(material.type);
    setComposition(material.composition || "");
    setDescription(material.description || "");
    setNewImageFile(null); // reset file
    setIsEditMode(false);  // reset mode
  }
}, [material]);


  const handleUpdate = async () => {
    if (!material) return;

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("type", type);
        formData.append("composition", composition);
        formData.append("description", description);

        if (newImageFile) {
        formData.append("image", newImageFile);
        }

        await api.put(`/fabrics/${material.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

      toast({
        title: "Material Updated",
        description: "The material details have been successfully updated.",
      });

      refreshData();
      setIsEditMode(false);
      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Update Failed",
        description: "An error occurred while updating the material.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white max-w-xl max-h-[90vh] overflow-y-auto border-gray-800">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Material" : "Material Details"}</DialogTitle>
        </DialogHeader>

        {material && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  disabled={!isEditMode}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Type</Label>
                <Input
                  disabled={!isEditMode}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div>
                <Label>Composition</Label>
                <Input
                  disabled={!isEditMode}
                  value={composition}
                  onChange={(e) => setComposition(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea
                  disabled={!isEditMode}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>

            {material.imageUrl && (
              <div>
                <Label>Sample Image</Label>
                <div className="w-full aspect-video relative mt-2">
                  <Image
                    src={material.imageUrl}
                    alt={material.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                {isEditMode && (
                    <div>
                        <Label>Update Image</Label>
                        <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                            setNewImageFile(e.target.files[0]);
                            }
                        }}
                        className="bg-gray-800 border-gray-700 mt-2"
                        />
                        {newImageFile && (
                        <p className="text-sm text-green-400 mt-1">{newImageFile.name}</p>
                        )}
                    </div>
                    )}
              </div>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setIsEditMode(!isEditMode)}>
                {isEditMode ? "Cancel Edit" : "Edit"}
              </Button>

              {isEditMode && (
                <Button onClick={handleUpdate}>Update</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
