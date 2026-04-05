import { buildProfileMarkdown } from "@/lib/site";

export function GET() {
  return new Response(buildProfileMarkdown(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
