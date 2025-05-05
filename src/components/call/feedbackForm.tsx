import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FeedbackData } from "@/types/response";
import { Interview } from "@/types/interview";
import { useRouter } from "next/navigation";

enum SatisfactionLevel {
  Positive = "😀",
  Moderate = "😐",
  Negative = "😔",
}

interface FeedbackFormProps {
  onSubmit: (data: Omit<FeedbackData, "interview_id">) => void;
  email: string;
  interview?: Interview;
}

export function FeedbackForm({ onSubmit, email, interview }: FeedbackFormProps) {
  const router = useRouter();
  const [satisfaction, setSatisfaction] = useState<SatisfactionLevel>(
    SatisfactionLevel.Moderate,
  );
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (satisfaction !== null || feedback.trim() !== "") {
      onSubmit({
        satisfaction: Object.values(SatisfactionLevel).indexOf(satisfaction),
        feedback,
        email,
      });
    }
  };

  const proceedToAssessment = () => {
    if (interview && interview.id) {
      router.push(`/assessment/${interview.id}`);
    }
  };

  const hasAssessment = interview?.has_assessment && interview?.assessment_id;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">
        Thank you for participating in this interview!
      </h3>
      
      {hasAssessment ? (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="font-medium text-blue-800 mb-2">
            This interview includes a coding assessment.
          </p>
          <p className="text-sm text-blue-700 mb-4">
            Please proceed to the coding assessment to complete the entire process.
          </p>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4"
            onClick={proceedToAssessment}
          >
            Proceed to Coding Assessment
          </Button>
          <p className="text-xs text-gray-500 text-center">
            You can also provide feedback below.
          </p>
        </div>
      ) : (
        <p className="text-gray-600 mb-4">
          We would love to hear your feedback about the platform.
        </p>
      )}
      
      <h3 className="text-lg font-semibold mb-4">
        Are you satisfied with the platform?
      </h3>
      <div className="flex justify-center space-x-4 mb-4">
        {Object.values(SatisfactionLevel).map((emoji) => (
          <button
            key={emoji}
            className={`text-3xl ${satisfaction === emoji ? "border-2 border-indigo-600" : ""}`}
            onClick={() => setSatisfaction(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
      <Textarea
        value={feedback}
        placeholder="Add your feedback here"
        className="mb-4"
        onChange={(e) => setFeedback(e.target.value)}
      />
      <Button
        disabled={satisfaction === null && feedback.trim() === ""}
        className="w-full bg-indigo-600 text-white"
        onClick={handleSubmit}
      >
        Submit Feedback
      </Button>
    </div>
  );
}
