-- Create enum type for plan
CREATE TYPE plan AS ENUM ('free', 'pro', 'free_trial_over');

-- Create enum type for difficulty
CREATE TYPE difficulty AS ENUM ('easy', 'medium', 'hard');

-- Create tables
CREATE TABLE organization (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    name TEXT,
    image_url TEXT,
    allowed_responses_count INTEGER,
    plan plan
);

CREATE TABLE "user" (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    email TEXT,
    organization_id TEXT REFERENCES organization(id)
);

CREATE TABLE interviewer (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    agent_id TEXT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    audio TEXT,
    empathy INTEGER NOT NULL,
    exploration INTEGER NOT NULL,
    rapport INTEGER NOT NULL,
    speed INTEGER NOT NULL
);

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

CREATE TABLE interview (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    name TEXT,
    description TEXT,
    objective TEXT,
    organization_id TEXT REFERENCES organization(id),
    user_id TEXT REFERENCES "user"(id),
    interviewer_id INTEGER REFERENCES interviewer(id),
    is_active BOOLEAN DEFAULT true,
    is_anonymous BOOLEAN DEFAULT false,
    is_archived BOOLEAN DEFAULT false,
    logo_url TEXT,
    theme_color TEXT,
    url TEXT,
    readable_slug TEXT,
    questions JSONB,
    quotes JSONB[],
    insights TEXT[],
    respondents TEXT[],
    question_count INTEGER,
    response_count INTEGER,
    time_duration TEXT,
    has_assessment BOOLEAN DEFAULT false,
    assessment_id INTEGER REFERENCES assessment(id)
);

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

CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    interview_id TEXT REFERENCES interview(id),
    name TEXT,
    email TEXT,
    call_id TEXT,
    candidate_status TEXT,
    duration INTEGER,
    details JSONB,
    analytics JSONB,
    is_analysed BOOLEAN DEFAULT false,
    is_ended BOOLEAN DEFAULT false,
    is_viewed BOOLEAN DEFAULT false,
    tab_switch_count INTEGER
);

CREATE TABLE feedback (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    interview_id TEXT REFERENCES interview(id),
    email TEXT,
    feedback TEXT,
    satisfaction INTEGER
);


-- Contact Messages Table
-- Stores messages submitted through the contact form
CREATE TABLE contact_message (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    responded_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Newsletter Subscriptions Table
-- Stores email addresses for newsletter subscriptions
CREATE TABLE newsletter_subscription (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    email TEXT NOT NULL UNIQUE,
    is_active BOOLEAN DEFAULT true,
    unsubscribed_at TIMESTAMP WITH TIME ZONE,
    source TEXT DEFAULT 'landing_page'
);

-- Add indexes for better performance
CREATE INDEX idx_contact_message_email ON contact_message(email);
CREATE INDEX idx_contact_message_created_at ON contact_message(created_at);
CREATE INDEX idx_contact_message_is_read ON contact_message(is_read);

CREATE INDEX idx_newsletter_subscription_email ON newsletter_subscription(email);
CREATE INDEX idx_newsletter_subscription_is_active ON newsletter_subscription(is_active);
CREATE INDEX idx_newsletter_subscription_created_at ON newsletter_subscription(created_at); 
