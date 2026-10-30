# Sorry, Gayu 🥺

A small sorry game. Kamal keeps saying sorry, Gayu keeps saying no, and her anger meter
slowly drops from 100% (furious) to 0% (calm) until she finally forgives him.

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

## How the game works

1. **Intro**: Kamal asks for a minute.
2. **The sorry game**: each "No" slams a stamp (REJECTED, TOO CHEAP, ERROR 404: FORGIVENESS…)
   and Kamal tries something new: chocolates, a biriyani treat, kneeling, four languages,
   crashing, waiting with a timer. Late in the game the No button runs away, then shrinks,
   then gives up. "Forgive" works at any time.
3. **Result**: confetti, a happy Kamal, and a receipt of everything he promised while begging,
   which can be copied and sent back to him as proof.

## Edit the words

All text is in `src/content/content.js`. Each sorry attempt is one entry in `game.stages`
(line, expression, prop, the No button's label, the stamp, and the anger level).

## Structure

- `src/components/screens/` IntroScene, SorryGame, ResultScene
- `src/components/game/` Kamal (inline SVG character), AngerMeter, Stamp
- `src/components/ui/` Button, Confetti, CopyButton, SoundToggle, ParticleField, Waves, Icon
- `src/audio/` optional sound effects, synthesised in the browser and off by default
- `src/styles/` tokens and base styles, shared components, game screens

## Behaviour notes

- Sound is off on every visit and only plays after the sound toggle is pressed.
- `prefers-reduced-motion` is respected: animations and confetti are turned off.
- Works with touch, mouse and keyboard.
