import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    color: '#0ea5e9',
    popular: false,
    featKeys: ['price_f_basic', 'price_f_forum', 'price_f_lim'],
    icon: 'fa-door-open',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$14',
    color: '#88cc14',
    popular: true,
    featKeys: ['price_f_all', 'price_f_vip', 'price_f_fast', 'price_f_cert'],
    icon: 'fa-bolt',
  },
  {
    id: 'team',
    name: 'Team',
    price: '$49',
    color: '#f59e0b',
    popular: false,
    featKeys: ['price_f_all', 'price_f_vip', 'price_f_api', 'price_f_dash'],
    icon: 'fa-users',
  },
];

export const PricingPage = ({ onNavigate }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0d151c] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#1a232c] border-b border-[#2d3d4f] py-14 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#88cc14]/10 border border-[#88cc14]/30 px-4 py-1.5 mb-5">
            <i className="fa-solid fa-tag text-[#88cc14] text-xs" />
            <span className="text-xs font-bold text-[#88cc14] uppercase tracking-wider font-mono">
              {language === 'uz' ? 'Tariflar' : language === 'ru' ? 'Тарифы' : 'Pricing'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white font-heading mb-4">
            {t('nav_pricing')}
          </h1>
          <p className="text-[#94a3b8] max-w-xl mx-auto text-lg">{t('price_sub')}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2"
              style={{
                background: plan.popular
                  ? `linear-gradient(135deg, #1e2d1e 0%, #1a232c 100%)`
                  : '#1a232c',
                border: `1px solid ${plan.popular ? plan.color : '#2d3d4f'}`,
                boxShadow: plan.popular ? `0 0 30px ${plan.color}25` : 'none',
              }}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: `linear-gradient(90deg, ${plan.color}, ${plan.color}80)` }} />
              )}
              {plan.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2">
                  <div className="bg-[#88cc14] text-black px-4 py-1 text-xs font-bold uppercase tracking-wider font-mono rounded-b-lg shadow-lg">
                    {t('price_popular')}
                  </div>
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Plan header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${plan.color}18`, border: `1px solid ${plan.color}30` }}>
                    <i className={`fa-solid ${plan.icon} text-xl`} style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>

                {/* Price */}
                <div className="flex items-end gap-1 mb-8">
                  <span className="text-5xl font-bold font-mono text-white">{plan.price}</span>
                  <span className="text-[#94a3b8] mb-2 font-mono">/{t('price_month')}</span>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-4 mb-8">
                  {plan.featKeys.map((key, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}>
                        <i className="fa-solid fa-check text-[10px]" style={{ color: plan.color }} />
                      </div>
                      <span className="text-sm text-[#94a3b8] leading-relaxed">{t(key)}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  type="button"
                  onClick={() => onNavigate('login')}
                  className={`w-full py-3.5 rounded-lg font-bold text-sm transition-all ${
                    plan.popular
                      ? 'glow-green'
                      : 'hover:opacity-90'
                  }`}
                  style={{
                    background: plan.popular ? plan.color : 'transparent',
                    color: plan.popular ? '#0d151c' : plan.color,
                    border: plan.popular ? 'none' : `1px solid ${plan.color}`,
                  }}
                >
                  {plan.id === 'free'
                    ? (language === 'uz' ? 'Bepul boshlang' : language === 'ru' ? 'Начать бесплатно' : 'Start Free')
                    : t('btn_subscribe')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ / Note */}
        <div className="mt-14 bg-[#1a232c] border border-[#2d3d4f] rounded-xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <i className="fa-solid fa-circle-question text-[#0ea5e9]" />
            {language === 'uz' ? 'Ko\'p so\'raladigan savollar' : language === 'ru' ? 'Часто задаваемые вопросы' : 'FAQ'}
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                q: language === 'uz' ? 'Karta kerakmi?' : language === 'ru' ? 'Нужна ли карта?' : 'Do I need a credit card?',
                a: language === 'uz' ? 'Bepul tarifda karta kerak emas.' : language === 'ru' ? 'Для бесплатного тарифа карта не нужна.' : 'No card required for the free plan.',
              },
              {
                q: language === 'uz' ? 'Bekor qilish mumkinmi?' : language === 'ru' ? 'Можно ли отменить?' : 'Can I cancel anytime?',
                a: language === 'uz' ? 'Ha, istalgan vaqtda obunani bekor qilishingiz mumkin.' : language === 'ru' ? 'Да, подписку можно отменить в любое время.' : 'Yes, cancel anytime with no penalty.',
              },
              {
                q: language === 'uz' ? 'Sertifikat beriladimi?' : language === 'ru' ? 'Даётся ли сертификат?' : 'Do I get a certificate?',
                a: language === 'uz' ? 'Pro va Team tarifda to\'liq sertifikat.' : language === 'ru' ? 'В тарифах Pro и Team есть полный сертификат.' : 'Pro and Team plans include full certificates.',
              },
              {
                q: language === 'uz' ? 'Guruh chegirmasi bormi?' : language === 'ru' ? 'Есть ли скидка для групп?' : 'Team discounts available?',
                a: language === 'uz' ? '10+ kishi uchun maxsus narxlar mavjud.' : language === 'ru' ? 'Специальные цены для групп от 10 человек.' : 'Special pricing for 10+ members.',
              },
            ].map((faq, i) => (
              <div key={i} className="space-y-1">
                <p className="text-sm font-bold text-white">{faq.q}</p>
                <p className="text-sm text-[#94a3b8]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
