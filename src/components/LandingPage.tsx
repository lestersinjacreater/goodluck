"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AnimatedBackground from "@/components/AnimatedBackground"
import { motion } from "framer-motion"
import { Code, Video, Users, Zap } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"
// import { SignInButton } from "@/components/SignInButton"

export default function LandingPage() {
  const router = useRouter()
  const [typedText, setTypedText] = useState("")
  const fullText = "Code. Interview. Connect."

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      setTypedText((prev) => {
        if (index < fullText.length) {
          index++
          return fullText.slice(0, index)
        } else {
          clearInterval(typingInterval)
          return prev
        }
      })
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 overflow-hidden">
      <AnimatedBackground />

      <main className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl lg:text-7xl font-extrabold leading-tight mb-8"
        >
          HireVue<span className="text-blue-500">X</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-3xl lg:text-4xl font-bold mb-6"
        >
          {typedText}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-4 text-lg lg:text-xl text-gray-300 mb-8"
        >
          Experience the future of technical interviews with our innovative video coding platform.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {[
            { icon: Code, title: "Live Coding", description: "Real-time collaborative coding environment" },
            { icon: Video, title: "Video Interviews", description: "Face-to-face interactions, anywhere in the world" },
            { icon: Users, title: "Team Collaboration", description: "Seamless cooperation for panel interviews" },
            { icon: Zap, title: "Instant Feedback", description: "Real-time evaluation of coding performance" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2 + index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center p-6 rounded-lg shadow-lg overflow-hidden relative group"
            >
              {/* Glossy background */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm z-0"></div>

              {/* Glossy border */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

              {/* Content */}
              <div className="relative z-10">
                <feature.icon className="w-12 h-12 text-blue-400 mb-4 group-hover:text-blue-300 transition-colors duration-300" />
                <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-200 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1 }}
        >
          <SignInButton>
            <button className="px-8 py-4 text-lg bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
              Get Started
            </button>
          </SignInButton>
        </motion.div>
      </main>

      <footer className="absolute bottom-4 text-sm text-gray-400">
        © {new Date().getFullYear()} HireVueX. Revolutionizing Technical Interviews.
      </footer>
    </div>
  )
}