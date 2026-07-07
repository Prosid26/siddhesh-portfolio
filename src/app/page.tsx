'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Achievements from '@/components/Achievements';
import GithubSection from '@/components/GithubSection';
import Contact from '@/components/Contact';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  // Handle loading screen timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Track global mouse position for the subtle cursor glow
  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-50 bg-[#020205] flex flex-col items-center justify-center"
          >
            {/* Elegant initials loader */}
            <div className="relative flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white text-3xl font-extrabold tracking-widest relative z-10 font-sans"
              >
                SN
              </motion.div>
              {/* Outer pulsing ring */}
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [0.7, 1.2, 1.4], opacity: [0.5, 0.8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: 'easeOut',
                }}
                className="absolute h-16 w-16 rounded-full border border-accent/40"
              />
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-zinc-500 text-xs font-mono tracking-widest uppercase mt-6"
            >
              Handcrafting Portfolio
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative min-h-screen text-zinc-300 bg-[#020205] selection:bg-accent/30 selection:text-white">
        
        {/* Subtle Cursor Glow Effect */}
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden md:block"
          style={{
            background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(124, 92, 252, 0.045), transparent 80%)`,
          }}
        />

        {/* Global Abstract Background Blobs */}
        <div className="absolute top-0 inset-x-0 h-[800px] bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />

        <Navbar />

        <main>
          {/* Landing/Hero Section */}
          <Hero />

          {/* About / Storytelling */}
          <About />

          {/* Tech Stack */}
          <TechStack />

          {/* Projects */}
          <Projects />

          {/* Timeline & Experiences */}
          <Experience />

          {/* Achievements */}
          <Achievements />

          {/* GitHub Activity Metrics */}
          <GithubSection />

          {/* Contact Section & Footer */}
          <Contact />
        </main>
      </div>
    </>
  );
}
