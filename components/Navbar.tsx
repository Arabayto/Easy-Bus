import React from 'react';
import { Language } from '../types';
import { Translations } from '../translations';
import { 
  ShieldCheckIcon, 
  BellIcon
} from './icons';

interface NavbarProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenAdmin: () => void;
  onOpenDriver: () => void;
  unreadBookingsCount: number;
  t: Translations;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  onOpenAdmin,
  onOpenDriver,
  unreadBookingsCount,
  t
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-2xl border-b border-slate-800/90 px-3.5 py-2.5 safe-pt shadow-xl">
      <div className="max-w-2xl mx-auto flex items-center justify-between gap-2">
        {/* Official Shield Logo & App Title */}
        <div className="flex items-center gap-2.5">
          <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
            <img 
              src="/logo.svg" 
              alt="Easy Bus Official Shield Emblem" 
              className="h-12 w-12 object-contain drop-shadow-[0_4px_12px_rgba(234,179,8,0.35)] transition-transform hover:scale-105"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-white flex items-center gap-1">
                <span>Easy</span>
                <span className="text-amber-400">Bus</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/30">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-semibold truncate max-w-[150px] sm:max-w-none">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Multi-Language Switcher (Phase 5) */}
          <div className="flex items-center bg-slate-900 rounded-2xl p-0.5 border border-slate-800 shadow-inner">
            {(['en', 'so', 'ar'] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-xl text-xs font-black uppercase transition-all ${
                  currentLanguage === lang
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={lang === 'en' ? 'English' : lang === 'so' ? 'Af-Soomaali' : 'العربية'}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Admin / Owner Portal Button with live alert badge */}
          <button
            type="button"
            onClick={onOpenAdmin}
            className="relative h-9 px-3 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white flex items-center gap-1.5 transition-all shadow-md active:scale-95 text-xs font-bold"
            title="Owner & Manager Panel"
          >
            <ShieldCheckIcon className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">{t.adminPortal}</span>
            {unreadBookingsCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-lg animate-pulse">
                {unreadBookingsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
