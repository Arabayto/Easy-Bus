import React from 'react';
import { VehicleCategory } from '../types';
import { Translations } from '../translations';
import { BusIcon, CarIcon, SparklesIcon } from './icons';

interface CategorySelectorProps {
  activeCategory: VehicleCategory | 'all';
  onSelectCategory: (category: VehicleCategory | 'all') => void;
  t: Translations;
  schoolCount: number;
  universityCount: number;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  onSelectCategory,
  t,
  schoolCount,
  universityCount
}) => {
  return (
    <div className="w-full mb-6">
      {/* Category Pills / Segmented Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20">
            {t.allCategories}
          </span>
          {activeCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-semibold text-slate-400 hover:text-white underline transition-colors"
            >
              Reset Filter
            </button>
          )}
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {schoolCount + universityCount} Available Fleet
        </span>
      </div>

      {/* Main Touch Category Cards (Phase 2) */}
      <div className="grid grid-cols-2 gap-3">
        {/* School Bus Category Card */}
        <button
          type="button"
          onClick={() => onSelectCategory(activeCategory === 'school_bus' ? 'all' : 'school_bus')}
          className={`relative text-left p-4 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between border group active:scale-95 ${
            activeCategory === 'school_bus'
              ? 'bg-gradient-to-br from-amber-500/20 to-orange-600/30 border-orange-500 shadow-lg shadow-orange-500/20 ring-2 ring-orange-500/50'
              : 'bg-slate-800/80 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800 shadow-md'
          }`}
        >
          {/* Glowing background blob */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl transition-opacity ${
            activeCategory === 'school_bus' ? 'bg-orange-500/40 opacity-100' : 'bg-orange-500/10 opacity-0 group-hover:opacity-100'
          }`} />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
              activeCategory === 'school_bus'
                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-orange-500/30'
                : 'bg-slate-700/80 text-orange-400'
            }`}>
              <BusIcon className="w-6 h-6" />
            </div>
            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
              activeCategory === 'school_bus'
                ? 'bg-orange-500 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}>
              {schoolCount}
            </span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-base font-extrabold text-white tracking-tight">
                {t.schoolBus}
              </h3>
            </div>
            <p className="text-[11px] leading-snug text-slate-300 line-clamp-2">
              {t.schoolBusDesc}
            </p>
          </div>

          {activeCategory === 'school_bus' && (
            <div className="mt-2.5 pt-2 border-t border-orange-500/30 flex items-center justify-between text-[11px] font-bold text-orange-400">
              <span>● Active View</span>
              <span>Tap to Clear</span>
            </div>
          )}
        </button>

        {/* University Car Category Card */}
        <button
          type="button"
          onClick={() => onSelectCategory(activeCategory === 'university_car' ? 'all' : 'university_car')}
          className={`relative text-left p-4 rounded-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between border group active:scale-95 ${
            activeCategory === 'university_car'
              ? 'bg-gradient-to-br from-blue-500/20 to-indigo-600/30 border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50'
              : 'bg-slate-800/80 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800 shadow-md'
          }`}
        >
          {/* Glowing background blob */}
          <div className={`absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl transition-opacity ${
            activeCategory === 'university_car' ? 'bg-blue-500/40 opacity-100' : 'bg-blue-500/10 opacity-0 group-hover:opacity-100'
          }`} />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-md ${
              activeCategory === 'university_car'
                ? 'bg-gradient-to-tr from-blue-500 to-indigo-500 text-white shadow-blue-500/30'
                : 'bg-slate-700/80 text-blue-400'
            }`}>
              <CarIcon className="w-6 h-6" />
            </div>
            <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
              activeCategory === 'university_car'
                ? 'bg-blue-500 text-white'
                : 'bg-slate-700 text-slate-300'
            }`}>
              {universityCount}
            </span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-1.5 mb-1">
              <h3 className="text-base font-extrabold text-white tracking-tight">
                {t.universityCar}
              </h3>
            </div>
            <p className="text-[11px] leading-snug text-slate-300 line-clamp-2">
              {t.universityCarDesc}
            </p>
          </div>

          {activeCategory === 'university_car' && (
            <div className="mt-2.5 pt-2 border-t border-blue-500/30 flex items-center justify-between text-[11px] font-bold text-blue-400">
              <span>● Active View</span>
              <span>Tap to Clear</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
