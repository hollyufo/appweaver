import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-800 shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 transition-transform hover:scale-105"
          >
            <img src="/logo_text.png" alt="Appweaver Logo" className="h-10 w-auto" />
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-medium text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
          >
            Get Started
          </motion.button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-12">
        <section className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-extrabold text-white mb-4"
          >
            Welcome to Appweaver
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto"
          >
            Discover, create, and share amazing projects with our community. Whether you're a beginner or an expert, you'll find endless possibilities here.
          </motion.p>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center mt-16">
          <FeatureCard title="Discover" description="Explore projects created by others." icon="🔍" />
          <FeatureCard title="Create" description="Bring your ideas to life." icon="🎨" />
          <FeatureCard title="Share" description="Showcase your work to the world." icon="🚀" />
        </section>
      </main>
    </div>
  );
}

// Feature Card Component
interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:bg-gray-700 shadow-lg"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
