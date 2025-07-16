import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/layout/NavigationBar";
import Footer from "@/components/layout/Footer";
import {
  Eye,
  Sparkles,
  ArrowRight,
  Star,
  Heart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Template {
  id: number;
  name: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  likes: number;
  preview: string;
  tags: string[];
  content: string;
  featured: boolean;
}

export default function TemplatePage() {
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 1,
      name: "Elegant Hero Section",
      category: "Landing Page",
      difficulty: "Beginner",
      rating: 4.9,
      likes: 1247,
      preview:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/fairytale-park-with-spring-blossoms-on-trees-free-image.jpeg?w=2210&quality=70",
      tags: ["Hero", "Modern", "Gradient"],
      featured: true,
      content: `
        <div style="background: linear-gradient(135deg, #1e3c72, #2a5298); padding: 60px 20px; color: #fff; text-align: center; border-radius: 15px; box-shadow: 0 10px 20px rgba(0,0,0,0.2);">
          <h1 style="font-size: 3.5rem; font-family: 'Arial', sans-serif; margin-bottom: 20px;">Welcome to Elegance</h1>
          <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto; line-height: 1.6;">Discover a world of sophistication with our stunning designs and seamless user experience.</p>
          <button style="background: #ff6f61; color: #fff; padding: 12px 30px; border: none; border-radius: 25px; font-size: 1.1rem; cursor: pointer; margin-top: 20px;">Get Started</button>
        </div>
      `,
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "Portfolio",
      difficulty: "Intermediate",
      rating: 4.8,
      likes: 892,
      preview:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/winding-pathway-through-magical-fairytale-forest-free-photo.jpg?w=2210&quality=70",
      tags: ["Portfolio", "Creative", "Clean"],
      featured: false,
      content: `
        <div style="background: #f4f7fa; padding: 40px; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); display: flex; gap: 20px; max-width: 900px; margin: 0 auto;">
          <div style="flex: 1; background: #fff; padding: 20px; border-radius: 10px;">
            <h2 style="color: #2c3e50; font-size: 2rem; margin-bottom: 10px;">My Projects</h2>
            <p style="color: #7f8c8d; line-height: 1.5;">Showcase your best work with a clean and modern layout.</p>
          </div>
          <div style="flex: 1; background: #ecf0f1; padding: 20px; border-radius: 10px;">
            <img src="https://picsum.photos/seed/portfolio/300/200" style="width: 100%; height: auto; border-radius: 5px;">
          </div>
        </div>
      `,
    },
    {
      id: 3,
      name: "Luxury E-Commerce",
      category: "E-commerce",
      difficulty: "Advanced",
      rating: 4.9,
      likes: 1563,
      preview:
        "https://media.istockphoto.com/id/2153573059/photo/mountain-covered-with-a-coniferous-fir-tree-forest-scenic-landscape-from-carpathian-mountains.jpg?s=2048x2048&w=is&k=20&c=fDA5cgYpg_67yKLtjm86eupu4d6NhVyl_ScSWR_YmRY=",
      tags: ["E-commerce", "Luxury", "Products"],
      featured: true,
      content: `
        <div style="background: #fff; padding: 50px 20px; max-width: 1000px; margin: 0 auto; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
          <h2 style="color: #e74c3c; font-size: 2.5rem; font-family: 'Georgia', serif; margin-bottom: 30px;">Exclusive Collection</h2>
          <div style="display: flex; gap: 20px; justify-content: center;">
            <div style="background: #f9ebea; padding: 20px; border-radius: 10px; width: 200px;">
              <img src="https://picsum.photos/seed/product1/200/200" style="width: 100%; height: auto; border-radius: 5px;">
              <p style="color: #34495e; margin-top: 10px;">Luxury Watch</p>
              <span style="color: #e74c3c; font-weight: bold;">$499</span>
            </div>
            <div style="background: #f9ebea; padding: 20px; border-radius: 10px; width: 200px;">
              <img src="https://picsum.photos/seed/product2/200/200" style="width: 100%; height: auto; border-radius: 5px;">
              <p style="color: #34495e; margin-top: 10px;">Designer Bag</p>
              <span style="color: #e74c3c; font-weight: bold;">$799</span>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 4,
      name: "Modern Blog Layout",
      category: "Blog",
      difficulty: "Beginner",
      rating: 4.7,
      likes: 743,
      preview:
        "https://media.istockphoto.com/id/539476704/photo/landscape-of-misty-mountain-in-forest-hills.jpg?s=2048x2048&w=is&k=20&c=iSmYzy2chdzQx-zU3WYtU6FAgAWzKm8l9J8nvkxrCL0=",
      tags: ["Blog", "Content", "Minimal"],
      featured: false,
      content: `
        <div style="max-width: 800px; margin: 0 auto; padding: 40px 20px; background: #fff; border-radius: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
          <h1 style="color: #2c3e50; font-size: 2.5rem; margin-bottom: 20px; text-align: center;">The Future of Design</h1>
          <p style="color: #7f8c8d; line-height: 1.8; font-size: 1.1rem; margin-bottom: 30px;">Explore the latest trends and innovations in web design that are shaping the digital landscape.</p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #3498db;">
            <p style="color: #2c3e50; font-style: italic;">"Design is not just what it looks like and feels like. Design is how it works." - Steve Jobs</p>
          </div>
        </div>
      `,
    },
    {
      id: 5,
      name: "Corporate Business",
      category: "Business",
      difficulty: "Intermediate",
      rating: 4.6,
      likes: 654,
      preview:
        "https://media.istockphoto.com/id/951128716/photo/crossroad-two-ways-choose-the-way.jpg?s=2048x2048&w=is&k=20&c=NJe1oqgixb9csR9N71BIDHrNxhtVUhytQ61pWBzIpb0=",
      tags: ["Business", "Corporate", "Professional"],
      featured: false,
      content: `
        <div style="background: #fff; padding: 50px 20px; max-width: 1200px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="color: #2c3e50; font-size: 3rem; margin-bottom: 20px;">Your Business Partner</h1>
            <p style="color: #7f8c8d; font-size: 1.2rem; max-width: 600px; margin: 0 auto;">We provide innovative solutions to help your business grow and succeed in today's competitive market.</p>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
            <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 10px;">
              <h3 style="color: #3498db; margin-bottom: 15px;">Strategy</h3>
              <p style="color: #7f8c8d;">Comprehensive business planning and strategic consulting.</p>
            </div>
            <div style="text-align: center; padding: 30px; background: #f8f9fa; border-radius: 10px;">
              <h3 style="color: #e74c3c; margin-bottom: 15px;">Innovation</h3>
              <p style="color: #7f8c8d;">Cutting-edge solutions for modern challenges.</p>
            </div>
          </div>
        </div>
      `,
    },
    {
      id: 6,
      name: "Startup Landing",
      category: "Landing Page",
      difficulty: "Advanced",
      rating: 4.8,
      likes: 1123,
      preview:
        "https://media.istockphoto.com/id/1173544006/photo/winding-road.jpg?s=2048x2048&w=is&k=20&c=KIe6-VTC6D-f2kyseX_CfmEhW6aXYflOL_q2ZTFZALg=",
      tags: ["Startup", "Landing", "Conversion"],
      featured: true,
      content: `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 80px 20px; text-align: center;">
          <h1 style="font-size: 4rem; margin-bottom: 20px; font-weight: bold;">Launch Your Idea</h1>
          <p style="font-size: 1.3rem; margin-bottom: 40px; max-width: 700px; margin-left: auto; margin-right: auto;">Transform your startup vision into reality with our comprehensive platform and expert guidance.</p>
          <div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
            <button style="background: #fff; color: #667eea; padding: 15px 30px; border: none; border-radius: 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">Start Free Trial</button>
            <button style="background: transparent; color: #fff; padding: 15px 30px; border: 2px solid #fff; border-radius: 30px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">Learn More</button>
          </div>
        </div>
      `,
    },
  ];

  const handleTemplateClick = (content: string) => {
    console.log(content);
    
    navigate('/editor', { state: { generatedHtml: content } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <Navigation />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-violet-50 via-white to-purple-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center px-4 py-2 bg-violet-100 rounded-full text-violet-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Template Collection
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-violet-900 to-purple-900 bg-clip-text text-transparent">
                Choose Your Perfect
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                  Template
                </span>
              </h1>

              <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                Discover professionally crafted templates designed to make your
                website stand out from the crowd
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                Featured Templates
              </h2>
              <p className="text-slate-600 text-center max-w-2xl mx-auto">
                Hand-picked templates that showcase the best of modern web
                design
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-gradient-to-br from-white to-slate-50">
                    <div className="relative">
                      <img
                        src={template.preview || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gradient-to-r from-violet-600 to-purple-600 text-white">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 bg-white/90 hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="h-8 w-8 bg-white/90 hover:bg-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-500">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {template.rating}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold text-slate-900 mb-2">
                        {template.name}
                      </h3>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {template.tags.slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-slate-500">
                          <Heart className="w-4 h-4 mr-1" />
                          {template.likes}
                        </div>
                        <Button
                          onClick={() => handleTemplateClick(template.content)}
                          className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                        >
                          Use Template
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
