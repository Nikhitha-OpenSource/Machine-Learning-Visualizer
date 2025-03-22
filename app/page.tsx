'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Brain, Network, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const rotatingTexts = [
    "Visualize Algorithms",
    "Learn ML Concepts",
    "Train Models",
    "Analyze Results"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-purple-950">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/80 backdrop-blur-md shadow-lg shadow-purple-500/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Seekers
            </Link>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-white hover:text-purple-400 transition-colors">Home</Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">Contact</Link>
              <Link href="/signin" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105">
                Sign In
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="pt-4 flex flex-col gap-4">
              <Link href="/" className="text-white hover:text-purple-400 transition-colors">Home</Link>
              <Link href="/contact" className="text-white hover:text-purple-400 transition-colors">Contact</Link>
              <Link href="/signin" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,purple_1px,transparent_0)] bg-[size:40px_40px] opacity-20"></div>
        
        <div className="text-center px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Machine Learning
          </h1>
          <div className="h-20">
            <h2 className="text-3xl md:text-5xl font-bold text-purple-400 transition-all duration-500">
              {rotatingTexts[currentTextIndex]}
            </h2>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Explore and understand machine learning algorithms through interactive visualizations.
            Perfect for students, researchers, and ML enthusiasts.
          </p>
          <Link href="/explore" className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                           transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
            Start Exploring
          </Link>
          <ChevronDown className="w-8 h-8 text-purple-400 mx-auto mt-16 animate-bounce" />
        </div>
      </div>

      {/* Algorithm Cards */}
      <div className="min-h-screen py-20 px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-16">
          Explore <span className="text-purple-400">Algorithms</span>
        </h2>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Supervised Learning Card */}
          <Link 
            href="/supervised"
            className="group relative overflow-hidden rounded-2xl p-8 bg-black/50 border border-purple-500/20
                       hover:border-purple-500/40 transition-all duration-500 cursor-pointer"
            onMouseEnter={() => setActiveCard('supervised')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 border-4 border-purple-500/20 rounded-full 
                          transition-transform duration-500 group-hover:scale-150 group-hover:rotate-180" />
            
            <Brain className="w-12 h-12 text-purple-400 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Supervised Learning</h3>
            <p className="text-gray-300 mb-6">
              Interactive visualizations of Linear Regression, Decision Trees, 
              Neural Networks, and Support Vector Machines.
            </p>
            <span className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                             transition-all duration-300 hover:scale-105">
              Explore Models
            </span>
          </Link>

          {/* Unsupervised Learning Card */}
          <Link 
            href="/unsupervised"
            className="group relative overflow-hidden rounded-2xl p-8 bg-black/50 border border-purple-500/20
                       hover:border-purple-500/40 transition-all duration-500 cursor-pointer"
            onMouseEnter={() => setActiveCard('unsupervised')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 border-4 border-purple-500/20 rounded-full 
                          transition-transform duration-500 group-hover:scale-150 group-hover:rotate-180" />
            
            <Network className="w-12 h-12 text-purple-400 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Unsupervised Learning</h3>
            <p className="text-gray-300 mb-6">
              Discover clustering algorithms like K-Means, DBSCAN, and dimensionality 
              reduction techniques.
            </p>
            <span className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                             transition-all duration-300 hover:scale-105">
              Explore Models
            </span>
          </Link>
          <Link 
            href="/nextpagerein"
            className="group relative overflow-hidden rounded-2xl p-8 bg-black/50 border border-purple-500/20
                       hover:border-purple-500/40 transition-all duration-500 cursor-pointer"
            onMouseEnter={() => setActiveCard('Reinforcement')}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 border-4 border-purple-500/20 rounded-full 
                          transition-transform duration-500 group-hover:scale-150 group-hover:rotate-180" />
            
            <Network className="w-12 h-12 text-purple-400 mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Reinforcement Learning</h3>
            <p className="text-gray-300 mb-6">
              Discover Reinforcement learning
            </p>
            <span className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg 
                             transition-all duration-300 hover:scale-105">
              Explore Models
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}