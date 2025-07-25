import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "@/components/layout/Hero";
import PastWebsites from "@/components/layout/PastWebsite";
import Testimonials from "@/components/layout/Testimonials";
import Footer from "@/components/layout/Footer";
import AIPopup from "@/components/AIPopup";
import { useNavigate } from "react-router-dom";
import { getMyProjects } from "@/services/builder.api";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export default function HomePage() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getMyProjects();
      const formatted = data.map((proj: any, idx: number) => ({
        id: idx,
        projectId: proj.projectId,
        title: proj?.data?.title || `Project ${idx + 1}`,
        date: proj.updatedAt || new Date().toISOString(),
        env: proj.data?.env || "STAGING",
        image:
          proj.data?.screenshot ||
          "https://source.unsplash.com/random/400x200?web",
      }));
      setProjects(formatted);
    };

    fetchProjects();
  }, []);

  const handleGenerate = (generatedHtml: string) => {
    localStorage.clear();
    sessionStorage.clear();
    setIsPopupOpen(false);
    const projectId = crypto.randomUUID();
    navigate(`/editor/${projectId}`, {
      state: { generatedHtml },
    });
  };

  return (
    <div className="min-h-screen">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Hero
          onCreateClick={() => {
            if (!user) return navigate("/login");
            setIsPopupOpen(true);
          }}
        />

        <PastWebsites websites={projects} />

        <Testimonials />
      </motion.main>

      <Footer />

      {isPopupOpen && (
        <AIPopup
          onClose={() => setIsPopupOpen(false)}
          onGenerate={handleGenerate}
        />
      )}
    </div>
  );
}
