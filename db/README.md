# Database setup (PostgreSQL)

This project now includes a PostgreSQL schema designed for an initial dataset of ~50 startups and growth to 10,000+ rows.

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

## Verify seed (50 startups)

```bash
docker exec -it japan-startup-atlas-db psql -U startup_atlas -d startup_atlas -c "SELECT COUNT(*) FROM startups;"
```

## Example search query

```sql
SELECT name_en, hq_prefecture, funding_stage
FROM startups
WHERE tags @> ARRAY['AI']
ORDER BY founded_year DESC
LIMIT 20;
```
