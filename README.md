# BLUE — Some bonds don't need explanations.

A small interactive experience designed for Gayu, created by Kamal.
React + Vite. No backend, no login, no tracking. Nothing is uploaded or sent anywhere.

## Run it

```bash
npm install
npm run dev       # local dev server (http://localhost:5173)
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Edit the words

Every line of text lives in `src/content/content.js`, grouped by chapter.
The final message is in `finalMessage` and is displayed exactly as written there.

## Personalise the memory cards (optional)

1. Open the site with `?edit` at the end of the address, for example `http://localhost:5173/?edit`.
2. An editor appears above the four memory cards. Replace any card with a real memory, or leave the defaults.
3. Press **Copy link with these cards** and share that link. It carries your cards inside the address.

Edits are kept only in your browser and in the copied link. To make them permanent for every visitor,
change `memories.cards` in `src/content/content.js` and rebuild instead.

## Structure

- `src/components/sections/` one component per chapter, in page order (see `src/App.jsx`)
- `src/components/room/RoomScene.jsx` the escape-room illustration (inline SVG)
- `src/components/ui/` shared pieces: Button, Chapter, CopyButton, Modal, Confetti, ParticleField, Waves, SoundToggle, TypeLines, Icon
- `src/audio/` optional ambient sound, synthesised in the browser (no audio files)
- `src/hooks/` reduced motion, in-view, clipboard, active chapter, count-up, memory cards
- `src/styles/` design tokens (`base.css`), shared components, per-chapter styles

## Behaviour notes

- Sound is off on every visit and only starts when the visitor presses the sound toggle.
- `prefers-reduced-motion` is respected: animations, particles and confetti are disabled or made static.
- The reply box never sends or stores anything. It only offers a copy button.
- The easter egg is the full stop after BLUE in the footer.
