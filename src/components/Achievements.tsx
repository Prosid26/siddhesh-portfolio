'use client';

import { motion } from 'framer-motion';
import { achievements } from '@/data/portfolioData';
import { Trophy, Music, Code, Sparkles } from 'lucide-react';

const iconMap: Record<string, any> = {
  'Dance Club Head': Music,
  'Competition Wins': Trophy,
  'Engineering Projects': Code,
  'Continuous Learning': Sparkles,
};

export default function Achievements() {
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
    <section id="achievements" className="py-24 relative overflow-hidden bg-[#030303]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            05 / Milestones
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Key Achievements
          </h2>
          <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
            Highlights of technical accomplishments, cultural leadership, and competitive triumphs.
          </p>
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.title] || Sparkles;
            return (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -5, borderColor: 'rgba(124, 92, 252, 0.25)' }}
                className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 text-accent w-fit mb-5 border border-zinc-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-900">
                  <span className="text-[9px] font-mono tracking-wider text-zinc-500 uppercase">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
