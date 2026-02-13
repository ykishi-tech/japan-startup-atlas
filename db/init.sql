-- Japan Startup Atlas initial PostgreSQL schema + seed data
-- Target scale: start with ~50 companies, then grow to 10,000+

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TYPE readiness_level AS ENUM ('green', 'yellow', 'red');

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

-- seed only if empty
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
  SELECT
    lower(replace(company_name, ' ', '-')) AS slug,
    company_name AS name_en,
    jp_name AS name_jp,
    one_liner,
    tag_set,
    founded_year,
    city,
    prefecture,
    funding_stage,
    funding,
    website,
    readiness::readiness_level,
    description
  FROM (
    SELECT
      gs,
      (ARRAY['Atlas', 'Mirai', 'Sora', 'Kizuna', 'Nami', 'Hikari', 'Kumo', 'Sakura', 'Tsubasa', 'Zen',
             'Aozora', 'Shin', 'Neo', 'Kokoro', 'Asa', 'Kibo', 'Nexus', 'Raku', 'Terra', 'Flux'])[1 + ((gs - 1) % 20)] || ' ' ||
      (ARRAY['AI', 'Health', 'Fin', 'Logi', 'Agri', 'Climate', 'Robot', 'Bio', 'Energy', 'Data',
             'Retail', 'Mobility', 'Cloud', 'Factory', 'Ocean', 'Space', 'Carbon', 'Legal', 'Gov', 'Media'])[1 + (((gs - 1) / 20)::int)]
      AS company_name,
      'スタートアップ' || gs::text AS jp_name,
      (ARRAY[
        'Builds AI-first workflow tools for Japanese enterprises.',
        'Provides vertical SaaS for cross-border growth from Japan.',
        'Helps companies digitize operations and reduce manual work.',
        'Uses data and automation to improve business performance.',
        'Develops climate-aware products for industrial customers.'
      ])[1 + ((gs - 1) % 5)] AS one_liner,
      (ARRAY[
        ARRAY['AI','SaaS','B2B'],
        ARRAY['Fintech','SME','Payments'],
        ARRAY['Climate','Analytics','Enterprise'],
        ARRAY['Healthcare','Data','Platform'],
        ARRAY['Manufacturing','Automation','B2B']
      ])[1 + ((gs - 1) % 5)] AS tag_set,
      2012 + ((gs - 1) % 13) AS founded_year,
      (ARRAY['Tokyo','Osaka','Nagoya','Fukuoka','Sapporo','Kyoto','Kobe','Yokohama','Sendai','Hiroshima'])[1 + ((gs - 1) % 10)] AS city,
      (ARRAY['Tokyo','Osaka','Aichi','Fukuoka','Hokkaido','Kyoto','Hyogo','Kanagawa','Miyagi','Hiroshima'])[1 + ((gs - 1) % 10)] AS prefecture,
      (ARRAY['Pre-Seed','Seed','Series A','Series B','Series C'])[1 + ((gs - 1) % 5)] AS funding_stage,
      round((3 + (gs * 1.7))::numeric, 2) AS funding,
      'https://example-startup-' || gs::text || '.com' AS website,
      (ARRAY['yellow','green','red'])[1 + ((gs - 1) % 3)] AS readiness,
      'Profile seeded for Japan Startup Atlas. Company #' || gs::text || ' placeholder record for schema and query validation.' AS description
    FROM generate_series(1, 50) AS gs
  ) generated;
END;
$$;
