# sepsis2026

Bedside-focused clinical decision support app for the **Surviving Sepsis Campaign 2026** guideline, built with Next.js App Router, TypeScript, and Tailwind CSS.

## Features

- Mobile-first sepsis bedside workflow
- Recognition, classification, early bundle, fluids, vasopressors, perfusion reassessment, source control, antimicrobials, and escalation guidance
- Bedside calculators: qSOFA, SOFA-lite, shock index, lactate helper
- Ask NotebookLM page with the same proxy pattern used in nearby guideline apps
- No PHI storage and no persistence across browser refresh

## Clinical framing

The app is grounded in the local source PDF:

- `Surviving Sepsis Campaign: international guidelines for management of sepsis and septic shock 2026`
- DOI: `10.1007/s00134-026-08361-1`

Content is intentionally concise and bedside-oriented. Where the PDF text extracted cleanly, wording tracks the guideline. Where nuance was unclear from extraction, the app uses conservative summary language instead of inventing specifics.

## NotebookLM

The Ask page uses a lightweight server route:

`Browser -> /api/chat -> shared nlm proxy -> NotebookLM`

Set:

```bash
cp .env.example .env.local
```

Required env vars:

- `NLM_PROXY_URL`
- `NLM_PROXY_KEY`
- `NLM_NOTEBOOK_ID`

I was able to confirm that a local `nlm` CLI exists, but I could not reliably resolve the `sepsis2026` notebook ID from this environment because the CLI could not connect to its configured upstream during implementation. The app therefore uses `NLM_NOTEBOOK_ID` as an explicit configuration input and degrades gracefully when missing.

## Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Deployment notes

- Designed to deploy cleanly on Vercel
- Keep the app stateless
- Do not add PHI storage
- Set the NotebookLM proxy env vars in the deployment target

## Project structure

- `src/app` pages and API route
- `src/components` shared UI and layout
- `src/data` guideline content and pathway/calc metadata
- `src/lib` utilities and score logic
- `src/store` in-memory chat state

## Disclaimer

This tool is for clinical decision support only. It does not store PHI and is not a substitute for clinical judgment, institutional protocols, or direct review of the full guideline.
