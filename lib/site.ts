import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  credentialGroups,
  experienceItems,
  heroChips,
  heroMetrics,
  profile,
  strengths,
  structuredFacts,
  summaryParagraphs,
  technicalKeywords,
} from "@/lib/portfolio-content";

const portraitCandidates = [
  "profile-jose-riascos.jpg",
  "profile-jose-riascos.jpeg",
  "profile-jose-riascos.png",
  "jose-riascos.jpg",
  "jose-riascos.jpeg",
  "jose-riascos.png",
  "portrait-jose-riascos.jpg",
  "portrait-jose-riascos.jpeg",
  "portrait-jose-riascos.png",
] as const;

function normalizeUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url.replace(/\/$/, "");
  }

  return `https://${url}`.replace(/\/$/, "");
}

export function getSiteUrl() {
  const rawUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    "http://localhost:3000";

  return normalizeUrl(rawUrl);
}

export function getPortraitPath() {
  const portraitFile =
    portraitCandidates.find((file) => existsSync(join(process.cwd(), "public", file))) ?? null;

  return portraitFile ? `/${portraitFile}` : null;
}

export function buildProfileJsonLd(portraitPath: string | null) {
  const siteUrl = getSiteUrl();
  const certifications = credentialGroups[0].items.map((item) => ({
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Certification",
    name: item,
  }));

  const person: Record<string, unknown> = {
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.jobTitle,
    description: profile.seoDescription,
    url: siteUrl,
    sameAs: [profile.linkedinUrl],
    email: profile.email,
    homeLocation: {
      "@type": "Place",
      name: profile.location,
    },
    knowsAbout: [...technicalKeywords],
    knowsLanguage: ["Spanish", "English"],
    hasOccupation: {
      "@type": "Occupation",
      name: profile.jobTitle,
    },
    worksFor: {
      "@type": "Organization",
      name: "Independent Consultant",
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Universidad Tecnologica de Panama",
      },
      {
        "@type": "EducationalOrganization",
        name: "Instituto Colombo Americano Andres Bello",
      },
    ],
    hasCredential: certifications,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "professional inquiries",
      email: profile.email,
      availableLanguage: ["Spanish", "English"],
      areaServed: ["Remote", "Panama"],
    },
  };

  if (portraitPath) {
    person.image = `${siteUrl}${portraitPath}`;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: siteUrl,
    name: `${profile.name} - Professional Profile`,
    mainEntity: person,
  };
}

export function buildProfileMarkdown() {
  const siteUrl = getSiteUrl();
  const lines: string[] = [
    `# ${profile.name}`,
    "",
    `> ${profile.seoDescription}`,
    "",
    "## Contact",
    `- LinkedIn: ${profile.linkedinUrl}`,
    `- Email: ${profile.email}`,
    `- Location: ${profile.location}`,
    `- Availability: ${profile.availability}`,
    "",
    "## Summary",
    ...summaryParagraphs.map((paragraph) => `- ${paragraph}`),
    "",
    "## Core strengths",
    ...strengths.map(
      (strength) =>
        `- ${strength.title}: ${strength.copy} Outcome: ${strength.outcome}`
    ),
    "",
    "## Structured facts",
    ...structuredFacts.map((fact) => `- ${fact.label}: ${fact.value}`),
    "",
    "## Experience",
    ...experienceItems.flatMap((item) => [
      `### ${item.role} - ${item.company} (${item.period})`,
      `- Location: ${item.location}`,
      ...(item.note ? [`- Note: ${item.note}`] : []),
      ...item.bullets.map((bullet) => `- ${bullet}`),
      "",
    ]),
    "## Certifications and education",
    ...credentialGroups.flatMap((group) => [
      `### ${group.title}`,
      ...group.items.map((item) => `- ${item}`),
      "",
    ]),
    "## Technical keywords",
    `- ${technicalKeywords.join(", ")}`,
    "",
    "## Public documents",
    `- Homepage: ${siteUrl}/`,
    `- CV ES: ${siteUrl}${profile.resumeEsUrl}`,
    `- Resume EN: ${siteUrl}${profile.resumeEnUrl}`,
  ];

  return lines.join("\n");
}

export function buildProfileJson(portraitPath: string | null) {
  const siteUrl = getSiteUrl();

  return {
    profile: {
      ...profile,
      siteUrl,
      portraitUrl: portraitPath ? `${siteUrl}${portraitPath}` : null,
    },
    summaryParagraphs,
    heroMetrics,
    heroChips,
    strengths,
    structuredFacts,
    experience: experienceItems,
    credentials: credentialGroups,
    technicalKeywords,
  };
}
