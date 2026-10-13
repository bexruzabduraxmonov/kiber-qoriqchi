import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { Logo } from './Logo';

export const Navbar = ({ currentPage, onNavigate }) => {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, userName, streak, userXp, logout } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNav = (page, extra = null) => {
    onNavigate(page, extra);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[200] lg:hidden ${mobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!mobileMenuOpen}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-[#020d15]/95 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Close menu"
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`absolute inset-y-0 right-0 flex h-dvh w-full max-w-[420px] flex-col border-l border-[#1a2d39] bg-[#071d28] text-white shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-[#223548] bg-[#0d1a24] px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[#2c4b5c] bg-[#0e2420]">
              <i className="fa-solid fa-shield-halved text-[13px] text-[#8ef2d6]"></i>
            </div>
            <div className="text-[1rem] font-black tracking-[-0.04em] text-white">
              Kiber <span className="text-[#8ef2d6]">Qo'riqchi</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-white"
            aria-label="Close menu"
          >
            <i className="fa-solid fa-xmark text-2xl"></i>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto bg-[#071d28] px-4 py-4">
          <div className="flex flex-col gap-2">
            {[
              { label: t('nav_home'), page: 'home' },
              { label: t('nav_paths'), page: 'paths' },
              { label: t('nav_practice'), page: 'practice' },
              { label: t('nav_leaderboard'), page: 'leaderboard' },
              { label: t('nav_security'), page: 'security' },
              { label: t('nav_casestudy'), page: 'casestudy' },
              { label: t('nav_partners'), page: 'partnerships' },
              { label: 'CyberGuard AI', page: 'pitch', ai: true },
              { label: "APK Qo'riqchi", page: 'apk_qoriqchi', pro: true }
            ].map(item => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNav(item.page)}
                className={`flex items-center justify-between rounded-md border px-3 py-3 text-left text-[1.02rem] font-medium transition-colors ${
                  currentPage === item.page
                    ? 'border-[#1d3c4a] bg-[#10242d] text-[#8ef2d6]'
                    : item.ai
                    ? 'border-[#2d4d4f] bg-gradient-to-r from-[#102a2d] to-[#112f2a] text-[#a8f9d7] hover:border-[#8ef2d6]'
                    : 'border-[#1a2d39] bg-[#0d1a24] text-white hover:bg-[#10242d]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.ai && <i className="fa-solid fa-robot text-[0.8rem] text-[#8ef2d6]" />}
                  <span>{item.label}</span>
                </span>
                {item.pro && <span className="rounded bg-[#8ef2d6]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8ef2d6]">PRO</span>}
                {item.ai && !item.pro && <span className="rounded bg-[#8ef2d6]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#8ef2d6]">AI</span>}
              </button>
            ))}
          </div>

          <div className="mt-6 border-t border-[#223548] pt-5">
            <div className="mb-4 flex gap-2">
              {['uz', 'ru', 'en'].map(l => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLanguage(l)}
                  className={`flex-1 rounded-md border py-2 text-center text-[0.8rem] font-bold uppercase ${language === l ? 'border-[#8ef2d6] bg-[#8ef2d6] text-[#071821]' : 'border-[#223548] bg-transparent text-[#cfe1ee]'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleNav('dashboard')}
                    className="rounded-lg border border-[#2c4b5c] bg-[#0d1a24] px-3 py-3 text-left text-white"
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8ef2d6] text-[11px] font-black text-[#071821]">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </span>
                      <span className="font-semibold">{userName}</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { logout(); handleNav('home'); }}
                    className="rounded-lg border border-[#d24a4a]/30 bg-[#2b1717] px-3 py-3 text-left text-[#f7b1b1]"
                  >
                    {language === 'uz' ? 'Chiqish' : language === 'ru' ? 'Выйти' : 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => handleNav('dashboard')}
                    className="rounded-lg border border-[#223548] bg-[#0d1a24] px-3 py-3 text-left text-[#dfeaf5]"
                  >
                    {t('nav_dashboard')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('login', 'login')}
                    className="rounded-lg border border-[#8ef2d6]/40 bg-[#0d1a24] px-3 py-3 text-left text-[#8ef2d6]"
                  >
                    {t('nav_login')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNav('login', 'signup')}
                    className="rounded-lg bg-[#8ef2d6] px-3 py-3 text-center font-black uppercase tracking-[0.14em] text-[#071821]"
                  >
                    {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? 'Регистрация' : 'Sign Up'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
    <header className="site-header sticky top-0 z-40 w-full border-b border-[#1d2b34] bg-[#071c2a] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
      <nav className="mx-auto flex max-w-[1800px] items-center justify-between px-4 py-1.5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <div
          className="flex cursor-pointer items-center gap-2.5 focus:outline-none"
          onClick={() => handleNav('home')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleNav('home');
            }
          }}
        >
          <div className="relative h-11 w-11 shrink-0">
            <div className="absolute inset-0 rounded-xl bg-[#9af7d7]/25 blur-lg" />
            <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-[#62f6c1]/60 bg-[#08141b] shadow-[0_0_16px_rgba(113,245,190,0.35)]">
              <i className="fa-solid fa-shield-halved text-[17px] text-[#8ef2d6]" />
            </div>
          </div>
          <div className="flex items-baseline text-[2.45rem] font-black leading-none tracking-[-0.07em] text-white">
            <span>Kiber</span>
            <span className="text-[#8ef2d6]">Qo'riqchi</span>
          </div>
        </div>

        <div className="hidden lg:flex items-start justify-end gap-12 xl:gap-16">
          <div className="flex flex-col gap-1.5 text-left">
            <div className="text-[10.5px] font-black uppercase tracking-[0.16em] text-[#edf4f8]">Ta'lim</div>
            <button type="button" onClick={() => handleNav('paths')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Yo'nalishlar</button>
            <button type="button" onClick={() => handleNav('practice')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Amaliyot</button>
            <button type="button" onClick={() => handleNav('leaderboard')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Reyting</button>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <div className="text-[10.5px] font-black uppercase tracking-[0.16em] text-[#edf4f8]">Kompaniya</div>
            <button type="button" onClick={() => handleNav('security')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Xavfsizlik</button>
            <button type="button" onClick={() => handleNav('casestudy')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Holat tahlillari</button>
            <button type="button" onClick={() => handleNav('partnerships')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Hamkorlik</button>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <div className="text-[10.5px] font-black uppercase tracking-[0.16em] text-[#edf4f8]">Akkount</div>
            <button type="button" onClick={() => handleNav('dashboard')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Profil</button>
            <button type="button" onClick={() => handleNav('login', 'login')} className="text-left text-[1rem] leading-[1.35] text-[#edf4f8] transition-colors hover:text-[#8ef2d6]">Kirish</button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-[#2d3d4f] bg-[#0d151c] p-0 text-white focus:outline-none"
          aria-label="Open menu"
        >
          <span className="flex flex-col items-center justify-center gap-[5px]">
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
            <span className="block h-0.5 w-5 rounded-full bg-white" />
          </span>
        </button>
      </nav>
    </header>
    {createPortal(mobileMenu, document.body)}
    </>
  );
};
