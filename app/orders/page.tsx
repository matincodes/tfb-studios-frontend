"use client"

import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, ArrowUpDown, CheckCircle2, Clock, AlertCircle, XCircle, Truck } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Sample orders data
const orders = [
  {
    id: "167895",
    customer: "Matthew Smith",
    email: "msmith@gmail.com",
    date: "Jul 22, 2024",
    total: "£360",
    status: "on-hold",
    items: ["Funky Jacket"],
  },
  {
    id: "167894",
    customer: "Emma Johnson",
    email: "ejohnson@gmail.com",
    date: "Jul 21, 2024",
    total: "£520",
    status: "processing",
    items: ["Summer Dress", "Casual Pants"],
  },
  {
    id: "167893",
    customer: "David Wilson",
    email: "dwilson@gmail.com",
    date: "Jul 20, 2024",
    total: "£180",
    status: "completed",
    items: ["Sports Jersey"],
  },
  {
    id: "167892",
    customer: "Sophia Brown",
    email: "sbrown@gmail.com",
    date: "Jul 19, 2024",
    total: "£450",
    status: "cancelled",
    items: ["Evening Gown"],
  },
  {
    id: "167891",
    customer: "James Taylor",
    email: "jtaylor@gmail.com",
    date: "Jul 18, 2024",
    total: "£290",
    status: "shipped",
    items: ["Winter Coat"],
  },
  {
    id: "167890",
    customer: "Olivia Martinez",
    email: "omartinez@gmail.com",
    date: "Jul 17, 2024",
    total: "£210",
    status: "processing",
    items: ["Denim Jeans"],
  },
  {
    id: "167889",
    customer: "Daniel Lee",
    email: "dlee@gmail.com",
    date: "Jul 16, 2024",
    total: "£180",
    status: "on-hold",
    items: ["Silk Blouse"],
  },
  {
    id: "167888",
    customer: "Michael Chen",
    email: "mchen@gmail.com",
    date: "Jul 15, 2024",
    total: "£320",
    status: "completed",
    items: ["Casual Pants", "Sports Jersey"],
  },
]

export default function OrdersPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "on-hold":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-500" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "processing":
        return "Processing"
      case "on-hold":
        return "On Hold"
      case "cancelled":
        return "Cancelled"
      case "shipped":
        return "Shipped"
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "processing":
        return "bg-blue-500/20 text-blue-400"
      case "on-hold":
        return "bg-yellow-500/20 text-yellow-400"
      case "cancelled":
        return "bg-red-500/20 text-red-400"
      case "shipped":
        return "bg-purple-500/20 text-purple-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex items-center gap-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>
      </header>

      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search orders..." className="pl-10 bg-gray-900 border-gray-700" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-700">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" className="border-gray-700">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sort
            </Button>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-left text-xs text-gray-400">
                <th className="px-4 py-3">ORDER</th>
                <th className="px-4 py-3">CUSTOMER</th>
                <th className="px-4 py-3">ITEMS</th>
                <th className="px-4 py-3">DATE</th>
                <th className="px-4 py-3">TOTAL</th>
                <th className="px-4 py-3">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/orders/${order.id}`} className="font-medium hover:underline">
                      #{order.id}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{order.customer}</div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {order.items.map((item, index) => (
                        <Badge key={index} variant="outline" className="border-gray-700">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{order.date}</td>
                  <td className="px-4 py-3 font-medium">{order.total}</td>
                  <td className="px-4 py-3">
                    <div
                      className={`rounded-full px-3 py-1 text-xs inline-flex items-center gap-1 ${getStatusClass(order.status)}`}
                    >
                      {getStatusIcon(order.status)}
                      <span>{getStatusText(order.status)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}
