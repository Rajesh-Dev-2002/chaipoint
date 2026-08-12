# chaiPoint

A nostalgic single-page site for a neighborhood chai tapri — built in React + Vite.

## What's inside

- `src/ChaiPoint.jsx` — the whole site: hero, chalkboard menu, story section, footer, and a shuffle-play "tapri radio" audio player.
- `public/audio/` — put your own mp3 tracks here (see Music section below).

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static `dist/` folder you can deploy anywhere (Vercel, Netlify, GitHub Pages, your own server).

## Deploying

**Vercel (easiest):**
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Framework preset: Vite. Click Deploy.
4. Point your domain to the Vercel project once it's live.

**Netlify:** same idea — connect the repo, build command `npm run build`, publish directory `dist`.

## Adding music (the "tapri radio")

The player shuffles through a playlist and auto-advances to a new random
track each time one finishes, with a skip button too. It intentionally
does **not** ship with any real songs — you provide your own, so you stay
in control of licensing.

1. Get tracks you're cleared to use — royalty-free sites like
   [Pixabay Music](https://pixabay.com/music/), your own recordings, or
   properly licensed tracks if you want real commercial Bollywood songs.
2. Save them as mp3 files into `public/audio/`, e.g.:
   ```
   public/audio/track1.mp3
   public/audio/track2.mp3
   public/audio/track3.mp3
   ```
3. Open `src/ChaiPoint.jsx` and update the `PLAYLIST` array near the top
   with the real filenames and display titles:
   ```js
   const PLAYLIST = [
     { title: "Your Track Name", src: "/audio/track1.mp3" },
     { title: "Another Track",   src: "/audio/track2.mp3" },
   ];
   ```
4. Restart `npm run dev` if it's already running. Click the volume button
   top-right to start the radio; click skip to jump to another track.

## Customizing content

- **Menu items** — edit the `MENU` array in `ChaiPoint.jsx`.
- **Story/timeline cards** — edit the `STOPS` array.
- **Colors** — the palette lives inline as hex values throughout the file
  (kettle copper `#B5651D`, turmeric `#E8A33D`, chalkboard brown `#2E1710`,
  cream text `#F0E4D0`). Change them there.
