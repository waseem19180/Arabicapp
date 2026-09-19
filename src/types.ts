export interface RuleItem {
  id: string;
  title: string;
  rule: string;
  mainExample: string;
  moreExamples: string[];
  notes?: string;
  category: 'part1_alam' | 'part1_sifah' | 'part2_single_cause' | 'part2_sarf_rules';
}

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
  sourceType?: string;
  ruleRef?: string;
}

export interface QuizState {
  currentQuestions: Question[];
  currentIndex: number;
  selectedAnswers: Record<number, number>; // questionId -> selected option index
  showExplanationForCurrent: boolean;
  isCompleted: boolean;
  score: number;
}
