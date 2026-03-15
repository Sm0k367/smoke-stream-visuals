import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import SongSelector from "../components/SongSelector";
import Visualizer from "../components/Visualizer";
import playlist from "../public/playlist.json";

const Wrapper = styled.div`
max-width: 600px;
margin: 36px auto;
padding: 28px 12px 48px 12px;
background: #10161a;
border-radius: 18px;
box-shadow: 0 8px 40px #000c;
@media (max-width: 700px) {
max-width: 99vw;
border-radius: 0;
margin: 0;
padding: 3vw 2vw 58px 2vw;
box-shadow: none;
}
`;

const Title = styled.h1`
font-size: 2.1rem;
font-weight: 900;
text-align: center;
letter-spacing: -1.5px;
margin-bottom: 0.8em;
color: #64ffda;
text-shadow: 0 1px 8px #12a7a344;
`;

const ButtonRow = styled.div`
display: flex;
gap: 20px;
margin: 0 0 16px 0;
justify-content: center;
flex-wrap: wrap;
`;

const AccentButton = styled.button`
font-size: 1.15rem;
background: linear-gradient(96deg, #64ffda, #ff6c52 120%);
color: #181a1f;
font-weight: 900;
border: none;
border-radius: 11px;
padding: 14px 34px;
margin: 2px 0 10px 0;
cursor: pointer;
letter-spacing: 0.6px;
box-shadow: 0 4px 16px #0004;
transition: background 0.2s, scale 0.12s;
&:hover {
scale: 1.035;
background: linear-gradient(100deg, #ff6c52 10%, #64ffda 130%);
color: #222;
}
`;

const StyledAudio = styled.audio`
width: 100%;
margin-top: 13px;
margin-bottom: 18px;
outline: none;
background: #13181c;
border-radius: 9px;
box-shadow: 0px 2px 18px #0003;
&::-webkit-media-controls-panel {
background-color: #222 !important;
color: #64ffda !important;
}
`;

const Credits = styled.div`
opacity: 0.7;
margin-top: 32px;
text-align: center;
font-size: 1.03em;
color: #a2fff5;
`;

const VISUAL_MODES = [
"trap-bars",
"lofi-vhs",
"disco-particles",
"turntable",
"ambient-glow",
"ambient-disc"
];

export default function Home() {
const [selected, setSelected] = useState(playlist[0]);
const [visualMode, setVisualMode] = useState(null);
const audioRef = useRef(null);

// Always play audio when a song with "audio" field is selected
useEffect(() => {
if (selected.audio && audioRef.current) {
audioRef.current.load();
audioRef.current.play().catch(() => { /* autoplay block—user must click */ });
}
}, [selected]);

function pickRandomSong() {
let idx;
do {
idx = Math.floor(Math.random() * playlist.length);
} while (playlist[idx].title === selected.title && playlist.length > 1);
setSelected(playlist[idx]);
setVisualMode(null);
}

function randomizeVisual() {
const available = VISUAL_MODES.filter(vm => vm !== visualMode);
setVisualMode(available[Math.floor(Math.random() * available.length)]);
}

function handleSelect(song) {
setSelected(song);
setVisualMode(null);
}

return (
<Wrapper>
<Title>
Epic Tech AI <span style={{ color: "#ff6c52" }}>— Suno Visuals Gallery</span>
</Title>
<ButtonRow>
<AccentButton onClick={pickRandomSong}>Random Track 🔀</AccentButton>
<AccentButton onClick={randomizeVisual}>Remix Visuals ✨</AccentButton>
</ButtonRow>
<SongSelector songs={playlist} selected={selected} onSelect={handleSelect} />

{selected.audio ? (
<StyledAudio ref={audioRef} controls autoPlay>
<source src={selected.audio} type="audio/mp3" />
Your browser does not support the audio element.
</StyledAudio>
) : selected.id ? (
<div style={{ width: "100%" }}>
<iframe
src={`https://suno.com/embed/${selected.id}`}
width="100%"
height="180"
frameBorder="0"
allow="autoplay; encrypted-media; fullscreen"
allowFullScreen
loading="lazy"
style={{ borderRadius: 12, margin: "13px 0" }}
title={selected.title}
/>
</div>
) : (
<div style={{ marginBottom: 22, textAlign: "center" }}>
<a
href={`https://suno.com/song/${encodeURIComponent(selected.title.replace(/\s+/g, "-").toLowerCase())}`}
target="_blank"
rel="noopener noreferrer"
style={{
color: "#ff6c52",
fontWeight: 700,
fontSize: 18,
borderRadius: 7,
background: "#161c24",
padding: "9px 24px",
boxShadow: "0 2px 12px #0005",
textDecoration: "none",
}}
>
Listen on Suno ↗
</a>
</div>
)}

<Visualizer song={selected} visualMode={visualMode} />

<Credits>
Built for <a href="https://epic-tech-ai-lounge.vercel.app/">Epic Tech AI</a> <span style={{ opacity: 0.76 }}>|</span> Crafted by <b>SmokeStream AI</b> ⚡️
</Credits>
</Wrapper>
);
}
