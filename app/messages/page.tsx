"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Info } from "lucide-react"

// Sample data for the chat
const initialContacts = [
  {
    id: "admin",
    name: "Admin Support",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "How can I help you today?",
    unread: 2,
    isAdmin: true,
  },
  {
    id: "sarah",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastMessage: "The design looks great!",
    unread: 0,
  },
  {
    id: "michael",
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastMessage: "When will the samples be ready?",
    unread: 0,
  },
  {
    id: "emma",
    name: "Emma Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastMessage: "Thanks for your help!",
    unread: 0,
  },
]

// Sample messages for the admin chat
const initialAdminMessages = [
  {
    id: "1",
    sender: "admin",
    content: "Hello! Welcome to TFB Studios. How can I help you today?",
    timestamp: "10:30 AM",
    isAdmin: true,
  },
  {
    id: "2",
    sender: "user",
    content: "Hi, I'm having trouble uploading my design files.",
    timestamp: "10:32 AM",
  },
  {
    id: "3",
    sender: "admin",
    content: "I'm sorry to hear that. What format are your design files in?",
    timestamp: "10:33 AM",
    isAdmin: true,
  },
  {
    id: "4",
    sender: "user",
    content: "They're in .AI format. The upload seems to get stuck at 80%.",
    timestamp: "10:35 AM",
  },
  {
    id: "5",
    sender: "admin",
    content:
      "Thanks for the information. Let me check if there are any issues with our upload service for AI files. In the meantime, could you try converting them to PDF and uploading again?",
    timestamp: "10:37 AM",
    isAdmin: true,
  },
]

export default function MessagesPage() {
  const [contacts, setContacts] = useState(initialContacts)
  const [activeContact, setActiveContact] = useState(contacts[0])
  const [messages, setMessages] = useState(initialAdminMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate admin response after a delay
    if (activeContact.id === "admin") {
      setTimeout(() => {
        const adminResponse = {
          id: (Date.now() + 1).toString(),
          sender: "admin",
          content: "I've noted your issue. Our technical team is looking into it. I'll update you soon.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isAdmin: true,
        }
        setMessages((prevMessages) => [...prevMessages, adminResponse])
      }, 3000)
    }
  }

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Layout>
      <div className="flex h-full">
        {/* Contacts sidebar */}
        <div className="w-80 border-r border-gray-800 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search contacts"
                className="pl-8 bg-gray-900 border-gray-700 focus:border-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-4 border-b border-gray-800 flex items-center gap-3 cursor-pointer hover:bg-gray-800/50 transition-colors ${
                  activeContact.id === contact.id ? "bg-gray-800" : ""
                }`}
                onClick={() => setActiveContact(contact)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-black ${
                      contact.status === "online"
                        ? "bg-green-500"
                        : contact.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                    }`}
                  ></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium truncate">
                      {contact.name}
                      {contact.isAdmin && (
                        <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Admin</span>
                      )}
                    </p>
                    <p className="text-xs text-gray-400">12:30 PM</p>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <div className="bg-blue-600 text-white text-xs rounded-full h-5 min-w-5 flex items-center justify-center px-1.5">
                    {contact.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={activeContact.avatar || "/placeholder.svg"} />
                <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium flex items-center gap-2">
                  {activeContact.name}
                  {activeContact.isAdmin && (
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">Admin</span>
                  )}
                </h2>
                <p className="text-xs text-gray-400">
                  {activeContact.status === "online" ? "Online" : activeContact.status === "away" ? "Away" : "Offline"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-950">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start gap-3 max-w-[70%]">
                    {message.sender !== "user" && (
                      <Avatar className="mt-1">
                        <AvatarImage src={activeContact.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{activeContact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-800 text-white"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs opacity-70 text-right mt-1">{message.timestamp}</p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="mt-1">
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message input */}
          <div className="p-4 border-t border-gray-800 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="bg-gray-900 border-gray-700"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button size="icon" className="rounded-full" onClick={handleSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
