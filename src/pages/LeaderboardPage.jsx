import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { initialLeaderboard } from '../data/leaderboardData';

export const LeaderboardPage = () => {
  const { language, t } = useLanguage();
  const [timeFilter, setTimeFilter] = useState('week');
  const [board, setBoard] = useState(initialLeaderboard);

  const handleFilterChange = (filter) => {
    setTimeFilter(filter);
    setBoard(prev => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled.map((item, idx) => ({ ...item, rank: idx + 1 }));
    });
  };

  const rankDisplay = (rank) => {
    if (rank === 1) return { icon: 'fa-trophy',  color: '#FFD700', glow: 'rgba(255,215,0,0.3)',   bg: 'rgba(255,215,0,0.08)' };
    if (rank === 2) return { icon: 'fa-medal',   color: '#C0C0C0', glow: 'rgba(192,192,192,0.2)', bg: 'rgba(192,192,192,0.05)' };
    if (rank === 3) return { icon: 'fa-medal',   color: '#CD7F32', glow: 'rgba(205,127,50,0.2)',  bg: 'rgba(205,127,50,0.05)' };
    return null;
  };

  return (
    <div className="min-h-screen bg-[#0d151c] animate-fadeIn">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <header className="border-b border-[#2d3d4f] pt-12 pb-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/30 px-4 py-1.5 mb-5">
            <i className="fa-solid fa-ranking-star text-[#f59e0b] text-xs" />
            <span className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider font-mono">
              {language === 'uz' ? 'Eng yaxshilar' : language === 'ru' ? 'Лучшие' : 'Top Players'}
            </span>
          </div>
          <h1 className="text-[3.5rem] md:text-[6rem] font-black leading-none tracking-[-0.08em] text-white mb-4">
            {t('nav_leaderboard')}
          </h1>
          <p className="text-[#94a3b8] text-base md:text-lg max-w-[620px] mx-auto">{t('lead_sub')}</p>
        </header>
      </div>

      <div className="mx-auto max-w-[980px] px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-10">
          {board.slice(0, 3).map((item) => {
            const rd = rankDisplay(item.rank);
            const isChampion = item.rank === 1;
            const isSecond = item.rank === 2;
            const isThird = item.rank === 3;

            return (
              <div
                key={item.id}
                className={`relative rounded-[22px] border text-center p-5 transition-all ${
                  isChampion
                    ? 'border-[#facc15]/60 bg-[#facc15]/10 shadow-[0_0_30px_rgba(250,204,21,0.12)] md:-translate-y-2'
                    : isSecond
                    ? 'border-[#cbd5e1]/50 bg-[#1a232c]/90'
                    : 'border-[#f59e0b]/30 bg-[#1a232c]/90'
                }`}
                style={{
                  background: isChampion ? 'rgba(250, 204, 21, 0.08)' : undefined,
                  minHeight: isChampion ? 260 : 220,
                }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className="w-24 h-24 rounded-full border-[3px] bg-[#0d151c] flex items-center justify-center text-4xl font-bold font-mono"
                    style={{
                      borderColor: rd?.color || '#dfe8f5',
                      color: rd?.color || '#e2e8f0',
                      boxShadow: rd ? `0 0 18px ${rd.glow}` : 'none'
                    }}
                  >
                    {item.letter}
                  </div>
                </div>

                <div className="mb-3 flex justify-center text-xl" style={{ color: rd?.color || '#e2e8f0' }}>
                  <i className={`fa-solid ${rd?.icon}`} />
                </div>

                <div className="text-xl font-bold text-white">{item.name}</div>
                <div className="text-xs text-[#94a3b8] font-mono mt-1">{item.flag}</div>
                <div className="mt-6 text-3xl font-bold font-mono" style={{ color: rd?.color || '#e2e8f0' }}>
                  {item.score.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mb-8">
          {[
            { id: 'week', label: t('time_week') },
            { id: 'month', label: t('time_month') },
            { id: 'all', label: t('time_all') },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => handleFilterChange(f.id)}
              className={`filter-btn ${timeFilter === f.id ? 'active' : ''}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-12 px-6 py-3 bg-[#24303c] border-b border-[#2d3d4f] text-xs font-mono font-bold text-[#94a3b8] uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-8">{t('tbl_user')}</div>
            <div className="col-span-3 text-right">{t('tbl_score')}</div>
          </div>

          {board.map((item, idx) => {
            const rd = rankDisplay(item.rank);
            return (
              <div
                key={item.id}
                className="grid grid-cols-12 px-6 py-4 border-b border-[#2d3d4f]/50 last:border-0 hover:bg-[#24303c]/60 transition-colors group animate-fadeIn"
                style={{ animationDelay: `${idx * 0.03}s`, background: rd?.bg }}
              >
                <div className="col-span-1 flex items-center">
                  {rd ? (
                    <span className="flex items-center gap-1.5 font-bold font-mono" style={{ color: rd.color }}>
                      <i className={`fa-solid ${rd.icon} text-sm`} />
                      {item.rank}
                    </span>
                  ) : (
                    <span className="font-mono text-[#94a3b8] font-bold">{item.rank}</span>
                  )}
                </div>

                <div className="col-span-8 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full bg-[#0d151c] border flex items-center justify-center font-bold text-sm font-mono shrink-0 transition-all group-hover:scale-110"
                    style={{ borderColor: rd?.color || '#2d3d4f', color: rd?.color || '#88cc14' }}
                  >
                    {item.letter}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-xs text-[#94a3b8] font-mono">{item.flag}</div>
                  </div>
                  {item.rank <= 10 && (
                    <span className="ml-2 text-[10px] font-mono text-[#88cc14] bg-[#88cc14]/10 border border-[#88cc14]/20 px-1.5 py-0.5 rounded hidden sm:inline">
                      TOP 10
                    </span>
                  )}
                </div>

                <div className="col-span-3 flex items-center justify-end">
                  <span className="font-mono font-bold text-[#0ea5e9] text-base">
                    {item.score.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
