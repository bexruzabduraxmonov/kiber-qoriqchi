import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useUser } from '../context/UserContext';
import { roomsData } from '../data/roomsData';

export const LabRoomPage = ({ roomId, onBack }) => {
  const { language, t } = useLanguage();
  const { solvedTasks, submitFlag } = useUser();

  const room = roomsData[roomId] || roomsData['vulnversity'];

  const [openTasks, setOpenTasks] = useState({ 1: true, 2: true, 3: true });
  const [showHints, setShowHints] = useState({});
  const [inputs, setInputs] = useState({});
  const [messages, setMessages] = useState({});
  const [copiedIp, setCopiedIp] = useState(false);
  
  // TryHackMe Machine state
  const [machineActive, setMachineActive] = useState(true);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour

  useEffect(() => {
    if (!machineActive) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [machineActive]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs.toString().padStart(2, '0')}s`;
  };

  const handleCopyIp = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(room.ip);
    }
    setCopiedIp(true);
    setTimeout(() => setCopiedIp(false), 2000);
  };

  const addOneHour = () => {
    setTimeLeft(prev => prev + 3600);
  };

  const toggleTask = (taskId) => {
    setOpenTasks(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const toggleHint = (taskId) => {
    setShowHints(prev => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  const handleInputChange = (taskId, val) => {
    setInputs(prev => ({ ...prev, [taskId]: val }));
    if (messages[taskId]) {
      setMessages(prev => ({ ...prev, [taskId]: null }));
    }
  };

  const handleCheck = (taskId) => {
    const inputVal = inputs[taskId] || '';
    if (!inputVal.trim()) return;

    const res = submitFlag(room.id, taskId, inputVal, language);
    setMessages(prev => ({
      ...prev,
      [taskId]: {
        text: res.message,
        isError: !res.success
      }
    }));
  };

  // Calculate room completion
  const solvedCountInRoom = room.tasks.filter(t => solvedTasks[`${room.id}_${t.id}`]).length;
  const isRoomCompleted = solvedCountInRoom === room.tasks.length;

  return (
    <div className="min-h-screen bg-[#0d151c] text-white pb-24 animate-fadeIn">
      {/* THM Top Bar */}
      <div className="border-b border-[#2d3d4f] bg-[#1a232c] px-5 py-3 sm:px-8">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="text-[#94a3b8] hover:text-[#88cc14] flex items-center gap-2 transition-colors text-sm font-bold"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i>
            <span>{language === 'uz' ? 'Orqaga' : language === 'ru' ? 'Назад' : 'Back to Hacktivities'}</span>
          </button>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-[#94a3b8]">Room Progress:</span>
            <span className={`font-bold ${isRoomCompleted ? 'text-[#88cc14]' : 'text-white'}`}>
              {solvedCountInRoom} / {room.tasks.length} ({Math.round((solvedCountInRoom / room.tasks.length) * 100)}%)
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 pt-6 space-y-6">
        {/* TryHackMe Machine Control Header Card */}
        <div className="bg-[#1a232c] border border-[#2d3d4f] rounded-lg p-6 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-5 border-b border-[#2d3d4f]">
            {/* Title & metadata */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-lg bg-[#24303c] border border-[#2d3d4f] flex items-center justify-center text-[#88cc14] text-2xl shrink-0">
                <i className={`fa-solid ${room.icon || 'fa-server'}`}></i>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold text-white font-heading">
                    {room.title}
                  </h1>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded text-[#111]"
                    style={{
                      backgroundColor: room.diff === 'Easy' ? '#88cc14' : room.diff === 'Medium' ? '#f59e0b' : '#ef4444'
                    }}
                  >
                    {room.diff}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#94a3b8] mt-1">
                  <span>Free Room</span>
                  <span>•</span>
                  <span>{room.type}</span>
                  <span>•</span>
                  <span className="text-[#88cc14]">{t(room.topicKey)}</span>
                </div>
              </div>
            </div>

            {/* THM Machine Control Section */}
            <div>
              {machineActive ? (
                <div className="flex flex-wrap items-center gap-3 bg-[#0d151c] border border-[#2d3d4f] rounded-lg p-3 font-mono">
                  {/* IP Display with Copy */}
                  <div className="flex items-center gap-2 pr-3 border-r border-[#2d3d4f]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#88cc14] animate-pulse"></span>
                    <span className="text-xs text-[#94a3b8]">IP:</span>
                    <span className="text-sm font-bold text-white tracking-wider select-all">{room.ip}</span>
                    <button
                      type="button"
                      onClick={handleCopyIp}
                      title="Copy IP"
                      className="text-[#94a3b8] hover:text-white ml-1 p-1 transition-colors"
                    >
                      <i className={`fa-solid ${copiedIp ? 'fa-check text-[#88cc14]' : 'fa-copy'} text-xs`}></i>
                    </button>
                  </div>

                  {/* Timer */}
                  <div className="text-xs text-[#94a3b8] pr-3 border-r border-[#2d3d4f]">
                    <span>Expires in: </span>
                    <span className="text-white font-bold">{formatTimer(timeLeft)}</span>
                  </div>

                  {/* Add Hour button */}
                  <button
                    type="button"
                    onClick={addOneHour}
                    title="Add 1 hour"
                    className="px-2 py-1 text-xs font-bold rounded bg-[#24303c] text-white hover:bg-[#2e3e50] transition-colors"
                  >
                    +1h
                  </button>

                  {/* Terminate Button */}
                  <button
                    type="button"
                    onClick={() => setMachineActive(false)}
                    className="px-2 py-1 text-xs font-bold rounded bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40 hover:bg-[#ef4444] hover:text-white transition-colors"
                  >
                    Terminate
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => { setMachineActive(true); setTimeLeft(3600); }}
                  className="btn-primary bg-[#88cc14] text-[#0d151c] font-bold py-2.5 px-6 rounded-md hover:bg-[#75b310] flex items-center gap-2 shadow-lg shadow-[#88cc14]/20"
                >
                  <i className="fa-solid fa-play text-xs"></i>
                  <span>Start Machine</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-sm text-[#94a3b8] mt-4 leading-relaxed">
            {t(room.descKey)}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {room.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-mono bg-[#24303c] text-[#94a3b8] px-2.5 py-0.5 rounded border border-[#2d3d4f]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* TryHackMe Task Panels */}
        <div className="space-y-4">
          {room.tasks.map((task, idx) => {
            const taskKey = `${room.id}_${task.id}`;
            const isSolved = Boolean(solvedTasks[taskKey]);
            const isOpen = openTasks[task.id];
            const isHintOpen = showHints[task.id];
            const msg = messages[task.id];

            return (
              <div
                key={task.id}
                className={`bg-[#1a232c] border rounded-lg overflow-hidden transition-all duration-200 ${
                  isSolved ? 'border-[#88cc14]/60' : 'border-[#2d3d4f]'
                }`}
              >
                {/* Task Accordion Bar */}
                <div
                  onClick={() => toggleTask(task.id)}
                  className={`flex justify-between items-center px-6 py-4 cursor-pointer select-none transition-colors ${
                    isSolved
                      ? 'bg-[#1e2f20] hover:bg-[#243827]'
                      : 'bg-[#1a232c] hover:bg-[#202b36]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                        isSolved ? 'bg-[#88cc14] text-[#0d151c]' : 'bg-[#24303c] text-white'
                      }`}
                    >
                      {isSolved ? <i className="fa-solid fa-check"></i> : task.id}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                      Task {task.id} - {t(task.tKey)}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4">
                    {isSolved && (
                      <span className="text-xs font-mono font-bold text-[#88cc14] flex items-center gap-1.5">
                        <i className="fa-solid fa-circle-check"></i> Completed
                      </span>
                    )}
                    <i
                      className={`fa-solid fa-chevron-down text-xs text-[#94a3b8] transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-white' : ''
                      }`}
                    ></i>
                  </div>
                </div>

                {/* Task Content */}
                {isOpen && (
                  <div className="p-6 border-t border-[#2d3d4f] space-y-5 bg-[#17212a] animate-fadeIn">
                    <p className="text-sm text-[#cbd5e1] leading-relaxed">
                      {t(task.dKey)}
                    </p>

                    {/* Theory / Instructions Callout */}
                    <div className="bg-[#1a232c] border-l-4 border-[#88cc14] p-4 rounded-r border-y border-r border-[#2d3d4f]">
                      <h3 className="text-xs font-bold font-mono text-[#88cc14] uppercase mb-2 flex items-center gap-2">
                        <i className="fa-solid fa-book-open"></i>
                        <span>{t('lab_theory')}</span>
                      </h3>
                      <p className="text-sm text-[#94a3b8] leading-relaxed font-sans">
                        {t(task.iKey)}
                      </p>
                    </div>

                    {/* Question Box */}
                    <div className="bg-[#111922] border border-[#2d3d4f] rounded-lg p-5">
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <p className="text-sm font-medium text-white">
                          {t(task.qKey)}
                        </p>
                        {task.hint && (
                          <button
                            type="button"
                            onClick={() => toggleHint(task.id)}
                            className="text-xs font-bold text-[#f59e0b] hover:text-[#fbbf24] flex items-center gap-1 shrink-0 transition-colors"
                          >
                            <i className="fa-regular fa-lightbulb"></i>
                            <span>Hint</span>
                          </button>
                        )}
                      </div>

                      {/* Hint Toggle */}
                      {isHintOpen && task.hint && (
                        <div className="mb-4 p-3 bg-[#f59e0b]/10 border border-[#f59e0b]/30 rounded text-xs text-[#f59e0b] font-mono flex items-start gap-2">
                          <i className="fa-solid fa-circle-info mt-0.5"></i>
                          <span>{task.hint}</span>
                        </div>
                      )}

                      {/* Input with Submit Button */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={inputs[task.id] !== undefined ? inputs[task.id] : (isSolved ? task.ans : '')}
                          disabled={isSolved}
                          onChange={(e) => handleInputChange(task.id, e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleCheck(task.id)}
                          placeholder="Submit your answer here..."
                          className={`flex-1 bg-[#1a232c] border border-[#2d3d4f] text-white text-sm rounded px-3.5 py-2.5 outline-none focus:border-[#88cc14] transition-colors font-mono ${
                            isSolved ? 'text-[#88cc14] font-bold opacity-80' : ''
                          }`}
                        />
                        <button
                          type="button"
                          disabled={isSolved}
                          onClick={() => handleCheck(task.id)}
                          className={`px-6 py-2.5 font-bold text-sm rounded transition-colors whitespace-nowrap ${
                            isSolved
                              ? 'bg-[#24303c] text-[#88cc14] border border-[#88cc14]/40 cursor-default'
                              : 'bg-[#88cc14] text-[#0d151c] hover:bg-[#75b310]'
                          }`}
                        >
                          {isSolved ? (
                            <span className="flex items-center gap-1.5">
                              <i className="fa-solid fa-check"></i> Correct
                            </span>
                          ) : (
                            <span>Submit</span>
                          )}
                        </button>
                      </div>

                      {/* Feedback message */}
                      {msg && (
                        <div
                          className={`text-sm mt-3 p-2.5 rounded font-mono flex items-center gap-2 ${
                            msg.isError
                              ? 'bg-[#ef4444]/10 border border-[#ef4444]/40 text-[#ef4444]'
                              : 'bg-[#88cc14]/10 border border-[#88cc14]/40 text-[#88cc14]'
                          }`}
                        >
                          <i className={`fa-solid ${msg.isError ? 'fa-circle-xmark' : 'fa-circle-check'}`}></i>
                          <span>{msg.text}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
