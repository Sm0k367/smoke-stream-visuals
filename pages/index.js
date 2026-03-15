import { useState } from "react";
import styled from "styled-components";
import SongSelector from "../components/SongSelector";
import Visualizer from "../components/Visualizer";
import playlist from "../public/playlist.json";

const Wrapper = styled.div`
max-width: 950px;
margin: 30px auto 0 auto;
padding: 8vw 4vw 48px 4vw;
background: rgba(22,22,33,0.96);
border-radius: 22px;
box-shadow: 0 10px 32px #000a;
@media (max-width: 800px) {
padding: 6vw 1vw 36px 1vw;
border-radius: 0;
margin: 0;
box-shadow: none;
}
`;

const Title = styled.h1`
font-size: 2.15rem;
font-weight: 900;
letter-spacing: -2px;
margin-bottom: 0.2em;
@media (max-width: 800px) {
font-size: 1.25rem;
text-align: center;
}
`;

const Credits = styled.div`
opacity: 0.7;
margin-top: 38px;
text-align: right;
font-size: 1em;
@media (max-width: 800px) {
margin-top: 16px;
font-size: 0.95em;
text-align: center;
}
`;

const ButtonRow = styled.div`
display: flex;
gap: 16px;
margin: 18px 0 14px 0;
flex-wrap: wrap;
justify-content: center;
`;

const RandomButton = styled.button`
font-size: 1.1rem;
background: linear-gradient(87deg, #64ffda, #ff6c52 80%);
color: #181a1f;
font-weight: 900;
border: none;
border-radius: 10px;
padding: 11px 24px;
margin-bottom: 2vw;
cursor: pointer;
box-shadow: 0 4px 18px #ff6c5270;
transition: scale 0.12s;
&:hover {
scale: 1.047;
background: linear-gradient(87deg, #ff6c52, #64ffda 80%);
}
`;

const ResponsiveIframe = styled.iframe`
width: 100%;
max-width: 760px;
min-width: 240px;
height: 240px;
border-radius: 12px;
margin: 20px 0;
@media (max-width: 600px) {
height: 136px;
min-width: 85vw;
}
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
Epic Tech AI – Suno Visuals Gallery
</Title>
<ButtonRow>
<RandomButton onClick={pickRandomSong}>Random 🔀</RandomButton>
<RandomButton onClick={randomizeVisual}>Remix Visuals 🌈</RandomButton>
</ButtonRow>
<SongSelector
songs={playlist}
selected={selected}
onSelect={handleSelect}
/>
{selected.id && (
<div style={{ width: "100%" }}>
<ResponsiveIframe
src={`https://suno.com/embed/${selected.id}`}
frameBorder="0"
allow="autoplay; encrypted-media; fullscreen"
allowFullScreen
loading="lazy"
title={selected.title}
/>
</div>
)}
{!selected.id && (
<div style={{ marginBottom: 18, textAlign: "center" }}>
<a
href={`https://suno.com/song/${encodeURIComponent(selected.title.replace(/\s+/g, "-").toLowerCase())}`}
target="_blank"
rel="noopener noreferrer"
style={{ color: "#64ffda", fontWeight: 700, fontSize: 18 }}
>
Listen on Suno
</a>
</div>
)}
<Visualizer song={selected} visualMode={visualMode} />
<Credits>
Built for <a href="https://epic-tech-ai-lounge.vercel.app/">Epic Tech AI</a> by <b>SmokeStream AI</b> ⚡️
</Credits>
</Wrapper>
);
}
