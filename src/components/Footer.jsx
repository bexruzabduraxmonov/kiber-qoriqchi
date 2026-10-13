import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export const Footer = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-[#0b1219] border-t border-[#2d3d4f] px-5 py-12 sm:px-8 mt-auto">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-[#2d3d4f]/60">
          {/* Brand & Domain */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3 max-w-sm">
            <Logo size="md" onClick={() => onNavigate('home')} />
            <p className="text-xs text-[#94a3b8] leading-relaxed mt-1">
              {language === 'uz'
                ? "O'zbekistonda kiberxavfsizlikni virtual laboratoriyalar va amaliy CTF o'yinlari orqali o'rganish platformasi."
                : language === 'ru'
                ? "Платформа для изучения кибербезопасности через виртуальные лаборатории и практические CTF."
                : "Learn cybersecurity through interactive virtual labs and practical CTF challenges."}
            </p>
            {/* Domain Link Badge */}
            <a
              href="https://cybershield.uz"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a232c] border border-[#88cc14]/30 text-xs font-mono text-[#88cc14] hover:border-[#88cc14] transition-all group"
            >
              <i className="fa-solid fa-globe text-xs group-hover:rotate-12 transition-transform" />
              <span>https://cybershield.uz</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#88cc14] animate-pulse" />
            </a>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm font-mono">
            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#0ea5e9]">
                {language === 'uz' ? "Ta'lim" : language === 'ru' ? "Обучение" : "Learning"}
              </h5>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <button type="button" onClick={() => onNavigate('paths')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_paths')}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('practice')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_practice')}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('leaderboard')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_leaderboard')}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#0ea5e9]">
                {language === 'uz' ? "Kompaniya" : language === 'ru' ? "Компания" : "Company"}
              </h5>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <button type="button" onClick={() => onNavigate('security')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_security')}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('casestudy')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_casestudy')}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('partnerships')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_partners')}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-3 text-[#0ea5e9]">
                {language === 'uz' ? "Akkaunt" : language === 'ru' ? "Аккаунт" : "Account"}
              </h5>
              <ul className="space-y-2 text-[#94a3b8]">
                <li>
                  <button type="button" onClick={() => onNavigate('dashboard')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_dashboard')}
                  </button>
                </li>
                <li>
                  <button type="button" onClick={() => onNavigate('login')} className="hover:text-[#88cc14] transition-colors">
                    {t('nav_login')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#64748b] text-xs font-mono">
          <div>{t('footer_copy')}</div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#88cc14]">
              <i className="fa-solid fa-circle-check text-[10px]" />
              <span>SSL 256-bit Encrypted</span>
            </span>
            <span>•</span>
            <span>Toshkent, O'zbekiston</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
