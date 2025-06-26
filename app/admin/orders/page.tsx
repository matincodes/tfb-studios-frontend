"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Eye,
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  MapPin,
  CreditCard,
  Phone,
  Mail,
} from "lucide-react"

const orders = [
  {
    id: "ORD-001",
    customer: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+44 7700 900123",
      avatar: "/placeholder-user.jpg",
    },
    items: [
      {
        id: 1,
        name: "Custom Blazer",
        design: "Modern Blazer",
        quantity: 1,
        price: 299.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    status: "processing",
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-25",
    total: 299.99,
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "123 Fashion Street",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    timeline: [
      { status: "placed", date: "2024-01-15", completed: true },
      { status: "confirmed", date: "2024-01-15", completed: true },
      { status: "processing", date: "2024-01-16", completed: true },
      { status: "shipped", date: null, completed: false },
      { status: "delivered", date: null, completed: false },
    ],
    notes: "Customer requested express delivery",
  },
  {
    id: "ORD-002",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+44 7700 900456",
      avatar: "/placeholder-user.jpg",
    },
    items: [
      {
        id: 1,
        name: "Summer Dress",
        design: "Floral Summer Dress",
        quantity: 2,
        price: 199.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    status: "completed",
    orderDate: "2024-01-14",
    estimatedDelivery: "2024-01-24",
    total: 399.98,
    paymentMethod: "PayPal",
    shippingAddress: {
      street: "456 Style Avenue",
      city: "Manchester",
      postcode: "M1 1AA",
      country: "United Kingdom",
    },
    timeline: [
      { status: "placed", date: "2024-01-14", completed: true },
      { status: "confirmed", date: "2024-01-14", completed: true },
      { status: "processing", date: "2024-01-15", completed: true },
      { status: "shipped", date: "2024-01-18", completed: true },
      { status: "delivered", date: "2024-01-20", completed: true },
    ],
    notes: "",
  },
  {
    id: "ORD-003",
    customer: {
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+44 7700 900789",
      avatar: "/placeholder-user.jpg",
    },
    items: [
      {
        id: 1,
        name: "Casual Pants",
        design: "Comfort Fit Chinos",
        quantity: 1,
        price: 149.99,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    status: "pending",
    orderDate: "2024-01-13",
    estimatedDelivery: "2024-01-23",
    total: 149.99,
    paymentMethod: "Credit Card",
    shippingAddress: {
      street: "789 Trend Road",
      city: "Birmingham",
      postcode: "B1 1AA",
      country: "United Kingdom",
    },
    timeline: [
      { status: "placed", date: "2024-01-13", completed: true },
      { status: "confirmed", date: null, completed: false },
      { status: "processing", date: null, completed: false },
      { status: "shipped", date: null, completed: false },
      { status: "delivered", date: null, completed: false },
    ],
    notes: "Payment verification required",
  },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-900/30 text-yellow-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-900/30 text-blue-400">
            <Package className="w-3 h-3 mr-1" />
            Processing
          </Badge>
        )
      case "shipped":
        return (
          <Badge className="bg-purple-900/30 text-purple-400">
            <Truck className="w-3 h-3 mr-1" />
            Shipped
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-900/30 text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="bg-red-900/30 text-red-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Changing status of ${orderId} to ${newStatus}`)
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && order.status === "pending"
    if (activeTab === "processing") return matchesSearch && order.status === "processing"
    if (activeTab === "shipped") return matchesSearch && order.status === "shipped"
    if (activeTab === "completed") return matchesSearch && order.status === "completed"

    return matchesSearch
  })

  const getOrderCounts = () => {
    return {
      all: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      shipped: orders.filter((o) => o.status === "shipped").length,
      completed: orders.filter((o) => o.status === "completed").length,
    }
  }

  const counts = getOrderCounts()
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order Management</h1>
          <p className="text-gray-400">Track and manage customer orders</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
            <p className="text-xs text-gray-400">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.pending}</div>
            <p className="text-xs text-gray-400">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.processing}</div>
            <p className="text-xs text-gray-400">In production</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipped</CardTitle>
            <Truck className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.shipped}</div>
            <p className="text-xs text-gray-400">In transit</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-gray-400">Total earnings</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search orders, customers, or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-900 border-gray-800">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="processing">Processing ({counts.processing})</TabsTrigger>
          <TabsTrigger value="shipped">Shipped ({counts.shipped})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({counts.completed})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Orders Table */}
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{order.id}</h3>
                          {getStatusBadge(order.status)}
                        </div>
                        <p className="text-sm text-gray-400">
                          {order.customer.name} • {order.customer.email}
                        </p>
                        <p className="text-xs text-gray-500">
                          Ordered: {order.orderDate} • Delivery: {order.estimatedDelivery}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold">£{order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-400">{order.items.length} item(s)</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedOrder(order)
                          setIsDetailModalOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                      <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Update Status" />
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Order Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Order {selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.status)}
                </DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Order Details */}
                <div className="space-y-4">
                  {/* Customer Information */}
                  <div>
                    <h4 className="font-medium mb-3">Customer Information</h4>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={selectedOrder.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedOrder.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{selectedOrder.customer.name}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {selectedOrder.customer.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {selectedOrder.customer.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium mb-3">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item: any) => (
                        <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-400">{item.design}</p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">£{item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-400">each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h4 className="font-medium mb-3">Shipping Address</h4>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                        <div>
                          <p>{selectedOrder.shippingAddress.street}</p>
                          <p>{selectedOrder.shippingAddress.city}</p>
                          <p>{selectedOrder.shippingAddress.postcode}</p>
                          <p>{selectedOrder.shippingAddress.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Information */}
                  <div>
                    <h4 className="font-medium mb-3">Payment Information</h4>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span>{selectedOrder.paymentMethod}</span>
                        </div>
                        <span className="font-semibold">£{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Timeline and Actions */}
                <div className="space-y-4">
                  {/* Order Timeline */}
                  <div>
                    <h4 className="font-medium mb-3">Order Timeline</h4>
                    <div className="space-y-3">
                      {selectedOrder.timeline.map((step: any, index: number) => (
                        <div key={step.status} className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              step.completed ? "bg-green-900/30 text-green-400" : "bg-gray-800 text-gray-400"
                            }`}
                          >
                            {step.completed ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium capitalize ${step.completed ? "text-white" : "text-gray-400"}`}>
                              {step.status.replace("_", " ")}
                            </p>
                            {step.date && <p className="text-sm text-gray-500">{step.date}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Status Update */}
                  <div>
                    <h4 className="font-medium mb-3">Update Status</h4>
                    <Select onValueChange={(value) => handleStatusChange(selectedOrder.id, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Change order status" />
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

                  {/* Order Notes */}
                  <div>
                    <h4 className="font-medium mb-3">Order Notes</h4>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      {selectedOrder.notes ? (
                        <p className="text-sm">{selectedOrder.notes}</p>
                      ) : (
                        <p className="text-sm text-gray-400 italic">No notes for this order</p>
                      )}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Email Customer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-1" />
                        Call Customer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Package className="w-4 h-4 mr-1" />
                        Track Package
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Report Issue
                      </Button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="font-medium mb-3">Order Summary</h4>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>£{selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping:</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>£0.00</span>
                      </div>
                      <div className="border-t border-gray-700 pt-2">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>£{selectedOrder.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
