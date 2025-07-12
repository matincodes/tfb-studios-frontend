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
  Edit,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  Palette,
  MessageSquare,
  Ban,
  CheckCircle,
  AlertCircle,
  Users,
  Crown,
  Shield,
} from "lucide-react"

const users = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "+44 7700 900123",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-15",
    location: "London, UK",
    totalOrders: 5,
    totalSpent: 1299.95,
    totalDesigns: 8,
    subscription: "pro",
    address: {
      street: "123 Fashion Street",
      city: "London",
      postcode: "SW1A 1AA",
      country: "United Kingdom",
    },
    preferences: {
      newsletter: true,
      notifications: true,
      marketing: false,
    },
    recentActivity: [
      { type: "order", description: "Placed order ORD-001", date: "2024-01-15" },
      { type: "design", description: "Uploaded new design", date: "2024-01-14" },
      { type: "login", description: "Logged in", date: "2024-01-15" },
    ],
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    phone: "+44 7700 900456",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "customer",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-14",
    location: "Manchester, UK",
    totalOrders: 3,
    totalSpent: 599.97,
    totalDesigns: 4,
    subscription: "basic",
    address: {
      street: "456 Style Avenue",
      city: "Manchester",
      postcode: "M1 1AA",
      country: "United Kingdom",
    },
    preferences: {
      newsletter: true,
      notifications: true,
      marketing: true,
    },
    recentActivity: [
      { type: "order", description: "Placed order ORD-002", date: "2024-01-14" },
      { type: "message", description: "Sent support message", date: "2024-01-13" },
    ],
  },
  {
    id: 3,
    name: "Emma Thompson",
    email: "emma@example.com",
    phone: "+44 7700 900789",
    avatar: "/placeholder-user.jpg",
    status: "suspended",
    role: "customer",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-12",
    location: "Birmingham, UK",
    totalOrders: 1,
    totalSpent: 149.99,
    totalDesigns: 2,
    subscription: "free",
    address: {
      street: "789 Trend Road",
      city: "Birmingham",
      postcode: "B1 1AA",
      country: "United Kingdom",
    },
    preferences: {
      newsletter: false,
      notifications: true,
      marketing: false,
    },
    recentActivity: [
      { type: "suspension", description: "Account suspended", date: "2024-01-12" },
      { type: "order", description: "Placed order ORD-003", date: "2024-01-10" },
    ],
  },
  {
    id: 4,
    name: "Admin User",
    email: "admin@fashionforge.com",
    phone: "+44 7700 900000",
    avatar: "/placeholder-user.jpg",
    status: "active",
    role: "admin",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-16",
    location: "London, UK",
    totalOrders: 0,
    totalSpent: 0,
    totalDesigns: 0,
    subscription: "admin",
    address: {
      street: "1 Admin Street",
      city: "London",
      postcode: "SW1A 0AA",
      country: "United Kingdom",
    },
    preferences: {
      newsletter: false,
      notifications: true,
      marketing: false,
    },
    recentActivity: [
      { type: "admin", description: "Reviewed designs", date: "2024-01-16" },
      { type: "admin", description: "Processed orders", date: "2024-01-15" },
    ],
  },
]

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-900/30 text-green-400"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>
      case "suspended":
        return <Badge className="bg-red-900/30 text-red-400"><Ban className="w-3 h-3 mr-1" />Suspended</Badge>
      case "pending":
        return <Badge className="bg-yellow-900/30 text-yellow-400"><AlertCircle className="w-3 h-3 mr-1" />Pending</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{status}</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-900/30 text-purple-400"><Shield className="w-3 h-3 mr-1" />Admin</Badge>
      case "customer":
        return <Badge className="bg-blue-900/30 text-blue-400"><Users className="w-3 h-3 mr-1" />Customer</Badge>
      case "designer":
        return <Badge className="bg-green-900/30 text-green-400"><Palette className="w-3 h-3 mr-1" />Designer</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{role}</Badge>
    }
  }

  const getSubscriptionBadge = (subscription: string) => {
    switch (subscription) {
      case "pro":
        return <Badge className="bg-yellow-900/30 text-yellow-400"><Crown className="w-3 h-3 mr-1" />Pro</Badge>
      case "basic":
        return <Badge className="bg-blue-900/30 text-blue-400">Basic</Badge>
      case "free":
        return <Badge className="bg-gray-900/30 text-gray-400">Free</Badge>
      case "admin":
        return <Badge className="bg-purple-900/30 text-purple-400">Admin</Badge>
      default:
        return <Badge className="bg-gray-900/30 text-gray-400">{subscription}</Badge>
    }
  }

  const handleStatusChange = (userId: number, newStatus: string) => {
    console.log(`Changing status of user ${userId} to ${newStatus}`)
  }

  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`Changing role of user ${userId} to ${newRole}`)
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (activeTab === "all") return matchesSearch
    if (activeTab === "customers") return matchesSearch && user.role === "customer"
    if (activeTab === "admins") return matchesSearch && user.role === "admin"
    if (activeTab === "suspended") return matchesSearch && user.status === "suspended"
    
    return matchesSearch
  })

  const getUserCounts = () => {
    return {
      all: users.length,
      customers: users.filter(u => u.role === "customer").length,
      admins: users.filter(u => u.role === "admin").length,
      suspended: users.filter(u => u.status === "suspended").length
    }
  }

  const counts = getUserCounts()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-400">Manage customer accounts and permissions</p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.all}</div>
            <p className="text-xs text-gray-400">All registered users</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.customers}</div>
            <p className="text-xs text-gray-400">Active customers</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.admins}</div>
            <p className="text-xs text-gray-400">Admin users</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <Ban className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{counts.suspended}</div>
            <p className="text-xs text-gray-400">Suspended accounts</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search users by name or email..."
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
          <TabsTrigger value="customers">Customers ({counts.customers})</TabsTrigger>
          <TabsTrigger value="admins">Admins ({counts.admins})</TabsTrigger>
          <TabsTrigger value="suspended">Suspended ({counts.suspended})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Users Table */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          {getStatusBadge(user.status)}
                          {getRoleBadge(user.role)}
                          {getSubscriptionBadge(user.subscription)}
                        </div>
                        <p className="text-sm text-gray-400">{user.email}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>Joined: {user.joinDate}</span>
                          <span>Last login: {user.lastLogin}</span>
                          <span>{user.location}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="grid grid-cols-3 gap-4 text-sm mb-2">
                        <div>
                          <p className="text-gray-400">Orders</p>
                          <p className="font-semibold">{user.totalOrders}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Spent</p>
                          <p className="font-semibold">£{user.totalSpent.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Designs</p>
                          <p className="font-semibold">{user.totalDesigns}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user)
                          setIsDetailModalOpen(true)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* User Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="bg-gray-900 border-gray-800 max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedUser.name}</span>
                  <div className="flex gap-2">
                    {getStatusBadge(selectedUser.status)}
                    {getRoleBadge(selectedUser.role)}
                  </div>
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - User Info */}
                <div className="space-y-4">
                  {/* Basic Information */}
                  <div>
                    <h4 className="font-medium mb-3">Basic Information</h4>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-lg">{selectedUser.name}</p>
                          <div className="space-y-1 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3 h-3" />
                              {selectedUser.email}
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3" />
                              {selectedUser.phone}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {selectedUser.location}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div>
                    <h4 className="font-medium mb-3">Account Details</h4>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">User ID</p>
                          <p>#{selectedUser.id}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Subscription</p>
                          <div className="mt-1">{getSubscriptionBadge(selectedUser.subscription)}</div>
                        </div>
                        <div>
                          <p className="text-gray-400">Join Date</p>
                          <p>{selectedUser.joinDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Last Login</p>
                          <p>{selectedUser.lastLogin}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <h4 className="font-medium mb-3">Address</h4>
                    <div className="p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 mt-1 text-gray-400" />
                        <div>
                          <p>{selectedUser.address.street}</p>
                          <p>{selectedUser.address.city}</p>
                          <p>{selectedUser.address.postcode}</p>
                          <p>{selectedUser.address.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preferences */}
                  <div>
                    <h4 className="font-medium mb-3">Preferences</h4>
                    <div className="p-4 bg-gray-800 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Newsletter</span>
                        <Badge className={selectedUser.preferences.newsletter ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-gray-400"}>
                          {selectedUser.preferences.newsletter ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Notifications</span>
                        <Badge className={selectedUser.preferences.notifications ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-gray-400"}>
                          {selectedUser.preferences.notifications ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Marketing</span>
                        <Badge className={selectedUser.preferences.marketing ? "bg-green-900/30 text-green-400" : "bg-gray-900/30 text-gray-400"}>
                          {selectedUser.preferences.marketing ? "Enabled" : "Disabled"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Stats and Actions */}
                <div className="space-y-4">
                  {/* Statistics */}
                  <div>
                    <h4 className="font-medium mb-3">Statistics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                          <Package className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                          <p className="text-2xl font-bold">{selectedUser.totalOrders}</p>
                          <p className="text-sm text-gray-400">Total Orders</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                          <CreditCard className="w-8 h-8 mx-auto mb-2 text-green-400" />
                          <p className="text-2xl font-bold">£{selectedUser.totalSpent.toFixed(0)}</p>
                          <p className="text-sm text-gray-400">Total Spent</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                          <Palette className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                          <p className="text-2xl font-bold">{selectedUser.totalDesigns}</p>
                          <p className="text-sm text-gray-400">Designs Created</p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gray-800 border-gray-700">
                        <CardContent className="p-4 text-center">
                          <MessageSquare className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                          <p className="text-2xl font-bold">12</p>
                          <p className="text-sm text-gray-400">Support Tickets</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Admin Actions</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Change Status</label>
                        <Select onValueChange={(value) => handleStatusChange(selectedUser.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="suspended">Suspended</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">Change Role</label>
                        <Select onValueChange={(value) => handleRoleChange(selectedUser.id, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="customer">Customer</SelectItem>
                            <SelectItem value="designer">Designer</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h4 className="font-medium mb-3">Recent Activity</h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {selectedUser.recentActivity.map((activity: any, index: number) => (
                        <div key={index} className="p-3 bg-gray-800 rounded-lg">
                          <p className="text-sm">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-1">{activity.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-1" />
                        Send Email
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                \
