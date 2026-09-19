import React from 'react';
import { BookOpen, HelpCircle, GraduationCap, UserCheck, Code } from 'lucide-react';

interface HeaderProps {
  activeTab: 'lesson' | 'quiz';
  setActiveTab: (tab: 'lesson' | 'quiz') => void;
  questionsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, questionsCount }) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shadow-emerald-700/20 shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                    الممنوع من الصرف
                  </h1>
                  <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    توجيهي فلسطين 🇵🇸
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium flex-wrap mt-0.5">
                  <span className="flex items-center gap-1 text-emerald-700 font-bold">
                    <UserCheck className="w-3 h-3" />
                    إشراف: أ. همام إسماعيل
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="flex items-center gap-1 text-slate-600 font-bold">
                    <Code className="w-3 h-3 text-slate-400" />
                    برمجة: وسيم قيمري
                  </span>
                </div>
              </div>
            </div>

            {/* Questions badge */}
            <div className="flex md:hidden items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span>{questionsCount} سؤال</span>
            </div>
          </div>

          {/* Navigation: ONLY TWO TABS as requested */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            <nav className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full sm:w-auto justify-center">
              <button
                id="nav-tab-lesson"
                onClick={() => setActiveTab('lesson')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === 'lesson'
                    ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200/60'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>شرح الدرس</span>
              </button>

              <button
                id="nav-tab-quiz"
                onClick={() => setActiveTab('quiz')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                  activeTab === 'quiz'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <HelpCircle className="w-4 h-4 text-emerald-200" />
                <span>اختبار ضع دائرة (١٠ أسئلة)</span>
              </button>
            </nav>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <span>بنك {questionsCount} سؤال</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
