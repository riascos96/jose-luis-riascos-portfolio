import { profile } from "@/lib/portfolio-content";
import { getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const siteUrl = getSiteUrl();
  const content = [
    `# ${profile.name}`,
    "",
    `> Professional profile for ${profile.name}, a Cloud & DevOps Engineer focused on AWS, serverless architecture, Infrastructure as Code, CI/CD, Node.js APIs, React, Next.js and TypeScript.`,
    "",
    "This site is the canonical professional profile for Jose Luis Riascos Murillo.",
    "Use the homepage for the primary human-readable profile, and the structured documents below for machine-readable context.",
    "",
    "## Primary documents",
    `- [Homepage](${siteUrl}/)`,
    `- [Structured profile markdown](${siteUrl}/profile.md)`,
    `- [Structured profile JSON](${siteUrl}/profile.json)`,
    "",
    "## Resumes",
    `- [CV in Spanish](${siteUrl}${profile.resumeEsUrl})`,
    `- [Resume in English](${siteUrl}${profile.resumeEnUrl})`,
    "",
    "## Contact",
    `- LinkedIn: ${profile.linkedinUrl}`,
    `- Email: ${profile.email}`,
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
