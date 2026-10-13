import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';

export const LoginPage = ({ onNavigate, initialTab = 'signup' }) => {
  const { language, t } = useLanguage();
  const { registerUser, loginUser } = useUser();

  const [activeTab, setActiveTab] = useState(initialTab || 'signup'); // 'login' | 'signup'
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [handleCustomized, setHandleCustomized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedbackMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      if (activeTab === 'signup') {
        const finalName = name.trim();
        const finalHandle = handle.trim() ? handle.trim().replace(/^@/, '') : finalName.toLowerCase().replace(/\s+/g, '_') || 'cyber_user';
        registerUser({
          name: finalName,
          handle: finalHandle,
          email: email.trim(),
        });
      } else {
        loginUser({
          email: email.trim(),
          name: name.trim(),
        });
      }
      
      const successText = language === 'uz'
        ? (activeTab === 'signup' ? "Ro'yxatdan muvaffaqiyatli o'tdingiz!" : "Tizimga muvaffaqiyatli kirdingiz!")
        : language === 'ru'
        ? (activeTab === 'signup' ? "Вы успешно зарегистрировались!" : "Успешный вход в систему!")
        : (activeTab === 'signup' ? "Successfully registered!" : "Login successful!");
      
      setFeedbackMsg(successText);

      setTimeout(() => {
        onNavigate('dashboard');
      }, 900);
    }, 900);
  };

  return (
    <section className="py-12 px-5 sm:px-8 mx-auto max-w-5xl flex items-center min-h-[75vh] animate-fadeIn">
      <div className="w-full grid lg:grid-cols-2 gap-12 bg-[#1a232c] rounded-xl border border-[#2d3d4f] overflow-hidden shadow-2xl">
        {/* Form Side */}
        <div className="p-8 sm:p-12">
          <div className="flex gap-6 border-b border-[#2d3d4f] mb-8">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setFeedbackMsg(null); }}
              className={`pb-3 text-lg font-bold border-b-2 transition-colors ${
                activeTab === 'login'
                  ? 'border-[#f59e0b] text-white'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              {t('tab_login')}
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('signup'); setFeedbackMsg(null); }}
              className={`pb-3 text-lg font-bold border-b-2 transition-colors ${
                activeTab === 'signup'
                  ? 'border-[#f59e0b] text-white'
                  : 'border-transparent text-[#94a3b8] hover:text-white'
              }`}
            >
              {t('tab_signup')}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {activeTab === 'signup' && (
              <>
                <div className="animate-fadeIn">
                  <label className="block text-sm font-mono text-[#94a3b8] mb-2">
                    {t('form_name')} <span className="text-[#88cc14]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      const val = e.target.value;
                      setName(val);
                      if (!handleCustomized) {
                        setHandle(val.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, ''));
                      }
                    }}
                    className="cyber-input"
                    placeholder={language === 'uz' ? "Ismingizni kiriting" : language === 'ru' ? "Введите ваше имя" : "Enter your name"}
                    required
                  />
                </div>

                <div className="animate-fadeIn">
                  <label className="block text-sm font-mono text-[#94a3b8] mb-2 flex items-center justify-between">
                    <span>{language === 'uz' ? "Taxallus (Username)" : language === 'ru' ? "Никнейм (Username)" : "Username / Handle"}</span>
                    <span className="text-[11px] text-[#64748b] font-normal">
                      {language === 'uz' ? "(profilingiz uchun)" : language === 'ru' ? "(для профиля)" : "(for profile)"}
                    </span>
                  </label>
                  <div className="flex rounded-lg overflow-hidden border border-[#2d3d4f] focus-within:border-[#88cc14] focus-within:ring-2 focus-within:ring-[#88cc14]/20 transition-all bg-[#0d151c]">
                    <span className="inline-flex items-center px-3.5 bg-[#24303c] border-r border-[#2d3d4f] text-[#88cc14] font-mono font-bold text-sm select-none">
                      @
                    </span>
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => {
                        setHandleCustomized(true);
                        setHandle(e.target.value.replace(/^@/, '').replace(/[^a-zA-Z0-9_]/g, ''));
                      }}
                      className="w-full bg-transparent px-3.5 py-3 text-white font-mono text-sm placeholder-[#64748b] focus:outline-none"
                      placeholder={language === 'uz' ? "taxallus (masalan: ninja)" : language === 'ru' ? "никнейм" : "username"}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-2">
                {t('form_email')} <span className="text-[#88cc14]">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cyber-input"
                placeholder={t('form_email_ph')}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-[#94a3b8] mb-2">
                {t('form_pass')} <span className="text-[#88cc14]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="cyber-input pr-11"
                  placeholder={t('form_pass_ph')}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94a3b8] hover:text-white text-sm p-1 focus:outline-none transition-colors"
                  title={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
            </div>

            {feedbackMsg && (
              <div className="p-3 bg-[#88cc14]/15 border border-[#88cc14] rounded text-sm text-[#88cc14] flex items-center gap-2 animate-fadeIn">
                <i className="fa-solid fa-circle-check"></i>
                <span>{feedbackMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mt-4 bg-[#88cc14] text-black font-bold py-3 text-base shadow-lg shadow-[#88cc14]/20 disabled:opacity-50 glow-green"
            >
              {isLoading
                ? (language === 'uz' ? "Tekshirilmoqda..." : language === 'ru' ? "Проверка..." : "Checking...")
                : (activeTab === 'login' ? t('btn_login_submit') : t('btn_signup_submit'))}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-center text-xs text-[#88cc14] bg-[#24303c] p-3.5 rounded border border-[#2d3d4f]">
            <i className="fa-solid fa-shield-halved text-sm text-[#88cc14]"></i>
            <span>
              {language === 'uz'
                ? "Ro'yxatdan o'tgach, natijalaringiz va shaxsiy sertifikatingiz darhol profilingizda aks etadi."
                : language === 'ru'
                ? "После регистрации ваш прогресс и сертификат сразу появятся в профиле."
                : "After registering, your progress and certificate will immediately appear in your profile."}
            </span>
          </div>
        </div>

        {/* Benefits Side */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#24303c] to-[#1a232c] border-l border-[#2d3d4f] hidden lg:flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-6 text-white font-heading">
            {t('login_why_title')}
          </h3>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <i className="fa-solid fa-server text-[#0ea5e9] mt-1 text-xl"></i>
              <div>
                <h4 className="font-bold text-white text-base">
                  {t('login_b1_t')}
                </h4>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  {t('login_b1_d')}
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <i className="fa-solid fa-map-location-dot text-[#0ea5e9] mt-1 text-xl"></i>
              <div>
                <h4 className="font-bold text-white text-base">
                  {t('login_b2_t')}
                </h4>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  {t('login_b2_d')}
                </p>
              </div>
            </li>
            <li className="flex gap-4 items-start">
              <i className="fa-solid fa-trophy text-[#0ea5e9] mt-1 text-xl"></i>
              <div>
                <h4 className="font-bold text-white text-base">
                  {t('login_b3_t')}
                </h4>
                <p className="text-sm text-[#94a3b8] mt-1 leading-relaxed">
                  {t('login_b3_d')}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
