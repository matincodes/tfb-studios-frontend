"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Archive,
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
} from "lucide-react"

const conversations = [
  {
    id: 1,
    customer: {
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "/placeholder-user.jpg",
      status: "online",
      lastSeen: "now",
    },
    lastMessage: "Thank you for the quick response! When will my order be ready?",
    timestamp: "2 min ago",
    unreadCount: 2,
    priority: "high",
    tags: ["order-inquiry", "urgent"],
    orderHistory: [{ id: "ORD-001", status: "processing", total: 299.99 }],
  },
  {
    id: 2,
    customer: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/placeholder-user.jpg",
      status: "away",
      lastSeen: "5 min ago",
    },
    lastMessage: "I'd like to modify my design before production starts.",
    timestamp: "15 min ago",
    unreadCount: 0,
    priority: "normal",
    tags: ["design-change"],
    orderHistory: [{ id: "ORD-002", status: "pending", total: 199.99 }],
  },
  {
    id: 3,
    customer: {
      name: "Emma Thompson",
      email: "emma@example.com",
      avatar: "/placeholder-user.jpg",
      status: "offline",
      lastSeen: "2 hours ago",
    },
    lastMessage: "The fabric quality is amazing! Will definitely order again.",
    timestamp: "1 hour ago",
    unreadCount: 0,
    priority: "low",
    tags: ["feedback", "satisfied"],
    orderHistory: [
      { id: "ORD-003", status: "completed", total: 149.99 },
      { id: "ORD-004", status: "completed", total: 89.99 },
    ],
  },
]

const messages = [
  {
    id: 1,
    senderId: 1,
    senderType: "customer",
    content: "Hi! I have a question about my recent order.",
    timestamp: "10:30 AM",
    read: true,
  },
  {
    id: 2,
    senderId: "admin",
    senderType: "admin",
    content: "Hello Sarah! I'd be happy to help you with your order. What would you like to know?",
    timestamp: "10:32 AM",
    read: true,
  },
  {
    id: 3,
    senderId: 1,
    senderType: "customer",
    content:
      "I was wondering about the delivery timeline. The estimated date shows January 25th, but I need it by January 23rd for an event.",
    timestamp: "10:35 AM",
    read: true,
  },
  {
    id: 4,
    senderId: "admin",
    senderType: "admin",
    content:
      "Let me check your order details. I see you have order ORD-001 for a custom blazer. We can expedite this for you.",
    timestamp: "10:37 AM",
    read: true,
  },
  {
    id: 5,
    senderId: 1,
    senderType: "customer",
    content: "That would be perfect! Is there an additional cost for expedited shipping?",
    timestamp: "10:38 AM",
    read: true,
  },
  {
    id: 6,
    senderId: 1,
    senderType: "customer",
    content: "Thank you for the quick response! When will my order be ready?",
    timestamp: "10:40 AM",
    read: false,
  },
]

export default function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-3 h-3 bg-green-400 rounded-full" />
      case "away":
        return <div className="w-3 h-3 bg-yellow-400 rounded-full" />
      case "offline":
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
      default:
        return <div className="w-3 h-3 bg-gray-400 rounded-full" />
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-900/30 text-red-400">High</Badge>
      case "normal":
        return <Badge className="bg-blue-900/30 text-blue-400">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-900/30 text-gray-400">Low</Badge>
      default:
        return null
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customer Messages</h1>
          <p className="text-gray-400">Communicate with customers in real-time</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.length}</div>
            <p className="text-xs text-gray-400">Total conversations</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}</div>
            <p className="text-xs text-gray-400">Need attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <Star className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversations.filter((conv) => conv.priority === "high").length}</div>
            <p className="text-xs text-gray-400">Urgent conversations</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5m</div>
            <p className="text-xs text-gray-400">Average response</p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Conversations</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[450px]">
              <div className="space-y-1 p-4">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedConversation.id === conversation.id ? "bg-gray-800" : "hover:bg-gray-800/50"
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{conversation.customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          {getStatusIndicator(conversation.customer.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">{conversation.customer.name}</p>
                          <div className="flex items-center gap-1">
                            {conversation.unreadCount > 0 && (
                              <Badge className="bg-red-600 text-white text-xs">{conversation.unreadCount}</Badge>
                            )}
                            {getPriorityBadge(conversation.priority)}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 truncate">{conversation.lastMessage}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-gray-500">{conversation.timestamp}</p>
                          <div className="flex gap-1">
                            {conversation.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="bg-gray-900 border-gray-800 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={selectedConversation.customer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{selectedConversation.customer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1">
                    {getStatusIndicator(selectedConversation.customer.status)}
                  </div>
                </div>
                <div>
                  <p className="font-medium">{selectedConversation.customer.name}</p>
                  <p className="text-sm text-gray-400">
                    {selectedConversation.customer.status === "online"
                      ? "Online now"
                      : `Last seen ${selectedConversation.customer.lastSeen}`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Archive className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col h-[450px]">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderType === "admin" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.senderType === "admin" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs opacity-70">{message.timestamp}</p>
                        {message.senderType === "admin" && (
                          <CheckCircle2 className={`w-3 h-3 ${message.read ? "text-blue-200" : "text-blue-400"}`} />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="flex items-center gap-2 mt-4 p-3 bg-gray-800 rounded-lg">
              <Button variant="ghost" size="sm">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-none bg-transparent focus:ring-0"
              />
              <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information Panel */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium mb-3">Contact Details</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{selectedConversation.customer.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">{selectedConversation.customer.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Order History</h4>
              <div className="space-y-2">
                {selectedConversation.orderHistory.map((order) => (
                  <div key={order.id} className="flex items-center justify-between text-sm">
                    <span>{order.id}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{order.status}</Badge>
                      <span>£{order.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm">
                  View Orders
                </Button>
                <Button variant="outline" size="sm">
                  View Designs
                </Button>
                <Button variant="outline" size="sm">
                  Send Email
                </Button>
                <Button variant="outline" size="sm">
                  Create Note
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
