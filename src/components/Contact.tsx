'use client';

import { useState, useEffect } from 'react';
import { Mail, FileText, ChevronUp, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '@/components/icons';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const contactLinks = [
    {
      name: 'Email',
      value: 'siddheshnarvekar71@gmail.com',
      href: 'mailto:siddheshnarvekar71@gmail.com',
      icon: Mail,
      color: 'hover:text-[#7C5CFC]',
    },
    {
      name: 'LinkedIn',
      value: 'linkedin.com/in/narvekar-siddhesh',
      href: 'https://www.linkedin.com/in/narvekar-siddhesh-7a216b31b',
      icon: Linkedin,
      color: 'hover:text-[#5B8DEF]',
    },
    {
      name: 'GitHub',
      value: 'github.com/Prosid26',
      href: 'https://github.com/Prosid26',
      icon: Github,
      color: 'hover:text-white',
    },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-transparent border-t border-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-accent uppercase">
            07 / Contact
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Let's Build Something Together
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base leading-relaxed">
            I'm currently seeking Software Engineer, Full Stack Developer, and Graduate Trainee roles. 
            If you have an opportunity or want to discuss a project, feel free to reach out.
          </p>
        </div>

        {/* Contact Links Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className={`p-6 rounded-2xl bg-[#09090b]/40 border border-zinc-800/60 transition-all duration-300 hover:border-accent/30 hover:bg-[#0c0c10]/40 group flex flex-col items-start`}
              >
                <div className="p-3 rounded-xl bg-zinc-900 text-zinc-400 group-hover:text-accent group-hover:bg-accent/10 transition-colors duration-300 mb-5">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                  {link.name}
                </span>
                <span className={`text-sm font-semibold text-zinc-300 transition-colors duration-300 flex items-center gap-1 w-full truncate ${link.color}`}>
                  {link.value}
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
            );
          })}
        </div>

        {/* Resume Button Call to Action */}
        <div className="text-center mb-16">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800 px-6 py-3 text-sm font-semibold text-zinc-300 hover:text-white transition-all duration-300"
          >
            <FileText className="h-4.5 w-4.5 text-accent" />
            Download Full Resume (PDF)
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-zinc-900/60 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500 font-mono">
          <div className="space-y-1.5 text-center md:text-left">
            <p className="text-white font-semibold">Designed & Engineered by Siddhesh Narvekar</p>
            <p className="text-[10px] text-zinc-500 flex flex-wrap items-center justify-center md:justify-start gap-1">
              Built with
              <span className="text-zinc-400">Next.js</span> • 
              <span className="text-zinc-400">TypeScript</span> • 
              <span className="text-zinc-400">TailwindCSS</span> • 
              <span className="text-zinc-400">Framer Motion</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Vercel Deploy Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-400 select-none">
              <svg viewBox="0 0 116 100" fill="currentColor" className="h-2.5 w-2.5 text-white shrink-0">
                <path d="M57.5 0L115 100H0L57.5 0Z" />
              </svg>
              <span>Powered by Vercel</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Prosid26"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/narvekar-siddhesh-7a216b31b"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="mailto:siddheshnarvekar71@gmail.com"
                className="hover:text-white transition-colors"
                aria-label="Email Siddhesh"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Back to Top Floating Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-accent text-white hover:bg-[#684be3] shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all duration-300"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </section>
  );
}
