"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/layout/NavigationBar"
import Hero from "@/components/layout/Hero"
import PastWebsites from "@/components/layout/PastWebsite"
import Testimonials from "@/components/layout/Testimonials"
import Footer from "@/components/layout/Footer"
import AIPopup from "@/components/AIPopup"
import { useNavigate } from "react-router-dom"

interface Website {
  id: number
  title: string
  date: string
  env: string
  image: string
}

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false)
  const navigate = useNavigate()

  const pastWebsites: Website[] = [
    {
      id: 1,
      title: "E-commerce Store",
      date: "2025-06-20",
      env: "PROD",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Personal Blog",
      date: "2025-05-15",
      env: "STAGE",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Portfolio",
      date: "2025-04-10",
      env: "PROD",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const handleGenerate = (generatedHtml: string) => {
    setIsPopupOpen(false)
    navigate("/editor", { state: { generatedHtml } });
  }

  return (
    <div className="min-h-screen">
      <Navigation />

      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <Hero onCreateClick={() => setIsPopupOpen(true)} />

        <PastWebsites websites={pastWebsites} />

        <Testimonials />
      </motion.main>

      <Footer />

      {isPopupOpen && <AIPopup onClose={() => setIsPopupOpen(false)} onGenerate={handleGenerate} />}
    </div>
  )
}
