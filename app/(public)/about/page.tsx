import Image from "next/image"
import Link from "next/link"
import { PublicLayout } from "@/components/public-layout"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Globe, Heart, Lightbulb } from "lucide-react"

export default function AboutPage() {
  return (
    <PublicLayout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About TFB Studios</h1>
            <p className="text-xl text-gray-300 mb-8">
              We're on a mission to revolutionize the fashion industry through innovative 3D design technology and
              sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden aspect-square">
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  alt="TFB Studios Team"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-300">
                TFB Studios was founded in 2020 by a team of fashion designers and technology experts who saw an
                opportunity to transform the fashion design process. We recognized that traditional design methods were
                time-consuming, wasteful, and limited in their ability to visualize the final product.
              </p>
              <p className="text-gray-300">
                Our solution was to create a platform that combines cutting-edge 3D design technology with sustainable
                practices, allowing designers to create stunning virtual prototypes before committing to physical
                production.
              </p>
              <p className="text-gray-300">
                Today, TFB Studios is used by hundreds of fashion designers around the world, from independent creators
                to established brands. We're proud to be at the forefront of the digital fashion revolution, helping
                designers bring their visions to life in a more efficient, sustainable way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-300">
              At TFB Studios, our values guide everything we do. We're committed to innovation, sustainability, and
              empowering designers to create their best work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lightbulb className="h-10 w-10 text-yellow-500" />,
                title: "Innovation",
                description:
                  "We're constantly pushing the boundaries of what's possible in fashion design technology, developing new tools and features to help designers create their best work.",
              },
              {
                icon: <Globe className="h-10 w-10 text-green-500" />,
                title: "Sustainability",
                description:
                  "We believe that the future of fashion is sustainable. Our platform helps designers reduce waste by creating virtual prototypes before physical production.",
              },
              {
                icon: <Heart className="h-10 w-10 text-red-500" />,
                title: "Community",
                description:
                  "We're building a community of forward-thinking fashion designers who share our vision for a more innovative, sustainable industry.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-300">
              We're a diverse team of fashion designers, developers, and industry experts passionate about transforming
              the fashion design process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Emma Chen",
                title: "Founder & CEO",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Marcus Johnson",
                title: "Chief Technology Officer",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "Sophia Rodriguez",
                title: "Head of Design",
                image: "/placeholder.svg?height=300&width=300",
              },
              {
                name: "David Kim",
                title: "Lead Developer",
                image: "/placeholder.svg?height=300&width=300",
              },
            ].map((member, index) => (
              <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="aspect-square bg-gray-700 relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-gray-400">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-gray-300">
              Since our founding, we've reached significant milestones and received recognition for our innovative
              approach to fashion design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">By the Numbers</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-4xl font-bold text-blue-500">500+</p>
                  <p className="text-gray-400">Active Designers</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-green-500">10,000+</p>
                  <p className="text-gray-400">Designs Created</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-purple-500">30%</p>
                  <p className="text-gray-400">Reduced Waste</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-yellow-500">24</p>
                  <p className="text-gray-400">Countries Reached</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Awards & Recognition</h3>
              <ul className="space-y-4">
                {[
                  "2023 Fashion Tech Innovation Award",
                  "2022 Sustainable Design Platform of the Year",
                  "Featured in Vogue's 'Future of Fashion' Issue",
                  "2021 Best New Fashion Tech Startup",
                ].map((award, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Join the Fashion Revolution</h2>
              <p className="text-xl text-gray-300 mb-8">
                Experience the future of fashion design with TFB Studios. Start creating stunning 3D designs today.
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Get Started
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
