export type Difficulty = "easy" | "medium" | "hard";

export type TestCase = {
  input: string;
  output: string;
  is_hidden: boolean;
};

export type CodingQuestion = {
  id: number;
  created_at: string;
  title: string;
  description: string;
  input_format: string;
  output_format: string;
  example_explanation: string;
  difficulty: Difficulty;
  test_cases: TestCase[];
  organization_id: string;
  user_id: string;
  is_active: boolean;
};

export type CodingQuestionFormData = Omit<
  CodingQuestion,
  "id" | "created_at" | "organization_id" | "user_id"
>;
