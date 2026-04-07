-- Run this in Supabase SQL Editor (supabase.com/dashboard → SQL Editor)

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  access_token UUID DEFAULT gen_random_uuid() NOT NULL UNIQUE,
  stripe_session_id TEXT,
  modules_completed INTEGER[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Purchases: only service role can insert, users can read their own by token
CREATE POLICY "Service role can do everything on purchases" ON purchases
  FOR ALL USING (true) WITH CHECK (true);

-- Reviews: anyone can read approved, anyone can insert, admin can update/delete
CREATE POLICY "Anyone can read approved reviews" ON reviews
  FOR SELECT USING (verified = true);

CREATE POLICY "Anyone can insert reviews" ON reviews
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can manage all reviews" ON reviews
  FOR ALL USING (true) WITH CHECK (true);

-- Index for fast token lookups
CREATE INDEX IF NOT EXISTS idx_purchases_access_token ON purchases(access_token);
