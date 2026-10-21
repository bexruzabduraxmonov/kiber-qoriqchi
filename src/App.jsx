import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { PathsPage } from './pages/PathsPage';
import { PracticePage } from './pages/PracticePage';
import { LabRoomPage } from './pages/LabRoomPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { SecurityPage } from './pages/SecurityPage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { PartnershipsPage } from './pages/PartnershipsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { PitchDeckPage } from './pages/PitchDeckPage';
import { ApkQoriqchiPage } from './pages/ApkQoriqchiPage';

function MainApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [historyStack, setHistoryStack] = useState(['home']);
  const [selectedRoomId, setSelectedRoomId] = useState('vulnversity');
  const [authTab, setAuthTab] = useState('signup');

  const navigate = (page, extra = null, addToHistory = true) => {
    if (page === 'login') {
      if (extra === 'signup' || extra === 'login') {
        setAuthTab(extra);
      }
    }
    if (addToHistory && historyStack[historyStack.length - 1] !== page) {
      setHistoryStack(prev => [...prev, page]);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (historyStack.length > 1) {
      const newStack = [...historyStack];
      newStack.pop(); // remove current
      const prevPage = newStack[newStack.length - 1];
      setHistoryStack(newStack);
      setCurrentPage(prevPage);
    } else {
      setCurrentPage('practice');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const applyHash = () => {
      const hash = (window.location.hash || '').replace(/^#/, '');
      if (hash === 'phone-scan' || hash === 'security') {
        if (hash === 'phone-scan') {
          sessionStorage.setItem('cybershield_autostart_phone_scan', '1');
        }
        setCurrentPage('security');
        setHistoryStack((prev) => (prev[prev.length - 1] === 'security' ? prev : [...prev, 'security']));
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleSelectRoom = (roomId) => {
    setSelectedRoomId(roomId);
    navigate('lab_room');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d151c] text-white selection:bg-[#0ea5e9] selection:text-black">
      <Navbar currentPage={currentPage} onNavigate={navigate} />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage onNavigate={navigate} />}
        {currentPage === 'paths' && <PathsPage onNavigate={navigate} />}
        {currentPage === 'practice' && <PracticePage onSelectRoom={handleSelectRoom} />}
        {currentPage === 'lab_room' && <LabRoomPage roomId={selectedRoomId} onBack={handleBack} />}
        {currentPage === 'leaderboard' && <LeaderboardPage onNavigate={navigate} />}
        {currentPage === 'security' && <SecurityPage />}
        {currentPage === 'casestudy' && <CaseStudyPage onSelectRoom={handleSelectRoom} />}
        {currentPage === 'partnerships' && <PartnershipsPage />}
        {currentPage === 'pitch' && <PitchDeckPage onNavigate={navigate} />}
        {currentPage === 'apk_qoriqchi' && <ApkQoriqchiPage onNavigate={navigate} />}
        {currentPage === 'dashboard' && <DashboardPage onSelectRoom={handleSelectRoom} onNavigate={navigate} />}
        {currentPage === 'login' && <LoginPage onNavigate={navigate} initialTab={authTab} />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <MainApp />
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
