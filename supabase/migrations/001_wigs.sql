CREATE TABLE wigs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  lengths TEXT[] NOT NULL,
  price VARCHAR(50),
  description TEXT,
  image_url TEXT,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wigs ENABLE ROW LEVEL SECURITY;

-- Public can read all wigs
CREATE POLICY "Public can read wigs"
ON wigs FOR SELECT
USING (true);

-- Only authenticated users can write
CREATE POLICY "Authenticated users can write"
ON wigs FOR ALL
USING (auth.role() = 'authenticated');