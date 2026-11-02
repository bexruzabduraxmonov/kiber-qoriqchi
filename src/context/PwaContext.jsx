import React, { createContext, useContext, useState, useEffect } from 'react';

const PwaContext = createContext();

export const PwaProvider = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    // Check if already in standalone / installed mode
    const checkInstalled = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://');
      setIsInstalled(!!isStandalone);
    };

    checkInstalled();
    window.matchMedia('(display-mode: standalone)').addEventListener('change', checkInstalled);

    // Detect OS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIOSDevice = /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroidDevice = /android/.test(ua);
    setIsIOS(isIOSDevice);
    setIsAndroid(isAndroidDevice);

    // Catch browser install prompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Check if appinstalled event fired
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowModal(false);
      console.log('KiberQo\'riqchi ilovasi muvaffaqiyatli o\'rnatildi!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if user previously dismissed banner in this session
    if (sessionStorage.getItem('kiberqoriqchi_pwa_banner_dismissed') === '1') {
      setBannerDismissed(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const installApp = async () => {
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('Foydalanuvchi ilovani o\'rnatishni tasdiqladi');
          setDeferredPrompt(null);
          setShowModal(false);
        } else {
          console.log('Foydalanuvchi ilovani o\'rnatishni bekor qildi');
        }
      } catch (err) {
        console.error('Install prompt error:', err);
        setShowModal(true);
      }
    } else {
      // If no native prompt (iOS or already prompted or unsupported browser), show guided modal
      setShowModal(true);
    }
  };

  const dismissBanner = () => {
    setBannerDismissed(true);
    sessionStorage.setItem('kiberqoriqchi_pwa_banner_dismissed', '1');
  };

  const showInstallBanner = !isInstalled && !bannerDismissed;

  return (
    <PwaContext.Provider
      value={{
        isInstallable: !!deferredPrompt || isIOS,
        isInstalled,
        isIOS,
        isAndroid,
        showModal,
        setShowModal,
        installApp,
        showInstallBanner,
        dismissBanner,
        hasNativePrompt: !!deferredPrompt
      }}
    >
      {children}
    </PwaContext.Provider>
  );
};

export const usePwa = () => {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used within a PwaProvider');
  }
  return context;
};
