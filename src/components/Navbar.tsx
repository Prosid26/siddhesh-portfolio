'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, useScroll } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Stack', href: '#stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'glass-panel shadow-lg shadow-black/40'
              : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Logo / Name */}
          <div className="flex items-center">
            <a href="#" className="group flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white transition-colors duration-300">
                Siddhesh
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </a>
          </div>

          {/* Center Links - Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Status Pill & CTA */}
          <div className="hidden md:flex items-center gap-4">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-200 transition-colors duration-200"
            >
              Let's Connect
              <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <div className="inline-flex items-center gap-1 py-1 px-2 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              Available
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-zinc-400 hover:text-white p-1 rounded-md transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 p-6 rounded-3xl glass-panel shadow-2xl z-50 flex flex-col gap-4 border border-zinc-800"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-zinc-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="h-[1px] bg-zinc-800 my-2" />
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black hover:bg-zinc-200 transition-colors duration-200 w-full"
          >
            Let's Connect
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </a>
        </motion.div>
      )}

      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-indicator absolute bottom-0 left-0 right-0"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
