import React from 'react';
import { DesignPreferences } from '../types';
import { Leaf, Sun, Ruler, Sparkles, Loader2 } from 'lucide-react';

interface PreferenceFormProps {
  preferences: DesignPreferences;
  setPreferences: (prefs: DesignPreferences) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function PreferenceForm({ preferences, setPreferences, onSubmit, isLoading }: PreferenceFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col h-full gap-6 p-6">
      <div className="space-y-1">
        <h2 className="text-xl font-medium tracking-tight text-neutral-900">Garden Preferences</h2>
        <p className="text-sm text-neutral-500">Tell us what you're dreaming of, and we'll visualize it.</p>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 pb-8">
        {/* Style */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Leaf className="w-4 h-4 text-emerald-600" />
            Style Profile
          </label>
          <select
            name="style"
            value={preferences.style}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            disabled={isLoading}
          >
            <option value="Modern & Minimalist">Modern & Minimalist</option>
            <option value="English Cottage">English Cottage</option>
            <option value="Japanese Zen">Japanese Zen</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Wildflower Meadow">Wildflower Meadow</option>
          </select>
        </div>

        {/* Climate */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Sun className="w-4 h-4 text-amber-500" />
            Climate Zone
          </label>
          <select
            name="climate"
            value={preferences.climate}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            disabled={isLoading}
          >
            <option value="Temperate (Four Seasons)">Temperate (Four Seasons)</option>
            <option value="Tropical & Humid">Tropical & Humid</option>
            <option value="Arid / Desert">Arid / Desert</option>
            <option value="Cool Coastal">Cool Coastal</option>
          </select>
        </div>

        {/* Space Size */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Ruler className="w-4 h-4 text-blue-500" />
            Space Available
          </label>
          <select
            name="spaceSize"
            value={preferences.spaceSize}
            onChange={handleChange}
            className="w-full h-10 px-3 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            disabled={isLoading}
          >
            <option value="Small Balcony / Patio">Small Balcony / Patio</option>
            <option value="Urban Courtyard">Urban Courtyard</option>
            <option value="Medium Suburban Backyard">Medium Suburban Backyard</option>
            <option value="Large Estate">Large Estate</option>
          </select>
        </div>

        {/* Specific desires */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-neutral-700">
            <Sparkles className="w-4 h-4 text-purple-500" />
            Specific Desires
          </label>
          <textarea
            name="specificDesires"
            value={preferences.specificDesires}
            onChange={handleChange}
            placeholder="e.g., Bird bath, no grass, fragrant flowers, string lights..."
            rows={4}
            className="w-full p-3 rounded-lg border border-neutral-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-neutral-100">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Cultivating Design...
            </>
          ) : (
            <>
              Generate Garden Design
            </>
          )}
        </button>
      </div>
    </form>
  );
}
