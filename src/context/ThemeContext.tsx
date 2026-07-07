'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type AccentColor = 'Royal Violet' | 'Ocean Blue' | 'Emerald' | 'Amber' | 'Rose' | 'Slate';
export type FontPreset = 'Inter' | 'Geist' | 'Poppins' | 'Manrope' | 'Space Grotesk';
export type MotionMode = 'Normal' | 'Reduced Motion' | 'Ultra Smooth';
export type GlassIntensity = 'Subtle' | 'Medium' | 'High';
export type CardRadiusPreset = 'Small' | 'Medium' | 'Large';
export type AppearanceTheme = 'Dark' | 'Midnight' | 'Graphite';

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

const glassIntensityStyles: Record<GlassIntensity, { bg: string; blur: string }> = {
  Subtle: { bg: 'rgba(9, 9, 11, 0.85)', blur: '4px' },
  Medium: { bg: 'rgba(9, 9, 11, 0.65)', blur: '12px' },
  High: { bg: 'rgba(9, 9, 11, 0.45)', blur: '24px' },
};

const radiusPresets: Record<CardRadiusPreset, string> = {
  Small: '8px',
  Medium: '16px',
  Large: '24px',
};

const appearanceThemes: Record<AppearanceTheme, { bg: string; fg: string }> = {
  Dark: { bg: '#030303', fg: '#f4f4f5' },
  Midnight: { bg: '#02020a', fg: '#e2e2e9' },
  Graphite: { bg: '#111111', fg: '#ececed' },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

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

  // Update root CSS custom properties dynamically
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // 1. Accent Color
    const activeAccent = accentColors[settings.accent];
    root.style.setProperty('--accent', activeAccent.hex);
    root.style.setProperty('--accent-glow', activeAccent.glow);

    // 2. Font Family
    root.style.setProperty('--font-sans', fontFamilies[settings.font]);

    // 3. Glass styles
    const activeGlass = glassIntensityStyles[settings.glass];
    root.style.setProperty('--glass-bg', activeGlass.bg);
    root.style.setProperty('--glass-blur', activeGlass.blur);

    // 4. Card Radius
    root.style.setProperty('--card-radius', radiusPresets[settings.radius]);

    // 5. Appearance Theme background
    const activeTheme = appearanceThemes[settings.theme];
    root.style.setProperty('--background', activeTheme.bg);
    root.style.setProperty('--foreground', activeTheme.fg);

    // Save to localStorage
    localStorage.setItem('portfolio-custom-settings', JSON.stringify(settings));
  }, [settings, mounted]);

  const updateSetting = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  // Dynamic animation transition provider based on Motion settings
  const getFramerTransition = (baseDuration = 0.5) => {
    if (settings.motion === 'Reduced Motion') {
      return { duration: 0.1, ease: 'linear' };
    }
    if (settings.motion === 'Ultra Smooth') {
      return { duration: baseDuration * 1.5, ease: [0.16, 1, 0.3, 1] }; // Premium slow spring-like bezier
    }
    return { duration: baseDuration, ease: 'easeOut' }; // Normal
  };

  return (
    <ThemeContext.Provider value={{ settings, updateSetting, resetSettings, getFramerTransition }}>
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
