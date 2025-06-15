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
import { ArrowRight, User, Mail, Lock, Terminal, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import api from '@/lib/api'; // Import our pre-configured Axios instance

export default function SignupPage() {
  
  // --- STATE MANAGEMENT ---
  // The 'formData' state is great. We'll add error and success states.
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
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
      agreeTerms: checked,
    }))
  }

  // --- SUBMIT HANDLER (Updated with real logic) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 1. Client-side validation
    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }
    if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }

    setIsLoading(true)
    setError(null);

    // 2. API Call using Axios
    try {
        await api.post('/auth/signup', {
            name: formData.name,
            email: formData.email,
            password: formData.password
        });
        // On success, switch to the success view
        setSuccess(true);
    } catch (err: any) {
        // Set error message from backend response
        setError(err.response?.data?.message || 'An unknown error occurred during signup.');
        console.error("Signup error:", err);
    } finally {
        setIsLoading(false);
    }
  }

  // --- SUCCESS VIEW ---
  // If the API call was successful, show this message instead of the form.
  if (success) {
      return (
          <PublicLayout>
              <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
                  <Alert className="max-w-md">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Registration Successful!</AlertTitle>
                      <AlertDescription>
                          We've sent a verification link to your email. Please check your inbox to activate your account before logging in.
                      </AlertDescription>
                  </Alert>
              </div>
          </PublicLayout>
      );
  }

  // --- YOUR EXISTING JSX WITH DYNAMIC LOGIC ---
  // The structure and styling are identical to your original file.
  return (
    <PublicLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Create an account</h1>
            <p className="text-gray-400 mt-2">Join our community of fashion designers</p>
          </div>

          <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

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
                  <Label htmlFor="password">Password</Label>
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={formData.agreeTerms} onCheckedChange={handleCheckboxChange} required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                
                {/* Error message will appear here if it exists */}
                {error && <p className="text-sm text-red-500 pt-2">{error}</p>}

                <Button type="submit" className="w-full flex items-center justify-center" disabled={isLoading || !formData.agreeTerms}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {isLoading ? "Creating account..." : "Create Account"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <div className="text-center text-sm text-gray-400 w-full">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 transition-colors">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}