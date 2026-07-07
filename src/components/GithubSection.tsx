'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, BookOpen, Users, GitCommit, Code } from 'lucide-react';
import { Github } from '@/components/icons';

interface GithubProfile {
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  name: string;
  html_url: string;
}

interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  pushed_at?: string;
}

const STATIC_FALLBACK_PROFILE: GithubProfile = {
  avatar_url: 'https://avatars.githubusercontent.com/u/101880946?v=4',
  bio: 'Software Engineer | Full Stack Developer | AI & Computer Vision Enthusiast',
  public_repos: 26,
  followers: 12,
  following: 15,
  name: 'Siddhesh Narvekar',
  html_url: 'https://github.com/Prosid26',
};

const STATIC_FALLBACK_REPOS: GithubRepo[] = [
  {
    name: 'ai-pose-trainer',
    description: 'An AI-powered virtual fitness trainer that performs real-time Surya Namaskar pose estimation, detects posture, and provides corrective feedback.',
    html_url: 'https://github.com/Prosid26/ai-pose-trainer',
    stargazers_count: 5,
    forks_count: 2,
    language: 'Python',
    updated_at: '2026-07-07T12:00:00Z',
  },
  {
    name: 'restaurant-erp',
    description: 'Full-stack ERP system with QR ordering, real-time tracking, administration dashboards, and multi-brand custom theme engines.',
    html_url: 'https://github.com/Prosid26/restaurant-erp',
    stargazers_count: 8,
    forks_count: 3,
    language: 'TypeScript',
    updated_at: '2026-07-06T15:00:00Z',
  },
  {
    name: 'nft-marketplace',
    description: 'Decentralized blockchain NFT marketplace featuring ERC-721 smart contracts, wallet connectivity, and token trading.',
    html_url: 'https://github.com/Prosid26/nft-marketplace',
    stargazers_count: 4,
    forks_count: 1,
    language: 'Solidity',
    updated_at: '2026-07-04T09:00:00Z',
  },
  {
    name: 'eyeview-ai',
    description: 'Intelligent video analytics platform running computer vision processing pipelines and API backend automation.',
    html_url: 'https://github.com/Prosid26/eyeview-ai',
    stargazers_count: 3,
    forks_count: 0,
    language: 'Python',
    updated_at: '2026-07-01T18:00:00Z',
  },
];

const STATIC_FALLBACK_LANGS = [
  { name: 'Python', percentage: 40, color: 'bg-blue-500' },
  { name: 'TypeScript', percentage: 30, color: 'bg-[#7C5CFC]' },
  { name: 'JavaScript', percentage: 20, color: 'bg-yellow-500' },
  { name: 'Solidity', percentage: 10, color: 'bg-zinc-600' },
];

export default function GithubSection() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [latestRepos, setLatestRepos] = useState<GithubRepo[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<{ name: string; percentage: number; color: string }[]>([]);
  const [contributions, setContributions] = useState<{ date: string; count: number; level: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [latestCommitDate, setLatestCommitDate] = useState<string>('');
  const [isCachedMode, setIsCachedMode] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Profile
        const profileRes = await fetch('https://api.github.com/users/Prosid26');
        if (profileRes.status === 403 || !profileRes.ok) {
          throw new Error('Rate limited or failed');
        }
        const profileData = await profileRes.json();
        setProfile({
          avatar_url: profileData.avatar_url || STATIC_FALLBACK_PROFILE.avatar_url,
          bio: profileData.bio || STATIC_FALLBACK_PROFILE.bio,
          public_repos: profileData.public_repos || STATIC_FALLBACK_PROFILE.public_repos,
          followers: profileData.followers || STATIC_FALLBACK_PROFILE.followers,
          following: profileData.following || STATIC_FALLBACK_PROFILE.following,
          name: profileData.name || STATIC_FALLBACK_PROFILE.name,
          html_url: profileData.html_url || STATIC_FALLBACK_PROFILE.html_url,
        });

        // 2. Fetch Repositories
        const reposRes = await fetch('https://api.github.com/users/Prosid26/repos?sort=updated&per_page=30');
        if (reposRes.status === 403 || !reposRes.ok) {
          throw new Error('Rate limited or failed');
        }
        const reposData: GithubRepo[] = await reposRes.json();

        // Calculate latest commit date
        if (reposData.length > 0) {
          const sortedByPush = [...reposData].sort((a, b) => {
            const dateA = new Date(a.pushed_at || a.updated_at).getTime();
            const dateB = new Date(b.pushed_at || b.updated_at).getTime();
            return dateB - dateA;
          });
          if (sortedByPush[0]) {
            const latestDate = new Date(sortedByPush[0].pushed_at || sortedByPush[0].updated_at);
            setLatestCommitDate(latestDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }));
          }
        }

        // Separate Pinned & Latest Repos
        const mainProjectNames = ['ai-pose-trainer', 'restaurant-erp', 'nft-marketplace', 'eyeview-ai'];
        const pins = reposData.filter(r => 
          mainProjectNames.includes(r.name.toLowerCase()) || 
          r.name.toLowerCase().includes('fitness') || 
          r.name.toLowerCase().includes('erp')
        ).slice(0, 2);

        if (pins.length === 0) {
          pins.push(...[...reposData].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 2));
        }
        setPinnedRepos(pins);

        const latest = reposData
          .filter(r => !pins.some(p => p.name === r.name))
          .slice(0, 2);
        setLatestRepos(latest);

        // 3. Languages distribution
        const langCounts: Record<string, number> = {};
        let totalLangCount = 0;
        reposData.forEach(r => {
          if (r.language) {
            langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            totalLangCount++;
          }
        });

        const langColors: Record<string, string> = {
          Python: 'bg-blue-500',
          TypeScript: 'bg-[#7C5CFC]',
          JavaScript: 'bg-yellow-500',
          Java: 'bg-amber-600',
          Solidity: 'bg-zinc-600',
          HTML: 'bg-orange-500',
          CSS: 'bg-indigo-500',
        };

        const calculatedLangs = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangCount) * 100),
            color: langColors[name] || 'bg-zinc-400',
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        setLanguages(calculatedLangs.length > 0 ? calculatedLangs : STATIC_FALLBACK_LANGS);

        // 4. Fetch Contributions
        try {
          const contribRes = await fetch('https://github-contributions-api.deno.dev/v1/Prosid26');
          if (contribRes.ok) {
            const contribData = await contribRes.json();
            const allDays = contribData.contributions || [];
            setContributions(allDays.slice(-266));
          } else {
            generatePlaceholderContributions();
          }
        } catch {
          generatePlaceholderContributions();
        }
      } catch (err) {
        console.warn('GitHub API limits reached or network error; loading elegant cached fallback stats.', err);
        setIsCachedMode(true);
        // Load Static Fallbacks
        setProfile(STATIC_FALLBACK_PROFILE);
        setPinnedRepos(STATIC_FALLBACK_REPOS.slice(0, 2));
        setLatestRepos(STATIC_FALLBACK_REPOS.slice(2, 4));
        setLanguages(STATIC_FALLBACK_LANGS);
        setLatestCommitDate('July 7, 2026');
        generatePlaceholderContributions();
      } finally {
        setLoading(false);
      }
    };

    const generatePlaceholderContributions = () => {
      const rows = 7;
      const cols = 38;
      const totalCells = rows * cols;
      const generated = Array.from({ length: totalCells }, () => {
        const rand = Math.random();
        return {
          date: '',
          count: rand > 0.6 ? Math.floor(rand * 5) : 0,
          level: rand > 0.6 ? (rand > 0.9 ? 3 : rand > 0.75 ? 2 : 1) : 0,
        };
      });
      setContributions(generated);
    };

    fetchGithubData();
  }, []);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-purple-900/40';
      case 2: return 'bg-purple-600/60';
      case 3: return 'bg-accent shadow-[0_0_8px_rgba(124,92,252,0.5)]';
      default: return 'bg-zinc-900/60';
    }
  };

  if (loading) {
    return (
      <section id="github" className="py-24 bg-background text-center">
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block mb-4">
          Loading GitHub Metrics...
        </span>
        <div className="h-1 w-24 bg-accent/20 mx-auto rounded overflow-hidden">
          <div className="h-full bg-accent animate-pulse w-1/2" />
        </div>
      </section>
    );
  }

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              06 / Open Source
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              GitHub Activity & Metrics
            </h2>
            <p className="text-zinc-400 mt-2 max-w-xl text-sm leading-relaxed">
              Real-time profile statistics and repositories loaded dynamically from my GitHub account.
            </p>
          </div>
          {isCachedMode && (
            <span className="text-[9px] font-mono bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-md text-accent animate-pulse shrink-0 w-fit">
              Offline Cached Mode
            </span>
          )}
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card & Languages */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between shadow-xl">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex items-center gap-3.5">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Siddhesh Narvekar Profile"
                      className="h-12 w-12 rounded-full border border-zinc-800 bg-zinc-900"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center text-white font-bold">
                      S
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-bold text-white">{profile?.name || 'Siddhesh Narvekar'}</h3>
                    <p className="text-[10px] text-zinc-500 font-mono">github.com/Prosid26</p>
                  </div>
                </div>
                <a
                  href={profile?.html_url || 'https://github.com/Prosid26'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 px-3 py-1.5 text-[10px] font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  Follow
                  <ExternalLink className="ml-1.5 h-2.5 w-2.5" />
                </a>
              </div>

              {/* Bio */}
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                {profile?.bio}
              </p>

              {/* Latest Commit Date */}
              {latestCommitDate && (
                <p className="text-[10px] font-mono text-zinc-500 mb-6 flex items-center gap-1.5 select-none">
                  <GitCommit className="h-3.5 w-3.5 text-accent animate-pulse" />
                  Latest Activity: <span className="text-white font-semibold">{latestCommitDate}</span>
                </p>
              )}

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1 flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    Repos
                  </span>
                  <span className="text-lg font-bold text-white font-mono">{profile?.public_repos}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Followers
                  </span>
                  <span className="text-lg font-bold text-white font-mono">{profile?.followers}</span>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    Following
                  </span>
                  <span className="text-lg font-bold text-white font-mono">{profile?.following}</span>
                </div>
              </div>
            </div>

            {/* Languages breakdown */}
            {languages.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <Code className="h-4 w-4 text-accent" />
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Top Languages
                  </h3>
                </div>

                <div className="space-y-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-zinc-300 font-semibold">{lang.name}</span>
                        <span className="text-zinc-500">{lang.percentage}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${lang.color}`}
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Contributions Calendar & Pinned Repos */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contributions graph */}
            {contributions.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Contribution Heatmap
                  </h3>
                  <span className="text-[9px] text-zinc-500 font-mono">Simulated Activity Matrix</span>
                </div>

                {/* Grid */}
                <div className="overflow-x-auto pb-2">
                  <div 
                    className="grid grid-flow-col gap-[3.5px] w-full min-w-[500px]"
                    style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))', gridTemplateColumns: 'repeat(38, minmax(0, 1fr))' }}
                  >
                    {contributions.map((day, i) => (
                      <div
                        key={i}
                        className={`h-2.5 w-2.5 rounded-sm transition-all duration-350 ${getColorClass(day.level)}`}
                        title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                      />
                    ))}
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-zinc-500 font-mono">
                  <span>Less</span>
                  <span className="h-2.5 w-2.5 rounded-sm bg-zinc-900/60" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-purple-900/40" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-purple-600/60" />
                  <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
                  <span>More</span>
                </div>
              </div>
            )}

            {/* Pinned & Latest Repos Panel */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Featured Repositories
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...pinnedRepos, ...latestRepos].slice(0, 4).map((repo) => (
                  <div
                    key={repo.name}
                    className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 hover:border-accent/30 hover:bg-[#0c0c10]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-40 shadow-xl"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-white hover:text-accent flex items-center gap-1.5 truncate max-w-[80%]"
                        >
                          {repo.name}
                          <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                        </a>
                        <span className="text-[9px] font-mono text-zinc-500 border border-zinc-850 px-1.5 py-0.5 rounded shrink-0">
                          Public
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                        {repo.description || 'No description available for this repository.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-zinc-900">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                        {repo.language || 'Code'}
                      </div>
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
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
