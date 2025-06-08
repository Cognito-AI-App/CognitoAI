Of course. Here is a comprehensive Product Requirement Document (PRD) for your CognitoAI project, generated from the provided codebase and documentation.

---

# Product Requirement Document: CognitoAI

|                    |                                         |
| :----------------- | :-------------------------------------- |
| **Document Title** | CognitoAI Product Requirement Document  |
| **Project**        | AI-Powered Automated Interview Platform |
| **Version**        | 1.0                                     |
| **Status**         | In Development                          |
| **Author**         | AI Assistant                            |
| **Date**           | October 26, 2023                        |

---

## 1. Introduction

### 1.1. Overview

CognitoAI is a comprehensive, AI-powered platform designed to automate and enhance the user and candidate interview process. It combines advanced conversational AI for behavioral interviews with a full-featured coding assessment environment. The platform enables organizations to create, manage, and analyze interviews at scale, providing deep, data-driven insights into a candidate's technical skills, problem-solving abilities, and communication style.

### 1.2. Problem Statement

Traditional hiring and user research processes are time-consuming, resource-intensive, and prone to human bias and scheduling conflicts. This makes it difficult to screen a large volume of candidates or gather user feedback efficiently and consistently. Recruiters and researchers need a tool that can automate the initial screening process, provide standardized evaluations, and deliver actionable insights, freeing them up for higher-value strategic tasks.

### 1.3. Target Audience

This product is designed for two primary user personas:

1.  **Clients (Recruiters, Hiring Managers, UX Researchers):** Individuals or teams within an organization responsible for screening candidates or conducting user interviews. They need to create, distribute, and analyze interviews.
2.  **Candidates / Interviewees:** Individuals applying for a job or participating in a user research session. They need a smooth, professional, and accessible interface to complete their interviews and assessments.

### 1.4. Goals and Objectives

- **For the Business:**
  - Become a leading platform for automated pre-employment screening.
  - Provide a scalable solution for companies of all sizes.
  - Establish a flexible, usage-based revenue model (implied by "free plan" and "upgrade" logic).
- **For the Client:**
  - Reduce the time and cost associated with initial screening.
  - Eliminate scheduling overhead and increase the volume of candidates screened.
  - Improve the quality and consistency of evaluations by removing human bias.
  - Gain deeper, holistic insights into a candidate's skills through combined behavioral and technical assessments.
- **For the Candidate:**
  - Provide a flexible, on-demand interview experience that can be taken anytime.
  - Ensure a fair and consistent evaluation process.
  - Offer a modern, professional, and engaging interface for both behavioral interviews and coding challenges.

---

## 2. User Personas

### 2.1. Client / Recruiter

- **Name:** Alex Chen
- **Role:** Technical Recruiter at a mid-sized tech company.
- **Goals:**
  - Quickly screen a large volume of applicants for technical roles.
  - Assess both technical skills and soft skills early in the process.
  - Share objective, data-backed feedback with the hiring team.
  - Reduce time spent on repetitive first-round interviews.
- **Frustrations:**
  - Scheduling interviews across different time zones is a nightmare.
  - Inconsistent feedback from different human interviewers.
  - Struggles to assess coding ability accurately from a resume alone.
  - Wishes the hiring process was more data-driven.

### 2.2. Candidate / Interviewee

- **Name:** Priya Sharma
- **Role:** Software Engineer with 3 years of experience.
- **Goals:**
  - Clearly demonstrate her technical and communication skills.
  - Experience a fair and modern interview process.
  - Complete the initial screening at a time that is convenient for her.
  - Get a chance to showcase her coding ability in a practical setting.
- **Frustrations:**
  - Anxious about live coding with an interviewer watching.
  - Scheduling interviews around her current job is difficult.
  - Feels that some interviewers are biased or have a bad day, affecting her performance.
  - Tired of take-home assignments that take too long.

---

## 3. Epics & User Stories

### Epic 1: Public-Facing Website & User Onboarding

_As a potential customer, I want to understand what CognitoAI does so that I can decide if it fits my needs._

- **User Story:** As a visitor, I want to view a professional landing page that clearly explains the product's features, how it works, and who it's for.
- **User Story:** As a new user, I want to be able to sign up for an account easily.
- **User Story:** As a returning user, I want to be able to sign in to my account securely.

### Epic 2: Interview Management

_As a client, I want to create and manage interviews so that I can screen candidates effectively._

- **User Story:** I want to create a new interview with a name, objective, description, and branding (theme color, logo).
- **User Story:** I want to be able to automatically generate interview questions based on a job description or other text context (PDF upload).
- **User Story:** I want to manually create or edit a list of questions for an interview, specifying the follow-up depth for each.
- **User Story:** I want to select a pre-configured AI interviewer persona for my interview.
- **User Story:** I want to be able to toggle an interview between active and inactive states.
- **User Story:** I want to get a shareable URL to send to candidates.
- **User Story:** I want to see a dashboard overview of all my created interviews and their response counts.

### Epic 3: Coding Assessment & Question Management

_As a client, I want to create and manage coding assessments so that I can test candidates' technical skills._

- **User Story:** I want to create a library of coding questions with descriptions (Markdown), difficulty levels (easy, medium, hard), and multiple test cases.
- **User Story:** I want to designate test cases as either visible examples or hidden for scoring.
- **User Story:** I want to create an assessment by selecting questions from my library and setting a time limit.
- **User Story:** I want to attach a coding assessment to a behavioral interview.
- **User Story:** I want a dedicated dashboard to view and manage all my created questions and assessments.

### Epic 4: Candidate Experience

_As a candidate, I want a seamless and professional experience so that I can perform at my best._

- **User Story:** I want to access the interview via a simple link without needing to log in.
- **User Story:** I want to engage in a voice-based conversation with a responsive AI interviewer.
- **User Story:** I want to see a transcript of the conversation in real-time.
- **User Story:** After the behavioral interview, if applicable, I want to be seamlessly guided to the coding assessment.
- **User Story:** I want to write code in a feature-rich editor (Monaco) with support for multiple programming languages.
- **User Story:** I want to run my code against provided test cases to check my work before submitting.
- **User Story:** I want to be able to get help from an AI coding assistant when I am stuck.
- **User Story:** After completing the assessment, I want to see my score and a summary of my performance.
- **User Story:** I want the option to provide feedback on the platform experience after the interview.

### Epic 5: Results & Analytics

_As a client, I want to review detailed results and analytics so that I can make informed hiring decisions._

- **User Story:** I want to see a summary dashboard for a specific interview, showing key metrics like average duration, completion rate, and candidate sentiment.
- **User Story:** I want to view a list of all candidates who have completed an interview.
- **User Story:** For each candidate, I want to see a combined score that averages their behavioral and coding assessment performance.
- **User Story:** I want to drill down into an individual candidate's response to see their full transcript, listen to the audio recording, and view their detailed scores.
- **User Story:** I want to see AI-generated analysis of a candidate's communication skills, a summary for each question, and an overall hiring recommendation.
- **User Story:** I want to view a candidate's coding assessment results, including their final code, score, and which test cases passed or failed.
- **User Story:** I want to be able to filter and sort candidates on the dashboard based on their name and scores.

---

## 4. Functional Requirements

### 4.1. Public Website

- **FR-1.1:** The system shall display a public landing page at the root URL (`/`).
- **FR-1.2:** The landing page shall include sections for: Hero, Features, How It Works, Screenshots, and Contact.
- **FR-1.3:** The header shall provide navigation links to page sections and dynamic Sign-In/Sign-Up or Dashboard buttons based on authentication state.
- **FR-1.4:** The contact form shall capture user details and submit them to the `contact_message` table via the `/api/contact-message` endpoint.
- **FR-1.5:** The footer shall include a newsletter signup form that submits to the `newsletter_subscription` table via the `/api/newsletter-subscription` endpoint.

### 4.2. Authentication & Authorization

- **FR-2.1:** User authentication shall be handled by Clerk.
- **FR-2.2:** The system shall support sign-up (`/sign-up`) and sign-in (`/sign-in`).
- **FR-2.3:** Upon successful authentication, users shall be redirected to `/dashboard`.
- **FR-2.4:** The middleware (`src/middleware.ts`) shall protect all `/dashboard` and client-side `/interview` routes, redirecting unauthenticated users to the sign-in page.
- **FR-2.5:** The system shall support Clerk Organizations, allowing users to share resources.
- **FR-2.6:** When a user is not part of an organization, a modal shall appear on the dashboard informing them of the benefits of creating or joining one.

### 4.3. Client Dashboard

- **FR-3.1:** **My Interviews Page (`/dashboard`):**
  - Displays all interviews created by the user or their organization.
  - Provides a "Create Interview" card that opens a creation modal.
  - Each interview card links to the detailed interview view (`/interviews/[interviewId]`).
- **FR-3.2:** **Interviewers Page (`/dashboard/interviewers`):**
  - Displays available AI interviewer personas in a horizontal scroll view.
  - Clicking a persona opens a modal with its detailed attributes (empathy, rapport, etc.).
- **FR-3.3:** **Questions Page (`/dashboard/questions`):**
  - Displays a list of all created coding questions.
  - Provides a "Create Question" button that opens a creation modal.
  - Clicking an existing question opens the same modal in "edit" mode.
- **FR-3.4:** **Assessments Page (`/dashboard/assessments`):**
  - Displays a list of all created coding assessments.
  - Provides a "Create Assessment" button that opens a creation modal.
  - Clicking an existing assessment opens the same modal in "edit" mode.
- **FR-3.5:** **Side Menu:** A persistent side menu shall provide navigation between Interviews, Interviewers, Questions, and Assessments.

### 4.4. Interview & Assessment Creation

- **FR-4.1: Interview Creation:**
  - The creation modal shall be a multi-step process (Details -> Questions).
  - **Details Step:** Users must provide a name, objective, number of questions, duration, and select an interviewer. They can optionally provide a description and toggle anonymity.
  - **Question Generation:** Users can choose to auto-generate questions from text context (via `/api/generate-interview-questions`) or write them manually.
  - **PDF Parsing:** Users can upload a PDF to provide context for question generation. The `parse-pdf` server action handles text extraction.
  - **Assessment Linking:** Users can toggle "Include Coding Assessment" and select from a list of their available assessments. The selected `assessment_id` is stored on the `interview` table.
- **FR-4.2: Coding Question Creation:**
  - The system must provide a modal to create/edit coding questions.
  - Required fields: Title, Description (Markdown), Input Format, Output Format, Example Explanation, Difficulty.
  - Users must be able to add one or more test cases, each with an input, an output, and a "hidden" flag.
- **FR-4.3: Assessment Creation:**
  - The system must provide a modal to create/edit assessments.
  - Required fields: Name, Difficulty, Time Duration.
  - Users must select one or more questions from their question bank to include in the assessment.

### 4.5. Candidate Interview Flow

- **FR-5.1: Behavioral Interview (`/call/[interviewId]`):**
  - The page must first check if the interview is valid and active. If not, it displays an appropriate message.
  - If the interview is not anonymous, it must collect the candidate's name and email.
  - The `register-call` API is used to initiate a session with Retell AI.
  - The UI displays the live transcript and indicates who is speaking (agent or user).
  - After the call ends, the candidate is shown a thank you message.
  - If the interview has an assessment, a button to "Proceed to Coding Assessment" is displayed.
  - Otherwise, a "Provide Feedback" button is shown.
- **FR-5.2: Coding Assessment (`/assessment/[interviewId]`):**
  - The page must first check if the interview has a valid, active assessment.
  - It presents a three-column layout: Question Panel, Editor/Test Panel, and AI Assistant Panel.
  - **Question Panel:** Displays the formatted question description, examples, and IO format.
  - **Editor Panel:**
    - Features a Monaco Editor.
    - Allows language selection from a predefined list (`languageOptions.ts`).
    - Populates the editor with starter code (`codeTemplates.ts`) when the language is changed.
    - Allows the user to run code against test cases.
  - **Test Case Panel:** Displays visible test cases and the results of code execution (status, stdout, stderr).
  - **AI Assistant Panel:**
    - Allows the candidate to chat with an AI to get help.
    - The `/api/coding-assistant` endpoint is used, which passes the user's current code for context.
    - The AI's code-only response can be applied directly to the editor.
  - **Submission & Scoring:**
    - When the time limit is reached or the user submits, the `execute-code` API is called with the final code and all test cases.
    - A score is calculated based on the percentage of passed test cases.
    - The full response, including code and results, is saved to the `assessment_response` table.
    - A completion screen is shown with the final score and a breakdown.

### 4.6. Analytics & Reporting

- **FR-6.1:** When a response is viewed, the `/api/get-call` endpoint retrieves call details from Retell.
- **FR-6.2:** If not already analyzed, the system calls the `/api/analyze-communication` endpoint to get a communication score and feedback.
- **FR-6.3:** The `generateInterviewAnalytics` service orchestrates the analysis, combining results into a single `analytics` JSON object.
- **FR-6.4:** The `analytics` object (containing overall score, communication score, etc.) is stored in the `response` table.
- **FR-6.5:** The interview summary dashboard (`/interviews/[interviewId]`) fetches all `response` and `assessment_response` records for that interview.
- **FR-6.6:** The `SummaryInfo` component calculates combined scores by averaging the behavioral score (from `response.analytics.overallScore`) and the coding score (from `assessment_response.score`).
- **FR-6.7:** The `DataTable` component displays all candidates with sortable columns for behavioral, coding, and overall scores.

---

## 5. Non-Functional Requirements

| Category            | Requirement                                                                                                                | Source / Justification                                                                               |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Performance**     | The landing page must be optimized for fast loading with efficient components and optimized images.                        | `(public)` route group, Landing page component structure.                                            |
|                     | The dashboard must handle data fetching efficiently using server state management to prevent unnecessary re-fetches.       | Use of TanStack Query is specified in `Developer-Manual.md`.                                         |
|                     | Code execution via Judge0 must handle API polling with reasonable timeouts.                                                | `execute-code` route implementation.                                                                 |
| **Security**        | All sensitive API keys and secrets must be managed via environment variables (`.env`) and not committed to source control. | `.gitignore` includes `.env`. `env.example` provides the schema.                                     |
|                     | Client-facing dashboard routes must be protected and require authentication.                                               | `middleware.ts` uses Clerk to protect routes.                                                        |
|                     | User-level authorization must be in place (e.g., users can only see data for their user ID or organization ID).            | `interviews.service.ts` uses `.or("organization_id.eq... ,user_id.eq...")`.                          |
|                     | Webhook signatures (e.g., from Retell) must be verified to prevent unauthorized access.                                    | Mentioned as a `TODO`/verification needed in `response-webhook/route.ts`.                            |
| **Usability**       | The application must be responsive, though the primary experience is designed for desktop.                                 | Mobile-specific messages on sign-in/sign-up pages. `Developer-Manual.md` mentions responsive design. |
|                     | The UI should be consistent, leveraging a component library (Shadcn/ui).                                                   | `components.json`, `components/ui` directory.                                                        |
| **Accessibility**   | The application should adhere to accessibility best practices, including semantic HTML and ARIA attributes.                | Stated as a requirement in `Developer-Manual.md`.                                                    |
|                     | Color contrast and keyboard navigation must be considered in UI development.                                               | Stated as a requirement in `Developer-Manual.md`.                                                    |
| **Scalability**     | The application is containerized using Docker for consistent deployments.                                                  | `Dockerfile` and `docker-compose.yml` are present.                                                   |
|                     | The architecture separates the frontend from backend API routes, allowing them to be scaled independently.                 | Next.js App Router structure.                                                                        |
| **Maintainability** | Developers must follow the branching, commit message, and PR conventions outlined in the `Developer-Manual.md`.            | `Developer-Manual.md`.                                                                               |
|                     | Code must be formatted using Prettier and linted with ESLint, enforced by a CI pipeline.                                   | `.eslintrc.js`, `.github/workflows/ci.yml`.                                                          |

---

## 6. Assumptions and Dependencies

- **External Services:** The application is critically dependent on the following third-party services being available and correctly configured:
  - **Clerk:** For user authentication and organization management.
  - **Supabase:** For the PostgreSQL database and data storage.
  - **OpenAI:** For all AI-driven text generation and analysis (questions, insights, communication, coding assistant).
  - **Retell AI:** For the conversational AI call infrastructure.
  - **Judge0 (via RapidAPI):** For sandboxed code execution.
- **Environment:** The application assumes a Node.js environment and is designed to be run via `yarn` or within a Docker container.
- **Cost Management:** The project assumes that API usage costs for OpenAI, Retell AI, and Judge0 will be monitored and managed.
- **Browser Compatibility:** The application is assumed to target modern web browsers (e.g., Chrome, Firefox, Safari, Edge) that support the Web Audio API for the interview call functionality.
