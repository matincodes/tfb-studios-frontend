"use client"

import { useState } from "react"
import { Layout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Truck, CreditCard, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function CreateOrder() {
  const [step, setStep] = useState(1)
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null)
  const [orderComplete, setOrderComplete] = useState(false)

  const designs = [
    { id: "funky-jacket", name: "Funky Jacket", image: "/placeholder.svg?height=300&width=300" },
    { id: "puffer-coat", name: "Puffer Coat", image: "/placeholder.svg?height=300&width=300" },
    { id: "summer-dress", name: "Summer Dress", image: "/placeholder.svg?height=300&width=300" },
    { id: "casual-shirt", name: "Casual Shirt", image: "/placeholder.svg?height=300&width=300" },
  ]

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Submit order
      setOrderComplete(true)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <Layout>
      <header className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Create New Order</h1>
        </div>
      </header>

      <main className="flex-1 p-6">
        {!orderComplete ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                        step === i
                          ? "bg-purple-600 text-white"
                          : step > i
                            ? "bg-green-500 text-white"
                            : "bg-gray-800 text-gray-400"
                      }`}
                    >
                      {step > i ? <Check className="h-5 w-5" /> : <span>{i}</span>}
                    </div>
                    <span className={`text-sm ${step === i ? "text-white" : "text-gray-400"}`}>
                      {i === 1 && "Select Design"}
                      {i === 2 && "Customize"}
                      {i === 3 && "Shipping"}
                      {i === 4 && "Payment"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-1 bg-gray-800 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-purple-600 transition-all duration-300"
                  style={{ width: `${(step - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold mb-6">Select a Design</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {designs.map((design) => (
                    <div
                      key={design.id}
                      className={`bg-gray-900 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedDesign === design.id
                          ? "border-purple-600 shadow-lg shadow-purple-600/20"
                          : "border-gray-800 hover:border-gray-700"
                      }`}
                      onClick={() => setSelectedDesign(design.id)}
                    >
                      <div className="aspect-square bg-gray-800 relative">
                        <Image
                          src={design.image || "/placeholder.svg"}
                          alt={design.name}
                          width={300}
                          height={300}
                          className="object-cover"
                        />
                        {selectedDesign === design.id && (
                          <div className="absolute top-2 right-2 h-6 w-6 bg-purple-600 rounded-full flex items-center justify-center">
                            <Check className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{design.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold mb-6">Customize Your Order</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <h3 className="font-medium mb-4">Selected Design</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-24 h-24 bg-gray-800 rounded-md overflow-hidden">
                        <Image
                          src={
                            designs.find((d) => d.id === selectedDesign)?.image ||
                            "/placeholder.svg?height=100&width=100"
                          }
                          alt="Selected Design"
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium">{designs.find((d) => d.id === selectedDesign)?.name}</h4>
                        <p className="text-sm text-gray-400 mt-1">Custom order</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="size">Size</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                          <SelectItem value="xlarge">X-Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="color">Color</Label>
                      <Select defaultValue="black">
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="black">Black</SelectItem>
                          <SelectItem value="navy">Navy</SelectItem>
                          <SelectItem value="green">Green</SelectItem>
                          <SelectItem value="red">Red</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Select defaultValue="1">
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select quantity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5">5</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notes">Special Instructions</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add any special instructions or requirements"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="bg-gray-900 border-gray-700" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-gray-900 border-gray-700" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+44 123 456 7890" className="bg-gray-900 border-gray-700" />
                    </div>

                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main St" className="bg-gray-900 border-gray-700" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="London" className="bg-gray-900 border-gray-700" />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input id="postalCode" placeholder="E16 8BE" className="bg-gray-900 border-gray-700" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="uk">
                        <SelectTrigger className="bg-gray-900 border-gray-700">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <h3 className="font-medium mb-4">Shipping Method</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-purple-600">
                          <div className="h-5 w-5 rounded-full border-2 border-purple-600 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-purple-600"></div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">Standard Shipping</h4>
                            <p className="text-sm text-gray-400">Delivery in 5-7 business days</p>
                          </div>
                          <div className="font-medium">Free</div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                          <div className="h-5 w-5 rounded-full border-2 border-gray-600"></div>
                          <div className="flex-1">
                            <h4 className="font-medium">Express Shipping</h4>
                            <p className="text-sm text-gray-400">Delivery in 2-3 business days</p>
                          </div>
                          <div className="font-medium">£15.00</div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                          <div className="h-5 w-5 rounded-full border-2 border-gray-600"></div>
                          <div className="flex-1">
                            <h4 className="font-medium">Priority Shipping</h4>
                            <p className="text-sm text-gray-400">Delivery in 1-2 business days</p>
                          </div>
                          <div className="font-medium">£25.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <h3 className="font-medium mb-4">Order Summary</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span>£360.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax</span>
                          <span>£72.00</span>
                        </div>
                        <div className="h-px bg-gray-800 my-2"></div>
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>£432.00</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <h2 className="text-xl font-bold mb-6">Payment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardName">Name on Card</Label>
                      <Input id="cardName" placeholder="John Doe" className="bg-gray-900 border-gray-700" />
                    </div>

                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        className="bg-gray-900 border-gray-700"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" placeholder="MM/YY" className="bg-gray-900 border-gray-700" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" className="bg-gray-900 border-gray-700" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4">
                      <input type="checkbox" id="saveCard" className="h-4 w-4 rounded border-gray-700 bg-gray-900" />
                      <Label htmlFor="saveCard" className="text-sm">
                        Save card for future purchases
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                      <h3 className="font-medium mb-4">Order Summary</h3>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 bg-gray-800 rounded-md overflow-hidden">
                          <Image
                            src={
                              designs.find((d) => d.id === selectedDesign)?.image ||
                              "/placeholder.svg?height=64&width=64"
                            }
                            alt="Selected Design"
                            width={64}
                            height={64}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{designs.find((d) => d.id === selectedDesign)?.name}</h4>
                          <p className="text-sm text-gray-400 mt-1">Size: Medium • Color: Black • Qty: 1</p>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subtotal</span>
                          <span>£360.00</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Shipping</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Tax</span>
                          <span>£72.00</span>
                        </div>
                        <div className="h-px bg-gray-800 my-2"></div>
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>£432.00</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-900/20 border border-purple-800/30 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-purple-500/20 rounded-full p-2 mt-0.5">
                          <ShoppingBag className="h-4 w-4 text-purple-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-purple-400">Secure Checkout</h4>
                          <p className="text-sm text-gray-400 mt-1">
                            Your payment information is processed securely. We do not store credit card details.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="mt-8 flex justify-between">
              <Button variant="outline" onClick={handleBack} disabled={step === 1} className="border-gray-700">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              <Button onClick={handleNext} disabled={step === 1 && !selectedDesign}>
                {step === 4 ? "Place Order" : "Continue"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-green-500/20 rounded-full p-6 inline-flex mb-6"
            >
              <Check className="h-16 w-16 text-green-500" />
            </motion.div>

            <h2 className="text-3xl font-bold mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-400 mb-8">
              Thank you for your order. We've received your request and will process it shortly. You will receive a
              confirmation email with the details of your order.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-800 rounded-full p-2">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="font-medium">Order #167896</h3>
                </div>
                <p className="text-sm text-gray-400">May 5, 2025</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-800 rounded-full p-2">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="font-medium">Payment</h3>
                </div>
                <p className="text-sm text-gray-400">£432.00 • Mastercard ****8765</p>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-800 rounded-full p-2">
                    <Truck className="h-5 w-5 text-gray-400" />
                  </div>
                  <h3 className="font-medium">Shipping</h3>
                </div>
                <p className="text-sm text-gray-400">Standard • 5-7 business days</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" asChild className="border-gray-700">
                <Link href="/orders">View Orders</Link>
              </Button>
              <Button asChild>
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
}
