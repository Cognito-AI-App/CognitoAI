import { NextRequest, NextResponse } from "next/server";

// Execute code via Judge0 API
export async function POST(request: NextRequest) {
  try {
    const { sourceCode, languageId, testCases } = await request.json();

    // Make sure we have code to run
    if (!sourceCode || !sourceCode.trim()) {
      return NextResponse.json(
        { error: "No code to run" },
        { status: 400 }
      );
    }

    let passedCount = 0;
    let firstFailureOutput = null;

    // Process each test case
    for (let i = 0; i < testCases.length; i++) {
      const testCase = testCases[i];

      try {
        // Prepare the request data - send raw code without base64 encoding
        const formData = {
          source_code: sourceCode,
          language_id: languageId,
          stdin: testCase.input,
          expected_output: testCase.output,
          base64_encoded: false
        };

        // Make API call to Judge0
        const response = await fetch(process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_URL || '', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_HOST || '',
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_KEY || '',
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const token = data.token;

        if (!token) {
          throw new Error('No token returned from Judge0 API');
        }

        // Poll until execution is complete
        let executionResult;
        let attempts = 0;
        const maxAttempts = 10;

        while (attempts < maxAttempts) {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const resultResponse = await fetch(
            `${process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_URL}/${token}`, 
            {
              headers: {
                'X-RapidAPI-Host': process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_HOST || '',
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_REACT_APP_RAPID_API_KEY || '',
              }
            }
          );

          if (!resultResponse.ok) {
            throw new Error(`Failed to fetch execution result: ${resultResponse.status}`);
          }

          executionResult = await resultResponse.json();

          if (executionResult.status.id !== 1 && executionResult.status.id !== 2) {
            // Status is neither "In Queue" nor "Processing"
            break;
          }

          attempts++;
        }

        if (attempts >= maxAttempts) {
          throw new Error('Execution timed out');
        }

        // Check if test passed
        if (executionResult.status.id === 3) { // Status "Accepted"
          const stdout = executionResult.stdout || '';
          const expectedOutput = testCase.output.trim();

          if (stdout.trim() === expectedOutput) {
            passedCount++;
          } else if (firstFailureOutput === null) {
            firstFailureOutput = {
              status: executionResult.status.description,
              stdout: stdout,
              stderr: executionResult.stderr || null,
              compile_output: executionResult.compile_output || null,
              time: executionResult.time,
              memory: executionResult.memory
            };
          }
        } else if (firstFailureOutput === null) {
          firstFailureOutput = {
            status: executionResult.status.description,
            stdout: executionResult.stdout || null,
            stderr: executionResult.stderr || null,
            compile_output: executionResult.compile_output || null,
            time: executionResult.time,
            memory: executionResult.memory
          };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (firstFailureOutput === null) {
          firstFailureOutput = {
            status: 'Error',
            stdout: null,
            stderr: errorMessage,
            compile_output: null,
            time: null,
            memory: null
          };
        }
      }
    }

    // Return an object with all necessary information
    return NextResponse.json({
      status: firstFailureOutput ? firstFailureOutput.status : "Accepted",
      stdout: firstFailureOutput ? firstFailureOutput.stdout : null,
      stderr: firstFailureOutput ? firstFailureOutput.stderr : null,
      compile_output: firstFailureOutput ? firstFailureOutput.compile_output : null,
      time: firstFailureOutput ? firstFailureOutput.time : null,
      memory: firstFailureOutput ? firstFailureOutput.memory : null,
      passed_test_cases: passedCount,
      total_test_cases: testCases.length
    });
  } catch (error) {
    console.error("Error executing code:", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
return NextResponse.json(
      { error: `Error executing code: ${errorMessage}` },
      { status: 500 }
    );
  }
} 
