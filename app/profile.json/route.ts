import { buildProfileJson, getPortraitPath } from "@/lib/site";

export function GET() {
  return Response.json(buildProfileJson(getPortraitPath()), {
    headers: {
      "X-Robots-Tag": "noindex",
    },
  });
}
