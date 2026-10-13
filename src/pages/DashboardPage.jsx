import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { roomsData } from '../data/roomsData';

export const DashboardPage = ({ onSelectRoom, onNavigate }) => {
  const { language, t } = useLanguage();
  const {
    isLoggedIn,
    userName,
    userHandle,
    userXp,
    streak,
    completedRoomsCount,
    progressPercent,
    generateAndDownloadCertificate,
    solvedTasks,
    logout,
    getUserTier,
  } = useUser();

  const totalSolvedCount = Object.keys(solvedTasks).length;

  const recentRooms = Object.values(roomsData).filter(room =>
    room.tasks.some(task => solvedTasks[`${room.id}_${task.id}`])
  );

  const tierName = getUserTier
    ? getUserTier(userXp, language)
    : language === 'uz'
    ? 'Oltin Daraja'
    : 'Gold Tier';

  // XP level calculation
  const nextTierXp = userXp >= 500 ? 1000 : userXp >= 200 ? 500 : 200;
  const xpPercentage = Math.min(100, Math.round((userXp / nextTierXp) * 100));

  return (
    <div className="min-h-screen bg-[#070f17] text-[#e2ecf5] pb-20">
      {/* ─── Profile Header / Hero HUD Banner ─── */}
      <section className="relative overflow-hidden border-b border-[#1b2b3a] bg-gradient-to-b from-[#0e1925] via-[#09141f] to-[#070f17] px-4 py-8 sm:px-8 sm:py-12">
        {/* Ambient glow backgrounds */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#88cc14]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#0ea5e9]/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1e2d3d_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />

        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {isLoggedIn && userName ? (
            /* Logged-in Cyber Profile Card */
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {/* Avatar with cyber rank badge */}
              <div className="relative shrink-0">
                <div className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl border-2 border-[#88cc14]/40 bg-gradient-to-br from-[#122b28] via-[#0c1f24] to-[#0a1620] shadow-[0_0_25px_rgba(136,204,20,0.25)]">
                  <span className="font-heading text-3xl sm:text-4xl font-extrabold text-[#8ef2d6]">
                    {userName.charAt(0).toUpperCase()}
                  </span>
                  <div className="absolute -top-1.5 -right-1.5 h-3.5 w-3.5 rounded-full bg-[#88cc14] ring-4 ring-[#0e1925] animate-pulse" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#f59e0b]/40 bg-[#161f1a] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#f59e0b] shadow-md">
                  <i className="fa-solid fa-shield-halved mr-1 text-[9px]" />
                  LVL {userXp >= 500 ? '3' : userXp >= 200 ? '2' : '1'}
                </div>
              </div>

              {/* User Identity Details */}
              <div className="pt-2 sm:pt-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <h1 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {userName}
                  </h1>
                  <span className="rounded-md border border-[#88cc14]/30 bg-[#88cc14]/10 px-2.5 py-0.5 font-mono text-xs font-bold text-[#88cc14]">
                    PRO DEFENDER
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-xs text-[#8ca0b3]">
                  <span className="text-[#38bdf8]">
                    @{userHandle ? userHandle.replace(/^@/, '') : 'cyber_ninja'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5 text-[#fbbf24]">
                    <i className="fa-solid fa-award text-xs" />
                    {tierName}
                  </span>
                  <span>•</span>
                  <span className="text-[#64748b]">
                    ID: CS-{Math.abs(userName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 1000))}
                  </span>
                </div>

                {/* Micro Level Progress Bar */}
                <div className="mt-3 flex items-center gap-3 max-w-xs sm:max-w-sm">
                  <div className="h-2 flex-1 rounded-full bg-[#182633] overflow-hidden p-0.5 border border-[#233547]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#88cc14] to-[#0ea5e9] transition-all duration-500"
                      style={{ width: `${xpPercentage}%` }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-[#8ca0b3]">
                    {userXp}/{nextTierXp} XP
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Guest / Unregistered Mode HUD */
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-[#3a526b] bg-[#0f1d2a] text-[#8ca0b3] shadow-inner">
                  <i className="fa-solid fa-user-shield text-3xl text-[#38bdf8]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="font-heading text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {language === 'uz'
                      ? "Kiber Profil va Boshqaruv Paneli"
                      : language === 'ru'
                      ? "Кибер Профиль и Панель Управления"
                      : "Cyber Profile & Mission Control"}
                  </h1>
                  <span className="rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#f59e0b]">
                    {language === 'uz' ? 'Mehmon' : language === 'ru' ? 'Гость' : 'Guest'}
                  </span>
                </div>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#94a3b8]">
                  {language === 'uz'
                    ? "Barcha mashg'ulot natijalari, xakerlik laboratoriyalari statistikasi va rasmiy sertifikatlaringiz bitta xavfsiz boshqaruv panelida."
                    : language === 'ru'
                    ? "Все результаты тренировок, статистика лабораторий и официальные сертификаты на одной панели."
                    : "Track all your hands-on lab progress, flags captured, and certificates from one centralized control center."}
                </p>
              </div>
            </div>
          )}

          {/* Action Header Buttons */}
          <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
            {isLoggedIn && userName ? (
              <>
                <button
                  type="button"
                  onClick={() => generateAndDownloadCertificate(language)}
                  className="flex items-center gap-2 rounded-xl border border-[#0ea5e9]/60 bg-[#0c2333] px-4 py-2.5 font-mono text-xs font-bold text-[#38bdf8] shadow-[0_0_15px_rgba(14,165,233,0.18)] transition-all hover:bg-[#0ea5e9] hover:text-[#06111a] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                >
                  <i className="fa-solid fa-file-shield text-sm" />
                  <span>{t('dash_cert_btn')}</span>
                </button>
                <button
                  type="button"
                  onClick={() => logout()}
                  title={language === 'uz' ? "Tizimdan chiqish" : language === 'ru' ? "Выйти" : "Logout"}
                  className="flex items-center gap-2 rounded-xl border border-[#ef4444]/30 bg-[#221317] px-3.5 py-2.5 font-mono text-xs font-medium text-[#f87171] transition-all hover:bg-[#ef4444] hover:text-white"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                  <span>{language === 'uz' ? 'Chiqish' : language === 'ru' ? 'Выход' : 'Logout'}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('login', 'signup')}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#88cc14] to-[#a3e635] px-5 py-2.5 font-heading text-sm font-bold text-[#071306] shadow-[0_0_20px_rgba(136,204,20,0.35)] transition-all hover:brightness-110"
                >
                  <i className="fa-solid fa-user-plus text-xs" />
                  <span>{language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? "Регистрация" : "Sign Up"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('login', 'login')}
                  className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl border border-[#2d4358] bg-[#0f1d2a] px-5 py-2.5 font-mono text-xs font-bold text-[#e2ecf5] transition-all hover:border-[#0ea5e9] hover:text-[#38bdf8]"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket text-xs" />
                  <span>{language === 'uz' ? "Kirish" : language === 'ru' ? "Войти" : "Login"}</span>
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ─── Main Content Container ─── */}
      <main className="mx-auto max-w-6xl px-4 sm:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Guest Banner Notice */}
        {!isLoggedIn && (
          <div className="relative overflow-hidden rounded-2xl border border-[#88cc14]/40 bg-gradient-to-r from-[#0d1d1f] via-[#0b1824] to-[#11221b] p-5 shadow-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#88cc14]/40 bg-[#88cc14]/15 text-[#88cc14]">
                  <i className="fa-solid fa-shield-halved text-xl" />
                </div>
                <div>
                  <h4 className="font-heading text-base font-bold text-white">
                    {language === 'uz'
                      ? "Profilingizni faollashtiring va natijalarni saqlang"
                      : language === 'ru'
                      ? "Активируйте профиль и сохраняйте достижения"
                      : "Activate your profile to save achievements & progress"}
                  </h4>
                  <p className="mt-1 text-xs text-[#94a3b8] leading-relaxed">
                    {language === 'uz'
                      ? "Ro'yxatdan o'tgan foydalanuvchilar o'z darajasini oshirishi, reytingda qatnashishi va xalqaro namunadagi sertifikatni bepul yuklab olishi mumkin."
                      : language === 'ru'
                      ? "Зарегистрированные пользователи получают официальные сертификаты и участвуют в рейтинге лидеров."
                      : "Registered users unlock official certificates, leaderboard ranking, and personalized CTF challenges."}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('login', 'signup')}
                className="shrink-0 rounded-xl bg-[#88cc14] px-4 py-2 font-mono text-xs font-bold text-black transition-all hover:bg-[#75b310] shadow-[0_0_15px_rgba(136,204,20,0.3)]"
              >
                <i className="fa-solid fa-bolt mr-1.5" />
                {language === 'uz' ? "Hisob ochish" : language === 'ru' ? "Создать аккаунт" : "Get Started"}
              </button>
            </div>
          </div>
        )}

        {/* ─── Metric Cards Grid ─── */}
        <section aria-label="Key Performance Indicators">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {[
              {
                icon: 'fa-fire-flame-curved',
                color: '#f59e0b',
                bg: 'rgba(245, 158, 11, 0.12)',
                border: 'rgba(245, 158, 11, 0.35)',
                label: t('dash_streak'),
                value: `${streak}`,
                unit: t('dash_days'),
                description: language === 'uz' ? 'Ketma-ket kirish' : language === 'ru' ? 'Серия дней' : 'Streak',
              },
              {
                icon: 'fa-bolt',
                color: '#88cc14',
                bg: 'rgba(136, 204, 20, 0.12)',
                border: 'rgba(136, 204, 20, 0.35)',
                label: t('dash_xp'),
                value: `${userXp}`,
                unit: 'XP',
                description: language === 'uz' ? 'Tajriba ochkolari' : language === 'ru' ? 'Очки опыта' : 'Experience',
              },
              {
                icon: 'fa-cubes-stacked',
                color: '#0ea5e9',
                bg: 'rgba(14, 165, 233, 0.12)',
                border: 'rgba(14, 165, 233, 0.35)',
                label: t('dash_completed'),
                value: `${completedRoomsCount}`,
                unit: `/ ${Object.keys(roomsData).length}`,
                description: language === 'uz' ? 'Yechilgan laboratoriyalar' : language === 'ru' ? 'Завершенные комнаты' : 'Labs completed',
              },
              {
                icon: 'fa-flag',
                color: '#a855f7',
                bg: 'rgba(168, 85, 247, 0.12)',
                border: 'rgba(168, 85, 247, 0.35)',
                label: language === 'uz' ? 'Bayroqlar (CTF)' : language === 'ru' ? 'Флаги (CTF)' : 'Flags (CTF)',
                value: `${totalSolvedCount}`,
                unit: '/ 18',
                description: language === 'uz' ? 'Topilgan bayroqlar' : language === 'ru' ? 'Захваченные флаги' : 'Captured flags',
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-2xl border border-[#1d2d3e] bg-[#0c1622]/90 p-5 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-[#2d4763] hover:shadow-[0_8px_25px_rgba(0,0,0,0.4)]"
              >
                {/* Subtle top indicator bar */}
                <div
                  className="absolute inset-x-0 top-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: card.color }}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-[#8297ab]">
                      {card.label}
                    </span>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
                        {card.value}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#8297ab]">
                        {card.unit}
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-[#62778c]">
                      {card.description}
                    </p>
                  </div>

                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: card.bg,
                      border: `1px solid ${card.border}`,
                      color: card.color,
                    }}
                  >
                    <i className={`fa-solid ${card.icon} text-xl`} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Fast Shortcuts Bar ─── */}
        <section aria-label="Quick Actions">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: 'fa-route',
                color: '#88cc14',
                title: language === 'uz' ? "O'quv yo'llari" : language === 'ru' ? "Учебные треки" : "Learning Paths",
                target: 'paths',
              },
              {
                icon: 'fa-terminal',
                color: '#0ea5e9',
                title: language === 'uz' ? "Laboratoriyalar" : language === 'ru' ? "Лаборатории" : "Practice Rooms",
                target: 'practice',
              },
              {
                icon: 'fa-ranking-star',
                color: '#f59e0b',
                title: language === 'uz' ? "Reyting jadvali" : language === 'ru' ? "Таблица лидеров" : "Leaderboard",
                target: 'leaderboard',
              },
              {
                icon: 'fa-shield-virus',
                color: '#a855f7',
                title: language === 'uz' ? "APK Xavfsizlik" : language === 'ru' ? "APK Безопасность" : "APK Inspector",
                target: 'apk_qoriqchi',
              },
            ].map((btn, i) => (
              <button
                key={i}
                type="button"
                onClick={() => onNavigate && onNavigate(btn.target)}
                className="flex items-center gap-3 rounded-xl border border-[#1b2b3b] bg-[#0c1622] p-3 text-left transition-all hover:border-[#2d4763] hover:bg-[#112030] group"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${btn.color}15`, border: `1px solid ${btn.color}35`, color: btn.color }}
                >
                  <i className={`fa-solid ${btn.icon} text-sm transition-transform group-hover:scale-110`} />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-mono text-xs font-bold text-white group-hover:text-[#8ef2d6] transition-colors">
                    {btn.title}
                  </div>
                  <div className="font-mono text-[10px] text-[#62778c]">
                    {language === 'uz' ? "O'tish →" : language === 'ru' ? "Перейти →" : "Open →"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* ─── Two Columns: Recommended Room & Achievements ─── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Card 1: Next Recommended Lab Mission */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#88cc14]/40 bg-gradient-to-br from-[#0c1822] via-[#09151e] to-[#0c1a1f] p-6 shadow-xl">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[#88cc14]/10 blur-2xl" />
            
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md border border-[#88cc14]/40 bg-[#88cc14]/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-[#88cc14]">
                  {t('dash_recommended')}
                </span>
                <span className="font-mono text-xs text-[#0ea5e9] flex items-center gap-1.5">
                  <i className="fa-solid fa-satellite-dish text-[10px] animate-pulse" />
                  ONLINE LABS
                </span>
              </div>

              <h3 className="mt-4 font-heading text-xl sm:text-2xl font-bold text-white">
                {t('dash_next_title')}
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#94a3b8]">
                {t('dash_next_desc')}
              </p>

              {/* Progress HUD bar */}
              <div className="mt-6 rounded-xl border border-[#1b2b3a] bg-[#07111a] p-4">
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-[#94a3b8]">
                    {language === 'uz'
                      ? `Platforma yakunlanishi: ${progressPercent}%`
                      : language === 'ru'
                      ? `Прогресс платформы: ${progressPercent}%`
                      : `Platform completion: ${progressPercent}%`}
                  </span>
                  <span className="font-bold text-[#88cc14]">
                    {completedRoomsCount}/6 {language === 'uz' ? 'xona' : 'rooms'}
                  </span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#12202e] p-0.5 border border-[#1d3043]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#88cc14] via-[#38bdf8] to-[#88cc14] transition-all duration-700"
                    style={{ width: `${Math.max(5, progressPercent)}%` }}
                  />
                </div>
                <div className="mt-2 flex justify-between font-mono text-[10px] text-[#62778c]">
                  <span>0 XP (Beginner)</span>
                  <span className="text-[#38bdf8]">500 XP (Master)</span>
                  <span className="text-[#88cc14]">1000+ XP (Elite)</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onSelectRoom('vulnversity')}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#88cc14] to-[#75b310] py-3 px-5 font-heading text-sm font-bold text-black shadow-[0_0_20px_rgba(136,204,20,0.3)] transition-all hover:brightness-110 active:scale-[0.99]"
              >
                <i className="fa-solid fa-play text-xs" />
                <span>{t('dash_btn_continue')}</span>
              </button>
            </div>
          </div>

          {/* Card 2: Badges and Achievements */}
          <div className="flex flex-col justify-between rounded-2xl border border-[#1d2d3e] bg-[#0c1622] p-6 shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-medal text-[#f59e0b]" />
                  <span>{t('dash_achievements')}</span>
                </h3>
                <span className="font-mono text-xs text-[#8ca0b3]">
                  {language === 'uz' ? '2 / 4 Ochiq' : language === 'ru' ? '2 / 4 Открыто' : '2 / 4 Unlocked'}
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    icon: 'fa-shield-halved',
                    color: '#88cc14',
                    border: 'rgba(136, 204, 20, 0.4)',
                    title: 'First Blood',
                    xp: '+500 XP',
                    desc: language === 'uz' ? 'Birinchi kiber bayroqni muvaffaqiyatli topshirdingiz' : language === 'ru' ? 'Первый флаг захвачен' : 'First flag captured',
                    unlocked: true,
                  },
                  {
                    icon: 'fa-terminal',
                    color: '#0ea5e9',
                    border: 'rgba(14, 165, 233, 0.4)',
                    title: 'Linux Defender',
                    xp: '+250 XP',
                    desc: language === 'uz' ? 'Linux buyruqlar va xavfsizlik modulini yakunladingiz' : language === 'ru' ? 'Linux комната завершена' : 'Linux defense room completed',
                    unlocked: true,
                  },
                  {
                    icon: 'fa-crown',
                    color: '#64748b',
                    border: '#233547',
                    title: 'Room Master',
                    xp: '+1000 XP',
                    desc: language === 'uz' ? 'Barcha 6 ta asosiy xonani to\'liq yakunlang' : language === 'ru' ? 'Завершите все 6 комнат' : 'Complete all 6 rooms',
                    unlocked: false,
                  },
                  {
                    icon: 'fa-fire-flame-curved',
                    color: '#64748b',
                    border: '#233547',
                    title: '7-Day Streak',
                    xp: '+300 XP',
                    desc: language === 'uz' ? '7 kun ketma-ket har kuni tizimga kiring' : language === 'ru' ? '7 дней подряд в системе' : '7 consecutive days login streak',
                    unlocked: false,
                  },
                ].map((ach, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3.5 rounded-xl border p-3 transition-all ${
                      ach.unlocked
                        ? 'border-[#243a4e] bg-[#0f1d2a] hover:border-[#38bdf8]/50'
                        : 'border-[#172533] bg-[#09121a]/60 opacity-60'
                    }`}
                  >
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: ach.unlocked ? `${ach.color}15` : '#131e29',
                        border: `1px solid ${ach.unlocked ? ach.border : '#233547'}`,
                        color: ach.unlocked ? ach.color : '#64748b',
                      }}
                    >
                      <i className={`fa-solid ${ach.icon} text-base`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold text-white truncate">
                          {ach.title}
                        </span>
                        {!ach.unlocked && (
                          <i className="fa-solid fa-lock text-[10px] text-[#64748b]" />
                        )}
                      </div>
                      <p className="mt-0.5 truncate text-[11px] text-[#94a3b8]">
                        {ach.desc}
                      </p>
                    </div>

                    <span
                      className="font-mono text-xs font-bold whitespace-nowrap rounded-md px-2 py-0.5"
                      style={{
                        backgroundColor: ach.unlocked ? `${ach.color}15` : '#162330',
                        color: ach.unlocked ? ach.color : '#64748b',
                      }}
                    >
                      {ach.xp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1a2a3a] text-center">
              <span className="font-mono text-[11px] text-[#62778c]">
                {language === 'uz' ? 'Ko\'proq laboratoriyalarni yechib yangi unvonlarga erishing' : 'Solve more rooms to unlock legendary badges'}
              </span>
            </div>
          </div>
        </section>

        {/* ─── Recent Rooms & Laboratory Activity ─── */}
        <section className="rounded-2xl border border-[#1d2d3e] bg-[#0c1622] p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div>
              <h3 className="font-heading text-xl font-bold text-white flex items-center gap-2.5">
                <i className="fa-solid fa-clock-rotate-left text-[#0ea5e9]" />
                <span>
                  {language === 'uz' ? 'Amaliy Mashg\'ulotlar Tarixi' : language === 'ru' ? 'История практических заданий' : 'Hands-on Activity'}
                </span>
              </h3>
              <p className="mt-1 text-xs text-[#8ca0b3]">
                {language === 'uz'
                  ? 'Siz boshlagan va yechayotgan kiberxavfsizlik xonalari'
                  : 'Rooms in progress and completed walkthroughs'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate && onNavigate('practice')}
              className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#88cc14] transition-colors hover:text-[#a3e635]"
            >
              <span>{language === 'uz' ? 'Barcha xonalar' : language === 'ru' ? 'Все комнаты' : 'All rooms'}</span>
              <i className="fa-solid fa-arrow-right text-[11px]" />
            </button>
          </div>

          {recentRooms.length === 0 ? (
            /* Empty state */
            <div className="rounded-xl border border-dashed border-[#233547] bg-[#09121a]/80 py-12 px-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-[#88cc14]/30 bg-[#88cc14]/10 text-[#88cc14] mb-4">
                <i className="fa-solid fa-laptop-code text-2xl" />
              </div>
              <h4 className="font-heading text-base font-bold text-white">
                {language === 'uz'
                  ? "Hali faollik boshlanmagan"
                  : language === 'ru'
                  ? "Пока нет активности"
                  : "No lab activity yet"}
              </h4>
              <p className="mx-auto mt-1.5 max-w-md text-xs text-[#8ca0b3]">
                {language === 'uz'
                  ? "Kiberxavfsizlik amaliyotini boshlash uchun birinchi interaktiv xonani tanlang va topshiriqlarni yechishga kirishing!"
                  : language === 'ru'
                  ? "Начните с первой интерактивной комнаты и выполняйте практические задания!"
                  : "Select an interactive room to start investigating vulnerabilities and collecting flags!"}
              </p>
              <button
                type="button"
                onClick={() => onSelectRoom('vulnversity')}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#88cc14] px-5 py-2.5 font-heading text-xs font-bold text-black transition-all hover:bg-[#75b310] shadow-[0_0_15px_rgba(136,204,20,0.25)]"
              >
                <i className="fa-solid fa-play text-[10px]" />
                <span>{language === 'uz' ? "Vulnversity xonasini boshlash" : "Start Vulnversity"}</span>
              </button>
            </div>
          ) : (
            /* Recent rooms list */
            <div className="space-y-3">
              {recentRooms.map((room) => {
                const solved = room.tasks.filter(t => solvedTasks[`${room.id}_${t.id}`]).length;
                const pct = Math.round((solved / room.tasks.length) * 100);
                const isComplete = pct === 100;

                return (
                  <div
                    key={room.id}
                    onClick={() => onSelectRoom(room.id)}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#1b2b3b] bg-[#09131d] p-4 transition-all hover:border-[#88cc14]/50 hover:bg-[#0c1825] cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#2d4358] bg-[#122130] text-[#88cc14] transition-colors group-hover:border-[#88cc14]">
                        <i className={`fa-solid ${room.icon || 'fa-server'} text-base`} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-sm font-bold text-white transition-colors group-hover:text-[#8ef2d6] truncate">
                            {room.title}
                          </h4>
                          {isComplete ? (
                            <span className="rounded bg-[#88cc14]/20 border border-[#88cc14]/40 px-2 py-0.5 font-mono text-[10px] font-bold text-[#88cc14]">
                              COMPLETED
                            </span>
                          ) : (
                            <span className="rounded bg-[#0ea5e9]/15 border border-[#0ea5e9]/30 px-2 py-0.5 font-mono text-[10px] font-bold text-[#0ea5e9]">
                              IN PROGRESS
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex items-center gap-2 font-mono text-[11px] text-[#8ca0b3]">
                          <span>{room.category || 'General'}</span>
                          <span>•</span>
                          <span>{room.diff || 'Easy'}</span>
                          <span>•</span>
                          <span>{room.duration || '40 daq'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 sm:w-64">
                      <div className="flex-1">
                        <div className="flex justify-between font-mono text-[11px] text-[#8ca0b3] mb-1">
                          <span>{solved}/{room.tasks.length} topshiriq</span>
                          <span className="font-bold text-white">{pct}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[#182736]">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isComplete ? 'bg-[#88cc14]' : 'bg-[#0ea5e9]'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      <button
                        type="button"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2d4358] bg-[#122130] text-[#8ca0b3] transition-colors group-hover:border-[#88cc14] group-hover:text-[#88cc14]"
                      >
                        <i className="fa-solid fa-chevron-right text-xs" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
