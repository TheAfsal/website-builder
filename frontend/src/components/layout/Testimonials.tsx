"use client"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Entrepreneur",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "WebCraft AI transformed my business idea into a stunning website in minutes. The AI understands exactly what I need!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Designer",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "As a designer, I'm impressed by the quality and attention to detail. This tool saves me hours of work.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Small Business Owner",
    avatar: "/placeholder.svg?height=60&width=60",
    content: "I went from idea to live website in under an hour. The results exceeded my expectations completely.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-violet-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Loved by Creators Worldwide</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who've transformed their ideas into reality
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>

                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-slate-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
