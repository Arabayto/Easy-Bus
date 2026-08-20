import React from 'react';
import { Translations } from '../translations';
import { 
  BusIcon, 
  CarIcon, 
  IdBadgeIcon, 
  ShieldCheckIcon, 
  BellIcon,
  SparklesIcon 
} from './icons';

export type TabType = 'explore' | 'categories' | 'driver' | 'admin';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadCount: number;
  t: Translations;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadCount,
  t
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-t border-slate-800/80 px-2 py-2 safe-pb">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {/* Tab 1: Explore */}
        <button
          type="button"
          onClick={() => onSelectTab('explore')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === 'explore'
              ? 'text-orange-400 bg-orange-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BusIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t.navExplore}</span>
        </button>

        {/* Tab 2: Categories */}
        <button
          type="button"
          onClick={() => onSelectTab('categories')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === 'categories'
              ? 'text-orange-400 bg-orange-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <CarIcon className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] tracking-tight">{t.navCategories}</span>
        </button>

        {/* Tab 3: Driver UI */}
        <button
          type="button"
          onClick={() => onSelectTab('driver')}
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === 'driver'
              ? 'text-emerald-400 bg-emerald-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <IdBadgeIcon className="w-5 h-5 mb-0.5 text-emerald-400" />
          <span className="text-[10px] tracking-tight">{t.navDriver}</span>
        </button>

        {/* Tab 4: Admin */}
        <button
          type="button"
          onClick={() => onSelectTab('admin')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-2xl transition-all duration-200 active:scale-95 ${
            activeTab === 'admin'
              ? 'text-orange-400 bg-orange-500/10 font-bold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <ShieldCheckIcon className="w-5 h-5 mb-0.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[8px] font-black flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight">{t.navAdmin}</span>
        </button>
      </div>
    </nav>
  );
};
