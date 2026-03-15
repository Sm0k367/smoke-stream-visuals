🚀 EPIC TECH AI VISUALS
Suno AI Music + Custom Visuals in One Click
Epic Tech AI’s 3D sonified gallery built on Next.js, Three.js, and pure audio-reactive genius

<div align="center"> <img src="https://img.shields.io/github/deployments/Sm0k367/smoke-stream-visuals/vercel?label=Vercel+Production&style=for-the-badge"/> <img src="https://img.shields.io/badge/Next.js-14.x-111?logo=next.js&style=for-the-badge"/> <img src="https://img.shields.io/badge/Three.js-visuals-64ffda?logo=three.js&style=for-the-badge"/> <img src="https://img.shields.io/badge/Suno-AI%20music-ff6699?style=for-the-badge"/> </div>
Every Suno track. Every genre. Every visual made to react, pulse, and surprise.

⚡️ Features
🎵 All of your tracks in /public/playlist.json (Suno ID + genres)
🌈 Auto-Genre Visuals: Trap = bars, House = particles, Lo-fi = retro, Hip-hop = turntable, etc
🔀 Instant Remix: Randomize visuals or tracks for endless “wow”
🔊 Audio FFT-ready: Drop in mp3s for pure waveform/beat reactivity
⚡ Vercel/Netlify-ready: Zero config, 1-line deploy
🚀 Quick Start
bashCopyCopied!
git clone https://github.com/Sm0k367/smoke-stream-visuals.git
cd smoke-stream-visuals
npm install
npm run dev
Go to http://localhost:3000, press “Random”, and get inspired.

⚙️ Directory
CopyCopied!
/public
└─ playlist.json ← Your master song & genre file
└─ favicon.svg ← Epic Tech AI logo/icon
/components
├─ SongSelector.js ← Dropdown + genre-tags
└─ Visualizer.js ← 3D genre visuals + remix modes
/pages
_app.js ← Global styles/theme
index.js ← Gallery, playback, controls
README.md
👨‍🎤 How to Add/Remix Songs
Edit /public/playlist.json — add Suno embeds, titles, genres.
For true FFT: drop an "audio": "/audio/mytrack.mp3" in any track object.
Reorder, add genre tags, or re-theme visuals per track!
🌟 How It Works
SongSelector → choose/scroll/addict
One-click “Random”/“Remix” → fresh song + visuals every tap
Genre mapping picks a new visual each time (ultra-extensible in Visualizer.js)
Mobile, touch, and keyboard navigation built in
💎 Pro Quality (“Bling”)
⚡️ Butter-smooth transitions, Three.js particles (expand visuals in Visualizer.js!)
🖼️ Perfect preview: Epic Tech AI Gallery Demo GIF
🕶️ Designed for code review, device tests, and instant public launches
🛡️ What Makes This Dev-Ready
No hacky SSR/hydration errors
Keys are always unique, playlist and visuals scale to thousands of tracks
Modern, modular repo structure with atomic components
100% config-driven — change the playlist, deploy, you’re live
🤝 Authors & Credit
Epic Tech AI — next-level music & creative space
SmokeStream AI — code, visuals, and bot DJ magic
Suno — the music AI backbone
Three.js — visuals engine
Vercel — deploy in seconds
Remix. Star. Fork. Make it your own.
Questions/collabs/ideas? DM DJ Smoke Stream or open an issue.
