# Operation Gayu Samadhanam 😂🫂

A funny, cute, best-friendship website built by Kamal for his bestie Gayu.
React + Vite, no backend, no database, nothing is uploaded or stored.

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Edit the words

Every line of text on the site lives in one file:

`src/content/text.js`

Each section has its own exported object (`intro`, `court`, `interrogation`, `techSupport`,
`agreement`, `brain`, `scrapbook`, `apology`, `emergency`, `finalScene`, `finalInteraction`,
`gift`, `footer`). Change the strings there; no component edits needed.

## Where things are

- `src/components/sections/` one component per section, in page order (see `src/App.jsx`)
- `src/components/ui/` reusable bits: Button, Section, Stamp, Sticker, SpeechBubble, Modal, Confetti, Terminal, Meter, CopyButton
- `src/components/illustrations/` inline SVG cartoons (no external images)
- `src/hooks/` reduced-motion, in-view, copy-to-clipboard
- `src/styles/` design tokens (`base.css`), shared components, and per-section styles

## Notes

- Respects `prefers-reduced-motion`; no audio anywhere.
- Scrapbook photo upload is optional and local-only (object URLs, never sent anywhere).
- The advice form never sends or stores anything; it only offers a copy button.
