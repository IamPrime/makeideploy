# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers anywhere who enjoy the "don't deploy on Friday" joke. Someone about to ship (or someone looking for a laugh to send to their team) opens the site, gets a verdict in one glance, and shares it. The seven African languages are the distinctive hook, not a regional gate: the audience is global.

## Product Purpose

makeideploy.today answers "Make I Deploy Today?" with a big yes/no verdict and a funny, localized reason based on the day, the time and the user's timezone. It exists to make tech people laugh small before they ship.

Success is two things at once:
- **Shared:** people screenshot it, drop links in team chats, and the OG cards circulate.
- **Portfolio:** the project shows the author's craft (design, i18n, the Chrome extension, the API and Slack integration) and can be pointed to as a case study.

Neither goal outranks the other. Work that gets shared and also shows care serves both.

## Positioning

A Pidgin-English take on shouldideploy that speaks seven African languages: Nigerian Pidgin (default), Swahili, Yoruba, Igbo, Hausa, Zulu and Amharic. The voice and the language set are what set it apart. A generic "should I deploy" clone can't truthfully claim them.

## Operating Context

- Opened in a browser just before a deploy, or as a running joke in team chat. Visits are short and on any device, often a phone.
- Linked into chats, so the OG image (`pages/api/og.tsx`, localized via `?lng=`) is part of the first impression.
- Used from CI and scripts via the JSON API (`/api` with `tz`, `date`, `lng`) and from Slack (`/api/slack`).
- Chrome extension (`extension/`) gives the verdict without opening the site.

## Capabilities and Constraints

- Next.js (pages router), React 18, TypeScript, deployed on Vercel with Vercel Analytics.
- Verdict logic in `helpers/time.ts`: Thursday/Friday afternoons, Fridays, weekends, the 22nd, Christmas Eve/Christmas, New Year, and a Feb 12–13 birthday each have their own reason sets.
- Timezone switchable via the `tz` query param; the verdict and favicon follow it.
- Press Space or click to get a new reason.
- Light and dark theme toggle (stored in localStorage).
- Seven locales in `locales/*.json`; Pidgin is the fallback. Reasons are contributed through those JSON files.
- Privacy: the site and extension collect no personal data (see `PRIVACY_POLICY.md`).

## Brand Commitments

- Name: **makeideploy.today**, tagline "Make I Deploy Today?" (localized per language).
- Voice: playful, pure Pidgin in the default locale, "no serious grammar, just vibes and code." Humour first, never mean.
- License: WTFPL.
- Favicon from emilegraphics on the Noun Project; keep the credit.

## Evidence on Hand

- Screenshots and a short demo: `docs/screenshots/` (desktop, mobile, dark mode, Yoruba, `makeideploy-demo.mp4`).
- Chrome Web Store promo images: `extension/promotional-images/`.
- No testimonials, user counts, press or adoption numbers exist. Don't invent them.

## Product Principles

1. **One glance, one answer.** The page is a single big verdict and a reason. No extra sections, no scrolling for the core experience.
2. **Every language is first-class.** Layout, type and spacing must work as well for Amharic (Ge'ez script), Zulu, Hausa and the rest as for Pidgin. No language gets second-class treatment.
3. **Light enough for any connection.** Fast on mid-range Android phones and slow mobile data. Every added byte has to earn its place.
4. **Funny enough to share, crafted enough to show.** The joke drives sharing, and the execution has to hold up as portfolio work.

## Accessibility & Inclusion

- Scripts beyond Latin (Amharic) must render correctly with suitable font fallbacks.
- The verdict must be readable at a glance in both light and dark themes.
- Low-bandwidth and low-end devices are part of the target audience, not edge cases.
