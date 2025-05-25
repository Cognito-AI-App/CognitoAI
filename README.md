# CognitoAI - AI-Powered Automated User Interviews

<!-- Optional: Add Logo Here -->
<!-- <p align="center">
  <img src="path/to/your/logo.png" alt="CognitoAI Logo" width="200"/>
</p> -->

CognitoAI is a platform designed to automate the user interview process using advanced conversational AI. It allows organizations to set up AI interviewers, define interview objectives and questions, and conduct interviews efficiently, gathering valuable insights from users or candidates at scale.

<!-- Optional: Add Badges Here (e.g., Build Status, License) -->
<!-- [![CI](https://github.com/your-username/CognitoAI/actions/workflows/ci.yml/badge.svg)](https://github.com/your-username/CognitoAI/actions/workflows/ci.yml) -->
<!-- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) -->

---

**Note:** This README serves as a living document for the CognitoAI project. Developers should keep it updated as the application evolves.

## Table of Contents

- [CognitoAI - AI-Powered Automated User Interviews](#cognitoai---ai-powered-automated-user-interviews)
  - [Table of Contents](#table-of-contents)
  - [Core Features](#core-features)
  - [Technology Stack](#technology-stack)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Cloning the Repository](#cloning-the-repository)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
    - [Running with Docker](#running-with-docker)
  - [Key Services and Libraries](#key-services-and-libraries)
  - [API Endpoints](#api-endpoints)
  - [Database Schema](#database-schema)
  - [Development Process](#development-process)
    - [Branching Strategy](#branching-strategy)
    - [Linting and Formatting](#linting-and-formatting)
    - [Commits](#commits)
    - [Pull Requests (PRs)](#pull-requests-prs)
    - [Testing](#testing)
  - [Deployment](#deployment)

## Core Features

*   **AI Interviewers:** Utilizes conversational AI (Retell AI, OpenAI) to conduct interviews.
*   **Customizable Interviews:** Define interview objectives, descriptions, questions, and branding (logo, theme).
*   **Coding Assessments:** Create and manage coding assessments with difficulty levels and test cases that can be linked to interviews.
*   **Automated Question Generation:** Generate relevant interview questions based on objectives and context (e.g., from PDFs).
*   **Transcript Analysis:** Automatically transcribes interviews and provides analysis.
*   **Communication Analysis:** Scores and provides feedback on interviewee communication skills.
*   **Insight Generation:** Derives key insights and summaries from multiple interview responses.
*   **Dashboard:** Centralized view for managing interviews, interviewers, and reviewing responses.
*   **Response Management:** View individual responses, recordings, transcripts, and analytics.
*   **User & Organization Management:** Supports multi-user organizations via Clerk authentication.
*   **PDF Parsing:** Extracts text content from uploaded PDF documents (e.g., resumes, job descriptions).
*   **Professional Landing Page:** Beautiful, responsive landing page with features showcase, screenshots gallery, and contact information.

### Coding Assessments

The platform includes a full-featured coding assessment system that can be added to interviews:

* **Creation & Management:** Create coding questions with multiple test cases and difficulty levels. Group questions into assessments.
* **Interview Integration:** Link assessments to interviews, allowing candidates to proceed to coding tests after the behavioral interview.
* **Code Execution:** Execute code in multiple languages using Judge0 API, with real-time test results.
* **AI Coding Assistant:** Integrated AI assistant that helps candidates generate code solutions for assessment questions:
  * Maintains separate conversation history for each question
  * Generates clean, working code based on the question requirements
  * Offers one-click code application to the editor
  * Uses OpenAI to provide intelligent coding suggestions
  * Optimized prompts ensure code-only responses without explanations or comments
* **Features:**
  * Monaco code editor with syntax highlighting for 13+ programming languages
  * Customizable starter code templates for each language
  * Support for visible example tests and hidden edge case tests
  * Automated scoring based on passed test cases
  * Time limits and tab switch tracking to ensure assessment integrity
  * Immediate feedback on compilation errors and test outcomes
* **Comprehensive Scoring System:**
  * Individual scoring for each coding question based on test case success
  * Overall coding assessment score calculation (percentage of passed tests)
  * Combined candidate evaluation that averages behavioral interview and coding scores
  * Complete score breakdown visible in interviewer dashboard
  * Color-coded performance indicators for easy evaluation

Upon completing the behavioral interview, candidates can proceed to the coding assessment where they:
1. Select their preferred programming language
2. Write code solutions for the given problems
3. Run tests to verify their solutions
4. Submit the assessment for scoring

Assessment results are saved with the interview, allowing interviewers to review both the behavioral interview and coding performance in one place, with a combined overall score that reflects both aspects of the evaluation.

### Landing Page

The platform features a professional, responsive landing page that serves as the entry point for new users:

* **Modern Design:** Clean, professional design with smooth animations and responsive layout
* **Features Showcase:** Comprehensive overview of platform capabilities with interactive elements
* **Screenshots Gallery:** Interactive gallery showcasing the application interface with category filtering
* **Process Explanation:** Step-by-step guide on how CognitoAI works from setup to insights
* **Contact Integration:** Contact form and information with direct links to email, phone, and LinkedIn
* **Authentication Integration:** Seamless integration with Clerk authentication, showing appropriate CTAs based on user state
* **SEO Optimized:** Proper meta tags, structured data, and semantic HTML for search engine optimization

The landing page is built with:
* **Responsive Design:** Mobile-first approach ensuring great experience across all devices
* **Performance Optimized:** Fast loading with optimized images and efficient component structure
* **Accessibility:** WCAG compliant with proper ARIA labels and keyboard navigation
* **Component Architecture:** Modular components for easy maintenance and updates

## Technology Stack

*   **Framework:** Next.js 14 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS, PostCSS, Shadcn/ui, `clsx`, `tailwind-merge`
*   **UI Components:** Shadcn/ui (built on Radix UI), NextUI (Progress, CircularProgress), Material UI (Charts - PieChart)
*   **State Management:** React Context API, TanStack Query (React Query)
*   **Forms:** React Hook Form, Zod (Validation)
*   **Authentication:** Clerk
*   **Database:** Supabase (PostgreSQL)
*   **Conversational AI:** Retell AI SDK, OpenAI API (GPT-4o)
*   **LLM Integration:** Langchain (PDF Loading, Prompt Templating)
*   **Code Editor:** Monaco Editor (@monaco-editor/react)
*   **Code Execution:** Judge0 API (via RapidAPI)
*   **API:** Next.js API Routes
*   **Containerization:** Docker, Docker Compose
*   **Linting/Formatting:** ESLint, Prettier
*   **CI/CD:** GitHub Actions

## Project Structure

The project follows a standard Next.js App Router structure with clear separation of concerns.

```
CognitoAI/
├── .env.example             # Example environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── Dockerfile               # Docker configuration for building the image
├── components.json          # Shadcn/ui configuration
├── docker-compose.yml       # Docker Compose for running the app
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── supabase_schema.sql      # SQL schema for the Supabase database
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── .github/                 # GitHub specific files
│   └── workflows/           # GitHub Actions workflows
│       └── ci.yml           # Continuous Integration workflow
├── public/                  # Static assets
│   ├── audio/               # Interviewer audio files (if static)
│   └── interviewers/        # Interviewer images (if static)
└── src/                     # Main application source code
    ├── middleware.ts        # Next.js middleware (Clerk authentication)
    ├── actions/             # Server Actions (e.g., parse-pdf.ts)
    ├── app/                 # Next.js App Router directory
    │   ├── globals.css      # Global CSS styles
    │   ├── (public)/        # Public routes (Landing page)
    │   │   ├── layout.tsx   # Layout for public routes
    │   │   └── page.tsx     # Landing page
    │   ├── (client)/        # Routes requiring authentication (Client Dashboard)
    │   │   ├── layout.tsx   # Layout for client-side routes
    │   │   ├── dashboard/   # Main dashboard pages
    │   │   │   ├── coding-questions/ # Coding questions dashboard
    │   │   │   └── assessments/      # Assessments dashboard
    │   │   ├── interviews/  # Interview details and responses page
    │   │   ├── sign-in/     # Clerk Sign In page
    │   │   └── sign-up/     # Clerk Sign Up page
    │   ├── (user)/          # Public-facing routes for interviewees
    │   │   ├── layout.tsx   # Layout for user-facing routes
    │   │   ├── call/        # Interview call interface page
    │   │   └── assessment/  # Assessment interface page
    │   │       └── [interviewId]/    # Dynamic route for assessments
    │   │           └── page.tsx      # Assessment page component
    │   └── api/             # API Routes (Backend logic)
    │       ├── analyze-communication/
    │       ├── coding-assistant/     # OpenAI code generation endpoint for AI assistant
    │       ├── create-interview/
    │       ├── create-interviewer/
    │       ├── execute-code/         # Judge0 code execution endpoint for assessments
    │       ├── generate-insights/
    │       ├── generate-interview-questions/
    │       ├── get-call/
    │       ├── register-call/
    │       └── response-webhook/ # (Potentially for Retell events)
    ├── components/          # Reusable UI components
    │   ├── navbar.tsx       # Top navigation bar (Client)
    │   ├── providers.tsx    # Context and theme providers wrapper
    │   ├── sideMenu.tsx     # Side navigation menu (Client)
    │   ├── landing/         # Landing page components
    │   │   ├── header.tsx   # Landing page header with navigation
    │   │   ├── hero.tsx     # Hero section with main CTA
    │   │   ├── features.tsx # Features showcase section
    │   │   ├── how-it-works.tsx # Process explanation section
    │   │   ├── screenshots.tsx  # Application screenshots gallery
    │   │   ├── contact.tsx  # Contact information and form
    │   │   ├── footer.tsx   # Footer with links and company info
    │   │   └── index.ts     # Component exports
    │   ├── call/            # Components specific to the interview call interface
    │   │   ├── index.tsx           # Main call component
    │   │   ├── feedbackForm.tsx    # Feedback form with assessment redirect
    │   │   ├── callInfo.tsx        # Call information display
    │   │   └── tabSwitchPrevention.tsx # Detects tab switching during interview
    │   ├── assessment/      # Components for coding assessment
    │   │   ├── index.tsx           # Main assessment component
    │   │   ├── editorPanel.tsx     # Monaco code editor component
    │   │   ├── questionPanel.tsx   # Question display with markdown
    │   │   ├── testCasePanel.tsx   # Test case execution and results
    │   │   ├── aiChatPanel.tsx     # AI coding assistant chat interface
    │   │   ├── codeTemplates.ts    # Starter code templates for different languages
    │   │   └── languageOptions.ts  # Supported languages configuration
    │   ├── dashboard/       # Components specific to the client dashboard
    │   │   ├── assessments/ # Assessment management components
    │   │   └── coding-questions/ # Coding question management components
    │   │       └── createQuestionModal.tsx # Modal for creating/editing questions
    │   ├── loaders/         # Loading indicator components
    │   └── ui/              # Base UI components (from Shadcn/ui)
    ├── contexts/            # React Context API providers
    │   ├── clients.context.tsx
    │   ├── interviewers.context.tsx
    │   ├── interviews.context.tsx
    │   ├── responses.context.tsx
    │   ├── coding-questions.context.tsx
    │   └── assessments.context.tsx
    ├── lib/                 # Utility functions, constants, prompts
    │   ├── compose.tsx      # Helper for composing providers
    │   ├── constants.ts     # Application constants (e.g., prompts, defaults)
    │   ├── contact.ts       # Contact information and company details
    │   ├── enum.tsx         # Enums used in the application
    │   ├── logger.ts        # Simple logging utility
    │   ├── utils.ts         # General utility functions (cn, date formatting, etc.)
    │   └── prompts/         # LLM prompt templates
    │       ├── codingAssistant.ts   # Prompts for the AI coding assistant
    │       └── other prompt files...
    ├── services/            # Data fetching and business logic services
    │   ├── analytics.service.ts # Handles communication/overall analysis
    │   ├── clients.service.ts   # User/Organization data operations
    │   ├── codeExecution.service.ts # Handles code execution via Judge0 
    │   ├── feedback.service.ts  # Handles user feedback submission
    │   ├── interviewers.service.ts # Interviewer data operations
    │   ├── interviews.service.ts   # Interview data operations
    │   ├── responses.service.ts    # Interview response data operations
    │   ├── coding-questions.service.ts # Coding question data operations
    │   └── assessments.service.ts     # Assessment data operations
    └── types/               # TypeScript type definitions
        ├── database.types.ts # Types generated from Supabase schema
        ├── interview.ts
        ├── interviewer.ts
        ├── organization.ts
        ├── response.ts
        ├── user.ts
        ├── coding-question.ts      # Types for coding questions
        └── assessment.ts           # Types for assessments and responses
```

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

*   Node.js (v20 or later recommended - see `Dockerfile`)
*   Yarn (v1.x)
*   Docker & Docker Compose (Optional, but recommended for easier setup)
*   Access keys for:
    *   Clerk (Publishable Key, Secret Key)
    *   Supabase (URL, Anon Key)
    *   Retell AI (API Key)
    *   OpenAI (API Key)
    *   Judge0 API via RapidAPI (API Key)

## Clerk Setup ([Clerk](https://clerk.com/))

We use Clerk for authentication. Set up Clerk environment variables in the `.env` file. Free plan should be more than enough.

1. Navigate to [Clerk](https://dashboard.clerk.com/) and create an application following the [setup guide](https://clerk.com/docs/quickstarts/setup-clerk).

<img src="https://github.com/user-attachments/assets/faa72830-10b0-4dfd-8f07-792e7520b6a2" alt="Clerk Environment Variables" width="800">

2. Your `.env` (NOT `.env.local`) file should have the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` variables populated with **no inverted commas**

3. Enable organizations in your Clerk application by navigating to the [Organization Settings](https://dashboard.clerk.com/last-active?path=organizations-settings&_gl=1*58xbvk*_gcl_au*MTEzODk3NzAyMy4xNzM4NjQzMzU3*_ga*MzUyMTk4NzIwLjE3Mzg2NDM0NzY.*_ga_1WMF5X234K*MTczODczNzkxOC4zLjEuMTczODczNzkyNi4wLjAuMA..) page.

<img src="https://github.com/user-attachments/assets/381cd138-439a-4b4f-ae87-50414fb1d64b" alt="Clerk Organization Settings" width="800">

4. Make sure you create an organization and invite your email to it.

## Database Setup ([Supabase](https://supabase.com/))

Supabase is used for storing the data. It's really simple to set up and the free plan should suffice.

1. Create a project (Note down your project's password)
2. Got to SQL Editor and copy the SQL code from `supabase_schema.sql`

<img src="https://github.com/user-attachments/assets/a31c14b8-45ca-417c-8927-aceb36fa5990" alt="Supabase SQL Editor" height="200">

3. Run the SQL code to confirm the tables are created.
4. Copy the supabase url and anon key from the project settings and paste it in the `.env` file in `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Retell AI Setup ([Retell AI](https://retell.ai/))

We use Retell AI to manage all the voice calls. They manage storage of recordings and provide a simple SDK to integrate with. They provide free credits to start with and will have to pay as you go.

1. Create an API key from [Retell AI Dashboard](https://dashboard.retellai.com/apiKey) and add it to the `.env` file in `RETELL_API_KEY`

## Add OpenAI API Key

We use OpenAI to generate questions for interviews and analyze responses. This would not be that costly.

1. Go to [OpenAI](https://platform.openai.com/api-keys) and create an API key
2. Add the API key to the `.env` file in `OPENAI_API_KEY`

## Judge0 Setup (Code Execution)

The platform uses Judge0 API for code execution in coding assessments. You'll need to set up RapidAPI credentials:

1. Go to [RapidAPI](https://rapidapi.com/) and create an account.
2. Subscribe to [Judge0 CE API](https://rapidapi.com/judge0-official/api/judge0-ce/).
3. Add the following environment variables to your `.env` file:
   ```
   NEXT_PUBLIC_REACT_APP_RAPID_API_URL=https://judge0-ce.p.rapidapi.com/submissions
   NEXT_PUBLIC_REACT_APP_RAPID_API_HOST=judge0-ce.p.rapidapi.com
   NEXT_PUBLIC_REACT_APP_RAPID_API_KEY=your-rapidapi-key
   ```

## Setting Up the Assessment Feature

To fully implement the coding assessment feature in your instance, follow these steps:

### 1. Database Setup

Ensure your database has the assessment-related tables by running the schema in `supabase_schema.sql`. The key tables are:
- `coding_question`: Stores individual coding problems
- `assessment`: Stores collections of coding questions
- `assessment_response`: Stores candidate responses

### 2. Frontend Configuration

1. **Install Dependencies**: The assessment feature requires Monaco editor and related packages:
   ```bash
   yarn add @monaco-editor/react monaco-editor
   ```

2. **Environment Variables**: Configure Judge0 API environment variables as described above.

### 3. Creating Questions & Assessments

1. **Create Coding Questions**:
   - Navigate to the Coding Questions dashboard
   - Create questions with descriptions, test cases, and examples
   - Use Markdown for formatting explanations and examples
   - Define both visible and hidden test cases

2. **Create Assessments**:
   - Navigate to the Assessments dashboard
   - Create an assessment and select questions to include
   - Set difficulty level and time duration
   - Activate the assessment

3. **Link to Interviews**:
   - When creating or editing an interview, enable the assessment option
   - Select the assessment to be linked with the interview

### 4. Testing the Feature

Before deploying to production, we recommend testing the full assessment workflow:
1. Create a test interview with an attached assessment
2. Complete the behavioral interview
3. Proceed to the coding assessment
4. Test code execution with various languages
5. Submit the assessment and verify results are properly stored

### 5. Customization Options

The assessment feature can be customized in several ways:
- **Language Support**: Edit `languageOptions.ts` to add or remove programming languages
- **Starter Templates**: Modify `codeTemplates.ts` to adjust starter code for each language
- **UI Theming**: The Monaco editor supports both light and dark themes
- **Time Limits**: Adjust assessment time duration based on question difficulty

### Cloning the Repository

```bash
git clone <your-repository-url>
cd CognitoAI
```

### Installation

Install the project dependencies using Yarn:

```bash
yarn install
```

### Environment Variables

1.  Copy the example environment file:
    ```bash
    cp .env.example .env
    ```
2.  Open the `.env` file and fill in the required API keys and secrets obtained from the respective services (Clerk, Supabase, Retell AI, OpenAI).
3.  Set `NEXT_PUBLIC_LIVE_URL` to your local development URL (e.g., `localhost:3000`).

**Important:** Never commit your `.env` file to Git. It's included in `.gitignore` by default.

### Database Setup

1.  **Set up a Supabase project:** Create a project on [Supabase](https://supabase.com/).
2.  **Get Credentials:** Find your Supabase Project URL and `anon` key in your Supabase project settings (API section) and add them to your `.env` file.
3.  **Apply Schema:** Use the Supabase SQL Editor (in your project dashboard) or a local `psql` client connected to your Supabase database to run the contents of `supabase_schema.sql`. This will create the necessary tables, types, and relationships.

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
yarn dev
```

The application will typically be available at `http://localhost:3000`.

### Production Build

To build the application for production:

```bash
yarn build
```

To run the production build:

```bash
yarn start
```

### Running with Docker

Ensure Docker and Docker Compose are installed and running.

1.  Make sure your `.env` file is populated correctly.
2.  Run Docker Compose:
    ```bash
    docker-compose up --build
    ```
    (Use `--build` the first time or when `Dockerfile` or dependencies change).

The application will be available at the port specified by `DOCKER_PORT` in your `.env` file (defaults to 3000), e.g., `http://localhost:3000`.

To stop the Docker container:

```bash
docker-compose down
```

## Key Services and Libraries

*   **Clerk:** Handles user authentication, sign-up, sign-in, and organization management. Middleware protects routes.
*   **Supabase:** PostgreSQL database backend, providing data persistence for interviews, users, responses, etc. Used via `@supabase/supabase-js`.
*   **Retell AI:** Powers the conversational AI agents for conducting interviews. Used via `retell-sdk` (backend) and `retell-client-js-sdk` (frontend).
*   **OpenAI:** Used for generating interview questions, insights, and performing communication analysis via the GPT-4o model.
*   **Langchain:** Used for orchestrating LLM interactions, specifically PDF loading (`PDFLoader`) in this project.
*   **Shadcn/ui:** Provides beautifully designed, accessible UI components built on Radix UI primitives and styled with Tailwind CSS.
*   **React Hook Form & Zod:** Used for robust form handling and validation.
*   **TanStack Query:** Manages server state, caching, and data fetching, improving performance and UX.
*   **Axios:** Used for making HTTP requests to internal API routes and external services.
*   **Marked:** Used for rendering Markdown content (e.g., transcripts).

## API Endpoints

The backend logic is primarily handled via Next.js API Routes located in `src/app/api/`:

*   `/api/analyze-communication`: Analyzes the communication skills from a transcript using OpenAI.
*   `/api/create-interview`: Creates a new interview record in the database.
*   `/api/create-interviewer`: Creates default interviewer profiles and associated Retell agents.
*   `/api/execute-code`: Handles code execution via Judge0 for assessments.
*   `/api/generate-insights`: Generates high-level insights from multiple call summaries for an interview.
*   `/api/generate-interview-questions`: Generates interview questions using OpenAI based on provided context.
*   `/api/get-call`: Retrieves call details from Retell and performs analysis if not already done.
*   `/api/register-call`: Registers a web call with Retell AI to initiate an interview.
*   `/api/response-webhook`: (Likely intended for receiving events from Retell, e.g., call ended, call analyzed - *needs verification/implementation*).

## Database Schema

The database schema is defined in `supabase_schema.sql`. Key tables include:

*   `organization`: Stores information about client organizations, including plan details.
*   `user`: Stores user information linked to Clerk users and organizations.
*   `interviewer`: Defines AI interviewer profiles, including their Retell `agent_id` and personality settings.
*   `interview`: Stores details about each interview setup (name, objective, questions, associated interviewer, etc.) and can optionally include an assessment.
*   `coding_question`: Stores coding questions with descriptions, difficulty levels, and test cases.
*   `assessment`: Defines coding assessments that can be linked to interviews, consisting of selected coding questions.
*   `assessment_response`: Records candidate responses to coding assessments, including submitted code and test results.
*   `response`: Records each interview response, including participant details, `call_id`, transcript (via `details`), analysis results (`analytics`), and status.
*   `feedback`: Stores user feedback about the platform experience.

Refer to `supabase_schema.sql` for detailed column definitions, types, and relationships.

## Development Process

To ensure consistency and maintain code quality, please follow these guidelines:

### Branching Strategy

*   **`main`:** Represents the production-ready code. Merges to `main` should only come from `dev` after thorough testing.
*   **`dev`:** The primary development branch. All feature branches are merged into `dev`.
*   **Feature Branches:** Create branches from `dev` for new features or bug fixes (e.g., `feat/add-interview-sharing`, `fix/dashboard-layout`). Name branches descriptively.

### Linting and Formatting

*   **ESLint & Prettier:** Configured to enforce code style and catch potential errors.
*   **Run Checks:** Before committing, run:
    ```bash
    yarn lint # Check for ESLint errors/warnings
    npx prettier --check . # Check for formatting issues
    ```
*   **Auto-Format:** To automatically fix formatting issues:
    ```bash
    npx prettier --write .
    ```
*   **CI:** The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically checks Prettier formatting on pushes and pull requests to `main` and `dev`.
