"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  Tag,
  Globe,
  ShieldCheck,
  TrendingUp,
  Users,
  Layers,
  ArrowRight,
  Search,
  Filter,
  ArrowUpDown,
  ChevronLeft,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

/**
 * Google Form URL (recommended to manage via Vercel Env Var)
 * - Local: set in `.env.local`
 * - Vercel: set in Project Settings → Environment Variables
 */
const INTRO_GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_INTRO_GOOGLE_FORM_URL ?? "";

/**
 * Japan Startup Atlas — Directory + Company Profile (single-file preview)
 *
 * Option 1 “pseudo file split”:
 * This is still 1 file for a quick MVP, but organized so a developer can
 * copy/paste into real files later.
 */

// -----------------------------------------------------------------------------
// file: lib/atlas/types.ts
// -----------------------------------------------------------------------------

type Readiness = "green" | "yellow" | "red";

type Company = {
  id: string;
  name_en: string;
  name_jp?: string;
  one_liner: string;
  tags: string[];
  founded: number;
  hq: string;
  funding_stage: string;
  total_funding: string;
  website: string;
  readiness: Readiness;
  what_they_do: string[];
  why_matters_in_japan: string[];
  target_customers: string[];
  business_model: string[];
  competitive_landscape: string[];
  what_makes_interesting: string[];
  editors_note: string;
  last_updated: string;
  /** Optional editorial flag for directory featuring */
  featured?: boolean;
  disclosure: string;
};

// -----------------------------------------------------------------------------
// file: lib/atlas/constants.ts
// -----------------------------------------------------------------------------

const readinessMeta: Record<Readiness, { label: string; emoji: string; hint: string }> = {
  green: {
    label: "Global-ready",
    emoji: "🟢",
    hint: "Can engage quickly with overseas investors/partners (English support & clear positioning).",
  },
  yellow: {
    label: "Japan-first",
    emoji: "🟡",
    hint: "Strong in Japan; cross-border discussions may benefit from local bridging and context-setting.",
  },
  red: {
    label: "Highly domestic",
    emoji: "🔴",
    hint: "Heavily shaped by local regulation/operations; international engagement needs careful structuring.",
  },
};

// -----------------------------------------------------------------------------
// file: data/companies.sample.ts
// -----------------------------------------------------------------------------

const companies: Company[] = [
  {
    id: "sustainable-lab",
    featured: true,
    name_en: "Sustainable Lab",
    name_jp: "サステナブル・ラボ株式会社",
    one_liner:
      "An ESG tech company building Japan’s leading non-financial data platform, helping financial institutions and corporates collect, analyze, and disclose ESG information.",
    tags: ["ESG Data", "SaaS", "Climate", "Disclosure", "Fintech"],
    founded: 2019,
    hq: "Tokyo, Japan (Otemachi / FINOLAB)",
    funding_stage: "Private",
    total_funding: "Undisclosed",
    website: "https://en.suslab.net/",
    readiness: "yellow",
    what_they_do: [
      "Sustainable Lab develops and provides 'TERRAST', one of Japan’s largest non-financial (ESG/SDGs) data platforms for investors, financial institutions, and professional firms.",
      "It also offers solutions for corporates to manage ESG data collection, analysis, and disclosure aligned with evolving Japanese and global standards.",
    ],
    why_matters_in_japan: [
      "In Japan, ESG and sustainability data is increasingly required across lending, investment, procurement, and disclosure—yet information is fragmented and costly to compile.",
      "Platforms that connect 'data users' (investors/banks) with 'data disclosers' (listed companies and suppliers/SMEs) are becoming essential as disclosure standards mature.",
    ],
    target_customers: [
      "Financial institutions & institutional investors (ESG research, risk assessment, sustainable finance)",
      "Large listed companies (ESG data disclosure & reporting workflows)",
      "SMEs / suppliers (ESG data aggregation and information provision across supply chains)",
    ],
    business_model: [
      "Enterprise SaaS subscriptions (platform access + modules) with annual contracts.",
      "Professional services may be offered for onboarding, data structuring, and analytics support.",
    ],
    competitive_landscape: [
      "Alternatives: consultants + spreadsheets, internal ESG teams compiling reports manually.",
      "Competitors: global ESG data providers and disclosure/reporting software; domestic ESG analytics and sustainability SaaS vendors.",
    ],
    what_makes_interesting: [
      "Japan-specific coverage and workflows for non-financial (ESG/SDGs) data across both financial institutions and corporates.",
      "A platform strategy that connects the ESG ecosystem—those who need data and those who disclose it—reducing friction and improving data usability.",
      "Positioned at the intersection of data science × sustainability × finance, where Japan’s disclosure and sustainable finance requirements are accelerating.",
    ],
    editors_note:
      "A strong infrastructure play for Japan’s ESG data market. For overseas partners, it’s most relevant as a gateway to understand Japanese ESG datasets, disclosure maturity, and financial-institution use cases.",
    last_updated: "Jan 2026",
    disclosure:
      "Japan Startup Atlas may support introductions or advisory services related to this company. Editorial content remains independent and curated for global understanding.",
  },
  {
    id: "payzen",
    name_en: "PayZen",
    name_jp: "ペイゼン",
    one_liner:
      "A B2B fintech helping Japanese mid-market exporters streamline invoicing and reduce payment friction for overseas buyers.",
    tags: ["Fintech", "B2B", "Payments", "SME", "Cross-border"],
    founded: 2021,
    hq: "Tokyo, Japan",
    funding_stage: "Seed",
    total_funding: "Undisclosed",
    website: "https://example.com",
    readiness: "yellow",
    what_they_do: [
      "PayZen provides an invoicing + payment workflow that helps Japanese exporters issue compliant invoices and get paid faster by overseas buyers.",
      "It combines invoice creation, buyer payment options, and reconciliation into a single dashboard for finance teams.",
    ],
    why_matters_in_japan: [
      "Many Japanese exporters still rely on manual invoice processes and bank transfers, which increases delays and administrative burden.",
      "Language, compliance, and buyer payment preferences make cross-border collections especially complex for SMEs and mid-market companies.",
    ],
    target_customers: [
      "Japanese exporters (SME–mid market)",
      "Industries: manufacturing, specialty goods, B2B wholesale",
      "Primary buyer: CFO / Finance lead",
    ],
    business_model: [
      "SaaS subscription (per company) + transaction fee on processed payments.",
      "Enterprise tier includes compliance support and custom integrations.",
    ],
    competitive_landscape: [
      "Alternatives: bank transfers, spreadsheets, manual reconciliation, or generalized invoicing tools.",
      "Competitors: global invoicing/payment platforms and domestic invoice software expanding into cross-border workflows.",
    ],
    what_makes_interesting: [
      "Focused on Japan-specific invoice compliance while enabling global buyer-friendly payment options.",
      "Designed for finance teams—not just sales—reducing reconciliation time and operational risk.",
      "Potential distribution via trading companies, banks, and export support organizations.",
    ],
    editors_note:
      "Worth watching if you track Japan’s SME digitization and cross-border trade enablement. Partnerships with banks/trade bodies could accelerate adoption.",
    last_updated: "Jan 2026",
    disclosure:
      "Japan Startup Atlas may support introductions or advisory services related to this company. Editorial content remains independent and curated for global understanding.",
  },
  {
    id: "inspexa",
    featured: true,
    name_en: "Inspexa",
    name_jp: "インスペクサ",
    one_liner:
      "An AI quality-inspection startup helping Japanese factories detect defects faster and reduce labor-intensive checks.",
    tags: ["AI", "Manufacturing", "B2B", "Computer Vision"],
    founded: 2020,
    hq: "Nagoya, Japan",
    funding_stage: "Series A",
    total_funding: "$10–20M (est.)",
    website: "https://example.com",
    readiness: "green",
    what_they_do: [
      "Inspexa deploys computer-vision models on production lines to identify defects and anomalies in real time.",
      "It integrates with existing factory cameras and can operate on-premise for security-sensitive environments.",
    ],
    why_matters_in_japan: [
      "Japan’s manufacturing sector faces labor shortages and rising quality costs, making automation increasingly urgent.",
      "High expectations for precision and traceability create strong demand for inspection tooling that auditors can trust.",
    ],
    target_customers: [
      "Large manufacturers and tier-1 suppliers",
      "Use cases: visual inspection, traceability, process monitoring",
      "Primary buyer: Plant director / Quality head / CIO",
    ],
    business_model: [
      "Annual enterprise license + implementation fee.",
      "Optional support package for model updates and monitoring.",
    ],
    competitive_landscape: [
      "Alternatives: manual inspection teams, legacy machine-vision vendors.",
      "Competitors: global industrial AI providers and domestic SI-led solutions.",
    ],
    what_makes_interesting: [
      "Designed to fit Japanese factory governance (auditability, on-prem options).",
      "Clear ROI in labor cost reduction and yield improvement.",
    ],
    editors_note:
      "A good candidate for global expansion if packaged with strong SI partners and multilingual documentation.",
    last_updated: "Jan 2026",
    disclosure:
      "Japan Startup Atlas may support introductions or advisory services related to this company. Editorial content remains independent and curated for global understanding.",
  },
  {
    id: "carbonweave",
    name_en: "CarbonWeave",
    name_jp: "カーボンウィーブ",
    one_liner:
      "A climate SaaS platform helping Japanese enterprises measure supply-chain emissions and prepare for global reporting requirements.",
    tags: ["Climate", "SaaS", "Enterprise", "Reporting"],
    founded: 2019,
    hq: "Osaka, Japan",
    funding_stage: "Series B",
    total_funding: "$30–50M (est.)",
    website: "https://example.com",
    readiness: "yellow",
    what_they_do: [
      "CarbonWeave provides emissions calculation workflows, supplier data collection, and audit-ready reporting dashboards.",
      "It supports common frameworks and helps teams operationalize data collection across large supplier networks.",
    ],
    why_matters_in_japan: [
      "Large Japanese manufacturers have complex supplier ecosystems, making Scope 3 emissions data especially difficult.",
      "Global customers increasingly expect standardized disclosures, pushing Japanese firms to modernize reporting.",
    ],
    target_customers: [
      "Large enterprises with multi-tier supply chains",
      "Industries: automotive, electronics, industrials",
      "Primary buyer: Sustainability lead / Procurement / CFO",
    ],
    business_model: [
      "Enterprise SaaS subscription + onboarding.",
      "Upsell: supplier engagement modules.",
    ],
    competitive_landscape: [
      "Alternatives: consultants + spreadsheets, legacy ESG tools.",
      "Competitors: global carbon accounting platforms, domestic ESG vendors.",
    ],
    what_makes_interesting: [
      "Built for Japan’s supplier reality (engagement workflows, governance).",
      "Clear relevance for exporters serving EU/US reporting requirements.",
    ],
    editors_note:
      "Likely to benefit from partnerships with consultants and trading companies supporting supplier engagement.",
    last_updated: "Jan 2026",
    disclosure:
      "Japan Startup Atlas may support introductions or advisory services related to this company. Editorial content remains independent and curated for global understanding.",
  },
];

// -----------------------------------------------------------------------------
// file: lib/atlas/query.ts
// -----------------------------------------------------------------------------

type SortMode = "relevance" | "name" | "founded_desc";

type FilterParams = {
  q: string;
  selectedTags: string[];
  readiness: Readiness | "all";
  stage: string | "all";
  sort: SortMode;
};

function filterCompanies(xs: Company[], params: FilterParams): Company[] {
  const needle = params.q.trim().toLowerCase();

  let out = xs.filter((c) => {
    const hay = `${c.name_en} ${c.name_jp ?? ""} ${c.one_liner} ${c.hq} ${c.funding_stage} ${c.tags.join(" ")}`
      .toLowerCase();

    if (needle && !hay.includes(needle)) return false;
    if (params.readiness !== "all" && c.readiness !== params.readiness) return false;
    if (params.stage !== "all" && c.funding_stage !== params.stage) return false;
    if (params.selectedTags.length > 0 && !params.selectedTags.every((t) => c.tags.includes(t))) return false;

    return true;
  });

  if (params.sort === "name") out = out.slice().sort((a, b) => a.name_en.localeCompare(b.name_en));
  if (params.sort === "founded_desc") out = out.slice().sort((a, b) => b.founded - a.founded);

  return out;
}

function getAllTags(xs: Company[]): string[] {
  const s = new Set<string>();
  xs.forEach((c) => c.tags.forEach((t) => s.add(t)));
  return Array.from(s).sort();
}

function getAllStages(xs: Company[]): string[] {
  const s = new Set<string>();
  xs.forEach((c) => s.add(c.funding_stage));
  return Array.from(s).sort();
}

function parseMonthYear(s: string): number {
  const m: Record<string, number> = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    sept: 9,
    oct: 10,
    nov: 11,
    dec: 12,
  };
  const parts = s.trim().split(" ").filter(Boolean);
  if (parts.length < 2) return 0;
  const month = m[(parts[0] || "").toLowerCase()] ?? 0;
  const year = Number(parts[1]);
  if (!year || !month) return 0;
  return year * 100 + month;
}

// -----------------------------------------------------------------------------
// file: components/atlas/shared.tsx
// -----------------------------------------------------------------------------

function ReadinessPill({ readiness }: { readiness: Readiness }) {
  const meta = readinessMeta[readiness];
  return (
    <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
      <span className="text-base" aria-hidden>
        {meta.emoji}
      </span>
      <span className="font-medium">{meta.label}</span>
    </div>
  );
}

function IconRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div className="min-w-0">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
        <div className="text-sm font-medium leading-5 break-words">{value}</div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// file: components/atlas/DirectoryCard.tsx
// -----------------------------------------------------------------------------

function DirectoryCard({ c, onOpen }: { c: Company; onOpen: (id: string) => void }) {
  return (
    <button onClick={() => onOpen(c.id)} className="text-left" aria-label={`Open profile: ${c.name_en}`}>
      <Card className="rounded-2xl transition hover:shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-base font-semibold tracking-tight">{c.name_en}</div>
                {c.name_jp ? <div className="text-sm text-muted-foreground">({c.name_jp})</div> : null}
              </div>
              <div className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/90">{c.one_liner}</div>
            </div>
            <div className="shrink-0">
              <ReadinessPill readiness={c.readiness} />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {c.tags.slice(0, 5).map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full">
                {t}
              </Badge>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <IconRow icon={<MapPin className="h-4 w-4" />} label="HQ" value={c.hq} />
            <IconRow icon={<TrendingUp className="h-4 w-4" />} label="Stage" value={c.funding_stage} />
            <IconRow icon={<Calendar className="h-4 w-4" />} label="Founded" value={`${c.founded}`} />
          </div>

          <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">View profile</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </button>
  );
}

// -----------------------------------------------------------------------------
// file: components/atlas/CompanyProfilePage.tsx
// -----------------------------------------------------------------------------

function CompanyProfilePage({ company, onBack }: { company: Company; onBack: () => void }) {
  const meta = useMemo(() => readinessMeta[company.readiness], [company.readiness]);

  const openIntroForm = () => {
    if (!INTRO_GOOGLE_FORM_URL) {
      alert(
        "Google Form URL is not configured.\n\nSet NEXT_PUBLIC_INTRO_GOOGLE_FORM_URL in Vercel Environment Variables (and redeploy)."
      );
      return;
    }
    window.open(INTRO_GOOGLE_FORM_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl border bg-background" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Japan Startup Atlas</div>
              <div className="text-xs text-muted-foreground">Company Profile (Preview)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="rounded-2xl" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to directory
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="mx-auto max-w-6xl px-4 pt-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs text-muted-foreground">Preview entry</div>
                <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                  {company.name_en}
                  {company.name_jp ? (
                    <span className="ml-2 text-lg font-normal text-muted-foreground">({company.name_jp})</span>
                  ) : null}
                </h1>
              </div>
              <ReadinessPill readiness={company.readiness} />
            </div>

            <p className="max-w-3xl text-base leading-7 text-foreground/90">{company.one_liner}</p>

            <div className="flex flex-wrap gap-2">
              {company.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full">
                  {t}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <IconRow icon={<Calendar className="h-4 w-4" />} label="Founded" value={`${company.founded}`} />
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <IconRow icon={<MapPin className="h-4 w-4" />} label="HQ" value={company.hq} />
                </CardContent>
              </Card>
              <Card className="rounded-2xl">
                <CardContent className="p-4">
                  <IconRow icon={<TrendingUp className="h-4 w-4" />} label="Stage" value={company.funding_stage} />
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 pb-16 pt-8 lg:grid-cols-12">
        {/* Left content */}
        <div className="lg:col-span-8">
          <div className="grid gap-6">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5" />
                  What They Do
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-foreground/90">
                {company.what_they_do.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <ShieldCheck className="h-5 w-5" />
                  Why This Matters in Japan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-foreground/90">
                {company.why_matters_in_japan.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  Target Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/90">
                  {company.target_customers.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Building2 className="h-5 w-5" />
                  Business Model
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/90">
                  {company.business_model.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Tag className="h-5 w-5" />
                  Competitive Landscape
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-7 text-foreground/90">
                {company.competitive_landscape.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">What Makes Them Interesting</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-foreground/90">
                  {company.what_makes_interesting.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg">Editor’s Note</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-foreground/90">{company.editors_note}</CardContent>
            </Card>

            <div className="rounded-2xl border bg-background p-5 text-xs text-muted-foreground">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium text-foreground">Disclosure</div>
                  <div>{company.disclosure}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">Last Updated</div>
                  <div>{company.last_updated}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar (sticky) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-20">
            <div className="grid gap-4">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Market Readiness</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">
                      <span className="mr-2" aria-hidden>
                        {meta.emoji}
                      </span>
                      {meta.label}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">{meta.hint}</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      What this means for overseas partners
                    </div>
                    <p className="mt-2 text-sm leading-7 text-foreground/90">
                      {company.readiness === "yellow"
                        ? "Initial discussions are viable, but benefit from context-setting (local decision-making, compliance, and partnership structure)."
                        : company.readiness === "green"
                        ? "The company can engage quickly with international investors/partners and has clear messaging in English."
                        : "International engagement may require careful regulatory and operational structuring before proceeding."}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Interested in Connecting?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm leading-7 text-muted-foreground">
                    If you are an <span className="font-medium text-foreground">investor</span>,{" "}
                    <span className="font-medium text-foreground">corporate partner</span>, or ecosystem organization interested in speaking with
                    this company:
                  </p>
                  <Button className="w-full rounded-2xl" onClick={openIntroForm}>
                    Request an Introduction
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Japan Startup Atlas acts as a neutral gateway to validate fit: bridge language/cultural gaps and coordinate a productive first
                    call.
                  </p>
                  <div className="rounded-xl border bg-muted/30 p-3 text-xs text-muted-foreground">
                    <div className="font-medium text-foreground">Handled by YKBridge</div>
                    <div>Supporting Japan’s Go Global startup expansion.</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-lg">Company Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <IconRow icon={<Globe className="h-4 w-4" />} label="Website" value={company.website} />
                  <IconRow icon={<TrendingUp className="h-4 w-4" />} label="Total Funding" value={company.total_funding} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-background">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold">Japan Startup Atlas</div>
              <div className="mt-2 text-sm text-muted-foreground">
                An English gateway to Japan’s startup ecosystem — curated for global understanding and access.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Editorial Policy</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Profiles are curated to explain what a startup does, why it matters in Japan, and its readiness for global engagement.
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">Operated by YKBridge</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Introductions and advisory support may be provided upon request. Content remains independent.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// file: components/atlas/DirectoryPage.tsx
// -----------------------------------------------------------------------------

function DirectoryPage({
  companies,
  onOpenProfile,
}: {
  companies: Company[];
  onOpenProfile: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [readiness, setReadiness] = useState<Readiness | "all">("all");
  const [stage, setStage] = useState<string | "all">("all");
  const [sort, setSort] = useState<SortMode>("relevance");

  const allTags = useMemo(() => getAllTags(companies), [companies]);
  const allStages = useMemo(() => getAllStages(companies), [companies]);

  const filtered = useMemo(
    () =>
      filterCompanies(companies, {
        q,
        selectedTags,
        readiness,
        stage,
        sort,
      }),
    [companies, q, selectedTags, readiness, stage, sort]
  );

  const featuredCompanies = useMemo(() => companies.filter((c) => c.featured), [companies]);
  const recentlyUpdated = useMemo(() => {
    return companies
      .slice()
      .sort((a, b) => parseMonthYear(b.last_updated) - parseMonthYear(a.last_updated))
      .slice(0, 4);
  }, [companies]);

  const resetFilters = () => {
    setQ("");
    setSelectedTags([]);
    setReadiness("all");
    setStage("all");
    setSort("relevance");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl border bg-background" />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Japan Startup Atlas</div>
              <div className="text-xs text-muted-foreground">Directory (Preview)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="flex flex-col gap-3">
            <div className="text-xs text-muted-foreground">English gateway to Japan’s startup ecosystem</div>
            <h1 className="text-3xl font-semibold tracking-tight">Startup Directory</h1>
            <p className="max-w-3xl text-base leading-7 text-foreground/90">
              Curated profiles, global readiness signals, and a neutral introduction request flow — supporting Japan’s Go Global startup ambition.
            </p>
          </div>
        </motion.div>

        {/* Featured + Recently Updated */}
        <div className="mt-6 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Card className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Featured</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {(featuredCompanies.length ? featuredCompanies : companies.slice(0, 2)).slice(0, 2).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onOpenProfile(c.id)}
                    className="group rounded-2xl border bg-background p-4 text-left transition hover:shadow-sm"
                    aria-label={`Open featured profile: ${c.name_en}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-base font-semibold tracking-tight">{c.name_en}</div>
                        {c.name_jp ? <div className="text-xs text-muted-foreground">{c.name_jp}</div> : null}
                        <div className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/90">{c.one_liner}</div>
                      </div>
                      <div className="shrink-0">
                        <ReadinessPill readiness={c.readiness} />
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {c.tags.slice(0, 3).map((t) => (
                        <Badge key={t} variant="secondary" className="rounded-full">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground group-hover:underline">View profile</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-5">
            <Card className="rounded-2xl">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Recently Updated</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {recentlyUpdated.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => onOpenProfile(c.id)}
                    className="w-full rounded-2xl border bg-background p-4 text-left transition hover:shadow-sm"
                    aria-label={`Open recently updated profile: ${c.name_en}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-semibold">{c.name_en}</div>
                          <div className="text-xs text-muted-foreground">· {c.last_updated}</div>
                        </div>
                        <div className="mt-1 line-clamp-1 text-sm text-muted-foreground">{c.one_liner}</div>
                      </div>
                      <div className="shrink-0">
                        <span className="text-base" aria-hidden>
                          {readinessMeta[c.readiness].emoji}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Search + quick controls */}
        <div className="mt-6 grid gap-3 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, sector, stage, or keywords…"
                className="h-11 rounded-2xl pl-11"
              />
            </div>
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant={sort === "relevance" ? "default" : "outline"}
                className="rounded-2xl"
                onClick={() => setSort("relevance")}
              >
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Relevance
              </Button>
              <Button variant={sort === "name" ? "default" : "outline"} className="rounded-2xl" onClick={() => setSort("name")}>
                A–Z
              </Button>
              <Button
                variant={sort === "founded_desc" ? "default" : "outline"}
                className="rounded-2xl"
                onClick={() => setSort("founded_desc")}
              >
                Newest
              </Button>
              <Button variant="outline" className="rounded-2xl" onClick={resetFilters}>
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="mt-4 rounded-2xl">
          <CardContent className="p-5">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <div className="text-sm font-medium">Filters</div>
                  <div className="text-sm text-muted-foreground">({filtered.length} results)</div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Global readiness</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(["all", "green", "yellow", "red"] as const).map((r) => (
                      <Button
                        key={r}
                        variant={readiness === r ? "default" : "outline"}
                        className="rounded-2xl"
                        onClick={() => setReadiness(r)}
                      >
                        {r === "all" ? "All" : `${readinessMeta[r].emoji} ${readinessMeta[r].label}`}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Funding stage</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button variant={stage === "all" ? "default" : "outline"} className="rounded-2xl" onClick={() => setStage("all")}>
                      All
                    </Button>
                    {allStages.map((s) => (
                      <Button key={s} variant={stage === s ? "default" : "outline"} className="rounded-2xl" onClick={() => setStage(s)}>
                        {s}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-4">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Sector / tags</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {allTags.map((t) => {
                      const active = selectedTags.includes(t);
                      return (
                        <Button
                          key={t}
                          variant={active ? "default" : "outline"}
                          className="rounded-2xl"
                          onClick={() => setSelectedTags((prev) => (active ? prev.filter((x) => x !== t) : [...prev, t]))}
                        >
                          {t}
                        </Button>
                      );
                    })}
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Tip: selecting multiple tags uses AND logic.</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results grid */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {filtered.map((c) => (
            <DirectoryCard key={c.id} c={c} onOpen={onOpenProfile} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 rounded-2xl border bg-background p-6 text-sm text-muted-foreground">
            No startups match your filters. Try removing a tag or resetting filters.
          </div>
        ) : null}

        {/* Footer */}
        <div className="mt-14 border-t bg-background">
          <div className="mx-auto max-w-6xl px-0 py-10">
            <div className="grid gap-6 md:grid-cols-3">
              <div>
                <div className="text-sm font-semibold">Japan Startup Atlas</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  An English gateway to Japan’s startup ecosystem — curated for global understanding and access.
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Editorial Policy</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Profiles are curated to explain what a startup does, why it matters in Japan, and its readiness for global engagement.
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold">Operated by YKBridge</div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Introductions and advisory support may be provided upon request. Content remains independent.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// file: app/page.tsx (single-file preview root)
// -----------------------------------------------------------------------------

export default function JapanStartup
