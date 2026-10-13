import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const PartnershipsPage = () => {
  const { language, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    org: '',
    message: ''
  });
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status) setStatus(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', org: '', message: '' });
    }, 1200);
  };

  return (
    <section className="py-12 px-5 sm:px-8 mx-auto max-w-7xl min-h-[75vh] animate-fadeIn">
      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white font-heading">
          {t('part_title')}
        </h1>
        <p className="text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
          {t('part_desc')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Info Cards */}
        <div className="space-y-6">
          <div className="cyber-card flex gap-4 p-6">
            <div className="shrink-0 text-[#0ea5e9] text-3xl">
              <i className="fa-solid fa-building-columns"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('part_edu_t')}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{t('part_edu_d')}</p>
            </div>
          </div>

          <div className="cyber-card flex gap-4 p-6">
            <div className="shrink-0 text-[#f59e0b] text-3xl">
              <i className="fa-solid fa-briefcase"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('part_b2b_t')}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{t('part_b2b_d')}</p>
            </div>
          </div>

          <div className="cyber-card flex gap-4 border-[#0ea5e9] p-6">
            <div className="shrink-0 text-[#0ea5e9] text-3xl">
              <i className="fa-solid fa-handshake"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">{t('part_cert_t')}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{t('part_cert_d')}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="cyber-card bg-[#1a232c] p-8 shadow-2xl border border-[#2d3d4f]">
          <h3 className="text-2xl font-bold mb-6 text-white font-heading">
            {t('part_form_title')}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-1">
                {t('part_f_name')}
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="cyber-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-1">
                {t('part_f_email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="cyber-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-1">
                {t('part_f_org')}
              </label>
              <input
                type="text"
                name="org"
                value={formData.org}
                onChange={handleChange}
                className="cyber-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-1">
                {t('part_f_msg')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="cyber-input resize-none"
                rows="4"
                required
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="p-3 bg-[#88cc14]/10 border border-[#88cc14] rounded text-sm text-[#88cc14] flex items-center gap-2">
                <i className="fa-solid fa-circle-check"></i>
                <span>
                  {language === 'uz'
                    ? 'Xabar muvaffaqiyatli yuborildi!'
                    : language === 'ru'
                    ? 'Сообщение успешно отправлено!'
                    : 'Message sent successfully!'}
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary w-full mt-2 bg-[#88cc14] text-black font-bold py-3 disabled:opacity-50"
            >
              {status === 'loading'
                ? (language === 'uz' ? 'Yuborilmoqda...' : language === 'ru' ? 'Отправка...' : 'Sending...')
                : t('part_btn')}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
