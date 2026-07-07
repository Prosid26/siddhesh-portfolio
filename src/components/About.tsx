'use client';

import { motion } from 'framer-motion';
import { exploreStack } from '@/data/portfolioData';
import { Sparkles, Terminal, Activity, Cloud } from 'lucide-react';

const iconsMap: Record<string, any> = {
  'AI Agents': Sparkles,
  'Computer Vision': Activity,
  'Full Stack Development': Terminal,
  'Cloud & DevOps': Cloud,
};

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  } as const;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            01 / Storytelling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            The Journey So Far
          </h2>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Narrative Column */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight leading-snug">
              It started with simple curiosity, but quickly evolved into an obsession with building.
            </h3>
            
            <p className="text-zinc-400 leading-relaxed">
              My engineering journey didn't start with textbooks; it began with the desire to write code that solves tangible problems. I realized early on that reading theory only gets you so far—the real breakthroughs occur during the late-night debugging sessions, staring down compiler logs, and seeing your creations come to life.
            </p>

            <p className="text-zinc-400 leading-relaxed">
              Whether it's mapping 3D coordinates of human postures for real-time Surya Namaskar feedback, deploying scalable backend schemas for ERP dashboards, or writing secure blockchain marketplaces—I approach every project with the goal of creating something stable, performant, and handcrafted.
            </p>

            <p className="text-zinc-400 leading-relaxed font-medium text-white/90">
              I believe in writing clean architectures, keeping layout spacing luxurious, and building things that matter.
            </p>
          </div>

          {/* Currently Exploring Grid Column */}
          <div className="lg:col-span-6">
            <div className="mb-6">
              <h4 className="text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                Currently Exploring
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Technologies and paradigms I am actively investigating and applying.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {exploreStack.map((item) => {
                const IconComponent = iconsMap[item.name] || Terminal;
                return (
                  <motion.div
                    key={item.name}
                    variants={cardVariants}
                    whileHover={{ y: -4, borderColor: 'rgba(124, 92, 252, 0.3)' }}
                    className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 hover:bg-[#0c0c0f]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="p-2 rounded-xl bg-accent/10 text-accent w-fit mb-4">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <h5 className="text-base font-semibold text-white mb-2">
                        {item.name}
                      </h5>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
