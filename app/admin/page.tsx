"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Package, Palette, MessageSquare, TrendingUp, TrendingDown, DollarSign, Eye } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const salesData = [
  { name: "Jan", sales: 4000, orders: 24 },
  { name: "Feb", sales: 3000, orders: 18 },
  { name: "Mar", sales: 5000, orders: 32 },
  { name: "Apr", sales: 4500, orders: 28 },
  { name: "May", sales: 6000, orders: 38 },
  { name: "Jun", sales: 5500, orders: 35 },
]

const recentOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    design: "Custom Jacket",
    amount: 299,
    status: "processing",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    design: "Summer Dress",
    amount: 199,
    status: "completed",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    design: "Casual Pants",
    amount: 149,
    status: "pending",
    date: "2024-01-13",
  },
]

const recentDesigns = [
  {
    id: "DES-001",
    name: "Modern Blazer",
    designer: "Sarah Wilson",
    status: "pending_review",
    date: "2024-01-15",
  },
  {
    id: "DES-002",
    name: "Vintage Coat",
    designer: "Tom Brown",
    status: "approved",
    date: "2024-01-14",
  },
  {
    id: "DES-003",
    name: "Sport Jacket",
    designer: "Lisa Davis",
    status: "needs_revision",
    date: "2024-01-13",
  },
]

export default function AdminDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
      case "approved":
        return <Badge className="bg-green-900/30 text-green-400">Completed</Badge>
      case "processing":
        return <Badge className="bg-blue-900/30 text-blue-400">Processing</Badge>
      case "pending":
      case "pending_review":
        return <Badge className="bg-yellow-900/30 text-yellow-400">Pending</Badge>
      case "needs_revision":
        return <Badge className="bg-red-900/30 text-red-400">Needs Revision</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-gray-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-gray-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Designs</CardTitle>
            <Palette className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-gray-400 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1 text-red-400" />
              -3% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">£45,231</div>
            <p className="text-xs text-gray-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="sales" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Orders by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="orders" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-gray-400">{order.design}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">£{order.amount}</p>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Designs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDesigns.map((design) => (
                <div key={design.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{design.name}</p>
                    <p className="text-sm text-gray-400">by {design.designer}</p>
                    <p className="text-xs text-gray-500">{design.date}</p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(design.status)}
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Eye className="h-3 w-3 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2">
              <Palette className="h-6 w-6" />
              Review Designs
            </Button>
            <Button className="h-20 flex flex-col gap-2">
              <Package className="h-6 w-6" />
              Manage Orders
            </Button>
            <Button className="h-20 flex flex-col gap-2">
              <MessageSquare className="h-6 w-6" />
              Customer Support
            </Button>
            <Button className="h-20 flex flex-col gap-2">
              <Users className="h-6 w-6" />
              User Management
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
