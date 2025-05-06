"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodingQuestion } from "@/types/codingQuestion";
import { AssessmentQuestionResult } from "@/types/assessment";
import { Badge } from "@/components/ui/badge";
import { Play, CheckCircle, XCircle, AlertTriangle, Clock, Cpu } from "lucide-react";

interface TestCasePanelProps {
  question: CodingQuestion;
  result: AssessmentQuestionResult;
  onRunTest: (testIndex?: number) => void;
  isSubmitting: boolean;
}

const TestCasePanel: React.FC<TestCasePanelProps> = ({
  question,
  result,
  onRunTest,
  isSubmitting,
}) => {
  // Filter out hidden test cases for display (but still show as "Hidden Test X")
  const visibleTestCases = question.test_cases.filter(tc => !tc.is_hidden);
  const hiddenTestCount = question.test_cases.length - visibleTestCases.length;

  return (
    <div className="h-full flex flex-col p-3">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Test Cases</h3>
        <div className="flex items-center gap-2">
          {result && (
            <>
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {result.time ? `${result.time} s` : "N/A"}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Cpu className="h-3 w-3" />
                {result.memory ? `${result.memory} KB` : "N/A"}
              </Badge>
            </>
          )}
          <Button 
            onClick={() => onRunTest()} 
            disabled={isSubmitting}
            size="sm"
          >
            <Play className="h-4 w-4 mr-1" /> Run All Tests
          </Button>
        </div>
      </div>

      {/* Results summary */}
      {result && result.status && (
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-500">Status</h4>
                <div className="flex items-center">
                  {result.status === "Accepted" ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                      <span className="font-medium text-green-600">Accepted</span>
                    </>
                  ) : result.status === "Runtime Error" || result.status === "Time Limit Exceeded" ? (
                    <>
                      <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                      <span className="font-medium text-amber-600">{result.status}</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                      <span className="font-medium text-red-600">{result.status}</span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-500">Test Cases</h4>
                <div className="flex items-center">
                  <span className="font-medium">{result.passed_test_cases} / {result.total_test_cases} passed</span>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-1 text-gray-500">Score</h4>
                <div className="flex items-center">
                  <span className="font-medium">{result.score}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Test cases */}
      <div className="flex-1 overflow-auto">
        <Tabs defaultValue="test-results">
          <TabsList>
            <TabsTrigger value="test-results">Test Results</TabsTrigger>
            <TabsTrigger value="standard-output">Standard Output</TabsTrigger>
            {result && result.stderr && (
              <TabsTrigger value="standard-error">Standard Error</TabsTrigger>
            )}
            {result && result.compile_output && (
              <TabsTrigger value="compile-output">Compile Output</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="test-results" className="mt-4 space-y-3">
            {visibleTestCases.map((testCase, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="flex items-center justify-between p-3 bg-slate-50 border-b">
                  <div className="flex items-center">
                    <span className="font-medium">Test Case {index + 1}</span>
                    {result && result.passed_test_cases > 0 && index < result.passed_test_cases ? (
                      <CheckCircle className="h-4 w-4 text-green-500 ml-2" />
                    ) : result && result.status ? (
                      <XCircle className="h-4 w-4 text-red-500 ml-2" />
                    ) : null}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => onRunTest(index)}
                    disabled={isSubmitting}
                  >
                    <Play className="h-3 w-3 mr-1" /> Run
                  </Button>
                </div>
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 divide-x">
                    <div className="p-3">
                      <h4 className="text-xs font-medium mb-1 text-gray-500">Input</h4>
                      <pre className="text-sm bg-slate-100 p-2 rounded whitespace-pre-wrap overflow-auto max-h-32">
                        {testCase.input}
                      </pre>
                    </div>
                    <div className="p-3">
                      <h4 className="text-xs font-medium mb-1 text-gray-500">Expected Output</h4>
                      <pre className="text-sm bg-slate-100 p-2 rounded whitespace-pre-wrap overflow-auto max-h-32">
                        {testCase.output}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Hidden test cases */}
            {hiddenTestCount > 0 && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      {hiddenTestCount} hidden test case{hiddenTestCount > 1 ? 's' : ''}
                    </span>
                    <Badge variant={result?.passed_test_cases === result?.total_test_cases ? "secondary" : "destructive"}>
                      {result?.passed_test_cases === result?.total_test_cases ? "All Passed" : "Not All Passed"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="standard-output" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {result?.stdout ? (
                  <pre className="text-sm bg-slate-100 p-3 rounded whitespace-pre-wrap overflow-auto max-h-64">
                    {result.stdout}
                  </pre>
                ) : (
                  <p className="text-gray-500">No output available. Run your code first.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="standard-error" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {result?.stderr ? (
                  <pre className="text-sm bg-slate-100 p-3 rounded whitespace-pre-wrap overflow-auto max-h-64 text-red-600">
                    {result.stderr}
                  </pre>
                ) : (
                  <p className="text-gray-500">No standard error output.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="compile-output" className="mt-4">
            <Card>
              <CardContent className="p-4">
                {result?.compile_output ? (
                  <pre className="text-sm bg-slate-100 p-3 rounded whitespace-pre-wrap overflow-auto max-h-64 text-amber-600">
                    {result.compile_output}
                  </pre>
                ) : (
                  <p className="text-gray-500">No compilation output.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestCasePanel; 
