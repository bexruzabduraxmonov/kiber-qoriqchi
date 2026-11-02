import React from 'react';
import { usePwa } from '../context/PwaContext';
import { useLanguage } from '../context/LanguageContext';

export const InstallModal = () => {
  const { showModal, setShowModal, installApp, isIOS, isAndroid, hasNativePrompt, isInstalled } = usePwa();
  const { language } = useLanguage();

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-2xl border border-[#2d3d4f] bg-[#0f1722] p-6 shadow-2xl text-white overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#88cc14]/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#0ea5e9]/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-[#94a3b8] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-[#1a2535]"
          aria-label="Yopish"
        >
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        {/* Header with App Icon */}
        <div className="flex items-center gap-4 mb-5">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#0d151c] border-2 border-[#88cc14] shadow-[0_0_20px_rgba(136,204,20,0.3)]">
            <img src="/logo-cybershield-badge.svg" alt="KiberQo'riqchi" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white">KiberQo'riqchi</h3>
              <span className="rounded bg-[#88cc14]/20 border border-[#88cc14]/40 px-2 py-0.5 text-[10px] font-mono font-bold text-[#88cc14]">
                PWA IL действительный
              </span>
            </div>
            <p className="text-xs text-[#94a3b8]">
              {language === 'ru' 
                ? 'Мобильное приложение для кибербезопасности' 
                : language === 'en'
                ? 'Mobile Cybersecurity App'
                : 'Kiberxavfsizlik mobil ilovasi'}
            </p>
          </div>
        </div>

        {/* Already installed case */}
        {isInstalled ? (
          <div className="text-center py-4 space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#88cc14]/20 text-[#88cc14] flex items-center justify-center text-xl">
              <i className="fa-solid fa-check"></i>
            </div>
            <p className="text-sm font-medium text-[#88cc14]">
              {language === 'ru' 
                ? 'Приложение уже установлено на вашем устройстве!' 
                : 'Ilova telefoningizga muvaffaqiyatli o\'rnatilgan!'}
            </p>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#1a2535] text-white hover:bg-[#243347] transition-colors font-medium text-sm"
            >
              {language === 'ru' ? 'Закрыть' : 'Tushunarli'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Features preview */}
            <div className="grid grid-cols-3 gap-2 py-3 border-y border-[#223548] text-center">
              <div className="p-2 rounded-lg bg-[#141e2b]">
                <i className="fa-solid fa-bolt text-[#88cc14] mb-1 block text-sm"></i>
                <span className="text-[11px] text-[#94a3b8] font-medium leading-tight block">Tezkor start</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141e2b]">
                <i className="fa-solid fa-wifi text-[#0ea5e9] mb-1 block text-sm"></i>
                <span className="text-[11px] text-[#94a3b8] font-medium leading-tight block">Oflayn rejim</span>
              </div>
              <div className="p-2 rounded-lg bg-[#141e2b]">
                <i className="fa-solid fa-mobile-screen-button text-[#a855f7] mb-1 block text-sm"></i>
                <span className="text-[11px] text-[#94a3b8] font-medium leading-tight block">To'liq ekran</span>
              </div>
            </div>

            {/* Instruction depending on platform */}
            {hasNativePrompt ? (
              <div className="space-y-3 pt-1">
                <p className="text-xs text-[#94a3b8] leading-relaxed">
                  Ilovani to'g'ridan-to'g'ri telefoningizga o'rnatish uchun quyidagi tugmani bosing:
                </p>
                <button
                  type="button"
                  onClick={installApp}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#88cc14] to-[#6bb50d] text-[#0d151c] font-black uppercase text-xs tracking-wider shadow-[0_0_20px_rgba(136,204,20,0.35)] hover:shadow-[0_0_25px_rgba(136,204,20,0.5)] transition-all"
                >
                  <i className="fa-solid fa-download text-sm"></i>
                  <span>Ilovani hozir o'rnatish</span>
                </button>
              </div>
            ) : isIOS ? (
              <div className="space-y-3 pt-1">
                <div className="text-xs font-semibold text-[#88cc14] flex items-center gap-1.5">
                  <i className="fa-brands fa-apple text-sm"></i>
                  <span>iPhone / iPad (Safari) da o'rnatish yo'riqnomasi:</span>
                </div>
                <div className="space-y-2 bg-[#141f2d] p-3 rounded-xl border border-[#223548] text-xs text-[#cbd5e1]">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">1</span>
                    <span>Pastdagi Safari menyusida <strong>"Ulashish"</strong> (<i className="fa-solid fa-arrow-up-from-bracket text-[#0ea5e9]"></i> Share) belgisini bosing.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">2</span>
                    <span>Ro'yxatdan pastga surib, <strong>"Bosh ekranga qo'shish"</strong> (<i className="fa-regular fa-square-plus text-[#88cc14]"></i> Add to Home Screen) ni tanlang.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">3</span>
                    <span>Yuqori o'ng burchakdagi <strong>"Qo'shish"</strong> (Add) tugmasini bosing!</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <div className="text-xs font-semibold text-[#88cc14] flex items-center gap-1.5">
                  <i className="fa-brands fa-android text-sm"></i>
                  <span>Android / Chrome brauzerida o'rnatish:</span>
                </div>
                <div className="space-y-2 bg-[#141f2d] p-3 rounded-xl border border-[#223548] text-xs text-[#cbd5e1]">
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">1</span>
                    <span>Brauzeringizning yuqori yoki pastki qismidagi <strong>3 ta nuqta (⋮)</strong> menyusini bosing.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">2</span>
                    <span><strong>"Ilovani o'rnatish"</strong> (yoki "Bosh ekranga qo'shish" / "Установить приложение") ni tanlang.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#88cc14]/20 text-[10px] font-bold text-[#88cc14]">3</span>
                    <span>Chiqgan oynada <strong>"O'rnatish"</strong> ni bosing. Ilova telefon menyusiga tushadi!</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={installApp}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#1d2a3a] text-white hover:bg-[#25364a] border border-[#2d4056] text-xs font-medium transition-all"
                >
                  <i className="fa-solid fa-rotate-right text-xs"></i>
                  <span>Qayta urinib ko'rish</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
