import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Sparkles, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/store/slices/authSlice";
import { logoutUser } from "@/services/user.api";
import { useDispatch } from "react-redux";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(logout());
    navigate("/login");
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text ">
              WebCraft AI
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              onClick={() => navigate("/")}
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium cursor-pointer"
            >
              Home
            </a>
            <a
              onClick={() => navigate("/template")}
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium cursor-pointer"
            >
              Templates
            </a>
            <a
              href="#features"
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
            >
              Pricing
            </a>
          </div>

          {/* User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full"
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src="/placeholder.svg?height=40&width=40"
                      alt="John Doe"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">
                    Account Info
                  </p>
                </div>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-200"
          >
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="/"
                className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
              >
                Home
              </a>
              <a
                href="/template"
                className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
              >
                Templates
              </a>
              <a
                href="#features"
                className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-slate-700 hover:text-violet-600 transition-colors font-medium"
              >
                Pricing
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
