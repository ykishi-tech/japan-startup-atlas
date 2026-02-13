-- Japan Startup Atlas initial PostgreSQL schema + seed data
-- Target scale: start with curated records, then grow to 10,000+

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'readiness_level') THEN
    CREATE TYPE readiness_level AS ENUM ('green', 'yellow', 'red');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS startups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name_en TEXT NOT NULL,
  name_jp TEXT,
  one_liner TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  founded_year INT NOT NULL CHECK (founded_year BETWEEN 1900 AND 2100),
  hq_city TEXT NOT NULL,
  hq_prefecture TEXT NOT NULL,
  funding_stage TEXT NOT NULL,
  total_funding_usd_millions NUMERIC(12,2),
  website_url TEXT,
  readiness readiness_level NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS startups_founded_year_idx ON startups (founded_year DESC);
CREATE INDEX IF NOT EXISTS startups_hq_prefecture_idx ON startups (hq_prefecture);
CREATE INDEX IF NOT EXISTS startups_funding_stage_idx ON startups (funding_stage);
CREATE INDEX IF NOT EXISTS startups_readiness_idx ON startups (readiness);
CREATE INDEX IF NOT EXISTS startups_tags_gin_idx ON startups USING GIN (tags);
CREATE INDEX IF NOT EXISTS startups_description_fts_idx
  ON startups USING GIN (to_tsvector('simple', coalesce(name_en, '') || ' ' || coalesce(one_liner, '') || ' ' || coalesce(description, '')));

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS startups_set_updated_at ON startups;
CREATE TRIGGER startups_set_updated_at
BEFORE UPDATE ON startups
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();

-- Seed only when table is empty.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM startups LIMIT 1) THEN
    RAISE NOTICE 'startups table already has records; skipping seed';
    RETURN;
  END IF;

  INSERT INTO startups (
    slug,
    name_en,
    name_jp,
    one_liner,
    tags,
    founded_year,
    hq_city,
    hq_prefecture,
    funding_stage,
    total_funding_usd_millions,
    website_url,
    readiness,
    description
  )
  VALUES
    ('preferred-networks', 'Preferred Networks', '株式会社Preferred Networks', 'Deep learning and robotics company building AI solutions for industry.', ARRAY['AI','Robotics','DeepTech','Manufacturing'], 2014, 'Tokyo', 'Tokyo', 'Unknown', NULL, 'https://www.preferred.jp/en/', 'yellow', 'Preferred Networks develops deep learning technologies and applies them to robotics and industrial use cases in Japan.'),
    ('sakana-ai', 'Sakana AI', 'Sakana AI株式会社', 'Nature-inspired AI R&D company building next-generation foundation model research.', ARRAY['AI','Foundation-Models','R&D','DeepTech'], 2023, 'Tokyo', 'Tokyo', 'Seed', 30, 'https://sakana.ai/', 'green', 'Sakana AI is a Tokyo-based AI R&D company focused on nature-inspired approaches to foundation models and applied AI solutions.'),
    ('ubie', 'Ubie', 'Ubie株式会社', 'AI healthtech helping patients and clinicians navigate to the right care faster.', ARRAY['Healthcare','AI','Digital-Health','B2B2C'], 2017, 'Tokyo', 'Tokyo', 'Unknown', NULL, 'https://ubiehealth.com/', 'green', 'Ubie develops AI-powered products such as symptom assessment and clinical support tools to guide patients to appropriate care and improve healthcare workflows.'),
    ('asuene', 'ASUENE', 'アスエネ株式会社', 'Climate SaaS for measuring and reducing corporate greenhouse gas emissions.', ARRAY['Climate','SaaS','Carbon-Accounting','ESG'], 2019, 'Tokyo', 'Tokyo', 'Unknown', NULL, 'https://asuene.com/en', 'green', 'ASUENE provides a climate platform for GHG accounting and decarbonization support including ESG-related services for enterprises.'),
    ('abeja', 'ABEJA', '株式会社ABEJA', 'AI platform and solutions provider supporting enterprise DX and analytics.', ARRAY['AI','Enterprise','SaaS','DX'], 2012, 'Tokyo', 'Tokyo', 'Public', NULL, 'https://www.abejainc.com/en/', 'green', 'ABEJA provides AI-driven platforms and solutions to help enterprises accelerate digital transformation and deploy AI in production.'),
    ('smarthr', 'SmartHR', '株式会社SmartHR', 'Cloud HR and labor-management software for back-office operations in Japan.', ARRAY['Enterprise-SaaS','HR-Tech','B2B'], 2013, 'Tokyo', 'Tokyo', 'Unknown', NULL, 'https://smarthr.co.jp/en/', 'green', 'SmartHR provides cloud software that simplifies HR and labor administration for companies operating in Japan.'),
    ('money-forward', 'Money Forward', '株式会社マネーフォワード', 'Fintech platform offering personal finance and cloud services for businesses.', ARRAY['Fintech','SaaS','Accounting','SMB'], 2012, 'Tokyo', 'Tokyo', 'Public', NULL, 'https://corp.moneyforward.com/en/', 'green', 'Money Forward operates fintech services spanning personal finance management and business cloud products including accounting and related back-office tools.'),
    ('spiber', 'Spiber', 'Spiber株式会社', 'Bio-based materials company developing brewed structural proteins for sustainable products.', ARRAY['Bio','Materials','Climate','Manufacturing'], 2007, 'Tsuruoka', 'Yamagata', 'Unknown', NULL, 'https://spiber.inc/en', 'green', 'Spiber develops bio-based structural protein materials (Brewed Protein™) aimed at enabling more sustainable apparel and industrial applications.'),
    ('mujin', 'Mujin', '株式会社Mujin', 'Industrial automation company building intelligent robot control for logistics and manufacturing.', ARRAY['Robotics','Manufacturing','Automation','Logistics'], 2011, 'Koto', 'Tokyo', 'Unknown', NULL, 'https://mujin-corp.com/', 'green', 'Mujin develops robotics automation and teachless robot control technologies to improve productivity in logistics and industrial operations.'),
    ('rapyuta-robotics', 'Rapyuta Robotics', 'ラピュタロボティクス株式会社', 'Warehouse automation company building robotics solutions for logistics operations.', ARRAY['Robotics','Logistics','Automation','Enterprise'], 2014, 'Tokyo', 'Tokyo', 'Unknown', NULL, 'https://www.rapyuta-robotics.com/', 'yellow', 'Rapyuta Robotics develops warehouse automation solutions including pick-assist systems to improve logistics productivity.');
END;
$$;
