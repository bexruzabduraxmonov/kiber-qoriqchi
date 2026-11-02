import React from 'react';
import { usePwa } from '../context/PwaContext';
import { useLanguage } from '../context/LanguageContext';

export const InstallBanner = () => {
  const { showInstallBanner, dismissBanner, installApp, isInstalled } = usePwa();
  const { language } = useLanguage();

  if (!showInstallBanner || isInstalled) return null;

  return (
    <div className="fixed bottom-3 inset-x-3 sm:left-auto sm:right-5 sm:max-w-sm z-50 animate-slideUp">
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0d1620]/95 backdrop-blur-md border border-[#88cc14]/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
        {/* App Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#081018] border border-[#88cc14]/50 shadow-[0_0_12px_rgba(136,204,20,0.25)]">
            <img src="/logo-cybershield-badge.svg" alt="App Icon" className="w-7 h-7 object-contain" />
          </div>
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-white truncate flex items-center gap-1.5">
              <span>KiberQo'riqchi</span>
              <span className="text-[9px] bg-[#88cc14]/20 text-[#88cc14] px-1 rounded font-mono font-bold">APP</span>
            </h4>
            <p className="text-[11px] text-[#94a3b8] truncate">
              {language === 'ru'
                ? 'Установить на телефон'
                : language === 'en'
                ? 'Install on your phone'
                : 'Telefonga ilovani o\'rnatish'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={installApp}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#88cc14] to-[#6db810] text-[#0d151c] text-xs font-black uppercase tracking-wide shadow-[0_0_12px_rgba(136,204,20,0.35)] hover:shadow-[0_0_16px_rgba(136,204,20,0.5)] transition-all"
          >
            <i className="fa-solid fa-download text-[11px]"></i>
            <span>{language === 'ru' ? 'Установить' : language === 'en' ? 'Install' : "O'rnatish"}</span>
          </button>
          <button
            type="button"
            onClick={dismissBanner}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#64748b] hover:text-white hover:bg-[#1a2535] transition-colors"
            aria-label="Yopish"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
