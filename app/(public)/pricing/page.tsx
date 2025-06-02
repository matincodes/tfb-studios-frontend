import Link from "next/link"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight } from "lucide-react"

export default function PricingPage() {
  return (
    <PublicLayout>
      {/* Header */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-gray-300 mb-8">
              Choose the perfect plan for your fashion business needs. Scale as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col h-full transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Starter</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold">$299</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-400">Perfect for emerging designers and small brands.</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {[
                  "Up to 10 design projects",
                  "Basic 3D visualization tools",
                  "5 team members",
                  "Standard material library",
                  "Basic production tracking",
                  "Email support",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-cyan-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="w-full" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Professional Plan - Featured */}
            <div className="bg-gradient-to-b from-blue-900/30 to-gray-900 border border-blue-500/30 rounded-xl p-8 flex flex-col h-full relative shadow-lg shadow-blue-500/10 transform md:-translate-y-4">
              <div className="absolute -top-4 left-0 right-0 flex justify-center">
                <span className="bg-blue-500 text-black text-sm font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Professional</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold">$799</span>
                  <span className="text-gray-400 mb-1">/month</span>
                </div>
                <p className="text-gray-400">Ideal for growing fashion brands and design studios.</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {[
                  "Unlimited design projects",
                  "Advanced 3D visualization tools",
                  "15 team members",
                  "Premium material library",
                  "Comprehensive production tracking",
                  "Priority support",
                  "Sustainability analytics",
                  "Collaboration tools",
                  "Custom branding",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="default" className="w-full bg-blue-500 hover:bg-blue-600" asChild>
                <Link href="/signup">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col h-full transition-all hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10">
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-gray-400">For established fashion houses and large-scale operations.</p>
              </div>

              <div className="space-y-4 mb-8 flex-grow">
                {[
                  "Everything in Professional",
                  "Unlimited team members",
                  "Custom 3D tools and integrations",
                  "Dedicated account manager",
                  "24/7 premium support",
                  "Custom material development",
                  "Advanced analytics and reporting",
                  "Supply chain optimization",
                  "White-label options",
                  "On-site training and setup",
                ].map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="/contact">
                  Contact Sales
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Have questions about our pricing? Find answers to common questions below.</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                question: "Is there a free trial available?",
                answer:
                  "We offer a 14-day free trial on our Starter and Professional plans so you can experience the platform before committing.",
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for Enterprise customers.",
              },
              {
                question: "Are there any long-term contracts?",
                answer:
                  "No, all our plans are month-to-month with no long-term commitment required. Enterprise customers may opt for annual agreements for additional benefits.",
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer: "We offer a 30-day money-back guarantee if you're not completely satisfied with our platform.",
              },
              {
                question: "Do you offer discounts for annual billing?",
                answer: "Yes, you can save 20% by choosing annual billing on any of our plans.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-2">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fashion Business?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of fashion brands already using our platform to streamline their design and production
                process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
