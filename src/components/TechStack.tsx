'use client';

import { motion } from 'framer-motion';
import { techStack } from '@/data/portfolioData';
import { Cpu, Layout, Server, Database, ShieldAlert, Settings } from 'lucide-react';

const categories = [
  { id: 'frontend', name: 'Frontend', icon: Layout, color: 'text-blue-400' },
  { id: 'backend', name: 'Backend', icon: Server, color: 'text-[#5B8DEF]' },
  { id: 'database', name: 'Database', icon: Database, color: 'text-emerald-400' },
  { id: 'ai-cv', name: 'AI & CV', icon: Cpu, color: 'text-accent' },
  { id: 'tools', name: 'Tools', icon: Settings, color: 'text-zinc-400' },
];

export default function TechStack() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="stack" className="py-24 relative overflow-hidden bg-[#020205]">
      {/* Light background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-accent/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            02 / Skills
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Technical Arsenal
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
            Languages, frameworks, and developer tools that I use to engineer end-to-end digital solutions.
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const items = techStack.filter((tech) => tech.category === cat.id);

            return (
              <motion.div
                key={cat.id}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: 'rgba(124, 92, 252, 0.2)' }}
                className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-zinc-800/40">
                    <div className={`p-2 rounded-xl bg-zinc-900 ${cat.color}`}>
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {cat.name}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2.5">
                    {items.map((tech) => (
                      <span
                        key={tech.name}
                        className="inline-flex items-center rounded-lg bg-zinc-900/60 px-3 py-1.5 text-xs font-mono text-zinc-300 border border-zinc-800 hover:border-zinc-700/80 hover:text-white transition-colors duration-250 cursor-default"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
