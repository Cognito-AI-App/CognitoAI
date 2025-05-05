import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useInterviewers } from "@/contexts/interviewers.context";
import { useAssessments } from "@/contexts/assessments.context";
import { InterviewBase, Question } from "@/types/interview";
import { ChevronRight, ChevronLeft, Info } from "lucide-react";
import Image from "next/image";
import { CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import FileUpload from "../fileUpload";
import Modal from "@/components/dashboard/Modal";
import InterviewerDetailsModal from "@/components/dashboard/interviewer/interviewerDetailsModal";
import { Interviewer } from "@/types/interviewer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  open: boolean;
  setLoading: (loading: boolean) => void;
  interviewData: InterviewBase;
  setInterviewData: (interviewData: InterviewBase) => void;
  isUploaded: boolean;
  setIsUploaded: (isUploaded: boolean) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
}

function DetailsPopup({
  open,
  setLoading,
  interviewData,
  setInterviewData,
  isUploaded,
  setIsUploaded,
  fileName,
  setFileName,
}: Props) {
  const { interviewers } = useInterviewers();
  const { assessments } = useAssessments();
  const [name, setName] = useState("");
  const [selectedInterviewer, setSelectedInterviewer] = useState<bigint>(
    BigInt(0)
  );
  const [objective, setObjective] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [numQuestions, setNumQuestions] = useState("");
  const [duration, setDuration] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [interviewerDetails, setInterviewerDetails] =
    useState<Interviewer | null>(null);
  const [openInterviewerDetails, setOpenInterviewerDetails] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<number | null>(
    null
  );
  const [assessmentDuration, setAssessmentDuration] = useState("");
  const [uploadedDocumentContext, setUploadedDocumentContext] = useState("");

  const onGenrateQuestions = async () => {
    setLoading(true);
    const response = await axios.post("/api/generate-interview-questions", {
      objective,
      context: isUploaded ? uploadedDocumentContext : "",
      numQuestions,
    });

    const generatedQuestionsResponse = response.data.response ? JSON.parse(response.data.response) : response.data;

    let updatedQuestions: Question[] = [];
    if (
      generatedQuestionsResponse.questions &&
      generatedQuestionsResponse.questions.length > 0
    ) {
      updatedQuestions = generatedQuestionsResponse.questions
        .filter((question: any) => question && question.question && typeof question.question === 'string')
        .map((questionObj: any) => ({
          id: uuidv4(),
          question: questionObj.question,
          follow_up_count: 1,
        }))
        .slice(0, Number(numQuestions));
      
      // If no valid questions returned, create at least one empty question
      if (updatedQuestions.length === 0) {
        updatedQuestions = [{ 
          id: uuidv4(), 
          question: "", 
          follow_up_count: 1 
        }];
      }
    }

    const updatedInterviewData = {
      ...interviewData,
      name: name.trim(),
      objective: objective.trim(),
      questions: updatedQuestions,
      interviewer_id: selectedInterviewer,
      question_count: Number(numQuestions),
      time_duration: duration,
      description: generatedQuestionsResponse.description,
      is_anonymous: isAnonymous,
      has_assessment: hasAssessment,
      assessment_id: hasAssessment ? selectedAssessment : null,
    };
    setInterviewData(updatedInterviewData);
  };

  const onManual = () => {
    setLoading(true);

    const updatedInterviewData = {
      ...interviewData,
      name: name.trim(),
      objective: objective.trim(),
      questions: [{ id: uuidv4(), question: "", follow_up_count: 1 }],
      interviewer_id: selectedInterviewer,
      question_count: Number(numQuestions),
      time_duration: String(duration),
      description: "",
      is_anonymous: isAnonymous,
      has_assessment: hasAssessment,
      assessment_id: hasAssessment ? selectedAssessment : null,
    };
    setInterviewData(updatedInterviewData);
  };

  useEffect(() => {
    if (!open) {
      setName("");
      setSelectedInterviewer(BigInt(0));
      setObjective("");
      setIsAnonymous(false);
      setNumQuestions("");
      setDuration("");
      setIsClicked(false);
      setHasAssessment(false);
      setSelectedAssessment(null);
      setAssessmentDuration("");
    }
  }, [open]);

  return (
    <>
      <div className="text-center w-[38rem]">
        <h1 className="text-xl font-semibold">Create an Interview</h1>
        <div className="flex flex-col justify-center items-start mt-4 ml-10 mr-8">
          <div className="flex flex-row justify-center items-center">
            <h3 className="text-sm font-medium">Interview Name:</h3>
            <input
              type="text"
              className="border-b-2 focus:outline-none border-gray-500 px-2 w-96 py-0.5 ml-3"
              placeholder="e.g. Name of the Interview"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={(e) => setName(e.target.value.trim())}
            />
          </div>
          <h3 className="text-sm mt-3 font-medium">Select an Interviewer:</h3>
          <div className="flex flex-row gap-3 justify-between w-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
            <div className="flex flex-row min-w-[95%]">
              {interviewers.map((interviewer) => (
                <div
                  key={Number(interviewer.id)}
                  className="flex flex-col justify-center items-center m-2 cursor-pointer w-32"
                  onClick={() =>
                    setSelectedInterviewer(BigInt(interviewer.id))
                  }
                >
                  <div className="relative">
                    <Image
                      src={interviewer.image}
                      alt={interviewer.name}
                      width={100}
                      height={100}
                      className={`object-cover object-center rounded-full w-20 h-20 ${
                        selectedInterviewer === BigInt(interviewer.id)
                          ? "border-[3px] border-indigo-700"
                          : ""
                      }`}
                    />
                    <Info
                      className="absolute right-0 bottom-2 bg-white text-gray-700 rounded-full cursor-pointer p-1"
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation();
                        setInterviewerDetails(interviewer);
                        setOpenInterviewerDetails(true);
                      }}
                    />
                  </div>
                  <p className="text-sm font-medium mt-1">
                    {interviewer.name.length > 15
                      ? interviewer.name.slice(0, 15) + "..."
                      : interviewer.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-sm mt-5 font-medium">Interview Objective:</h3>
          <Textarea
            className="mt-2 w-full focus:outline-none border-gray-500"
            placeholder="Describe the objective of the interview. For example: To assess the candidate's communication skills and ability to handle customer complaints..."
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            onBlur={(e) => setObjective(e.target.value.trim())}
          />

          <div className="flex flex-row justify-between w-full mt-5">
            <div className="flex flex-row items-center">
              <h3 className="text-sm font-medium mr-3">Anonymous Interview:</h3>
              <Switch
                checked={isAnonymous}
                onCheckedChange={setIsAnonymous}
                className="bg-indigo-600"
              />
            </div>
            <FileUpload
              isUploaded={isUploaded}
              setIsUploaded={setIsUploaded}
              fileName={fileName}
              setFileName={setFileName}
              setUploadedDocumentContext={setUploadedDocumentContext}
            />
          </div>

          <div className="flex flex-row gap-3 justify-between w-full mt-3">
            <div className="flex flex-row justify-center items-center ">
              <h3 className="text-sm font-medium ">Number of Questions:</h3>
              <input
                type="number"
                step="1"
                max="5"
                min="1"
                className="border-b-2 text-center focus:outline-none  border-gray-500 w-14 px-2 py-0.5 ml-3"
                value={numQuestions}
                onChange={(e) => {
                  let value = e.target.value;
                  if (
                    value === "" ||
                    (Number.isInteger(Number(value)) && Number(value) > 0)
                  ) {
                    if (Number(value) > 5) {
                      value = "5";
                    }
                    setNumQuestions(value);
                  }
                }}
              />
            </div>
            <div className="flex flex-row justify-center items-center">
              <h3 className="text-sm font-medium ">Duration (mins):</h3>
              <input
                type="number"
                step="1"
                max="10"
                min="1"
                className="border-b-2 text-center focus:outline-none  border-gray-500 w-14 px-2 py-0.5 ml-3"
                value={duration}
                onChange={(e) => {
                  let value = e.target.value;
                  if (
                    value === "" ||
                    (Number.isInteger(Number(value)) && Number(value) > 0)
                  ) {
                    if (Number(value) > 10) {
                      value = "10";
                    }
                    setDuration(value);
                  }
                }}
              />
            </div>
          </div>

          <div className="flex flex-row justify-between w-full mt-5">
            <div className="flex flex-row items-center">
              <h3 className="text-sm font-medium mr-3">Include Coding Assessment:</h3>
              <Switch
                checked={hasAssessment}
                onCheckedChange={setHasAssessment}
                className="bg-indigo-600"
              />
            </div>
          </div>

          {hasAssessment && (
            <div className="w-full mt-3">
              <div className="flex flex-row items-start mb-3">
                <h3 className="text-sm font-medium mr-3">Select Assessment:</h3>
                <div className="flex-1">
                  <Select
                    value={selectedAssessment?.toString() || ""}
                    onValueChange={(value) => setSelectedAssessment(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an assessment" />
                    </SelectTrigger>
                    <SelectContent>
                      {assessments.length === 0 ? (
                        <SelectItem value="no_assessments" disabled>
                          No assessments available
                        </SelectItem>
                      ) : (
                        assessments.map((assessment) => (
                          <SelectItem
                            key={assessment.id}
                            value={assessment.id.toString()}
                          >
                            {assessment.name} ({assessment.question_count} questions, {assessment.difficulty} difficulty)
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <div className="mt-5 mb-4 w-full flex flex-row gap-3 justify-center items-center">
            <Button
              disabled={
                (name &&
                objective &&
                numQuestions &&
                duration &&
                selectedInterviewer != BigInt(0) &&
                (!hasAssessment || (hasAssessment && selectedAssessment))
                  ? false
                  : true) || isClicked
              }
              className="bg-indigo-600 hover:bg-indigo-800  w-40"
              onClick={() => {
                setIsClicked(true);
                onGenrateQuestions();
              }}
            >
              Generate Questions
            </Button>
            <Button
              disabled={
                (name &&
                objective &&
                numQuestions &&
                duration &&
                selectedInterviewer != BigInt(0) &&
                (!hasAssessment || (hasAssessment && selectedAssessment))
                  ? false
                  : true) || isClicked
              }
              className="bg-indigo-600 w-40 hover:bg-indigo-800"
              onClick={() => {
                setIsClicked(true);
                onManual();
              }}
            >
              I&apos;ll do it myself
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={openInterviewerDetails}
        closeOnOutsideClick={true}
        onClose={() => {
          setOpenInterviewerDetails(false);
        }}
      >
        <InterviewerDetailsModal interviewer={interviewerDetails || undefined} />
      </Modal>
    </>
  );
}

export default DetailsPopup;
