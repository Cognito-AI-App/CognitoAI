"use client";

import React, { useEffect, useState } from "react";
import { Analytics, CallData } from "@/types/response";
import axios from "axios";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import ReactAudioPlayer from "react-audio-player";
import { DownloadIcon, TrashIcon, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ResponseService } from "@/services/responses.service";
import { useRouter } from "next/navigation";
import LoaderWithText from "@/components/loaders/loader-with-text/loaderWithText";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { CircularProgress } from "@nextui-org/react";
import QuestionAnswerCard from "@/components/dashboard/interview/questionAnswerCard";
import { marked } from "marked";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CandidateStatus } from "@/lib/enum";
import { ArrowLeft } from "lucide-react";
import { AssessmentService } from "@/services/assessments.service";
import { AssessmentResponse } from "@/types/assessment";

type CallProps = {
  call_id: string;
  onDeleteResponse: (deletedCallId: string) => void;
  onCandidateStatusChange: (callId: string, newStatus: string) => void;
};

function CallInfo({
  call_id,
  onDeleteResponse,
  onCandidateStatusChange,
}: CallProps) {
  const [call, setCall] = useState<CallData>();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [transcript, setTranscript] = useState("");
  const [candidateStatus, setCandidateStatus] = useState<string>("");
  const [interviewId, setInterviewId] = useState<string>("");
  const [tabSwitchCount, setTabSwitchCount] = useState<number>();
  const [assessmentResponses, setAssessmentResponses] = useState<
    AssessmentResponse[]
  >([]);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      setIsLoading(true);
      setCall(undefined);
      setEmail("");
      setName("");

      try {
        const response = await axios.post("/api/get-call", { id: call_id });
        setCall(response.data.callResponse);
        setAnalytics(response.data.analytics);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call_id]);

  useEffect(() => {
    const fetchEmail = async () => {
      setIsLoading(true);
      try {
        const response = await ResponseService.getResponseByCallId(call_id);
        setEmail(response.email);
        setName(response.name);
        setCandidateStatus(response.candidate_status);
        setInterviewId(response.interview_id);
        setTabSwitchCount(response.tab_switch_count);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call_id]);

  useEffect(() => {
    const replaceAgentAndUser = (transcript: string, name: string): string => {
      const agentReplacement = "**AI interviewer:**";
      const userReplacement = `**${name}:**`;

      // Replace "Agent:" with "AI interviewer:" and "User:" with the variable `${name}:`
      let updatedTranscript = transcript
        .replace(/Agent:/g, agentReplacement)
        .replace(/User:/g, userReplacement);

      // Add space between the dialogues
      updatedTranscript = updatedTranscript.replace(/(?:\r\n|\r|\n)/g, "\n\n");

      return updatedTranscript;
    };

    if (call && name) {
      setTranscript(replaceAgentAndUser(call?.transcript as string, name));
    }
  }, [call, name]);

  useEffect(() => {
    const fetchAssessmentResponses = async () => {
      if (interviewId && email) {
        try {
          // First try to get responses filtered by email for this specific candidate
          let responses =
            await AssessmentService.getAssessmentResponsesForEmail(
              email,
              interviewId
            );

          // If no responses found by email, fallback to all responses for the interview
          if (!responses || responses.length === 0) {
            responses =
              await AssessmentService.getAssessmentResponsesForInterview(
                interviewId
              );
          }

          if (responses && responses.length > 0) {
            setAssessmentResponses(responses);
            setHasAssessment(true);
          }
        } catch (error) {
          console.error("Error fetching assessment responses:", error);
        }
      }
    };

    if (interviewId && email) {
      fetchAssessmentResponses();
    }
  }, [interviewId, email]);

  const onDeleteResponseClick = async () => {
    try {
      const response = await ResponseService.getResponseByCallId(call_id);

      if (response) {
        const interview_id = response.interview_id;

        await ResponseService.deleteResponse(call_id);

        router.push(`/interviews/${interview_id}`);

        onDeleteResponse(call_id);
      }

      toast.success("Response deleted successfully.", {
        position: "bottom-right",

        duration: 3000,
      });
    } catch (error) {
      console.error("Error deleting response:", error);

      toast.error("Failed to delete the response.", {
        position: "bottom-right",

        duration: 3000,
      });
    }
  };

  // Function to render assessment results
  const renderAssessmentResults = () => {
    if (!hasAssessment || assessmentResponses.length === 0) {
      return null;
    }

    // Get the most recent assessment response
    const response = assessmentResponses[0];

    // Calculate completion status
    const isComplete = response.is_completed;
    const tabSwitches = response.tab_switch_count || 0;

    return (
      <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 my-3">
        <p className="font-semibold my-2 mb-4">Coding Assessment</p>

        <div className="bg-slate-50 rounded-2xl p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Code className="text-indigo-600 mr-2" size={20} />
              <h3 className="font-semibold text-lg">Results Summary</h3>
            </div>
            <div className="flex items-center gap-3">
              {isComplete ? (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  Completed
                </span>
              ) : (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />
                  Incomplete
                </span>
              )}

              {tabSwitches > 0 && (
                <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-1" />
                  {tabSwitches} tab switch{tabSwitches !== 1 ? "es" : ""}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-1">Overall Score</div>
              <div
                className={`text-3xl font-bold ${
                  (response.score || 0) >= 80
                    ? "text-green-600"
                    : (response.score || 0) >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {response.score || 0}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div
                  className={`h-1.5 rounded-full ${
                    (response.score || 0) >= 80
                      ? "bg-green-600"
                      : (response.score || 0) >= 50
                        ? "bg-yellow-500"
                        : "bg-red-600"
                  }`}
                  style={{ width: `${response.score || 0}%` }}
                />
              </div>
            </div>

            <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
              <div className="text-sm text-gray-600 mb-2">
                Questions Overview
              </div>
              <div className="flex flex-wrap gap-2">
                {response.responses &&
                  Array.isArray(response.responses) &&
                  response.responses.map(
                    (questionResponse: any, index: number) => {
                      const passRate =
                        questionResponse.result.total_test_cases > 0
                          ? Math.round(
                              (questionResponse.result.passed_test_cases /
                                questionResponse.result.total_test_cases) *
                                100
                            )
                          : 0;

                      return (
                        <div
                          key={`question-summary-${index}-${questionResponse.question_id || index}`}
                          className="inline-flex items-center gap-1"
                        >
                          <div
                            className={`w-3 h-3 rounded-full ${
                              passRate >= 80
                                ? "bg-green-500"
                                : passRate >= 50
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                            }`}
                          />
                          <span className="text-xs font-medium">
                            Q{index + 1}: {passRate}%
                          </span>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>

          {response.responses &&
            Array.isArray(response.responses) &&
            response.responses.map((questionResponse: any, index: number) => {
              const passRate =
                questionResponse.result.total_test_cases > 0
                  ? Math.round(
                      (questionResponse.result.passed_test_cases /
                        questionResponse.result.total_test_cases) *
                        100
                    )
                  : 0;

              return (
                <div
                  key={`question-detail-${index}-${questionResponse.question_id || index}`}
                  className="border-t border-gray-200 pt-4 mt-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">
                      Question {index + 1}
                      {questionResponse.question_title
                        ? `: ${questionResponse.question_title}`
                        : ""}
                    </h4>
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-medium ${
                        passRate >= 80
                          ? "bg-green-100 text-green-800"
                          : passRate >= 50
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {questionResponse.result.passed_test_cases}/
                      {questionResponse.result.total_test_cases} tests passed
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>
                      Language:{" "}
                      <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                        {questionResponse.language}
                      </code>
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${
                        passRate >= 80
                          ? "bg-green-600"
                          : passRate >= 50
                            ? "bg-yellow-500"
                            : "bg-red-600"
                      }`}
                      style={{ width: `${passRate}%` }}
                    />
                  </div>
                  {(questionResponse.result.stderr ||
                    questionResponse.result.compile_output) && (
                    <div className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded">
                      {questionResponse.result.compile_output ||
                        questionResponse.result.stderr}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen z-[10] mx-2 mb-[100px] overflow-y-scroll">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-[75%] w-full">
          <LoaderWithText />
        </div>
      ) : (
        <>
          <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 y-3">
            <div className="flex flex-col justify-between bt-2">
              {/* <p className="font-semibold my-2 ml-2">
                Response Analysis and Insights
              </p> */}
              <div>
                <div className="flex justify-between items-center pb-4 pr-2">
                  <div
                    className=" inline-flex items-center text-indigo-600 hover:cursor-pointer"
                    onClick={() => {
                      router.push(`/interviews/${interviewId}`);
                    }}
                  >
                    <ArrowLeft className="mr-2" />
                    <p className="text-sm font-semibold">Back to Summary</p>
                  </div>
                  {tabSwitchCount && tabSwitchCount > 0 && (
                    <p className="text-sm font-semibold text-red-500 bg-red-200 rounded-sm px-2 py-1">
                      Tab Switching Detected
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-between gap-3 w-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-3">
                    <Avatar>
                      <AvatarFallback>{name ? name[0] : "A"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      {name && (
                        <p className="text-sm font-semibold px-2">{name}</p>
                      )}
                      {email && <p className="text-sm px-2">{email}</p>}
                    </div>
                  </div>
                  <div className="flex flex-row mr-2 items-center gap-3">
                    <Select
                      value={candidateStatus}
                      onValueChange={async (newValue: string) => {
                        setCandidateStatus(newValue);
                        await ResponseService.updateResponse(
                          { candidate_status: newValue },
                          call_id
                        );
                        onCandidateStatusChange(call_id, newValue);
                      }}
                    >
                      <SelectTrigger className="w-[180px]  bg-slate-50 rounded-2xl">
                        <SelectValue placeholder="Not Selected" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={CandidateStatus.NO_STATUS}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-gray-400 rounded-full mr-2" />
                            No Status
                          </div>
                        </SelectItem>
                        <SelectItem value={CandidateStatus.NOT_SELECTED}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                            Not Selected
                          </div>
                        </SelectItem>
                        <SelectItem value={CandidateStatus.POTENTIAL}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                            Potential
                          </div>
                        </SelectItem>
                        <SelectItem value={CandidateStatus.SELECTED}>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                            Selected
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          disabled={isClicked}
                          className="bg-red-500 hover:bg-red-600 p-2"
                        >
                          <TrashIcon size={16} className="" />
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this response.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>

                          <AlertDialogAction
                            className="bg-indigo-600 hover:bg-indigo-800"
                            onClick={async () => {
                              await onDeleteResponseClick();
                            }}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
                <div className="flex flex-col mt-3">
                  <p className="font-semibold">Interview Recording</p>
                  <div className="flex flex-row gap-3 mt-2">
                    {call?.recording_url && (
                      <ReactAudioPlayer src={call?.recording_url} controls />
                    )}
                    <a
                      className="my-auto"
                      href={call?.recording_url}
                      download=""
                      aria-label="Download"
                    >
                      <DownloadIcon size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* <div>{call.}</div> */}
          </div>
          <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 my-3">
            <p className="font-semibold my-2">General Summary</p>

            <div className="grid grid-cols-3 gap-4 my-2 mt-4 ">
              {analytics?.overallScore !== undefined && (
                <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
                  <div className="flex flex-row gap-2 align-middle">
                    <CircularProgress
                      classNames={{
                        svg: "w-28 h-28 drop-shadow-md",
                        indicator: "stroke-indigo-600",
                        track: "stroke-indigo-600/10",
                        value: "text-3xl font-semibold text-indigo-600",
                      }}
                      value={analytics?.overallScore}
                      strokeWidth={4}
                      showValueLabel={true}
                      formatOptions={{ signDisplay: "never" }}
                    />
                    <p className="font-medium my-auto text-xl">
                      Overall Hiring Score
                    </p>
                  </div>
                  <div className="">
                    <div className="font-medium ">
                      <span className="font-normal">Feedback: </span>
                      {analytics?.overallFeedback === undefined ? (
                        <Skeleton className="w-[200px] h-[20px]" />
                      ) : (
                        analytics?.overallFeedback
                      )}
                    </div>
                  </div>
                </div>
              )}
              {analytics?.communication && (
                <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
                  <div className="flex flex-row gap-2 align-middle">
                    <CircularProgress
                      classNames={{
                        svg: "w-28 h-28 drop-shadow-md",
                        indicator: "stroke-indigo-600",
                        track: "stroke-indigo-600/10",
                        value: "text-3xl font-semibold text-indigo-600",
                      }}
                      value={analytics?.communication.score}
                      maxValue={10}
                      minValue={0}
                      strokeWidth={4}
                      showValueLabel={true}
                      valueLabel={
                        <div className="flex items-baseline">
                          {analytics?.communication.score ?? 0}
                          <span className="text-xl ml-0.5">/10</span>
                        </div>
                      }
                      formatOptions={{ signDisplay: "never" }}
                    />
                    <p className="font-medium my-auto text-xl">Communication</p>
                  </div>
                  <div className="">
                    <div className="font-medium ">
                      <span className="font-normal">Feedback: </span>
                      {analytics?.communication.feedback === undefined ? (
                        <Skeleton className="w-[200px] h-[20px]" />
                      ) : (
                        analytics?.communication.feedback
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3 text-sm p-4 rounded-2xl bg-slate-50">
                <div className="flex flex-row gap-2  align-middle">
                  <p className="my-auto">User Sentiment: </p>
                  <p className="font-medium my-auto">
                    {call?.call_analysis?.user_sentiment === undefined ? (
                      <Skeleton className="w-[200px] h-[20px]" />
                    ) : (
                      call?.call_analysis?.user_sentiment
                    )}
                  </p>

                  <div
                    className={`${
                      call?.call_analysis?.user_sentiment == "Neutral"
                        ? "text-yellow-500"
                        : call?.call_analysis?.user_sentiment == "Negative"
                          ? "text-red-500"
                          : call?.call_analysis?.user_sentiment == "Positive"
                            ? "text-green-500"
                            : "text-transparent"
                    } text-xl`}
                  >
                    ●
                  </div>
                </div>
                <div className="">
                  <div className="font-medium  ">
                    <span className="font-normal">Call Summary: </span>
                    {call?.call_analysis?.call_summary === undefined ? (
                      <Skeleton className="w-[200px] h-[20px]" />
                    ) : (
                      call?.call_analysis?.call_summary
                    )}
                  </div>
                </div>
                <p className="font-medium ">
                  {call?.call_analysis?.call_completion_rating_reason}
                </p>
              </div>
            </div>
          </div>
          {/* Coding Assessment Results */}
          {hasAssessment && renderAssessmentResults()}

          {analytics &&
            analytics.questionSummaries &&
            analytics.questionSummaries.length > 0 && (
              <div className="bg-slate-200 rounded-2xl min-h-[120px] p-4 px-5 my-3">
                <p className="font-semibold my-2 mb-4">Question Summary</p>
                <ScrollArea className="rounded-md h-72 text-sm mt-3 py-3 leading-6 overflow-y-scroll whitespace-pre-line px-2">
                  {analytics?.questionSummaries.map((qs, index) => (
                    <QuestionAnswerCard
                      key={qs.question}
                      questionNumber={index + 1}
                      question={qs.question}
                      answer={qs.summary}
                    />
                  ))}
                </ScrollArea>
              </div>
            )}
          <div className="bg-slate-200 rounded-2xl min-h-[150px] max-h-[500px] p-4 px-5 mb-[150px]">
            <p className="font-semibold my-2 mb-4">Transcript</p>
            <ScrollArea className="rounded-2xl text-sm h-96  overflow-y-auto whitespace-pre-line px-2">
              <div
                className="text-sm p-4 rounded-2xl leading-5 bg-slate-50"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{ __html: marked(transcript) }}
              />
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  );
}

export default CallInfo;
