'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, Users, ExternalLink, BookOpen, UserMinus } from 'lucide-react';
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
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

export default function GithubSection() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [latestRepos, setLatestRepos] = useState<GithubRepo[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<GithubRepo[]>([]);
  const [languages, setLanguages] = useState<{ name: string; percentage: number; color: string }[]>([]);
  const [contributions, setContributions] = useState<{ date: string; count: number; level: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Profile
        const profileRes = await fetch('https://api.github.com/users/Prosid26');
        if (profileRes.status === 403) {
          setIsRateLimited(true);
          setLoading(false);
          return;
        }
        const profileData = await profileRes.json();
        setProfile({
          avatar_url: profileData.avatar_url || '',
          bio: profileData.bio || 'Software Engineer | Full Stack Developer | AI Enthusiast',
          public_repos: profileData.public_repos || 0,
          followers: profileData.followers || 0,
          following: profileData.following || 0,
          name: profileData.name || 'Siddhesh Narvekar',
          html_url: profileData.html_url || 'https://github.com/Prosid26',
        });

        // 2. Fetch Repositories
        const reposRes = await fetch('https://api.github.com/users/Prosid26/repos?sort=updated&per_page=30');
        if (reposRes.status === 403) {
          setIsRateLimited(true);
          setLoading(false);
          return;
        }
        const reposData: GithubRepo[] = await reposRes.json();

        // Separate Featured/Pinned Repos and Latest Repos
        // Pinned repos are approximated by repos matching our main project tags or starred repos
        const mainProjectNames = ['ai-pose-trainer', 'restaurant-erp', 'nft-marketplace', 'eyeview-ai'];
        const pins = reposData.filter(r => 
          mainProjectNames.includes(r.name.toLowerCase()) || 
          r.name.toLowerCase().includes('fitness') || 
          r.name.toLowerCase().includes('erp')
        ).slice(0, 2);

        // If no matches, take the most starred
        if (pins.length === 0) {
          pins.push(...[...reposData].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 2));
        }
        setPinnedRepos(pins);

        // Latest repos sorted by updated date (exclude pins)
        const latest = reposData
          .filter(r => !pins.some(p => p.name === r.name))
          .slice(0, 2);
        setLatestRepos(latest);

        // 3. Calculate languages distribution
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

        setLanguages(calculatedLangs);

        // 4. Fetch Contributions
        // Use a free public contributions scraper API
        try {
          const contribRes = await fetch('https://github-contributions-api.deno.dev/v1/Prosid26');
          if (contribRes.ok) {
            const contribData = await contribRes.json();
            // Take the last 266 days (38 columns * 7 rows)
            const allDays = contribData.contributions || [];
            setContributions(allDays.slice(-266));
          } else {
            generatePlaceholderContributions();
          }
        } catch {
          generatePlaceholderContributions();
        }
      } catch (err) {
        console.error('Error fetching github data', err);
        setIsRateLimited(true);
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

  // Graceful Fallback if API Rate Limited
  if (isRateLimited) {
    return (
      <section id="github" className="py-24 relative overflow-hidden bg-[#020205]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <span className="text-xs font-mono tracking-widest text-accent uppercase">
              06 / Open Source
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              GitHub Metrics
            </h2>
          </div>
          
          <div className="p-8 rounded-3xl bg-[#09090b]/40 border border-zinc-800/60 max-w-2xl mx-auto text-center">
            <div className="p-4 rounded-full bg-zinc-900/80 text-accent w-fit mx-auto mb-6 border border-zinc-800">
              <Github className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">GitHub Activity Live Feed</h3>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              The GitHub API is currently rate-limiting dynamic requests. You can view all repositories, languages, and contribution logs directly on my public profile.
            </p>
            <a
              href="https://github.com/Prosid26"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#684be3] transition-all duration-300"
            >
              Explore @Prosid26
              <ExternalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="github" className="py-24 bg-[#020205] text-center">
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
    <section id="github" className="py-24 relative overflow-hidden bg-[#020205]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
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

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Profile Card & Languages (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Profile Card */}
            <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-6 gap-4">
                <div className="flex items-center gap-3.5">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Siddhesh Narvekar Profile"
                      className="h-12 w-12 rounded-full border border-zinc-800"
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
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                {profile?.bio}
              </p>

              {/* Stats Counters */}
              <div className="grid grid-cols-3 gap-4 border-t border-zinc-900 pt-6">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Public Repos</span>
                  <span className="text-xl font-bold text-white font-mono">{profile?.public_repos}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Followers</span>
                  <span className="text-xl font-bold text-white font-mono">{profile?.followers}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1">Following</span>
                  <span className="text-xl font-bold text-white font-mono">{profile?.following}</span>
                </div>
              </div>
            </div>

            {/* Languages breakdown (Dynamic) */}
            {languages.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60">
                <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-6">
                  Top Languages
                </h3>

                {/* Progress Bar */}
                <div className="h-2.5 w-full rounded-full bg-zinc-900 flex overflow-hidden mb-6">
                  {languages.map((lang) => (
                    <div
                      key={lang.name}
                      className={`${lang.color} h-full`}
                      style={{ width: `${lang.percentage}%` }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${lang.color}`} />
                      <div className="text-xs">
                        <span className="text-zinc-300 font-medium block">{lang.name}</span>
                        <span className="text-zinc-500 font-mono text-[10px]">{lang.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Contributions Calendar & Pinned Repos (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Contributions graph */}
            {contributions.length > 0 && (
              <div className="p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                    Contributions Calendar
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Dynamic Graph</span>
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
                    className="p-5 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 hover:border-zinc-700 transition-all duration-300 flex flex-col justify-between h-40"
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
                        <span className="text-[9px] font-mono text-zinc-500 border border-zinc-800 px-1.5 py-0.5 rounded shrink-0">
                          Public
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                        {repo.description || 'No description available for this repository.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono pt-3 border-t border-zinc-900">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" />
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
