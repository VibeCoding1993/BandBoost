import { site } from "@/lib/site";

// ads.txt authorises Google to sell ads on this domain (required by AdSense). Generated at build time.
export const dynamic = "force-static";

export function GET() {
  const pub = site.adsenseClient.replace(/^ca-/, "");
  const body = pub ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n` : "# AdSense publisher id not configured yet\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
