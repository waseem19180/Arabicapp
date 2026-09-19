import React, { useState } from 'react';
import { lessonSections, grammarSummary, solvedExercisesData } from '../data/lessonData';
import { 
  BookOpen, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle, 
  Search, 
  ArrowLeft, 
  FileText,
  BookmarkCheck,
  GraduationCap
} from 'lucide-react';

interface LessonViewProps {
  onStartQuiz: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ onStartQuiz }) => {
  const [activeSectionId, setActiveSectionId] = useState<'all' | 'part1' | 'part2' | 'exercises' | 'grammar'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = lessonSections.map((section) => {
    if (activeSectionId !== 'all' && activeSectionId !== 'grammar' && activeSectionId !== 'exercises' && section.id !== activeSectionId) {
      return null;
    }
    const filteredRules = section.rules.filter((rule) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      return (
        rule.title.toLowerCase().includes(term) ||
        rule.rule.toLowerCase().includes(term) ||
        rule.mainExample.toLowerCase().includes(term) ||
        rule.moreExamples.some((ex) => ex.toLowerCase().includes(term)) ||
        (rule.notes && rule.notes.toLowerCase().includes(term))
      );
    });
    return { ...section, rules: filteredRules };
  }).filter(Boolean);

  const filteredExercises = solvedExercisesData.map((group) => {
    const matchingItems = group.items.filter((item) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.trim().toLowerCase();
      return (
        item.sentence.toLowerCase().includes(term) ||
        item.word.toLowerCase().includes(term) ||
        item.reasonOrIrab.toLowerCase().includes(term) ||
        item.ruleType.toLowerCase().includes(term)
      );
    });
    return { ...group, items: matchingItems };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner with Teacher's Overview */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>منهاج الثانوية العامة الفلسطيني (توجيهي) • شرح الدرس المعتمد</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold border border-white/20">
              إشراف ومصدر الشرح: أ. همام إسماعيل
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black mb-3 leading-tight tracking-tight">
            الممنوع من الصرف (١ و ٢)
          </h2>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-6 font-medium">
            شرح تفصيلي ومبسّط لقواعد المنع من الصرف لعلتين ولعلة واحدة، مع الشواهد النحوية وأمثلة الأستاذ القدير همام إسماعيل المعتمدة، وتدريبات الاستخراج والإعراب والقرآن الكريم المحلولة.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onStartQuiz}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-colors shadow-lg shadow-emerald-500/30"
            >
              <span>ابدأ اختبار الـ ١٠ أسئلة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveSectionId('exercises')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/10"
            >
              <BookmarkCheck className="w-4 h-4 text-emerald-300" />
              <span>تدريبات الاستخراج والإعراب المحلولة</span>
            </button>
            <a
              href="#grammar-section"
              onClick={() => setActiveSectionId('grammar')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/10"
            >
              <FileText className="w-4 h-4" />
              <span>جدول الإعراب والصرف</span>
            </a>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -left-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Quick Search & Filter Controls */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن كلمة، أو قاعدة، أو تدريب..."
              className="w-full pr-10 pl-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
              >
                مسح
              </button>
            )}
          </div>

          {/* Section Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveSectionId('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSectionId === 'all'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setActiveSectionId('part1')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSectionId === 'part1'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الممنوع من الصرف ١ (لعلتين)
            </button>
            <button
              onClick={() => setActiveSectionId('part2')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSectionId === 'part2'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              الممنوع من الصرف ٢ (لعلة واحدة والصرف)
            </button>
            <button
              onClick={() => setActiveSectionId('exercises')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSectionId === 'exercises'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              تدريبات الاستخراج والإعراب المحلولة
            </button>
            <button
              onClick={() => setActiveSectionId('grammar')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeSectionId === 'grammar'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جدول الإعراب
            </button>
          </div>
        </div>
      </div>

      {/* Main Rules Display */}
      {activeSectionId !== 'grammar' && activeSectionId !== 'exercises' && (
        <div className="space-y-10">
          {filteredSections.map((section) => {
            if (!section || section.rules.length === 0) return null;
            return (
              <div key={section.id} className="space-y-4">
                {/* Section Header */}
                <div className="border-r-4 border-emerald-600 pr-3">
                  <h3 className="text-xl font-black text-slate-900">
                    {section.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">
                    {section.subtitle}
                  </p>
                </div>

                {/* Rules Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-emerald-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Title & Badge */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="text-base font-black text-slate-900">
                            {rule.title}
                          </h4>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                            {rule.category.includes('alam')
                              ? 'عَلَم'
                              : rule.category.includes('sifah')
                              ? 'صِفَة'
                              : rule.category.includes('single')
                              ? 'لعلة واحدة'
                              : 'حالة صرف'}
                          </span>
                        </div>

                        {/* Rule Definition */}
                        <p className="text-xs text-slate-600 leading-relaxed mb-3">
                          {rule.rule}
                        </p>

                        {/* Teacher's Main Example */}
                        <div className="bg-emerald-50/70 border border-emerald-200/70 rounded-xl p-3 mb-3">
                          <div className="text-[11px] font-bold text-emerald-800 mb-1 flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>المثال المعتمد في شرح الأستاذ:</span>
                          </div>
                          <div className="text-base font-extrabold text-emerald-950 font-serif">
                            «{rule.mainExample}»
                          </div>
                        </div>

                        {/* More Examples */}
                        {rule.moreExamples && rule.moreExamples.length > 0 && (
                          <div className="mb-3">
                            <span className="text-[11px] text-slate-400 font-bold block mb-1">
                              أمثلة وشواهد وزارية إضافية:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {rule.moreExamples.map((ex, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold"
                                >
                                  {ex}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Ministerial Exam Note */}
                      {rule.notes && (
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded-lg border border-amber-200/60">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{rule.notes}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Solved Exercises Section (New Comprehensive Exercises) */}
      {(activeSectionId === 'all' || activeSectionId === 'exercises') && (
        <div className="space-y-8">
          <div className="border-r-4 border-teal-600 pr-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <h3 className="text-xl font-black text-slate-900">
                تدريبات الاستخراج والإعراب المحلولة ونماذج القرآن الكريم
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
              نماذج تطبيقية شاملة مع استخراج الممنوع من الصرف، وتحديد علل المنع بدقة، والإعراب النموذجي المعتمد.
            </p>
          </div>

          <div className="space-y-8">
            {filteredExercises.map((group) => (
              <div key={group.id} className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                    <span>{group.title}</span>
                  </h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {group.badge} ({group.items.length} أمثلة)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-slate-50/80 hover:bg-white rounded-2xl p-4 border border-slate-200/70 hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100/70 text-emerald-900 border border-emerald-200">
                            {item.ruleType}
                          </span>
                        </div>

                        {/* Sentence / Verse */}
                        <div className="bg-white p-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 font-serif leading-relaxed">
                          {item.sentence}
                        </div>

                        {/* Target Word */}
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-extrabold text-slate-500">الممنوع من الصرف:</span>
                          <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {item.word}
                          </span>
                        </div>

                        {/* Reason or Irab Detail */}
                        <div className="bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-100 text-xs text-slate-700 leading-relaxed">
                          <strong className="text-emerald-950 font-bold block mb-0.5">
                            {group.id === 'irab_exercises' ? '🔍 الإعراب النموذجي:' : '💡 علة وسبب المنع:'}
                          </strong>
                          {item.reasonOrIrab}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grammar & Parsing Summary Section */}
      {(activeSectionId === 'all' || activeSectionId === 'grammar') && (
        <div id="grammar-section" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="border-r-4 border-teal-600 pr-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {grammarSummary.title}
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              {grammarSummary.definition}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {grammarSummary.cases.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-teal-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 inline-block mb-2">
                    {item.state}
                  </span>
                  <div className="text-sm font-black text-slate-900 mb-2">
                    العلامة: {item.mark}
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 mb-2 font-serif">
                    {item.example}
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-200">
                  {item.explanation}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Ministerial golden tip */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-emerald-900 leading-relaxed font-medium">
              <strong className="font-black text-emerald-950 block mb-1">
                قاعدة ذهبية لطلبة التوجيهي في الصرف والإعراب:
              </strong>
              الممنوع من الصرف يُجر بـ <strong className="text-emerald-700">الفتحة نيابة عن الكسرة</strong> بشرط أن يكون <strong className="text-emerald-700">مجرداً من (أل) ومجرداً من الإضافة</strong>. فإذا دخلت عليه (أل) كما في حديث «رفقاً بالقواريرِ» أو أُضيف إلى ما بعده كما في «من عظماءِ الأمةِ»، فإنه يُصرف ويُجر بـ <strong className="text-emerald-700">الكسرة الظاهرة</strong>.
            </div>
          </div>
        </div>
      )}

      {/* Call To Action Box to Quiz */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white text-center shadow-lg space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">
          هل أتقنت قواعد الدرس وفهمت شروحات الأستاذ؟
        </h3>
        <p className="text-slate-200 text-sm max-w-xl mx-auto">
          اختبر نفسك الآن في نظام ضع دائرة التفاعلي! سيتم اختيار ١٠ أسئلة عشوائية من بنك يحتوي على أكثر من ١٠٠ سؤال توجيهي ووزاري وإثرائي مع خلط الخيارات وتوضيح الإجابة فوراً.
        </p>
        <button
          onClick={onStartQuiz}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-base transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
        >
          <BookOpen className="w-5 h-5 text-emerald-600" />
          <span>بدء اختبار ضع دائرة (١٠ أسئلة)</span>
        </button>
      </div>
    </div>
  );
};

