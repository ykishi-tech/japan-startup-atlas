export type Readiness = "green" | "yellow" | "red";

export type Startup = {
  slug: string;
  name_en: string;
  name_jp?: string;
  one_liner: string;
  tags: string[];
  founded_year: number;
  hq_city: string;
  hq_prefecture: string;
  funding_stage: string;
  total_funding_usd_millions: number | null;
  website_url: string;
  readiness: Readiness;
  description: string;
};

/**
 * Temporary runtime source used by the page.
 * Mirrors the curated seed in `db/init.sql` so production reflects the same 10 companies.
 */
const CURATED_STARTUPS: Startup[] = [
  {
    slug: "preferred-networks",
    name_en: "Preferred Networks",
    name_jp: "株式会社Preferred Networks",
    one_liner: "Deep learning and robotics company building AI solutions for industry.",
    tags: ["AI", "Robotics", "DeepTech", "Manufacturing"],
    founded_year: 2014,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://www.preferred.jp/en/",
    readiness: "yellow",
    description:
      "Preferred Networks develops deep learning technologies and applies them to robotics and industrial use cases in Japan.",
  },
  {
    slug: "sakana-ai",
    name_en: "Sakana AI",
    name_jp: "Sakana AI株式会社",
    one_liner: "Nature-inspired AI R&D company building next-generation foundation model research.",
    tags: ["AI", "Foundation-Models", "R&D", "DeepTech"],
    founded_year: 2023,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Seed",
    total_funding_usd_millions: 30,
    website_url: "https://sakana.ai/",
    readiness: "green",
    description:
      "Sakana AI is a Tokyo-based AI R&D company focused on nature-inspired approaches to foundation models and applied AI solutions.",
  },
  {
    slug: "ubie",
    name_en: "Ubie",
    name_jp: "Ubie株式会社",
    one_liner: "AI healthtech helping patients and clinicians navigate to the right care faster.",
    tags: ["Healthcare", "AI", "Digital-Health", "B2B2C"],
    founded_year: 2017,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://ubiehealth.com/",
    readiness: "green",
    description:
      "Ubie develops AI-powered products such as symptom assessment and clinical support tools to guide patients to appropriate care and improve healthcare workflows.",
  },
  {
    slug: "asuene",
    name_en: "ASUENE",
    name_jp: "アスエネ株式会社",
    one_liner: "Climate SaaS for measuring and reducing corporate greenhouse gas emissions.",
    tags: ["Climate", "SaaS", "Carbon-Accounting", "ESG"],
    founded_year: 2019,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://asuene.com/en",
    readiness: "green",
    description:
      "ASUENE provides a climate platform for GHG accounting and decarbonization support including ESG-related services for enterprises.",
  },
  {
    slug: "abeja",
    name_en: "ABEJA",
    name_jp: "株式会社ABEJA",
    one_liner: "AI platform and solutions provider supporting enterprise DX and analytics.",
    tags: ["AI", "Enterprise", "SaaS", "DX"],
    founded_year: 2012,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Public",
    total_funding_usd_millions: null,
    website_url: "https://www.abejainc.com/en/",
    readiness: "green",
    description:
      "ABEJA provides AI-driven platforms and solutions to help enterprises accelerate digital transformation and deploy AI in production.",
  },
  {
    slug: "smarthr",
    name_en: "SmartHR",
    name_jp: "株式会社SmartHR",
    one_liner: "Cloud HR and labor-management software for back-office operations in Japan.",
    tags: ["Enterprise-SaaS", "HR-Tech", "B2B"],
    founded_year: 2013,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://smarthr.co.jp/en/",
    readiness: "green",
    description:
      "SmartHR provides cloud software that simplifies HR and labor administration for companies operating in Japan.",
  },
  {
    slug: "money-forward",
    name_en: "Money Forward",
    name_jp: "株式会社マネーフォワード",
    one_liner: "Fintech platform offering personal finance and cloud services for businesses.",
    tags: ["Fintech", "SaaS", "Accounting", "SMB"],
    founded_year: 2012,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Public",
    total_funding_usd_millions: null,
    website_url: "https://corp.moneyforward.com/en/",
    readiness: "green",
    description:
      "Money Forward operates fintech services spanning personal finance management and business cloud products including accounting and related back-office tools.",
  },
  {
    slug: "spiber",
    name_en: "Spiber",
    name_jp: "Spiber株式会社",
    one_liner: "Bio-based materials company developing brewed structural proteins for sustainable products.",
    tags: ["Bio", "Materials", "Climate", "Manufacturing"],
    founded_year: 2007,
    hq_city: "Tsuruoka",
    hq_prefecture: "Yamagata",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://spiber.inc/en",
    readiness: "green",
    description:
      "Spiber develops bio-based structural protein materials (Brewed Protein™) aimed at enabling more sustainable apparel and industrial applications.",
  },
  {
    slug: "mujin",
    name_en: "Mujin",
    name_jp: "株式会社Mujin",
    one_liner: "Industrial automation company building intelligent robot control for logistics and manufacturing.",
    tags: ["Robotics", "Manufacturing", "Automation", "Logistics"],
    founded_year: 2011,
    hq_city: "Koto",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://mujin-corp.com/",
    readiness: "green",
    description:
      "Mujin develops robotics automation and teachless robot control technologies to improve productivity in logistics and industrial operations.",
  },
  {
    slug: "rapyuta-robotics",
    name_en: "Rapyuta Robotics",
    name_jp: "ラピュタロボティクス株式会社",
    one_liner: "Warehouse automation company building robotics solutions for logistics operations.",
    tags: ["Robotics", "Logistics", "Automation", "Enterprise"],
    founded_year: 2014,
    hq_city: "Tokyo",
    hq_prefecture: "Tokyo",
    funding_stage: "Unknown",
    total_funding_usd_millions: null,
    website_url: "https://www.rapyuta-robotics.com/",
    readiness: "yellow",
    description:
      "Rapyuta Robotics develops warehouse automation solutions including pick-assist systems to improve logistics productivity.",
  },
];

export async function getStartups(): Promise<Startup[]> {
  return CURATED_STARTUPS;
}
