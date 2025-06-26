"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Star,
  Archive,
  MessageCircle,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function AdminMessages() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeChat, setActiveChat] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Mock data for customer conversations
  const conversations = [
    {
      id: 1,
      customer: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      lastMessage: "I have a question about my order status",
      lastMessageTime: "2 min ago",
      unreadCount: 3,
      priority: "high",
      tags: ["order-inquiry", "urgent"],
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "Hi, I placed an order last week (ORD-001) and haven't received any updates.",
          timestamp: "10:30 AM",
          date: "2024-01-15",
        },
        {
          id: 2,
          sender: "admin",
          content: "Hello John! Let me check your order status for you right away.",
          timestamp: "10:32 AM",
          date: "2024-01-15",
        },
        {
          id: 3,
          sender: "admin",
          content: "I can see your order is currently in production. It should be ready for shipping by Friday.",
          timestamp: "10:33 AM",
          date: "2024-01-15",
        },
        {
          id: 4,
          sender: "customer",
          content: "That's great! Will I receive tracking information once it ships?",
          timestamp: "10:35 AM",
          date: "2024-01-15",
        },
        {
          id: 5,
          sender: "customer",
          content: "I have a question about my order status",
          timestamp: "10:37 AM",
          date: "2024-01-15",
        },
      ],
    },
    {
      id: 2,
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "away",
      },
      lastMessage: "Thank you for the quick response!",
      lastMessageTime: "1 hour ago",
      unreadCount: 0,
      priority: "normal",
      tags: ["design-feedback"],
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "I love the design you created! Can we make a small adjustment to the collar?",
          timestamp: "9:15 AM",
          date: "2024-01-15",
        },
        {
          id: 2,
          sender: "admin",
          content: "I'll make that adjustment and send you the updated design shortly.",
          timestamp: "9:20 AM",
          date: "2024-01-15",
        },
        {
          id: 3,
          sender: "customer",
          content: "Thank you for the quick response!",
          timestamp: "9:22 AM",
          date: "2024-01-15",
        },
      ],
    },
    {
      id: 3,
      customer: {
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "offline",
      },
      lastMessage: "When will my custom jacket be ready?",
      lastMessageTime: "3 hours ago",
      unreadCount: 1,
      priority: "normal",
      tags: ["timeline-inquiry"],
      messages: [
        {
          id: 1,
          sender: "customer",
          content: "When will my custom jacket be ready?",
          timestamp: "7:45 AM",
          date: "2024-01-15",
        },
      ],
    },
    {
      id: 4,
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=40&width=40",
        status: "online",
      },
      lastMessage: "The materials look perfect, thank you!",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      priority: "low",
      tags: ["material-approval"],
      messages: [
        {
          id: 1,
          sender: "admin",
          content: "I've uploaded the material samples for your review. Please let me know your thoughts.",
          timestamp: "2:30 PM",
          date: "2024-01-14",
        },
        {
          id: 2,
          sender: "customer",
          content: "The materials look perfect, thank you!",
          timestamp: "3:15 PM",
          date: "2024-01-14",
        },
      ],
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-900/30 text-red-400 border-red-700 text-xs">High</Badge>
      case "normal":
        return <Badge className="bg-blue-900/30 text-blue-400 border-blue-700 text-xs">Normal</Badge>
      case "low":
        return <Badge className="bg-gray-900/30 text-gray-400 border-gray-700 text-xs">Low</Badge>
      default:
        return null
    }
  }

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case "online":
        return <div className="w-3 h-3 bg-green-500 rounded-full" />
      case "away":
        return <div className="w-3 h-3 bg-yellow-500 rounded-full" />
      case "offline":
        return <div className="w-3 h-3 bg-gray-500 rounded-full" />
      default:
        return null
    }
  }

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return

    const newMsg = {
      id: Date.now(),
      sender: "admin",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      date: new Date().toISOString().split("T")[0],
    }

    // Update the active chat messages
    setActiveChat({
      ...activeChat,
      messages: [...activeChat.messages, newMsg],
    })

    setNewMessage("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages])

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Set default active chat
  useEffect(() => {
    if (!activeChat && conversations.length > 0) {
      setActiveChat(conversations[0])
    }
  }, [])

  return (
    <div className="p-6">
      <div className="flex h-[calc(100vh-8rem)] bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Customer Messages</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8 bg-gray-800 border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                  activeChat?.id === conversation.id ? "bg-gray-800" : ""
                }`}
                onClick={() => setActiveChat(conversation)}
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
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{conversation.customer.name}</p>
                      <div className="flex items-center gap-1">
                        {getPriorityBadge(conversation.priority)}
                        {conversation.unreadCount > 0 && (
                          <Badge className="bg-blue-600 text-white text-xs px-1.5 py-0.5 min-w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 truncate mb-1">{conversation.lastMessage}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">{conversation.lastMessageTime}</p>
                      <div className="flex gap-1">
                        {conversation.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-600 px-1 py-0">
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
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activeChat.customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{activeChat.customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1">{getStatusIndicator(activeChat.customer.status)}</div>
                  </div>
                  <div>
                    <h3 className="font-medium">{activeChat.customer.name}</h3>
                    <p className="text-sm text-gray-400">{activeChat.customer.email}</p>
                  </div>
                  {getPriorityBadge(activeChat.priority)}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-950">
                <div className="space-y-4">
                  {activeChat.messages.map((message: any) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "admin" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex items-start gap-3 max-w-[70%]">
                        {message.sender === "customer" && (
                          <Avatar className="w-8 h-8 mt-1">
                            <AvatarImage src={activeChat.customer.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{activeChat.customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === "admin"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-800 text-white border border-gray-700"
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 text-right mt-1">{message.timestamp}</p>
                        </div>
                        {message.sender === "admin" && (
                          <Avatar className="w-8 h-8 mt-1">
                            <AvatarFallback>AD</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-h-[40px] max-h-32 bg-gray-800 border-gray-700 resize-none"
                  />
                  <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <span>Press Enter to send, Shift+Enter for new line</span>
                  <div className="flex items-center gap-4">
                    <span>Priority: {activeChat.priority}</span>
                    <span>Status: {activeChat.customer.status}</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a customer conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Customer Info Sidebar */}
        {activeChat && (
          <div className="w-64 border-l border-gray-800 p-4 space-y-4">
            <div className="text-center">
              <Avatar className="w-16 h-16 mx-auto mb-3">
                <AvatarImage src={activeChat.customer.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activeChat.customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{activeChat.customer.name}</h3>
              <p className="text-sm text-gray-400">{activeChat.customer.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {getStatusIndicator(activeChat.customer.status)}
                <span className="text-sm capitalize">{activeChat.customer.status}</span>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Tags</h4>
              <div className="flex flex-wrap gap-1">
                {activeChat.tags.map((tag: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs border-gray-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark as Resolved
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Set Reminder
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive Chat
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Customer History</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Orders:</span>
                  <span>3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Spent:</span>
                  <span>£847.96</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Since:</span>
                  <span>Jan 2023</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
