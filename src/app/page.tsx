import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStartups } from "@/lib/startups";

const readinessLabel = {
  green: "Global-ready",
  yellow: "Japan-first",
  red: "Highly domestic",
} as const;

export default async function Page() {
  const startups = await getStartups();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Japan Startup Atlas</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Startup directory powered by the curated seed dataset. Total: {startups.length} companies.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {startups.map((s) => (
          <Card key={s.slug}>
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-xl">{s.name_en}</CardTitle>
                <Badge variant="secondary">{readinessLabel[s.readiness]}</Badge>
              </div>
              {s.name_jp ? <p className="text-sm text-muted-foreground">{s.name_jp}</p> : null}
              <p className="text-sm">{s.one_liner}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="text-muted-foreground">
                {s.hq_city}, {s.hq_prefecture} · Founded {s.founded_year} · Stage: {s.funding_stage}
              </div>
              <div className="flex flex-wrap gap-1">
                {s.tags.map((tag) => (
                  <Badge key={`${s.slug}-${tag}`} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p>{s.description}</p>
              <a className="text-primary underline" href={s.website_url} target="_blank" rel="noreferrer">
                {s.website_url}
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
