'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, X, RotateCcw, Palette, Type, Activity, Layers, Maximize, Shield } from 'lucide-react';
import { usePortfolioTheme, AccentColor, FontPreset, MotionMode, GlassIntensity, CardRadiusPreset, AppearanceTheme } from '@/context/ThemeContext';

export default function ThemeCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const { settings, updateSetting, resetSettings } = usePortfolioTheme();

  const accentPresets: { name: AccentColor; hex: string }[] = [
    { name: 'Royal Violet', hex: '#7c5cfc' },
    { name: 'Ocean Blue', hex: '#3b82f6' },
    { name: 'Emerald', hex: '#10b981' },
    { name: 'Amber', hex: '#f59e0b' },
    { name: 'Rose', hex: '#f43f5e' },
    { name: 'Slate', hex: '#64748b' },
  ];

  const fontPresets: FontPreset[] = ['Inter', 'Geist', 'Poppins', 'Manrope', 'Space Grotesk'];
  const motionPresets: MotionMode[] = ['Normal', 'Reduced Motion', 'Ultra Smooth'];
  const glassPresets: GlassIntensity[] = ['Subtle', 'Medium', 'High'];
  const radiusPresets: CardRadiusPreset[] = ['Small', 'Medium', 'Large'];
  const appearancePresets: AppearanceTheme[] = ['Dark', 'Midnight', 'Graphite'];

  return (
    <>
      {/* Floating Settings Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-40 p-3.5 rounded-full glass-panel text-zinc-300 hover:text-white shadow-xl hover:shadow-accent/20 hover:scale-105 transition-all duration-300 border border-zinc-800 focus:outline-none"
        aria-label="Open portfolio settings customizer"
      >
        <Settings className="h-5 w-5 animate-[spin_8s_linear_infinite] hover:animate-[spin_3s_linear_infinite]" />
      </button>

      {/* Drawer Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Dark Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black z-40 backdrop-blur-xs"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm glass-panel border-l border-zinc-800/80 shadow-2xl z-50 flex flex-col justify-between overflow-hidden"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(var(--glass-blur))',
                WebkitBackdropFilter: 'blur(var(--glass-blur))',
              }}
            >
              {/* Header */}
              <div className="p-6 border-b border-zinc-900 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Palette className="h-4.5 w-4.5 text-accent" />
                  <h3 className="text-base font-bold text-white tracking-tight">Experience Customizer</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-zinc-500 hover:text-white transition-colors"
                  aria-label="Close customizer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body Content */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin">
                
                {/* 1. Theme Accent */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Palette className="h-3.5 w-3.5" />
                    <span>Theme Accent</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {accentPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => updateSetting('accent', preset.name)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-[10px] font-mono transition-all duration-300 ${
                          settings.accent === preset.name
                            ? 'bg-zinc-900 border-accent text-white shadow-md shadow-accent/10'
                            : 'bg-zinc-950/60 border-zinc-900 text-zinc-400 hover:border-zinc-800'
                        }`}
                      >
                        <span
                          className="h-3.5 w-3.5 rounded-full mb-1.5 shadow-inner"
                          style={{ backgroundColor: preset.hex }}
                        />
                        {preset.name.replace('Royal ', '').replace('Ocean ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Typography */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Type className="h-3.5 w-3.5" />
                    <span>Typography</span>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {fontPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateSetting('font', preset)}
                        className={`flex items-center justify-between px-4 py-2.5 rounded-xl border text-xs transition-all duration-200 ${
                          settings.font === preset
                            ? 'bg-zinc-900/80 border-accent text-white font-semibold'
                            : 'bg-zinc-950/40 border-zinc-900/60 text-zinc-400 hover:border-zinc-800 hover:text-zinc-200'
                        }`}
                        style={{
                          fontFamily: preset === 'Geist' ? 'var(--font-geist-sans)' : preset === 'Space Grotesk' ? "'Space Grotesk'" : `'${preset}'`,
                        }}
                      >
                        <span>{preset}</span>
                        {settings.font === preset && <span className="h-1.5 w-1.5 rounded-full bg-accent" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Appearance (Dark presets only) */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Appearance (Dark Themes)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-zinc-900">
                    {appearancePresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateSetting('theme', preset)}
                        className={`py-1.5 rounded-lg text-xs transition-all duration-300 font-medium ${
                          settings.theme === preset
                            ? 'bg-zinc-900 border border-zinc-800 text-white shadow'
                            : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Motion Timing */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Activity className="h-3.5 w-3.5" />
                    <span>Motion Dynamics</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-zinc-900">
                    {motionPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateSetting('motion', preset)}
                        className={`py-1.5 rounded-lg text-[10px] transition-all duration-300 font-medium ${
                          settings.motion === preset
                            ? 'bg-zinc-900 border border-zinc-800 text-white shadow'
                            : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                        }`}
                      >
                        {preset.replace(' Motion', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 5. Glass Intensity */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Layers className="h-3.5 w-3.5" />
                    <span>Glass Intensity</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-zinc-900">
                    {glassPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateSetting('glass', preset)}
                        className={`py-1.5 rounded-lg text-xs transition-all duration-300 font-medium ${
                          settings.glass === preset
                            ? 'bg-zinc-900 border border-zinc-800 text-white shadow'
                            : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 6. Card Radius */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    <Maximize className="h-3.5 w-3.5" />
                    <span>Card Corner Radius</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5 bg-zinc-950/80 p-1 rounded-xl border border-zinc-900">
                    {radiusPresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => updateSetting('radius', preset)}
                        className={`py-1.5 rounded-lg text-xs transition-all duration-300 font-medium ${
                          settings.radius === preset
                            ? 'bg-zinc-900 border border-zinc-800 text-white shadow'
                            : 'text-zinc-500 hover:text-zinc-300 border border-transparent'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-6 border-t border-zinc-900 bg-zinc-950/40 space-y-4">
                {/* Reset Action */}
                <button
                  onClick={resetSettings}
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-xs font-semibold text-zinc-400 hover:text-white transition-all duration-300"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset to Default
                </button>

                {/* ERP Branding note */}
                <div className="p-3.5 rounded-xl bg-accent/5 border border-accent/10 flex gap-2.5 items-start">
                  <Shield className="h-4.5 w-4.5 text-accent shrink-0 mt-0.5" />
                  <p className="text-[10px] text-zinc-400 leading-normal">
                    This customizer demonstrates dynamic branding concepts modeled from my **Restaurant ERP** project.
                  </p>
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
