/**
 * Service for code execution functionality
 */

/**
 * Execute code with test cases
 * @param sourceCode Code to execute
 * @param languageId Judge0 language ID
 * @param testCases Array of test cases with input and expected output
 * @returns Result of code execution including test case results
 */
export const executeCode = async (
  sourceCode: string,
  languageId: number,
  testCases: Array<{ input: string; output: string }>
): Promise<{
  status: string;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: string | null;
  passed_test_cases: number;
  total_test_cases: number;
}> => {
  const response = await fetch('/api/execute-code', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sourceCode,
      languageId,
      testCases
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to execute code');
  }
  
  return await response.json();
};

const CodeExecutionService = {
  executeCode
};

export default CodeExecutionService; 
