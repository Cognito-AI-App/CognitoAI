"use client";

import React, { useState, useEffect } from "react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { CodingQuestionService } from "@/services/codingQuestions.service";
import { CodingQuestionFormData, Difficulty, TestCase } from "@/types/codingQuestion";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useCodingQuestions } from "@/contexts/codingQuestions.context";
import { Trash2Icon, PlusIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  editingQuestion?: number | null;
}

const CreateQuestionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  editingQuestion = null,
}) => {
  const { userId } = useAuth();
  const { organization } = useOrganization();
  const { fetchCodingQuestions } = useCodingQuestions();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const initialFormData: CodingQuestionFormData = {
    title: "",
    description: "",
    input_format: "",
    output_format: "",
    example_explanation: "",
    difficulty: "medium",
    test_cases: [
      {
        input: "",
        output: "",
        is_hidden: false,
      },
    ],
    is_active: true,
  };

  const [formData, setFormData] = useState<CodingQuestionFormData>(initialFormData);

  useEffect(() => {
    const loadQuestion = async () => {
      if (editingQuestion) {
        setIsEditing(true);
        setLoading(true);
        const question = await CodingQuestionService.getQuestion(editingQuestion);
        if (question) {
          setFormData({
            title: question.title,
            description: question.description,
            input_format: question.input_format,
            output_format: question.output_format,
            example_explanation: question.example_explanation,
            difficulty: question.difficulty,
            test_cases: question.test_cases,
            is_active: question.is_active,
          });
        }
        setLoading(false);
      } else {
        setIsEditing(false);
        setFormData(initialFormData);
      }
    };

    if (isOpen) {
      loadQuestion();
    }
  }, [isOpen, editingQuestion]);

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

  const handleTestCaseChange = (
    index: number,
    field: keyof TestCase,
    value: string | boolean
  ) => {
    const updatedTestCases = [...formData.test_cases];
    if (field === "is_hidden") {
      updatedTestCases[index][field] = value as boolean;
    } else {
      updatedTestCases[index][field] = value as string;
    }
    setFormData({
      ...formData,
      test_cases: updatedTestCases,
    });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      test_cases: [
        ...formData.test_cases,
        {
          input: "",
          output: "",
          is_hidden: false,
        },
      ],
    });
  };

  const removeTestCase = (index: number) => {
    if (formData.test_cases.length <= 1) {
      toast.error("You need at least one test case");
      
return;
    }
    const updatedTestCases = [...formData.test_cases];
    updatedTestCases.splice(index, 1);
    setFormData({
      ...formData,
      test_cases: updatedTestCases,
    });
  };

  const handleSubmit = async () => {
    if (!userId) {
      toast.error("Authentication error. Please try again.");
      
return;
    }

    // Validation
    if (!formData.title.trim()) {
      toast.error("Title is required");
      
return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required");
      
return;
    }
    if (!formData.input_format.trim()) {
      toast.error("Input format is required");
      
return;
    }
    if (!formData.output_format.trim()) {
      toast.error("Output format is required");
      
return;
    }
    if (!formData.example_explanation.trim()) {
      toast.error("Example explanation is required");
      
return;
    }
    if (formData.test_cases.some(tc => !tc.input.trim() || !tc.output.trim())) {
      toast.error("All test cases must have both input and output");
      
return;
    }

    setLoading(true);
    try {
      if (isEditing && editingQuestion) {
        await CodingQuestionService.updateQuestion(editingQuestion, formData);
        toast.success("Question updated successfully");
      } else {
        await CodingQuestionService.createQuestion(
          formData,
          userId,
          organization?.id || null
        );
        toast.success("Question created successfully");
      }
      fetchCodingQuestions();
      onClose();
    } catch (error) {
      console.error("Error saving question:", error);
      toast.error("Failed to save question. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {return null;}

  const formattedDescription = `
**Question Title:** ${formData.title || "Question title goes here..."}


${formData.description || "Question description goes here..."}


**Input Format:**

${formData.input_format || "Input format description..."}


**Output Format:**

${formData.output_format || "Output format description..."}


**Example:**

**Input:**
\`\`\`
${formData.test_cases[0]?.input || "Example input..."}
\`\`\`

**Output:**
\`\`\`
${formData.test_cases[0]?.output || "Example output..."}
\`\`\`


**Explanation:**

${formData.example_explanation || "Example explanation..."}
`;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle>{isEditing ? "Edit" : "Create"} Coding Question</CardTitle>
          <CardDescription>
            {isEditing
              ? "Update the details of your coding question"
              : "Create a new coding question for assessments"}
          </CardDescription>
        </CardHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-hidden">
          <div className="overflow-y-auto px-6 pb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  placeholder="Enter a title for the question"
                  onChange={handleInputChange}
                />
              </div>

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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  placeholder="Describe the problem in detail (supports markdown)"
                  rows={5}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="input_format">Input Format</Label>
                <Textarea
                  id="input_format"
                  name="input_format"
                  value={formData.input_format}
                  placeholder="Describe the format of the input (supports markdown)"
                  rows={3}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="output_format">Output Format</Label>
                <Textarea
                  id="output_format"
                  name="output_format"
                  value={formData.output_format}
                  placeholder="Describe the format of the output (supports markdown)"
                  rows={3}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="example_explanation">Example Explanation</Label>
                <Textarea
                  id="example_explanation"
                  name="example_explanation"
                  value={formData.example_explanation}
                  placeholder="Explain the example solution (supports markdown)"
                  rows={3}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Test Cases</Label>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addTestCase}
                  >
                    <PlusIcon className="h-4 w-4 mr-1" /> Add Test Case
                  </Button>
                </div>

                {formData.test_cases.map((testCase, index) => (
                  <div
                    key={index}
                    className="p-3 border rounded-md mb-3 bg-slate-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">Test Case {index + 1}</h4>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTestCase(index)}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <Label htmlFor={`input-${index}`}>Input</Label>
                        <Textarea
                          id={`input-${index}`}
                          value={testCase.input}
                          placeholder="Input for this test case"
                          rows={2}
                          onChange={(e) =>
                            handleTestCaseChange(index, "input", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor={`output-${index}`}>Output</Label>
                        <Textarea
                          id={`output-${index}`}
                          value={testCase.output}
                          placeholder="Expected output for this test case"
                          rows={2}
                          onChange={(e) =>
                            handleTestCaseChange(index, "output", e.target.value)
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id={`hidden-${index}`}
                          checked={testCase.is_hidden}
                          onCheckedChange={(checked) =>
                            handleTestCaseChange(index, "is_hidden", checked)
                          }
                        />
                        <Label htmlFor={`hidden-${index}`}>
                          Hidden test case (not shown to user)
                        </Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-50 p-6 overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Preview</h3>
            <div className="prose max-w-none prose-headings:font-bold">
              <ReactMarkdown>{formattedDescription}</ReactMarkdown>
            </div>
          </div>
        </div>

        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Saving..." : isEditing ? "Update Question" : "Create Question"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateQuestionModal; 
