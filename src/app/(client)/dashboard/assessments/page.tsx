"use client";

import React, { useState } from "react";
import { useAssessments } from "@/contexts/assessments.context";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusIcon, ClipboardListIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Difficulty } from "@/types/codingQuestion";
import CreateAssessmentModal from "@/components/dashboard/codingAssessment/createAssessmentModal";

const difficultyColors = {
  easy: "bg-green-100 text-green-800 hover:bg-green-200",
  medium: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  hard: "bg-red-100 text-red-800 hover:bg-red-200",
};

function Assessments() {
  const { assessments, loading } = useAssessments();
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState<number | null>(null);

  const handleCreateAssessment = () => {
    setEditingAssessmentId(null);
    setIsCreateModalOpen(true);
  };

  const handleEditAssessment = (id: number) => {
    setEditingAssessmentId(id);
    setIsCreateModalOpen(true);
  };

  function AssessmentsLoader() {
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
              Coding Assessments
            </h2>
            <h3 className="text-sm tracking-tight text-gray-600 font-medium">
              Create and manage coding assessments for interviews
            </h3>
          </div>
          <Button 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={handleCreateAssessment}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Create Assessment
          </Button>
        </div>

        {loading ? (
          <AssessmentsLoader />
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assessments.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <ClipboardListIcon className="h-12 w-12 text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-600 mb-1">No assessments yet</h3>
                <p className="text-sm text-gray-500 mb-4 text-center">
                  Create your first coding assessment to get started
                </p>
                <Button 
                  className="bg-indigo-600 hover:bg-indigo-700"
                  onClick={handleCreateAssessment}
                >
                  <PlusIcon className="mr-2 h-4 w-4" /> Create Assessment
                </Button>
              </div>
            ) : (
              assessments.map((assessment) => (
                <Card 
                  key={assessment.id} 
                  className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleEditAssessment(assessment.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{assessment.name}</CardTitle>
                      <Badge className={difficultyColors[assessment.difficulty]}>
                        {assessment.difficulty}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2 mb-4">
                      {assessment.description || 'No description provided'}
                    </CardDescription>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{assessment.question_count} questions</span>
                      <span>{assessment.time_duration} minutes</span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <CreateAssessmentModal 
        isOpen={isCreateModalOpen} 
        editingAssessment={editingAssessmentId}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </main>
  );
}

export default Assessments; 
