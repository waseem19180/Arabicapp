import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { questionsBank } from '../data/questionsBank';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  Lightbulb, 
  ArrowLeft,
  ChevronLeft,
  HelpCircle,
  GraduationCap,
  Award
} from 'lucide-react';

interface QuizViewProps {
  onGoToLesson: () => void;
}

// Helper function to shuffle question options and update correctIndex
const shuffleQuestionOptions = (q: Question): Question => {
  const optionsWithMeta = q.options.map((text, idx) => ({
    text,
    isCorrect: idx === q.correctIndex,
  }));

  // Durstenfeld / Fisher-Yates shuffle
  for (let i = optionsWithMeta.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = optionsWithMeta[i];
    optionsWithMeta[i] = optionsWithMeta[j];
    optionsWithMeta[j] = temp;
  }

  const newCorrectIndex = optionsWithMeta.findIndex((opt) => opt.isCorrect);

  return {
    ...q,
    options: optionsWithMeta.map((opt) => opt.text),
    correctIndex: newCorrectIndex,
  };
};

export const QuizView: React.FC<QuizViewProps> = ({ onGoToLesson }) => {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // Draw 10 random distinct questions from the bank and shuffle their options
  const generateNewQuiz = useCallback(() => {
    const shuffledBank = [...questionsBank].sort(() => 0.5 - Math.random());
    const selected = shuffledBank.slice(0, 10).map(shuffleQuestionOptions);
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  }, []);

  useEffect(() => {
    generateNewQuiz();
  }, [generateNewQuiz]);

  if (currentQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-slate-500 font-bold">جاري تجهيز الاختبار...</div>
      </div>
    );
  }

  const currentQ = currentQuestions[currentIndex];
  const questionId = currentQ.id;
  const hasAnsweredCurrent = selectedAnswers[questionId] !== undefined;
  const currentSelectedOption = selectedAnswers[questionId];

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent || isFinished) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Calculate score out of 10
  const score = currentQuestions.reduce((acc, q) => {
    return selectedAnswers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const optionLetters = ['أ', 'ب', 'ج', 'د'];

  // Completed State: Results & Explanations
  if (isFinished) {
    const percentage = Math.round((score / 10) * 100);
    
    let evaluation = {
      title: 'علامة كاملة ومثالية! 🌟',
      color: 'from-emerald-600 to-teal-700',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      desc: 'ما شاء الله! إتقان تام واستيعاب دقيق لقواعد الممنوع من الصرف لطلبة التوجيهي.',
    };

    if (score >= 8 && score <= 9) {
      evaluation = {
        title: 'أداء ممتاز جداً! 👏',
        color: 'from-teal-600 to-emerald-700',
        badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
        desc: 'أحسنت! لديك فهم عميق لدروس الممنوع من الصرف، راجع الأسئلة التي أخطأت بها للوصول للدرجة الكاملة.',
      };
    } else if (score >= 6 && score <= 7) {
      evaluation = {
        title: 'أداء جيد ومبشّر! 👍',
        color: 'from-blue-600 to-teal-700',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        desc: 'مستوى جيد، ولكنك بحاجة للتركيز على الفروق الدقيقة وأسباب المنع والصرف.',
      };
    } else if (score < 6) {
      evaluation = {
        title: 'تحتاج إلى مراجعة الشرح 📖',
        color: 'from-amber-600 to-orange-700',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        desc: 'لا تقلق! راجع تفاصيل الدرس في قائمة "شرح الدرس" وأعد الاختبار، فالتكرار يثبت المعلومة.',
      };
    }

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fade-in">
        {/* Score Card Banner */}
        <div className={`bg-gradient-to-r ${evaluation.color} rounded-3xl p-8 text-white shadow-xl text-center relative overflow-hidden`}>
          <div className="relative z-10 space-y-4">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className={`inline-block px-4 py-1 rounded-full text-xs font-black border ${evaluation.badgeColor}`}>
                نتيجة الاختبار النهائي
              </span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                إشراف: أ. همام إسماعيل
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="text-6xl sm:text-7xl font-black tracking-tight">
                {score}
              </div>
              <div className="text-3xl sm:text-4xl text-emerald-200 font-bold">
                / ١٠
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-black">
              {evaluation.title}
            </div>

            <p className="text-sm sm:text-base text-white/90 max-w-lg mx-auto font-medium">
              {evaluation.desc} ({percentage}%)
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={generateNewQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 font-black text-sm hover:bg-slate-100 transition-all shadow-md active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                <span>اختبار جديد (١٠ أسئلة عشوائية أخرى)</span>
              </button>
              <button
                onClick={onGoToLesson}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm transition-all border border-white/20"
              >
                <BookOpen className="w-4 h-4" />
                <span>الرجوع لشرح الدرس</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Review of All 10 Questions with Explanations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-r-4 border-emerald-600 pr-3">
            <div>
              <h3 className="text-xl font-black text-slate-900">
                مراجعة تفصيلية للأسئلة مع تعليل وشرح كل إجابة
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                توضيح كامل للأسباب النحوية والشواهد لأسئلة الأستاذ همام إسماعيل والامتحانات الوزارية
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {currentQuestions.map((q, idx) => {
              const studentAnswer = selectedAnswers[q.id];
              const isCorrect = studentAnswer === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-2xl p-5 border shadow-xs transition-all ${
                    isCorrect
                      ? 'border-emerald-200 hover:border-emerald-300'
                      : 'border-red-200 hover:border-red-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-100">
                        {q.sourceType || 'سؤال وزاري'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          إجابة صحيحة (+١)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-extrabold border border-red-200">
                          <XCircle className="w-3.5 h-3.5 text-red-600" />
                          إجابة خاطئة
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h4 className="text-base font-bold text-slate-900 mb-3">
                    {q.question}
                  </h4>

                  {/* Options status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                    {q.options.map((opt, oIdx) => {
                      const isOptionCorrect = oIdx === q.correctIndex;
                      const isOptionSelected = studentAnswer === oIdx;

                      let style = 'bg-slate-50 text-slate-700 border-slate-200';
                      if (isOptionCorrect) {
                        style = 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold';
                      } else if (isOptionSelected && !isCorrect) {
                        style = 'bg-red-50 text-red-900 border-red-300 line-through';
                      }

                      return (
                        <div
                          key={oIdx}
                          className={`p-2.5 rounded-xl border text-xs flex items-center gap-2 ${style}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-white/80 border border-current text-[11px] font-black flex items-center justify-center shrink-0">
                            {optionLetters[oIdx]}
                          </span>
                          <span className="leading-snug">{opt}</span>
                          {isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-auto shrink-0" />
                          )}
                          {isOptionSelected && !isCorrect && (
                            <XCircle className="w-4 h-4 text-red-500 mr-auto shrink-0" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation card */}
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 flex items-start gap-2.5">
                    <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-950 leading-relaxed font-medium">
                      <strong className="font-extrabold block text-emerald-900 mb-0.5">
                        💡 توضيح الإجابة والقاعدة النحوية:
                      </strong>
                      {q.explanation}
                      {q.ruleRef && (
                        <span className="block mt-1 text-[11px] text-emerald-700 font-bold">
                          [القاعدة: {q.ruleRef}]
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 text-center">
            <button
              onClick={generateNewQuiz}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>خوض اختبار جديد (١٠ أسئلة عشوائية مختلفة)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Quiz View (Question 1 to 10)
  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Quiz Header & Progress */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black">
              السؤال {currentIndex + 1} من ١٠
            </span>
            {currentQ.sourceType && (
              <span className="text-xs text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-100">
                {currentQ.sourceType}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-600">
              النتيجة الحالية: {score} من {currentIndex + (hasAnsweredCurrent ? 1 : 0)}
            </span>
            <button
              onClick={generateNewQuiz}
              title="إعادة بدء اختبار بأسئلة عشوائية جديدة"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-emerald-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
          />
        </div>

        {/* 10 Step Dots */}
        <div className="flex items-center justify-between gap-1 pt-1">
          {currentQuestions.map((q, idx) => {
            const answered = selectedAnswers[q.id] !== undefined;
            const isRight = selectedAnswers[q.id] === q.correctIndex;
            const isCurrent = idx === currentIndex;

            let dotClass = 'bg-slate-200 text-slate-500';
            if (isCurrent) {
              dotClass = 'ring-2 ring-emerald-500 bg-emerald-50 text-emerald-800 font-black';
            } else if (answered) {
              dotClass = isRight ? 'bg-emerald-500 text-white' : 'bg-red-400 text-white';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full text-xs font-bold flex items-center justify-center transition-all ${dotClass}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        <div>
          <div className="text-xs font-bold text-emerald-700 mb-2 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4" />
            <span>اختر الإجابة الصحيحة من بين البدائل الأربعة:</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {/* Options List */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = currentSelectedOption === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
            let badgeStyle = 'bg-white text-slate-700 border-slate-300';

            if (hasAnsweredCurrent) {
              if (isCorrect) {
                btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400';
                badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-red-50 border-red-400 text-red-950 line-through opacity-80';
                badgeStyle = 'bg-red-600 text-white border-red-600';
              } else {
                btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnsweredCurrent}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-right transition-all flex items-center justify-between gap-3 text-sm sm:text-base ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-sm shrink-0 shadow-xs ${badgeStyle}`}
                  >
                    {optionLetters[idx]}
                  </span>
                  <span className="font-semibold">{option}</span>
                </div>

                {hasAnsweredCurrent && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
                {hasAnsweredCurrent && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Immediate Explanation Box when Answered */}
        {hasAnsweredCurrent && (
          <div className="animate-fade-in bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm">
              <Lightbulb className="w-4 h-4 text-emerald-600" />
              <span>توضيح وشرح الإجابة:</span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {currentQ.explanation}
            </p>
            {currentQ.ruleRef && (
              <div className="text-[11px] text-emerald-700 font-bold pt-1">
                📌 القاعدة: {currentQ.ruleRef}
              </div>
            )}
          </div>
        )}

        {/* Next Question / Finish Button */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed text-slate-400'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4 rotate-180" />
            <span>السابق</span>
          </button>

          {hasAnsweredCurrent ? (
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-md active:scale-95"
            >
              <span>{currentIndex === currentQuestions.length - 1 ? 'إظهار النتيجة النهائية' : 'السؤال التالي'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-xs text-slate-400 font-medium">
              اختر إجابة للمتابعة وقراءة التوضيح
            </span>
          )}
        </div>
      </div>

      {/* Credit footer note inside quiz view */}
      <div className="text-center text-xs text-slate-400 font-medium space-y-1">
        <div>إشراف ومصدر الشرح: <span className="text-emerald-700 font-bold">الأستاذ القدير همام إسماعيل</span></div>
        <div>برمجة وتطوير: <span className="text-slate-700 font-bold">وسيم قيمري</span></div>
      </div>
    </div>
  );
};
