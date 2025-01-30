import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 border-b border-gray-800">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-3 transition-transform hover:scale-105"
          >
            <img 
              src="/logo_text.png" 
              alt="Blueballs Logo" 
              className="h-10 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = "/"}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-full font-medium text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Welcome to Appweaver</h1>
          <p className="text-gray-400 text-lg">
            Discover, create, and share amazing projects with our community.
          </p>
        </section>

        <section className="flex flex-col md:flex-row gap-8 justify-center items-center mt-16">
          <FeatureCard title="Discover" description="Explore projects created by others." icon="🔍" />
          <FeatureCard title="Create" description="Bring your ideas to life." icon="🎨" />
          <FeatureCard title="Share" description="Showcase your work to the world." icon="🚀" />
        </section>
      </main>
    </div>
  );
}
interface FeatureCardProps {
    title: string;
    description: string;
    icon: string; // Assuming icon is a string, you might want to use a more specific type if it's a JSX element or component
  }
  function FeatureCard({ title, description, icon }: FeatureCardProps) {
    return (
    <div className="bg-gray-800 rounded-xl p-6 flex flex-col items-center text-center">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
