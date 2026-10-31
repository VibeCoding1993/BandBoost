// Notifies IndexNow (Bing, Yandex, Seznam, Naver…) of every URL in the live sitemap.
// Bing's index also feeds ChatGPT search. Run after each deploy: node scripts/indexnow.mjs
import { readdirSync, readFileSync } from "node:fs";

const site = (process.env.SITE_URL || "https://ieltsbandcoach.xyz").replace(/\/$/, "");
const keyFile = readdirSync(new URL("../public/", import.meta.url)).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file missing in public/");
const key = readFileSync(new URL("../public/" + keyFile, import.meta.url), "utf8").trim();

const live = await fetch(`${site}/${keyFile}`).then((r) => r.text());
if (live.trim() !== key) throw new Error("The key file is not live yet: deploy first.");
const xml = await fetch(`${site}/sitemap.xml`).then((r) => r.text());
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key, keyLocation: `${site}/${keyFile}`, urlList }),
});
console.log(`IndexNow: ${urlList.length} URLs submitted → HTTP ${res.status} ${res.status === 200 || res.status === 202 ? "(accepted)" : await res.text()}`);
