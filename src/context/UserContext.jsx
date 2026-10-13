import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { roomsData } from '../data/roomsData';
import { soundFx } from '../utils/soundEffects';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('cybershield_logged_in') === 'true';
  });

  const [userName, setUserName] = useState(() => {
    const loggedIn = localStorage.getItem('cybershield_logged_in') === 'true';
    if (!loggedIn) return '';
    return localStorage.getItem('cybershield_username') || '';
  });

  const [userHandle, setUserHandle] = useState(() => {
    const loggedIn = localStorage.getItem('cybershield_logged_in') === 'true';
    if (!loggedIn) return '';
    return localStorage.getItem('cybershield_userhandle') || '';
  });

  const [userEmail, setUserEmail] = useState(() => {
    const loggedIn = localStorage.getItem('cybershield_logged_in') === 'true';
    if (!loggedIn) return '';
    return localStorage.getItem('cybershield_email') || '';
  });

  const [userXp, setUserXp] = useState(() => {
    const saved = localStorage.getItem('cybershield_xp');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('cybershield_streak');
    return saved !== null ? parseInt(saved, 10) : 1;
  });

  const getUserTier = (xp = userXp, lang = 'uz') => {
    if (xp >= 500) {
      return lang === 'uz' ? 'Oltin Daraja' : lang === 'ru' ? 'Золотой уровень' : 'Gold Tier';
    }
    if (xp >= 200) {
      return lang === 'uz' ? 'Kumush Daraja' : lang === 'ru' ? 'Серебряный уровень' : 'Silver Tier';
    }
    return lang === 'uz' ? "Boshlang'ich" : lang === 'ru' ? 'Начальный уровень' : 'Bronze Tier';
  };

  const registerUser = ({ name, handle, email }) => {
    const cleanName = (name || '').trim();
    const cleanHandle = (handle || cleanName.toLowerCase().replace(/\s+/g, '_') || 'cyber_user').trim().replace(/^@/, '');
    const cleanEmail = (email || '').trim();

    setUserName(cleanName);
    setUserHandle(cleanHandle);
    setUserEmail(cleanEmail);
    setIsLoggedIn(true);
    setStreak(1);

    localStorage.setItem('cybershield_username', cleanName);
    localStorage.setItem('cybershield_userhandle', cleanHandle);
    localStorage.setItem('cybershield_email', cleanEmail);
    localStorage.setItem('cybershield_logged_in', 'true');
    localStorage.setItem('cybershield_streak', '1');

    try {
      const players = JSON.parse(localStorage.getItem('cybershield_registered_players') || '[]');
      const filtered = players.filter(p => p.name !== cleanName && p.handle !== cleanHandle);
      filtered.push({
        id: Date.now(),
        name: cleanName,
        handle: cleanHandle,
        flag: '🇺🇿',
        score: userXp || 0,
        letter: cleanName.charAt(0).toUpperCase()
      });
      localStorage.setItem('cybershield_registered_players', JSON.stringify(filtered));
    } catch {
      // ignore localStorage errors
    }
  };

  const loginUser = ({ email, name }) => {
    const cleanEmail = (email || '').trim();
    const savedName = localStorage.getItem('cybershield_username');
    const savedHandle = localStorage.getItem('cybershield_userhandle');

    let finalName = (name || '').trim() || savedName;
    if (!finalName && cleanEmail) {
      const prefix = cleanEmail.split('@')[0] || 'User';
      finalName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }
    if (!finalName) finalName = 'Foydalanuvchi';

    let finalHandle = savedHandle || (finalName.toLowerCase().replace(/\s+/g, '_'));

    setUserName(finalName);
    setUserHandle(finalHandle);
    setUserEmail(cleanEmail);
    setIsLoggedIn(true);

    localStorage.setItem('cybershield_username', finalName);
    localStorage.setItem('cybershield_userhandle', finalHandle);
    localStorage.setItem('cybershield_email', cleanEmail);
    localStorage.setItem('cybershield_logged_in', 'true');

    try {
      const players = JSON.parse(localStorage.getItem('cybershield_registered_players') || '[]');
      const exists = players.some(p => p.name === finalName);
      if (!exists) {
        players.push({
          id: Date.now(),
          name: finalName,
          handle: finalHandle,
          flag: '🇺🇿',
          score: userXp || 0,
          letter: finalName.charAt(0).toUpperCase()
        });
        localStorage.setItem('cybershield_registered_players', JSON.stringify(players));
      }
    } catch {
      // ignore
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setUserHandle('');
    localStorage.setItem('cybershield_logged_in', 'false');
  };

  // Map of solved task IDs: { 'vulnversity_1': true, ... }
  const [solvedTasks, setSolvedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('cybershield_solved_tasks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem('cybershield_xp', userXp.toString());
  }, [userXp]);

  useEffect(() => {
    localStorage.setItem('cybershield_solved_tasks', JSON.stringify(solvedTasks));
  }, [solvedTasks]);

  // Calculate completed rooms (where all 3 tasks are solved)
  const completedRoomsCount = Object.keys(roomsData).filter(roomId => {
    const room = roomsData[roomId];
    return room.tasks.every(t => solvedTasks[`${roomId}_${t.id}`]);
  }).length;

  const totalTasks = 18;
  const totalSolvedCount = Object.keys(solvedTasks).length;
  const progressPercent = Math.min(100, Math.round((totalSolvedCount / totalTasks) * 100));

  const submitFlag = (roomId, taskId, answer, lang = 'uz') => {
    const room = roomsData[roomId];
    if (!room) return { success: false, message: 'Room not found' };

    const task = room.tasks.find(t => t.id === taskId);
    if (!task) return { success: false, message: 'Task not found' };

    const taskKey = `${roomId}_${taskId}`;
    const cleanInput = (answer || '').trim().toLowerCase();
    const cleanTarget = task.ans.trim().toLowerCase();

    if (cleanInput === cleanTarget) {
      if (!solvedTasks[taskKey]) {
        setSolvedTasks(prev => ({ ...prev, [taskKey]: true }));
        setUserXp(prev => prev + 50);

        try {
          soundFx.playSuccess();
        } catch {
          // ignore audio error
        }

        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#88cc14', '#0ea5e9', '#f59e0b']
          });
        } catch {
          // ignore if canvas not supported
        }

        const msg = lang === 'uz' ? "To'g'ri javob! +50 XP" : lang === 'ru' ? "Правильный ответ! +50 XP" : "Correct answer! +50 XP";
        return { success: true, message: msg, alreadySolved: false };
      }

      soundFx.playClick();
      const msg = lang === 'uz' ? "Allaqachon yechilgan!" : lang === 'ru' ? "Уже решено!" : "Already solved!";
      return { success: true, message: msg, alreadySolved: true };
    }

    soundFx.playError();
    const errorMsg = lang === 'uz' ? "Noto'g'ri javob, qayta urinib ko'ring." : lang === 'ru' ? "Неправильный ответ, попробуйте еще раз." : "Incorrect answer, try again.";
    return { success: false, message: errorMsg };
  };

  const generateAndDownloadCertificate = (lang = 'uz') => {
    if (!isLoggedIn || !userName) {
      soundFx.playError();
      const alertMsg = lang === 'uz'
        ? "Sertifikat olish uchun avval ro'yxatdan o'ting!"
        : lang === 'ru'
        ? "Для получения сертификата сначала зарегистрируйтесь!"
        : "Please register first to obtain a certificate!";
      alert(alertMsg);
      return false;
    }

    soundFx.playLevelUp();

    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#0B1220';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle dark gradient background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, '#0d151c');
    bgGrad.addColorStop(0.5, '#121e29');
    bgGrad.addColorStop(1, '#0d151c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Double Borders
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 12;
    ctx.strokeRect(25, 25, canvas.width - 50, canvas.height - 50);

    ctx.strokeStyle = '#88cc14';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 45, canvas.width - 90, canvas.height - 90);

    // Corner decorative accents
    ctx.fillStyle = '#88cc14';
    const corners = [
      [25, 25],
      [canvas.width - 25, 25],
      [25, canvas.height - 25],
      [canvas.width - 25, canvas.height - 25]
    ];
    corners.forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.textAlign = 'center';

    // Logo / Brand
    ctx.fillStyle = '#88cc14';
    ctx.font = 'bold 36px "Space Grotesk", Ubuntu, sans-serif';
    ctx.fillText('🛡️ CyberGuard AI', canvas.width / 2, 110);

    // Certificate Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px "Space Grotesk", Ubuntu, sans-serif';
    const certTitle = lang === 'uz' ? "Muvaffaqiyat Sertifikati" : lang === 'ru' ? "Сертификат об успешном окончании" : "Certificate of Achievement";
    ctx.fillText(certTitle, canvas.width / 2, 210);

    // Subtitle
    ctx.fillStyle = '#94a3b8';
    ctx.font = '22px "Ubuntu Mono", monospace';
    const certSub = lang === 'uz' ? "Ushbu sertifikat tasdiqlaydiki," : lang === 'ru' ? "Настоящим подтверждается, что" : "This certifies that";
    ctx.fillText(certSub, canvas.width / 2, 270);

    // Student Name
    ctx.fillStyle = '#0ea5e9';
    ctx.font = 'bold 56px "Space Grotesk", Ubuntu, sans-serif';
    const displayHandle = userHandle ? `(@${userHandle.replace(/^@/, '')})` : '';
    ctx.fillText(`${userName} ${displayHandle}`.trim(), canvas.width / 2, 350);

    // Course completion description
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '20px "Ubuntu", sans-serif';
    const certDesc = lang === 'uz' ? "Kiberxavfsizlik asoslari va CTF amaliyot kursini muvaffaqiyatli yakunladi." : lang === 'ru' ? "Успешно завершил курс Основ Кибербезопасности и практических CTF лабораторий." : "Has successfully completed the Cybersecurity Fundamentals and Practical CTF Labs course.";
    ctx.fillText(certDesc, canvas.width / 2, 430);

    // Additional info / score
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 22px "Ubuntu Mono", monospace';
    ctx.fillText(`Total Earned: ${userXp} XP  •  Status: Verified Specialist`, canvas.width / 2, 490);

    // Divider line
    ctx.strokeStyle = '#2d3d4f';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(150, 540);
    ctx.lineTo(canvas.width - 150, 540);
    ctx.stroke();

    // Date and verification
    ctx.fillStyle = '#94a3b8';
    ctx.font = '16px "Ubuntu Mono", monospace';
    const dateStr = new Date().toLocaleDateString();
    ctx.fillText(`Berilgan sana / Date: ${dateStr}  |  ID: CS-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, canvas.width / 2, 590);

    ctx.fillStyle = '#88cc14';
    ctx.font = '14px "Ubuntu Mono", monospace';
    ctx.fillText('https://cybershield.uz/verify', canvas.width / 2, 630);

    // Trigger download
    const link = document.createElement('a');
    link.download = `CyberGuardAI_Certificate_${userName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    return true;
  };

  return (
    <UserContext.Provider value={{
      isLoggedIn,
      userName,
      setUserName,
      userHandle,
      setUserHandle,
      userEmail,
      userXp,
      streak,
      solvedTasks,
      completedRoomsCount,
      progressPercent,
      getUserTier,
      registerUser,
      loginUser,
      logout,
      submitFlag,
      generateAndDownloadCertificate
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
