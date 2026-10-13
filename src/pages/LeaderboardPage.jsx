import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { initialLeaderboard } from '../data/leaderboardData';

export const LeaderboardPage = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { isLoggedIn, userName, userHandle, userXp } = useUser();
  const [timeFilter, setTimeFilter] = useState('all');
  const [board, setBoard] = useState([]);

  // Load real registered players
  useEffect(() => {
    let players = [];
    try {
      const stored = localStorage.getItem('cybershield_registered_players');
      if (stored) {
        players = JSON.parse(stored);
      }
    } catch {
      players = [];
    }

    // If current logged-in user exists, ensure they are in the list with active XP
    if (isLoggedIn && userName) {
      const existingIdx = players.findIndex(
        p => p.name.toLowerCase() === userName.toLowerCase()
      );

      const currentPlayer = {
        id: 'me',
        name: userName,
        handle: userHandle || userName.toLowerCase().replace(/\s+/g, '_'),
        flag: '🇺🇿',
        score: userXp || 0,
        letter: userName.charAt(0).toUpperCase(),
        isCurrentUser: true,
      };

      if (existingIdx !== -1) {
        players[existingIdx] = {
          ...players[existingIdx],
          ...currentPlayer,
          score: userXp || players[existingIdx].score || 0,
        };
      } else {
        players.push(currentPlayer);
      }
    }

    // Sort descending by score / XP
    players.sort((a, b) => (b.score || 0) - (a.score || 0));

    // Assign ranking
    const ranked = players.map((p, idx) => ({
      ...p,
      rank: idx + 1,
    }));

    setBoard(ranked);
  }, [isLoggedIn, userName, userHandle, userXp]);

  const rankDisplay = (rank) => {
    if (rank === 1) return { icon: 'fa-trophy', color: '#FFD700', glow: 'rgba(255,215,0,0.35)', bg: 'rgba(255,215,0,0.06)' };
    if (rank === 2) return { icon: 'fa-medal', color: '#C0C0C0', glow: 'rgba(192,192,192,0.25)', bg: 'rgba(192,192,192,0.05)' };
    if (rank === 3) return { icon: 'fa-medal', color: '#CD7F32', glow: 'rgba(205,127,50,0.25)', bg: 'rgba(205,127,50,0.05)' };
    return null;
  };

  return (
    <div className="min-h-screen bg-[#070f17] text-[#e2ecf5] pb-24 animate-fadeIn">
      {/* ─── Header Section ─── */}
      <div className="border-b border-[#1b2b3a] bg-gradient-to-b from-[#0e1925] via-[#09141f] to-[#070f17] px-4 py-12 sm:px-6 text-center relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full bg-[#f59e0b]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-[#88cc14]/10 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-4 py-1.5 mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <i className="fa-solid fa-ranking-star text-[#f59e0b] text-xs" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
              {language === 'uz' ? 'Jonli Reyting' : language === 'ru' ? 'Живой Рейтинг' : 'Live Leaderboard'}
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
            {t('nav_leaderboard')}
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-[#94a3b8] leading-relaxed">
            {language === 'uz'
              ? "Kiberxavfsizlik bo'yicha eng ilg'or mutaxassislar va o'quvchilar ro'yxati. Real natijalar va to'plangan XP ballari."
              : language === 'ru'
              ? "Список лучших специалистов и учащихся по кибербезопасности. Реальные результаты и заработанные очки XP."
              : "Top cybersecurity defenders and students ranked by completed practical rooms and XP."}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-10">
        {/* ─── Time Filter Tabs ─── */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t('time_all') },
            { id: 'month', label: t('time_month') },
            { id: 'week', label: t('time_week') },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setTimeFilter(f.id)}
              className={`rounded-xl px-4 py-2 font-mono text-xs font-bold transition-all ${
                timeFilter === f.id
                  ? 'border border-[#88cc14] bg-[#88cc14]/15 text-[#88cc14] shadow-[0_0_15px_rgba(136,204,20,0.2)]'
                  : 'border border-[#1d2d3e] bg-[#0c1622] text-[#8ca0b3] hover:border-[#2d4763] hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ─── Empty State: When Nobody Has Registered Yet ─── */}
        {board.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-[#23384d] bg-gradient-to-b from-[#0c1824] via-[#0a131d] to-[#070f17] p-8 sm:p-14 text-center shadow-2xl">
            {/* Ambient Background Circles */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[#f59e0b]/10 blur-3xl" />

            {/* Empty Podium Showcase */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto mb-10 items-end">
              {/* 2nd Place Placeholder */}
              <div className="rounded-2xl border border-dashed border-[#2d455d] bg-[#0d1822]/60 p-4 text-center">
                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#cbd5e1]/40 bg-[#cbd5e1]/10 text-xl text-[#cbd5e1] mb-2">
                  <i className="fa-solid fa-medal" />
                </div>
                <div className="font-heading text-xs font-bold text-white">2-o'rin</div>
                <div className="font-mono text-[10px] text-[#64748b] mt-1">
                  {language === 'uz' ? "Bo'sh" : language === 'ru' ? "Свободно" : "Open"}
                </div>
              </div>

              {/* 1st Place Placeholder (Champion) */}
              <div className="rounded-2xl border border-dashed border-[#facc15]/50 bg-[#162016]/60 p-5 text-center -translate-y-3 shadow-[0_0_20px_rgba(250,204,21,0.08)]">
                <div className="mx-auto flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border-2 border-[#facc15] bg-[#facc15]/15 text-2xl sm:text-3xl text-[#facc15] mb-2 shadow-[0_0_20px_rgba(250,204,21,0.25)] animate-pulse">
                  <i className="fa-solid fa-trophy" />
                </div>
                <div className="font-heading text-sm font-extrabold text-[#facc15]">1-o'rin</div>
                <div className="font-mono text-[10px] font-bold text-[#88cc14] mt-1">
                  {language === 'uz' ? "Siz bo'ling!" : language === 'ru' ? "Будьте первым!" : "Be #1!"}
                </div>
              </div>

              {/* 3rd Place Placeholder */}
              <div className="rounded-2xl border border-dashed border-[#2d455d] bg-[#0d1822]/60 p-4 text-center">
                <div className="mx-auto flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border border-[#cd7f32]/40 bg-[#cd7f32]/10 text-xl text-[#cd7f32] mb-2">
                  <i className="fa-solid fa-medal" />
                </div>
                <div className="font-heading text-xs font-bold text-white">3-o'rin</div>
                <div className="font-mono text-[10px] text-[#64748b] mt-1">
                  {language === 'uz' ? "Bo'sh" : language === 'ru' ? "Свободно" : "Open"}
                </div>
              </div>
            </div>

            {/* Main Empty Description */}
            <div className="max-w-xl mx-auto">
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-3">
                {language === 'uz'
                  ? "Hali hech kim ro'yxatdan o'tmagan"
                  : language === 'ru'
                  ? "Пока никто не зарегистрировался"
                  : "No participants registered yet"}
              </h2>

              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-8">
                {language === 'uz'
                  ? "Reyting jadvali yangi mavsum uchun ochildi! Birinchi bo'lib ro'yxatdan o'ting, laboratoriyalardagi kiber vazifalarni bajaring va 1-o'rinni zabt eting!"
                  : language === 'ru'
                  ? "Таблица лидеров открыта для нового сезона! Зарегистрируйтесь первым, решайте практические задания и займите 1-е место!"
                  : "The leaderboard is fresh for the new season! Be the very first to register, complete interactive lab challenges, and secure the #1 rank!"}
              </p>

              {/* Call to action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('login', 'signup')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#88cc14] to-[#a3e635] px-6 py-3 font-heading text-sm font-bold text-black shadow-[0_0_20px_rgba(136,204,20,0.35)] transition-all hover:brightness-110 active:scale-95"
                >
                  <i className="fa-solid fa-trophy text-xs" />
                  <span>
                    {language === 'uz'
                      ? "1-o'rin uchun ro'yxatdan o'tish"
                      : language === 'ru'
                      ? "Зарегистрироваться на 1-е место"
                      : "Register to Claim #1"}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('practice')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-[#2d455d] bg-[#0c1824] px-6 py-3 font-mono text-xs font-bold text-[#e2ecf5] transition-all hover:border-[#88cc14] hover:text-[#88cc14]"
                >
                  <i className="fa-solid fa-terminal text-xs" />
                  <span>
                    {language === 'uz'
                      ? "Laboratoriyalarni boshlash"
                      : language === 'ru'
                      ? "Начать лаборатории"
                      : "Explore Practice Labs"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ─── Populated Leaderboard State ─── */
          <>
            {/* Top 3 Podium (Only for available players) */}
            {board.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end mb-10">
                {board.slice(0, 3).map((item) => {
                  const rd = rankDisplay(item.rank);
                  const isChampion = item.rank === 1;

                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-2xl border text-center p-6 transition-all ${
                        isChampion
                          ? 'border-[#facc15]/60 bg-gradient-to-b from-[#1c2214] to-[#0c1622] shadow-[0_0_30px_rgba(250,204,21,0.15)] md:-translate-y-3'
                          : 'border-[#1e2f41] bg-[#0c1622]'
                      }`}
                    >
                      {item.isCurrentUser && (
                        <div className="absolute top-3 right-3 rounded-full bg-[#88cc14]/20 border border-[#88cc14]/40 px-2 py-0.5 font-mono text-[9px] font-bold text-[#88cc14]">
                          {language === 'uz' ? 'SIZ' : 'YOU'}
                        </div>
                      )}

                      <div className="flex justify-center mb-3">
                        <div
                          className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 bg-[#08121a] text-3xl font-extrabold font-heading"
                          style={{
                            borderColor: rd?.color || '#2d455d',
                            color: rd?.color || '#88cc14',
                            boxShadow: rd ? `0 0 20px ${rd.glow}` : 'none',
                          }}
                        >
                          {item.letter || item.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="mb-2 flex justify-center text-xl" style={{ color: rd?.color }}>
                        <i className={`fa-solid ${rd?.icon}`} />
                      </div>

                      <div className="font-heading text-lg font-bold text-white truncate px-2">
                        {item.name}
                      </div>
                      <div className="font-mono text-xs text-[#8ca0b3] mt-0.5">
                        @{item.handle || item.name}
                      </div>

                      <div className="mt-4 font-mono text-2xl font-black" style={{ color: rd?.color || '#0ea5e9' }}>
                        {(item.score || 0).toLocaleString()} <span className="text-xs text-[#8ca0b3]">XP</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Leaderboard Table */}
            <div className="overflow-hidden rounded-2xl border border-[#1d2d3e] bg-[#0c1622] shadow-xl">
              <div className="grid grid-cols-12 px-6 py-3.5 bg-[#09121a] border-b border-[#1d2d3e] font-mono text-xs font-bold text-[#8ca0b3] uppercase tracking-wider">
                <div className="col-span-2 sm:col-span-1">#</div>
                <div className="col-span-7 sm:col-span-8">{t('tbl_user')}</div>
                <div className="col-span-3 text-right">{t('tbl_score')}</div>
              </div>

              <div className="divide-y divide-[#172533]">
                {board.map((item) => {
                  const rd = rankDisplay(item.rank);

                  return (
                    <div
                      key={item.id}
                      className={`grid grid-cols-12 px-6 py-4 items-center transition-colors hover:bg-[#112030] ${
                        item.isCurrentUser ? 'bg-[#88cc14]/5' : ''
                      }`}
                    >
                      {/* Rank Column */}
                      <div className="col-span-2 sm:col-span-1 flex items-center">
                        {rd ? (
                          <span className="flex items-center gap-1.5 font-bold font-mono text-sm" style={{ color: rd.color }}>
                            <i className={`fa-solid ${rd.icon} text-xs`} />
                            {item.rank}
                          </span>
                        ) : (
                          <span className="font-mono font-bold text-sm text-[#8ca0b3]">
                            #{item.rank}
                          </span>
                        )}
                      </div>

                      {/* User Column */}
                      <div className="col-span-7 sm:col-span-8 flex items-center gap-3 min-w-0">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border bg-[#08121a] font-bold text-sm font-heading"
                          style={{ borderColor: rd?.color || '#23384d', color: rd?.color || '#88cc14' }}
                        >
                          {item.letter || item.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-heading text-sm font-bold text-white truncate">
                              {item.name}
                            </span>
                            {item.isCurrentUser && (
                              <span className="rounded bg-[#88cc14]/20 border border-[#88cc14]/40 px-1.5 py-0.2 font-mono text-[9px] font-bold text-[#88cc14]">
                                SIZ
                              </span>
                            )}
                          </div>
                          <span className="font-mono text-xs text-[#8ca0b3]">
                            @{item.handle || item.name}
                          </span>
                        </div>
                      </div>

                      {/* Score Column */}
                      <div className="col-span-3 flex items-center justify-end font-mono">
                        <span className="text-base font-bold text-[#38bdf8]">
                          {(item.score || 0).toLocaleString()} <span className="text-xs text-[#8ca0b3]">XP</span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
