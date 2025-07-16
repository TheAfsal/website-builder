"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Palette, Code } from "lucide-react";

interface HeroProps {
  onCreateClick: () => void;
}

export default function Hero({ onCreateClick }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-purple-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Website Builder
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent leading-tight">
              Create Stunning
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Websites in Minutes
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transform your ideas into beautiful, professional websites with
              the power of AI. No coding required, unlimited creativity
              unleashed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 bg-purple-600 hover:from-violet-700 hover:to-purple-700 text-white transition-all duration-300"
              onClick={onCreateClick}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create with AI
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-slate-300 hover:border-violet-300 px-8 py-4 text-lg font-semibold bg-transparent"
            >
              View Templates
            </Button>
          </motion.div>

          {/* Feature Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 text-center">
                Generate websites in seconds with our advanced AI technology
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Palette className="w-6 h-6 " />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Beautiful Design
              </h3>
              <p className="text-slate-600 text-center">
                Professional, modern designs that captivate your audience
              </p>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <Code className="w-6 h-6 " />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Code Required
              </h3>
              <p className="text-slate-600 text-center">
                Build complex websites without writing a single line of code
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
