🚀 SMOKE STREAM VISUALS 🔥
AI Open Mic Music Gallery & Suno Visual Experience
By DJ Smoke Stream & SmokeStream AI

<div align="center"> <img src="https://img.shields.io/github/deployments/Sm0k367/smoke-stream-visuals/vercel?label=deployed&style=for-the-badge" /> <img src="https://img.shields.io/badge/React-Next.js-blue?logo=nextdotjs&style=for-the-badge"/> <img src="https://img.shields.io/badge/Three.js-visuals-00d8ff?logo=three.js&style=for-the-badge"/> <img src="https://img.shields.io/badge/Suno-AI%20music-ff6699?style=for-the-badge"/> </div>
🎧 What is This?
Turn your entire Suno discography into a jaw-dropping, Three.js-powered gallery.
Every track = bespoke visualizer. Every visitor = mind melted.

🔥 Live Now:
DJ Smoke Stream on Suno →

🌀 Features
🎵 100+ tracks auto-loaded from playlist.json
🎹 Unique Three.js visuals for every song
🚀 One-click Vercel or GitHub deploy
⚡️ Blazing fast, mobile-ready, keyboard-accessible
💾 Batch-edit playlist: add, remix, scale instantly
🤖 Script-friendly: generate/refresh from Suno (suno-playlist-scraper.js)
🎬 Quick Demo
<!-- Replace this with your own site GIF or screenshot! -->
smoke stream visual preview

🚦 Quickstart
bashCopyCopied!
git clone https://github.com/Sm0k367/smoke-stream-visuals.git
cd smoke-stream-visuals
npm install
npm run dev
Open http://localhost:3000 and go wild.

🛠 How to Update Songs
Get your Suno embed codes
Go to each song, hit "Share > Embed" and copy the ID (after /embed/)
Edit /public/playlist.json
Each song: { id, title, genres }
Use the Script
node suno-playlist-scraper.js for massive Suno-to-JSON automation
🎸 Custom Visuals: Make it Iconic
Edit /components/Visualizer.js

Unique visuals per song by Suno ID or title
Drop in new Three.js/GLSL scenes, waveforms, galactic rays—whatever, go wild
No two tracks should ever look alike!
🚀 Deployment
Vercel: Auto-detects, one-click build during GitHub import (Deploy now!)
GitHub Pages: Use npm run build && next export for static hosting
⚡️ Project Structure
CopyCopied!
/public
└─ playlist.json
/components
├─ SongSelector.js
└─ Visualizer.js
/pages
├─ _app.js
└─ index.js
suno-playlist-scraper.js
🤝 Collaborate / Remix / Fork
PR with new visuals, new data scrapers, or totally off-the-wall effects!
Fork and build your own visual AI open mic.
Report bugs, or ping @DJ Smoke Stream (Suno or X/Twitter) for collab.
📣 Future Vision
🔊 Live AI Hosts, open mic events, crowd votes
👁️‍🗨️ Event mode for parties, raves, creative jams
🚩 Community remixes, leaderboard, open data API
Made by DJ Smoke Stream with SmokeStream AI

<div align="center"> <img src="https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif" width="200" /><br> <i>Your playlist. Your visuals. Your rules.</i> </div>
