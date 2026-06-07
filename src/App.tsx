import React, { useState } from 'react';
import { PreferenceForm } from './components/PreferenceForm';
import { DesignPreview } from './components/DesignPreview';
import { GardenDesign, DesignPreferences } from './types';

export default function App() {
  const [preferences, setPreferences] = useState<DesignPreferences>({
    style: 'Modern & Minimalist',
    climate: 'Temperate (Four Seasons)',
    spaceSize: 'Medium Suburban Backyard',
    specificDesires: ''
  });

  const [design, setDesign] = useState<GardenDesign | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setDesign(null);

    try {
      const res = await fetch('/api/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate design');
      }
      
      setDesign(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden font-sans">
      {/* Sidebar Panel */}
      <div className="w-80 flex-shrink-0 bg-white border-r border-neutral-200 z-10 flex flex-col shadow-sm">
        <PreferenceForm 
          preferences={preferences} 
          setPreferences={setPreferences} 
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative bg-neutral-50/50">
        {error && (
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-100 shadow-sm flex items-center gap-3 text-sm max-w-lg w-full">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        <DesignPreview design={design} isLoading={isLoading} />
      </main>
    </div>
  );
}
