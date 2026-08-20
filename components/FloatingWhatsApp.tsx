import React from 'react';
import { DEFAULT_WHATSAPP_NUMBER } from '../constants';
import { Translations } from '../translations';
import { WhatsAppIcon } from './icons';

interface FloatingWhatsAppProps {
  t: Translations;
  lang: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ t, lang }) => {
  const isRTL = lang === 'ar';
  const whatsappUrl = `https://wa.me/${DEFAULT_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hello Easy Bus! I would like to inquire about school and university transportation services.'
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-20 z-40 p-3.5 bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group ${
        isRTL ? 'left-4' : 'right-4'
      }`}
      title={t.whatsappContact}
      aria-label={t.whatsappContact}
    >
      <div className="relative">
        <WhatsAppIcon className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping opacity-75" />
      </div>
      
      <span className={`absolute bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-slate-700 pointer-events-none ${
        isRTL ? 'left-full ml-3' : 'right-full mr-3'
      }`}>
        {t.whatsappContact}
      </span>
    </a>
  );
};
