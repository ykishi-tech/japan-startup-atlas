#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <path-to-csv>"
  exit 1
fi

CSV_FILE="$1"

if [[ ! -f "$CSV_FILE" ]]; then
  echo "CSV file not found: $CSV_FILE"
  exit 1
fi

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set"
  exit 1
fi

psql "$DATABASE_URL" <<SQL
CREATE TEMP TABLE startups_import (
  slug TEXT,
  name_en TEXT,
  name_jp TEXT,
  one_liner TEXT,
  tags TEXT,
  founded_year INT,
  hq_city TEXT,
  hq_prefecture TEXT,
  funding_stage TEXT,
  total_funding_usd_millions NUMERIC(12,2),
  website_url TEXT,
  readiness TEXT,
  description TEXT
);

\copy startups_import FROM '$CSV_FILE' WITH (FORMAT csv, HEADER true);

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
  trim(slug),
  trim(name_en),
  nullif(trim(name_jp), ''),
  trim(one_liner),
  CASE
    WHEN coalesce(trim(tags), '') = '' THEN ARRAY[]::TEXT[]
    ELSE regexp_split_to_array(trim(tags), '\\s*\\|\\s*')
  END,
  founded_year,
  trim(hq_city),
  trim(hq_prefecture),
  trim(funding_stage),
  total_funding_usd_millions,
  nullif(trim(website_url), ''),
  trim(readiness)::readiness_level,
  trim(description)
FROM startups_import
ON CONFLICT (slug)
DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_jp = EXCLUDED.name_jp,
  one_liner = EXCLUDED.one_liner,
  tags = EXCLUDED.tags,
  founded_year = EXCLUDED.founded_year,
  hq_city = EXCLUDED.hq_city,
  hq_prefecture = EXCLUDED.hq_prefecture,
  funding_stage = EXCLUDED.funding_stage,
  total_funding_usd_millions = EXCLUDED.total_funding_usd_millions,
  website_url = EXCLUDED.website_url,
  readiness = EXCLUDED.readiness,
  description = EXCLUDED.description;
SQL

echo "Import complete: $CSV_FILE"
