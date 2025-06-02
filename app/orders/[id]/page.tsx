"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Printer, User, FileText, CreditCard, Truck, MessageSquare, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

export default function OrderDetail({ params }: { params: { id: string } }) {
  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/orders">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Order details</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-gray-700">
            <Printer className="h-4 w-4 mr-2" />
            Download info
          </Button>
          <Button>Pay invoice</Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500/20 text-blue-400 rounded-full px-4 py-2 text-sm font-medium flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>On hold</span>
            </div>
          </div>
          <div className="text-gray-400">Order ID: #167895</div>
          <div className="text-gray-400">Mon, July 22, 2024</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 rounded-full p-2">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium">Customer</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-gray-400">Name:</div>
                <div>Matthew Smith</div>
              </div>
              <div>
                <div className="text-gray-400">Email:</div>
                <div>msmith@gmail.com</div>
              </div>
              <div>
                <div className="text-gray-400">Phone:</div>
                <div>+44 8188822007</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 rounded-full p-2">
                <FileText className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium">Order Info</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-gray-400">Shipping:</div>
                <div>Standard</div>
              </div>
              <div>
                <div className="text-gray-400">Pay:</div>
                <div>Card</div>
              </div>
              <div>
                <div className="text-gray-400">Status:</div>
                <div>Unpaid</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 rounded-full p-2">
                <Truck className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium">Delivery</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div className="text-gray-400">Address:</div>
                <div>Lviv, Zelena st 96</div>
              </div>
              <div>
                <div className="text-gray-400"></div>
                <div>78 098 6flor</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 rounded-full p-2">
                <CreditCard className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium">Payment Info</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div>
                <div>Master Card **** **** 8765</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-800 rounded-full p-2">
                <MessageSquare className="h-5 w-5 text-gray-400" />
              </div>
              <h2 className="text-lg font-medium">Notes</h2>
            </div>
            <Textarea placeholder="Type some note..." className="bg-gray-800 border-gray-700" />
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-medium">Products</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-400">
                <th className="px-4 py-3">NAME</th>
                <th className="px-4 py-3">PRICE</th>
                <th className="px-4 py-3">QUANTITY</th>
                <th className="px-4 py-3">TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-3">Funky jacket</td>
                <td className="px-4 py-3">£ 360</td>
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">£ 360</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 border-t border-gray-800 flex justify-between">
            <h3 className="font-medium">Summary</h3>
            <div className="font-medium">Total: £ 360</div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex gap-4">
            <Button variant="outline" className="border-gray-700">
              Cancel Order
            </Button>
            <Button variant="outline" className="border-gray-700">
              Already Paid
            </Button>
            <Button>Pay invoice</Button>
          </div>
        </div>
      </main>
    </Layout>
  )
}
