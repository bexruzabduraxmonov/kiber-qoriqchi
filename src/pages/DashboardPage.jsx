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
    room.tasks.some(t => solvedTasks[`${room.id}_${t.id}`])
  );

  const tierName = getUserTier ? getUserTier(userXp, language) : (language === 'uz' ? 'Oltin Daraja' : 'Gold Tier');

  return (
    <div className="min-h-screen bg-[#0d151c] animate-fadeIn">
      {/* Profile Header Banner */}
      <div className="bg-[#1a232c] border-b border-[#2d3d4f] px-5 sm:px-8 py-10">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {isLoggedIn && userName ? (
            /* Registered / Logged-in User Card */
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center text-3xl font-bold text-black shadow-xl shadow-[#88cc14]/20">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#88cc14] border-2 border-[#1a232c] flex items-center justify-center">
                  <i className="fa-solid fa-check text-[8px] text-black font-bold" />
                </div>
              </div>
              {/* Info */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                  {language === 'uz' ? `Xush kelibsiz, ${userName}!` : language === 'ru' ? `Добро пожаловать, ${userName}!` : `Welcome, ${userName}!`}
                </h1>
                <p className="text-[#94a3b8] font-mono text-sm mt-1 flex items-center gap-2">
                  <span>@{userHandle ? userHandle.replace(/^@/, '') : 'cyber_ninja'}</span>
                  <span>·</span>
                  <span className="text-[#f59e0b] flex items-center">
                    <i className="fa-solid fa-medal text-xs mr-1" />
                    {tierName}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            /* Unregistered / Guest State */
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-[#24303c] border-2 border-dashed border-[#3a4f66] flex items-center justify-center text-3xl text-[#94a3b8]">
                  <i className="fa-solid fa-user-shield text-[#88cc14]" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                    {language === 'uz' ? "Hisobingizga kiring yoki ro'yxatdan o'ting" : language === 'ru' ? "Войдите или зарегистрируйтесь" : "Sign In or Register"}
                  </h1>
                  <span className="hidden sm:inline-block text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/30">
                    {language === 'uz' ? 'Mehmon rejimi' : language === 'ru' ? 'Гость' : 'Guest'}
                  </span>
                </div>
                <p className="text-[#94a3b8] text-sm mt-1 max-w-xl leading-relaxed">
                  {language === 'uz'
                    ? "Shaxsiy profilingiz, yutuqlaringiz va rasmiy sertifikat ro'yxatdan o'tganingizdan so'ng aynan shu yerda ko'rinadi."
                    : language === 'ru'
                    ? "Ваш персональный профиль, достижения и официальный сертификат появятся здесь после регистрации."
                    : "Your personal profile, achievements, and certificate will appear here once you register."}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {isLoggedIn && userName ? (
              <>
                <button
                  type="button"
                  onClick={() => generateAndDownloadCertificate(language)}
                  className="btn-outline border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-black gap-2 transition-all font-mono text-sm"
                >
                  <i className="fa-solid fa-certificate text-base" />
                  {t('dash_cert_btn')}
                </button>
                <button
                  type="button"
                  onClick={() => logout()}
                  title={language === 'uz' ? "Tizimdan chiqish" : language === 'ru' ? "Выйти из системы" : "Logout"}
                  className="btn-outline border-[#ef4444]/40 text-[#ef4444] hover:bg-[#ef4444] hover:text-white px-3.5 py-2.5 text-sm transition-all font-mono"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket mr-1.5" />
                  {language === 'uz' ? 'Chiqish' : language === 'ru' ? 'Выйти' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('login', 'signup')}
                  className="btn-primary flex-1 md:flex-none justify-center bg-[#88cc14] text-black font-bold py-2.5 px-5 text-sm gap-2 glow-green"
                >
                  <i className="fa-solid fa-user-plus" />
                  {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? "Регистрация" : "Sign Up"}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('login', 'login')}
                  className="btn-outline flex-1 md:flex-none justify-center border-[#0ea5e9] text-[#0ea5e9] hover:bg-[#0ea5e9] hover:text-black py-2.5 px-5 text-sm gap-2 font-mono"
                >
                  <i className="fa-solid fa-right-to-bracket" />
                  {language === 'uz' ? "Kirish" : language === 'ru' ? "Войти" : "Login"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10 space-y-8">
        {/* Guest Notification Banner if not logged in */}
        {!isLoggedIn && (
          <div className="bg-[#1a232c] border border-[#88cc14]/30 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#88cc14]/15 border border-[#88cc14]/30 flex items-center justify-center text-[#88cc14] shrink-0">
                <i className="fa-solid fa-circle-info text-lg" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">
                  {language === 'uz' ? "Siz hozirda mehmon rejimidasiz" : language === 'ru' ? "Вы находитесь в гостевом режиме" : "You are currently in guest mode"}
                </h4>
                <p className="text-xs text-[#94a3b8] mt-0.5">
                  {language === 'uz'
                    ? "Laboratoriyalarni bemalol yechishingiz mumkin. Natijalarni profilga saqlash va sertifikat olish uchun ro'yxatdan o'ting."
                    : language === 'ru'
                    ? "Вы можете решать лаборатории. Зарегистрируйтесь, чтобы сохранять результаты и получить сертификат."
                    : "You can solve labs freely. Register to save your progress to your profile and get certified."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('login', 'signup')}
              className="btn-primary text-xs py-2 px-4 bg-[#88cc14] text-black font-bold whitespace-nowrap glow-green"
            >
              <i className="fa-solid fa-user-plus mr-1.5" />
              {language === 'uz' ? "Ro'yxatdan o'tish" : language === 'ru' ? "Регистрация" : "Sign Up"}
            </button>
          </div>
        )}

        {/* ─── Metric Cards ─── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: 'fa-fire',
              color: '#f59e0b',
              label: t('dash_streak'),
              value: `${streak}`,
              sub: t('dash_days'),
              glow: 'rgba(245,158,11,0.2)',
            },
            {
              icon: 'fa-star',
              color: '#88cc14',
              label: t('dash_xp'),
              value: `${userXp}`,
              sub: 'XP',
              glow: 'rgba(136,204,20,0.2)',
            },
            {
              icon: 'fa-check-double',
              color: '#0ea5e9',
              label: t('dash_completed'),
              value: `${completedRoomsCount}`,
              sub: '/ 6',
              glow: 'rgba(14,165,233,0.2)',
            },
            {
              icon: 'fa-flag',
              color: '#a855f7',
              label: language === 'uz' ? 'Bayroqlar' : language === 'ru' ? 'Флаги' : 'Flags',
              value: `${totalSolvedCount}`,
              sub: '/ 18',
              glow: 'rgba(168,85,247,0.2)',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-5 flex items-center justify-between transition-all duration-300 hover:-translate-y-1 hover:border-[#3a4f66]"
            >
              <div>
                <p className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider mb-2">{card.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-white">{card.value}</span>
                  <span className="text-sm text-[#94a3b8]">{card.sub}</span>
                </div>
              </div>
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${card.color}15`, border: `1px solid ${card.color}30`, boxShadow: `0 0 15px ${card.glow}` }}
              >
                <i className={`fa-solid ${card.icon} text-2xl`} style={{ color: card.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Progress + Recommended ─── */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Overall Progress */}
          <div className="bg-[#1a232c] border border-[#88cc14]/30 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#88cc14] rounded-full filter blur-3xl opacity-[0.04] pointer-events-none" />
            <div className="absolute top-0 right-0 bg-[#88cc14] text-black text-[10px] font-bold px-2.5 py-1 uppercase font-mono">
              {t('dash_recommended')}
            </div>

            <h3 className="text-xl font-bold text-white font-heading mb-2">{t('dash_next_title')}</h3>
            <p className="text-sm text-[#94a3b8] mb-6 leading-relaxed">{t('dash_next_desc')}</p>

            {/* Progress bar */}
            <div className="mb-2">
              <div className="flex justify-between text-xs font-mono text-[#94a3b8] mb-2">
                <span>
                  {language === 'uz' ? `${progressPercent}% tugatildi` : language === 'ru' ? `${progressPercent}% завершено` : `${progressPercent}% completed`}
                </span>
                <span className="text-[#88cc14]">{t('level_int')}</span>
              </div>
              <div className="progress-bar mb-1">
                <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-[#64748b]">
                <span>0 XP</span>
                <span>900 XP</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectRoom('owasp')}
              className="btn-primary w-full mt-4 glow-green"
            >
              <i className="fa-solid fa-play" />
              {t('dash_btn_continue')}
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-6">
            <h3 className="text-xl font-bold text-white font-heading mb-5">{t('dash_achievements')}</h3>
            <div className="space-y-3">
              {[
                { icon: 'fa-bug',          color: '#f59e0b', border: '#f59e0b40', title: 'First Blood',     xp: '+500 XP', desc: language === 'uz' ? 'Birinchi bayroqni qo\'lga kiritdingiz' : language === 'ru' ? 'Первый флаг захвачен' : 'First flag captured',   locked: false },
                { icon: 'fa-shield-halved',color: '#88cc14', border: '#88cc1440', title: 'Linux Defender',  xp: '+250 XP', desc: language === 'uz' ? 'Linux xonasini yakunladingiz' : language === 'ru' ? 'Linux комната завершена' : 'Linux room completed',         locked: false },
                { icon: 'fa-trophy',       color: '#64748b', border: '#2d3d4f',   title: 'Room Master',     xp: '+1000 XP', desc: language === 'uz' ? 'Barcha 6 xonani yakunlang' : language === 'ru' ? 'Завершите все 6 комнат' : 'Complete all 6 rooms',       locked: true },
                { icon: 'fa-fire',         color: '#64748b', border: '#2d3d4f',   title: '7-Day Streak',    xp: '+300 XP', desc: language === 'uz' ? '7 kun ketma-ket kiring' : language === 'ru' ? '7 дней подряд' : '7-day consecutive login',            locked: true },
              ].map((ach, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-3.5 rounded-lg border transition-all ${ach.locked ? 'opacity-40 bg-[#0d151c]' : 'bg-[#0d151c] hover:border-[#3a4f66]'}`}
                  style={{ borderColor: ach.locked ? '#2d3d4f' : ach.border }}
                >
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${ach.color}15`, border: `1px solid ${ach.border}` }}>
                    <i className={`fa-solid ${ach.icon} text-lg`} style={{ color: ach.locked ? '#64748b' : ach.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-white">{ach.title}</h4>
                      {ach.locked && <i className="fa-solid fa-lock text-[10px] text-[#64748b]" />}
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-0.5 truncate">{ach.desc}</p>
                  </div>
                  <div className="text-xs font-bold font-mono whitespace-nowrap" style={{ color: ach.locked ? '#64748b' : ach.color }}>
                    {ach.xp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Recent Activity ─── */}
        <div className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-white font-heading">
              {language === 'uz' ? 'Faollik tarixi' : language === 'ru' ? 'История активности' : 'Recent Activity'}
            </h3>
            <button
              type="button"
              onClick={() => onSelectRoom('vulnversity')}
              className="text-xs text-[#88cc14] hover:text-[#75b310] font-bold font-mono flex items-center gap-1 transition-colors"
            >
              {language === 'uz' ? 'Barcha xonalar' : language === 'ru' ? 'Все комнаты' : 'All rooms'}
              <i className="fa-solid fa-arrow-right text-[10px]" />
            </button>
          </div>

          {recentRooms.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-rocket text-4xl text-[#2d3d4f] mb-4 block" />
              <p className="text-[#94a3b8] font-mono">
                {language === 'uz' ? 'Hali hech qanday faollik yo\'q. Birinchi xonani boshlang!' : language === 'ru' ? 'Нет активности. Начните первую комнату!' : 'No activity yet. Start your first room!'}
              </p>
              <button
                type="button"
                onClick={() => onSelectRoom('vulnversity')}
                className="btn-primary mt-4"
              >
                <i className="fa-solid fa-play" />
                {language === 'uz' ? 'Boshlash' : language === 'ru' ? 'Начать' : 'Get Started'}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRooms.map((room) => {
                const solved = room.tasks.filter(t => solvedTasks[`${room.id}_${t.id}`]).length;
                const pct = Math.round((solved / room.tasks.length) * 100);
                const isComplete = pct === 100;
                return (
                  <div
                    key={room.id}
                    onClick={() => onSelectRoom(room.id)}
                    className="flex items-center gap-4 p-3.5 rounded-lg bg-[#0d151c] border border-[#2d3d4f] hover:border-[#88cc14]/50 cursor-pointer transition-all group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#1a232c] border border-[#2d3d4f] flex items-center justify-center text-[#88cc14] shrink-0">
                      <i className={`fa-solid ${room.icon || 'fa-server'} text-sm`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-white group-hover:text-[#88cc14] transition-colors">{room.title}</span>
                        {isComplete && (
                          <span className="text-[10px] font-bold text-[#0ea5e9] bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 px-1.5 py-0.5 rounded font-mono">
                            DONE
                          </span>
                        )}
                      </div>
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div className="text-xs font-bold font-mono whitespace-nowrap" style={{ color: isComplete ? '#88cc14' : '#94a3b8' }}>
                      {solved}/{room.tasks.length} ({pct}%)
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
