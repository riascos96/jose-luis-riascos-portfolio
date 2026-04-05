import { buildProfileJson, getPortraitPath } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildProfileJson(getPortraitPath()), {
    headers: {
      "X-Robots-Tag": "noindex",
    },
  });
}
