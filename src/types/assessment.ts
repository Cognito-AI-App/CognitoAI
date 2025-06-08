import { Difficulty } from "./codingQuestion";

export type Assessment = {
  id: number;
  created_at: string;
  name: string;
  description: string | null;
  difficulty: Difficulty;
  question_count: number;
  time_duration: string;
  questions: number[]; // Array of coding_question ids
  organization_id: string;
  user_id: string;
  is_active: boolean;
};

export type AssessmentResponse = {
  id: number;
  created_at: string;
  assessment_id: number;
  interview_id: string;
  name: string | null;
  email: string | null;
  responses: AssessmentQuestionResponse[];
  score: number | null;
  total_score: number | null;
  is_completed: boolean;
  tab_switch_count: number | null;
};

export type AssessmentQuestionResponse = {
  question_id: number;
  question_title?: string;
  code: string;
  language: string;
  result: AssessmentQuestionResult;
};

export type AssessmentQuestionResult = {
  status: string;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: string | null;
  passed_test_cases: number;
  total_test_cases: number;
  score: number;
};

export type AssessmentFormData = Omit<
  Assessment,
  "id" | "created_at" | "organization_id" | "user_id"
>;
