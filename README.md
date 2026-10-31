# BandBoost: free IELTS preparation website

Static Next.js site (lessons, practice tests, tools) plus a small Node API for AI feedback (Gemini).
Funded by Google AdSense.

## Commands

| Command | Purpose |
|---|---|
| `pnpm install` | install dependencies |
| `pnpm dev` | local development on http://localhost:3000 |
| `pnpm build` | static export to `out/` |
| `pnpm test` | unit and content tests (`tests/*.test.ts`) |
| `pnpm typecheck` | TypeScript check |
| `GEMINI_API_KEY=… ALLOWED_ORIGINS=http://localhost:3000 pnpm api` | AI feedback API on port 8787 |

## Content

- Lessons: `content/lessons/*.ts` (Markdown in `body`), registered in `content/lessons.ts`.
- Practice tests: `content/tests/*.ts`, registered in `content/practice.ts`. `tests/content.test.ts` checks numbering, answers, word limits and internal links.
- Vocabulary: `content/vocabulary.ts`. Prompts and cue cards: `content/prompts.ts`.
- Brand name and URLs: `lib/site.ts`.

## Environment variables

Static site (set at build time):

| Variable | Meaning |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | public URL, e.g. `https://bandboost.onrender.com` (canonical links, sitemap) |
| `NEXT_PUBLIC_API_URL` | AI feedback API URL; the AI page explains it is not switched on while empty |
| `NEXT_PUBLIC_CONTACT_EMAIL` | address shown on the contact page |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | `ca-pub-…` once AdSense approves the site (adds the script, meta tag and `ads.txt`) |
| `NEXT_PUBLIC_AD_SLOT_ARTICLE_TOP`, `…_ARTICLE_BOTTOM`, `…_PRACTICE`, `…_TOOL` | optional ad unit ids; otherwise use Auto ads |

API (`api/server.mjs`): `GEMINI_API_KEY`, `ALLOWED_ORIGINS` (comma-separated site origins), optional `GEMINI_MODEL`, `GEMINI_FALLBACK_MODEL`, `LIMIT_PER_HOUR` (6), `LIMIT_PER_DAY` (15), `GLOBAL_PER_DAY` (600).

## AdSense checklist

1. Buy a domain (AdSense does not accept free subdomains such as `onrender.com`) and point it to the static site.
2. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL`, then redeploy.
3. Submit the site in AdSense and enable Google's consent message (Privacy & messaging) for EEA/UK visitors.
4. After approval, set `NEXT_PUBLIC_ADSENSE_CLIENT` and redeploy: `ads.txt` is generated automatically.

IELTS is a registered trademark of the British Council, IDP: IELTS Australia and Cambridge University Press & Assessment. This site is independent and uses only original material.
