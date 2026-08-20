import React, { useState, useEffect } from 'react';
import { Translations } from '../translations';
import { DownloadIcon, CloseIcon, CheckCircleIcon, SparklesIcon } from './icons';

interface PwaInstallPromptProps {
  t: Translations;
  onInstalled?: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaInstallPrompt: React.FC<PwaInstallPromptProps> = ({ t, onInstalled }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIosModalOpen, setIsIosModalOpen] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    setIsStandalone(isStandaloneMode);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      if (onInstalled) onInstalled();
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [onInstalled]);

  // Check if user is on iOS Safari
  const isIos = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as unknown as { MSStream?: unknown }).MSStream;

  if (isStandalone || isDismissed) {
    return null;
  }

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setIsIosModalOpen(true);
    } else {
      // Fallback for browsers
      alert(t.installPromptText);
    }
  };

  return (
    <>
      {/* Top / Floating Install Banner */}
      <div className="w-full mb-4 animate-fade-in">
        <div className="bg-gradient-to-r from-orange-600/90 via-amber-600/90 to-orange-500/90 rounded-2xl p-3.5 border border-orange-400/30 shadow-xl backdrop-blur-md flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0 shadow-inner">
              <DownloadIcon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-white">{t.installApp}</span>
                <span className="text-[9px] bg-white text-orange-600 font-extrabold px-1.5 py-0.2 rounded-full">PWA</span>
              </div>
              <p className="text-[11px] text-orange-100 truncate">
                {t.installPromptText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleInstallClick}
              className="py-1.5 px-3 rounded-xl bg-white text-slate-950 font-black text-xs hover:bg-slate-100 active:scale-95 transition-all shadow-md"
            >
              {t.installNow}
            </button>
            <button
              type="button"
              onClick={() => setIsDismissed(true)}
              className="p-1 text-orange-200 hover:text-white rounded-lg"
              aria-label="Dismiss"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Install Instruction Modal */}
      {isIosModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center p-0 sm:p-4">
          <div className="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl border border-slate-800 p-6 space-y-4 animate-slide-up text-center">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center mx-auto">
              <DownloadIcon className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white">
                Add Easy Bus to Home Screen
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t.iosInstallGuide}
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-left text-xs space-y-2 text-slate-300">
              <p>{t.iosStep1}</p>
              <p>{t.iosStep2}</p>
            </div>

            <button
              type="button"
              onClick={() => setIsIosModalOpen(false)}
              className="w-full py-3 rounded-xl bg-orange-500 text-white font-extrabold text-xs shadow-lg shadow-orange-500/25"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
