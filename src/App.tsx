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
          <div className="flex items-center gap-2 text-center sm:text-right">
            <GraduationCap className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-extrabold text-slate-800 block sm:inline">
                الممنوع من الصرف • منهاج الثانوية العامة (توجيهي فلسطين)
              </span>
              <span className="text-slate-400 block sm:inline sm:mr-2">
                اللغة العربية (النحو والصرف)
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>المشرف ومصدر الشرح: <strong className="font-black text-emerald-950">الأستاذ القدير همام إسماعيل</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              <Code className="w-3.5 h-3.5 text-slate-500" />
              <span>مطور البرنامج: <strong className="font-black text-slate-900">وسيم قيمري</strong></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
