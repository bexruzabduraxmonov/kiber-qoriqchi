import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { roomsData } from '../data/roomsData';

export const MobileBottomNav = ({ currentPage, onNavigate, onSelectRoom }) => {
  const { language } = useLanguage();
  const { isLoggedIn } = useUser();
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Bookmarks State
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cybershield_bookmarked_rooms') || '[]');
    } catch {
      return [];
    }
  });

  const toggleBookmark = (roomId, e) => {
    if (e) e.stopPropagation();
    setBookmarks(prev => {
      const next = prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId];
      localStorage.setItem('cybershield_bookmarked_rooms', JSON.stringify(next));
      return next;
    });
  };

  // Convert rooms object to array
  const allRooms = useMemo(() => Object.values(roomsData), []);

  // Filtered rooms for search
  const filteredRooms = useMemo(() => {
    return allRooms.filter(room => {
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        room.title.toLowerCase().includes(q) ||
        room.category.toLowerCase().includes(q) ||
        (room.tags && room.tags.some(t => t.toLowerCase().includes(q)));
      const matchCat =
        selectedCategory === 'All' ||
        room.category.toLowerCase() === selectedCategory.toLowerCase();
      return matchQuery && matchCat;
    });
  }, [allRooms, searchQuery, selectedCategory]);

  // Saved rooms
  const savedRoomsList = useMemo(() => {
    return allRooms.filter(room => bookmarks.includes(room.id));
  }, [allRooms, bookmarks]);

  // Tab definitions
  const tabs = [
    {
      id: 'home',
      label: language === 'ru' ? 'Главная' : language === 'en' ? 'Home' : 'Bosh sahifa',
      icon: 'fa-solid fa-house',
      isActive: currentPage === 'home' && !showSearchModal && !showSavedModal,
      onClick: () => {
        setShowSearchModal(false);
        setShowSavedModal(false);
        onNavigate('home');
      }
    },
    {
      id: 'categories',
      label: language === 'ru' ? 'Категории' : language === 'en' ? 'Categories' : 'Kategoriyalar',
      icon: 'fa-solid fa-table-cells-large',
      isActive: currentPage === 'paths' && !showSearchModal && !showSavedModal,
      onClick: () => {
        setShowSearchModal(false);
        setShowSavedModal(false);
        onNavigate('paths');
      }
    },
    {
      id: 'search',
      label: language === 'ru' ? 'Поиск' : language === 'en' ? 'Search' : 'Qidiruv',
      icon: 'fa-solid fa-magnifying-glass',
      isActive: showSearchModal,
      onClick: () => {
        setShowSavedModal(false);
        setShowSearchModal(true);
      }
    },
    {
      id: 'saved',
      label: language === 'ru' ? 'Сохранённые' : language === 'en' ? 'Saved' : 'Saqlanganlar',
      icon: 'fa-solid fa-bookmark',
      badge: bookmarks.length > 0 ? bookmarks.length : null,
      isActive: showSavedModal,
      onClick: () => {
        setShowSearchModal(false);
        setShowSavedModal(true);
      }
    },
    {
      id: 'profile',
      label: language === 'ru' ? 'Профиль' : language === 'en' ? 'Profile' : 'Profil',
      icon: 'fa-solid fa-user',
      isActive: (currentPage === 'dashboard' || currentPage === 'login') && !showSearchModal && !showSavedModal,
      onClick: () => {
        setShowSearchModal(false);
        setShowSavedModal(false);
        onNavigate(isLoggedIn ? 'dashboard' : 'login');
      }
    }
  ];

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobil pastki navigatsiya"
        className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#0a1118]/95 backdrop-blur-md border-t border-[#1e2d3d] shadow-[0_-8px_30px_rgba(0,0,0,0.7)] px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      >
        <div className="flex items-center justify-around max-w-lg mx-auto">
          {tabs.map((tab) => {
            const active = tab.isActive;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={tab.onClick}
                className="relative flex flex-col items-center justify-center flex-1 py-1 focus:outline-none transition-colors group select-none"
              >
                {/* Icon wrapper */}
                <div className="relative flex items-center justify-center h-6">
                  <i 
                    className={`${tab.icon} text-[1.15rem] transition-transform duration-150 ${
                      active ? 'text-[#88cc14] scale-110 drop-shadow-[0_0_8px_rgba(136,204,20,0.5)]' : 'text-[#8492a6] group-hover:text-white'
                    }`}
                  />
                  {tab.badge && (
                    <span className="absolute -top-1 -right-2 flex h-3.5 min-w-[14px] items-center justify-center rounded-full bg-[#88cc14] px-1 text-[9px] font-black text-[#0d151c]">
                      {tab.badge}
                    </span>
                  )}
                </div>

                {/* Label */}
                <span 
                  className={`mt-1 text-[10.5px] tracking-tight leading-none transition-colors font-medium truncate max-w-[64px] ${
                    active ? 'text-[#88cc14] font-bold' : 'text-[#8492a6]'
                  }`}
                >
                  {tab.label}
                </span>

                {/* Underline Indicator (matches Netflix / Mobile App signature bar) */}
                <span 
                  className={`h-[2.5px] rounded-full transition-all duration-200 mt-1 ${
                    active 
                      ? 'w-7 bg-[#88cc14] opacity-100 shadow-[0_0_6px_rgba(136,204,20,0.8)]' 
                      : 'w-0 bg-transparent opacity-0'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* QUICK SEARCH MODAL */}
      {showSearchModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0b131c] text-white lg:hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-[#1f2f3f] bg-[#0e1924]">
            <div className="relative flex-1">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-[#64748b]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  language === 'ru' 
                    ? 'Поиск миссий, тем и лабораторий...' 
                    : language === 'en'
                    ? 'Search rooms, topics, labs...'
                    : 'Missiya, mavzu yoki laboratoriyani qidirish...'
                }
                className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-[#142230] border border-[#233547] text-sm text-white placeholder-[#64748b] focus:outline-none focus:border-[#88cc14]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white p-1"
                >
                  <i className="fa-solid fa-circle-xmark text-sm" />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSearchModal(false)}
              className="px-3 py-2 text-xs font-semibold text-[#88cc14] hover:underline shrink-0"
            >
              {language === 'ru' ? 'Отмена' : language === 'en' ? 'Cancel' : 'Yopish'}
            </button>
          </div>

          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto border-b border-[#1a2938] bg-[#0b131c] no-scrollbar">
            {['All', 'Web', 'Linux', 'Windows', 'CTF'].map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#88cc14] text-[#0d151c] font-bold shadow-[0_0_10px_rgba(136,204,20,0.3)]'
                    : 'bg-[#152332] text-[#94a3b8] hover:bg-[#1e2f42]'
                }`}
              >
                {cat === 'All' ? (language === 'ru' ? 'Все' : language === 'en' ? 'All' : 'Hammasi') : cat}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 pb-24">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#64748b] mb-1">
              {filteredRooms.length} {language === 'ru' ? 'результатов' : language === 'en' ? 'results' : 'ta natija'}
            </div>

            {filteredRooms.length > 0 ? (
              filteredRooms.map(room => {
                const isBookmarked = bookmarks.includes(room.id);
                return (
                  <div
                    key={room.id}
                    onClick={() => {
                      setShowSearchModal(false);
                      onSelectRoom(room.id);
                    }}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-[#121d28] border border-[#203243] hover:border-[#88cc14]/50 active:bg-[#182635] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b131c] border border-[#24374a] text-[#88cc14]">
                        <i className={`fa-solid ${room.icon || 'fa-globe'} text-base`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white truncate">{room.title}</h4>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                            room.diff === 'Easy' ? 'bg-[#88cc14]/20 text-[#88cc14]' :
                            room.diff === 'Medium' ? 'bg-[#f59e0b]/20 text-[#f59e0b]' :
                            'bg-[#ef4444]/20 text-[#ef4444]'
                          }`}>
                            {room.diff}
                          </span>
                        </div>
                        <p className="text-xs text-[#8492a6] truncate flex items-center gap-2 mt-0.5">
                          <span>{room.category}</span>
                          <span>•</span>
                          <span>{room.duration || '30 daq'}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(room.id, e)}
                      className={`p-2 rounded-lg transition-colors ${
                        isBookmarked ? 'text-[#88cc14]' : 'text-[#506073] hover:text-[#94a3b8]'
                      }`}
                      aria-label="Bookmark"
                    >
                      <i className={`fa-solid fa-bookmark text-sm`} />
                    </button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-[#64748b] space-y-2">
                <i className="fa-solid fa-magnifying-glass text-3xl mb-2 block opacity-40" />
                <p className="text-sm">Hech qanday laboratoriya topilmadi</p>
                <p className="text-xs">Boshqa so'z bilan qidirib ko'ring</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SAVED (SAQLANGANLAR) MODAL */}
      {showSavedModal && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0b131c] text-white lg:hidden animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1f2f3f] bg-[#0e1924]">
            <div className="flex items-center gap-2.5">
              <i className="fa-solid fa-bookmark text-[#88cc14] text-base" />
              <h3 className="font-bold text-base">
                {language === 'ru' ? 'Сохранённые миссии' : language === 'en' ? 'Saved Missions' : 'Saqlangan missiyalar'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowSavedModal(false)}
              className="p-1.5 text-[#94a3b8] hover:text-white rounded-lg"
              aria-label="Yopish"
            >
              <i className="fa-solid fa-xmark text-lg" />
            </button>
          </div>

          {/* Saved Items Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
            {savedRoomsList.length > 0 ? (
              savedRoomsList.map(room => (
                <div
                  key={room.id}
                  onClick={() => {
                    setShowSavedModal(false);
                    onSelectRoom(room.id);
                  }}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#121d28] border border-[#203243] hover:border-[#88cc14]/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0b131c] border border-[#24374a] text-[#88cc14]">
                      <i className={`fa-solid ${room.icon || 'fa-globe'} text-base`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">{room.title}</h4>
                      <p className="text-xs text-[#8492a6] truncate mt-0.5">
                        {room.category} • {room.diff} • {room.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#88cc14] bg-[#88cc14]/15 px-2.5 py-1 rounded-lg">
                      {language === 'ru' ? 'Начать' : language === 'en' ? 'Start' : 'Kirish'}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(room.id, e)}
                      className="p-2 text-[#ef4444] hover:bg-[#ef4444]/15 rounded-lg transition-colors"
                      title="O'chirish"
                    >
                      <i className="fa-solid fa-trash-can text-xs" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-4 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#142230] border border-[#233547] flex items-center justify-center text-[#64748b] text-2xl">
                  <i className="fa-regular fa-bookmark" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white">
                    {language === 'ru' ? 'У вас пока нет сохранённых' : 'Hozircha saqlangan missiyalar yo\'q'}
                  </h4>
                  <p className="text-xs text-[#8492a6] max-w-xs mx-auto">
                    {language === 'ru' 
                      ? 'Используйте поиск или раздел лабораторий, чтобы сохранить интересные миссии' 
                      : 'Laboratoriyalar yoki Qidiruv orqali o\'zingizga yoqqan missiyalarni saqlab qo\'yishingiz mumkin.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowSavedModal(false);
                    onNavigate('practice');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#88cc14] text-[#0d151c] text-xs font-black uppercase tracking-wider shadow-[0_0_15px_rgba(136,204,20,0.3)] transition-all"
                >
                  {language === 'ru' ? 'Открыть лаборатории' : 'Laboratoriyalarga o\'tish'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
