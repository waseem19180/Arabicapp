import React, { useState } from 'react';
import { questionsBank } from '../data/questionsBank';
import { 
  CheckCircle2, 
  Search, 
  HelpCircle, 
  Filter, 
  Lightbulb, 
  Eye, 
  EyeOff 
} from 'lucide-react';

export const AllQuestionsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('الكل');
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});

  const filterCategories = ['الكل', 'شرح الأستاذ', 'وزاري توجيهي', 'آيات وشواهد شعرية', 'إثرائي من المنهاج'];

  const filteredQuestions = questionsBank.filter((q) => {
    const matchesCategory = filterType === 'الكل' || q.sourceType === filterType;
    if (!matchesCategory) return false;

    if (!searchTerm.trim()) return true;
    const term = searchTerm.trim().toLowerCase();
    return (
      q.question.toLowerCase().includes(term) ||
      q.options.some((o) => o.toLowerCase().includes(term)) ||
      q.explanation.toLowerCase().includes(term)
    );
  });

  const toggleReveal = (id: number) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const revealAll = () => {
    const allRevealed: Record<number, boolean> = {};
    questionsBank.forEach((q) => {
      allRevealed[q.id] = true;
    });
    setRevealedAnswers(allRevealed);
  };

  const hideAll = () => {
    setRevealedAnswers({});
  };

  const optionLetters = ['أ', 'ب', 'ج', 'د'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Controls */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900">
              بنك الأسئلة الشامل ({questionsBank.length} سؤالاً موثقاً)
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              تصفح كامل بنك أسئلة التوجيهي وامتحانات الوزارة مع الإجابات النموذجية والشروحات
            </p>
          </div>

          {/* Reveal/Hide All Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={revealAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>إظهار جميع الحلول</span>
            </button>
            <button
              onClick={hideAll}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>إخفاء الحلول لاختبار الذات</span>
            </button>
          </div>
        </div>

        {/* Filter and Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث في نص السؤال أو الخيارات..."
              className="w-full pr-10 pl-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-100 rounded-xl">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterType(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  filterType === cat
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-slate-200">
            لا توجد أسئلة مطابقة لبحثك
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isRevealed = !!revealedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-emerald-300 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-200">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {q.sourceType || 'سؤال وزاري'}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleReveal(q.id)}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>إخفاء التوضيح</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>كشف الإجابة والتوضيح</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Question */}
                <h4 className="text-base font-bold text-slate-900 leading-relaxed">
                  {q.question}
                </h4>

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, oIdx) => {
                    const isCorrect = oIdx === q.correctIndex;
                    let style = 'bg-slate-50 text-slate-700 border-slate-200';
                    if (isRevealed && isCorrect) {
                      style = 'bg-emerald-50 text-emerald-950 border-emerald-400 font-bold ring-1 ring-emerald-400';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 transition-all ${style}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                              isRevealed && isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-white text-slate-600 border border-slate-300'
                            }`}
                          >
                            {optionLetters[oIdx]}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isRevealed && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Card */}
                {isRevealed && (
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-950 leading-relaxed">
                    <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-black text-emerald-900 mb-0.5">
                        💡 شرح وتوضيح الإجابة الصحيحة:
                      </strong>
                      {q.explanation}
                      {q.ruleRef && (
                        <span className="block mt-1 text-[11px] text-emerald-700 font-bold">
                          [المرجع: {q.ruleRef}]
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
