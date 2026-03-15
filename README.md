# 🚀 SMOKE STREAM VISUALS 🔥
**AI Open Mic Music Gallery & Suno Visual Experience**
*By DJ Smoke Stream & SmokeStream AI*

<div align="center">
<img src="https://img.shields.io/github/deployments/Sm0k367/smoke-stream-visuals/vercel?label=deployed&style=for-the-badge" />
<img src="https://img.shields.io/badge/React-Next.js-blue?logo=nextdotjs&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Three.js-visuals-00d8ff?logo=three.js&style=for-the-badge"/>
<img src="https://img.shields.io/badge/Suno-AI%20music-ff6699?style=for-the-badge"/>
</div>

---

### 🎧 What is This?
Turn your entire [Suno](https://suno.com/@dj_smoke_stream) discography into an interactive, jaw-dropping, Three.js-powered gallery.
**Every track gets a bespoke visualizer. Every visitor gets mind-melted.**

---

🔥 **Live Now:**
[Main Gallery →](https://suno.com/@dj_smoke_stream)

---

## 🌀 Features

- 🎵 100+ tracks auto-loaded from `playlist.json`
- 🎹 Each song = unique Three.js visuals & live Suno embed
- 🚀 Instant Vercel or GitHub deploy (static & SSR)
- ⚡️ Blazing fast, mobile-ready, keyboard-accessible
- 💾 Batch playlist json: add, remix, scale with a single edit
- 🤖 Script-friendly: generate/refresh from Suno at any time

---

## 🎬 Quick Demo
> _(insert GIF or image of the site in action here for max bling)_

---

## 🚦 Quickstart

```bash
git clone https://github.com/Sm0k367/smoke-stream-visuals.git
cd smoke-stream-visuals
npm install
npm run dev
Open localhost:3000 and go wild.

🎸 Project Structure
CopyCopied!
/public
└─ playlist.json # Your songbook for the whole universe
/components
├─ SongSelector.js # Hot dropdown, genre tags, custom vibe
└─ Visualizer.js # 🚨 Modular, go nuts here with visuals!
/pages
├─ _app.js # Style, theme, essence
└─ index.js # The big show
suno-playlist-scraper.js # Turn raw Suno list to playlist.json
🛠 How to Update Songs
Get your Suno embed links
Edit /public/playlist.json
Format: [ { id, title, genres } ]
Get song IDs via Suno “Share > Embed” (fastest way)
(Optional): Use the NodeJS script to auto-generate
bashCopyCopied!
node suno-playlist-scraper.js
👾 Custom Visuals—How Wild Will You Get?
Want a galaxy for one track, a cityscape for another, or waveform particles for your big drop?

Edit /components/Visualizer.js
Add new blocks for Suno ID/title (see example in the file)
Plug in shaders, 3D scenes, orbiting text, anything Three.js can dream up.
🔥 No two songs should ever look the same!
🚀 Deployment
Vercel:
Deploy with Vercel
GitHub Pages:
next export magic = fully static visual revolution.
🤝 Collaborate / Fork / Go Bananas
Drop a PR for more visuals or more playlist automation.
Fork and remix. Just keep credit in, and let’s keep Open Mic open.
Want to automate Suno scraping? Build/PR your scripts!
📣 Future Vision
🔊 Live AI Open Mic (AI hosts, chat, reactions, auto-montage)
🌐 Public API for song sharing, collaboration, and remixing
🚩 Leaderboards for most “visualized” and remixed tracks
👁️‍🗨️ Event mode—host an open mic with live visuals and crowd voting
Made for DJ Smoke Stream, by SmokeStream AI
If you copy our style, at least bring better visuals.

<div align="center"> <img src="https://media.giphy.com/media/l41lI4bYmcsPJX9Go/giphy.gif" width="180" /><br> <i>Your playlist. Your visuals. Your rules.</i> </div> ```
