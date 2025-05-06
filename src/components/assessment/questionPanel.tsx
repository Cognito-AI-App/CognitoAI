"use client";

import React from "react";
import { CodingQuestion } from "@/types/codingQuestion";
import ReactMarkdown from "react-markdown";

interface QuestionPanelProps {
  question: CodingQuestion;
}

const QuestionPanel: React.FC<QuestionPanelProps> = ({ question }) => {
  // Format the question content using the same formatting as in createQuestionModal.tsx
  const formattedContent = `
# ${question.title}

${question.description}

## Input Format

${question.input_format}

## Output Format

${question.output_format}

## Example

**Input:**
\`\`\`
${question.test_cases.filter(tc => !tc.is_hidden)[0]?.input || "No visible examples"}
\`\`\`

**Output:**
\`\`\`
${question.test_cases.filter(tc => !tc.is_hidden)[0]?.output || "No visible examples"}
\`\`\`

## Explanation

${question.example_explanation}
  `;

  return (
    <div className="p-4 overflow-auto h-full">
      <div className="prose max-w-none prose-slate prose-headings:font-bold">
        <ReactMarkdown>
          {formattedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default QuestionPanel; 
