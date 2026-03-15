🚀 EPIC TECH AI VISUALS 🎶🔥
Open AI Music Visualizer Gallery — Powered by Suno & Three.js
by EPIC TECH AI (DJ Smoke Stream) / SmokeStream AI

<div align="center"> <img src="https://img.shields.io/github/deployments/Sm0k367/smoke-stream-visuals/vercel?label=Vercel+Deployed&style=for-the-badge"/> <img src="https://img.shields.io/badge/Next.js-14.x-000?logo=nextdotjs&style=for-the-badge"/> <img src="https://img.shields.io/badge/Three.js-Visuals-00d8ff?logo=three.js&style=for-the-badge"/> <img src="https://img.shields.io/badge/Suno-AI%20music-ff6699?style=for-the-badge"/> </div>
🎤 What is This?
🎛️ The ultimate AI-music gallery for the Epic Tech AI community.
Every Suno song visualized — addictive Three.js visuals, instant Suno embeds, genre-mapped displays, and wild remix features.

🌀 Features
🚀 Fast, responsive, mobile-friendly, and addictive
🎵 Instant access to 100+ Suno tracks via playlist.json
🌈 Genre-Aware Visualizer: Trap = bars, Lo-fi = VHS, House = disco particles, Hip-hop = animated turntable
✨ Remix/Random Mode: Instantly swap tracks or visuals for max engagement
🔊 Audio-React Ready: Drop in .mp3s for live FFT visuals
⚡️ 1-click Vercel deploy, 100% static/SSR for GitHub/Netlify
🤓 Quickstart
bashCopyCopied!
git clone https://github.com/Sm0k367/smoke-stream-visuals.git
cd smoke-stream-visuals
npm install
npm run dev
Then open http://localhost:3000

🎨 Preview
gallery demo

🧩 Project Structure
CopyCopied!
/public
├─ playlist.json # Your songbook & genre map!
├─ favicon.svg
└─ logo.svg
/components
├─ SongSelector.js
└─ Visualizer.js # Expand for genre/mode visuals
/pages
├─ _app.js
└─ index.js
/README.md
🎹 How to Add Songs
Update /public/playlist.json for instant new tracks.
Add "audio": "/audio/mysong.mp3" for live FFT reactivity (mp3/ogg/wav).
Genre array can be used to theme the visuals per track!
💎 Epic Features to Remix
“Random” button: jump to a random track
“Remix Visuals” button: flip through all available visualizer modes for a song
Every genre gets a signature look (expand Visualizer.js easily)
Plug in your own Suno IDs or mp3s!
🚀 Deploy (Vercel Recommended)
One-click deploy with Vercel
Or, use npm run build && npm run start for your own server/static hosting
🔥 Contribute/Remix/Fork
PR for new visuals, genre mapping, or UI
Fork & build your own AI open mic
DM @EpicTechAI for collabs/crowd events/mock battles
📈 Future Bling & Collab Vision
Live Open Mic (crowd AI host, chat, voting, event schedule)
Download/Share GIF replays with visualizer overlays
Crowd leaderboard, Open API for new tracks
AI lyric overlays + auto-meme/auto-clip generator
<div align="center"> <img src="https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif" width="180" /><br> <i>Epic Tech AI — Make music, see sound, remix the future.</i> </div>
