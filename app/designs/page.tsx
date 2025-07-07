"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, Grid3X3, List, ArrowUpDown, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import api from "@/lib/api" // Our Axios instance
import { Skeleton } from "@/components/ui/skeleton" // For loading states

// Sample design data
// const designs = [
//   {
//     id: "funky-jacket",
//     name: "Funky Jacket",
//     status: "approved",
//     date: "Jul 22, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Sarah Johnson",
//   },
//   {
//     id: "summer-dress",
//     name: "Summer Dress",
//     status: "in-progress",
//     date: "Jul 20, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Michael Chen",
//   },
//   {
//     id: "winter-coat",
//     name: "Winter Coat",
//     status: "pending",
//     date: "Jul 18, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Emma Wilson",
//   },
//   {
//     id: "casual-pants",
//     name: "Casual Pants",
//     status: "approved",
//     date: "Jul 15, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "David Kim",
//   },
//   {
//     id: "evening-gown",
//     name: "Evening Gown",
//     status: "in-progress",
//     date: "Jul 12, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Olivia Martinez",
//   },
//   {
//     id: "sports-jersey",
//     name: "Sports Jersey",
//     status: "pending",
//     date: "Jul 10, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "James Taylor",
//   },
//   {
//     id: "denim-jeans",
//     name: "Denim Jeans",
//     status: "approved",
//     date: "Jul 8, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Sophia Brown",
//   },
//   {
//     id: "silk-blouse",
//     name: "Silk Blouse",
//     status: "in-progress",
//     date: "Jul 5, 2024",
//     thumbnail: "/placeholder.svg?height=300&width=300",
//     designer: "Daniel Lee",
//   },
// ]

interface Design {
  id: string;
  name: string;
  status: 'UPLOADED' | 'RENDERING' | 'REVIEW_PENDING' | 'REVIEW_COMPLETED' | 'RENDERED'; // Match backend statuses
  createdAt: string; // The backend sends a string date
  imageUrl: string;
  createdBy: { // The backend includes the user who created it
    name: string;
  }
}

export default function DesignsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyDesigns = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/designs/mine');
            console.log("Fetched designs:", response.data); // Debugging log
            setDesigns(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to fetch your designs.");
        } finally {
            setIsLoading(false);
        }
    };

    fetchMyDesigns();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "REVIEW_COMPLETED":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "REVIEW_PENDING":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "UPLOADED":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "REVIEW_COMPLETED":
        return "Completed"
      case "REVIEW_PENDING":
        return "In Review"
      case "UPLOADED":
        return "Pending"
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "REVIEW_COMPLETED":
        return "bg-green-500/20 text-green-400"
      case "REVIEW_PENDING":
        return "bg-blue-500/20 text-blue-400"
      case "UPLOADED":
        return "bg-yellow-500/20 text-yellow-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }


    // Helper function to format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
  }
  
    const renderContent = () => {
    if (isLoading) {
      // Show skeleton loaders that match the view mode
      return viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-56 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            ))}
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-4 space-y-4">
             {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      );
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>
    }


    if (designs.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-gray-700 rounded-lg">
                <h3 className="text-xl font-semibold">No Designs Yet</h3>
                <p className="text-gray-400 mt-2 mb-4">Get started by creating your first design.</p>
                <Link href="/designs/new">
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Create New Design
                    </Button>
                </Link>
            </div>
        )
    }

    // If we have data, render the grid or list
    return viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {designs.map((design) => (
                <Link href={`/designs/${design.id}`} key={design.id}>
                    <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden hover:border-gray-600 transition-colors cursor-pointer">
                    <div className="aspect-square relative">
                        <Image
                            src={design.imageUrl || "/placeholder.svg"}
                            alt={design.name}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-3 left-3">
                            <div className={`rounded-full px-3 py-1 text-xs flex items-center gap-1 ${getStatusClass(design.status)}`}>
                                {getStatusIcon(design.status)}
                                <span>{getStatusText(design.status)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <h3 className="font-medium truncate">{design.name}</h3>
                        <p className="text-sm text-gray-400">By {design.createdBy.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(design.createdAt)}</p>
                    </div>
                    </div>
                </Link>
            ))}
        </div>
    ) : (
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        <table className="w-full">
            <thead>
                <tr className="border-b border-gray-800 text-left text-xs text-gray-400 uppercase">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Designer</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Date</th>
                </tr>
            </thead>
            <tbody>
                {designs.map((design) => (
                    <tr key={design.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                    <td className="px-4 py-3">
                        <Link href={`/designs/${design.id}`} className="flex items-center gap-3 hover:underline">
                            <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                                <Image
                                    src={design.imageUrl || "/placeholder.svg"}
                                    alt={design.name}
                                    width={40}
                                    height={40}
                                    className="object-cover h-full w-full"
                                />
                            </div>
                            <span className="font-medium">{design.name}</span>
                        </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{design.createdBy.name}</td>
                    <td className="px-4 py-3">
                        <div className={`rounded-full px-3 py-1 text-xs inline-flex items-center gap-1 ${getStatusClass(design.status)}`}>
                            {getStatusIcon(design.status)}
                            <span>{getStatusText(design.status)}</span>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">{formatDate(design.createdAt)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    );
  }

  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Designs</h1>
        <div className="flex items-center gap-4">
          <Link href="/designs/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Design
            </Button>
          </Link>
        </div>
      </header>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search designs..." className="pl-10 bg-gray-900 border-gray-700" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              className={viewMode === "grid" ? "" : "border-gray-700"}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              className={viewMode === "list" ? "" : "border-gray-700"}
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-gray-700">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        {renderContent()}
      </div>
    </Layout>
  )
}
