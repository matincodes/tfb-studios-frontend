"use client"

import type React from "react"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Camera, Check, Edit, Lock, Bell, Globe, Shield, Mail, Phone } from "lucide-react"

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Matthew Smith",
    role: "Design Manager",
    email: "matthew@tfbstudios.com",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    bio: "Fashion designer with over 10 years of experience in sustainable fashion. Passionate about creating eco-friendly designs that don't compromise on style or quality.",
    notifications: {
      email: true,
      push: true,
      sms: false,
      newsletter: true,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showPhone: false,
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (category: "notifications" | "privacy", name: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: checked,
      },
    }))
  }

  const handleSave = () => {
    // Here you would typically send the updated profile data to your API
    console.log("Saving profile data:", profileData)
    setIsEditing(false)
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400">Manage your account settings and preferences</p>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Check className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and public profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback className="text-2xl">MS</AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Camera className="mr-2 h-4 w-4" />
                        Change Photo
                      </Button>
                    )}
                    <div className="text-center">
                      <Badge variant="outline" className="bg-gray-800">
                        {profileData.role}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "opacity-70" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Input
                          id="role"
                          name="role"
                          value={profileData.role}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "opacity-70" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "opacity-70" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "opacity-70" : ""}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          name="location"
                          value={profileData.location}
                          onChange={handleInputChange}
                          readOnly={!isEditing}
                          className={!isEditing ? "opacity-70" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        className={!isEditing ? "opacity-70 resize-none" : "resize-none"}
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio</CardTitle>
                <CardDescription>Showcase your best work and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="aspect-square bg-gray-800 rounded-lg flex items-center justify-center">
                      {isEditing ? (
                        <Button variant="ghost">
                          <Camera className="h-8 w-8 text-gray-400" />
                        </Button>
                      ) : (
                        <span className="text-gray-500">Portfolio Item {item}</span>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button variant="outline" size="sm">
                    Add Portfolio Item
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your password and account security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="flex gap-4">
                    <Input id="current-password" type="password" value="••••••••••••" readOnly className="opacity-70" />
                    <Button variant="outline" disabled={!isEditing}>
                      <Lock className="mr-2 h-4 w-4" />
                      Change Password
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="font-medium">Protect your account with 2FA</div>
                      <div className="text-sm text-gray-400">Add an extra layer of security to your account</div>
                    </div>
                    <Switch disabled={!isEditing} />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="font-medium mb-4">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-900 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">Current Session</div>
                          <div className="text-sm text-gray-400">New York, USA • Chrome on macOS</div>
                          <div className="text-xs text-gray-500 mt-1">Started 2 hours ago</div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">Active</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <CardFooter>
                  <Button variant="destructive" size="sm">
                    Log Out All Other Sessions
                  </Button>
                </CardFooter>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Email Notifications</div>
                        <div className="text-sm text-gray-400">Receive notifications via email</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.email}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "email", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Bell className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Push Notifications</div>
                        <div className="text-sm text-gray-400">Receive notifications on your device</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.push}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "push", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">SMS Notifications</div>
                        <div className="text-sm text-gray-400">Receive notifications via text message</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.sms}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "sms", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Newsletter</div>
                        <div className="text-sm text-gray-400">Receive product updates and announcements</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.notifications.newsletter}
                      onCheckedChange={(checked) => handleSwitchChange("notifications", "newsletter", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control your privacy and data sharing preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Profile Visibility</div>
                        <div className="text-sm text-gray-400">Control who can see your profile information</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        className="bg-gray-900 border border-gray-700 rounded-md px-3 py-1 text-sm"
                        disabled={!isEditing}
                        value={profileData.privacy.profileVisibility}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            privacy: { ...prev.privacy, profileVisibility: e.target.value },
                          }))
                        }
                      >
                        <option value="public">Public</option>
                        <option value="contacts">Contacts Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Show Email Address</div>
                        <div className="text-sm text-gray-400">Display your email on your public profile</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.privacy.showEmail}
                      onCheckedChange={(checked) => handleSwitchChange("privacy", "showEmail", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium">Show Phone Number</div>
                        <div className="text-sm text-gray-400">Display your phone number on your public profile</div>
                      </div>
                    </div>
                    <Switch
                      checked={profileData.privacy.showPhone}
                      onCheckedChange={(checked) => handleSwitchChange("privacy", "showPhone", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <h3 className="font-medium mb-4">Data Management</h3>
                  <div className="space-y-4">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto" disabled={!isEditing}>
                      <Shield className="mr-2 h-4 w-4" />
                      Request Data Export
                    </Button>
                    <Button variant="destructive" size="sm" className="w-full sm:w-auto" disabled={!isEditing}>
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}
