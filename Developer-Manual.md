**CognitoAI Development Manual**

**Version:** 1.0

**Last Updated:** May 2025

**Purpose:** This manual outlines the standard development practices for the CognitoAI project. Adhering to these guidelines is crucial for maintaining code quality, consistency, and collaboration efficiency. All developers working on the project are expected to follow these procedures.

**Table of Contents:**

1.  [General Development Workflow](#1-general-development-workflow)
    *   [Branching Strategy](#branching-strategy)
    *   [Commit Messages](#commit-messages)
    *   [Pull Requests (PRs)](#pull-requests-prs)
    *   [Linting & Formatting](#linting--formatting)
    *   [Dependency Management](#dependency-management)
    *   [Environment Variables](#environment-variables)
    *   [Documentation](#documentation)
2.  [Frontend Development Practices](#2-frontend-development-practices)
    *   [Component Structure & Naming](#component-structure--naming)
    *   [Styling (Tailwind & Shadcn/ui)](#styling-tailwind--shadcnui)
    *   [State Management](#state-management)
    *   [API Interaction](#api-interaction)
    *   [Routing](#routing)
    *   [Accessibility](#accessibility)
    *   [Testing (Frontend)](#testing-frontend)
3.  [Backend Development Practices](#3-backend-development-practices)
    *   [API Routes & Server Actions](#api-routes--server-actions)
    *   [Database Interactions (Supabase)](#database-interactions-supabase)
    *   [Service Layer (`src/services`)](#service-layer-srcservices)
    *   [Error Handling](#error-handling)
    *   [Logging](#logging)
    *   [Security Considerations](#security-considerations)
    *   [Testing (Backend)](#testing-backend)
4.  [AI Development Practices](#4-ai-development-practices)
    *   [Coding Assessments](#coding-assessments)
    *   [Prompt Engineering](#prompt-engineering)
    *   [LLM Interaction (OpenAI)](#llm-interaction-openai)
    *   [Conversational AI (Retell)](#conversational-ai-retell)
    *   [Data Handling for AI](#data-handling-for-ai)
    *   [Result Processing & Storage](#result-processing--storage)
    *   [Cost Management](#cost-management)
    *   [Ethical Considerations & Bias](#ethical-considerations--bias)
    *   [Testing (AI)](#testing-ai)
5.  [Updating This Manual](#5-updating-this-manual)

---

## 1. General Development Workflow

These practices apply to **all** types of development (Frontend, Backend, AI).

### Branching Strategy

*   **Base Branch:** All new work starts from the `dev` branch. **Never** work directly on `main` or `dev`.
*   **Branch Naming:** Use descriptive names prefixed with `feat/`, `fix/`, `chore/`, `docs/`, etc.
    *   Example: `feat/add-interview-sharing`, `fix/dashboard-layout-mobile`, `chore/update-dependencies`
*   **Scope:** Keep branches focused on a single feature or bug fix. Avoid large, multi-purpose branches.

### Commit Messages

*   **Format:** Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification. This helps automate release notes and provides a clear history.
    *   `<type>[optional scope]: <description>`
    *   Examples:
        *   `feat: add share button to interview card`
        *   `fix(api): handle null responses from Retell correctly`
        *   `docs: update README with development manual`
        *   `style: format code using Prettier`
        *   `refactor: simplify state management in call component`
        *   `test: add unit tests for utils functions`
        *   `chore: upgrade Next.js to 14.x.x`
*   **Clarity:** Write clear, concise messages explaining *what* the commit does and *why*.

### Pull Requests (PRs)

*   **Target Branch:** Always target the `dev` branch for PRs.
*   **Title:** Use a clear, descriptive title, often mirroring the primary commit message type and description (e.g., `feat: Add Interview Sharing Functionality`).
*   **Description:**
    *   Clearly explain the purpose of the PR and the changes made.
    *   Reference any related issues (e.g., `Closes #123`).
    *   Include steps for testing or screenshots/GIFs for UI changes if helpful.
*   **Review:** Assign at least one other developer for review (if applicable). Address feedback before merging.
*   **CI Checks:** Ensure all automated checks (Linting, Formatting via GitHub Actions `ci.yml`) pass before merging.
*   **Merging:** Use "Squash and merge" or "Rebase and merge" (based on team preference, ensure `dev` history stays clean) once approved and checks pass. Delete the feature branch after merging.

### Linting & Formatting

*   **Tools:** ESLint (`.eslintrc.js`) and Prettier are configured.
*   **Execution:**
    *   Run `yarn lint` to check for code quality issues. Fix all errors and address warnings.
    *   Run `npx prettier --check .` to check formatting.
    *   Run `npx prettier --write .` to automatically format code before committing.
*   **Consistency:** Adhere to the established rules to maintain a consistent codebase. Configure your IDE to format on save using Prettier.

### Dependency Management

*   **Package Manager:** Use `yarn` (v1.x as per `package.json`).
*   **Adding Dependencies:** Use `yarn add <package-name>` or `yarn add --dev <package-name>`.
*   **Updating Dependencies:** Update dependencies cautiously. Test thoroughly after updates. Use tools like `yarn outdated` to check for updates.

### Environment Variables

*   **Secrets:** Store all API keys, secrets, and environment-specific configurations in the `.env` file.
*   **Schema:** Keep `.env.example` updated with all required variables, using placeholder values.
*   **Security:** **Never** commit the `.env` file to version control. It is listed in `.gitignore`.

### Documentation

*   **README:** Keep the main `README.md` updated with major changes to architecture, setup, or features.
*   **Code Comments:** Add comments to explain complex logic, non-obvious code sections, or `// TODO:` markers for future work. Use JSDoc comments for functions where appropriate.

---

## 2. Frontend Development Practices

Applies to changes within `src/app/(client)/`, `src/app/(user)/`, `src/components/`, `src/contexts/`, styling, and client-side logic.

### Component Structure & Naming

*   **Location:**
    *   Reusable base UI elements (often from Shadcn): `src/components/ui/`
    *   App-specific reusable components: `src/components/` (e.g., `Navbar`, `SideMenu`)
    *   Feature-specific components: `src/components/<feature>/` (e.g., `src/components/dashboard/interview/InterviewCard.tsx`)
    *   Landing page components: `src/components/landing/` (e.g., `Header`, `Hero`, `Features`)
    *   Page-specific components (if not reusable): Co-locate within the `src/app/.../page.tsx` directory or a subfolder if complex.
*   **Naming:** Use `PascalCase` for component file names and function/class names (e.g., `InterviewCard.tsx`, `function InterviewCard(...)`).
*   **File Structure:** For complex components, consider grouping related files (e.g., component, styles, types) in a dedicated folder.
*   **Props:** Use TypeScript interfaces for defining component props. Keep prop names clear and descriptive.

### Landing Page Components

*   **Structure:** Landing page components are organized in `src/components/landing/` with a clean export structure via `index.ts`
*   **Key Components:**
    *   **`Header`**: Navigation with authentication-aware CTAs, responsive mobile menu
    *   **`Hero`**: Main value proposition with dynamic CTAs based on auth state
    *   **`Features`**: Grid-based feature showcase with icons and descriptions
    *   **`HowItWorks`**: Step-by-step process explanation with visual flow
    *   **`Screenshots`**: Interactive gallery with category filtering and navigation
    *   **`Contact`**: Contact information and form with validation
    *   **`Footer`**: Company information, links, and social media
*   **Design Principles:**
    *   **Responsive First:** All components built mobile-first with progressive enhancement
    *   **Performance:** Optimized images, lazy loading, and efficient re-renders
    *   **Accessibility:** Proper ARIA labels, keyboard navigation, and semantic HTML
    *   **SEO:** Structured data, meta tags, and semantic markup
*   **Authentication Integration:** Components adapt based on Clerk authentication state
*   **Contact Management:** Contact details stored in `src/lib/contact.ts` for easy updates

### Assessment Dashboard Components

*   **DataTable (`src/components/dashboard/interview/dataTable.tsx`):**
    *   **Purpose:** Displays candidate results with sortable columns for different score types
    *   **Key Properties:**
        * `data`: Array of `TableData` objects containing all score types
        * `interviewId`: Used for linking to detailed candidate views
    *   **Score Handling:**
        * Displays behavioral scores as "Behavioral Score"
        * Displays coding assessment scores as "Coding Score" 
        * Calculates and displays combined scores as "Overall Score"
        * Provides sorting functionality for all score types
        * Handles null values for candidates missing either score type
    *   **UI Features:**
        * Color coding based on score values
        * Tooltips for additional information
        * Expandable summary text on hover

*   **SummaryInfo (`src/components/dashboard/interview/summaryInfo.tsx`):**
    *   **Purpose:** Shows interview overview with candidate list and statistics
    *   **Score Calculation:**
        * Fetches assessment responses for all candidates
        * Matches responses to candidates based on email
        * Calculates combined scores by averaging behavioral and coding scores
        * Prepares data for the DataTable component
    *   **Data Flow:**
        ```typescript
        // Find assessment response for each candidate
        const assessmentResponse = assessmentResponses.find(
          (ar) => ar.email === response.email
        );
        
        // Calculate combined score
        let combinedScore = behavioralScore;
        if (codingScore !== null) {
          combinedScore = Math.round((behavioralScore + codingScore) / 2);
        }
        ```

*   **Candidate List (`src/app/(client)/interviews/[interviewId]/page.tsx`):**
    *   **Purpose:** Displays list of candidates with status indicators and scores
    *   **Score Implementation:**
        * Fetches assessment responses for interview
        * Calculates combined score on-the-fly for each candidate
        * Displays combined score in candidate badge
        * Shows tooltip indicating "Overall Score"
    *   **UI Considerations:**
        * Compact display with essential information
        * Visual indicators for unread responses
        * Color-coded status markers

### Styling (Tailwind & Shadcn/ui)

*   **Primary Method:** Use Tailwind CSS utility classes directly in your JSX.
*   **Shadcn/ui:** Leverage Shadcn components for common UI patterns. Customize them via Tailwind classes passed in the `className` prop.
*   **Conditional Classes:** Use the `cn` utility from `src/lib/utils.ts` for merging and applying conditional classes.
*   **CSS Modules:** Use CSS Modules (`*.module.css`) only for complex, scoped animations or styles that are difficult to achieve with Tailwind alone (as seen in `loader.module.css`).
*   **Global Styles:** Keep `src/app/globals.css` minimal, primarily for Tailwind directives and base CSS variable definitions.
*   **Avoid Inline Styles:** Prefer utility classes or CSS Modules over inline `style` attributes unless absolutely necessary (e.g., dynamic styles based on JS variables like theme color).

### State Management

*   **Local State:** Use `useState` or `useReducer` for state confined to a single component.
*   **Server State / Caching:** Use TanStack Query (`@tanstack/react-query`) for fetching, caching, and synchronizing server data (API responses). Utilize `useQuery` for reads and `useMutation` for writes/updates.
*   **Global/Shared Client State:** Use React Context API (`src/contexts/`) for state that needs to be shared across multiple components but isn't server data (e.g., Interviewer/Interview list fetched once, potentially client settings). Design contexts narrowly around specific domains.

### API Interaction

*   **Service Layer:** All direct API calls from the frontend should ideally go through functions defined in the `src/services/` directory (e.g., `InterviewService.getAllInterviews`).
*   **Fetching:** Use TanStack Query hooks (`useQuery`) within components or custom hooks to call service functions.
*   **Mutations:** Use TanStack Query hooks (`useMutation`) for actions that modify server data (create, update, delete). Handle `onSuccess`, `onError` callbacks within the mutation setup.
*   **Loading/Error States:** Always handle loading and error states returned by TanStack Query. Display appropriate UI feedback (e.g., loaders from `src/components/loaders/`, error messages using `toast` or inline).
*   **Data Transformation:** Perform necessary data transformations either in the service layer function or within the component after fetching, keeping components focused on presentation.

### Routing

*   **Navigation:** Use the Next.js `Link` component (`<Link href="...">`) for declarative navigation between pages.
*   **Programmatic Navigation:** Use the `useRouter` hook from `next/navigation` for imperative navigation (e.g., after a form submission).
*   **Route Structure:** Follow the App Router conventions defined in `src/app/`. Use route groups and dynamic segments:
    *   **`(public)`**: Public routes including landing page (no authentication required)
    *   **`(client)`**: Protected routes for authenticated users (dashboard, interviews, etc.)
    *   **`(user)`**: Public-facing routes for interviewees (call interface, assessments)
    *   **Dynamic segments**: Use `[interviewId]` pattern for parameterized routes

### Accessibility (A11y)

*   **Semantic HTML:** Use appropriate HTML elements (e.g., `<button>`, `<nav>`, `<main>`).
*   **ARIA Attributes:** Use ARIA attributes where necessary, especially for custom components, to provide context for assistive technologies. Shadcn/ui components generally handle this well.
*   **Keyboard Navigation:** Ensure all interactive elements are reachable and operable via keyboard.
*   **Focus Management:** Maintain logical focus order.
*   **Color Contrast:** Ensure sufficient contrast between text and background colors (use tools to check).

### Testing (Frontend)

*   **(Aspirational)** Write unit tests for utility functions (`src/lib/`) and complex components using Jest/Vitest and React Testing Library.
*   **(Aspirational)** Write integration tests for components that involve state management or API interactions.

---

## 3. Backend Development Practices

Applies to changes within `src/app/api/`, `src/actions/`, `src/services/`, and database interactions.

### API Routes & Server Actions

*   **Location:**
    *   Standard RESTful endpoints: `src/app/api/.../route.ts`.
    *   Server-side mutations/actions callable from client components: `src/actions/...ts` (using `"use server";`).
*   **Request/Response:** Use `NextRequest` and `NextResponse` types. Return appropriate HTTP status codes (200, 201, 400, 401, 403, 404, 500).
*   **Input Validation:** Validate incoming request bodies or parameters rigorously. Use Zod schemas for complex validation. Return 400 Bad Request for invalid input.
*   **Idempotency:** Design `PUT` and `DELETE` requests to be idempotent where applicable.
*   **Single Responsibility:** Keep API routes focused on a specific task.

### Database Interactions (Supabase)

*   **Client:** Use the Supabase client (`@supabase/supabase-js`). Initialize it appropriately (client-side vs. server-side clients might be needed depending on context).
*   **Service Layer Abstraction:** All direct database queries should be encapsulated within functions in the `src/services/` directory. API routes/actions should call these service functions.
*   **Error Handling:** Check for errors returned by Supabase calls and handle them gracefully (log the error, return appropriate API response).
*   **Query Efficiency:** Write efficient SQL queries. Use Supabase's features like `.select()` projections to fetch only necessary data. Be mindful of joins and potential performance bottlenecks.
*   **User/Organization Handling:** Services should support fetching data for either:
    *   Organization members (data shared across the organization)
    *   Individual users (personal data not associated with any organization)
    *   Use the `.or()` condition with both `user_id` and `organization_id` for optimal queries: `.or("organization_id.eq.${organizationId},user_id.eq.${userId}")` 
*   **Schema Changes:**
    *   Modify the `supabase_schema.sql` file to reflect changes.
    *   Generate new TypeScript types using `supabase gen types typescript ...` (or similar command) and update `src/types/database.types.ts`.
    *   Apply schema changes to the Supabase instance (via SQL Editor or migrations tool).
*   **Database Schema (Key Tables):**
    *   **`organization`**: Client organizations
    *   **`user`**: User profiles linked to Clerk users and organizations
    *   **`interviewer`**: AI interviewer profiles
    *   **`interview`**: Interview configuration, with optional `has_assessment` flag and `assessment_id` reference
    *   **`response`**: Interview responses and analysis
    *   **`feedback`**: Platform feedback
    *   **`coding_question`**: Coding questions with difficulty, description, test cases (JSON) (NEW)
    *   **`assessment`**: Assessments composed of selected coding questions (NEW)
    *   **`assessment_response`**: Candidate responses to assessments (NEW)
    *   **`difficulty`**: Enum type ('easy', 'medium', 'hard') for coding questions (NEW)

### Service Layer (`src/services`)

*   **Purpose:** Encapsulate business logic and data access (database queries, external API calls).
*   **Structure:** Organize services by domain (e.g., `interviews.service.ts`, `analytics.service.ts`).
*   **Reusability:** Services should be reusable by different API routes, server actions, or potentially other services.
*   **Dependency Injection (Conceptual):** While not explicitly using a framework, think about dependencies (like the Supabase client) being implicitly available.
*   **Key Services:**
    *   **`clients.service.ts`**: User and organization operations
    *   **`interviewers.service.ts`**: Interviewer CRUD operations
    *   **`interviews.service.ts`**: Interview management, including assessment linking
    *   **`responses.service.ts`**: Interview response and analysis handling
    *   **`analytics.service.ts`**: Communication analysis and insights generation
    *   **`coding-questions.service.ts`**: CRUD operations for coding questions (NEW)
    *   **`assessments.service.ts`**: Assessment creation, management, and response handling (NEW)

### Error Handling

*   **Try/Catch:** Wrap potentially failing operations (DB queries, external API calls, complex logic) in `try...catch` blocks.
*   **Logging:** Log detailed error information using the `logger` (`src/lib/logger.ts`) within `catch` blocks. Include context if possible.
*   **API Responses:** Return meaningful error responses with appropriate HTTP status codes (e.g., 500 for internal server errors, 404 for not found). Avoid exposing sensitive error details to the client.

### Logging

*   **Tool:** Use the custom `logger` (`src/lib/logger.ts`).
*   **What to Log:**
    *   API request received (Info level).
    *   Significant operations start/end (Info level, e.g., "Generating insights for interview X").
    *   Errors (Error level, with stack trace or details).
    *   Unexpected conditions (Warn level).
*   **Clarity:** Logs should be informative and provide context.

### Security Considerations

*   **Authentication:** Clerk middleware (`src/middleware.ts`) protects most client routes. Ensure API routes that require authentication verify the user session if not automatically handled by middleware configuration.
*   **Authorization:** Check if the authenticated user has permission to perform the requested action (e.g., can user X modify interview Y belonging to organization Z?).
*   **Input Sanitization:** While Supabase client helps prevent basic SQL injection, be cautious with user-provided data used in constructing external API calls or dynamic prompts.
*   **Rate Limiting:** Consider adding rate limiting to sensitive or expensive API endpoints if abuse is a concern.
*   **Secret Management:** Never hardcode secrets; use environment variables (`.env`).

### Testing (Backend)

*   **(Aspirational)** Write integration tests for API routes and service functions, potentially mocking database calls or external APIs.

---

## 4. AI Development Practices

Applies to changes related to LLMs (OpenAI), conversational AI (Retell), prompts (`src/lib/prompts/`), and AI-driven analysis (`src/services/analytics.service.ts`).

### Coding Assessments

*   **Overview:** The platform now supports coding assessments that can be attached to interviews, providing a LeetCode-like experience integrated directly into the interview workflow.

*   **Feature Flow:**
    1. Interviewer creates coding questions with description, difficulty, and test cases
    2. Interviewer creates an assessment by selecting questions and setting time limits
    3. Interviewer links the assessment to an interview during interview creation/edit
    4. Interviewee completes behavioral interview and is prompted to proceed to assessment
    5. Interviewee completes coding assessment with timed challenges
    6. Results are automatically scored and stored for interviewer review

*   **AI Coding Assistant:**
    *   Assessments now include an AI coding assistant panel that helps candidates generate code solutions
    *   The assistant uses OpenAI (GPT-4o) to provide code suggestions based on the candidate's specific requests
    *   Key features:
        *   Per-question chat history maintained throughout the assessment
        *   "Apply Code" button to paste AI-generated code directly into the editor
        *   "Clear History" button to reset the conversation for the current question
        *   Focused on generating clean, working code without explanations or comments
        *   Does NOT know the question details - candidates must articulate their needs
        *   Uses the candidate's current code as context to provide relevant assistance
    *   Implementation:
        *   Uses a dedicated API endpoint (`/api/coding-assistant`)
        *   Prompts optimized for code generation in `src/lib/prompts/codingAssistant.ts`
        *   Chat panel component in `src/components/assessment/aiChatPanel.tsx`
        *   Stateful conversations maintained via React refs to persist across question changes
        *   No database persistence required as chats are session-based per assessment
        *   Passes current code to the API for contextual assistance
    *   Architecture Design:
        *   Three-column layout: Question Panel, Editor+Test Panel, AI Chat Panel
        *   React component maintains isolated chat history for each question using Map data structure
        *   OpenAI API integration uses system prompts to enforce code-only responses
        *   Clean handoff between AI and editor via the Apply Code function
        *   Pedagogically sound approach - candidates must understand and articulate the problem
    *   Extension Guidelines:
        *   Adding more advanced features to the AI (e.g., code explanation, optimization suggestions):
          1. Update `codingAssistant.ts` with additional prompt sections and instructions
          2. Modify the `aiChatPanel.tsx` to include new UI controls for these features
          3. Extend the API route to support new parameters for these features
        *   Supporting additional LLM providers:
          1. Create provider-specific API handlers in the backend
          2. Implement adapter pattern in `coding-assistant/route.ts` to support multiple providers
          3. Add provider selection in environment variables or UI if needed

*   **Database Schema:**
    *   `difficulty`: An enum type with values 'easy', 'medium', 'hard'.
    *   `coding_question`: Stores questions with description, difficulty, starter code, and test cases.
        ```sql
        CREATE TABLE coding_question (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            input_format TEXT NOT NULL,
            output_format TEXT NOT NULL,
            example_explanation TEXT NOT NULL,
            difficulty difficulty NOT NULL,
            test_cases JSONB NOT NULL,
            organization_id TEXT REFERENCES organization(id),
            user_id TEXT REFERENCES "user"(id),
            is_active BOOLEAN DEFAULT true
        );
        ```
    *   `assessment`: Defines assessments composed of multiple coding questions.
        ```sql
        CREATE TABLE assessment (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
            name TEXT NOT NULL,
            description TEXT,
            difficulty difficulty NOT NULL,
            question_count INTEGER NOT NULL,
            time_duration TEXT NOT NULL,
            questions INTEGER[] NOT NULL,
            organization_id TEXT REFERENCES organization(id),
            user_id TEXT REFERENCES "user"(id),
            is_active BOOLEAN DEFAULT true
        );
        ```
    *   `assessment_response`: Records candidate responses to assessments.
        ```sql
        CREATE TABLE assessment_response (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
            assessment_id INTEGER REFERENCES assessment(id),
            interview_id TEXT REFERENCES interview(id),
            name TEXT,
            email TEXT,
            responses JSONB,
            score INTEGER,
            total_score INTEGER,
            is_completed BOOLEAN DEFAULT false,
            tab_switch_count INTEGER
        );
        ```
    *   `interview` updates: Added `has_assessment` and `assessment_id` fields to link interviews with assessments.

*   **TypeScript Types:**
    *   `CodingQuestion`: Represents a coding question with test cases.
    *   `Assessment`: Represents an assessment consisting of multiple questions.
    *   `AssessmentResponse`: Represents a candidate's response to an assessment.
    *   `AssessmentQuestionResponse`: Represents response to an individual question.
    *   `AssessmentQuestionResult`: Contains execution results for a question.

*   **Components:**
    *   **Question Management:** Dashboard for creating/editing coding questions with Markdown preview and test case editing.
        * `components/dashboard/codingQuestion/createQuestionModal.tsx`: Modal for creating and editing questions with live Markdown preview.
    *   **Assessment Management:** Creation/editing interface with question selection and difficulty filtering.
        * `app/(client)/dashboard/assessments/page.tsx`: Assessment management dashboard.
    *   **Interview Integration:** Updated interview creation to optionally include assessment selection.
        * Integration in interview creation/edit forms.
    *   **Assessment Execution:** Interface for candidates to take assessments with Monaco Editor and test execution.
        * `app/(user)/assessment/[interviewId]/page.tsx`: Main assessment page for interviewees.
        * `components/assessment/index.tsx`: Assessment component orchestrating the execution flow.

*   **Assessment Component Structure:**
    *   `assessment/index.tsx`: Main component that:
        * Fetches the assessment data and questions
        * Manages state for questions, responses, timer, language selection
        * Orchestrates code execution via Judge0 API
        * Handles submission and scoring
    *   `assessment/editorPanel.tsx`: Monaco editor component for code editing with:
        * Language selection and syntax highlighting
        * Theme and font size customization
        * Keyboard shortcuts for running code
    *   `assessment/questionPanel.tsx`: Displays the question content using Markdown
    *   `assessment/testCasePanel.tsx`: Displays test cases, execution results, and provides UI for running tests
    *   `assessment/codeTemplates.ts`: Defines starter code templates for each programming language
    *   `assessment/languageOptions.ts`: Defines all supported languages with their Judge0 API IDs

*   **Code Editor Implementation:**
    *   **Monaco Editor:** Uses `@monaco-editor/react` for a feature-rich code editing experience.
        * Syntax highlighting for different languages
        * Line numbers, code folding, search/replace
        * Auto-indentation and bracket matching
    *   **Language Support:** Dynamically adapts syntax highlighting and starter templates based on selected language.
        * When user changes language, editor updates highlighting and editor model
        * Each language has appropriate starter code with comments
    *   **Custom Features:**
        * Keyboard shortcuts (Ctrl+Enter to run code)
        * Theme switching (light/dark)
        * Font size adjustment

*   **Code Execution with Judge0:**
    *   **API Integration:** Uses Judge0 API (via RapidAPI) to execute code against test cases.
        * Implementation in `runCode` function within `assessment/index.tsx`
        * Sends source code, language ID, input, and expected output
        * Handles API response to determine test success/failure
    *   **Request Flow:**
        1. Submit code with test input to Judge0 API
        2. Receive a token representing the submission
        3. Poll for results using the token
        4. Process execution results (stdout, stderr, compile errors)
        5. Compare actual output with expected output
    *   **Test Case Handling:** Support for visible examples and hidden test cases.
        * Visible test cases show both input and expected output
        * Hidden test cases are used for scoring but inputs/outputs not shown to user
    *   **Result Processing:** Parsing and displaying execution results including output, errors, compilation issues.
        * Tabbed interface for viewing standard output, errors, and compilation output
        * Detailed error messages for debugging
    *   **Scoring:** Automatically calculates scores based on passed test cases.
        * Percentage score based on number of passed test cases
        * Stored with assessment response in database

*   **Development Guidelines:**
    *   **Test Cases:** When adding test cases to coding questions, include both visible and hidden tests. Visible tests should provide examples, while hidden tests should verify edge cases.
    *   **Markdown Support:** Use Markdown for question formatting to support code blocks, lists, tables, etc. The platform uses ReactMarkdown for rendering.
    *   **Difficulty Levels:** Maintain consistent difficulty grading across questions using the `difficulty` enum.
    *   **Code Validation:** Front-end should validate code submissions before sending to the backend.
    *   **Error Handling:** Implement robust error handling for API calls and code execution.
    *   **Language Support:** When adding new languages, update both `languageOptions.ts` and `codeTemplates.ts`.
    *   **Time Management:** Be mindful of timer implementation for assessments, ensuring accurate time tracking.
    *   **Tab Switching:** Use the `tabSwitchPrevention` hook to track and handle tab switches during assessments.
    *   **Accessibility:** Ensure color schemes have sufficient contrast and keyboard navigation works properly.

*   **Extension Points:**
    *   **Adding Languages:** To add support for new programming languages:
        1. Add an entry to `languageOptions.ts` with correct Judge0 ID
        2. Add a starter template to `codeTemplates.ts`
        3. Test execution with simple examples
    *   **Custom Test Case Types:** The system can be extended to support different types of test cases (e.g., input/output pairs, assertions, etc.).
    *   **IDE Features:** Monaco editor supports extensions for additional IDE features like linting, auto-completion, etc.
    *   **Code Analysis:** Future improvements could include plagiarism detection or code quality analysis.

### External Service Integration

*   **Judge0 API:** Used for code execution in coding assessments.
    *   **Setup:** Requires RapidAPI subscription to Judge0 CE.
    *   **Environment Variables:** 
        ```
        NEXT_PUBLIC_REACT_APP_RAPID_API_URL=https://judge0-ce.p.rapidapi.com/submissions
        NEXT_PUBLIC_REACT_APP_RAPID_API_HOST=judge0-ce.p.rapidapi.com
        NEXT_PUBLIC_REACT_APP_RAPID_API_KEY=your-rapidapi-key
        ```
    *   **Implementation:** 
        * API route: `src/app/api/execute-code/route.ts` handles all Judge0 interactions
        * Service layer: `src/services/codeExecution.service.ts` provides an interface to the API
        * Components use the service to execute code without direct API knowledge
    *   **Request Flow:**
        1. Component calls `CodeExecutionService.executeCode()` with code, language, and test cases
        2. Service sends request to internal API endpoint
        3. API route handles Judge0 interactions (submission, polling for results)
        4. Results are returned through the same path in reverse
    *   **Response Handling:** Parse execution results to determine if tests pass and extract any errors.
    *   **Rate Limiting:** Be aware of RapidAPI rate limits for Judge0 API and implement appropriate error handling.
    *   **Timeout Handling:** Implement polling with a reasonable timeout for long-running code execution.

*   **Monaco Editor:** Used for code editing in assessments.
    *   **Setup:** Installed via `@monaco-editor/react`.
    *   **Customization:** Supports themes, language switching, and shortcut configuration.
    *   **Performance:** Uses refs to maintain editor state and prevent unnecessary rerenders.
    *   **Language Integration:** Dynamically sets language mode when user changes language selection.
    *   **Editor Options:** Configure via the `options` prop:
        ```typescript
        <Editor
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: "on",
            readOnly: isSubmitting,
          }}
        />
        ```

### Prompt Engineering

*   **Location:** Store all significant LLM prompts in `src/lib/prompts/*.ts` or `src/lib/constants.ts` for Retell agent prompts.
*   **Clarity & Specificity:** Write clear, detailed, and unambiguous prompts. Define the desired role, context, task, constraints, and output format.
*   **Structure:** Use formatting (like markdown sections `###`) to structure complex prompts.
*   **Output Format:** Explicitly request structured output (e.g., JSON) using model capabilities (`response_format: { type: "json_object" }`) when needed. Define the exact JSON schema in the prompt.
*   **Variables:** Use template literals or placeholder syntax (e.g., `{{variable}}`) for injecting dynamic data into prompts.
*   **Iteration & Testing:** Test prompts iteratively with different inputs. Refine based on results. Small changes can have significant impacts.
*   **Versioning:** Use Git to track changes to prompts. Add comments if major prompt versions or strategies are introduced.

### LLM Interaction (OpenAI)

*   **Service Layer:** Encapsulate OpenAI calls within service functions (e.g., `generateInterviewAnalytics` in `analytics.service.ts`).
*   **Client Configuration:** Use the official `openai` library. Configure retries (`maxRetries: 5`).
*   **Model Selection:** Choose the appropriate model (currently `gpt-4o`). Be mindful of capabilities and cost.
*   **Error Handling:** Handle potential API errors (rate limits, timeouts, invalid requests) returned by the OpenAI client.
*   **Response Parsing:** Safely parse the response content, especially if expecting JSON. Validate the structure against the expected schema.

### Conversational AI (Retell)

*   **SDKs:** Use `retell-sdk` for backend operations (creating agents, registering calls) and `retell-client-js-sdk` for frontend call handling.
*   **Agent Configuration:**
    *   Define agent prompts carefully in `src/lib/constants.ts` or fetch dynamically.
    *   Configure agent parameters (voice, LLM backend, tools like `end_call`) via the SDK.
    *   Use dynamic variables (`retell_llm_dynamic_variables`) to pass context (like interview objective, questions) to the agent at call time.
*   **Call Lifecycle:** Understand and handle Retell events (e.g., `call_started`, `call_ended`, `update`) in the frontend (`src/components/call/index.tsx`).
*   **Webhooks:** Implement and verify webhooks (`src/app/api/response-webhook/route.ts`) if needed for asynchronous event handling from Retell (ensure signature verification is working).
*   **Testing:** Test Retell agent behavior extensively with different scenarios and user inputs.

### Data Handling for AI

*   **Context Preparation:** Ensure data passed to LLMs (transcripts, objectives, context) is clean, relevant, and formatted appropriately for the prompt.
*   **PII:** Be cautious about sending Personally Identifiable Information (PII) to external AI services unless necessary and compliant with privacy policies.
*   **Token Limits:** Be aware of model token limits. Truncate or summarize large inputs if necessary.

### Result Processing & Storage

*   **Validation:** Validate the structure and content of AI-generated responses (especially JSON).
*   **Storage:** Store relevant AI outputs (analysis, insights, summaries) in the database (e.g., `analytics` JSONB column in the `response` table, `insights` array in `interview` table).
*   **Fallback:** Implement fallback logic or display appropriate messages if AI processing fails or returns unusable results.

### Cost Management

*   **Monitor Usage:** Keep track of OpenAI and Retell AI API usage and associated costs.
*   **Optimize Prompts:** Refine prompts to be efficient and achieve the desired result with fewer tokens where possible.
*   **Caching:** Cache AI results where appropriate (e.g., analysis for a completed call should only be generated once). TanStack Query helps on the frontend, ensure backend logic prevents redundant processing.

### Ethical Considerations & Bias

*   **Bias Awareness:** Be aware that LLMs can exhibit biases present in their training data. Review AI outputs for fairness and potential biases, especially in candidate evaluations.
*   **Transparency:** Consider how AI-generated scores and feedback are presented to users (clients).
*   **Intended Use:** Ensure the AI is used responsibly and ethically, complementing rather than solely replacing human judgment where critical decisions are involved.

### Testing (AI)

*   **(Aspirational)** Test prompt variations and their outputs.
*   **(Aspirational)** Write tests for parsing logic that handles AI responses.
*   **(Aspirational)** Test fallback mechanisms when AI services fail.

### AI Components Overview

*   **Interview AI (Retell):** Powers the conversational interview experience
*   **Analytics AI (OpenAI):** Analyzes interview responses and provides insights
*   **Coding Assistant AI (OpenAI):** Helps candidates generate code solutions during assessments
*   **Question Generation AI (OpenAI):** Creates interview questions based on context

Each AI component has dedicated prompts, API integrations, and UI components tailored to its specific use case.

### Assessment Score Implementation

*   **Scoring Calculation:**
    *   **Question Level:** Each coding question tracks passed and total test cases:
        ```typescript
        {
          passed_test_cases: number,  // Number of tests passed
          total_test_cases: number,   // Total number of tests
          score: number               // Percentage (passed/total * 100)
        }
        ```
    *   **Assessment Level:** Overall coding score is calculated as the average percentage across all questions
        ```typescript
        const percentageScore = totalTestCases > 0 
          ? Math.round((totalPassedTestCases / totalTestCases) * 100) 
          : 0;
        ```
    *   **Combined Score:** Averages the behavioral interview score with the coding assessment score
        ```typescript
        // For candidates with both scores
        const combinedScore = Math.round((behavioralScore + codingScore) / 2);
        ```

*   **UI Implementation:**
    *   **Assessment Results:** Candidates see a detailed breakdown after completing an assessment:
        * Overall coding score 
        * Individual question scores with passed/total test case counts
        * Color-coded indicators for performance levels (red < 50%, yellow 50-79%, green ≥ 80%)
    *   **Dashboard Integration:** 
        * Data table showing separate columns for behavioral, coding, and combined scores
        * Candidate list displaying the combined score for each candidate
        * Detailed view showing all scores with breakdowns

*   **Data Flow:**
    *   Assessment responses stored in `assessment_response` table with full test results
    *   Components fetch both behavioral responses and assessment responses separately
    *   Scoring calculations performed at component level based on fetched data
    *   Presentational components receive pre-calculated scores for display

*   **Performance Considerations:**
    *   Score calculations happen once at submission time and are stored in database
    *   Combined scores are calculated on-the-fly in UI components to ensure latest data
    *   Graceful handling of missing scores (e.g., candidates who only completed one part)

*   **Extensibility:**
    *   The scoring system is designed to be easily extended with additional metrics
    *   New score types can be added to the table columns by following the existing pattern
    *   Weighted scoring could be implemented by adjusting the averaging formula

---

## 5. Updating This Manual

*   This manual is a living document.
*   If development practices change or new tools/patterns are adopted, update this manual accordingly.
*   Propose changes via a Pull Request targeting the `dev` branch, using the `docs:` commit type. Discuss significant changes with the team.

---
