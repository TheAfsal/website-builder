import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Sparkles, Palette, Globe, Sun, Moon, Minimize } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface AIPopupProps {
  onClose: () => void;
  onGenerate: (html: string) => void;
}

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_API_KEY || "YOUR_API_KEY"
);

export default function AIPopup({ onClose, onGenerate }: AIPopupProps) {
  const [requirements, setRequirements] = useState<string>("");
  const [websiteType, setWebsiteType] = useState<string>("E-commerce");
  const [language, setLanguage] = useState<string>("English");
  const [theme, setTheme] = useState<string>("Light");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateWebsiteWithGemini = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `
You are a professional web UI designer helping generate GrapesJS-compatible HTML content.

Task:
Generate a complete and editable HTML layout for a "${websiteType}" website using "${theme}" theme and "${language}" as the language. Include these sections if applicable:
- Header with navigation
- Hero section with image and CTA button
- Product or service cards
- Testimonials
- Footer

Requirements:
${requirements || "Basic structure with common UI components"}

Rules:
- Return only raw HTML. No Markdown, no CSS blocks, no JavaScript.
- Use semantic HTML5 tags (e.g., <header>, <section>, <footer>)
- Content must be editable in GrapesJS (no hardcoded styles inside <style> tags)
- Use inline styles or TailwindCSS classes (if possible)
- No explanation, return pure HTML only.
`;

      console.log(prompt);

      const result = await model.generateContent(prompt);
      let generatedHtml = result.response.text().trim();

      generatedHtml = generatedHtml
        .replace(/^```html\n([\s\S]*?)\n```$/, "$1")
        .trim();
      console.log("Cleaned HTML:", generatedHtml);

      onGenerate(generatedHtml);
    } catch (error) {
      console.error("Error generating website:", error);
      alert(
        "Failed to generate webpage. Please check your API key and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const websiteTypes = [
    {
      value: "E-commerce",
      icon: "🛍️",
      description: "Online store with product listings",
    },
    { value: "Blog", icon: "📝", description: "Content-focused blog website" },
    {
      value: "Portfolio",
      icon: "🎨",
      description: "Professional portfolio showcase",
    },
    {
      value: "Business",
      icon: "🏢",
      description: "Corporate business website",
    },
    {
      value: "Landing",
      icon: "🚀",
      description: "High-converting landing page",
    },
  ];

  const themes = [
    { value: "Light", icon: Sun, color: "bg-white" },
    { value: "Dark", icon: Moon, color: "bg-slate-900" },
    { value: "Minimal", icon: Minimize, color: "bg-gray-100" },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-2xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-lg">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">
                      AI Website Generator
                    </CardTitle>
                    <p className="text-slate-600 text-sm">
                      Create your perfect website in minutes
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-slate-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Website Type Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  Website Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {websiteTypes.map((type) => (
                    <motion.div
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`cursor-pointer transition-all duration-200 ${
                          websiteType === type.value
                            ? "ring-2 ring-violet-500 bg-violet-50"
                            : "hover:bg-slate-50"
                        }`}
                        onClick={() => setWebsiteType(type.value)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{type.icon}</span>
                            <div>
                              <p className="font-medium text-slate-900">
                                {type.value}
                              </p>
                              <p className="text-xs text-slate-500">
                                {type.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">
                  Describe Your Vision
                </label>
                <Textarea
                  placeholder="e.g., Modern design with hero section, product showcase, customer testimonials, and contact form. Use blue and white color scheme..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="min-h-[100px] resize-none border-slate-200 focus:border-violet-300 focus:ring-violet-200"
                />
              </div>

              {/* Theme Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700 flex items-center">
                  <Palette className="w-4 h-4 mr-2" />
                  Theme Style
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {themes.map((themeOption) => {
                    const IconComponent = themeOption.icon;
                    return (
                      <motion.div
                        key={themeOption.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card
                          className={`cursor-pointer transition-all duration-200 ${
                            theme === themeOption.value
                              ? "ring-2 ring-violet-500 bg-violet-50"
                              : "hover:bg-slate-50"
                          }`}
                          onClick={() => setTheme(themeOption.value)}
                        >
                          <CardContent className="p-4 text-center">
                            <div
                              className={`w-8 h-8 ${themeOption.color} rounded-lg mx-auto mb-2 flex items-center justify-center border`}
                            >
                              <IconComponent className="w-4 h-4 text-slate-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">
                              {themeOption.value}
                            </p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Language Selection */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">
                  Language
                </label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="border-slate-200 focus:border-violet-300 focus:ring-violet-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">🇺🇸 English</SelectItem>
                    <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                    <SelectItem value="French">🇫🇷 French</SelectItem>
                    <SelectItem value="German">🇩🇪 German</SelectItem>
                    <SelectItem value="Italian">🇮🇹 Italian</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={generateWebsiteWithGemini}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-violet-600 bg-purple-600 hover:from-violet-700 hover:to-purple-700 text-white py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Generating Your Website...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Website</span>
                    </div>
                  )}
                </Button>
              </motion.div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                <Badge
                  variant="secondary"
                  className="bg-violet-100 text-violet-700"
                >
                  ⚡ Lightning Fast
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  🎨 Professional Design
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-700"
                >
                  📱 Mobile Responsive
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  🚀 SEO Optimized
                </Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
