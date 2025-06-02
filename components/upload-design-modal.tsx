"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Upload, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface UploadDesignModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadDesignModal({ open, onOpenChange }: UploadDesignModalProps) {
  const router = useRouter()

  const handleCreateDesign = () => {
    onOpenChange(false)
    router.push("/designs/new")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle>Create New Design</DialogTitle>
          <DialogDescription className="text-gray-400">
            Start creating your new design with our step-by-step process
          </DialogDescription>
        </DialogHeader>

        <div className="py-8 flex flex-col items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-blue-500" />
          </div>
          <h3 className="text-xl font-medium mb-2">Ready to Create?</h3>
          <p className="text-gray-400 text-center mb-6">
            Upload multiple design files, select materials, and bring your vision to life.
          </p>

          <div className="flex gap-3 w-full">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleCreateDesign} className="flex-1 flex items-center gap-2">
              Start Creating
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
