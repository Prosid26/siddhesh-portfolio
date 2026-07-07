'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail, Server, Database, Cpu, Shield, ExternalLink } from 'lucide-react';
import { Github } from '@/components/icons';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 800], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 500], [1, 0]);

  // Typewriter roles
  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Backend Developer',
    'AI Enthusiast',
    'Computer Vision Developer',
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const pauseDuration = 2500;

  // Dynamic statistics
  const [repoCount, setRepoCount] = useState<number | string>('24');
  const [projectCount, setProjectCount] = useState<number>(4);

  useEffect(() => {
    // Fetch dynamic github stats for the hero stats
    const fetchStats = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Prosid26');
        if (res.ok) {
          const data = await res.json();
          if (data.public_repos) {
            setRepoCount(data.public_repos);
          }
        }
      } catch (err) {
        console.error('Error loading hero statistics', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  // Cursor tracking for spotlight glow
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
    containerRef.current.style.setProperty('--mouse-x', `${x}px`);
    containerRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      {/* Ambient background glows */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-accent/15 blur-[120px] pointer-events-none animate-glow-1"
      />
      <motion.div
        style={{ y: yBg }}
        className="absolute top-1/3 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#5B8DEF]/10 blur-[100px] pointer-events-none animate-glow-2"
      />

      <div className="mx-auto max-w-7xl w-full relative z-10 flex-grow flex flex-col justify-center">
        
        {/* Upper Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <motion.div
            style={{ opacity: opacityText }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-accent/10 text-[#a582ff] border border-accent/20 mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              🟢 Available for Full-Time Opportunities
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#5B8DEF]">
                intelligent software
              </span>{' '}
              with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B8DEF] to-accent">
                code, creativity and curiosity
              </span>
              .
            </h1>

            {/* Typewriter role */}
            <div className="h-8 mt-4">
              <p className="text-lg sm:text-xl font-mono text-zinc-400">
                I'm Siddhesh, a{' '}
                <span className="text-white font-medium typing-cursor">
                  {currentText}
                </span>
              </p>
            </div>

            {/* Subtle animated status badge */}
            <motion.div
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 text-xs font-medium select-none"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Full-Time Software Engineering Opportunities
            </motion.div>

            {/* Short paragraph description */}
            <p className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
              Passionate about building AI-powered applications, scalable web platforms, 
              and intuitive digital experiences. Specializing in computer vision models, 
              modern backend engines, and clean user interfaces.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-start gap-4">
              <div className="flex flex-wrap gap-4 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="group inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-[#684be3] transition-all duration-300 shadow-lg shadow-accent/20 hover:shadow-accent/40 w-full sm:w-auto text-center"
                >
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-800 bg-[#09090b]/50 hover:bg-[#121214] px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Download Resume
                  <Download className="ml-2 h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-zinc-800/60 bg-transparent hover:bg-zinc-900/40 px-6 py-3 text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Contact Me
                  <Mail className="ml-2 h-4 w-4" />
                </a>
              </div>
              
              {/* Additional elegant details row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-zinc-500 pt-2 select-none">
                <span>📍 Mumbai, India</span>
                <span className="text-zinc-700 font-bold">•</span>
                <span>✈️ Open to Relocation</span>
                <span className="text-zinc-700 font-bold">•</span>
                <span>💼 Open to Full-Time</span>
              </div>
            </div>
          </motion.div>

          {/* Right Floating Cards Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative h-[450px] flex items-center justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px] h-[400px] flex items-center justify-center">
              
              {/* Card 1: AI Posture Detection Card */}
              <motion.div
                style={{
                  x: mousePosition.x ? (mousePosition.x - 200) / 25 : 0,
                  y: mousePosition.y ? (mousePosition.y - 200) / 25 : 0,
                }}
                className="absolute z-30 top-4 w-[280px] p-5 rounded-2xl glass-panel border border-white/10 shadow-2xl hover:border-accent/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-accent/20 text-[#a582ff]">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">pose_analyzer.py</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                </div>
                <div className="relative h-28 rounded-lg bg-black/60 border border-zinc-800/80 flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full p-2 text-zinc-600" viewBox="0 0 100 100">
                    <line x1="0" y1="50" x2="100" y2="50" stroke="#18181b" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="50" y1="0" x2="50" y2="100" stroke="#18181b" strokeWidth="0.5" strokeDasharray="3,3" />
                    <line x1="50" y1="20" x2="50" y2="50" stroke="#7C5CFC" strokeWidth="1.5" />
                    <line x1="50" y1="30" x2="35" y2="45" stroke="#7C5CFC" strokeWidth="1.5" />
                    <line x1="50" y1="30" x2="65" y2="45" stroke="#7C5CFC" strokeWidth="1.5" />
                    <line x1="50" y1="50" x2="40" y2="75" stroke="#7C5CFC" strokeWidth="1.5" />
                    <line x1="50" y1="50" x2="60" y2="75" stroke="#7C5CFC" strokeWidth="1.5" />
                    <circle cx="50" cy="20" r="4" fill="#a582ff" />
                    <circle cx="50" cy="30" r="2.5" fill="#a582ff" />
                    <circle cx="35" cy="45" r="2.5" fill="#a582ff" />
                    <circle cx="65" cy="45" r="2.5" fill="#a582ff" />
                    <circle cx="50" cy="50" r="2.5" fill="#a582ff" />
                    <circle cx="40" cy="75" r="2.5" fill="#a582ff" />
                    <circle cx="60" cy="75" r="2.5" fill="#a582ff" />
                    <text x="5" y="15" fill="#34d399" fontSize="6" fontFamily="monospace">Confidence: 98%</text>
                    <text x="5" y="90" fill="#a582ff" fontSize="6" fontFamily="monospace">Pose: SURYA_NAMASKAR_3</text>
                  </svg>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[10px] text-zinc-500">SURYA NAMASKAR POSTURE DETECTOR</span>
                  <span className="text-[10px] text-zinc-400 font-mono">120 FPS</span>
                </div>
              </motion.div>

              {/* Card 2: Server ERP Card */}
              <motion.div
                style={{
                  x: mousePosition.x ? (mousePosition.x - 200) / 40 - 30 : -30,
                  y: mousePosition.y ? (mousePosition.y - 200) / 40 + 40 : 40,
                }}
                className="absolute z-20 w-[280px] p-5 rounded-2xl glass-panel border border-white/5 shadow-xl hover:border-[#5B8DEF]/40 transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-[#5B8DEF]/20 text-[#5B8DEF]">
                    <Server className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">erp_gateway.ts</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs bg-black/40 p-2 rounded border border-zinc-800/40">
                    <span className="text-zinc-500 font-mono">POST /api/order</span>
                    <span className="text-emerald-400 font-mono">200 OK (14ms)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs bg-black/40 p-2 rounded border border-zinc-800/40">
                    <span className="text-zinc-500 font-mono">GET /api/dashboard</span>
                    <span className="text-[#5B8DEF] font-mono">304 Cached</span>
                  </div>
                  <div className="flex gap-1 items-end h-8 pt-2">
                    <div className="bg-zinc-800 w-full h-1/3 rounded-t" />
                    <div className="bg-zinc-800 w-full h-1/2 rounded-t" />
                    <div className="bg-accent/40 w-full h-2/3 rounded-t" />
                    <div className="bg-accent/60 w-full h-4/5 rounded-t" />
                    <div className="bg-accent w-full h-full rounded-t" />
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Blockchain / Wallet Card */}
              <motion.div
                style={{
                  x: mousePosition.x ? (mousePosition.x - 200) / 50 + 40 : 40,
                  y: mousePosition.y ? (mousePosition.y - 200) / 50 + 120 : 120,
                }}
                className="absolute z-10 w-[280px] p-5 rounded-2xl glass-panel border border-white/5 shadow-lg"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                    <Shield className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">NftMarket.sol</span>
                </div>
                <div className="space-y-1">
                  <code className="text-[10px] text-zinc-500 block">function buyNFT(uint256 tokenID)</code>
                  <code className="text-[10px] text-zinc-400 block pl-2">external payable nonReentrant &#123;</code>
                  <code className="text-[10px] text-zinc-400 block pl-4">require(msg.value &gt;= price);</code>
                  <code className="text-[10px] text-amber-400 block pl-4">_transfer(owner, msg.sender);</code>
                  <code className="text-[10px] text-zinc-400 block pl-2">&#125;</code>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

        {/* Animated Statistics Cards Sub-section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 pt-10 border-t border-zinc-900/60"
        >
          {/* Card 1: Projects count */}
          <div className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between hover:border-accent/20 transition-all duration-300">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Projects</span>
            <span className="text-3xl font-extrabold text-white font-mono">{projectCount}</span>
            <span className="text-[10px] text-zinc-400 mt-2">Core Featured Systems</span>
          </div>

          {/* Card 2: Repos count (Dynamic) */}
          <div className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between hover:border-accent/20 transition-all duration-300">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Repositories</span>
            <span className="text-3xl font-extrabold text-white font-mono">{repoCount}</span>
            <span className="text-[10px] text-zinc-400 mt-2">Dynamic GitHub Total</span>
          </div>

          {/* Card 3: Technologies count */}
          <div className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between hover:border-accent/20 transition-all duration-300">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Technologies</span>
            <span className="text-3xl font-extrabold text-[#7C5CFC] font-mono">20+</span>
            <span className="text-[10px] text-zinc-400 mt-2">Stack & Core Utilities</span>
          </div>

          {/* Card 4: Graduation year */}
          <div className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between hover:border-accent/20 transition-all duration-300">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-2">Graduate</span>
            <span className="text-3xl font-extrabold text-[#5B8DEF] font-mono">2026</span>
            <span className="text-[10px] text-zinc-400 mt-2">IT Engineering Student</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
