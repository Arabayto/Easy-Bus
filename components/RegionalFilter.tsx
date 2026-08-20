import React from 'react';
import { CityRegion } from '../types';
import { CITIES } from '../constants';
import { Translations } from '../translations';
import { MapPinIcon } from './icons';

interface RegionalFilterProps {
  selectedCity: CityRegion | 'all';
  onSelectCity: (city: CityRegion | 'all') => void;
  t: Translations;
  cityCounts: Record<string, number>;
}

export const RegionalFilter: React.FC<RegionalFilterProps> = ({
  selectedCity,
  onSelectCity,
  t,
  cityCounts
}) => {
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
          <MapPinIcon className="w-4 h-4 text-orange-500" />
          <span>{t.location}</span>
        </div>
        {selectedCity !== 'all' && (
          <span className="text-[11px] font-semibold text-orange-400">
            {t.cityRegions[selectedCity]} ({cityCounts[selectedCity] || 0})
          </span>
        )}
      </div>

      {/* Horizontal Scrollable City Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar scroll-smooth">
        {/* All Cities Pill */}
        <button
          type="button"
          onClick={() => onSelectCity('all')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 active:scale-95 ${
            selectedCity === 'all'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/50'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
          }`}
        >
          <span>{t.allCities}</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
            selectedCity === 'all' ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'
          }`}>
            {cityCounts['all'] || 0}
          </span>
        </button>

        {/* Individual City Pills */}
        {CITIES.map((city) => {
          const count = cityCounts[city] || 0;
          const isSelected = selectedCity === city;
          return (
            <button
              key={city}
              type="button"
              onClick={() => onSelectCity(isSelected ? 'all' : city)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 active:scale-95 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 ring-2 ring-orange-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{t.cityRegions[city]}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  isSelected ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-400'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
