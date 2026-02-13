# Database setup (PostgreSQL)

This project now includes a PostgreSQL schema designed for an initial curated dataset of 10 startups and growth to 10,000+ rows.

## Start DB locally

```bash
docker compose -f docker-compose.db.yml up -d
```

The first startup runs `db/init.sql` automatically.

## Connection settings

- Host: `localhost`
- Port: `5432`
- Database: `startup_atlas`
- User: `startup_atlas`
- Password: `startup_atlas`

Connection URL:

```bash
postgresql://startup_atlas:startup_atlas@localhost:5432/startup_atlas
```

## Verify seed (10 startups)

```bash
docker exec -it japan-startup-atlas-db psql -U startup_atlas -d startup_atlas -c "SELECT COUNT(*) FROM startups;"
```

## How to hand off startup data (recommended)

Use CSV and provide one row per company.

1. Copy `db/templates/startups.template.csv` and fill in your data.
2. Keep the same header columns/order.
3. Use `|` to separate tags (example: `AI|SaaS|B2B`).
4. `readiness` must be one of: `green`, `yellow`, `red`.
5. If funding stage is not confirmed, use `Unknown` (avoid freeform placeholders like `TBD`).

Required columns:

- `slug`
- `name_en`
- `one_liner`
- `founded_year`
- `hq_city`
- `hq_prefecture`
- `funding_stage`
- `readiness`
- `description`

Optional columns:

- `name_jp`
- `tags`
- `total_funding_usd_millions`
- `website_url`

## Import CSV into DB

```bash
export DATABASE_URL="postgresql://startup_atlas:startup_atlas@localhost:5432/startup_atlas"
./db/import_startups.sh db/templates/startups.template.csv
```

- Import is **upsert** by `slug` (insert new, update existing).
- This lets you safely re-import corrected data.

## Example search query

```sql
SELECT name_en, hq_prefecture, funding_stage
FROM startups
WHERE tags @> ARRAY['AI']
ORDER BY founded_year DESC
LIMIT 20;
```
