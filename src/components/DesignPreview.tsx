import React from 'react';
import { GardenDesign } from '../types';
import { motion } from 'motion/react';
import { TreePine, Droplet, Sprout, Wind } from 'lucide-react';

interface DesignPreviewProps {
  design: GardenDesign | null;
  isLoading: boolean;
}

export function DesignPreview({ design, isLoading }: DesignPreviewProps) {
  if (isLoading) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center space-y-6 text-neutral-400 p-8">
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-emerald-100 rounded-full border-t-emerald-500"
          />
          <Sprout className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600 animate-pulse" />
        </div>
        <p className="text-sm font-medium tracking-wide text-neutral-500 uppercase">Consulting landscape architects...</p>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-full flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto">
        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
          <TreePine className="w-10 h-10 text-emerald-400" />
        </div>
        <h3 className="text-xl font-medium text-neutral-900 mb-2">No Garden Generated Yet</h3>
        <p className="text-neutral-500 leading-relaxed">
          Select your preferences in the panel and click generate to visualize your dream outdoor space.
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 md:p-10 max-w-4xl mx-auto space-y-12"
    >
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium uppercase tracking-wider">
          <SparklesIcon className="w-3.5 h-3.5" />
          Generated Concept
        </div>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-neutral-900 leading-tight">
          {design.moodDesc}
        </h2>
      </div>

      {design.imageUrl && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl shadow-neutral-200/50 outline outline-1 outline-neutral-200/50"
        >
          <img 
            src={design.imageUrl} 
            alt="Generated garden concept" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl pointer-events-none" />
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-2">Layout & Structure</h3>
          <p className="text-neutral-600 leading-relaxed text-[15px]">
            {design.layoutText}
          </p>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-2">Recommended Flora</h3>
          <ul className="space-y-3">
            {design.plantingList.map((plant, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + (index * 0.05) }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex flex-shrink-0 items-center justify-center mt-0.5">
                  <LeafIcon className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="text-[15px] text-neutral-700">{plant}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// Inline small icons for aesthetic
function SparklesIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}

function LeafIcon(props: any) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}
