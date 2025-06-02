"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export default function Materials() {
  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Sustainable Fabric selection</h1>
        </div>
        <div>
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1">
        <div className="w-64 border-r border-gray-800 p-4 space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Colour</h3>
            <Button variant="outline" className="w-full justify-between">
              Select
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Fabric Composition</h3>
            <Button variant="outline" className="w-full justify-between">
              Select
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Fabric Type</h3>
            <Button variant="outline" className="w-full justify-between">
              Select
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
            <div className="mt-2 space-y-1 text-sm">
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Canvas</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Flannel</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Satin & Silk</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Faux Suede</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Velvet & Velour</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Jacquard</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Waterproof</div>
              <div className="px-3 py-1 hover:bg-gray-800 rounded-md cursor-pointer">Cotton Lawn</div>
            </div>
          </div>
          <Separator className="bg-gray-800" />
          <div>
            <h3 className="text-sm font-medium mb-2">Pattern</h3>
            <Button variant="outline" className="w-full justify-between">
              Select
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Weight Band</h3>
            <Button variant="outline" className="w-full justify-between">
              Select
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
        </div>

        <div className="flex-1 p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Nylon Pine", price: "£9.95 PER METRE" },
              { name: "Avalon Mid Blue OH", price: "£9.95 PER METRE" },
              { name: "Camo Ripstop", price: "£9.95 PER METRE" },
              { name: "Ventura Black", price: "£9.95 PER METRE" },
              { name: "Ventura Bottle", price: "£9.95 PER METRE" },
              { name: "Airtex Mesh Emerald", price: "£9.95 PER METRE" },
              { name: "Anti Pil Plain Bottle", price: "£9.95 PER METRE" },
              { name: "Double Touch Fuchsia", price: "£9.95 PER METRE" },
            ].map((fabric, index) => (
              <div key={index} className="bg-gray-800 rounded-md overflow-hidden">
                <div className="aspect-square bg-gray-700"></div>
                <div className="p-2">
                  <h3 className="text-sm font-medium">{fabric.name}</h3>
                  <p className="text-xs text-gray-400">{fabric.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
