import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { roomsData } from '../data/roomsData';

const DIFFS = [
  { id: 'Info', color: '#94a3b8' },
  { id: 'Easy', color: '#88cc14' },
  { id: 'Medium', color: '#f59e0b' },
  { id: 'Hard', color: '#ef4444' },
  { id: 'Insane', color: '#a855f7' }
];

const CATEGORY_META = {
  Web: { icon: 'fa-solid fa-globe', color: '#0ea5e9' },
  Windows: { icon: 'fa-brands fa-windows', color: '#38bdf8' },
  Linux: { icon: 'fa-brands fa-linux', color: '#f59e0b' },
  CTF: { icon: 'fa-solid fa-flag', color: '#a855f7' }
};

const diffTone = (diff) => DIFFS.find(d => d.id === diff)?.color || '#88cc14';

export const PracticePage = ({ onSelectRoom }) => {
  const { language, t } = useLanguage();
  const { solvedTasks } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [orderBy, setOrderBy] = useState('popular');
  const [selectedDiffs, setSelectedDiffs] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const copy = {
    uz: {
      badge: 'Jonli laboratoriyalar',
      title: 'Amaliyot markazi',
      sub: 'Haqiqiy targetlarda recon, exploit va privilege escalation mashq qiling. Har bir xona — alohida missiya.',
      search: 'Missiya yoki texnikani qidirish...',
      rooms: 'xona',
      completed: 'tugatilgan',
      tasks: 'vazifa',
      targets: 'target',
      featured: 'Tavsiya etilgan missiya',
      enter: 'Labga kirish',
      deploy: 'Deploy',
      all: 'Hammasi',
      sort: 'Saralash',
      popular: 'Ommabop',
      newest: 'Yangi',
      oldest: 'Eski',
      empty: 'Bunday missiya topilmadi',
      emptyHint: 'Filtrlarni yumshating yoki qidiruvni tozalang.',
      reset: 'Filtrlarni tozalash',
      threat: 'Daraja',
      type: 'Tur',
      progress: 'Progress',
      live: 'ONLINE'
    },
    ru: {
      badge: 'Живые лаборатории',
      title: 'Центр практики',
      sub: 'Тренируйтесь на реальных целях: разведка, эксплуатация и повышение привилегий. Каждая комната — отдельная миссия.',
      search: 'Поиск миссии или техники...',
      rooms: 'комнат',
      completed: 'завершено',
      tasks: 'задач',
      targets: 'целей',
      featured: 'Рекомендуемая миссия',
      enter: 'Войти в лаб',
      deploy: 'Deploy',
      all: 'Все',
      sort: 'Сортировка',
      popular: 'Популярные',
      newest: 'Новые',
      oldest: 'Старые',
      empty: 'Миссии не найдены',
      emptyHint: 'Смягчите фильтры или очистите поиск.',
      reset: 'Сбросить фильтры',
      threat: 'Уровень',
      type: 'Тип',
      progress: 'Прогресс',
      live: 'ONLINE'
    },
    en: {
      badge: 'Live laboratories',
      title: 'Practice ops center',
      sub: 'Train on real targets: recon, exploitation, and privilege escalation. Every room is a mission.',
      search: 'Search missions or techniques...',
      rooms: 'rooms',
      completed: 'cleared',
      tasks: 'tasks',
      targets: 'targets',
      featured: 'Recommended mission',
      enter: 'Enter lab',
      deploy: 'Deploy',
      all: 'All',
      sort: 'Sort',
      popular: 'Popular',
      newest: 'Newest',
      oldest: 'Oldest',
      empty: 'No missions match',
      emptyHint: 'Relax the filters or clear the search.',
      reset: 'Reset filters',
      threat: 'Threat',
      type: 'Type',
      progress: 'Progress',
      live: 'ONLINE'
    }
  }[language] || {};

  const allRooms = useMemo(() => Object.values(roomsData), []);

  const toggle = (list, value, setter) => {
    setter(list.includes(value) ? list.filter(v => v !== value) : [...list, value]);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setOrderBy('popular');
    setSelectedDiffs([]);
    setSelectedTypes([]);
    setSelectedCategory('all');
  };

  const roomsList = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    const filtered = allRooms.filter(room => {
      const matchSearch = !q ||
        room.title.toLowerCase().includes(q) ||
        room.tags.some(tag => tag.toLowerCase().includes(q)) ||
        room.category.toLowerCase().includes(q) ||
        room.ip.includes(q);
      const matchDiff = selectedDiffs.length === 0 || selectedDiffs.includes(room.diff);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(room.type);
      const matchCat = selectedCategory === 'all' || room.category === selectedCategory;
      return matchSearch && matchDiff && matchType && matchCat;
    });

    return filtered.sort((a, b) => {
      if (orderBy === 'popular') {
        return (parseInt(b.users.replace(/,/g, ''), 10) || 0) - (parseInt(a.users.replace(/,/g, ''), 10) || 0);
      }
      if (orderBy === 'newest') return a.index - b.index;
      if (orderBy === 'oldest') return b.index - a.index;
      return 0;
    });
  }, [allRooms, searchQuery, orderBy, selectedDiffs, selectedTypes, selectedCategory]);

  const progressOf = (room) => {
    const solved = room.tasks.filter(task => solvedTasks[`${room.id}_${task.id}`]).length;
    return { solved, total: room.tasks.length, complete: solved === room.tasks.length };
  };

  const completedCount = allRooms.filter(room => progressOf(room).complete).length;
  const taskCount = allRooms.reduce((sum, room) => sum + room.tasks.length, 0);
  const hasActiveFilters = searchQuery || selectedDiffs.length > 0 || selectedTypes.length > 0 || selectedCategory !== 'all' || orderBy !== 'popular';
  const featured = roomsList[0];
  const categories = ['all', ...Array.from(new Set(allRooms.map(r => r.category)))];

  const chipClass = (active) =>
    `rounded-full border px-3 py-1.5 text-xs font-bold transition ${
      active
        ? 'border-[#88cc14] bg-[#88cc14] text-[#0d151c]'
        : 'border-[#2d3d4f] bg-[#1a232c] text-[#94a3b8] hover:border-[#88cc14]/50 hover:text-white'
    }`;

  return (
    <section className="min-h-screen bg-[#0d151c] text-white animate-fadeIn">
      <div className="relative overflow-hidden border-b border-[#2d3d4f]">
        <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-0 hero-radial pointer-events-none" />
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#88cc14] blur-3xl opacity-[0.07] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-12 sm:py-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#88cc14]/30 bg-[#88cc14]/10 px-3 py-1">
                <span className="live-dot" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#88cc14]">{copy.badge}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">{copy.title}</h1>
              <p className="mt-4 max-w-xl text-base sm:text-lg leading-relaxed text-[#94a3b8]">{copy.sub}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-0 lg:min-w-[520px]">
              {[
                { n: allRooms.length, l: copy.rooms, icon: 'fa-server' },
                { n: completedCount, l: copy.completed, icon: 'fa-circle-check' },
                { n: taskCount, l: copy.tasks, icon: 'fa-list-check' },
                { n: allRooms.length, l: copy.targets, icon: 'fa-crosshairs' }
              ].map(stat => (
                <div key={stat.l} className="rounded-xl border border-[#2d3d4f] bg-[#1a232c]/80 px-4 py-3 backdrop-blur-sm">
                  <i className={`fa-solid ${stat.icon} mb-2 text-[#88cc14] text-xs`} />
                  <div className="font-mono text-2xl font-black text-white">{stat.n}</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-[#94a3b8]">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-10">
        <div className="mb-6 rounded-2xl border border-[#2d3d4f] bg-[#1a232c] p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[#88cc14]">$</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.search}
                className="w-full rounded-xl border border-[#2d3d4f] bg-[#0d151c] py-3 pl-10 pr-10 font-mono text-sm text-white placeholder:text-[#64748b] focus:border-[#88cc14]/60 focus:outline-none"
              />
              {searchQuery && (
                <button type="button" onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white">
                  <i className="fa-solid fa-xmark" />
                </button>
              )}
            </div>
            <div className="flex rounded-xl border border-[#2d3d4f] bg-[#0d151c] p-1">
              {[
                { id: 'popular', label: copy.popular },
                { id: 'newest', label: copy.newest },
                { id: 'oldest', label: copy.oldest }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setOrderBy(opt.id)}
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition ${
                    orderBy === opt.id ? 'bg-[#88cc14] text-[#0d151c]' : 'text-[#94a3b8] hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button key={cat} type="button" onClick={() => setSelectedCategory(cat)} className={chipClass(selectedCategory === cat)}>
                {cat === 'all' ? copy.all : cat}
              </button>
            ))}
            <span className="mx-1 hidden h-4 w-px bg-[#2d3d4f] sm:block" />
            {DIFFS.filter(d => allRooms.some(r => r.diff === d.id)).map(d => (
              <button key={d.id} type="button" onClick={() => toggle(selectedDiffs, d.id, setSelectedDiffs)} className={chipClass(selectedDiffs.includes(d.id))}>
                <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: d.color }} />
                {d.id}
              </button>
            ))}
            <span className="mx-1 hidden h-4 w-px bg-[#2d3d4f] sm:block" />
            {['Walkthrough', 'Challenge'].map(type => (
              <button key={type} type="button" onClick={() => toggle(selectedTypes, type, setSelectedTypes)} className={chipClass(selectedTypes.includes(type))}>
                {type}
              </button>
            ))}
            {hasActiveFilters && (
              <button type="button" onClick={resetFilters} className="ml-auto rounded-full border border-[#ef4444]/30 bg-[#ef4444]/10 px-3 py-1.5 text-xs font-bold text-[#fca5a5] hover:bg-[#ef4444]/20">
                {copy.reset}
              </button>
            )}
          </div>
        </div>

        {featured && (
          <button
            type="button"
            onClick={() => onSelectRoom(featured.id)}
            className="group mb-8 grid w-full overflow-hidden rounded-2xl border border-[#2d3d4f] bg-[#1a232c] text-left transition hover:border-[#88cc14]/50 lg:grid-cols-[1.15fr_1fr]"
          >
            <div className="relative min-h-[220px] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0d151c] via-[#0d151c]/40 to-transparent lg:bg-gradient-to-t" />
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1 backdrop-blur">
                <span className="live-dot" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white">{copy.featured}</span>
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase" style={{ backgroundColor: diffTone(featured.diff), color: '#0d151c' }}>
                  {featured.diff}
                </span>
                <span className="rounded-full border border-[#2d3d4f] px-2.5 py-1 text-[10px] font-bold uppercase text-[#94a3b8]">{featured.category}</span>
                <span className="font-mono text-xs text-[#88cc14]">{featured.ip}</span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-white group-hover:text-[#88cc14]">{featured.title}</h2>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#94a3b8]">{t(featured.descKey)}</p>
              <div className="mt-5 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-1 flex justify-between text-[11px] text-[#94a3b8]">
                    <span>{copy.progress}</span>
                    <span className="font-mono">{progressOf(featured).solved}/{progressOf(featured).total}</span>
                  </div>
                  <div className="lab-progress-track">
                    <div className="lab-progress-fill" style={{ width: `${(progressOf(featured).solved / progressOf(featured).total) * 100}%` }} />
                  </div>
                </div>
                <span className="inline-flex items-center gap-2 rounded-xl bg-[#88cc14] px-4 py-2 text-xs font-black uppercase tracking-wide text-[#0d151c]">
                  {copy.enter}
                  <i className="fa-solid fa-arrow-right" />
                </span>
              </div>
            </div>
          </button>
        )}

        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-sm text-[#94a3b8]">
            {roomsList.length} {copy.rooms}
          </p>
        </div>

        {roomsList.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#2d3d4f] bg-[#1a232c] px-6 py-16 text-center">
            <i className="fa-solid fa-satellite-dish mb-4 text-4xl text-[#88cc14]" />
            <p className="text-xl font-bold">{copy.empty}</p>
            <p className="mt-2 text-sm text-[#94a3b8]">{copy.emptyHint}</p>
            <button type="button" onClick={resetFilters} className="btn-primary mt-6 text-sm">
              {copy.reset}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {roomsList.filter(room => room.id !== featured?.id).map((room, idx) => {
              const progress = progressOf(room);
              const cat = CATEGORY_META[room.category] || { icon: room.icon, color: '#88cc14' };
              const percent = (progress.solved / progress.total) * 100;

              return (
                <article
                  key={room.id}
                  onClick={() => onSelectRoom(room.id)}
                  className="lab-mission-card cursor-pointer rounded-2xl"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="absolute inset-y-0 left-0 w-1.5" style={{ backgroundColor: diffTone(room.diff) }} />
                  <div className="p-5 pl-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-xl border"
                          style={{ background: `${cat.color}18`, borderColor: `${cat.color}40`, color: cat.color }}
                        >
                          <i className={cat.icon || `fa-solid ${room.icon}`} />
                        </div>
                        <div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#64748b]">OP-{String(room.index).padStart(2, '0')}</div>
                          <div className="flex items-center gap-2 text-[11px] text-[#94a3b8]">
                            <span className="live-dot !h-1.5 !w-1.5" />
                            {copy.live}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {progress.complete ? (
                          <span className="rounded-full bg-[#0ea5e9]/15 px-2 py-1 text-[10px] font-black uppercase text-[#0ea5e9]">Done</span>
                        ) : (
                          <span className="rounded-full px-2 py-1 text-[10px] font-black uppercase" style={{ backgroundColor: diffTone(room.diff), color: '#0d151c' }}>
                            {room.diff}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-black tracking-tight text-white">{room.title}</h3>
                    <p className="mt-1 font-mono text-xs text-[#88cc14]">target {room.ip}</p>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[#94a3b8]">{t(room.descKey)}</p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {room.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="rounded-md border border-[#2d3d4f] bg-[#0d151c] px-2 py-0.5 font-mono text-[10px] text-[#94a3b8]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5">
                      <div className="mb-1.5 flex items-center justify-between text-[11px] text-[#94a3b8]">
                        <span>{copy.progress}</span>
                        <span className="font-mono">{progress.solved}/{progress.total} {copy.tasks}</span>
                      </div>
                      <div className="lab-progress-track">
                        <div className="lab-progress-fill" style={{ width: `${percent}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#2d3d4f] pt-4">
                      <div className="flex items-center gap-3 text-[11px] text-[#94a3b8]">
                        <span><i className="fa-solid fa-users mr-1 text-[#88cc14]" />{room.users}</span>
                        <span><i className="fa-regular fa-clock mr-1" />{room.duration}</span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wide text-[#88cc14]">
                        {copy.deploy}
                        <i className="fa-solid fa-play text-[9px]" />
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
