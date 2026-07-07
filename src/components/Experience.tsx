'use client';

import { motion } from 'framer-motion';
import { timeline, experiences } from '@/data/portfolioData';
import { Code, Globe, Database, Cpu, Shield, GraduationCap, Search, Calendar } from 'lucide-react';

const iconMap: Record<string, any> = {
  code: Code,
  web: Globe,
  database: Database,
  ai: Cpu,
  blockchain: Shield,
  graduation: GraduationCap,
  search: Search,
};

export default function Experience() {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-[#020205]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            04 / Learning & Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Learning Journey & Milestones
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
            A comprehensive look at my education, technical focus shifts, and self-directed engineering milestones.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Vertical Timeline */}
          <div className="lg:col-span-5 relative pl-6 border-l border-zinc-800/80 space-y-12">
            {timeline.map((item, index) => {
              const Icon = iconMap[item.iconType] || Code;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="relative group"
                >
                  {/* Timeline Circle */}
                  <div className="absolute -left-[37px] top-1.5 p-1 rounded-full bg-[#020205] border-2 border-zinc-800 text-zinc-400 group-hover:border-accent group-hover:text-accent transition-colors duration-300">
                    <Icon className="h-4.5 w-4.5" />
                  </div>

                  <span className="inline-block text-xs font-mono font-semibold text-accent mb-1">
                    {item.year}
                  </span>
                  <h4 className="text-base font-bold text-white group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Experience/Categories Cards */}
          <div className="lg:col-span-7 space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 shadow-xl hover:border-zinc-700/60 transition-colors duration-300"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-900">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-full border border-zinc-800 w-fit">
                    <Calendar className="h-3 w-3 text-accent" />
                    {exp.period}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2.5 mb-6">
                  {exp.description.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-xs text-zinc-400 leading-relaxed flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-zinc-400 bg-zinc-900/40 border border-zinc-800 px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
