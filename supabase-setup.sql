-- Run this in Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

-- PURCHASES
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  stripe_session_id TEXT,
  has_access BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- REVIEWS
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QUESTIONS
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  answered_at TIMESTAMPTZ
);

-- RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- PURCHASES POLICIES
DROP POLICY IF EXISTS "purchases_read_own" ON purchases;
CREATE POLICY "purchases_read_own" ON purchases
  FOR SELECT USING (auth.jwt() ->> 'email' = email);

DROP POLICY IF EXISTS "purchases_service" ON purchases;
CREATE POLICY "purchases_service" ON purchases
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- REVIEWS POLICIES
DROP POLICY IF EXISTS "reviews_read_all" ON reviews;
CREATE POLICY "reviews_read_all" ON reviews
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "reviews_insert_all" ON reviews;
CREATE POLICY "reviews_insert_all" ON reviews
  FOR INSERT WITH CHECK (true);

-- QUESTIONS POLICIES
DROP POLICY IF EXISTS "questions_read_answered" ON questions;
CREATE POLICY "questions_read_answered" ON questions
  FOR SELECT USING (answer IS NOT NULL);

DROP POLICY IF EXISTS "questions_insert_all" ON questions;
CREATE POLICY "questions_insert_all" ON questions
  FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "questions_service" ON questions;
CREATE POLICY "questions_service" ON questions
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases(email);
CREATE INDEX IF NOT EXISTS idx_questions_answered ON questions(answered_at) WHERE answer IS NOT NULL;
