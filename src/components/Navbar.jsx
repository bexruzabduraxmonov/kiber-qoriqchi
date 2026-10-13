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
        className={`absolute inset-y-0 right-0 flex h-dvh w-[88vw] max-w-[360px] flex-col border-l border-[#1a2d39] bg-[#071d28] text-white shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ${
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
    <header className="site-header sticky top-0 z-40 w-full shadow-md bg-[#1a232c] border-b border-[#2d3d4f]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4" aria-label="Main navigation">
        {/* Logo */}
        <Logo
          size="md"
          onClick={() => handleNav('home')}
          className="focus:outline-none"
        />

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button
            type="button"
            onClick={() => handleNav('home')}
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
          >
            {t('nav_home')}
          </button>
          <button
            type="button"
            onClick={() => handleNav('paths')}
            className={`nav-link ${currentPage === 'paths' ? 'active' : ''}`}
          >
            {t('nav_paths')}
          </button>
          <button
            type="button"
            onClick={() => handleNav('practice')}
            className={`nav-link ${currentPage === 'practice' || currentPage === 'lab_room' ? 'active' : ''}`}
          >
            {t('nav_practice')}
          </button>
          <button
            type="button"
            onClick={() => handleNav('leaderboard')}
            className={`nav-link ${currentPage === 'leaderboard' ? 'active' : ''}`}
          >
            {t('nav_leaderboard')}
          </button>

          {/* More Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              onMouseEnter={() => setDropdownOpen(true)}
              className={`nav-link flex items-center gap-1.5 ${['security', 'casestudy', 'partnerships', 'pitch', 'apk_qoriqchi'].includes(currentPage) ? 'active' : ''}`}
            >
              <span>{t('nav_more')}</span>
              <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}></i>
            </button>

            {dropdownOpen && (
              <ul 
                onMouseLeave={() => setDropdownOpen(false)}
                className="absolute left-0 top-full mt-2 w-52 rounded-md bg-[#1a232c] border border-[#2d3d4f] shadow-2xl p-2 z-50 space-y-1 animate-fadeIn"
              >
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('security')}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#94a3b8] hover:bg-[#24303c] hover:text-[#0ea5e9] transition-colors"
                  >
                    {t('nav_security')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('casestudy')}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#94a3b8] hover:bg-[#24303c] hover:text-[#0ea5e9] transition-colors"
                  >
                    {t('nav_casestudy')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('partnerships')}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#94a3b8] hover:bg-[#24303c] hover:text-[#0ea5e9] transition-colors"
                  >
                    {t('nav_partners')}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('pitch')}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition-colors border ${
                      currentPage === 'pitch'
                        ? 'border-[#8ef2d6]/40 bg-[#10242d] text-[#8ef2d6]'
                        : 'border-[#2d4d4f] bg-gradient-to-r from-[#112a2f] to-[#0f2f29] text-[#bfffe5] hover:bg-[#24303c]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <i className="fa-solid fa-robot text-[11px] text-[#8ef2d6]" />
                      <span>CyberGuard AI</span>
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNav('apk_qoriqchi')}
                    className="w-full text-left px-3 py-2 rounded text-sm text-[#94a3b8] hover:bg-[#24303c] hover:text-[#88cc14] transition-colors flex items-center justify-between"
                  >
                    <span>APK Qo'riqchi</span>
                    <span className="text-[10px] bg-[#88cc14]/20 text-[#88cc14] px-1.5 py-0.5 rounded font-mono font-bold">PRO</span>
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="h-5 w-px bg-[#2d3d4f]"></div>

          {/* Language Switcher */}
          <div className="lang-switch flex gap-1 font-mono text-xs">
            {['uz', 'ru', 'en'].map(l => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                className={`px-2 py-1 rounded transition-colors uppercase ${language === l ? 'bg-[#24303c] text-white font-bold border border-[#2d3d4f]' : 'text-[#94a3b8] hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Action buttons with THM Streak & XP */}
          <div className="flex items-center gap-2.5">
            {isLoggedIn ? (
              <>
                {/* Streak & XP pill */}
                <button
                  type="button"
                  onClick={() => handleNav('dashboard')}
                  title="Sizning yutuqlaringiz"
                  className="flex items-center gap-2 bg-[#0d151c] border border-[#2d3d4f] hover:border-[#88cc14] rounded-md px-2.5 py-1.5 font-mono text-xs transition-colors"
                >
                  <span className="flex items-center gap-1 text-[#f59e0b]">
                    <i className="fa-solid fa-fire"></i>
                    <span className="font-bold">{streak}</span>
                  </span>
                  <span className="text-[#2d3d4f]">|</span>
                  <span className="flex items-center gap-1 text-[#88cc14]">
                    <i className="fa-solid fa-star text-[10px]"></i>
                    <span className="font-bold">{userXp} XP</span>
                  </span>
                </button>

                {/* Profile Pill */}
                <button
                  type="button"
                  onClick={() => handleNav('dashboard')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md font-mono text-xs transition-all border ${
                    currentPage === 'dashboard'
                      ? 'bg-[#88cc14]/15 border-[#88cc14] text-[#88cc14]'
                      : 'bg-[#24303c] border-[#2d3d4f] text-white hover:border-[#88cc14]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] text-black font-bold text-[10px] flex items-center justify-center">
                    {userName ? userName.charAt(0).toUpperCase() : 'U'}
                  </span>
                  <span className="font-bold hidden xl:inline">{userName}</span>
                </button>

                {/* Logout button */}
                <button
                  type="button"
                  onClick={() => { logout(); handleNav('home'); }}
                  title={language === 'uz' ? 'Chiqish' : language === 'ru' ? 'Выйти' : 'Logout'}
                  className="btn-outline text-xs py-1.5 px-2.5 border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444] hover:text-white transition-all font-mono"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleNav('dashboard')}
                  className={`btn-outline text-xs py-1.5 px-3 border-[#2d3d4f] text-[#94a3b8] hover:text-white hover:border-[#0ea5e9] transition-all font-mono ${
                    currentPage === 'dashboard' ? 'border-[#0ea5e9] text-[#0ea5e9]' : ''
                  }`}
                >
                  {t('nav_dashboard')}
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('login', 'login')}
                  className="btn-outline text-xs py-1.5 px-3 border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-black transition-all font-mono"
                >
                  {t('nav_login')}
                </button>

                <button
                  type="button"
                  onClick={() => handleNav('login', 'signup')}
                  className="btn-primary text-xs py-1.5 px-3.5 bg-[#88cc14] text-[#0d151c] hover:bg-[#75b310] font-bold glow-green"
                >
                  {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? 'Регистрация' : 'Sign Up'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger Button */}
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
