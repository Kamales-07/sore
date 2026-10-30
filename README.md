# Sorry, Gayu 🥺

A small sorry game. Kamales keeps saying sorry, Gayu keeps saying no, and her anger meter
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

1. **Intro**: Kamales asks for a minute.
2. **The sorry game**: each "No" slams a stamp (REJECTED, TOO CHEAP, ERROR 404: FORGIVENESS…)
   and Kamales tries something new: chocolates, a biriyani treat, kneeling, four languages,
   crashing, waiting with a timer. Late in the game the No button runs away, then shrinks,
   then gives up. "Forgive" works at any time.
3. **Result**: confetti, a happy Kamales, and a receipt of everything he promised while begging,
   which can be copied and sent back to him as proof.

## Edit the words

All text is in `src/content/content.js`. Each sorry attempt is one entry in `game.stages`
(line, expression, prop, the No button's label, the stamp, and the anger level).

## Structure

- `src/components/screens/` IntroScene, SorryGame, ResultScene
- `src/components/game/` Kamales (inline SVG character), AngerMeter, Stamp
- `src/components/ui/` Button, Confetti, CopyButton, SoundToggle, ParticleField, Waves, Icon
- `src/audio/` background song player and sound effects (effects are synthesised, no files needed)
- `src/styles/` tokens and base styles, shared components, game screens

## Background music (Kadhaippoma)

The song is not included. Add your own copy:

1. Create the folder `public/music/`.
2. Put the song there as `kadhaippoma.mp3`, so the path is `public/music/kadhaippoma.mp3`.
3. Run `npm run dev` (or `npm run build` before deploying).

It starts when Gayu taps the start button, loops through the whole game, and the sound button
shows "♪ Kadhaippoma" while it plays. If the file is missing, a soft built-in tone plays instead.
Volume, file name and auto-start are set in `music` at the top of `src/content/content.js`.

The song is copyrighted, so keep the site link private rather than publishing it widely.

## Behaviour notes

- Nothing plays on page load. Sound starts from a tap (the start button or the sound toggle) and the sound button mutes it at any time.
- `prefers-reduced-motion` is respected: animations and confetti are turned off.
- Works with touch, mouse and keyboard.
