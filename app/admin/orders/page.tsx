"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  DollarSign,
  Calendar,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import Image from "next/image"

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  // Mock data for orders
  const orders = [
    {
      id: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main St, New York, NY 10001",
      },
      items: [
        {
          id: 1,
          name: "Custom Blazer",
          designer: "Sarah Wilson",
          quantity: 1,
          price: 299.99,
          image: "/placeholder.svg?height=100&width=100",
        },
        {
          id: 2,
          name: "Dress Shirt",
          designer: "Tom Brown",
          quantity: 2,
          price: 89.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      status: "processing",
      orderDate: "2024-01-15",
      expectedDelivery: "2024-02-15",
      total: 479.97,
      shippingAddress: "123 Main St, New York, NY 10001",
      paymentMethod: "Credit Card",
      notes: "Rush order - customer needs by Feb 10th",
    },
    {
      id: "ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 234 567 8901",
        address: "456 Oak Ave, Los Angeles, CA 90210",
      },
      items: [
        {
          id: 3,
          name: "Summer Dress",
          designer: "Emma Johnson",
          quantity: 1,
          price: 199.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      status: "completed",
      orderDate: "2024-01-12",
      expectedDelivery: "2024-02-12",
      total: 199.99,
      shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
      paymentMethod: "PayPal",
      notes: "",
    },
    {
      id: "ORD-003",
      customer: {
        name: "Mike Johnson",
        email: "mike@example.com",
        phone: "+1 234 567 8902",
        address: "789 Pine St, Chicago, IL 60601",
      },
      items: [
        {
          id: 4,
          name: "Sport Jacket",
          designer: "Lisa Davis",
          quantity: 1,
          price: 149.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      status: "pending",
      orderDate: "2024-01-10",
      expectedDelivery: "2024-02-10",
      total: 149.99,
      shippingAddress: "789 Pine St, Chicago, IL 60601",
      paymentMethod: "Credit Card",
      notes: "Customer requested specific fabric color",
    },
    {
      id: "ORD-004",
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        phone: "+1 234 567 8903",
        address: "321 Elm St, Miami, FL 33101",
      },
      items: [
        {
          id: 5,
          name: "Vintage Coat",
          designer: "Tom Brown",
          quantity: 1,
          price: 399.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      status: "shipped",
      orderDate: "2024-01-08",
      expectedDelivery: "2024-02-08",
      total: 399.99,
      shippingAddress: "321 Elm St, Miami, FL 33101",
      paymentMethod: "Credit Card",
      notes: "",
    },
    {
      id: "ORD-005",
      customer: {
        name: "David Brown",
        email: "david@example.com",
        phone: "+1 234 567 8904",
        address: "654 Maple Dr, Seattle, WA 98101",
      },
      items: [
        {
          id: 6,
          name: "Casual Pants",
          designer: "Emma Johnson",
          quantity: 3,
          price: 79.99,
          image: "/placeholder.svg?height=100&width=100",
        },
      ],
      status: "cancelled",
      orderDate: "2024-01-05",
      expectedDelivery: "2024-02-05",
      total: 239.97,
      shippingAddress: "654 Maple Dr, Seattle, WA 98101",
      paymentMethod: "Credit Card",
      notes: "Customer requested cancellation due to size issues",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400 border-yellow-700">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-900/30 text-blue-400 border-blue-700">
            <Package className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-900/30 text-purple-400 border-purple-700">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-900/30 text-green-400 border-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-900/30 text-red-400 border-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsDetailModalOpen(true)
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Changing order ${orderId} status to ${newStatus}`)
    alert(`Order status changed to ${newStatus}`)
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingOrders = filteredOrders.filter((o) => o.status === "pending")
  const processingOrders = filteredOrders.filter((o) => o.status === "processing")
  const shippedOrders = filteredOrders.filter((o) => o.status === "shipped")
  const completedOrders = filteredOrders.filter((o) => o.status === "completed")
  const cancelledOrders = filteredOrders.filter((o) => o.status === "cancelled")

  const totalRevenue = orders.filter((o) => o.status === "completed").reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-gray-400">Manage and track all customer orders</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search orders..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingOrders.length}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Processing</p>
                <p className="text-2xl font-bold text-blue-400">{processingOrders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Shipped</p>
                <p className="text-2xl font-bold text-purple-400">{shippedOrders.length}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Completed</p>
                <p className="text-2xl font-bold text-green-400">{completedOrders.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-green-400">£{totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-xs text-gray-400">
                  <th className="pb-3">ORDER ID</th>
                  <th className="pb-3">CUSTOMER</th>
                  <th className="pb-3">ITEMS</th>
                  <th className="pb-3">DATE</th>
                  <th className="pb-3">TOTAL</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="py-4">
                      <span className="font-medium">{order.id}</span>
                    </td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{order.customer.name}</p>
                        <p className="text-xs text-gray-400">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-800 rounded overflow-hidden">
                          <Image
                            src={order.items[0].image || "/placeholder.svg"}
                            alt={order.items[0].name}
                            width={32}
                            height={32}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm">{order.items[0].name}</p>
                          {order.items.length > 1 && (
                            <p className="text-xs text-gray-400">+{order.items.length - 1} more</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <p className="text-sm">{new Date(order.orderDate).toLocaleDateString()}</p>
                    </td>
                    <td className="py-4">
                      <span className="font-medium">£{order.total.toFixed(2)}</span>
                    </td>
                    <td className="py-4">{getStatusBadge(order.status)}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                          <SelectTrigger className="w-32 h-8">
                            <SelectValue placeholder="Update" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Order Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order {selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span>{selectedOrder.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{selectedOrder.customer.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{selectedOrder.customer.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <span className="text-sm">{selectedOrder.customer.address}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Order Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span>Ordered: {new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-400" />
                        <span>Expected: {new Date(selectedOrder.expectedDelivery).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>Payment: {selectedOrder.paymentMethod}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span className="font-semibold">Total: £{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Items */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg">Order Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                          <div className="w-16 h-16 bg-gray-700 rounded overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={64}
                              height={64}
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-400">by {item.designer}</p>
                            <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">£{(item.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-400">£{item.price.toFixed(2)} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedOrder.shippingAddress}</p>
                  </CardContent>
                </Card>

                {/* Notes */}
                {selectedOrder.notes && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-lg">Order Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{selectedOrder.notes}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-800">
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusChange(selectedOrder.id, "processing")}
                    disabled={selectedOrder.status === "processing"}
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Mark as Processing
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusChange(selectedOrder.id, "shipped")}
                    disabled={selectedOrder.status === "shipped" || selectedOrder.status === "completed"}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Mark as Shipped
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleStatusChange(selectedOrder.id, "completed")}
                    disabled={selectedOrder.status === "completed"}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Mark as Completed
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
