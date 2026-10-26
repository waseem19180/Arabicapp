import React, { useState } from 'react';
import { Header } from './components/Header';
import { LessonView } from './components/LessonView';
import { QuizView } from './components/QuizView';
import { questionsBank } from './data/questionsBank';
import { GraduationCap, Heart, UserCheck, Code } from 'lucide-react';

export default function App() {
  // Only the two requested tabs: 'lesson' and 'quiz'
  const [activeTab, setActiveTab] = useState<'lesson' | 'quiz'>('lesson');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-emerald-200 selection:text-emerald-900" dir="rtl">
      {/* Header with Navigation & Credits */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        questionsCount={questionsBank.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'lesson' && (
          <LessonView onStartQuiz={() => setActiveTab('quiz')} />
        )}

        {activeTab === 'quiz' && (
          <QuizView onGoToLesson={() => setActiveTab('lesson')} />
        )}
      </main>

      {/* Footer with High-Prominence Attribution */}
      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-center sm:text-right">
            <div className="w-8 h-8 rounded-lg bg-white border border-emerald-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
              <img
                src="https://i.postimg.cc/64C6LyDw/FA95464D-14F5-46F7-B40B-EF14ACC7119E.png"
                alt="شعار دائرة اللغة العربية - مدرسة الحصاد التربوي"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-extrabold text-slate-800 block sm:inline">
                الممنوع من الصرف • توجيهي فلسطين
              </span>
              <span className="text-slate-400 block sm:inline sm:mr-2">
                دائرة اللغة العربية — مدرسة الحصاد التربوي
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>إشراف رئيس دائرة العربي: <strong className="font-black text-emerald-950">الأستاذ القدير همام إسماعيل</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-slate-800 border-2 border-emerald-400 shadow-xs">
              <Code className="w-4 h-4 text-emerald-600" />
              <span className="text-xs sm:text-sm font-bold">برمجة وتطوير: <strong className="font-black text-emerald-950 text-sm sm:text-base">وسيم قيمري</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
