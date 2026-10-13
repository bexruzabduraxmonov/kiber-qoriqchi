import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { pathsData } from '../data/pathsData';

export const PathsPage = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);

  const filteredPaths = selectedCategory === 'all'
    ? pathsData
    : pathsData.filter(p => p.category === selectedCategory);

  const categories = [
    { id: 'all',          label: t('filter_all') },
    { id: 'beginner',     label: t('filter_beginner') },
    { id: 'intermediate', label: t('filter_intermediate') },
    { id: 'expert',       label: t('filter_expert') },
  ];

  const diffColors = {
    beginner:     { badge: 'badge-beginner',     border: '#88cc14', glow: 'rgba(136,204,20,0.2)' },
    intermediate: { badge: 'badge-intermediate', border: '#f59e0b', glow: 'rgba(245,158,11,0.2)' },
    expert:       { badge: 'badge-expert',       border: '#ef4444', glow: 'rgba(239,68,68,0.2)' },
  };

  return (
    <div className="min-h-screen bg-[#0d151c] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#1a232c] border-b border-[#2d3d4f] py-14 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#88cc14]/10 border border-[#88cc14]/30 px-4 py-1.5 mb-5">
            <i className="fa-solid fa-route text-[#88cc14] text-xs" />
            <span className="text-xs font-bold text-[#88cc14] uppercase tracking-wider font-mono">
              {language === 'uz' ? 'O\'quv yo\'llari' : language === 'ru' ? 'Учебные пути' : 'Learning Paths'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            {t('nav_paths')}
          </h1>
          <p className="text-[#94a3b8] max-w-xl mx-auto text-lg">{t('paths_sub')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            >
              {cat.label}
              {selectedCategory === cat.id && (
                <span className="ml-2 text-[10px] font-mono bg-black/20 px-1.5 py-0.5 rounded">
                  {filteredPaths.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Paths Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path, idx) => {
            const dc = diffColors[path.category] || diffColors.beginner;
            return (
              <div
                key={path.id}
                onMouseEnter={() => setHoveredId(path.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onNavigate('dashboard')}
                className="relative bg-[#1a232c] border rounded-xl overflow-hidden flex flex-col cursor-pointer transition-all duration-300 animate-fadeIn"
                style={{
                  animationDelay: `${idx * 0.06}s`,
                  borderColor: hoveredId === path.id ? dc.border : '#2d3d4f',
                  boxShadow: hoveredId === path.id ? `0 0 24px ${dc.glow}, 0 8px 32px rgba(0,0,0,0.3)` : 'none',
                  transform: hoveredId === path.id ? 'translateY(-4px)' : 'translateY(0)',
                }}
              >
                {/* Top accent bar */}
                <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${dc.border}, transparent)` }} />

                <div className="p-6 flex flex-col flex-1">
                  {/* Header row */}
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center border"
                      style={{ background: `${dc.border}15`, borderColor: `${dc.border}30` }}
                    >
                      <i className={`fa-solid ${path.icon} text-xl`} style={{ color: dc.border }} />
                    </div>
                    <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded ${path.badgeClass}`}>
                      {t(path.levelKey)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#88cc14]">
                    {t(path.titleKey)}
                  </h3>

                  <p className="text-sm text-[#94a3b8] flex-1 mb-6 leading-relaxed">
                    {t(path.descKey)}
                  </p>

                  {/* Progress bar (decorative) */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-[#94a3b8] mb-1.5">
                      <span className="font-mono">
                        {language === 'uz' ? 'Mashg\'ulotlar' : language === 'ru' ? 'Уроков' : 'Lessons'}
                      </span>
                      <span className="font-bold font-mono" style={{ color: dc.border }}>0%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill" style={{ width: '0%', background: `linear-gradient(90deg, ${dc.border}, ${dc.border}80)` }} />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center border-t border-[#2d3d4f] pt-4 mt-auto">
                    <span className="text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
                      <i className="fa-regular fa-clock" style={{ color: dc.border }} />
                      {t(path.durationKey)}
                    </span>
                    <span className="text-sm font-bold flex items-center gap-1.5 transition-all" style={{ color: dc.border }}>
                      {t('btn_start_path')}
                      <i className="fa-solid fa-arrow-right text-xs" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredPaths.length === 0 && (
          <div className="text-center py-20">
            <i className="fa-solid fa-ghost text-5xl text-[#2d3d4f] mb-4 block" />
            <p className="text-[#94a3b8]">
              {language === 'uz' ? 'Hech narsa topilmadi' : language === 'ru' ? 'Ничего не найдено' : 'Nothing found'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
