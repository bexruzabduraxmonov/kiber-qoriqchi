import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export const Footer = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-[#22313d] bg-[#050d14] px-5 py-8 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 border-b border-[#22313d] pb-8 md:flex-row md:items-start">
          <div className="flex max-w-[560px] flex-col gap-4 text-center md:text-left">
            <Logo size="md" onClick={() => onNavigate('home')} />
            <p className="max-w-[520px] text-[13px] leading-relaxed text-[#9bb0bf]">
              {language === 'uz'
                ? "O'zbekistonda kiberxavfsizlikni virtual laboratoriyalar va amaliy CTF o'yinlari orqali o'rganish platformasi."
                : language === 'ru'
                ? "Платформа для изучения кибербезопасности через виртуальные лаборатории и практические CTF."
                : "Learn cybersecurity through interactive virtual labs and practical CTF challenges."}
            </p>
            <a
              href="https://cybershield.uz"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              className="group inline-flex items-center justify-center gap-2 self-center rounded-md border border-[#8ef2d6]/60 bg-[#0b141b] px-3 py-2 text-[15px] font-medium text-[#8ef2d6] transition-colors hover:border-[#8ef2d6] md:self-start"
            >
              <i className="fa-solid fa-globe text-[13px] transition-transform group-hover:rotate-12" />
              <span>https://cybershield.uz</span>
              <span className="h-2.5 w-2.5 rounded-full bg-[#8ef2d6] shadow-[0_0_10px_rgba(142,242,214,0.9)]" />
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
            <div>
              <h5 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfeaf4]">
                {language === 'uz' ? "Ta'lim" : language === 'ru' ? "Обучение" : "Learning"}
              </h5>
              <ul className="space-y-2 text-[15px] text-[#a8bdc9]">
                <li><button type="button" onClick={() => onNavigate('paths')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_paths')}</button></li>
                <li><button type="button" onClick={() => onNavigate('practice')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_practice')}</button></li>
                <li><button type="button" onClick={() => onNavigate('leaderboard')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_leaderboard')}</button></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfeaf4]">
                {language === 'uz' ? "Kompaniya" : language === 'ru' ? "Компания" : "Company"}
              </h5>
              <ul className="space-y-2 text-[15px] text-[#a8bdc9]">
                <li><button type="button" onClick={() => onNavigate('security')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_security')}</button></li>
                <li><button type="button" onClick={() => onNavigate('casestudy')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_casestudy')}</button></li>
                <li><button type="button" onClick={() => onNavigate('partnerships')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_partners')}</button></li>
              </ul>
            </div>

            <div>
              <h5 className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dfeaf4]">
                {language === 'uz' ? "Akkaunt" : language === 'ru' ? "Аккаунт" : "Account"}
              </h5>
              <ul className="space-y-2 text-[15px] text-[#a8bdc9]">
                <li><button type="button" onClick={() => onNavigate('dashboard')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_dashboard')}</button></li>
                <li><button type="button" onClick={() => onNavigate('login')} className="transition-colors hover:text-[#8ef2d6]">{t('nav_login')}</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-6 text-[12px] text-[#7d93a4] md:flex-row">
          <div>{t('footer_copy')}</div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-[#8ef2d6]">
              <i className="fa-solid fa-circle-check text-[10px]" />
              <span>SSL 256-bit Encrypted</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span>Toshkent, O‘zbekiston</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
