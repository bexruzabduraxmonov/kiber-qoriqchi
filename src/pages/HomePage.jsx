import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';

// Animated counter hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const FeatureCard = ({ icon, color, title, desc, delay }) => (
  <div className={`cyber-card cyber-card-glow flex flex-col items-center text-center p-8 animate-fadeIn`} style={{ animationDelay: delay }}>
    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-5 text-2xl`}
      style={{ background: `${color}18`, border: `1px solid ${color}40` }}>
      <i className={`fa-solid ${icon}`} style={{ color }} />
    </div>
    <h3 className="text-lg font-bold text-white mb-3">{title}</h3>
    <p className="text-sm text-[#94a3b8] leading-relaxed">{desc}</p>
  </div>
);

const TestimonialCard = ({ letter, name, role, text, delay }) => (
  <div className={`cyber-card animate-fadeIn`} style={{ animationDelay: delay }}>
    <div className="flex items-start gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#88cc14] to-[#0ea5e9] flex items-center justify-center font-bold text-black text-sm shrink-0">
        {letter}
      </div>
      <div>
        <div className="font-bold text-sm text-white">{name}</div>
        <div className="text-xs text-[#94a3b8]">{role}</div>
      </div>
    </div>
    <div className="text-[#88cc14] mb-2">
      {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star text-xs mr-0.5" />)}
    </div>
    <p className="text-sm text-[#94a3b8] italic leading-relaxed">"{text}"</p>
  </div>
);

export const HomePage = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  const { addToCart } = useCart();
  const usersCount = useCounter(96000);
  const labsCount = useCounter(412);
  const roomsCount = useCounter(48);

  const benefits = [
    { icon: 'fa-laptop-code',    color: '#88cc14', tKey: 'ben1_title', dKey: 'ben1_desc' },
    { icon: 'fa-route',          color: '#0ea5e9', tKey: 'ben2_title', dKey: 'ben2_desc' },
    { icon: 'fa-shield-halved',  color: '#f59e0b', tKey: 'ben3_title', dKey: 'ben3_desc' },
    { icon: 'fa-cloud',          color: '#88cc14', tKey: 'ben4_title', dKey: 'ben4_desc' },
    { icon: 'fa-gamepad',        color: '#a855f7', tKey: 'ben5_title', dKey: 'ben5_desc' },
    { icon: 'fa-tags',           color: '#0ea5e9', tKey: 'ben6_title', dKey: 'ben6_desc' },
  ];

  const testimonials = [
    { letter: 'A', name: 'Aziz R.',   role: t('role_soc'), text: t('testi_1') },
    { letter: 'M', name: 'Malika S.', role: t('role_pen'), text: t('testi_2') },
    { letter: 'D', name: 'Davron B.', role: t('role_sec'), text: t('testi_3') },
    { letter: 'S', name: 'Sardor K.', role: t('role_stu'), text: t('testi_4') },
  ];

  return (
    <div className="animate-fadeIn">

      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-[#0d151c]">
        {/* Grid background */}
        <div className="absolute inset-0 hero-grid-bg opacity-60 pointer-events-none" />
        {/* Radial glow */}
        <div className="absolute inset-0 hero-radial pointer-events-none" />
        {/* Animated corner lights */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#88cc14] rounded-full filter blur-3xl opacity-[0.04] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0ea5e9] rounded-full filter blur-3xl opacity-[0.05] pointer-events-none" />

        <div className="relative mx-auto max-w-[1600px] w-full px-5 sm:px-8 py-14 lg:py-16 lg:grid lg:grid-cols-[1.45fr_0.55fr] lg:items-center lg:gap-8">
          <div className="animate-slideLeft">
            <h1
              className="hero-heading text-white"
              dangerouslySetInnerHTML={{ __html: t('hero_title') }}
            />

            <p className="mt-3 max-w-[1180px] text-[0.88rem] sm:text-[0.95rem] leading-[1.5] text-[#a7b7c5] lg:text-[1rem]">
              {t('hero_desc')}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('login', 'signup')}
                className="btn-primary text-xs sm:text-sm py-3 px-6 font-bold glow-green"
              >
                <i className="fa-solid fa-bolt mr-1" />
                <span>{language === 'uz' ? "Bepul boshlash" : language === 'ru' ? 'Начать бесплатно' : 'Start Free'}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('practice')}
                className="btn-outline text-xs sm:text-sm py-3 px-5 font-mono"
              >
                <i className="fa-solid fa-terminal mr-1" />
                <span>{language === 'uz' ? 'Laboratoriyalar' : language === 'ru' ? 'Лаборатории' : 'Explore Labs'}</span>
              </button>
            </div>
          </div>

          <div className="animate-slideRight mt-8 lg:mt-0 flex justify-center lg:justify-end w-full">
            <div className="dashboard-panel relative h-[420px] sm:h-[490px] w-full max-w-[420px] overflow-hidden rounded-[22px] border border-[#273948] bg-[#0d151c] shadow-[0_0_40px_rgba(0,0,0,0.38)]">
              <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-[#2a3c4b] bg-[#0b1218]/90 px-3">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#88cc14]" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-[#2d3d4f] bg-[#101b26] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-[#dfeaf4]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#88cc14] shadow-[0_0_12px_rgba(136,204,20,0.8)]" />
                  LIVE
                </span>
              </div>

              <div className="absolute inset-4 top-12 bottom-4 overflow-hidden rounded-[14px] border border-[#223340] bg-[radial-gradient(circle_at_top,_rgba(136,204,20,0.12),_transparent_35%),linear-gradient(180deg,#071118,#0c1820)]">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'linear-gradient(rgba(136,204,20,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(136,204,20,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
                    alt="Cybersecurity training"
                    className="h-full w-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071118] via-[#071118]/35 to-transparent" />
                </div>

                <div className="absolute left-4 right-4 top-4 rounded-2xl border border-[#2d3d4f] bg-[#0d171f]/80 p-3 backdrop-blur-sm shadow-[0_0_18px_rgba(0,0,0,0.28)]">
                  <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-[#dfeaf4]">
                    <span>CyberGuard</span>
                    <span className="rounded bg-[#88cc14]/15 px-1.5 py-0.5 font-bold text-[#88cc14]">AI</span>
                  </div>
                  <div className="space-y-2 text-[9px] text-[#9eb5c9]">
                    <div className="flex items-center justify-between rounded bg-[#101b26] px-2 py-1.5">
                      <span>Threat Scan</span>
                      <span className="text-[#88cc14]">92%</span>
                    </div>
                    <div className="flex items-center justify-between rounded bg-[#101b26] px-2 py-1.5">
                      <span>Firewall</span>
                      <span className="text-[#0ea5e9]">OK</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[#2c3f50] bg-[#0d171f]/85 p-3 shadow-[0_0_18px_rgba(0,0,0,0.45)] backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between text-[10px] font-medium text-[#dfeaf4]">
                  <span>CyberGuard</span>
                  <span className="rounded bg-[#88cc14]/15 px-1.5 py-0.5 font-bold text-[#88cc14]">AI</span>
                </div>
                <div className="space-y-2 text-[9px] text-[#9eb5c9]">
                  <div className="flex items-center justify-between rounded bg-[#101b26] px-2 py-1.5">
                    <span>Threat Scan</span>
                    <span className="text-[#88cc14]">92%</span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-[#101b26] px-2 py-1.5">
                    <span>Firewall</span>
                    <span className="text-[#0ea5e9]">OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-8 sm:py-10 px-4 sm:px-8 bg-[#1a232c] border-y border-[#2d3d4f]">
        <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
          {[
            { icon: 'fa-users', val: `${(usersCount / 1000).toFixed(0)}k+`, label: t('stat_users'), color: '#88cc14' },
            { icon: 'fa-flask',  val: labsCount,              label: t('stat_labs'),  color: '#0ea5e9' },
            { icon: 'fa-door-open', val: roomsCount,          label: language === 'uz' ? 'Xonalar' : language === 'ru' ? 'Комнаты' : 'Rooms', color: '#f59e0b' },
            { icon: 'fa-signal', val: '24/7',                 label: t('stat_uptime'), color: '#88cc14' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-3 animate-countUp p-2 rounded-xl bg-[#0d151c]/40 sm:bg-transparent" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${s.color}18`, border: `1px solid ${s.color}30` }}>
                <i className={`fa-solid ${s.icon} text-base sm:text-lg`} style={{ color: s.color }} />
              </div>
              <div className="min-w-0">
                <div className="text-xl sm:text-2xl font-bold font-mono truncate" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[10px] sm:text-xs text-[#94a3b8] uppercase tracking-wider truncate">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BENEFITS ─── */}
      <section className="bg-[#0d151c] py-24 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 px-4 py-1.5 mb-5">
              <i className="fa-solid fa-star text-[#0ea5e9] text-xs" />
              <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider font-mono">
                {language === 'uz' ? 'Nima uchun biz?' : language === 'ru' ? 'Почему мы?' : 'Why Us?'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-white font-heading mb-3">
              {t('benefits_title')}
            </h2>
            <p className="text-[#94a3b8] max-w-2xl mx-auto">
              {language === 'uz'
                ? 'Kiberxavfsizlik sohasida professional bo\'lish uchun zarur bo\'lgan barcha vositalar bitta platformada.'
                : language === 'ru'
                ? 'Все инструменты для становления профессионалом в кибербезопасности на одной платформе.'
                : 'Everything you need to become a cybersecurity professional, all in one platform.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FeatureCard
                key={i}
                icon={b.icon}
                color={b.color}
                title={t(b.tKey)}
                desc={t(b.dKey)}
                delay={`${i * 0.08}s`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-5 sm:px-8 bg-[#1a232c] border-y border-[#2d3d4f]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
              {language === 'uz' ? 'Qanday ishlaydi?' : language === 'ru' ? 'Как это работает?' : 'How it Works'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-[#2d3d4f] to-transparent" />

            {[
              { step: '01', icon: 'fa-user-plus',   color: '#88cc14', title: language === 'uz' ? 'Ro\'yxatdan o\'t' : language === 'ru' ? 'Зарегистрируйся' : 'Sign Up' , desc: language === 'uz' ? 'Bepul akkaunt oching va platformaga kiring' : language === 'ru' ? 'Создайте бесплатный аккаунт' : 'Create a free account and get started' },
              { step: '02', icon: 'fa-flask',        color: '#0ea5e9', title: language === 'uz' ? 'Xona tanlang' : language === 'ru' ? 'Выберите комнату' : 'Pick a Room',   desc: language === 'uz' ? 'Qiziqarli va ta\'limiy virtual xonalarni tanlang' : language === 'ru' ? 'Выберите интересную виртуальную комнату' : 'Choose from guided or challenge rooms' },
              { step: '03', icon: 'fa-trophy',       color: '#f59e0b', title: language === 'uz' ? 'XP yig\'ing' : language === 'ru' ? 'Зарабатывайте XP' : 'Earn XP',        desc: language === 'uz' ? 'Topshiriqlarni bajaring, XP yig\'ing va sertifikat oling' : language === 'ru' ? 'Выполняйте задания, зарабатывайте XP и сертификаты' : 'Complete tasks, earn XP and certificates' },
            ].map((s, i) => (
              <div key={i} className="relative flex flex-col items-center text-center animate-fadeIn" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 relative"
                  style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                  <i className={`fa-solid ${s.icon} text-3xl`} style={{ color: s.color }} />
                  <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#1a232c] border-2 flex items-center justify-center text-xs font-bold font-mono"
                    style={{ borderColor: s.color, color: s.color }}>
                    {s.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-sm text-[#94a3b8] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BIG STAT BANNER ─── */}
      <section className="py-28 px-5 sm:px-8 bg-[#0d151c] relative overflow-hidden">
        <div className="absolute inset-0 hero-radial pointer-events-none" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="text-5xl sm:text-7xl lg:text-8xl font-bold font-mono mb-4 gradient-text text-glow-green">
            {t('stat_banner_num')}
          </div>
          <p className="text-lg sm:text-2xl text-[#94a3b8] max-w-2xl mx-auto px-4">
            {t('stat_banner_text')}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className="mt-10 btn-primary text-base py-4 px-10 font-bold glow-green"
          >
            <i className="fa-solid fa-arrow-right" />
            {language === 'uz' ? 'Hoziroq boshlang' : language === 'ru' ? 'Начать сейчас' : 'Start Now'}
          </button>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-5 sm:px-8 bg-[#1a232c] border-t border-[#2d3d4f]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading mb-3">
              {t('testi_title')}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {testimonials.map((tm, i) => (
              <TestimonialCard key={i} {...tm} delay={`${i * 0.1}s`} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── B2B / CONTACT ─── */}
      <section className="py-24 px-5 sm:px-8 bg-[#0d151c] border-t border-[#2d3d4f]">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white font-heading mb-3">
              {language === 'uz' ? 'Korporativ hamkorlik' : language === 'ru' ? 'Корпоративное партнёрство' : 'Corporate Partnership'}
            </h2>
            <p className="text-[#94a3b8] max-w-xl mx-auto">
              {language === 'uz'
                ? 'Kompaniyangiz va universitetingiz uchun maxsus kiberxavfsizlik o\'quv dasturi.'
                : language === 'ru'
                ? 'Специальная программа обучения кибербезопасности для компаний и университетов.'
                : 'Custom cybersecurity training programs for companies and universities.'}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              { icon: 'fa-building', color: '#0ea5e9', title: t('b2b_team_title'), desc: t('b2b_team_desc'), email: 'b2b@cybershield.academy' },
              { icon: 'fa-graduation-cap', color: '#88cc14', title: t('b2b_edu_title'), desc: t('b2b_edu_desc'), email: 'edu@cybershield.academy' },
            ].map((c, i) => (
              <div key={i} className="cyber-card cyber-card-cyan relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-3xl opacity-5 pointer-events-none"
                  style={{ background: c.color }} />
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${c.color}18`, border: `1px solid ${c.color}30` }}>
                    <i className={`fa-solid ${c.icon} text-xl`} style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{c.title}</h3>
                    <p className="text-sm text-[#94a3b8] leading-relaxed">{c.desc}</p>
                  </div>
                </div>
                <a href={`mailto:${c.email}`} className="btn-outline w-full text-center block mt-4 hover:border-[#88cc14] hover:text-[#88cc14]">
                  <i className="fa-solid fa-envelope" />
                  {t('btn_contact')}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
