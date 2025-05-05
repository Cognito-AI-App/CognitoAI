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
    *   Page-specific components (if not reusable): Co-locate within the `src/app/.../page.tsx` directory or a subfolder if complex.
*   **Naming:** Use `PascalCase` for component file names and function/class names (e.g., `InterviewCard.tsx`, `function InterviewCard(...)`).
*   **File Structure:** For complex components, consider grouping related files (e.g., component, styles, types) in a dedicated folder.
*   **Props:** Use TypeScript interfaces for defining component props. Keep prop names clear and descriptive.

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
*   **Route Structure:** Follow the App Router conventions defined in `src/app/`. Use route groups (`(client)`, `(user)`) and dynamic segments (`[interviewId]`).

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

*   **Overview:** The platform now supports coding assessments that can be attached to interviews.
*   **Database Schema:**
    *   `difficulty`: An enum type with values 'easy', 'medium', 'hard'.
    *   `coding_question`: Stores questions with description, difficulty, starter code, and test cases.
    *   `assessment`: Defines assessments composed of multiple coding questions.
    *   `assessment_response`: Records candidate responses to assessments.
    *   `interview` updates: Added `has_assessment` and `assessment_id` fields.
*   **Components:**
    *   **Question Management:** Dashboard for creating/editing coding questions with Markdown preview and test case editing.
    *   **Assessment Management:** Creation/editing interface with question selection and difficulty filtering.
    *   **Interview Integration:** Updated interview creation to optionally include assessment selection.
    *   **Assessment Execution:** Interface for candidates to take assessments with Monaco Editor and test execution.
*   **Code Editor Implementation:**
    *   **Monaco Editor:** Uses `@monaco-editor/react` for a feature-rich code editing experience.
    *   **Language Support:** Dynamically adapts syntax highlighting and starter templates based on selected language.
    *   **File Organization:**
        *   `codeTemplates.ts`: Contains starter templates for different programming languages.
        *   `languageOptions.ts`: Defines supported languages with their Judge0 API IDs and Monaco identifiers.
        *   `editorPanel.tsx`: Handles the editor UI with language selection, theme, and code execution.
        *   `testCasePanel.tsx`: Displays test cases and results for code execution.
*   **Code Execution with Judge0:**
    *   **API Integration:** Uses Judge0 API (via RapidAPI) to execute code against test cases.
    *   **Test Case Handling:** Support for visible examples and hidden test cases.
    *   **Result Processing:** Parsing and displaying execution results including output, errors, compilation issues.
    *   **Scoring:** Automatically calculates scores based on passed test cases.
*   **Development Guidelines:**
    *   **Test Cases:** When adding test cases to coding questions, include both visible and hidden tests. Visible tests should provide examples, while hidden tests should verify edge cases.
    *   **Markdown Support:** Use Markdown for question formatting to support code blocks, lists, tables, etc.
    *   **Difficulty Levels:** Maintain consistent difficulty grading across questions using the `difficulty` enum.
    *   **Code Validation:** Front-end should validate code submissions before sending to the backend.
    *   **Error Handling:** Implement robust error handling for API calls and code execution.
    *   **Language Support:** When adding new languages, update both `languageOptions.ts` and `codeTemplates.ts`.

### External Service Integration

*   **Judge0 API:** Used for code execution in coding assessments.
    *   **Setup:** Requires RapidAPI subscription to Judge0 CE.
    *   **Environment Variables:** Store API credentials in `.env` file.
    *   **Implementation:** See `runCode` function in `assessment/index.tsx` for integration reference.
    *   **Request Format:** Send code, language ID, stdin, and expected output to execute tests.
    *   **Response Handling:** Parse execution results to determine if tests pass and extract any errors.
*   **Monaco Editor:** Used for code editing in assessments.
    *   **Setup:** Installed via `@monaco-editor/react`.
    *   **Customization:** Supports themes, language switching, and shortcut configuration.
    *   **Performance:** Uses refs to maintain editor state and prevent unnecessary rerenders.
    *   **Language Integration:** Dynamically sets language mode when user changes language selection.

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

---

## 5. Updating This Manual

*   This manual is a living document.
*   If development practices change or new tools/patterns are adopted, update this manual accordingly.
*   Propose changes via a Pull Request targeting the `dev` branch, using the `docs:` commit type. Discuss significant changes with the team.

---
