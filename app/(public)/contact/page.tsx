"use client"

import type React from "react"

import { useState } from "react"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send, Check } from "lucide-react"

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFormSubmitted(true)
    }, 1500)
  }

  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-300 mb-8">
              Have questions about our platform? We're here to help. Reach out to our team and we'll get back to you as
              soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Contact Information</h2>
              <p className="text-gray-300">
                Our team is available Monday through Friday, 9am to 5pm GMT. We strive to respond to all inquiries
                within 24 hours.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 rounded-full p-3">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-300">info@tfbstudios.com</p>
                    <p className="text-gray-300">support@tfbstudios.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 rounded-full p-3">
                    <Phone className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Phone</h3>
                    <p className="text-gray-300">+44 (0) 123 456 7890</p>
                    <p className="text-gray-300">Mon-Fri, 9am-5pm GMT</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Office</h3>
                    <p className="text-gray-300">123 Fashion Street</p>
                    <p className="text-gray-300">London, EC1A 1BB</p>
                    <p className="text-gray-300">United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              {!formSubmitted ? (
                <>
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" className="bg-gray-800 border-gray-700" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" className="bg-gray-800 border-gray-700" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" className="bg-gray-800 border-gray-700" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" className="bg-gray-800 border-gray-700" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" rows={5} className="bg-gray-800 border-gray-700 resize-none" required />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <span className="opacity-0">Send Message</span>
                          <span className="absolute inset-0 flex items-center justify-center">
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          </span>
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-green-500/20 rounded-full p-6 inline-flex mb-6">
                    <Check className="h-12 w-12 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Message Sent!</h2>
                  <p className="text-gray-300 mb-6">
                    Thank you for reaching out. We've received your message and will get back to you shortly.
                  </p>
                  <Button onClick={() => setFormSubmitted(false)}>Send Another Message</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="aspect-[21/9] bg-gray-800 relative">
              {/* This would be replaced with an actual map component */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-gray-400">Interactive Map Would Be Here</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  question: "How do I get started with TFB Studios?",
                  answer:
                    "Getting started is easy! Simply create an account, and you'll have immediate access to our platform. You can upload your designs or start creating from scratch using our 3D design tools.",
                },
                {
                  question: "What file formats do you support for uploads?",
                  answer:
                    "We support a wide range of file formats, including AI, PSD, SVG, PNG, and JPG. You can upload your existing designs and convert them to 3D models on our platform.",
                },
                {
                  question: "How does the material selection process work?",
                  answer:
                    "Our platform includes a comprehensive library of sustainable materials. You can browse by type, color, weight, and other properties. Once you select a material, you can see how it looks on your design in real-time.",
                },
                {
                  question: "Do you offer custom pricing for teams?",
                  answer:
                    "Yes, we offer custom pricing for teams and larger organizations. Please contact our sales team at sales@tfbstudios.com for more information.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
