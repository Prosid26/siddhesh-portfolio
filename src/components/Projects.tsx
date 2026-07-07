'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects, Project } from '@/data/portfolioData';
import { ExternalLink, Star, GitFork, ArrowUpRight, Code, Cpu, Database, Layers, Video } from 'lucide-react';
import { Github } from '@/components/icons';

function ProjectPreview({ id, title }: { id: string; title: string }) {
  if (id === 'fitness-trainer') {
    return (
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-purple-950/20 via-zinc-950 to-zinc-950 flex flex-col justify-between p-6 border-b border-zinc-900 select-none">
        {/* Subtle decorative glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Top bar info */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#a582ff] bg-purple-950/30 border border-purple-800/40 px-2 py-0.5 rounded-md">
            <Cpu className="h-3 w-3 animate-pulse" />
            pose_detector.py
          </div>
          <span className="font-mono text-[8px] text-zinc-600 tracking-wider">COMPUTER_VISION</span>
        </div>
        
        {/* Visual skeletal overlay representation */}
        <div className="my-2 z-10 flex items-center justify-between gap-6">
          <div className="space-y-1 font-mono text-[9px] text-zinc-500 leading-normal">
            <div className="text-zinc-400">import cv2</div>
            <div>mp_pose = mp.solutions.pose</div>
            <div>results = pose.process(image)</div>
            <div className="text-emerald-500">// feedback: 96% correct</div>
          </div>
          
          {/* Neon skeletal vector graphic */}
          <div className="h-20 w-20 border border-zinc-800/80 rounded-xl bg-black/60 flex items-center justify-center p-2 shadow-inner">
            <svg className="h-full w-full text-[#a582ff]" viewBox="0 0 100 100">
              <circle cx="50" cy="18" r="5" fill="currentColor" />
              <line x1="50" y1="23" x2="50" y2="55" stroke="currentColor" strokeWidth="2.5" />
              <line x1="50" y1="32" x2="30" y2="24" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="32" x2="70" y2="24" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="55" x2="35" y2="82" stroke="currentColor" strokeWidth="2" />
              <line x1="50" y1="55" x2="65" y2="82" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        
        {/* Lower Prominent Title */}
        <div className="text-sm font-bold text-white tracking-wide z-10">{title}</div>
      </div>
    );
  }

  if (id === 'restaurant-erp') {
    return (
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-blue-950/20 via-zinc-950 to-zinc-950 flex flex-col justify-between p-6 border-b border-zinc-900 select-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#5B8DEF] bg-blue-950/30 border border-blue-800/40 px-2 py-0.5 rounded-md">
            <Database className="h-3 w-3" />
            prisma.schema
          </div>
          <span className="font-mono text-[8px] text-zinc-600 tracking-wider">DATABASE_SCHEMA</span>
        </div>
        
        {/* SQL / Database mockup block */}
        <div className="my-2 z-10 flex gap-3 justify-between items-center w-full">
          <div className="border border-zinc-800/80 bg-black/60 p-2 rounded-lg font-mono text-[8px] text-zinc-400 space-y-1 w-[47%] shadow-lg">
            <div className="text-white font-bold pb-0.5 border-b border-zinc-900">model Order</div>
            <div>id String @id</div>
            <div>tableNum Int</div>
            <div className="text-blue-400">status String</div>
          </div>
          <div className="text-zinc-700 text-sm font-mono shrink-0">──▶</div>
          <div className="border border-zinc-800/80 bg-black/60 p-2 rounded-lg font-mono text-[8px] text-zinc-400 space-y-1 w-[47%] shadow-lg">
            <div className="text-white font-bold pb-0.5 border-b border-zinc-900">model Billing</div>
            <div>id String @id</div>
            <div>orderId String</div>
            <div className="text-emerald-500">paid Boolean</div>
          </div>
        </div>
        
        <div className="text-sm font-bold text-white tracking-wide z-10">{title}</div>
      </div>
    );
  }

  if (id === 'nft-marketplace') {
    return (
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-amber-950/20 via-zinc-950 to-zinc-950 flex flex-col justify-between p-6 border-b border-zinc-900 select-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-amber-500 bg-amber-950/30 border border-amber-800/40 px-2 py-0.5 rounded-md">
            <Layers className="h-3 w-3" />
            Marketplace.sol
          </div>
          <span className="font-mono text-[8px] text-zinc-600 tracking-wider">SMART_CONTRACT</span>
        </div>
        
        {/* Solidity / Smart Contract function script representation */}
        <div className="my-2 z-10 font-mono text-[9px] text-zinc-500 leading-normal">
          <div className="text-zinc-400">function listToken(uint256 tokenId, uint256 price)</div>
          <div className="pl-3">public payable nonReentrant &#123;</div>
          <div className="pl-6 text-amber-500/80">require(price &gt; 0, "Price must be &gt; 0");</div>
          <div className="pl-6">idToMarketItem[tokenId] = MarketItem(tokenId, price);</div>
          <div className="pl-3">&#125;</div>
        </div>
        
        <div className="text-sm font-bold text-white tracking-wide z-10">{title}</div>
      </div>
    );
  }

  if (id === 'eyeview-ai') {
    return (
      <div className="relative h-60 w-full overflow-hidden bg-gradient-to-br from-emerald-950/20 via-zinc-950 to-zinc-950 flex flex-col justify-between p-6 border-b border-zinc-900 select-none">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 px-2 py-0.5 rounded-md">
            <Video className="h-3 w-3 animate-pulse" />
            video_analytics.py
          </div>
          <span className="font-mono text-[8px] text-zinc-600 tracking-wider">INTELLIGENT_CV</span>
        </div>
        
        {/* Video feed analytics UI tracking mockup */}
        <div className="my-2 z-10 grid grid-cols-2 gap-3 w-full max-w-[280px] h-18 mx-auto">
          <div className="border border-zinc-800 bg-black/60 rounded-lg p-1.5 relative overflow-hidden flex flex-col justify-between shadow-md">
            <div className="text-[7px] font-mono text-zinc-600">STREAM_01</div>
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-emerald-500/80 rounded-sm">
              <span className="absolute -top-2.5 left-0 text-[6px] font-mono text-emerald-400 bg-black px-1 rounded-sm border border-emerald-800/30">person: 92%</span>
            </div>
          </div>
          <div className="border border-zinc-800 bg-black/60 rounded-lg p-1.5 relative overflow-hidden flex flex-col justify-between shadow-md">
            <div className="text-[7px] font-mono text-zinc-600">STREAM_02</div>
            <div className="absolute top-1/3 left-1/3 w-1/3 h-1/2 border border-purple-500/80 rounded-sm">
              <span className="absolute -top-2.5 left-0 text-[6px] font-mono text-purple-400 bg-black px-1 rounded-sm border border-purple-800/30">vehicle: 88%</span>
            </div>
          </div>
        </div>
        
        <div className="text-sm font-bold text-white tracking-wide z-10">{title}</div>
      </div>
    );
  }

  return (
    <div className="h-60 w-full bg-zinc-950 flex items-center justify-center border-b border-zinc-900 select-none">
      <span className="text-sm font-bold text-white">{title}</span>
    </div>
  );
}

const categoryFilters = [
  { id: 'all', name: 'All Projects' },
  { id: 'fullstack', name: 'Full-Stack' },
  { id: 'ai-cv', name: 'AI & CV' },
  { id: 'web3', name: 'Web3 & Web' },
];

interface ArchiveRepo {
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [archiveRepos, setArchiveRepos] = useState<ArchiveRepo[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(true);

  // Fetch real github repos for Project Archive
  useEffect(() => {
    const fetchArchive = async () => {
      try {
        const res = await fetch('https://api.github.com/users/Prosid26/repos?sort=pushed&per_page=40');
        if (res.ok) {
          const repos: any[] = await res.json();
          
          // Filtering logic
          const coreKeywords = ['pose', 'erp', 'nft', 'marketplace', 'eyeview', 'fitness'];
          const toyKeywords = ['calculator', 'todo', 'weather', 'tutorial', 'clone', 'demo', 'practice', 'assignment', 'basic', 'hello-world'];

          const filtered = repos.filter((repo) => {
            const nameLower = repo.name.toLowerCase();
            const descLower = (repo.description || '').toLowerCase();

            // Exclude featured main projects
            const isCore = coreKeywords.some(key => nameLower.includes(key) || descLower.includes(key));
            if (isCore) return false;

            // Exclude toy projects
            const isToy = toyKeywords.some(key => nameLower.includes(key) || descLower.includes(key));
            if (isToy) return false;

            // Must have a description and look somewhat substantial
            return repo.description !== null && repo.name.length > 3;
          });

          setArchiveRepos(filtered.slice(0, 6)); // Display top 6 archive items
        }
      } catch (err) {
        console.error('Failed to load project archive', err);
      } finally {
        setArchiveLoading(false);
      }
    };
    fetchArchive();
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-transparent">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              03 / Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Featured Projects
            </h2>
            <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
              Technically strong production-level architectures, showing implementation depth in AI, Web3, and Full Stack.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 bg-[#09090b]/80 p-1.5 rounded-full border border-zinc-800/80 w-fit">
            {categoryFilters.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 relative ${
                  activeCategory === tab.id
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {activeCategory === tab.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-lg shadow-accent/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                whileHover={{ y: -6 }}
                className="group relative rounded-3xl bg-[#09090b]/40 border border-zinc-800/60 hover:border-accent/30 hover:bg-[#0c0c10]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Project Visual Preview */}
                <ProjectPreview id={project.id} title={project.title} />

                {/* Card Details Body */}
                <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-lg bg-zinc-900/60 px-2.5 py-1 text-[10px] font-mono text-zinc-300 border border-zinc-800"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="mb-6 bg-zinc-950/50 p-4 rounded-xl border border-zinc-900/60">
                      <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">What I Built</span>
                      <ul className="grid grid-cols-2 gap-2">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Links */}
                  <div className="flex items-center justify-between border-t border-zinc-900 pt-6 mt-4">
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                      {project.category.replace('-', ' ')}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-4 py-2 text-xs text-zinc-300 hover:text-white transition-all duration-200"
                        >
                          <Github className="h-3.5 w-3.5" />
                          Code
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-white hover:bg-zinc-200 px-4 py-2 text-xs text-black transition-all duration-200 font-semibold"
                        >
                          Demo
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Archive Section */}
        <div className="border-t border-zinc-900/60 pt-16">
          <div className="mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Project Archive</h3>
            <p className="text-xs sm:text-sm text-zinc-500 mt-1">
              Dynamic collection of secondary repositories fetched from my public profile, excluding minor exercises.
            </p>
          </div>

          {archiveLoading ? (
            <div className="text-zinc-500 text-xs font-mono">Loading archive repositories...</div>
          ) : archiveRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archiveRepos.map((repo) => (
                <a
                  key={repo.name}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-5 rounded-2xl bg-[#09090b]/30 border border-zinc-800/60 hover:border-accent/25 hover:bg-[#0c0c10]/40 transition-all duration-300 flex flex-col justify-between group h-44"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-white group-hover:text-accent transition-colors truncate max-w-[80%]">
                        {repo.name}
                      </h4>
                      <ArrowUpRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                      {repo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono border-t border-zinc-900/80 pt-3">
                    <span className="flex items-center gap-1.5">
                      <Code className="h-3.5 w-3.5 text-accent" />
                      {repo.language || 'Code'}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-zinc-500" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="h-3 w-3 text-zinc-500" />
                        {repo.forks_count}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#09090b]/20 border border-zinc-900 text-center text-xs text-zinc-500">
              No additional archive repositories were returned. Visit GitHub to explore all active repositories.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
