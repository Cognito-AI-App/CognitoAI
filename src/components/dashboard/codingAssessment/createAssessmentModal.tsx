"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { AssessmentService } from "@/services/assessments.service";
import { CodingQuestionService } from "@/services/codingQuestions.service";
import { AssessmentFormData } from "@/types/assessment";
import { CodingQuestion, Difficulty } from "@/types/codingQuestion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAssessments } from "@/contexts/assessments.context";
import { Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editingAssessment?: number | null;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const CreateAssessmentModal: React.FC<Props> = ({
  isOpen,
  onClose,
  editingAssessment = null,
}) => {
  const { userId } = useAuth();
  const { organization } = useOrganization();
  const { fetchAssessments } = useAssessments();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState<CodingQuestion[]>([]);
  const [open, setOpen] = useState(false);

  const initialFormData: AssessmentFormData = {
    name: "",
    description: "",
    difficulty: "medium",
    question_count: 0,
    time_duration: "30",
    questions: [],
    is_active: true,
  };

  const [formData, setFormData] = useState<AssessmentFormData>(initialFormData);

  useEffect(() => {
    const loadQuestions = async () => {
      if (userId) {
        const questions = await CodingQuestionService.getQuestionsForUserOrOrganization(
          userId,
          organization?.id || null
        );
        setAvailableQuestions(questions);
      }
    };

    if (isOpen) {
      loadQuestions();
    }
  }, [isOpen, userId, organization?.id]);

  useEffect(() => {
    const loadAssessment = async () => {
      if (editingAssessment) {
        setIsEditing(true);
        setLoading(true);
        const assessment = await AssessmentService.getAssessment(editingAssessment);
        if (assessment) {
          setFormData({
            name: assessment.name,
            description: assessment.description || "",
            difficulty: assessment.difficulty,
            question_count: assessment.question_count,
            time_duration: assessment.time_duration,
            questions: assessment.questions,
            is_active: assessment.is_active,
          });
        }
        setLoading(false);
      } else {
        setIsEditing(false);
        setFormData(initialFormData);
      }
    };

    if (isOpen) {
      loadAssessment();
    }
  }, [isOpen, editingAssessment]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDifficultyChange = (value: string) => {
    setFormData({
      ...formData,
      difficulty: value as Difficulty,
    });
  };

  const handleQuestionToggle = (questionId: number) => {
    const isSelected = formData.questions.includes(questionId);

    if (isSelected) {
      // Remove the question
      setFormData({
        ...formData,
        questions: formData.questions.filter((id) => id !== questionId),
        question_count: formData.question_count - 1,
      });
    } else {
      // Add the question
      setFormData({
        ...formData,
        questions: [...formData.questions, questionId],
        question_count: formData.question_count + 1,
      });
    }
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("Authentication error. Please try again.");
      return;
    }

    // Validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!formData.description || !formData.description.trim()) {
      toast.error("Description is required");
      return;
    }
    if (formData.questions.length === 0) {
      toast.error("You must select at least one question");
      return;
    }

    setLoading(true);
    try {
      if (isEditing && editingAssessment) {
        await AssessmentService.updateAssessment(editingAssessment, formData);
        toast.success("Assessment updated successfully");
      } else {
        await AssessmentService.createAssessment(
          formData,
          userId,
          organization?.id || null
        );
        toast.success("Assessment created successfully");
      }
      fetchAssessments();
      onClose();
    } catch (error) {
      console.error("Error saving assessment:", error);
      toast.error("Failed to save assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit" : "Create"} Coding Assessment</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update your coding assessment"
              : "Create a new coding assessment with selected questions"}
          </CardDescription>
        </CardHeader>

        <CardContent className="overflow-y-auto">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Assessment Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter a name for the assessment"
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                placeholder="Describe the purpose of this assessment"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="time_duration">Time Duration (minutes)</Label>
                <Input
                  id="time_duration"
                  name="time_duration"
                  type="number"
                  min="1"
                  value={formData.time_duration}
                  onChange={handleInputChange}
                  placeholder="30"
                />
              </div>
            </div>

<div>
  <Label className="mb-2 block">Selected Questions: {formData.questions.length}</Label>
  <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between"
      >
        Select questions
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[400px] p-0">
      <Command>
        <CommandInput placeholder="Search questions..." />
        <CommandList>
          <CommandEmpty>No questions found.</CommandEmpty>
          <CommandGroup>
            {availableQuestions.map((question) => (
              <CommandItem
                key={question.id}
                value={question.title}
                onSelect={() => handleQuestionToggle(question.id)}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  checked={formData.questions.includes(question.id)}
                  onChange={() => handleQuestionToggle(question.id)}
                  className="mr-2"
                />
                <span className="flex-1 truncate">{question.title}</span>
                <Badge className={difficultyColors[question.difficulty]}>
                  {question.difficulty}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</div>

            {formData.questions.length > 0 && (
              <div>
                <Label className="mb-2 block">Selected Questions:</Label>
                <div className="space-y-2">
                  {formData.questions.map((id) => {
                    const question = availableQuestions.find((q) => q.id === id);
                    return (
                      <div
                        key={id}
                        className="flex justify-between items-center p-2 border rounded-md"
                      >
                        <span>{question?.title || `Question #${id}`}</span>
                        <div className="flex gap-2">
                          <Badge className={difficultyColors[question?.difficulty || "medium"]}>
                            {question?.difficulty || "unknown"}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleQuestionToggle(id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : isEditing ? "Update Assessment" : "Create Assessment"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateAssessmentModal; 
