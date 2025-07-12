"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Mail, Lock, Loader2 } from "lucide-react"
import api from '@/lib/api'; // Import our pre-configured Axios instance

export default function LoginPage() {

  // --- STATE MANAGEMENT ---
  // We keep your formData state and add a new one for errors.
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  // --- INPUT HANDLERS (No changes needed) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  // --- SUBMIT HANDLER (Updated with real logic) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
        // Use our Axios instance to call the login endpoint
        await api.post('/auth/login', {
            email: formData.email,
            password: formData.password
        });

        // On success, the backend sets the HttpOnly cookie.
        // A full page reload is the most reliable way to trigger
        // our AuthProvider to see the new cookie and update the user's state.
        window.location.href = '/dashboard';

    } catch (err: any) {
        // Display error from backend, e.g., "Invalid credentials" or "Please verify your email"
        setError(err.response?.data?.message || 'An unknown error occurred.');
    } finally {
        setIsLoading(false)
    }
  }

  // --- JSX ---
  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-gray-400 mt-2">Sign in to your account to continue</p>
          </div>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password" // You can build this page next!
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                {/* Error message will appear here if it exists */}
                {error && <p className="text-sm text-red-500 pt-2">{error}</p>}

                <Button type="submit" className="w-full flex items-center justify-center" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Signing in..." : "Sign In"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm text-gray-400 w-full">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}