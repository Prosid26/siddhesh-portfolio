'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'Royal Violet' | 'Ocean Blue' | 'Emerald' | 'Amber' | 'Rose' | 'Slate';
export type FontPreset = 'Inter' | 'Geist' | 'Poppins' | 'Manrope' | 'Space Grotesk';
export type MotionMode = 'Normal' | 'Reduced Motion' | 'Ultra Smooth';
export type GlassIntensity = 'Subtle' | 'Medium' | 'High';
export type CardRadiusPreset = 'Small' | 'Medium' | 'Large';
export type AppearanceTheme = 'Light' | 'Dark' | 'Midnight' | 'Graphite' | 'Auto';

interface ThemeSettings {
  accent: AccentColor;
  font: FontPreset;
  motion: MotionMode;
  glass: GlassIntensity;
  radius: CardRadiusPreset;
  theme: AppearanceTheme;
}

const defaultSettings: ThemeSettings = {
  accent: 'Royal Violet',
  font: 'Geist',
  motion: 'Normal',
  glass: 'Medium',
  radius: 'Medium',
  theme: 'Dark',
};

interface ThemeContextType {
  settings: ThemeSettings;
  updateSetting: <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => void;
  resetSettings: () => void;
  getFramerTransition: (baseDuration?: number) => any;
  isLightMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const accentColors: Record<AccentColor, { hex: string; glow: string }> = {
  'Royal Violet': { hex: '#7c5cfc', glow: 'rgba(124, 92, 252, 0.15)' },
  'Ocean Blue': { hex: '#3b82f6', glow: 'rgba(59, 130, 246, 0.15)' },
  'Emerald': { hex: '#10b981', glow: 'rgba(16, 185, 129, 0.15)' },
  'Amber': { hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.15)' },
  'Rose': { hex: '#f43f5e', glow: 'rgba(244, 63, 94, 0.15)' },
  'Slate': { hex: '#64748b', glow: 'rgba(100, 116, 139, 0.15)' },
};

const fontFamilies: Record<FontPreset, string> = {
  Inter: "'Inter', sans-serif",
  Geist: 'var(--font-geist-sans), sans-serif',
  Poppins: "'Poppins', sans-serif",
  Manrope: "'Manrope', sans-serif",
  'Space Grotesk': "'Space Grotesk', sans-serif",
};

const glassIntensityStyles: Record<GlassIntensity, { bgOpacity: number; blur: string }> = {
  Subtle: { bgOpacity: 0.85, blur: '4px' },
  Medium: { bgOpacity: 0.65, blur: '12px' },
  High: { bgOpacity: 0.45, blur: '24px' },
};

const radiusPresets: Record<CardRadiusPreset, string> = {
  Small: '8px',
  Medium: '16px',
  Large: '24px',
};

const appearanceThemes: Record<Exclude<AppearanceTheme, 'Auto'>, { bg: string; fg: string; fgMuted: string; cardBg: string; border: string; shadow: string }> = {
  Light: {
    bg: '#ffffff',
    fg: '#09090b',
    fgMuted: '#4b5563',
    cardBg: 'rgba(244, 244, 245, 0.75)',
    border: 'rgba(9, 9, 11, 0.06)',
    shadow: '0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02)',
  },
  Dark: {
    bg: '#030303',
    fg: '#ffffff',
    fgMuted: '#a1a1aa',
    cardBg: 'rgba(20, 20, 25, 0.4)',
    border: 'rgba(255, 255, 255, 0.08)',
    shadow: '0 10px 30px -10px rgba(0,0,0,0.7)',
  },
  Midnight: {
    bg: '#02020c',
    fg: '#ffffff',
    fgMuted: '#94a3b8',
    cardBg: 'rgba(8, 8, 30, 0.4)',
    border: 'rgba(148, 163, 184, 0.08)',
    shadow: '0 10px 30px -10px rgba(0,0,0,0.8)',
  },
  Graphite: {
    bg: '#151515',
    fg: '#ffffff',
    fgMuted: '#a1a1aa',
    cardBg: 'rgba(30, 30, 30, 0.4)',
    border: 'rgba(255, 255, 255, 0.06)',
    shadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio-custom-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse theme settings', e);
      }
    }
    setMounted(true);
  }, []);

  const applyThemeVariables = () => {
    if (!mounted) return;

    const root = document.documentElement;

    // 1. Accent Color
    const activeAccent = accentColors[settings.accent];
    root.style.setProperty('--accent', activeAccent.hex);
    root.style.setProperty('--accent-glow', activeAccent.glow);

    // 2. Font Family
    root.style.setProperty('--font-sans', fontFamilies[settings.font]);

    // 3. Card Radius
    root.style.setProperty('--card-radius', radiusPresets[settings.radius]);

    // 4. Resolve Appearance
    let activeThemeKey: Exclude<AppearanceTheme, 'Auto'> = 'Dark';
    if (settings.theme === 'Auto') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      activeThemeKey = systemDark ? 'Dark' : 'Light';
    } else {
      activeThemeKey = settings.theme;
    }

    setIsLightMode(activeThemeKey === 'Light');

    const activeTheme = appearanceThemes[activeThemeKey];
    root.style.setProperty('--background', activeTheme.bg);
    root.style.setProperty('--foreground', activeTheme.fg);
    root.style.setProperty('--foreground-muted', activeTheme.fgMuted);
    root.style.setProperty('--card-bg', activeTheme.cardBg);
    root.style.setProperty('--glass-border', activeTheme.border);
    root.style.setProperty('--shadow-preset', activeTheme.shadow);

    // 5. Glass Opacity and Blur
    const activeGlass = glassIntensityStyles[settings.glass];
    const glassBg = activeThemeKey === 'Light'
      ? `rgba(244, 244, 245, ${activeGlass.bgOpacity})`
      : activeThemeKey === 'Midnight'
      ? `rgba(2, 2, 20, ${activeGlass.bgOpacity})`
      : activeThemeKey === 'Graphite'
      ? `rgba(25, 25, 25, ${activeGlass.bgOpacity})`
      : `rgba(9, 9, 11, ${activeGlass.bgOpacity})`;
    
    root.style.setProperty('--glass-bg', glassBg);
    root.style.setProperty('--glass-blur', activeGlass.blur);

    // Set class lists on body for easy nested selector overrides
    if (activeThemeKey === 'Light') {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }

    // Save to localStorage
    localStorage.setItem('portfolio-custom-settings', JSON.stringify(settings));
  };

  // Re-run theme application whenever settings change
  useEffect(() => {
    applyThemeVariables();
  }, [settings, mounted]);

  // Listen for prefers-color-scheme OS changes dynamically
  useEffect(() => {
    if (!mounted || settings.theme !== 'Auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      applyThemeVariables();
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      mediaQuery.addListener(handleSystemThemeChange);
      return () => mediaQuery.removeListener(handleSystemThemeChange);
    }
  }, [settings.theme, mounted]);

  const updateSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const getFramerTransition = (baseDuration = 0.5) => {
    if (settings.motion === 'Reduced Motion') {
      return { duration: 0.1, ease: 'linear' };
    }
    if (settings.motion === 'Ultra Smooth') {
      return { duration: baseDuration * 1.5, ease: [0.16, 1, 0.3, 1] };
    }
    return { duration: baseDuration, ease: 'easeOut' };
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSetting, resetSettings, getFramerTransition, isLightMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function usePortfolioTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('usePortfolioTheme must be used within a ThemeProvider');
  }
  return context;
}
