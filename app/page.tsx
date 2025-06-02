import Image from "next/image"
import Link from "next/link"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Zap, Palette, Recycle, Users, FileDown, ExternalLink } from "lucide-react"

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Revolutionize Your{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
                  Fashion Design
                </span>{" "}
                Process
              </h1>
              <p className="text-xl text-gray-300">
                Everything you need to start and scale your fashion brand. From concept to manufacturing, our
                tech-enabled platform simplifies your production process reducing sample lead times from 3 months to
                just 3 weeks—sexy, scalable, sustainable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 w-8 rounded-full bg-gray-800 border-2 border-black"></div>
                  ))}
                </div>
                <p className="text-sm text-gray-400">
                  <span className="text-white font-medium">500+</span> fashion designers trust us
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="3D Fashion Design Platform"
                  width={800}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Brands Section */}
      <section className="py-16 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-12">Trusted by Leading Brands</h2>

          <div className="relative w-full overflow-hidden">
            <div className="flex animate-scroll space-x-16 items-center">
              {/* Logo marquee - first set */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((logo) => (
                <div
                  key={`logo-1-${logo}`}
                  className="flex-shrink-0 h-12 w-32 bg-gray-800 rounded flex items-center justify-center"
                >
                  <div className="text-gray-500 font-medium">BRAND {logo}</div>
                </div>
              ))}

              {/* Duplicate set for seamless scrolling */}
              {[1, 2, 3, 4, 5, 6, 7, 8].map((logo) => (
                <div
                  key={`logo-2-${logo}`}
                  className="flex-shrink-0 h-12 w-32 bg-gray-800 rounded flex items-center justify-center"
                >
                  <div className="text-gray-500 font-medium">BRAND {logo}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About TFB STUDIOS</h2>

            <div className="space-y-6 text-gray-300">
              <p>
                TFB STUDIOS is changing the way fashion is created, sourced, and produced. Our innovative platform
                streamlines the entire production process, giving creators, designers, and brands the tools they need to
                bring ideas to life with ease. From managing production timelines with full transparency to
                collaborating with team members and communicating directly with seamstresses, TFB STUDIOS makes the
                journey from concept to creation seamless.
              </p>

              <p>
                Whether you&apos;re launching your first collection or scaling an established brand, our platform is
                designed to support every step of the process. Samples can now be made in weeks instead of months,
                helping brands meet demand without compromising on quality or sustainability.
              </p>

              <p>
                TFB STUDIOS is your one-stop solution for building a fashion brand. Our focus on simplicity,
                scalability, and innovation ensures that you have everything you need to succeed in today&apos;s
                fast-moving industry. Accessible to all and built with your growth in mind, TFB STUDIOS is where fashion
                meets the future—smarter, greener, and designed for success.
              </p>
            </div>

            <div className="mt-10 text-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  LET&apos;S GET STARTED
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Fashion Designers</h2>
            <p className="text-gray-400">
              Our platform provides everything you need to bring your fashion designs to life, from concept to
              production.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Palette className="h-10 w-10 text-cyan-500" />,
                title: "3D Design Tools",
                description:
                  "Create stunning 3D models of your designs with our intuitive tools. Visualize fabrics, patterns, and details in real-time.",
              },
              {
                icon: <Recycle className="h-10 w-10 text-green-500" />,
                title: "Sustainable Materials",
                description:
                  "Access our curated library of sustainable fabrics and materials. Make eco-friendly choices without compromising on quality.",
              },
              {
                icon: <Zap className="h-10 w-10 text-yellow-500" />,
                title: "Streamlined Production",
                description:
                  "Manage your production process from start to finish. Track orders, communicate with manufacturers, and monitor progress.",
              },
              {
                icon: <Users className="h-10 w-10 text-purple-500" />,
                title: "Collaboration Tools",
                description:
                  "Work seamlessly with your team. Share designs, collect feedback, and make revisions in real-time.",
              },
              {
                icon: <CheckCircle className="h-10 w-10 text-blue-500" />,
                title: "Quality Assurance",
                description:
                  "Ensure your designs meet the highest standards. Our platform includes tools for quality checks and approvals.",
              },
              {
                icon: <ArrowRight className="h-10 w-10 text-pink-500" />,
                title: "Go-to-Market Strategy",
                description:
                  "Get your designs to market faster. Our platform helps you plan and execute your launch strategy.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" variant="outline" asChild>
              <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">
                Get a Quote
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400">
              Our streamlined process makes it easy to bring your fashion designs to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Design",
                description:
                  "Upload your sketches or start from scratch with our 3D design tools. Visualize your creation from every angle.",
              },
              {
                step: "02",
                title: "Select Materials",
                description:
                  "Choose from our extensive library of sustainable fabrics and materials. See how they look on your design in real-time.",
              },
              {
                step: "03",
                title: "Order & Produce",
                description:
                  "Place your order and track production from start to finish. Receive updates at every stage of the process.",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="text-7xl font-bold text-gray-800 absolute -top-6 left-0">{item.step}</div>
                <div className="pt-8 pl-4 border-l border-gray-800">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-b from-green-900/20 to-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Commitment to Sustainability</h2>

            <div className="bg-gray-900/50 border border-green-800/30 rounded-2xl p-8">
              <div className="space-y-6 text-gray-300">
                <p>
                  A large percentage of textiles end up in landfills on a yearly basis (85% to be precise). Since
                  inception, TFB STUDIOS has been on a mission to create more sustainable fashion brands. With its own
                  in-house production arm it&apos;s imperative to find solutions to fashion&apos;s current wasteful
                  process.
                </p>

                <p>
                  Typically, it is said that the most sustainable way to operate is to reuse and repurpose, rather than
                  extracting and making new items. With this in mind, TFB STUDIOS seeks to operate in a way that
                  prioritises recycled materials, using technology to advise on production quantities and providing
                  upcycling services to avoid stockpiling, and ultimately, saving items from landfills.
                </p>

                <p>
                  With the aim of fostering deeper collaboration within the supply chain, this document highlights our
                  code of conduct and roadmap.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <Button variant="outline" className="gap-2" asChild>
                  <a href="#download-csr" download>
                    <FileDown className="h-5 w-5" />
                    Download CSR Report
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section (Mailchimp Style) */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400">Real feedback from fashion designers and brands using our platform</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Testimonial */}
            <div className="lg:col-span-3 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 rounded-full bg-gray-800 flex-shrink-0"></div>
                <div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-500 text-xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-xl italic mb-4">
                    &quot;TFB STUDIOS has transformed our entire production process. We&apos;ve cut our sample lead
                    times by 75% and improved our sustainability metrics at the same time. The platform is intuitive and
                    our team loves using it.&quot;
                  </blockquote>
                  <div>
                    <p className="font-bold text-lg">Jessica Reynolds</p>
                    <p className="text-gray-400">CEO, Modern Essentials</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Regular Testimonials */}
            {[
              {
                quote:
                  "The 3D visualization tools have completely changed how we present designs to our clients. We can make adjustments in real-time during meetings!",
                name: "Marcus Chen",
                title: "Design Director, LOOP Fashions",
                rating: 5,
              },
              {
                quote:
                  "As a sustainable brand, we love how TFB STUDIOS helps us track and report on our materials usage and carbon footprint.",
                name: "Sophia Martinez",
                title: "Founder, EcoThreads",
                rating: 5,
              },
              {
                quote:
                  "The production management tools have eliminated so many headaches. We can see exactly where every item is in the production process.",
                name: "David Wilson",
                title: "Operations Manager, StyleHouse",
                rating: 4,
              },
            ].map((review, index) => (
              <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={`${star <= review.rating ? "text-yellow-500" : "text-gray-600"}`}>
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6">&quot;{review.quote}&quot;</blockquote>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-800"></div>
                  <div>
                    <p className="font-medium">{review.name}</p>
                    <p className="text-sm text-gray-400">{review.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-gray-400">
              Hear from fashion designers who have transformed their workflow with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "TFB Studios has completely transformed how I approach fashion design. The 3D visualization tools are incredible, and the sustainable material options align perfectly with my brand values.",
                name: "Sarah Johnson",
                title: "Founder, Eco Chic",
              },
              {
                quote:
                  "The platform has cut my design-to-production time in half. The ability to visualize designs in 3D and make real-time adjustments has been a game-changer for my team.",
                name: "Michael Chen",
                title: "Creative Director, Urban Threads",
              },
              {
                quote:
                  "As a small fashion brand, efficiency is everything. TFB Studios has streamlined our entire process, from design to production, allowing us to focus on creativity.",
                name: "Emma Rodriguez",
                title: "Designer, Nouveau Fashion",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-800"></div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.title}</p>
                  </div>
                </div>
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
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Design Process?</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join hundreds of fashion designers who are creating stunning 3D designs with our platform.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  )
}
