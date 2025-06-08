"use client";

import React, { useState } from "react";
import { useCodingQuestions } from "@/contexts/codingQuestions.context";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon, CodeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { CodingQuestion, Difficulty } from "@/types/codingQuestion";
import CreateQuestionModal from "@/components/dashboard/codingQuestion/createQuestionModal";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 hover:bg-green-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  hard: "bg-red-100 text-red-800 hover:bg-red-200",
};

function CodingQuestions() {
  const { codingQuestions, loading } = useCodingQuestions();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null
  );

  const handleCreateQuestion = () => {
    setEditingQuestionId(null);
    setIsCreateModalOpen(true);
  };

  const handleEditQuestion = (id: number) => {
    setEditingQuestionId(id);
    setIsCreateModalOpen(true);
  };

  function QuestionsLoader() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-300 rounded w-1/4 mb-6" />
              <div className="h-10 bg-gray-300 rounded w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <main className="p-8 pt-0 ml-12 mr-auto rounded-md">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center mt-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mt-3">
              Coding Questions
            </h2>
            <h3 className="text-sm tracking-tight text-gray-600 font-medium">
              Create and manage coding questions for assessments
            </h3>
          </div>
<<<<<<< HEAD
          <Button
=======
          <Button 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleCreateQuestion}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Create Question
          </Button>
        </div>

        {loading ? (
          <QuestionsLoader />
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {codingQuestions.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <CodeIcon className="h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">
                  No questions yet
                </h3>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Create your first coding question to get started
                </p>
<<<<<<< HEAD
                <Button
=======
                <Button 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleCreateQuestion}
                >
                  <PlusIcon className="mr-2 h-4 w-4" /> Create Question
                </Button>
              </div>
            ) : (
              codingQuestions.map((question) => (
                <Card
                  key={question.id}
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEditQuestion(question.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">
                        {question.title}
                      </CardTitle>
                      <Badge className={difficultyColors[question.difficulty]}>
                        {question.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mb-4">
                      {question.description.replace(/<[^>]*>/g, "")}
                    </CardDescription>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{question.test_cases.length} test cases</span>
                      <span>
                        Created:{" "}
                        {new Date(question.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

<<<<<<< HEAD
      <CreateQuestionModal
        isOpen={isCreateModalOpen}
=======
      <CreateQuestionModal 
        isOpen={isCreateModalOpen} 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
        editingQuestion={editingQuestionId}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  );
}

export default CodingQuestions;
