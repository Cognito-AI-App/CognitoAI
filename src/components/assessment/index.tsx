"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";
import {
  AssessmentQuestionResponse,
  AssessmentResponse,
  Assessment as AssessmentType,
} from "@/types/assessment";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LanguageOption, getDefaultLanguage } from "./languageOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AIChatPanel from "./aiChatPanel";
import { AssessmentService } from "@/services/assessments.service";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CodeExecutionService from "@/services/codeExecution.service";
import { CodingQuestion } from "@/types/codingQuestion";
import { CodingQuestionService } from "@/services/codingQuestions.service";
import EditorPanel from "./editorPanel";
import { FeedbackData } from "@/types/response";
import { FeedbackForm } from "@/components/call/feedbackForm";
import { FeedbackService } from "@/services/feedback.service";
import { Interview } from "@/types/interview";
import QuestionPanel from "./questionPanel";
import TestCasePanel from "./testCasePanel";
import { getStarterCode } from "./codeTemplates";
import { toast } from "sonner";
import { useTabSwitchPrevention } from "@/components/call/tabSwitchPrevention";

type AssessmentProps = {
  interview: Interview;
};

function Assessment({ interview }: AssessmentProps) {
  const router = useRouter();
  const { interviewId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [assessment, setAssessment] = useState<AssessmentType | null>(null);
  const [questions, setQuestions] = useState<CodingQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentLanguage, setCurrentLanguage] =
    useState<LanguageOption>(getDefaultLanguage());
  const [code, setCode] = useState<string>("");
  const [responses, setResponses] = useState<AssessmentQuestionResponse[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [assessmentResponse, setAssessmentResponse] =
    useState<AssessmentResponse | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState<boolean>(true);
  const { tabSwitchCount } = useTabSwitchPrevention();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isFeedbackDialogOpen, setIsFeedbackDialogOpen] =
    useState<boolean>(false);
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] =
    useState<boolean>(false);

  // Fetch assessment details based on the assessment_id in the interview
  useEffect(() => {
    const fetchAssessmentData = async () => {
      if (interview.assessment_id) {
        try {
          // Get user info from sessionStorage if available
          const storedName = sessionStorage.getItem("interview_user_name");
          const storedEmail = sessionStorage.getItem("interview_user_email");

          if (storedName && storedEmail) {
            setName(storedName);
            setEmail(storedEmail);
            setIsInfoDialogOpen(false); // Skip info dialog if we have the data
          }

          const assessmentData = await AssessmentService.getAssessment(
            interview.assessment_id
          );
          if (assessmentData) {
            setAssessment(assessmentData);

            // Calculate time remaining in seconds
            const minutes = parseInt(assessmentData.time_duration || "60");
            setTimeRemaining(minutes * 60);

            // Fetch all questions
            const questionPromises = assessmentData.questions.map(
              (questionId) => CodingQuestionService.getQuestion(questionId)
            );
            const fetchedQuestions = await Promise.all(questionPromises);
            const validQuestions = fetchedQuestions.filter(
              (q) => q !== null
            ) as CodingQuestion[];
            setQuestions(validQuestions);

            // Initialize responses array with default starter code
            const initialResponses = validQuestions.map((question) => ({
              question_id: question.id,
              code: "", // We'll set this to default value based on selected language
              language: currentLanguage.value,
              result: {
                status: "",
                stdout: null,
                stderr: null,
                compile_output: null,
                time: null,
                memory: null,
                passed_test_cases: 0,
                total_test_cases: question.test_cases.length,
                score: 0,
              },
            }));
            setResponses(initialResponses);

            // Set initial code for the first question
            if (validQuestions.length > 0) {
              // Set default starter code based on language
              const starterCode = getStarterCode(currentLanguage.value);
              setCode(starterCode);

              // Update first question's code in responses array
              initialResponses[0].code = starterCode;
              setResponses(initialResponses);
            }
          }
        } catch (error) {
          console.error("Error fetching assessment data:", error);
          toast.error("Failed to load assessment");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAssessmentData();
  }, [interview.assessment_id]);

  // Effect to update code when language changes
  useEffect(() => {
    if (responses.length > 0 && currentQuestionIndex >= 0) {
      // Get the current response for the question
      const currentResponse = responses[currentQuestionIndex];

      // Store updated responses
      const updatedResponses = [...responses];

      // Check if we already have code for this language
      if (
        currentResponse.language === currentLanguage.value &&
        currentResponse.code
      ) {
        // Keep existing code for this language
        setCode(currentResponse.code);
      } else {
        // Set new starter code for the changed language
        const starterCode = getStarterCode(currentLanguage.value);
        setCode(starterCode);

        // Update in responses array
        updatedResponses[currentQuestionIndex] = {
          ...updatedResponses[currentQuestionIndex],
          code: starterCode,
          language: currentLanguage.value,
        };
        setResponses(updatedResponses);
      }
    }
  }, [currentLanguage.value, currentQuestionIndex]);

  // Handle timer
  useEffect(() => {
    if (!loading && assessment && !isInfoDialogOpen && !isCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            submitAssessment();
<<<<<<< Updated upstream
            
return 0;
          }
          
return prev - 1;
=======
<<<<<<< HEAD

            return 0;
          }

          return prev - 1;
=======
            
return 0;
          }
          
return prev - 1;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [loading, assessment, isInfoDialogOpen, isCompleted]);

  // Format time remaining
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
<<<<<<< Updated upstream
    
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
=======
<<<<<<< HEAD

    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
=======
    
return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
  };

  // Handle code change for current question
  const handleCodeChange = (newCode: string) => {
    // Update the local code state
    setCode(newCode);

    // Make sure responses array is initialized
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (responses.length === 0 || currentQuestionIndex < 0) {
      return;
    }

=======
>>>>>>> Stashed changes
    if (responses.length === 0 || currentQuestionIndex < 0) {return;}
    
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
    // Update responses array
    const updatedResponses = [...responses];
    if (updatedResponses[currentQuestionIndex]) {
      updatedResponses[currentQuestionIndex] = {
        ...updatedResponses[currentQuestionIndex],
        code: newCode,
        language: currentLanguage.value,
      };
      setResponses(updatedResponses);
    }
  };

  // Handle language change
  const handleLanguageChange = (language: LanguageOption) => {
    setCurrentLanguage(language);

    // The code update will be handled by the useEffect that watches for language changes
  };

  // Handle test run for current question
  const handleRunTests = async (testIndex?: number) => {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (!questions[currentQuestionIndex]) {
      return;
    }

=======
>>>>>>> Stashed changes
    if (!questions[currentQuestionIndex]) {return;}
    
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
    setSubmitting(true);

    const currentQuestion = questions[currentQuestionIndex];
    const currentResponse = responses[currentQuestionIndex];
    let testCases = currentQuestion.test_cases;

    // If a specific test case is selected, only run that one
    if (testIndex !== undefined) {
      testCases = [currentQuestion.test_cases[testIndex]];
    }

    try {
      // Make sure we have code to run
      if (!currentResponse.code || !currentResponse.code.trim()) {
        toast.error("Please write some code before running tests");
<<<<<<< Updated upstream
        
return;
=======
<<<<<<< HEAD

        return;
=======
        
return;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
      }

      const result = await CodeExecutionService.executeCode(
        currentResponse.code,
        currentLanguage.id,
        testCases
      );

      // Update result in responses
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = {
        ...updatedResponses[currentQuestionIndex],
        result: {
          ...result,
          passed_test_cases: result.passed_test_cases,
          total_test_cases: currentQuestion.test_cases.length,
          score: Math.round(
            (result.passed_test_cases / currentQuestion.test_cases.length) * 100
          ),
        },
      };
      setResponses(updatedResponses);

      toast.success("Code executed successfully");
    } catch (error) {
      console.error("Error running tests:", error);
      toast.error("Failed to run tests. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Create assessment response with user info
  const createAssessmentResponse = async () => {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (!assessment) {
      return null;
    }

=======
>>>>>>> Stashed changes
    if (!assessment) {return null;}
    
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
    try {
      // Calculate total score based on responses
      let totalPassedTestCases = 0;
      let totalTestCases = 0;

      // Process current responses and make sure they're up to date
      const finalResponses = [...responses];

      // Make sure the current question's code is saved in responses
      finalResponses[currentQuestionIndex] = {
        ...finalResponses[currentQuestionIndex],
        code: code,
        language: currentLanguage.value,
      };

      // Calculate total score and add question titles to responses
      finalResponses.forEach((response, index) => {
        // Add test results data
        totalPassedTestCases += response.result.passed_test_cases || 0;
        totalTestCases += response.result.total_test_cases || 0;

        // Find corresponding question and add title
        const question = questions.find((q) => q.id === response.question_id);
        if (question) {
          finalResponses[index] = {
            ...finalResponses[index],
            question_title: question.title, // Add question title to response
          };
        }
      });

      // Calculate percentage score (0-100)
      const percentageScore =
        totalTestCases > 0
          ? Math.round((totalPassedTestCases / totalTestCases) * 100)
          : 0;

      const payload = {
        assessment_id: assessment.id,
        interview_id: interview.id,
        name: name,
        email: email,
        responses: finalResponses,
        score: percentageScore,
        total_score: 100, // We're using percentage, so total is always 100
        is_completed: true,
        tab_switch_count: tabSwitchCount,
      };

      const response =
        await AssessmentService.createAssessmentResponse(payload);
      setAssessmentResponse(response);
<<<<<<< Updated upstream
      
return response;
    } catch (error) {
      console.error("Error creating assessment response:", error);
      
return null;
=======
<<<<<<< HEAD

      return response;
    } catch (error) {
      console.error("Error creating assessment response:", error);

      return null;
=======
      
return response;
    } catch (error) {
      console.error("Error creating assessment response:", error);
      
return null;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
    }
  };

  // Submit assessment
  const submitAssessment = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      setSubmitting(true);
      const response = await createAssessmentResponse();
      if (response) {
        setAssessmentResponse(response);
      }
      setIsCompleted(true);
      toast.success("Assessment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      toast.error("Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  // Navigate to next/previous question
  const navigateQuestion = (increment: number) => {
    const newIndex = currentQuestionIndex + increment;
    if (newIndex >= 0 && newIndex < questions.length) {
      // Save current code before switching
      const updatedResponses = [...responses];
      updatedResponses[currentQuestionIndex] = {
        ...updatedResponses[currentQuestionIndex],
        code: code,
        language: currentLanguage.value,
      };
      setResponses(updatedResponses);

      // Switch to new question
      setCurrentQuestionIndex(newIndex);

      // Load code for new question or set starter code if empty
      if (updatedResponses[newIndex] && updatedResponses[newIndex].code) {
        setCode(updatedResponses[newIndex].code);
      } else {
        const starterCode = getStarterCode(currentLanguage.value);
        setCode(starterCode);
        updatedResponses[newIndex] = {
          ...updatedResponses[newIndex],
          code: starterCode,
        };
        setResponses(updatedResponses);
      }
    }
  };

  // Start assessment after getting user info (if not already provided)
  const startAssessment = () => {
    // If name and email were already set from sessionStorage, just close the dialog
    if (name.trim() && email.trim()) {
      setIsInfoDialogOpen(false);
<<<<<<< Updated upstream
      
return;
=======
<<<<<<< HEAD

      return;
=======
      
return;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
    }

    // Otherwise validate the entered data
    if (!name.trim() || !email.trim()) {
      toast.error("Please enter your name and email");
<<<<<<< Updated upstream
      
return;
=======
<<<<<<< HEAD

      return;
=======
      
return;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
<<<<<<< Updated upstream
      
return;
=======
<<<<<<< HEAD

      return;
=======
      
return;
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
    }

    setIsInfoDialogOpen(false);
  };

  // Function to handle feedback submission
  const handleFeedbackSubmit = async (
    formData: Omit<FeedbackData, "interview_id">
  ) => {
    try {
      const result = await FeedbackService.submitFeedback({
        ...formData,
        interview_id: interview.id,
      });

      if (result) {
        toast.success("Thank you for your feedback!");
        setIsFeedbackSubmitted(true);
        setIsFeedbackDialogOpen(false);
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  // Add handler for applying AI-generated code
  const handleApplyAICode = (generatedCode: string) => {
    // Update the local code state
    setCode(generatedCode);

    // Make sure responses array is initialized
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
    if (responses.length === 0 || currentQuestionIndex < 0) {
      return;
    }

=======
>>>>>>> Stashed changes
    if (responses.length === 0 || currentQuestionIndex < 0) {return;}
    
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
    // Update responses array
    const updatedResponses = [...responses];
    if (updatedResponses[currentQuestionIndex]) {
      updatedResponses[currentQuestionIndex] = {
        ...updatedResponses[currentQuestionIndex],
        code: generatedCode,
        language: currentLanguage.value,
      };
      setResponses(updatedResponses);
    }

    toast.success("AI code applied to editor");
  };

  // Render completion screen
  const renderCompletionScreen = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-full max-w-2xl text-center p-6 bg-white rounded-lg shadow-md">
          <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Assessment Completed!</h2>
          <p className="mb-6">
            Thank you for completing the assessment. Your responses have been
            recorded.
          </p>

          {/* Overall Score */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Your Overall Score</h3>
            <div className="text-3xl font-bold text-indigo-600">
              {assessmentResponse?.score || 0}/100
            </div>
          </div>

          {/* Per Question Breakdown */}
          {assessmentResponse?.responses &&
            assessmentResponse.responses.length > 0 && (
              <div className="mt-6 text-left">
                <h3 className="text-lg font-semibold mb-3 text-center">
                  Score Breakdown
                </h3>
                <div className="space-y-3">
                  {assessmentResponse.responses.map((response, index) => {
                    const question = questions.find(
                      (q) => q.id === response.question_id
                    );
                    const percentScore =
                      response.result.total_test_cases > 0
                        ? Math.round(
                            (response.result.passed_test_cases /
                              response.result.total_test_cases) *
                              100
                          )
                        : 0;

                    return (
                      <div
                        key={index}
                        className="p-3 border rounded-md flex flex-col"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">
                            Question {index + 1}: {question?.title || "Unknown"}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-sm font-medium ${
                              percentScore >= 80
                                ? "bg-green-100 text-green-800"
                                : percentScore >= 50
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {response.result.passed_test_cases}/
                            {response.result.total_test_cases} Tests Passed
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className={`h-2.5 rounded-full ${
                              percentScore >= 80
                                ? "bg-green-600"
                                : percentScore >= 50
                                  ? "bg-yellow-500"
                                  : "bg-red-600"
                            }`}
                            style={{ width: `${percentScore}%` }}
                          />
                        </div>
                      </div>
<<<<<<< HEAD
                    );
                  })}
                </div>
=======
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            percentScore >= 80 ? 'bg-green-600' : 
                            percentScore >= 50 ? 'bg-yellow-500' : 
                            'bg-red-600'
                          }`} 
                          style={{ width: `${percentScore}%` }}
                         />
                      </div>
                    </div>
                  );
                })}
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
              </div>
            )}

          {!isFeedbackSubmitted ? (
<<<<<<< HEAD
            <Button
=======
            <Button 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
              className="mt-6 bg-indigo-600 text-white"
              onClick={() => setIsFeedbackDialogOpen(true)}
            >
              Provide Feedback
            </Button>
          ) : (
<<<<<<< HEAD
            <Button
=======
            <Button 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
              className="mt-6"
              onClick={() => router.push(`/call/${interviewId}`)}
            >
              Return to Interview
            </Button>
          )}

          <Dialog
            open={isFeedbackDialogOpen}
            onOpenChange={setIsFeedbackDialogOpen}
          >
            <DialogContent>
              <FeedbackForm
                email={email}
                interview={interview}
                onSubmit={handleFeedbackSubmit}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="h-[88vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
          </div>
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="h-[88vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">No Assessment Available</h2>
          <p>This interview doesn&apos;t have an assessment attached.</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return renderCompletionScreen();
  }

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      {/* User info dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start Assessment</DialogTitle>
            <DialogDescription>
              You are about to start the coding assessment for {interview.name}.
              You will have {assessment.time_duration} minutes to complete{" "}
              {assessment.question_count}{" "}
              {assessment.question_count === 1 ? "question" : "questions"}.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded-md"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 border rounded-md"
                value={email}
                placeholder="john@example.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
<<<<<<< HEAD
            <Button
              className="w-full"
=======
            <Button 
              className="w-full" 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
              disabled={!name || !email}
              onClick={startAssessment}
            >
              Start Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assessment UI */}
      <div className="h-[88vh] flex flex-col">
        {/* Header with assessment info */}
        <div className="flex justify-between items-center p-4 bg-slate-100 rounded-t-lg">
          <div>
            <h2 className="text-xl font-semibold">{assessment.name}</h2>
            <p className="text-sm text-gray-600">
              {assessment.difficulty} • {questions.length} questions
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <ClockIcon className="mr-2 h-5 w-5 text-red-500" />
              <span className="font-mono font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
<<<<<<< HEAD
            <Button
              variant="destructive"
=======
            <Button 
              variant="destructive" 
<<<<<<< Updated upstream
=======
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
>>>>>>> Stashed changes
              disabled={submitting}
              onClick={submitAssessment}
            >
              End Assessment
            </Button>
          </div>
        </div>

        {/* Question navigation */}
        <div className="flex items-center gap-2 p-2 bg-slate-50">
          <Button
            variant="outline"
            size="sm"
            disabled={currentQuestionIndex === 0}
            onClick={() => navigateQuestion(-1)}
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" /> Previous
          </Button>

          <span className="mx-2">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentQuestionIndex === questions.length - 1}
            onClick={() => navigateQuestion(1)}
          >
            Next <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-4 flex-1 overflow-hidden">
          <div className="col-span-3 bg-white rounded-lg border shadow overflow-hidden">
            {questions[currentQuestionIndex] && (
              <QuestionPanel question={questions[currentQuestionIndex]} />
            )}
          </div>

          <div className="col-span-6 flex flex-col overflow-hidden">
            <Tabs
              defaultValue="editor"
              className="flex-1 flex flex-col overflow-hidden"
            >
              <TabsList className="justify-start mb-2 shrink-0">
                <TabsTrigger value="editor">Code Editor</TabsTrigger>
                <TabsTrigger value="tests">Test Results</TabsTrigger>
              </TabsList>

              <TabsContent
                value="editor"
                className="flex-1 overflow-hidden data-[state=active]:flex-1"
              >
                <EditorPanel
                  code={code}
                  language={currentLanguage}
                  isSubmitting={submitting}
                  onCodeChange={handleCodeChange}
                  onLanguageChange={handleLanguageChange}
                  onRunCode={() => handleRunTests()}
                />
              </TabsContent>
<<<<<<< HEAD

              <TabsContent
                value="tests"
                className="flex-1 overflow-auto data-[state=active]:flex-1"
              >
                {questions[currentQuestionIndex] &&
                  responses[currentQuestionIndex] && (
                    <TestCasePanel
                      question={questions[currentQuestionIndex]}
                      result={responses[currentQuestionIndex].result}
                      isSubmitting={submitting}
                      onRunTest={handleRunTests}
                    />
                  )}
=======
              
              <TabsContent value="tests" className="flex-1 overflow-auto data-[state=active]:flex-1">
                {questions[currentQuestionIndex] && responses[currentQuestionIndex] && (
                  <TestCasePanel
                    question={questions[currentQuestionIndex]}
                    result={responses[currentQuestionIndex].result}
                    isSubmitting={submitting}
                    onRunTest={handleRunTests}
                  />
                )}
>>>>>>> ac82acc8749d2a121575bb19c95ac73a8063e21a
              </TabsContent>
            </Tabs>
          </div>

          <div className="col-span-3 bg-white rounded-lg border shadow overflow-hidden">
            {questions[currentQuestionIndex] && (
              <AIChatPanel
                question={questions[currentQuestionIndex]}
                questionIndex={currentQuestionIndex}
                currentCode={code}
                onApplyCode={handleApplyAICode}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Assessment;
