import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PhoneSecurityPanel } from '../components/PhoneSecurityPanel';

const FEATURES = [
  { id: 1, icon: 'fa-shield-virus',         colorKey: '#0ea5e9', tKey: 'sec_1_t', dKey: 'sec_1_d' },
  { id: 2, icon: 'fa-lock',                  colorKey: '#88cc14', tKey: 'sec_2_t', dKey: 'sec_2_d' },
  { id: 3, icon: 'fa-shield-halved',         colorKey: '#f59e0b', tKey: 'sec_3_t', dKey: 'sec_3_d' },
  { id: 4, icon: 'fa-mobile-screen-button',  colorKey: '#a855f7', tKey: 'sec_4_t', dKey: 'sec_4_d' },
  { id: 5, icon: 'fa-eye',                   colorKey: '#0ea5e9', tKey: 'sec_5_t', dKey: 'sec_5_d' },
  { id: 6, icon: 'fa-bug-slash',             colorKey: '#88cc14', tKey: 'sec_6_t', dKey: 'sec_6_d' },
];

export const SecurityPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0d151c] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#1a232c] border-b border-[#2d3d4f] py-14 px-5 sm:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/30 px-4 py-1.5 mb-5">
            <i className="fa-solid fa-shield-halved text-[#0ea5e9] text-xs" />
            <span className="text-xs font-bold text-[#0ea5e9] uppercase tracking-wider font-mono">
              {language === 'uz' ? 'Xavfsizlik' : language === 'ru' ? 'Безопасность' : 'Security'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            {t('nav_security')}
          </h1>
          <p className="text-[#94a3b8] max-w-2xl mx-auto text-lg">{t('sec_sub')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14">
        {/* Status banner */}
        <div className="animate-borderPulse bg-[#1a232c] border border-[#88cc14] rounded-xl px-6 py-4 mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#88cc14] opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-[#88cc14]" />
            </div>
            <span className="font-bold text-white font-mono">{t('sec_status')}</span>
          </div>
          <div className="flex gap-6 font-mono text-xs">
            {[
              { label: 'Uptime', value: '99.9%', color: '#88cc14' },
              { label: 'Response', value: '< 1ms', color: '#0ea5e9' },
              { label: 'Threats blocked', value: '4.2k', color: '#f59e0b' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[#94a3b8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <PhoneSecurityPanel />

        {/* Feature cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FEATURES.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 group animate-fadeIn"
              style={{
                animationDelay: `${idx * 0.08}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = item.colorKey;
                e.currentTarget.style.boxShadow = `0 0 20px ${item.colorKey}25, 0 8px 32px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#2d3d4f';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{ background: `${item.colorKey}18`, border: `1px solid ${item.colorKey}30` }}
              >
                <i className={`fa-solid ${item.icon} text-2xl`} style={{ color: item.colorKey }} />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{t(item.tKey)}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{t(item.dKey)}</p>
            </div>
          ))}
        </div>

        {/* Compliance section */}
        <div className="bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-certificate text-[#88cc14]" />
            {language === 'uz' ? 'Standartlarga muvofiqlik' : language === 'ru' ? 'Соответствие стандартам' : 'Compliance'}
          </h3>
          <div className="flex flex-wrap gap-3">
            {['ISO 27001', 'SOC 2 Type II', 'GDPR', 'PCI DSS', 'OWASP Top 10', 'NIST CSF'].map(cert => (
              <div
                key={cert}
                className="flex items-center gap-2 bg-[#0d151c] border border-[#2d3d4f] rounded-lg px-3.5 py-2 text-sm font-mono"
              >
                <i className="fa-solid fa-check-circle text-[#88cc14] text-xs" />
                <span className="text-white font-bold">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
